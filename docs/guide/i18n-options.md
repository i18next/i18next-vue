# i18nOptions

You can set some translation options on a per-component basis using the `i18nOptions` option object.

## `namespaces`

FIXME: upgrade note: They *are* loaded now.
The namepace will not be loaded automatically, see [loadComponentNamespace](/guide/started.html#init)

FIXME: example still uses `<i18next>`

```javascript
const locales = {
  en: {
    tos: "the Terms of Service",
    term: "I accept {{0}}. {{1}}.",
    promise: "I promise"
  }
};

i18next.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { common: locales.en }
  }
});
Vue.use(I18NextVue, { i18next });

Vue.component("app", {
  i18nOptions: { namespaces: "common" },
  template: `
    <div>
      <i18next path="term" tag="label">
        <a href="#" target="_blank">{{ $t("tos") }}</a>
        <strong>{{ $t("promise") }}</strong>
      </i18next>
    </div>`
});
```

Namespaces can also be an array, sorted by priority.

```javascript
const common = {
  en: {
    promise: "I promise"
  }
};

const app = {
  en: {
    promise: "The app promise"
  }
};

i18next.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { common: common.en, app: app.en }
  }
});
Vue.use(I18NextVue, { i18next });

Vue.component("app", {
  i18nOptions: { namespaces: ["app", "common"] },
  template: `<strong>{{ $t("promise") }}</strong>`
});
```

## `keyPrefix`

You can prefix all keys used for translations in a component. This way you can use shorter keys in `$t()`.

```javascript
const locales = {
  en: {
    message: {
      greetings: {
        hello: "Hello",
        world: "globe"
      }
    },
  }
};

i18next.init({
  ...
});
Vue.use(I18NextVue, { i18next });

Vue.component('app', {
  i18nOptions: { keyPrefix: 'message.greetings'},
  template: `
    <div>
      <strong>{{ $t("hello") }}</strong> {{ $t("world") }}
    </div>`,
});
```

This is easier to read and write than 
```js
Vue.component('app', {
  template: `
    <div>
      <strong>{{ $t("message.greetings.hello") }}</strong> {{ $t("message.greetings.world") }}
    </div>`,
});
```

## `messages`

Translations can not only be defined in translation files but also in the `i18nOptions`.

```javascript
i18next.init({
  ...
});
Vue.use(I18NextVue, { i18next });

Vue.component('app', {
  i18nOptions: {
    messages: {
      de: {
        hello: 'Hello!'
      }
    }
  },
  template: `
    <div>
      <strong>{{ $t("hello") }}</strong>
    </div>`,
});
```

Another way of doing this is [using an `<i18n>` block](./single-file-component.md).

## `lng`

Set a fixed language for a component.

```javascript
i18next.init({
  ...
});
Vue.use(I18NextVue, { i18next });

Vue.component('app', {
  i18nOptions: {
    lng: "de"
  },
  template: `
    <div>
      <strong>{{ $t("hello") }}</strong>
    </div>`,
});
```
