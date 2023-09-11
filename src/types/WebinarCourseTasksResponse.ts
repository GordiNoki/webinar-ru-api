export type WebinarCourseTasksResponse = WebinarCourseTask[];

interface WebinarCourseTask {
  id: number;
  type: string;
  createAt: string;
  status: string;
  lesson: Lesson;
  courseInstance: CourseInstance;
  course: Course;
  eventSession: EventSession;
  lastEventSession: null;
  lessonDescription: null;
  count: number;
}

interface Course {
  id: number;
  name: string;
  description: string;
  status: Status;
  locale: Locale;
  visibilityStatus: VisibilityStatus;
  trajectory: Trajectory;
  passingScore: number;
  certSetting: CERTSetting;
  urlAlias: null;
  periodicity: Periodicity;
  access: number;
  background: Background;
  user: Organization;
  organization: Organization;
  isAdaptation: boolean;
}

interface Background {
  thumbnails: Thumbnails;
  url: string;
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

enum CERTSetting {
  Auto = "auto",
  Disable = "disable",
}

enum Locale {
  Ru = "RU",
}

interface Organization {
  id: number;
}

enum Periodicity {
  Endless = "endless",
}

enum Status {
  Publish = "PUBLISH",
}

enum Trajectory {
  Close = "close",
  Open = "open",
}

enum VisibilityStatus {
  All = "all",
  Invite = "invite",
}

interface CourseInstance {
  id: number;
  status: string;
  createAt: Date;
  startAt: Date;
  endAt: null;
  course: Course;
}

interface EventSession {
  id: number;
  access: number;
  accessSettings: AccessSettings;
  name: string;
  description: string;
  startsAt: string;
  estimatedAt: string;
  utcStartsAt: number;
  type: string;
  lang: Locale;
  status: string;
  lectors: any[];
  announceFiles: any[];
  additionalFields: any[];
  image: Image;
  createUser: Organization;
  isAuto: boolean;
  startType: string;
  branding: Branding;
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
  typeFile: Type;
  type: Type;
  path?: string;
  url: string;
  downloadUrl: string;
  size: number;
  format?: Format;
  mimeType: MIMEType;
  uri: string;
}

enum Format {
  PNG = "png",
}

enum MIMEType {
  Empty = "",
  ImagePNG = "image/png",
}

enum Type {
  Empty = "",
  File = "file",
}

interface Lesson {
  id: number;
  name: string;
}
