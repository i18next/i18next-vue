# Migration from [@panter/vue-i18next](https://panter.github.io/vue-i18next/)
This package has some breaking changes compared to the @panter version.

## Features no longer supported
- The `v-t` directive has been removed. Please use `$t` instead.
- The `v-waitForT` directive has been removed. Use `v-if="$i18next.initialized"` or hold off mounting Vue until i18next has been initialized:
```js
const i18nInitialized = i18next.init({ ... });
const app = createApp(/* ... */);
app.use(I18NextVue, { i18next });
i18nInitialized.then(() => {
    app.mount("#app");
});
```

## API changes
- `i18nOptions` are no longer inherited by child components. Each component is independent.
- `$i18n.i18next` is now `$i18next`. `$i18n` itself has been removed.
- Initialization changed from
```js
// Vue 2
i18next.init(...);
const i18n = new VueI18next(i18next);
new Vue({
  i18n,
  ...
}).$mount('#app')
```
to
```js
i18next.init(...);
const app = createApp(/* ... */); // no 'i18n' option anymore
app.use(I18NextVue, { i18next }); // pass in an object with your i18next instance
app.mount('#app');
```
- Plugin options 
  - `loadComponentNamespace` has been removed without replacement.
  - `bindI18n` and `bindStore` have been replaced by [the `rerenderOn` option](./guide/started.md#plugin-options)
- The `<i18next>` component now uses named slots and the `:translation` prop. The slot contents can be used as `{nameOfSlot}` in the translated message. See the example below how to replace the `tag`, `path` and `place` props, that are no longer supported.
```vue
// old @panter/vue-i18next
<template>
<!-- ...some other template code... -->
    <i18next tag="p" class="value" path="license.goToTermsOfUse">
        <router-link :to="{ name: 'LICENSE' }"
                     class="link"
                     place="termsOfUse">
            {{ $t('license.termsOfUse') }}
        </router-link>
    </i18next>
</template>
```
to

```vue
// vi18next-vue
<template>
<!-- ...some other template code... -->
<p class="value"><!-- for a wrapper tag just use normal template syntax -->
    <i18next :translation="$t('license.goToTermsOfUse')"> <!-- translation in the parent -->
        <template #termsOfUseLink> <!-- will be referenced via {termsOfUseLink} in the localized message -->
            <router-link :to="{ name: 'LICENSE' }"
                         class="link">
                {{ $t("license.termsOfUse") }}
            </router-link>
        </template>
    </i18next>
</p>
</template>
```

With translations looking like this:
```js
        en: {
            translation: {
                license: {
                    goToTermsOfUse: "Read our {termsOfUseLink}",
                    termsOfUse: 'Terms of Use'
                }
            }
       }
```
  

## Other changes
The minimum tested i18next version is now 19.
