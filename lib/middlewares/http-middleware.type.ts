import { I18nRequest } from "./middleware.types";

declare module "@galatajs/http" {
  interface Http1Request extends I18nRequest {}
  interface Http2Request extends I18nRequest {}
}
