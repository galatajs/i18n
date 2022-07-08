import {
  LoadI18nWithModuleParams,
  LoadI18nToBaseParams,
} from "../types/loader.types";

export type ModuleLoader = {
  loadI18nWithModule(params: LoadI18nWithModuleParams): Promise<void>;
  loadI18nToBase(params: LoadI18nToBaseParams): void;
};
