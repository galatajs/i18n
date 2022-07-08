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

  it("createI18n with different fallback option", () => {
    const fallback = "tr";
    const i18n = createI18n({
      fallback: fallback,
    });
    expect(i18n.config.fallback).toBe(fallback);
  });

  it("createI18n and use the istanbul app", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
  });

  it("createI18n and try first translate", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    const res: string = i18n.translate({
      keys: "country",
      locale: "en",
    });
    expect(res).toBe("US");
  });

  it("createI18n and try fallback translation", async () => {
    const app = createApp();
    const i18n = createI18n({
      fallback: "tr",
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    const res: string = i18n.translate({
      keys: "country",
    });
    expect(res).toBe("TR");
  });

  it("createI18n and try deep translation", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    const res: string = i18n.translate({
      keys: "validation.fieldMustBeString",
    });
    expect(res).toBe("The field must be a string");
  });

  it("createI18n and test loadModule", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    await i18n.loadModule({
      dir: path.resolve(__dirname, "./module"),
      key: "test",
    });
    const res: string = i18n.translate({
      keys: "test.name",
    });
    expect(res).toBe("My module");
  });

  it("createI18 and load module to deep", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    await i18n.loadModule({
      dir: path.resolve(__dirname, "./module"),
      key: "test",
      base: "root",
    });
    const res: string = i18n.translate({
      keys: "root.test.name",
    });
    expect(res).toBe("My module");
  });

  it("createI18 and load module to deep and use deep translation in this module", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    await i18n.loadModule({
      dir: path.resolve(__dirname, "./module"),
      key: "test",
      base: "root",
    });
    const res: string = i18n.translate({
      keys: "root.test.live.years.2022",
    });
    expect(res).toBe("happy");
  });

  it("createI18n and load module to deep and use parameter translation", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    await i18n.loadModule({
      dir: path.resolve(__dirname, "./module"),
      key: "test",
      base: "root",
    });
    const res: string = i18n.translate({
      keys: "root.test.yourName",
      values: {
        name: "John Doe",
      },
    });
    expect(res).toBe("Your Name John Doe");
  });
});
