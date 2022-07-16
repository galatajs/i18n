import { I18nRequest } from "./middleware.types";

declare module "@istanbul/http" {
  interface Http1Request extends I18nRequest {}
  interface Http2Request extends I18nRequest {}
}
