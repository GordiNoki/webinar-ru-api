import { IWebinarEvent } from "./WebinarEvent";
export declare class WebinarEventEventSessionStart implements IWebinarEvent {
    key: "eventsession.start";
    data: Data;
    version: number;
}
interface Data {
    id: number;
    isDeleted: boolean;
    additionalFields: any[];
    access: number;
    accessSettings: AccessSettings;
    createUser: CreateUser;
    name: string;
    description: string;
    timezone: Timezone;
    startsAt: string;
    estimatedAt: string;
    utcStartsAt: number;
    duration: string;
    isArchive: boolean;
    image: Image;
    organization: Organization;
    type: string;
    lang: string;
    status: string;
    event?: Data;
    lectors: any[];
    announceFiles: any[];
    files: CreateUser[];
    tags: any[];
    participationsCount: number;
    versionTimestamp?: number;
    languages?: any[];
    hasTranslators?: boolean;
    endsAt?: string;
    rule?: string;
    exceptionDates?: string[];
    eventSessions?: any[];
    isEventRegAllowed?: boolean;
    cost?: number;
}
interface AccessSettings {
    isPasswordRequired: boolean;
    isRegistrationRequired: boolean;
    isModerationRequired: boolean;
}
interface CreateUser {
    id: number;
    isDeleted: boolean;
}
interface Image {
    id: number;
    isDeleted: boolean;
    name: string;
    user: User;
    organization: Organization;
    url: string;
    downloadUrl: string;
    thumbnails: Thumbnails;
    isHidden: boolean;
    isSystem: boolean;
    typeFile: string;
    uri: string;
}
interface Organization {
    id: number;
    isDeleted: boolean;
    name: string;
    brandings: Branding[];
}
interface Branding {
    id: number;
    isDeleted: boolean;
    eventOrganizationTitle: string;
    eventButtonAndLinkColor: string;
    eventExitLink: string;
    landingLogoImage: LogoImage;
    emailFromName: string;
    emailReplyTo: string;
    interfaceLogoImage: LogoImage;
    interfaceLogoLink: string;
    isSignature: boolean;
    isTemplate: boolean;
    isQuestions: boolean;
    questionsEmail: string;
    isVOIPInfo: boolean;
    showSocialButtons: boolean;
    useNewInterface: boolean;
}
interface LogoImage {
    id: number;
    isDeleted: boolean;
    name: string;
    type: string;
    user: User;
    path: string;
    url: string;
    downloadUrl: string;
    thumbnails: Thumbnails;
    size: number;
    format: string;
    isHidden: boolean;
    isSystem: boolean;
    mimeType: string;
    typeFile: string;
    uri: string;
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
interface User {
    id: number;
    nickname: string;
    type: string;
    name: string;
    secondName: string;
}
interface Timezone {
    id: number;
    isDeleted: boolean;
    name: string;
    description: string;
    shortDescription: string;
    abbreviation: string;
    offset: number;
}
export {};
