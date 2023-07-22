# Single file components: `<i18n>`
::: danger Removed in v3
`<i18n>` blocks are no longer supported in `i18next-vue` v3. This is probably already not working in v2, because there are no Vue 3 loaders producing the right format.
:::


by [@kazupon](https://github.com/kazupon)

Single File Components can have an `<i18n>` block for defining translations locally in the component.

```vue
<i18n> { "en": { "hello": "hello world!" } } </i18n>

<template>
  <div id="app"><p>message: {{ $t('hello') }}</p></div>
</template>

<script>
  export default {
    name: "app"
  };
</script>
```

## i18n tag

To use the `<i18>` tag you need to use vue-loader:

```
npm install @kazupon/vue-i18n-loader --save-dev
```

For detailed documentation check the [original docs](https://github.com/kazupon/vue-i18n-loader).

```
// vue-loader (~v14.x):
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // you need to specify `i18n` loaders key with `vue-i18n-loader` (https://github.com/kazupon/vue-i18n-loader)
            i18n: '@kazupon/vue-i18n-loader'
          }
        }
      },
      // ...
    ]
  },
  // ...
}
```

## Use it with YAML:

```
npm install yaml-loader --save-dev
```

```html
<i18n> en: hello: "hello world!" </i18n>
```

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          preLoaders: {
            i18n: "yaml-loader"
          },
          loaders: {
            i18n: "@kazupon/vue-i18n-loader"
          }
        }
      }
      // ...
    ]
  }
  // ...
};
```
