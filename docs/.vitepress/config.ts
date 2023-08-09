import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/i18next-vue/',
  title: "i18next-vue",
  description: "i18next integration for Vue",
  lang: 'en-US',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Guide',
        link: '/guide/started',
      },
      {
        text: 'v2.x/3.x (Vue 3)',
        items: [
          { text: 'v1.x (Vue 2)', link: 'https://i18next.github.io/i18next-vue/vue-2/introduction' }
        ]
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/i18next/i18next-vue/releases'
      }
    ],

    sidebar: [
      {
        text: 'Introduction',
        link: '/introduction',
      },
      {
        text: 'Installation',
        link: '/installation',
      },
      {
        text: 'Guide',
        items: [
          {
            text: 'Getting started',
            link: '/guide/started',
          },
          {
            text: 'Component-based localization',
            link: '/guide/component.md',
          },
          {
            text: 'Composition API',
            link: '/guide/composition-api.md',
          },
          {
            text: 'Component Interpolation',
            link: '/guide/component-interpolation.md',
          },
          {
            text: 'Accessing i18next',
            link: '/guide/i18n.md',
          },
          {
            text: 'SSR',
            link: '/guide/ssr.md',
          },
          {
            text: 'i18nOptions',
            link: '/guide/i18n-options.md',
          },
          {
            text: '&lt;i18n&gt; blocks',
            link: '/guide/single-file-component.md',
          },
        ]
      },
      {
        text: 'Migration',
        items: [
          {
            text: 'Migration from <br>@panter/vue-i18next',
            link: '/migration.md',
          },
          {
            text: 'Migration from <br>i18next-vue v2.x',
            link: '/migration-v3.md',
          },
        ]
      },
    ],
    socialLinks: [
      { icon: 'github' as const, link: 'https://github.com/i18next/i18next-vue' }
    ],
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: { dateStyle: 'medium' }

    },
    search: {
      provider: 'local'
    }
  }
})
