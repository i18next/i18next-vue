# i18next-vue <a href="https://www.npmjs.com/package/i18next-vue"><img src="https://badgen.net/npm/v/i18next-vue"></a> <img src="https://badgen.net/npm/types/i18next-vue">

## Introduction

This library is a simple wrapper for [i18next](https://www.i18next.com), simplifying its use in Vue 3.

There is also a [Vue 2 version of this package](https://github.com/i18next/i18next-vue/tree/vue-2).

## Upgrade
In the [documentation](https://i18next.github.io/i18next-vue/), you can find information on how to [upgrade from `@panter/vue-i18next`](https://i18next.github.io/i18next-vue/migration.html) or [from `i18next-vue` v2.x](https://i18next.github.io/i18next-vue/migration-v3.html).

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

There is [a full tutorial](https://dev.to/adrai/how-to-properly-internationalize-a-vue-application-using-i18next-1doj) for setting up i18next-vue. You can check out the [live demo version](https://codesandbox.io/p/sandbox/i18next-vue-v3-y3p49l?file=%2Fsrc%2Fcomponents%2FTranslationShowCase.vue%3A2%2C22) version of it, too.

To learn about more options, check out the [full documentation](https://i18next.github.io/i18next-vue/). This also outlines the migration path from @panter/vue-i18next.

### Simple example

Given the i18next translations
```js
i18next.init({
  // ...
  resources: {
    en: { // language
      translation: { // the default namespace
        "insurance": "Insurance"
      }
    },
    de: { // language
      translation: { // the default namespace
        "insurance": "Versicherung"
      }
    }
  }
})
```

You can use
```vue
<template>
  <h1>A test in {{ $i18next.language }}</h1>
  <p>{{ $t('insurance') }}</p>
</template>
```

Using the composition API you can access the i18next instance and `t()` as well. 
But you can also just use $t in the template, without using `useTranslation()`.
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
  <p>inline with $t: {{ $t("insurance") }}</p>
  <p>computed: {{ term }}</p>
</template>
```

### Translation component

Given the i18next translations
```js
i18next.init({
  // ...
  resources: {
    en: {
      translation: {
        "message": "Open the {faq-link} page."
        "faq": "FAQ"
      }
    },
    de: {
      // ...
    }
  }
})
```

```vue
<template>
  <i18next :translation="$t('message')">
    <template #faq-link>
      <router-link :to="FAQ_ROUTE">
        {{ $t('faq') }}
      </router-link>
    </template>
  </i18next>
</template>
```

#### Custom slot values

Custom slot values may be useful when the default braces (`{` and `}`) are wrongly treated by the
[Locize](https://github.com/locize/i18next-locize-backend) service or don't satisfy other needs.

Use custom values for recognizing start and end of the insertion points of the `<i18next>`/`TranslationComponent`
inside the localization term:


```js
// main.js
i18next.init({
  // ...
  resources: {
    en: {
      translation: {
        "message": "Open the <slot>faq-link</slot> page."
        "faq": "FAQ"
      }
    },
    de: {
      // ...
    }
  }
})

app.use(I18NextVue, {
    i18next,
    slotStart: '<slot>',
    slotEnd: '</slot>',
});
```
```vue
<!-- Component.vue -->
<template>
  <i18next :translation="$t('message')">
    <template #faq-link>
      <router-link :to="FAQ_ROUTE">
        {{ $t('faq') }}
      </router-link>
    </template>
  </i18next>
</template>
```

## Contributing

### Requirements
- node.js >= v18
