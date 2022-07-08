import { I18nOptions } from "../app/i18n.app";

export type I18nConfigParams = {
  localesDir?: string;
  separator?: string;
  fallback?: string;
  options?: I18nOptions[];
};
