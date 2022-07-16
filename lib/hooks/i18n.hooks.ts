import { I18nConfig, I18nCreator } from "../app/i18n.app";
import { createLoader } from "./loader.hooks";
import { createResolver } from "./resolver.hooks";
import { I18nApp, Message } from "../app/i18n.app";
import { CorePlugin } from "@istanbul/app";
import { I18nConfigParams } from "../types/i18n.params";
import { createConfig } from "./config.hooks";
import { LoadI18nWithModuleParams } from "../types/loader.types";
import { i18nStore } from "../store/i18n.store";
import { I18nStoreKeys } from "../store/i18n.store-keys";

export const createI18n: I18nCreator = (config?: I18nConfigParams): I18nApp => {
  const messages: Message = {};
  const defaultConf: I18nConfig = createConfig(config);
  const resolver = createResolver(messages, defaultConf);
  const loader = createLoader(messages, defaultConf);
  return {
    config: defaultConf,
    translate: resolver.translate,
    messages: messages,
    async loadModule(params: LoadI18nWithModuleParams): Promise<void> {
      await loader.loadI18nWithModule(params);
    },
    build(): CorePlugin {
      return {
        name: "i18n",
        forceWait: true,
        version: "1.0.0",
        install: async (): Promise<void> => {
          await loader.loadI18n(this.config.localesDir);
          i18nStore.provide(I18nStoreKeys.config, this.config);
          i18nStore.provide(I18nStoreKeys.resolver, () => resolver);
        },
      };
    },
  };
};
