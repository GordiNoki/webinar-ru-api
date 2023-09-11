import { IWebinarEvent } from "./WebinarEvent";
export declare class WebinarEventMessageAdd implements IWebinarEvent {
    key: "message.add";
    data: {
        id: number;
        eventSessionId: number;
        text: string;
        isDeleted: boolean;
        isModerated: boolean;
        createAt: string;
        sentByAdmin: boolean;
        avatarUri: string;
        user: User;
        authorId: number;
        authorName: string;
    };
    version: number;
}
export interface User {
    avatarUri: string;
    nickname: string;
}
