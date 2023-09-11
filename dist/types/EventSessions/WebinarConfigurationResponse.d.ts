export interface WebinarEventSessionConfigurationResponse {
    hlsServer: string;
    rtcServer: string;
    mediaServer: string;
    recordRtmpUrl: string;
    rtmpSourcesWlsServer: string;
    hlsUrl: string;
    streamerServer: string;
    rtmpUrl: string;
    rtcUrl: string;
    rtmpEncoderUrl: string;
    rtmpMediaUrl: string;
    channel: string;
    cometPort: number;
    cometServer: string;
    pingParameters: PingParameter[];
    rtcToFlashBridgeServerMap: RTCToFlashBridgeServerMap;
    slaveLiveServers: SlaveLiveServer[];
    slaveHlsLiveServers: SlaveLiveServer[];
    cometServers: CometServer[];
}
interface CometServer {
    host: string;
    port: number;
}
interface PingParameter {
    rtmp: string;
    rtc: string;
    rtc_meetings: string;
    ping: string;
}
interface RTCToFlashBridgeServerMap {
    "live-webrtc-m9.webinar.ru": string;
    "live-webrtc-sd.webinar.ru": string;
}
interface SlaveLiveServer {
    host: string;
    priority: number;
}
export {};
