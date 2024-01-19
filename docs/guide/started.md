# Getting started

Install the package via

::: code-group

```bash[npm]
npm install i18next-vue
```

```bash[yarn]
yarn add i18next-vue
```

```bash[pnpm]
pnpm add i18next-vue
```

:::

## Requirements

- Vue.js `3.x`
  - there is a separate [Vue 2 version](https://github.com/i18next/i18next-vue/tree/vue-2) of this library
- i18next: `23.x` or newer (`19.x` or newer for version 2)

## Setup

See the [i18next documentation](https://www.i18next.com/overview/api#init) for setting it up. `i18next-vue` does not need a lot of setup on top of that.

::: tip Recommended `i18next` options
We do recommend to set the `interpolation: {escapeValue: false}` option ([i18next docs](https://www.i18next.com/translation-function/interpolation#all-interpolation-options)), because - except in `v-html` - Vue will already properly escape values intended as plain text.

Also, `fallbackLng: false` is a good idea, if you don't explicitly use that.
:::

If you have no i18next setup yet, you can also check out [this tutorial blogpost](https://dev.to/adrai/how-to-properly-internationalize-a-vue-application-using-i18next-1doj) for setting up both i18next and i18next-vue.

```javascript
import { createApp } from 'vue';
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';

i18next.init({
  lng: 'de',
  interpolation: {
    escapeValue: false
  },
  fallbackLng: false,
  resources: {
    ...
  }
});

const app = createApp(/* ... */);
app.use(I18NextVue, {i18next});
app.mount('#app')
```

## Simple usage

Use the instance function `$t` in your Vue components to translate. See [Component-based localization](component.md) for more details.
The [i18next documentation](https://www.i18next.com/) details all the translation options available through `$t()` (also known as [`t()` in the i18next docs](https://www.i18next.com/overview/api#t)).

```vue
<template>
  <div class="container">
    {{ $t('greeter.hello-world') }}
  </div>
</template>

<script>
export default {
  // ...
  methods: {
    logSomething() {
      console.log(this.$t('common.hello'));
    },
  },
};
</script>
```

## Plugin options

You can use these options during plugin registration:

```js
app.use(I18NextVue, {
  i18next: myI18next,
  rerenderOn: ['initialized', 'languageChanged', 'loaded'],
});
```

| Option                                                               |                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`18next`**                                                         | Required                                             | The 'i18next' instance to use.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **`rerenderOn`**                                                     | Optional<hr>Default: Refresh on all relevant events. | Listen for 'i18next' events and refreshes components that use translations.<br>This is a string array. Supported values include: `'initialized'`, `'languageChanged'`, `'loaded'`, `'added'` and `'removed'`.<br>Check the [i18next events documentation](https://www.i18next.com/overview/api#events) for more information. For `'added'` and `'removed'` see the [i18next store documentation](https://www.i18next.com/overview/api#store-events) |
| **`slotStart`**<Badge type="info" text="Since 2.2.0" />              | Optional<hr>Default: `{`                             | Beginning of a slot in the translation component.                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`slotEnd`**<Badge type="info" text="Since 2.2.0" />                | Optional<hr>Default: `}`                             | End of a slot in the translation component.                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`legacyI18nOptionsSupport`**<Badge type="info" text="Since 3.0" /> | Optional<hr>Default: `false`                         | Enables [`i18nOptions`](/guide/i18n-options) support in v3.<br>This support **is removed in v4**.<br>v2 supports `i18nOptions` by default.                                                                                                                                                                                                                                                                                                          |
