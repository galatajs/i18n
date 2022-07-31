import { CorePluginCreator } from "@istanbul/app";
import { Resolver } from "../resolvers/root.resolver";
import { LoadI18nWithModuleParams } from "../types/loader.types";
import { I18nConfigParams } from "../types/i18n.params";

export type Message = {
  [key in string]: string | Message;
};

export enum I18nOptions {
  "AcceptLanguage" = "accept-language",
  "Query" = "query",
  "Cookie" = "cookie",
  "Params" = "params",
  "Body" = "body",
}

export interface I18nConfig {
  /**
   * @default "locales"
   * @description The directory where the locales are stored.
   */
  localesDir: string;
  /**
   * @default "lang"
   * @description The key of the locale in the request query or params or cookie.
   */
  localeKey: string;

  /**
   * @default ["en"]
   * @description The list of languages that are available.
   * @type {string[]}
   * @memberof I18nConfig
   * @example ["en", "fr"]
   */
  languages: string[];
  /**
   * @default "."
   * @description The separator of the keys in translate function.
   */
  separator: string;
  /**
   * @default "en"
   * @description Fallback locale
   */
  fallback: string;
  /**
   * @default [I18nOptions.Params, I18nOptions.Query, I18nOptions.AcceptLanguage, I18nOptions.Cookie]
   * @description The options of the locale finder. The order of the options is important.
   */
  options: I18nOptions[];
}

export interface I18nApp extends CorePluginCreator, Resolver {
  config: I18nConfig;
  messages: Message | string;
  loadModule(params: LoadI18nWithModuleParams): Promise<void>;
}

export type I18nCreator = (config?: I18nConfigParams) => I18nApp;
