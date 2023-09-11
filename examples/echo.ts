import { WebinarEventClient } from "..";

(async () => {
  const client = new WebinarEventClient();

  client.on("open", () => {
    console.log("Event client opened!");
  });

  client.on("eventsession.stop", (msg) => {
    console.log(JSON.stringify(msg));
  });

  client.on("raw_message", (msg) => console.log(msg.key));

  client.on("userlist.online", (data) => {
    data.forEach((user) => {
      console.log(
        `${user.user.nickname} <${user.user.email}> joined! Their browser: ${user.userAgent.browser} ${user.userAgent.version}`
      );
    });
  });

  client.on("message.add", async (data) => {
    console.log(`${data.authorName} (${data.authorId}): ${data.text}`);

    const eventSession = client.api.eventSession(
      data.eventSessionId.toString()
    );

    if (data.text.startsWith("!")) {
      eventSession.chat(data.text.slice(1));
    }
  });

  client.on("close", () => {
    console.log("Event client closed!");
  });

  await client.start("email", "password");
})();
