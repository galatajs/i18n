import { I18nUtil } from "../util/i18n.util";
import { Resolver } from "../resolvers/root.resolver";
import { I18nConfig, Message } from "../app/i18n.app";
import { TranslateParams } from "../types/resolver.types";
import { i18nStore } from "../store/i18n.store";
import { I18nStoreKeys } from "../store/i18n.store-keys";
import { calculateLocale } from "./config.hooks";

export const createResolver = (): Resolver => {
  return {
    translate(params: TranslateParams): string {
      const config = i18nStore.inject(I18nStoreKeys.config) as I18nConfig;
      const messages = i18nStore.inject(I18nStoreKeys.messages) as Message;
      let res: string | Message | null | undefined = null;
      res = messages[calculateLocale(config, params.locale)];
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
