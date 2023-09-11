/// <reference types="node" />
import { WebinarAPIClient } from "./WebinarAPIClient";
import { EventEmitter } from "events";
import { WebinarEventCourseTaskUpdate, WebinarEventEventSessionStop, WebinarEventMessageAdd, WebinarEventPresentationUpdate, WebinarEventUserListOnline, WebinarEventEventSessionStart } from "./types/types";
export declare class WebinarEventClient extends EventEmitter {
    api: WebinarAPIClient;
    private _socket;
    private _subscribedChannels;
    private _cometConfig;
    constructor(api?: WebinarAPIClient);
    on(ev: "open" | "raw" | "close" | "raw_message", cb: () => void): this;
    on(ev: WebinarEventCourseTaskUpdate["key"], cb: (data: WebinarEventCourseTaskUpdate["data"]) => void): this;
    on(ev: WebinarEventEventSessionStop["key"], cb: (data: WebinarEventEventSessionStop["data"]) => void): this;
    on(ev: WebinarEventEventSessionStart["key"], cb: (data: WebinarEventEventSessionStart["data"]) => void): this;
    on(ev: WebinarEventMessageAdd["key"], cb: (data: WebinarEventMessageAdd["data"]) => void): this;
    on(ev: WebinarEventPresentationUpdate["key"], cb: (data: WebinarEventPresentationUpdate["data"]) => void): this;
    on(ev: WebinarEventUserListOnline["key"], cb: (data: WebinarEventUserListOnline["data"]) => void): this;
    on(ev: string, cb: (data: any) => void): this;
    private _scanForOpenedWebinars;
    private _onOpen;
    private _onMessage;
    private _onClose;
    private _send;
    private _start;
    start(email?: string, password?: string): Promise<void>;
    ghost(eventSessionId: string, name: string): Promise<void>;
    close(): void;
    subscribeToChannels(channelIds: string | string[]): Promise<void>;
    unsubscribeFromChannels(channelIds: string | string[]): Promise<void>;
    joinEventSession(eventSessionId: string): Promise<void>;
    leaveEventSession(eventSessionId: string): Promise<void>;
}
