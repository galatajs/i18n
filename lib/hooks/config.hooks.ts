import { I18nConfigParams } from "./../types/i18n.params";
import { I18nOptions, I18nConfig } from "./../app/i18n.app";
import path from "path";

const defaultConfig: I18nConfig = {
  fallback: "en",
  localeKey: "lang",
  localesDir: path.resolve(process.cwd(), "locales"),
  options: [
    I18nOptions.Body,
    I18nOptions.Params,
    I18nOptions.Query,
    I18nOptions.AcceptLanguage,
    I18nOptions.Cookie,
  ],
  separator: ".",
};

export const createConfig = (config?: I18nConfigParams): I18nConfig => {
  if (!config) return defaultConfig;
  return {
    ...defaultConfig,
    ...config,
  };
};
