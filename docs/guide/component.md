# Component-based localization

In general, locale info (e.g. `lng`,`resources`, etc) is set in the `i18next` instance and passed to the i18next-vue Vue plugin during [initialization](./started.md#setup).

After that you can translate using `$t` or `this.$t` in Vue components. You can also manage locale info for each component separately, which might be more convenient due to Vue's component oriented design.

Component based localization example:

```js
const locales = {
  en: {
    hello: 'Hello!',
    loadbundle: 'Load bundle language: {{lang}}',
  }
};

i18next.init({
  lng: 'en',
  resources: {
    en: { translation: locales.en },
  },
});

const app = createApp(/* ... */);
app.use(I18NextVue, { i18next });

const Component1 = {
  template: `
    <div class="container">
      <strong>{{$t("loadbundle", {lang: this.lang}) }}</strong>
    </div>`,
  data() {
    return {
      lang: 'DE',
    };
  }
};
app.component('component1', Component1);
app.mount('#app')
```

Template:

    
```html
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <component1></component1>
</div>
```

Outputs the following:

```html
<div id="app">
  <p>Hello</p>
  <div class="container">
    <strong>Load bundle language: DE</strong>
  </div>
</div>
```

The `$t` function ususlly uses the language set in i18next.
