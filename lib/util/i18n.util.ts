export const I18nUtil = {
  formatUnicorn(message: string, values?: Record<string, string>): string {
    return message.replace(
      /\{([^}]+)\}/g,
      (_, key) => (values && values[key]) || ""
    );
  },
};
