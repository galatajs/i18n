import * as fs from "node:fs/promises";
import * as path from "node:path";
import { I18nConfig } from "../app/i18n.app";
import {
  LoadI18nToBaseParams,
  LoadI18nWithModuleParams,
} from "../types/loader.types";
import { ModuleLoader } from "../loaders/module.loader";
import { Message } from "../app/i18n.app";
import { FileLoader } from "../loaders/file.loader";
import { Loader } from "../loaders/loader";
import { i18nStore } from "../store/i18n.store";
import { I18nStoreKeys } from "../store/i18n.store-keys";

const createFileLoader = (): FileLoader => {
  return {
    async loadI18nWithFile(file: string): Promise<Message> {
      const res = await fs.readFile(file, { encoding: "utf-8" });
      return JSON.parse(res);
    },
    async loadI18nWithDirectory(dir: string, base?: Message): Promise<Message> {
      const config = i18nStore.inject(I18nStoreKeys.config) as I18nConfig;
      let res: Message = base || {};
      const files = await fs.readdir(dir);
      for (const file of files) {
        const [filename, extension] = file.split(config.separator);
        let merged = dir + "/" + file;
        if (extension === "json") {
          res[filename] = await this.loadI18nWithFile(path.resolve(merged));
        }
        if (extension === undefined) {
          await this.loadI18nWithDirectory(path.resolve(merged), res);
        }
      }
      return res;
    },
    async loadI18n(path: string): Promise<void> {
      const messages = i18nStore.inject(I18nStoreKeys.messages) as Message;
      const _messages = await this.loadI18nWithDirectory(path);
      for (const key in _messages) {
        messages[key] = _messages[key];
      }
      i18nStore.provide(I18nStoreKeys.messages, { ...messages });
    },
  };
};

const createModuleLoader = (loadI18nWithDirectory: Function): ModuleLoader => {
  return {
    async loadI18nWithModule(params: LoadI18nWithModuleParams): Promise<void> {
      const messages = i18nStore.inject(I18nStoreKeys.messages) as Message;
      const _messages = await loadI18nWithDirectory(params.dir);
      for (const lang in _messages) {
        if (messages[lang]) {
          this.loadI18nToBase({
            locale: lang,
            base: params.base,
            key: params.key,
            messages: _messages[lang],
          });
        }
      }
      i18nStore.provide(I18nStoreKeys.messages, { ...messages });
    },
    loadI18nToBase(params: LoadI18nToBaseParams): void {
      const config = i18nStore.inject(I18nStoreKeys.config) as I18nConfig;
      const messages = i18nStore.inject(I18nStoreKeys.messages) as Message;
      if (!params.base) {
        messages[params.locale][params.key] = params.messages;
        return;
      }
      const separated = params.base.split(config.separator);
      const res =
        separated.length === 1
          ? messages[params.locale][separated[0]]
          : separated.reduce((res, key) => {
              if (typeof res === "string") {
                return messages[params.locale][res][key];
              }
              if (typeof res === "object" && res[key]) return res[key];
              return res;
            });
      res[params.key] = params.messages;
      i18nStore.provide(I18nStoreKeys.messages, { ...messages });
    },
  };
};

export const createLoader = (): Loader => {
  const fileLoader = createFileLoader();
  const moduleLoader = createModuleLoader(
    fileLoader.loadI18nWithDirectory.bind(fileLoader)
  );
  return {
    ...fileLoader,
    ...moduleLoader,
  };
};
