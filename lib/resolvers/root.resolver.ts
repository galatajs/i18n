import { TranslateParams } from "./../types/resolver.types";

export type Resolver = {
  translate(params: TranslateParams): string;
};
