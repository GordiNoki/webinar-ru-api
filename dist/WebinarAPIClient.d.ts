import { WebinarLoginResponse, WebinarCometResponse, WebinarCourseTasksResponse, WebinarEventSessionConfigurationResponse, WebinarEventSessionModelResponse, WebinarEventSessionCachedResponse } from "./types/types";
export declare class WebinarAPIClient {
    private _host;
    private _cookieJar;
    constructor(_host?: string);
    private _fetch;
    private _post;
    fetch: (uri: string, options?: RequestInit, customOptions?: {
        isJson: boolean;
        throwOnError: boolean;
    }) => Promise<{
        response: Response;
        data: string | object;
    }>;
    post: (uri: string, body: object) => Promise<{
        response: Response;
        data: string | object;
    }>;
    login(email: string, password: string): Promise<WebinarLoginResponse>;
    comet(): Promise<WebinarCometResponse>;
    courseTasks(status: string): Promise<WebinarCourseTasksResponse>;
    eventSession(id: string): EventSessionApis;
}
declare class EventSessionApis {
    _fetch: FetchFunction;
    _post: PostFunction;
    private _eventSessionId;
    constructor(_fetch: FetchFunction, _post: PostFunction, _eventSessionId: string);
    configuration(): Promise<WebinarEventSessionConfigurationResponse>;
    guestlogin(name: string): Promise<any>;
    model(): Promise<WebinarEventSessionModelResponse>;
    cached(): Promise<WebinarEventSessionCachedResponse>;
    chat(text: string): Promise<string | object>;
}
type FetchFunction = (uri: string, options?: RequestInit, customOptions?: {
    isJson: boolean;
    throwOnError: boolean;
}) => Promise<{
    response: Response;
    data: string | object;
}>;
type PostFunction = (uri: string, body: object) => Promise<{
    response: Response;
    data: string | object;
}>;
export {};
