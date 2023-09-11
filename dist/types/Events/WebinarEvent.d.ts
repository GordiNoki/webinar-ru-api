import { WebinarEventCourseTaskUpdate } from "./WebinarEventCourseTaskUpdate";
import { WebinarEventEventSessionStop } from "./WebinarEventEventSessionStop";
import { WebinarEventMessageAdd } from "./WebinarEventMessageAdd";
import { WebinarEventPresentationUpdate } from "./WebinarEventPresentationUpdate";
import { WebinarEventUserListOnline } from "./WebinarEventUserListOnline";
export type WebinarEvent = WebinarEventCourseTaskUpdate | WebinarEventEventSessionStop | WebinarEventMessageAdd | WebinarEventPresentationUpdate | WebinarEventUserListOnline;
export interface IWebinarEvent {
    key: string;
    data: any;
    version: number;
}
