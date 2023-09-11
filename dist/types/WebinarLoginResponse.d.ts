export interface WebinarLoginResponse {
    id: number;
    isDeleted: boolean;
    createAt: string;
    updateAt: string;
    nickname: string;
    realNickname: string;
    type: string;
    oAuthFlags: OAuthFlags;
    sessionId: string;
    canChangePassword: boolean;
    regDate: string;
    email: string;
    status: string;
    isSubmitted: boolean;
    isAutoRecord: boolean;
    isSubscriber: boolean;
    isEnterprise: boolean;
    isNpsEnabled: boolean;
    data: any[];
    hadCoursesEver: boolean;
    hadWebinarTrialEver: boolean;
    hadPaidTariffEver: boolean;
    hasRealMeetings: boolean;
    hasRecentEvents: boolean;
    hasRecentRecords: boolean;
    isEventSelfNotificationAllowed: boolean;
    properties: Properties;
    isSelfService: boolean;
    lastVisitedDate: string;
    name: string;
    secondName: string;
    locale: string;
    defaultEventType: string;
}
interface OAuthFlags {
    linkedin: boolean;
    vk: boolean;
    facebook: boolean;
}
interface Properties {
    participantFlow: boolean;
}
export {};
