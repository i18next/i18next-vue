# i18next-vue <a href="https://www.npmjs.com/package/i18next-vue"><img src="https://badgen.net/npm/v/i18next-vue"></a> <img src="https://badgen.net/npm/types/i18next-vue">
> Stripped-down version of the package described in <https://panter.github.io/vue-i18next/>

## Introduction

This library is a simple wrapper for [i18next](https://www.i18next.com), simplifying its use in Vue 3.

There is alsa a [Vue 2 version of this package](https://github.com/i18next/i18next-vue/tree/vue-2).

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

Using the `$t` function, which works analogously to the `t` function found in [i18next](https://www.i18next.com/overview/api#t).

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
    <span>{{ $t('insurance') }}</span>
</template>
```

## Contributing

### Requirements
- node.js >= v15
