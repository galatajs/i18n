const assert = require("node:assert");
const test = require("node:test");
const path = require("node:path");
const { createApp } = require("@galatajs/app");
const { createI18n } = require("../dist");

test("I18n Tests", async (t) => {
  t.test("createI18n should return I18nApp", () => {
    const i18n = createI18n();
    assert.notStrictEqual(i18n.build, undefined);
    assert.notStrictEqual(i18n.messages, undefined);
    assert.notStrictEqual(i18n.config, undefined);
    assert.notStrictEqual(i18n.translate, undefined);
  });

  t.test("createI18n with localesDir options", () => {
    const _path = path.resolve(__dirname, "i18n");
    const i18n = createI18n({
      localesDir: _path,
    });
    assert.strictEqual(i18n.config.localesDir, _path);
  });

  t.test("createI18n with different fallback option", () => {
    const fallback = "tr";
    const i18n = createI18n({
      fallback: fallback,
    });
    assert.strictEqual(i18n.config.fallback, fallback);
  });

  await t.test("createI18n and use the galatajs app", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    assert.strictEqual(1, 1);
  });

  await t.test("createI18n and try first translate", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    const res = i18n.translate({
      keys: "country",
      locale: "en",
    });
    assert.strictEqual(res, "US");
  });

  await t.test("createI18n and try fallback translation", async () => {
    const app = createApp();
    const i18n = createI18n({
      fallback: "tr",
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    const res = i18n.translate({
      keys: "country",
    });
    assert.strictEqual(res, "TR");
  });

  await t.test("createI18n and try deep translation", async () => {
    const app = createApp();
    const i18n = createI18n({
      localesDir: path.resolve(__dirname, "./locales"),
    });
    app.register(i18n);
    await app.start();
    const res = i18n.translate({
      keys: "validation.fieldMustBeString",
    });
    assert.strictEqual(res, "The field must be a string");
  });

  await t.test("createI18n and test loadModule", async () => {
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
    const res = i18n.translate({
      keys: "test.name",
    });
    assert.strictEqual(res, "My module");
  });

  await t.test("createI18 and load module to deep", async () => {
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
    const res = i18n.translate({
      keys: "root.test.name",
    });
    assert.strictEqual(res, "My module");
  });

  await t.test(
    "createI18 and load module to deep and use deep translation in this module",
    async () => {
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
      const res = i18n.translate({
        keys: "root.test.live.years.2022",
      });
      assert.strictEqual(res, "happy");
    }
  );

  await t.test(
    "createI18n and load module to deep and use parameter translation",
    async () => {
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
      const res = i18n.translate({
        keys: "root.test.yourName",
        values: {
          name: "John Doe",
        },
      });
      assert.strictEqual(res, "Your Name John Doe");
    }
  );
});
