"use-strict";
const assert = require("node:assert");
const test = require("node:test");
const { io: Client } = require("socket.io-client");
const { beforeAll, afterAll } = require("./ws-app");

test("Middleware Websocket Testing", async (t) => {
  let client, secondClient;
  await t.test("beforeAll", async () => {
    client = await beforeAll();
  });

  await t.test("check connection", () => {
    assert.strictEqual(client.connected, true);
  });

  await t.test("hello-world event testing", () => {
    client.emit("hello-world", {}, (res) => {
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.message, "Hello Middleware!");
    });
  });

  await t.test("hello-world event testing another language", () => {
    secondClient = Client(`http://127.0.0.1:5072`, {
      path: "/ws/",
      extraHeaders: {
        "Accept-Language": "tr",
      },
    });
    secondClient.on("connect", () => {
      secondClient.emit("hello-world", {}, (res) => {
        assert.strictEqual(res.success, true);
        assert.strictEqual(res.message, "Merhaba Middleware!");
      });
    });
  });

  await t.test("currentLang event testing default", () => [
    client.emit("currentLang", {}, (res) => {
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.message, "lang");
      assert.strictEqual(res.data, "en");
    }),
  ]);

  await t.test("currentLang event testing another language", () => {
    secondClient.emit("currentLang", {}, (res) => {
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.message, "lang");
      assert.strictEqual(res.data, "tr");
    });
  });

  await t.test("afterAll", async () => {
    await afterAll();
    secondClient.close();
  });
});
