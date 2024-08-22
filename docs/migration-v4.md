# Migration to `i18next-vue` v4.x

There are few breaking changes migrating from `i18next-vue` version 3 to version 4.

If you are migrating from older versions, see [Migration to `i18next-vue` v3.x](/migration-v3) first.

If you are still using the [`i18nOptions`](/guide/i18n-options) component options, it makes sense to upgrade to version 3 first.
Then iteratively migrate all its uses to `useTranslation()` with its [new parameters](/guide/composition-api#customize-t). Then you can easily upgrade to 4.x.

## Breaking changes

- removed support for [`i18nOptions`](/guide/i18n-options) (Options API)
  - You can use `useTranslation()` with its [new parameters](/guide/composition-api#customize-t) for most of these use-cases instead.
  - Removed the [`legacyI18nOptionsSupport: true` plugin option](/guide/started.html#plugin-options)

## New/changed functionality

No new functionality. This is a cleanup-only release.

# Migration to `i18next-vue` v5.x

(Re-phrasing the [Vue Router changelog](https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#441-2024-07-31) for an analogous change):

> This release replaces `declare module '@vue/runtime-core'` with `declare module 'vue'` [like it's supposed to be](https://vuejs.org/guide/typescript/options-api.html#augmenting-global-properties). If you (or packages you use) are also augmenting `@vue/runtime-core`, you will likely have to change it to `vue`. It is also recommended to use an up-to-date TypeScript version (>=5.4) and `"moduleResolution": "Bundler"` in your `tsconfig.json`.

## New/changed functionality

No other changes/migration necessary.
