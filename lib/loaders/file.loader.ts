import { Message } from "../app/i18n.app";

export type FileLoader = {
  loadI18nWithFile(file: string): Promise<Message>;
  loadI18nWithDirectory(dir: string, base?: Message): Promise<Message>;
  loadI18n(path: string): Promise<void>;
};
