# Use with Locize

[Locize](https://www.locize.com/?from=i18next-vue-docs) is a translation
management system built by the same team behind i18next. It hosts your
translation files on a CDN and provides an editor, review workflow, AI
translation, and a `saveMissing` flow — all natively i18next-shaped.

Because `i18next-vue` is a thin wrapper around i18next, the integration
is exactly the standard i18next + `i18next-locize-backend` pattern. No
Vue-specific glue needed.

## Loading translations from the Locize CDN

::: code-group

```bash[npm]
npm install i18next-locize-backend
```

```bash[yarn]
yarn add i18next-locize-backend
```

```bash[pnpm]
pnpm add i18next-locize-backend
```

:::

Wire the backend into the i18next init and Locize takes over the loader:

```javascript
import { createApp } from 'vue'
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import Backend from 'i18next-locize-backend'
import App from './App.vue'

i18next
  .use(Backend)
  .init({
    fallbackLng: 'en',
    backend: {
      projectId: '<your locize project id>',
      version: 'latest',
      // Locize ships two CDN infrastructures:
      //   'standard' → api.lite.locize.app (BunnyCDN, free, public-only)
      //                — default for newly created Locize projects
      //   'pro'      → api.locize.app (CloudFront, paid, supports
      //                private downloads, custom caching, backups)
      cdnType: 'standard'
    }
  })

createApp(App).use(I18NextVue, { i18next }).mount('#app')
```

See [CDN types: Standard vs. Pro](https://www.locize.com/docs/integration/cdn-types-standard-vs-pro?from=i18next-vue-docs)
for the full comparison.

## Pushing missing keys back via `saveMissing`

In development, set `saveMissing: true` and provide an `apiKey` so every
key referenced in your code but not yet present in Locize gets pushed
back automatically:

```javascript
const isProduction = import.meta.env.PROD

i18next.use(Backend).init({
  fallbackLng: 'en',
  saveMissing: !isProduction,
  backend: {
    projectId: '<your locize project id>',
    // Dev-only. Never bundle a write-enabled key in production builds.
    apiKey: !isProduction ? '<your dev apiKey>' : undefined,
    version: 'latest',
    cdnType: 'standard'
  }
})
```

::: warning Production safety
Strip the `apiKey` from production builds. The pattern above gates it on
`import.meta.env.PROD` so Vite's production build replaces the
expression with `undefined`. If you read credentials a different way
(e.g. `process.env`, a config file), mirror the same guard.
:::

## In-context editing

The [`locize`](https://github.com/locize/locize) plugin opens an
in-context editor inside your running app — append `?locize=true` to the
URL to translate inline:

```javascript
import { locizePlugin } from 'locize'

i18next.use(locizePlugin).use(Backend).init({/* ... */})
```

## Full example

A complete Vue 3.5 + Vite app using `i18next-vue` + Locize is at
[github.com/locize/locize-i18next-vue-example](https://github.com/locize/locize-i18next-vue-example).
It additionally wires up
[`i18next-browser-languagedetector`](https://github.com/i18next/i18next-browser-languageDetector)
and (dev-only) [`locize-lastused`](https://github.com/locize/locize-lastused)
— see [`src/i18n.js`](https://github.com/locize/locize-i18next-vue-example/blob/main/src/i18n.js)
for the full integration surface.
