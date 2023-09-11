import { CookieJar, Cookie } from "tough-cookie";
import {
  WebinarErrorResponse,
  WebinarLoginResponse,
  WebinarCometResponse,
  WebinarCourseTasksResponse,
  WebinarEventSessionConfigurationResponse,
  WebinarEventSessionModelResponse,
  WebinarEventSessionCachedResponse,
} from "./types/types";

export class WebinarAPIClient {
  private _cookieJar: CookieJar;

  constructor(private _host = "https://events.webinar.ru") {
    this._cookieJar = new CookieJar();
  }

  private async _fetch(
    uri: string,
    options?: RequestInit,
    customOptions = {
      isJson: true,
      throwOnError: true,
    }
  ): Promise<{ response: Response; data: string | object }> {
    const response = await fetch(`${this._host}/${uri}`, {
      ...(options || {}),
      headers: {
        ...(options?.headers || {}),
        Cookie: this._cookieJar.getCookieStringSync(this._host),
      },
    });
    const data = await (customOptions.isJson
      ? response.json()
      : response.text());

    const error = data as WebinarErrorResponse;
    if (error.error && customOptions.throwOnError)
      throw new Error(
        `Error while fetching ${uri} with code ${error.error.code}:\n${error.error.message}`
      );
    if (!response.ok && customOptions.throwOnError)
      throw new Error(
        `Unknown error while fetching ${uri} with code ${response.status}`
      );

    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      if (Array.isArray(setCookieHeader)) {
        setCookieHeader.forEach((cookie) =>
          this._cookieJar.setCookieSync(Cookie.parse(cookie), this._host)
        );
      } else {
        this._cookieJar.setCookieSync(
          Cookie.parse(setCookieHeader),
          this._host
        );
      }
    }

    return { response, data };
  }

  private async _post(uri: string, body: object) {
    return await this._fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: new URLSearchParams(
        Object.fromEntries<string>(Object.entries(body))
      ).toString(),
    });
  }

  public fetch = this._fetch;
  public post = this._post;

  public async login(
    email: string,
    password: string
  ): Promise<WebinarLoginResponse> {
    await this._post("api/login", {
      email,
      password,
      rememberMe: true,
      host: this._host.replace("https://", "").replace("http://", ""),
    });

    const { data } = await this._fetch("api/login");
    return data as WebinarLoginResponse;
  }

  public async comet(): Promise<WebinarCometResponse> {
    const { data } = await this._fetch("api/user/comet");
    return data as WebinarCometResponse;
  }

  public async courseTasks(
    status: string
  ): Promise<WebinarCourseTasksResponse> {
    const { data } = await this._fetch(`api/courseTasks?status=${status}`);
    return data as WebinarCourseTasksResponse;
  }

  public eventSession(id: string): EventSessionApis {
    return new EventSessionApis(
      this._fetch.bind(this),
      this._post.bind(this),
      id
    );
  }
}

class EventSessionApis {
  constructor(
    public _fetch: FetchFunction,
    public _post: PostFunction,
    private _eventSessionId: string
  ) {}

  public async configuration(): Promise<WebinarEventSessionConfigurationResponse> {
    const { data } = await this._fetch(
      `api/eventsession/${this._eventSessionId}/configuration`
    );
    return data as WebinarEventSessionConfigurationResponse;
  }

  public async guestlogin(name: string): Promise<any> {
    const { data } = await this._post(
      `api/eventsessions/${this._eventSessionId}/guestlogin`,
      {
        nickname: name,
        name: "",
        secondName: "",
        phone: "",
      }
    );
    return data;
  }

  public async model(): Promise<WebinarEventSessionModelResponse> {
    const { data } = await this._fetch(
      `api/eventsessions/${this._eventSessionId}/model`
    );
    return data as WebinarEventSessionModelResponse;
  }
  public async cached(): Promise<WebinarEventSessionCachedResponse> {
    const { data } = await this._fetch(
      `api/eventsessions/${this._eventSessionId}/cached`
    );
    return data as WebinarEventSessionCachedResponse;
  }

  public async chat(text: string) {
    const { data } = await this._post(
      `api/eventsessions/${this._eventSessionId}/chat`,
      {
        text,
      }
    );
    return data;
  }
}

type FetchFunction = (
  uri: string,
  options?: RequestInit,
  customOptions?: {
    isJson: boolean;
    throwOnError: boolean;
  }
) => Promise<{ response: Response; data: string | object }>;

type PostFunction = (
  uri: string,
  body: object
) => Promise<{ response: Response; data: string | object }>;
