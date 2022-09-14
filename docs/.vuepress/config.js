const pkg = require('../../package.json');

module.exports = ctx => ({
  base: '/i18next-vue/vue-2/',
  title: pkg.name,
  description: pkg.description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  theme: '@vuepress/theme-default',
  themeConfig: {
    repo: 'https://github.com/i18next/i18next-vue/tree/vue-2',
    editLinks: true,
    docsDir: 'docs',
    docsBranch: 'vue-2-docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          {
            text: 'Guide',
            link: '/guide/started.md',
          },
          {
            text: 'v1.x (Vue 2)',
            ariaLabel: 'Version Menu',
            items: [
              { text: 'v2.x (Vue 3)', link: 'https://i18next.github.io/i18next-vue/' }
            ]
          },
          {
            text: 'Release Notes',
            link: 'https://github.com/i18next/i18next-vue/releases'
          }
        ],
        sidebar: [
          '/introduction.md',
          '/installation.md',
          {
            title: 'Guide',
            collapsable: false,
            children: [
              '/guide/started.md',
              '/guide/component.md',
              '/guide/component-interpolation.md',
              '/guide/i18n-options.md',
              '/guide/i18n.md',
              '/guide/single-file-component.md',
              '/guide/ssr.md',
            ]
          },
          {
            title: 'Migration',
            collapsable: false,
            children: [
              '/migration.md',
            ]
          }
        ]
      }
    }
  }
})
