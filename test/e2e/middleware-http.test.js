"use-strict";
const assert = require("node:assert");
const test = require("node:test");
const { beforeAll, afterAll } = require("./http.app");

test("Middleware Http Testing", async (t) => {
  let request;
  await t.test("beforeAll", async () => {
    request = await beforeAll();
  });

  await t.test("body should sended language", async () => {
    const { data, res } = await request.post("/i18n/body", { lang: "en" });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(typeof data, "object");
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.message, "lang");
    assert.strictEqual(data.data, "en");
  });

  await t.test("hello-world should return a hello world for en", async () => {
    const { data, res } = await request.get("/i18n/hello-world");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(typeof data, "object");
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.message, "Hello Middleware!");
  });

  await t.test("query should sended language", async () => {
    const { data, res } = await request.get("/i18n/query?lang=en");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(typeof data, "object");
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.message, "lang");
    assert.strictEqual(data.data, "en");
  });

  await t.test("headers should sended language", async () => {
    const { data, res } = await request.get("/i18n/headers", null, {
      "Accept-Language": "tr",
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(typeof data, "object");
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.message, "lang");
    assert.strictEqual(data.data, "tr");
  });

  await t.test("cookie should sended language", async () => {
    const { data, res } = await request.get("/i18n/cookie", null, {
      cookie: "lang=tr",
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(typeof data, "object");
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.message, "lang");
    assert.strictEqual(data.data, "tr");
  });

  await t.test("hello world get message in sended locale", async () => {
    const { data, res } = await request.get("/i18n/hello-world?lang=tr");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(typeof data, "object");
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.message, "Merhaba Middleware!");
  });

  await t.test("params should sended language", async () => {
    const { data, res } = await request.get("/i18n/tr");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(typeof data, "object");
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.message, "lang");
    assert.strictEqual(data.data, "tr");
  });

  await t.test("afterAll", async () => {
    await afterAll();
  });
});
