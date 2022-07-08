import { Message } from "./../app/i18n.app";

export type LoadI18nToBaseParams = {
  locale: string;
  base?: string;
  key: string;
  messages: Message | string;
};

export type LoadI18nWithModuleParams = {
  key: string;
  dir: string;
  base?: string;
};
