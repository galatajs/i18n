import { Request, Response, NextFunction } from "@istanbul/http";
import { I18nConfig } from "../app/i18n.app";
import { i18nStore } from "../store/i18n.store";
import { I18nStoreKeys } from "../store/i18n.store-keys";
import { findLocale } from "./middleware.hooks";

export const createI18nMiddleware = (): ((
  req: Request,
  res: Response,
  next: NextFunction
) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const config = i18nStore.inject(I18nStoreKeys.config) as I18nConfig;
    const resolverGetter = i18nStore.inject(I18nStoreKeys.resolver);
    req.lang = findLocale(req, config);
    req.t = (key: string, values?: Record<string, string>): string => {
      const resolver = resolverGetter();
      return resolver.translate({
        keys: key,
        values: values,
        locale: req.lang,
      });
    };
    next();
  };
};
