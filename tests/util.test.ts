import { I18nUtil } from "../lib/util/i18n.util";
describe("I18nUtil tests", () => {
  it("formatUnicorn should return correct message", () => {
    const message = "Hello {name}";
    const values = { name: "Unicorn" };
    const result = I18nUtil.formatUnicorn(message, values);
    expect(result).toBe("Hello Unicorn");
  });
});
