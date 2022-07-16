import { createI18nMiddleware } from "../../lib";
import { createApp } from "@istanbul/app";
import {
  createHttpServer,
  createRouter,
  Request,
  Response,
} from "@istanbul/http";
import { createI18n } from "../../lib";
import * as path from "path";

const app = createApp();
const i18n = createI18n({
  localesDir: path.resolve(__dirname, "../locales"),
});

const server = createHttpServer();

app.register(i18n);
app.register(server);

const router = createRouter({
  prefix: "i18n",
});
router.use(createI18nMiddleware());
router
  .get("headers", (req: Request, res: Response) => {
    res.successData<string>("lang", req.lang);
  })
  .get("cookie", (req: Request, res: Response) => {
    res.successData<string>("lang", req.lang);
  })
  .post("setCookie", (req: Request, res: Response) => {
    res.cookies.set("lang", req.lang);
    res.successData<string>("lang", req.lang);
  })
  .get("query", (req: Request, res: Response) => {
    res.successData<string>("lang", req.lang);
  })
  .post("body", (req: Request, res: Response) => {
    res.successData<string>("lang", req.lang);
  })
  .get("hello-world", (req: Request, res: Response) => {
    res.success(req.t("middleware.message"));
  })
  .get(":lang", (req: Request, res: Response) => {
    res.successData<string>("lang", req.lang);
  });

const createServer = async () => {
  await app.start();
};

export { app, server, createServer };
