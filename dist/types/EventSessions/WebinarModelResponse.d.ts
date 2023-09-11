export interface WebinarEventSessionModelResponse {
    screensharings: any[];
    presentation: Presentation;
    conferences: ConferenceElement[];
    participations: Participation[];
    configuration: Configuration;
    questions: any[];
    chat: ChatElement[];
    files: any[];
    version: number;
    settings: Settings;
}
interface ChatElement {
    id: number;
    authorName: string;
    text: string;
    isModerated: boolean;
    isDeleted: boolean;
    sentByAdmin: boolean;
    avatarUri: string;
    authorId: number;
    createAt: string;
    additionalData?: AdditionalDatum[];
}
interface AdditionalDatum {
    type: Discr;
    start: number;
    length: number;
    userId: number;
}
declare enum Discr {
    User = "user"
}
interface ConferenceElement {
    id: number;
    isDeleted: boolean;
    createAt: string;
    publicKey: string;
    rtmpUrl: string;
    rtcUrl: string;
    user: User;
    status: string;
    size: string;
    hasStream: boolean;
    hasVideo: boolean;
    hasAudio: boolean;
    typeMedia: string;
    isEncoder: boolean;
    audioEnableRequested: boolean;
}
interface User {
    id: number;
    nickname?: string;
    type: Type;
    name: string;
    secondName: string;
    discr?: Discr;
}
declare enum Type {
    User = "USER"
}
interface Configuration {
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
interface Participation {
    id: number;
    isAccepted: boolean;
    role: Role;
    isOnline: boolean;
    name: string;
    secondName: string;
    agreementStatus: AgreementStatus;
    registerStatus: RegisterStatus;
    paymentStatus: PaymentStatus;
    lastSessionConnectionStatus: LastSessionConnectionStatus;
    userAgent: UserAgent;
    isTranslator: boolean;
    isChatMuted: boolean;
    eventSession: Event;
    event: Event;
    user: User;
}
declare enum AgreementStatus {
    Agreed = "AGREED"
}
interface Event {
    id: number;
}
declare enum LastSessionConnectionStatus {
    Good = "good"
}
declare enum PaymentStatus {
    NotPaid = "NOT_PAID"
}
declare enum RegisterStatus {
    Invited = "INVITED"
}
declare enum Role {
    Admin = "ADMIN",
    Guest = "GUEST"
}
interface UserAgent {
    browser: string;
    version: string;
}
interface Presentation {
    id: number;
    isDeleted: boolean;
    updateUserId: number;
    createAt: string;
    updateAt: string;
    fileReference: FileReference;
    isActive: boolean;
    pointers: any[];
    volume: number;
}
interface FileReference {
    id: number;
    isDeleted: boolean;
    createAt: string;
    file: File;
    order: number;
    isShared: boolean;
    type: string;
}
interface File {
    id: number;
    isDeleted: boolean;
    createAt: string;
    name: string;
    type: string;
    user: User;
    path: string;
    url: string;
    downloadUrl: string;
    thumbnailUrl: string;
    thumbnails: Thumbnails;
    uploadUrl: string;
    size: number;
    format: string;
    isHidden: boolean;
    isSystem: boolean;
    mimeType: string;
    typeFile: string;
    uri: string;
    thumbnailUri: string;
    isOriginal: boolean;
    drawings: any[];
    rotate: number;
}
interface Thumbnails {
    "640x1920": string;
    "1920x1080": string;
    "1333x1000": string;
    "224x199": string;
    "200x50": string;
    "50x50": string;
    "34x34": string;
    "148x112": string;
}
interface Settings {
    chat: SettingsChat;
    question: Tion;
    eventsession: Eventsession;
    conference: SettingsConference;
    participation: Tion;
}
interface SettingsChat {
    premoderation: string;
    show: string;
    showMiniChat: string;
}
interface SettingsConference {
    show: string;
    mode: string;
    highQualityAllowed: string;
    guestPublishMode: string;
    useActiveSpeaker: string;
    joinWithEnabledMicrophone: string;
    viewMode: string;
    maxConferences: string;
}
interface Eventsession {
    vcsSizeRatio: string;
    record: string;
    mediaControlsShow: string;
    allowManageFilesForGuest: string;
    allowScreensharing: string;
    background: null;
    agendaEditType: string;
    allowPresentationFilesForGuest: string;
    autoclearChatAndQuestions: string;
}
interface Tion {
    show: string;
}
export {};
