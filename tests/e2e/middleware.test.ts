import request from "supertest";
import { server, createServer } from "./app";

describe("I18n Middleware testing", () => {
  beforeAll(async () => {
    await createServer();
  });
  it("body should sended language", async () => {
    await request(server.instance)
      .post("/i18n/body")
      .send({ lang: "en" })
      .expect(200)
      .expect({ success: true, data: "en", message: "lang" });
  });

  it("hello-world should return a hello world for en", async () => {
    await request(server.instance)
      .get("/i18n/hello-world")
      .expect(200)
      .expect({ success: true, message: "Hello Middleware!" });
  });
  it("query should sended language", async () => {
    await request(server.instance)
      .get("/i18n/query?lang=en")
      .expect(200)
      .expect({ success: true, data: "en", message: "lang" });
  });
  it("headers should sended language", async () => {
    await request(server.instance)
      .get("/i18n/headers")
      .set("Accept-Language", "tr-TR")
      .expect(200)
      .expect({ success: true, data: "tr-TR", message: "lang" });
  });

  it("cookie should sended language", async () => {
    await request(server.instance)
      .get("/i18n/cookie")
      .set("Cookie", "lang=tr-TR")
      .expect(200)
      .expect({ success: true, data: "tr-TR", message: "lang" });
  });

  it("hello world get message in sended locale", async () => {
    await request(server.instance)
      .get("/i18n/hello-world?lang=tr")
      .expect(200)
      .expect({ success: true, message: "Merhaba Middleware!" });
  });

  it("params should sended language", async () => {
    await request(server.instance)
      .get("/i18n/tr")
      .expect(200)
      .expect({ success: true, data: "tr", message: "lang" });
  });
});
