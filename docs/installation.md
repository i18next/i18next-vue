# Installation

## Using a package manager
If you use a bundler like Webpack, Vite, etc. you can install i18next-vue like this:

::: code-group
```bash[npm]
npm install i18next-vue
``` 
```bash[yarn]
yarn add i18next-vue
```
```bash[pnpm]
pnpm add i18next-vue
```
:::

You need to explicitly install the `i18next-vue` plugin via `app.use()`:
    
```javascript
import { createApp } from 'vue'
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';

const app = createApp(/* ... */);
i18next.init({/* ... */});
app.use(I18NextVue, { i18next });
```

## Dev Build

You can clone directly from GitHub and build `i18next-vue` yourself if you want to use the latest dev build.

```sh
git clone https://github.com/i18next/i18next-vue.git node_modules/i18next-vue
cd node_modules/i18next-vue
npm i
npm run build
```
