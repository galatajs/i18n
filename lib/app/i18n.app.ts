import { Resolver } from "../resolvers/root.resolver";
import { CorePluginCreator } from "@istanbul/app";

export type Message = {
  [key in string]: string | Message;
};

export enum I18nOptions {
  "AcceptLanguage" = "accept-language",
  "Query" = "query",
  "Cookie" = "cookie",
}

export type I18nConfig = {
  localesDir: string;
  separator: string;
  fallback: string;
  options: I18nOptions[];
};

export interface I18nApp extends CorePluginCreator, Resolver {
  config: I18nConfig;
  messages: Message | string;
}
