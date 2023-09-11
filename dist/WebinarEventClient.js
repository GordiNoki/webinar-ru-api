"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebinarEventClient = void 0;
const engine_io_client_1 = __importDefault(require("engine.io-client"));
const WebinarAPIClient_1 = require("./WebinarAPIClient");
const events_1 = require("events");
class WebinarEventClient extends events_1.EventEmitter {
    api;
    _socket;
    _subscribedChannels = [];
    _cometConfig;
    // private _isGhost: boolean = false;
    // private _ghostSessionId: string;
    constructor(api = new WebinarAPIClient_1.WebinarAPIClient()) {
        super();
        this.api = api;
    }
    on(ev, cb) {
        return super.on(ev, cb.bind(this));
    }
    async _scanForOpenedWebinars() {
        const courseTasks = await this.api.courseTasks("PERFORMED");
        const activeSessions = courseTasks
            .filter((courseTask) => courseTask.eventSession.status == "START")
            .map((courseTask) => courseTask.eventSession.id);
        activeSessions.forEach((id) => this.joinEventSession(id.toString()));
    }
    async _onOpen() {
        this.subscribeToChannels([
            this._cometConfig.userCometId,
            this._cometConfig.sessionCometId,
        ]);
        // if (!this._isGhost) {
        //   this._scanForOpenedWebinars();
        // } else {
        //   this.joinEventSession(this._ghostSessionId);
        // }
        // this.emit("open");
        // this.on("courseTask.update", (msg) => {
        //   if (msg.status == "PERFORMED" && msg.lesson.lessonType == "lessonWebinar")
        //     this.joinEventSession(msg.eventSession.id);
        // });
        this.on("eventsession.stop", (msg) => this.leaveEventSession(msg.id.toString()));
    }
    async _onMessage(msg) {
        const pkg = JSON.parse(msg);
        this.emit("raw", pkg);
        switch (pkg.name) {
            case "message":
                pkg.data.messages
                    .map((msg) => JSON.parse(msg))
                    .forEach((msg) => {
                    this.emit("raw_message", msg);
                    this.emit(msg.key, msg.data);
                });
                break;
        }
    }
    async _onClose() {
        this.emit("close");
    }
    _send(name, data) {
        this._socket.send(JSON.stringify({ name, data: { ...data, version: 0.3 } }));
    }
    async _start() {
        this._cometConfig = await this.api.comet();
        this._socket = (0, engine_io_client_1.default)("wss://" + this._cometConfig.cometServer + "/engine.io/");
        this._socket.on("open", this._onOpen.bind(this));
        this._socket.on("message", this._onMessage.bind(this));
        this._socket.on("close", this._onClose.bind(this));
    }
    async start(email, password) {
        if (email && password)
            await this.api.login(email, password);
        this._start();
    }
    async ghost(eventSessionId, name) {
        await this.api.eventSession(eventSessionId).guestlogin(name);
        // this._isGhost = true;
        // this._ghostSessionId = eventSessionId;
        await this._start();
    }
    close() {
        if (this._subscribedChannels.length > 0)
            this.unsubscribeFromChannels(this._subscribedChannels);
        this._socket.close();
    }
    async subscribeToChannels(channelIds) {
        if (!Array.isArray(channelIds)) {
            channelIds = [channelIds];
        }
        console.log("Subscribing to " + channelIds.join(", "));
        this._subscribedChannels.push(...channelIds);
        this._send("subscribe", { channels: this._subscribedChannels });
    }
    async unsubscribeFromChannels(channelIds) {
        if (!Array.isArray(channelIds)) {
            channelIds = [channelIds];
        }
        console.log("Unsubscribing from " + channelIds.join(", "));
        this._subscribedChannels.filter((channel) => !channelIds.includes(channel));
        this._send("unsubscribe", { channels: channelIds });
    }
    async joinEventSession(eventSessionId) {
        const eventSession = this.api.eventSession(eventSessionId);
        const { channel } = await eventSession.configuration();
        this.subscribeToChannels(channel);
    }
    async leaveEventSession(eventSessionId) {
        const eventSession = this.api.eventSession(eventSessionId);
        const { channel } = await eventSession.configuration();
        this.unsubscribeFromChannels(channel);
    }
}
exports.WebinarEventClient = WebinarEventClient;
