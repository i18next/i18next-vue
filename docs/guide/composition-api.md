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

Even without calling `useTranslation()` you can use `$t` and `$i18next` in your `<template>` part.

## Customize `t` <Badge type="tip" text="Since 3.0" />

`useTranslation()` can be used to get a custom `t` function with a specific namespace, language and/or key prefix:

`useTranslation()` supports passing in a single name space or an array of namespaces to use. These namespaces will be loaded, if they are not available yet.

```vue
<script setup>
    const { t } = useTranslation("adminNamespace");
</script>
```

As a second argument, you can pass an object setting the `keyPrefix` (i.e. a prefix to put before all translation keys passed to this `t`) and/or a fixed translation language using `lng`.

```vue
<script setup>
    const { t } = useTranslation("adminNamespace", {
        keyPrefix: 'system',
        lng: 'de'
    });
</script>
```

Both this special `t` and the default `$t` (unaffected by the options) can be used alongside each other in the template.

You can call `useTranslation` multiple times, to e.g. create multiple translation functions for different namespaces.

::: tip 
If you use certain namespaces/key prefixes a lot, it might make sense to extract composition functions for those to a separate JS module and use these in your components.
```js
// t-functions.js
export function useAdminTranslations() {
     const { t } = useTranslation("adminNamespace");
     return t;
}
```
```vue
<!-- my-component.vue -->
<script setup>
    // import { useAdminTranslations } from ...
    const tAdmin = useAdminTranslations();
</script>
<template>
    <h1 v-if="!isAdmin">{{ $t('not-allowed-warning')}}</h1>
    <button v-else>{{ tAdmin('shutdown-button-label') }}</button>
</template>
```
:::