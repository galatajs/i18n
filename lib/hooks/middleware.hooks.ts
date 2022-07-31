import { Request } from "@istanbul/http";
import { I18nConfig, I18nOptions } from "../app/i18n.app";
import { calculateLocale } from "./config.hooks";

const tryFindLocaleWithHeaders = (req: Request): string | null => {
  let locale = req.header.get("accept-language");
  if (typeof locale !== "string") return null;
  const [, lang] = locale.split(",");
  if (lang) {
    locale = lang.split(";")[0];
  }
  return locale || null;
};

const localeFinders: Record<
  I18nOptions,
  (req: Request, config: I18nConfig) => string | null
> = {
  [I18nOptions.AcceptLanguage]: tryFindLocaleWithHeaders,
  [I18nOptions.Query]: (req: Request, config: I18nConfig) =>
    req.query[config.localeKey],
  [I18nOptions.Cookie]: (req: Request, config: I18nConfig) => {
    let cookie = req.cookie.get(config.localeKey);
    if (cookie) return cookie;
    return null;
  },
  [I18nOptions.Params]: (req: Request, config: I18nConfig) =>
    req.params[config.localeKey],
  [I18nOptions.Body]: (req: Request, config: I18nConfig) =>
    req.body[config.localeKey],
};

export const findLocale = (req: Request, config: I18nConfig): string => {
  let locale: string | null = null;
  let index = 0;
  while (
    (index < config.options.length && typeof locale !== "string") ||
    (typeof locale === "string" && !config.languages.includes(locale))
  ) {
    locale = localeFinders[config.options[index]](req, config);
    index++;
  }
  return calculateLocale(config, locale);
};
