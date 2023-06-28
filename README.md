# i18next-vue <a href="https://www.npmjs.com/package/i18next-vue"><img src="https://badgen.net/npm/v/i18next-vue"></a> <img src="https://badgen.net/npm/types/i18next-vue">

## Introduction

This library is a simple wrapper for [i18next](https://www.i18next.com), simplifying its use in Vue 3.

There is also a [Vue 2 version of this package](https://github.com/i18next/i18next-vue/tree/vue-2).

## Installation

```bash
npm install i18next-vue
```

## Initialisation

```typescript
import Vue from "vue";
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import App from "./App.vue";

/*const i18nInitialized = */i18next.init({ ... });
createApp(App).use(I18NextVue, { i18next }).mount('#app');

// to wait for loading the translations first, do this instead:
// i18nInitialized.then(() => createApp(App).use(I18NextVue, { i18next }).mount('#app'));
```

## Usage

Use the `$t` translation function, which works analogously to the `t` function found in [i18next](https://www.i18next.com/overview/api#t).

There is [a full tutorial](https://dev.to/adrai/how-to-properly-internationalize-a-vue-application-using-i18next-1doj) for setting up i18next-vue. You can check out the [live demo version](https://codesandbox.io/s/i18next-vue-example-gi55to) version of it, too.

To learn about more options, check out the [full documentation](https://i18next.github.io/i18next-vue/). This also outlines the migration path from @panter/vue-i18next.

### Simple example

```vue
<i18n>
{
    "en": {
        "insurance": "Insurance"
    },
    "de": {
        "insurance": "Versicherung"
    }
}
</i18n>

<template>
    <h1>A test in {{ $i18next.language }}</h1>
    <p>{{ $t('insurance') }}</p>
</template>
```

Using the composition API you can access the i18next instance and `t()` as well:
```vue
<script setup>
import { computed } from "vue";
import { useTranslation } from "i18next-vue";
const { i18next, t } = useTranslation();
const term = computed(() => t("insurance"));
</script>

<template>
  <h1>A test in {{ i18next.language }}</h1>
  <p>inline: {{ t("insurance") }}</p>
  <p>computed: {{ term }}</p>
</template>
```

### Translation component

```vue
<i18n>
{
    "en": {
        "message": "Open the {faq-link} page."
        "faq": "FAQ"
    },
}
</i18n>

<template>
  <TranslationComponent :translation="$t('message')">
    <template #faq-link>
      <router-link :to="FAQ_ROUTE">
        {{ $t('faq') }}
      </router-link>
    </template>
  </TranslationComponent>
</template>
```

#### Custom slot values

Custom slot values may be useful when default braces (`{` and `}`) are wrongly treated by the
[Locize](https://github.com/locize/i18next-locize-backend) service or don't satisfy other needs.

Use custom values for recognizing start and end of the insertion point of the `TranslationComponent`
inside localization term:
```js
// main.js
app.use(I18NextVue, {
    i18next,
    slotStart: '<slot>',
    slotEnd: '</slot>',
});
```
```vue
<!-- Component.vue -->
<i18n>
{
    "en": {
        "message": "Open the <slot>faq-link</slot> page."
        "faq": "FAQ"
    },
}
</i18n>

<template>
  <TranslationComponent :translation="$t('message')">
    <template #faq-link>
      <router-link :to="FAQ_ROUTE">
        {{ $t('faq') }}
      </router-link>
    </template>
  </TranslationComponent>
</template>
```

## Contributing

### Requirements
- node.js >= v16
