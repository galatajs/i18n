const assert = require("node:assert");
const test = require("node:test");
const { I18nUtil } = require("../dist");

test("I18nUtil Tests", (t) => {
    t.test("formatUnicorn should return correct message", () => {
        const message = "Hello {name}";
        const values = {name: "Unicorn"}
        const result = I18nUtil.formatUnicorn(message, values);
        assert.equal(result, "Hello Unicorn");
    })
})