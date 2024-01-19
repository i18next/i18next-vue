# i18nOptions <Badge type="warning" text="Deprecated since 3.0" /><Badge type="danger" text="Removed in 4.0" />

::: danger Removed in 4.0
`i18nOptions` support has been removed in v4. They can be replaced with `useTranslation()` using its [new parameters in v3](/guide/composition-api#customize-t) for most use-cases.

In version 3 you need to enable the [`legacyI18nOptionsSupport` plugin option](/guide/started.html#plugin-options) for the `i18nOptions` to apply. Even with that enabled, v3 no longer supports [`messages`](#messages) in `i18nOptions`.
:::

You can set some translation options on a per-component basis using the `i18nOptions` option object.

## `namespaces` <Badge type="warning" text="Deprecated since 3.0" />

::: danger NOTE
This and all other `i18nOptions` are no longer supported in `i18next-vue` v4.
:::

The namespace(s) to lookup translations in. These will be loaded automatically.

FIXME: example still uses v2's `<i18next>`

```javascript
const locales = {
  en: {
    tos: 'the Terms of Service',
    term: 'I accept {{0}}. {{1}}.',
    promise: 'I promise',
  },
};

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { common: locales.en },
  },
});
const app = createApp(/* ... */);
app.use(I18NextVue, { i18next });

app.component('app', {
  i18nOptions: { namespaces: 'common' },
  template: `
    <div>
      <i18next path="term" tag="label">
        <a href="#" target="_blank">{{ $t("tos") }}</a>
        <strong>{{ $t("promise") }}</strong>
      </i18next>
    </div>`,
});
```

Namespaces can also be an array, sorted by priority.

```javascript
const commonResources = {
  en: {
    promise: 'I promise',
  },
};

const appResources = {
  en: {
    promise: 'The app promise',
  },
};

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { common: commonResources.en, app: appResources.en },
  },
});
app.use(I18NextVue, { i18next });

app.component('app', {
  i18nOptions: { namespaces: ['app', 'common'] },
  template: `<strong>{{ $t("promise") }}</strong>`,
});
```

## `keyPrefix` <Badge type="warning" text="Deprecated since 3.0" />

::: danger NOTE
This and all other `i18nOptions` are no longer supported in `i18next-vue` v4.
:::

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
app.use(I18NextVue, { i18next });

app.component('app', {
  i18nOptions: { keyPrefix: 'message.greetings'},
  template: `
    <div>
      <strong>{{ $t("hello") }}</strong> {{ $t("world") }}
    </div>`,
});
```

This is easier to read and write than

```js
app.component('app', {
  template: `
    <div>
      <strong>{{ $t("message.greetings.hello") }}</strong> {{ $t("message.greetings.world") }}
    </div>`,
});
```

## `messages`

::: danger NOTE
`messages` is no longer supported in `i18next-vue` v3.
:::

Translations can not only be defined in translation files but also in the `i18nOptions`.

```javascript
i18next.init({
  ...
});
app.use(I18NextVue, { i18next });

app.component('app', {
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

## `lng` <Badge type="warning" text="Deprecated since 3.0" />

::: danger NOTE
This and all other `i18nOptions` are no longer supported in `i18next-vue` v4.
:::

Set a fixed language for a component.

```javascript
i18next.init({
  ...
});
app.use(I18NextVue, { i18next });

app.component('app', {
  i18nOptions: {
    lng: "de"
  },
  template: `
    <div>
      <strong>{{ $t("hello") }}</strong>
    </div>`,
});
```
