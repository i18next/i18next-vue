# Composition API

You can access both the translation function `t` as well as the [`i18next`](https://www.i18next.com/overview/api) instance used by `i18next-vue` using the composition API.

```vue
<script setup>
import { useTranslation } from "i18next-vue";
const { t, i18next } = useTranslation();

// console.log(i18next.language);
// await i18next.changeLanguage('en');
// etc.
</script>
```

Make sure to [set up i18next-vue](./started.md#setup) for your app beforehand.

In the `<template>` part just use `$t` and `$i18next`. `useTranslation()` does not change that.