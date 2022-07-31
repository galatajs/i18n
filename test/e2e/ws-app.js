"use-strict";
const path = require("node:path");
const { createApp } = require("@istanbul/app");
const { createWsApp } = require("@istanbul/ws");
const { createHttpServer } = require("@istanbul/http");
const { io: Client } = require("socket.io-client");
const { createI18nWebsocketMiddleware, createI18n } = require("../../dist");

const app = createApp();
const i18n = createI18n({
  localesDir: path.resolve(__dirname, "../locales"),
  languages: ["en", "tr"],
});

const server = createHttpServer();
server.config.port = 5072;
const ws = createWsApp();
ws.config.port = 5072;
app.register(i18n);
app.register(server);
app.register(ws);
server.onServerStarted(ws.bindHttpServer());

ws.use(createI18nWebsocketMiddleware());
ws.listen("hello-world", (socket, req, res) => {
  res.success(socket.data.t("middleware.message"));
});

ws.listen("currentLang", (socket, req, res) => {
  res.successData("lang", socket.data.lang);
});

let client;
const beforeAll = async () => {
  return new Promise((resolve, reject) => {
    server.onServerStarted(() => {
      client = Client(`http://127.0.0.1:5072`, {
        path: "/ws/",
      });
      client.on("connect", () => {
        resolve(client);
      });
    });
    app.start();
  });
};

const afterAll = async () => {
  ws.close();
  server.close();
  client.close();
};

module.exports = {
  beforeAll,
  afterAll,
};
