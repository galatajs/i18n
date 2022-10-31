<p align="center">
<br>
<img src="https://avatars.githubusercontent.com/u/108695351?s=200&v=4" width="128" height="128">
</p>
<h3 align="center">@galatajs/i18n</h3>
<p align="center">
  Internationalization package of <code>galatajs</code> framework. 
</p>

### What Is It?

This package is the i18n package of the ``galatajs`` framework.

With this package, you can perform http requests, websocket requests or anything else with i18n support.

Features:
- %100 support wherever ``galatajs`` works. (Websocket, Http, Microservice, Cli and more)
- Fast and parametric usage
- Customizable settings
- %100 support for modular development with dynamic module support.
- Fully tested, reliable.


### Installation

Note: This package is 1st degree dependent on ``galatajs`` to work. Please take a look at [`@galatajs/app`](https://www.npmjs.com/package/@galatajs/app) first if you haven't. 

```sh
npm install @galatajs/i18n
```

> or with yarn
>
> ```sh
> yarn add @galatajs/i18n
> ```

### Basic Usage

```typescript
import { createApp } from '@galatajs/app';
import { createI18n } from "@galatajs/i18n";

const app = createApp();
const i18n = createI18n();
app.register(i18n);

(async() => {
  await app.start();

  const msg = i18n.translate({
    key: 'hello',
  })
  console.log('msg -> ', msg); // msg -> hello
})()
```

### Usage With Custom Config 

The i18n package comes with some default settings that will probably apply to everyone, but you can change this.

#### Options

```typescript
type I18nConfigParams = {
  localesDir?: string; // folder path for language files
  separator?: string; // separator to separate each keys
  fallback?: string; // fallback language
  options?: I18nOptions[]; // options for to catch the default language
};
```

#### Default Options

```typescript
const defaultConfig: I18nConfig = {
  fallback: "en",
  localesDir: path.resolve(__dirname, "locales"),
  options: [I18nOptions.AcceptLanguage, I18nOptions.Query, I18nOptions.Cookie],
  separator: ".",
};
```

#### Custom Options Example

```typescript
const i18n = createI18n({
  fallback: 'tr'
})
```

```typescript
const i18n = createI18n({
  fallback: 'tr',
  localesDir: path.resolve(__dirname, "i18n"),
})
```

```typescript
const i18n = createI18n({
  separator: '_'
})
```

In this way, examples can be increased.

### With Parameters

The i18n package allows you to work parametrically with performance.

Example


json:

```json
// locales/en.json

{
  "greeting": "Hello, {name}!"
}
```

ts:

```typescript
import { createApp } from '@galatajs/app';
import { createI18n } from "@galatajs/i18n";

const app = createApp();
const i18n = createI18n();
app.register(i18n);

(async() => {
  await app.start();

  const msg = i18n.translate({
    key: 'greeting',
    params: {
      'name': 'John Doe'
    }
  })
  console.log('msg -> ', msg) // Hello, John Doe!
})()
```

### Load Dynamic Module

The I18n package has been developed for the ``galatajs`` framework. ``galatajs`` framework supports modular development %100. However, we cannot develop language files modularly in similar modular frameworks. ``galatajs`` differs from its competitors here. If you want, you can externally host and load the language files of the product module!

In addition, dynamic loading operations can be performed with this feature. Because no installation is performed until you call the code.

### Example

```typescript
import { createApp } from '@galatajs/app';
import { createI18n } from "@galatajs/i18n";

const app = createApp();
const i18n = createI18n();
app.register(i18n);

(async() => {
  await app.start();

  // product.module.ts
  i18n.loadModule({
      dir: path.resolve(__dirname, "./locales"),
      key: "product",
  })

  const msg = i18n.translate({
    key: 'product.title',
  })
})()
```
