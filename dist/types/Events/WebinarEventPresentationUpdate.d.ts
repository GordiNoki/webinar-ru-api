import { IWebinarEvent } from "./WebinarEvent";
export declare class WebinarEventPresentationUpdate implements IWebinarEvent {
    key: "presentation.update";
    data: {
        id: number;
        isDeleted: boolean;
        updateUserId: number;
        createAt: string;
        updateAt: string;
        fileReference: FileReference;
    };
    version: number;
}
export interface FileReference {
    id: number;
    isDeleted: boolean;
    createAt: string;
    file: File;
    order: number;
    isShared: boolean;
    type: string;
    time: number;
    timestamp: number;
    status: string;
    upTime: number;
}
export interface File {
    id: number;
    isDeleted: boolean;
    createAt: string;
    name: string;
    type: string;
    user: User;
    url: string;
    downloadUrl: string;
    thumbnailUrl: string;
    thumbnails: any[];
    isHidden: boolean;
    isSystem: boolean;
    mimeType: string;
    typeFile: string;
    uri: string;
    thumbnailUri: string;
    src: string;
    author: string;
    streamUrl: string;
    authorUrl: string;
}
export interface User {
    id: number;
    nickname: string;
    type: string;
    name: string;
    secondName: string;
}
