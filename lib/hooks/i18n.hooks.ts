import { I18nConfig } from "./../app/i18n.app";
import { createLoader } from "./loader.hooks";
import { createResolver } from "./resolver.hooks";
import { I18nApp, I18nOptions, Message } from "../app/i18n.app";
import { CorePlugin } from "@istanbul/app";
import { I18nConfigParams } from "../types/i18n.params";
import { createConfig } from "./config.hooks";

export const createI18n = (config?: I18nConfigParams): I18nApp => {
  const messages: Message = {};
  const defaultConf: I18nConfig = createConfig(config);
  const resolver = createResolver(messages, defaultConf);
  const loader = createLoader(messages, defaultConf);
  return {
    config: defaultConf,
    translate: resolver.translate,
    messages: messages,
    build(): CorePlugin {
      return {
        name: "i18n",
        version: "1.0.0",
        onAppStarted() {},
        install: async (): Promise<void> => {
          await loader.loadI18n(this.config.localesDir);
        },
      };
    },
  };
};
