declare module "@istanbul/http" {
  interface Http1Request extends I18nRequest {}
  interface Http2Request extends I18nRequest {}
}

export interface I18nMiddlewareFunction {
  /**
   * @param {string} key The key of the message to translate.
   * @param {Record<string, string>} values Optional. Translate params.
   * @returns {string} translated value
   * @description Translate values with request locale.
   * @example <caption>Just translate</caption>
   * const message = req.t('hello'); // hello world!
   * @example <caption>Translate with parameters</caption>
   * const message = req.t('hello', { name: 'John' }); // hello John!
   * @since 0.0.1
   * @version 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  t(key: string, values?: Record<string, string>): string;
}

export interface I18nRequest extends I18nMiddlewareFunction {
  /**
   * @returns {string} user locale or fallback locale
   * @description Get user locale from request.
   * @example <caption>Access language</caption>
   * const locale = req.lang; // en-US
   * @since 0.0.1
   * @version 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  lang: string;
}
