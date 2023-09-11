import { IWebinarEvent } from "./WebinarEvent";

export class WebinarEventUserListOnline implements IWebinarEvent {
  key: "userlist.online";
  data: {
    id: number;
    role: string;
    eventId: number;
    eventSessionId: number;
    isOnline: boolean;
    isAccepted: boolean;
    user: User;
    isTranslator: boolean;
    isChatMuted: boolean;
    userAgent: UserAgent;
  }[];
  version: number;
}

export interface User {
  id: number;
  type: string;
  name: string;
  nickname: string;
  secondName: string;
  email: string;
}

export interface UserAgent {
  browser: string;
  version: string;
}
