import { default as eio, Socket } from "engine.io-client";
import { WebinarAPIClient } from "./WebinarAPIClient";
import { EventEmitter } from "events";
import {
  WebinarCometResponse,
  WebinarEventCourseTaskUpdate,
  WebinarEventEventSessionStop,
  WebinarEventMessageAdd,
  WebinarEventPresentationUpdate,
  WebinarEventUserListOnline,
  WebinarEvent,
  WebinarEventEventSessionStart,
} from "./types/types";

export class WebinarEventClient extends EventEmitter {
  private _socket: Socket;
  private _subscribedChannels: string[] = [];
  private _cometConfig: WebinarCometResponse;

  // private _isGhost: boolean = false;
  // private _ghostSessionId: string;

  constructor(public api = new WebinarAPIClient()) {
    super();
  }

  on(ev: "open" | "raw" | "close" | "raw_message", cb: () => void): this;
  on(
    ev: WebinarEventCourseTaskUpdate["key"],
    cb: (data: WebinarEventCourseTaskUpdate["data"]) => void
  ): this;
  on(
    ev: WebinarEventEventSessionStop["key"],
    cb: (data: WebinarEventEventSessionStop["data"]) => void
  ): this;
  on(
    ev: WebinarEventEventSessionStart["key"],
    cb: (data: WebinarEventEventSessionStart["data"]) => void
  ): this;
  on(
    ev: WebinarEventMessageAdd["key"],
    cb: (data: WebinarEventMessageAdd["data"]) => void
  ): this;
  on(
    ev: WebinarEventPresentationUpdate["key"],
    cb: (data: WebinarEventPresentationUpdate["data"]) => void
  ): this;
  on(
    ev: WebinarEventUserListOnline["key"],
    cb: (data: WebinarEventUserListOnline["data"]) => void
  ): this;
  on(ev: string, cb: (data: any) => void): this;
  public on(ev: string, cb: (data: any) => void) {
    return super.on(ev, cb.bind(this));
  }

  private async _scanForOpenedWebinars() {
    const courseTasks = await this.api.courseTasks("PERFORMED");
    const activeSessions = courseTasks
      .filter((courseTask) => courseTask.eventSession.status == "START")
      .map((courseTask) => courseTask.eventSession.id);

    activeSessions.forEach((id) => this.joinEventSession(id.toString()));
  }

  private async _onOpen() {
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
    this.on("eventsession.stop", (msg) =>
      this.leaveEventSession(msg.id.toString())
    );
  }

  private async _onMessage(msg: string) {
    const pkg = JSON.parse(msg);
    this.emit("raw", pkg);

    switch (pkg.name) {
      case "message":
        pkg.data.messages
          .map((msg: string) => JSON.parse(msg))
          .forEach((msg: WebinarEvent) => {
            this.emit("raw_message", msg);
            this.emit(msg.key, msg.data);
          });
        break;
    }
  }

  private async _onClose() {
    this.emit("close");
  }

  private _send(name: string, data: any) {
    this._socket.send(
      JSON.stringify({ name, data: { ...data, version: 0.3 } })
    );
  }

  private async _start() {
    this._cometConfig = await this.api.comet();
    this._socket = eio(
      "wss://" + this._cometConfig.cometServer + "/engine.io/"
    );

    this._socket.on("open", this._onOpen.bind(this));
    this._socket.on("message", this._onMessage.bind(this));
    this._socket.on("close", this._onClose.bind(this));
  }

  public async start(email?: string, password?: string) {
    if (email && password) await this.api.login(email, password);
    this._start();
  }

  public async ghost(eventSessionId: string, name: string) {
    await this.api.eventSession(eventSessionId).guestlogin(name);
    // this._isGhost = true;
    // this._ghostSessionId = eventSessionId;
    await this._start();
  }

  public close() {
    if (this._subscribedChannels.length > 0)
      this.unsubscribeFromChannels(this._subscribedChannels);
    this._socket.close();
  }

  public async subscribeToChannels(channelIds: string | string[]) {
    if (!Array.isArray(channelIds)) {
      channelIds = [channelIds];
    }
    console.log("Subscribing to " + channelIds.join(", "));
    this._subscribedChannels.push(...channelIds);
    this._send("subscribe", { channels: this._subscribedChannels });
  }

  public async unsubscribeFromChannels(channelIds: string | string[]) {
    if (!Array.isArray(channelIds)) {
      channelIds = [channelIds];
    }
    console.log("Unsubscribing from " + channelIds.join(", "));
    this._subscribedChannels.filter((channel) => !channelIds.includes(channel));
    this._send("unsubscribe", { channels: channelIds });
  }

  public async joinEventSession(eventSessionId: string) {
    const eventSession = this.api.eventSession(eventSessionId);
    const { channel } = await eventSession.configuration();
    this.subscribeToChannels(channel);
  }

  public async leaveEventSession(eventSessionId: string) {
    const eventSession = this.api.eventSession(eventSessionId);
    const { channel } = await eventSession.configuration();
    this.unsubscribeFromChannels(channel);
  }
}
