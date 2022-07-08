import { createApp } from "@istanbul/app";
import path from "path";
import { createI18n } from "../lib/hooks/i18n.hooks";
describe("i18n tests", () => {
  it("createI18n should return I18nApp", () => {
    const i18n = createI18n();
    expect(i18n.build).toBeDefined();
    expect(i18n.messages).toBeDefined();
    expect(i18n.config).toBeDefined();
    expect(i18n.translate).toBeDefined();
  });

  it("createI18n with localesDir options", () => {
    const _path = path.resolve(__dirname, "i18n");
    const i18n = createI18n({
      localesDir: _path,
    });
    expect(i18n.config.localesDir).toBe(_path);
  });
});
