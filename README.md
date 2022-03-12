# vue-i18next
> Stripped-down version of the package described in <https://panter.github.io/vue-i18next/>

## Introduction

This library is a simple wrapper for [i18next](https://www.i18next.com), simplifying its use in Vue 3.


## Installation

```bash
npm install @dotbase/vue-i18next@kkuegler/vue-i18next#vue-3
```

## Initialisation

```typescript
import Vue from "vue";
import i18next from "i18next";
import VueI18Next from "@dotbase/vue-i18next";
import App from "./App.vue";

/*const i18nInitialized = */i18next.init({ ... });
createApp(App).use(VueI18Next, { i18next }).mount('#app') };

// to wait for loading the translations first, do this instead:
// i18nInitialized.then(() => createApp(App).use(VueI18Next, { i18next }).mount('#app'));
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
