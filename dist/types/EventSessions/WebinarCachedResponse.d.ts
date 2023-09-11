export interface WebinarEventSessionCachedResponse {
    id: number;
    access: number;
    accessSettings: AccessSettings;
    createUser: CreateUser;
    name: string;
    description: string;
    timezone: Timezone;
    startsAt: string;
    estimatedAt: string;
    utcStartsAt: number;
    type: string;
    lang: string;
    status: string;
    organization: Organization;
    organizationId: number;
    branding: Branding;
    image: Image;
    event: Event;
    lectors: any[];
    announceFiles: any[];
    additionalFields: any[];
    isAuto: boolean;
    isEndless: boolean;
    courseData: null;
    languages: any[];
    hasTranslators: boolean;
    eventLink: string;
    sipUri: string;
    startType: string;
    canRegisterAfterStop: boolean;
    maxParticipationSettings: null;
    duration: string;
    publicSettings: PublicSettings;
}
interface AccessSettings {
    isPasswordRequired: boolean;
    isRegistrationRequired: boolean;
    isModerationRequired: boolean;
}
interface Branding {
    id: number;
    title: string;
    isDefault: boolean;
    eventOrganizationTitle: string;
    eventButtonAndLinkColor: string;
    eventCustomLink: null;
    eventExitLink: string;
    isSignature: boolean;
    isTemplate: boolean;
    isQuestions: boolean;
    isVOIPInfo: boolean;
    isAgreementsDefaultChecked: boolean;
    showSocialButtons: boolean;
    landingLogoImage: Image;
    interfaceLogoImage: Image;
    interfaceLogoLink: string;
}
interface Image {
    id: number;
    createAt: string;
    name: string;
    thumbnails: Thumbnails;
    typeFile: string;
    type: string;
    path?: string;
    url: string;
    downloadUrl: string;
    size: number;
    format?: string;
    mimeType: string;
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
interface CreateUser {
    id: number;
    desktopAppForMyParticipation: boolean;
}
interface Event {
    id: number;
    access: number;
    accessSettings: AccessSettings;
    password: null;
    urlAlias: null;
    createUser: TimezoneClass;
    name: string;
    description: string;
    timezone: TimezoneClass;
    startsAt: string;
    estimatedAt: string;
    utcStartsAt: number;
    lang: string;
    status: string;
    image: Image;
    eventSessions: EventSessionElement[];
    rule: string;
    exceptionDates: string[];
    announceFiles: any[];
    additionalFields: any[];
    organization: Organization;
    branding: Branding;
    cost: number;
    isAuto: boolean;
    startType: string;
    comet: Comet;
    duration: string;
}
interface Comet {
    channel: string;
    server: Server;
}
interface Server {
    host: string;
    port: number;
}
interface TimezoneClass {
    id: number;
}
interface EventSessionElement {
    id: number;
    access: number;
    accessSettings: AccessSettings;
    name: string;
    description: string;
    startsAt: string;
    estimatedAt: string;
    utcStartsAt: number;
    type: string;
    lang: string;
    status: string;
    lectors: any[];
    announceFiles: any[];
    additionalFields: any[];
    image: Image;
    createUser: TimezoneClass;
    isAuto: boolean;
    startType: string;
    branding: Branding;
    duration: string;
}
interface Organization {
    id: number;
    name: string;
}
interface PublicSettings {
    eventSession: PublicSettingsEventSession;
}
interface PublicSettingsEventSession {
    liteVersion: boolean;
}
interface Timezone {
    id: number;
    name: string;
    offset: number;
}
export {};
