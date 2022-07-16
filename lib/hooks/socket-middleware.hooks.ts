import {
  Socket,
  GlobalMiddleware,
  NextFunction,
  transformHttpRequest,
} from "@istanbul/ws";
import { Request as HttpRequest } from "@istanbul/http";
import { I18nConfig } from "../app/i18n.app";
import { i18nStore } from "../store/i18n.store";
import { I18nStoreKeys } from "../store/i18n.store-keys";
import { findLocale } from "./middleware.hooks";

export const createI18nWebsocketMiddleware = (): GlobalMiddleware => {
  return (socket: Socket, next: NextFunction) => {
    const _req = transformHttpRequest(socket.request);
    const config = i18nStore.inject(I18nStoreKeys.config) as I18nConfig;
    const resolverGetter = i18nStore.inject(I18nStoreKeys.resolver);
    socket.data.lang = findLocale(_req as HttpRequest, config);
    socket.data.t = (key: string, values?: Record<string, string>): string => {
      const resolver = resolverGetter();
      return resolver.translate({
        keys: key,
        values: values,
        locale: socket.data.lang,
      });
    };
    next();
  };
};
