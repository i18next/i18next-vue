# i18next-vue <a href="https://www.npmjs.com/package/i18next-vue/v/vue-2"><img src="https://badgen.net/npm/v/i18next-vue/vue-2"></a> <img src="https://badgen.net/npm/types/i18next-vue">

## Introduction

This library is a simple wrapper for [i18next](https://www.i18next.com), simplifying its use in Vue 2.

This special version is a backport of the [v3 changes](https://i18next.github.io/i18next-vue/migration-v3.html). It also requires Vue 2.7 and fixes the types for it.

There is also a [Vue 3 version of this package](https://github.com/i18next/i18next-vue).

## Installation

```bash
npm install i18next-vue@vue-27-next
```

## Initialisation

```typescript
import Vue from "vue";
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import App from "./App.vue";

Vue.use(I18NextVue, { i18next });

i18next.on("initialized", () => {
    new Vue({
        render: h => h(App),
    }).$mount("#app");
});

i18next.init({ ... });
```

## Usage

Use the `$t` function, which works analogously to the `t` function found in [i18next](https://www.i18next.com/overview/api#t).

To learn about more options, check out the [full documentation](https://i18next.github.io/i18next-vue/vue-2/).
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

```vue
<template>
    <h1>A test in {{ $i18next.language }}</h1>
    <p>{{ $t('insurance') }}</p>
</template>
```

## Contributing

### Requirements
- node.js >= v15
