# Installation

## Using a package manager
If you use a bundler like Webpack, Vite, etc. you can install i18next-vue like this:

<code-group>
<code-block title="npm">
```bash
npm install i18next-vue
``` 
</code-block>

<code-block title="yarn">
```bash
yarn add i18next-vue
```
</code-block>

<code-block title="pnpm">
```bash
pnpm add i18next-vue
```
</code-block>
</code-group>
    

You need to explicitly install the `i18next-vue` plugin via `app.use()`:
    
```javascript
import { createApp } from 'vue'
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';

const app = createApp(/* ... */);
i18next.init({/* ... */});
app.use(I18NextVue, { i18next });
```

## Direct Download / CDN

<https://unpkg.com/i18next-vue/dist/index.js>

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like <https://unpkg.com/i18next-vue@2.0.0-beta.5/dist/index.js>

    
```html    
<script src="https://unpkg.com/vue@2/dist/vue.js"></script>
<script src="https://unpkg.com/i18next@21/i18next.js"></script>
<script src="https://unpkg.com/i18next-vue/dist/index.js"></script>
```

You need to explicitly install the `i18next-vue` plugin via `app.use(I18NextVue, { i18next });`

## Dev Build

You can clone directly from GitHub and build `i18next-vue` yourself if you want to use the latest dev build.

```sh
git clone https://github.com/i18next/i18next-vue.git node_modules/i18next-vue
cd node_modules/i18next-vue
npm i
npm run build
```
