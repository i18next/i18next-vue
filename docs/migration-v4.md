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
