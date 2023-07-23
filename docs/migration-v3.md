# Migration from `i18next-vue` v2.x
Version 3 has some breaking changes coming from v2.x

## Breaking changes
- requires `i18next` >=23
    - Consult the [`i18next` Migration Guide](https://www.i18next.com/misc/migration-guide) for updating.
- the 3.x package is ESM-only
    - Relevant only for [CommonJS users](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), i. e. when using `require()` imports
- deprecated support for [`i18nOptions`](/guide/i18n-options) (Options API) <Badge type="warning" text="for removal in 4.0" />
    - You can use `useTranslation()` with its [new parameters for most of these use-cases](/guide/composition-api#customize-t).
    - Legacy support for `i18nOptions` needs to be enabled explicitly via the [`legacyI18nOptionsSupport: true` plugin option](/guide/started.html#plugin-options)
    - This allows component-by-component migration to `useTranslation()` using the 3.x version. Support for `i18nOptions` will be removed in 4.0.
- removed support for `<i18n>` blocks in SFCs and `messages` in `i18nOptions` 
    - i.e. no more  per-component translations
    - There is no replacement for this, as this seems to be a rarely used feature.

## New/changed functionality
- new `useTranslation()` parameters to [specify a fixed language, namespace(s) and a keyprefix](/guide/composition-api#customize-t) (all optional)
- `$t`/`t` functions will return an empty string while i18next is loading
    - v2 returned the untranslated translation key, which is usually uglier
- support for [TypeScript auto-completion of translation keys](https://www.i18next.com/overview/typescript)
    - via `i18next`'s support for this
    - Your milage may vary (dev performance, ...). If it works for you, it can be quite useful.
