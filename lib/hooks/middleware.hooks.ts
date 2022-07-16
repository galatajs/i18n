import { Request } from "@istanbul/http";
import { I18nConfig, I18nOptions } from "../app/i18n.app";

const tryFindLocaleWithHeaders = (req: Request): string | null => {
  let locale = req.headers.get("accept-language");
  if (locale) {
    const [, lang] = locale.split(",");
    if (lang) {
      locale = lang.split(";")[0];
    }
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
  [I18nOptions.Cookie]: (req: Request, config: I18nConfig) =>
    req.cookies.get(config.localeKey),
  [I18nOptions.Params]: (req: Request, config: I18nConfig) =>
    req.params[config.localeKey],
  [I18nOptions.Body]: (req: Request, config: I18nConfig) =>
    req.body[config.localeKey],
};

export const findLocale = (req: Request, config: I18nConfig): string => {
  let locale: string | null = null;
  let index = 0;
  while (index < config.options.length && typeof locale !== "string") {
    locale = localeFinders[config.options[index]](req, config);
    index++;
  }
  return locale || config.fallback;
};
