import { IWebinarEvent } from "./WebinarEvent";
export declare class WebinarEventEventSessionStop implements IWebinarEvent {
    key: "eventsession.stop";
    data: {
        id: number;
        versionTimestamp: number;
        courseData: CourseData;
        isForced: boolean;
    };
    version: number;
}
export interface CourseData {
    lessonId: string;
    courseId: string;
    courseInstanceId: number;
}
