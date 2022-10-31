"use-strict";
const path = require("node:path");
const { createApp } = require("@galatajs/app");
const { createHttpServer, createRouter } = require("@galatajs/http");
const { createI18nMiddleware, createI18n } = require("../../dist");
const Request = require("./request");

const app = createApp();
const i18n = createI18n({
  localesDir: path.resolve(__dirname, "../locales"),
  languages: ["en", "tr"],
});

const server = createHttpServer();
server.config.host = "127.0.0.1";

app.register(i18n);
app.register(server);

const router = createRouter({
  prefix: "i18n",
});
router.use(createI18nMiddleware());
router
  .get("headers", (req, res) => {
    res.successData("lang", req.lang);
  })
  .get("cookie", (req, res) => {
    res.successData("lang", req.lang);
  })
  .post("setCookie", (req, res) => {
    res.cookie.set("lang", req.lang);
    res.successData("lang", req.lang);
  })
  .get("query", (req, res) => {
    res.successData("lang", req.lang);
  })
  .post("body", (req, res) => {
    res.successData("lang", req.lang);
  })
  .get("hello-world", (req, res) => {
    res.success(req.t("middleware.message"));
  })
  .get(":lang", (req, res) => {
    res.successData("lang", req.lang);
  });

let request;

const beforeAll = async (port) => {
  if (server.instance && server.instance.listening) return request;
  server.config.port = port;
  return new Promise((resolve, reject) => {
    server.onServerStarted(() => {
      setTimeout(() => {
        if (server.instance && server.instance.listening) {
          const port = server.instance.address().port;
          const baseUrl = `http://127.0.0.1:${port}`;
          request = new Request(baseUrl);
          resolve(request);
        }
      }, 100);
    });
    app.start();
  });
};

const afterAll = async () => {
  server.instance.close();
};

module.exports = {
  app,
  server,
  beforeAll,
  afterAll,
};
