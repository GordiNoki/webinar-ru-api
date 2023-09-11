"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebinarAPIClient = void 0;
const tough_cookie_1 = require("tough-cookie");
class WebinarAPIClient {
    _host;
    _cookieJar;
    constructor(_host = "https://events.webinar.ru") {
        this._host = _host;
        this._cookieJar = new tough_cookie_1.CookieJar();
    }
    async _fetch(uri, options, customOptions = {
        isJson: true,
        throwOnError: true,
    }) {
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
        const error = data;
        if (error.error && customOptions.throwOnError)
            throw new Error(`Error while fetching ${uri} with code ${error.error.code}:\n${error.error.message}`);
        if (!response.ok && customOptions.throwOnError)
            throw new Error(`Unknown error while fetching ${uri} with code ${response.status}`);
        const setCookieHeader = response.headers.get("set-cookie");
        if (setCookieHeader) {
            if (Array.isArray(setCookieHeader)) {
                setCookieHeader.forEach((cookie) => this._cookieJar.setCookieSync(tough_cookie_1.Cookie.parse(cookie), this._host));
            }
            else {
                this._cookieJar.setCookieSync(tough_cookie_1.Cookie.parse(setCookieHeader), this._host);
            }
        }
        return { response, data };
    }
    async _post(uri, body) {
        return await this._fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            body: new URLSearchParams(Object.fromEntries(Object.entries(body))).toString(),
        });
    }
    fetch = this._fetch;
    post = this._post;
    async login(email, password) {
        await this._post("api/login", {
            email,
            password,
            rememberMe: true,
            host: this._host.replace("https://", "").replace("http://", ""),
        });
        const { data } = await this._fetch("api/login");
        return data;
    }
    async comet() {
        const { data } = await this._fetch("api/user/comet");
        return data;
    }
    async courseTasks(status) {
        const { data } = await this._fetch(`api/courseTasks?status=${status}`);
        return data;
    }
    eventSession(id) {
        return new EventSessionApis(this._fetch.bind(this), this._post.bind(this), id);
    }
}
exports.WebinarAPIClient = WebinarAPIClient;
class EventSessionApis {
    _fetch;
    _post;
    _eventSessionId;
    constructor(_fetch, _post, _eventSessionId) {
        this._fetch = _fetch;
        this._post = _post;
        this._eventSessionId = _eventSessionId;
    }
    async configuration() {
        const { data } = await this._fetch(`api/eventsession/${this._eventSessionId}/configuration`);
        return data;
    }
    async guestlogin(name) {
        const { data } = await this._post(`api/eventsessions/${this._eventSessionId}/guestlogin`, {
            nickname: name,
            name: "",
            secondName: "",
            phone: "",
        });
        return data;
    }
    async model() {
        const { data } = await this._fetch(`api/eventsessions/${this._eventSessionId}/model`);
        return data;
    }
    async cached() {
        const { data } = await this._fetch(`api/eventsessions/${this._eventSessionId}/cached`);
        return data;
    }
    async chat(text) {
        const { data } = await this._post(`api/eventsessions/${this._eventSessionId}/chat`, {
            text,
        });
        return data;
    }
}
