import { I18nUtil } from "../util/i18n.util";
import { Resolver } from "../resolvers/root.resolver";
import { I18nConfig, Message } from "../app/i18n.app";
import { TranslateParams } from "../types/resolver.types";

export const createResolver = (
  messages: Message,
  config: I18nConfig
): Resolver => {
  return {
    translate(params: TranslateParams): string {
      let res: string | Message | null | undefined = null;
      params.locale = params.locale || config.fallback;
      res = messages[params.locale];
      for (const obj of params.keys.split(config.separator)) {
        if (res === null) {
          res = messages[obj];
        } else if (typeof res === "object") {
          res = res[obj];
        }
        if (typeof res === "string") {
          break;
        }
      }
      return typeof res === "string"
        ? I18nUtil.formatUnicorn(res, params.values)
        : "";
    },
  };
};
