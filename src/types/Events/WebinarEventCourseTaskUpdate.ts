import { IWebinarEvent } from "./WebinarEvent";

export class WebinarEventCourseTaskUpdate implements IWebinarEvent {
  key: "courseTask.update";
  data: any;
  version: number;
}
