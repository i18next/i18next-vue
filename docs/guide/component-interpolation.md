# Component interpolation

Instead of interpolating values with <code v-pre>{{ someValue }}</code> in the translations you can also interpolate markup (including Vue components) by using the `<i18next>` component and [named slots](https://vuejs.org/guide/components/slots.html#named-slots). These can be refrenced as `{ someSlot }` in the translations (mind the single curly braces).

This way you can move blocks of markup around freely in the translations.

## Simple example

```javascript
const locales = {
  en: {
    term: "I accept {termsOfUseLink}. {strongPromise}.",
    tos: "Term of Service",
    promise: "I promise"
  },
  de: {
    term: "{strongPromise}! Ich stimme den {termsOfUseLink} zu.",
    tos: "Nutzungsbedingungen",
    promise: "Ich versprech's"
  },
};

i18next.init({
  lng: "en",
  resources: {
    en: { translation: locales.en },
    de: { translation: locales.de }
  }
});

// ...
```

```vue
<template>
  <label>
    <i18next :translation="$t('term')">
      <template #termsOfUseLink>
        <a href="#" target="_blank">{{ $t("tos") }}</a>
      </template>
      <template #strongPromise>
        <strong>{{ $t("promise") }}</strong>
      </template>
    </i18next>
  </label>
</template>
```


For English (en) this will render
```html
<label>
  I accept the <a href="#" target="_blank">Term of Service</a>. <strong>I promise</strong>.
</label>
```

For German (de) this will render
```html
<label>
  <strong>Ich versprech's</strong>! Ich stimme den <a href="#" target="_blank">Nutzungsbedingungen</a> zu.
</label>
```

## Mixing with normal interpolation

In the `$t()` call for `:translation` you can use all of i18next's features like interpolating values or plurals (using the normal double curly braces).

```javascript
const locales = {
  en: {
    "component-greeting_one": "{greeting} single person {{whatTheyDo}}",
    "component-greeting_other": "{greeting} {{count}} people {{whatTheyDo}}",
    hello: "Greetings"
  }
};
```

```vue
<template>
  <label>
    <i18next :translation="$t('component-greeting, {count: 42, whatTheyDo: 'being amazing'})">
      <template #greeting>
        <strong>{{ $t('hello') }}</strong>
      </template>
    </i18next>
  </label>
</template>
```

This will render
```html
<label>
  <strong>Greetings</strong> 42 people being amazing
</label>
```

## Custom start/end markers <Badge type="tip" text="Since 2.2.0" />

Custom slot values may be useful when the default braces (`{` and `}`) are wrongly treated by the Locize service or don't satisfy other needs.

See [the README](https://github.com/i18next/i18next-vue/tree/main#custom-slot-values) for details.
