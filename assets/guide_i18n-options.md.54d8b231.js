import{_ as o,C as e,o as t,c,k as s,a as n,H as p,Q as l}from"./chunks/framework.a3f83090.js";const P=JSON.parse('{"title":"i18nOptions","description":"","frontmatter":{},"headers":[],"relativePath":"guide/i18n-options.md","filePath":"guide/i18n-options.md","lastUpdated":1690126106000}'),r={name:"guide/i18n-options.md"},E={id:"i18noptions",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#i18noptions","aria-label":'Permalink to "i18nOptions <Badge type="warning" text="Deprecated since 3.0" /><Badge type="danger" text="For removal in 4.0" />"'},"​",-1),y=l('<div class="warning custom-block"><p class="custom-block-title">Deprecated</p><p><code>i18nOptions</code> are now deprecated and <strong>will be removed in v4</strong>. They can be replaced with <code>useTranslation()</code> using its <a href="/i18next-vue/guide/composition-api.html#customize-t">new parameters in v3</a> for most use-cases.</p><p>In version 3 you need to enable the <a href="/i18next-vue/guide/started.html#plugin-options"><code>legacyI18nOptionsSupport</code> plugin option</a> for the <code>i18nOptions</code> to apply. Even with that enabled, v3 no longer supports <a href="#messages"><code>messages</code></a> in <code>i18nOptions</code>.</p></div><p>You can set some translation options on a per-component basis using the <code>i18nOptions</code> option object.</p>',2),d={id:"namespaces",tabindex:"-1"},u=s("code",null,"namespaces",-1),g=s("a",{class:"header-anchor",href:"#namespaces","aria-label":'Permalink to "`namespaces` <Badge type="warning" text="Deprecated since 3.0" />"'},"​",-1),F=l(`<p>The namespace(s) to lookup translations in. These will be loaded automatically.</p><p>FIXME: example still uses v2&#39;s <code>&lt;i18next&gt;</code></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">locales</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  en: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    tos: </span><span style="color:#9ECBFF;">&quot;the Terms of Service&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    term: </span><span style="color:#9ECBFF;">&quot;I accept {{0}}. {{1}}.&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    promise: </span><span style="color:#9ECBFF;">&quot;I promise&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">i18next.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  lng: </span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  fallbackLng: </span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  resources: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    en: { common: locales.en }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">app</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createApp</span><span style="color:#E1E4E8;">(</span><span style="color:#6A737D;">/* ... */</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  i18nOptions: { namespaces: </span><span style="color:#9ECBFF;">&quot;common&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;i18next path=&quot;term&quot; tag=&quot;label&quot;&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">        &lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;{{ $t(&quot;tos&quot;) }}&lt;/a&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">        &lt;strong&gt;{{ $t(&quot;promise&quot;) }}&lt;/strong&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;/i18next&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">locales</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  en: {</span></span>
<span class="line"><span style="color:#24292E;">    tos: </span><span style="color:#032F62;">&quot;the Terms of Service&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    term: </span><span style="color:#032F62;">&quot;I accept {{0}}. {{1}}.&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    promise: </span><span style="color:#032F62;">&quot;I promise&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">i18next.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  lng: </span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  fallbackLng: </span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  resources: {</span></span>
<span class="line"><span style="color:#24292E;">    en: { common: locales.en }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">app</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createApp</span><span style="color:#24292E;">(</span><span style="color:#6A737D;">/* ... */</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  i18nOptions: { namespaces: </span><span style="color:#032F62;">&quot;common&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#032F62;">      &lt;i18next path=&quot;term&quot; tag=&quot;label&quot;&gt;</span></span>
<span class="line"><span style="color:#032F62;">        &lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;{{ $t(&quot;tos&quot;) }}&lt;/a&gt;</span></span>
<span class="line"><span style="color:#032F62;">        &lt;strong&gt;{{ $t(&quot;promise&quot;) }}&lt;/strong&gt;</span></span>
<span class="line"><span style="color:#032F62;">      &lt;/i18next&gt;</span></span>
<span class="line"><span style="color:#032F62;">    &lt;/div&gt;\`</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>Namespaces can also be an array, sorted by priority.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">commonResources</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  en: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    promise: </span><span style="color:#9ECBFF;">&quot;I promise&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">appResources</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  en: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    promise: </span><span style="color:#9ECBFF;">&quot;The app promise&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">i18next.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  lng: </span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  fallbackLng: </span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  resources: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    en: { common: commonResources.en, app: appResources.en }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  i18nOptions: { namespaces: [</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;common&quot;</span><span style="color:#E1E4E8;">] },</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`&lt;strong&gt;{{ $t(&quot;promise&quot;) }}&lt;/strong&gt;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">commonResources</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  en: {</span></span>
<span class="line"><span style="color:#24292E;">    promise: </span><span style="color:#032F62;">&quot;I promise&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">appResources</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  en: {</span></span>
<span class="line"><span style="color:#24292E;">    promise: </span><span style="color:#032F62;">&quot;The app promise&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">i18next.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  lng: </span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  fallbackLng: </span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  resources: {</span></span>
<span class="line"><span style="color:#24292E;">    en: { common: commonResources.en, app: appResources.en }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  i18nOptions: { namespaces: [</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;common&quot;</span><span style="color:#24292E;">] },</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`&lt;strong&gt;{{ $t(&quot;promise&quot;) }}&lt;/strong&gt;\`</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div>`,5),m={id:"keyprefix",tabindex:"-1"},h=s("code",null,"keyPrefix",-1),q=s("a",{class:"header-anchor",href:"#keyprefix","aria-label":'Permalink to "`keyPrefix` <Badge type="warning" text="Deprecated since 3.0" />"'},"​",-1),_=l(`<p>You can prefix all keys used for translations in a component. This way you can use shorter keys in <code>$t()</code>.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">locales</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  en: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    message: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      greetings: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hello: </span><span style="color:#9ECBFF;">&quot;Hello&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        world: </span><span style="color:#9ECBFF;">&quot;globe&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">i18next.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;app&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  i18nOptions: { keyPrefix: </span><span style="color:#9ECBFF;">&#39;message.greetings&#39;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;strong&gt;{{ $t(&quot;hello&quot;) }}&lt;/strong&gt; {{ $t(&quot;world&quot;) }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;/div&gt;\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">locales</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  en: {</span></span>
<span class="line"><span style="color:#24292E;">    message: {</span></span>
<span class="line"><span style="color:#24292E;">      greetings: {</span></span>
<span class="line"><span style="color:#24292E;">        hello: </span><span style="color:#032F62;">&quot;Hello&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        world: </span><span style="color:#032F62;">&quot;globe&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">i18next.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;app&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  i18nOptions: { keyPrefix: </span><span style="color:#032F62;">&#39;message.greetings&#39;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#032F62;">      &lt;strong&gt;{{ $t(&quot;hello&quot;) }}&lt;/strong&gt; {{ $t(&quot;world&quot;) }}</span></span>
<span class="line"><span style="color:#032F62;">    &lt;/div&gt;\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>This is easier to read and write than</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;app&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;strong&gt;{{ $t(&quot;message.greetings.hello&quot;) }}&lt;/strong&gt; {{ $t(&quot;message.greetings.world&quot;) }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;/div&gt;\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;app&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#032F62;">      &lt;strong&gt;{{ $t(&quot;message.greetings.hello&quot;) }}&lt;/strong&gt; {{ $t(&quot;message.greetings.world&quot;) }}</span></span>
<span class="line"><span style="color:#032F62;">    &lt;/div&gt;\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div>`,4),C={id:"messages",tabindex:"-1"},v=s("code",null,"messages",-1),B=s("a",{class:"header-anchor",href:"#messages","aria-label":'Permalink to "`messages` <Badge type="danger" text="Removed in 3.0" />"'},"​",-1),x=l(`<div class="danger custom-block"><p class="custom-block-title">NOTE</p><p><code>messages</code> is no longer supported in <code>i18next-vue</code> v3.</p></div><p>Translations can not only be defined in translation files but also in the <code>i18nOptions</code>.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">i18next.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;app&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  i18nOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    messages: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      de: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hello: </span><span style="color:#9ECBFF;">&#39;Hello!&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;strong&gt;{{ $t(&quot;hello&quot;) }}&lt;/strong&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;/div&gt;\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">i18next.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;app&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  i18nOptions: {</span></span>
<span class="line"><span style="color:#24292E;">    messages: {</span></span>
<span class="line"><span style="color:#24292E;">      de: {</span></span>
<span class="line"><span style="color:#24292E;">        hello: </span><span style="color:#032F62;">&#39;Hello!&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#032F62;">      &lt;strong&gt;{{ $t(&quot;hello&quot;) }}&lt;/strong&gt;</span></span>
<span class="line"><span style="color:#032F62;">    &lt;/div&gt;\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>Another way of doing this is <a href="./single-file-component.html">using an <code>&lt;i18n&gt;</code> block</a>.</p>`,4),b={id:"lng",tabindex:"-1"},k=s("code",null,"lng",-1),T=s("a",{class:"header-anchor",href:"#lng","aria-label":'Permalink to "`lng` <Badge type="warning" text="Deprecated since 3.0" />"'},"​",-1),f=l(`<p>Set a fixed language for a component.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">i18next.</span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;app&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  i18nOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    lng: </span><span style="color:#9ECBFF;">&quot;de&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  template: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">      &lt;strong&gt;{{ $t(&quot;hello&quot;) }}&lt;/strong&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &lt;/div&gt;\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">i18next.</span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(I18NextVue, { i18next });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;app&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  i18nOptions: {</span></span>
<span class="line"><span style="color:#24292E;">    lng: </span><span style="color:#032F62;">&quot;de&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  template: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#032F62;">      &lt;strong&gt;{{ $t(&quot;hello&quot;) }}&lt;/strong&gt;</span></span>
<span class="line"><span style="color:#032F62;">    &lt;/div&gt;\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div>`,2);function A(D,I,w,V,$,N){const a=e("Badge");return t(),c("div",null,[s("h1",E,[n("i18nOptions "),p(a,{type:"warning",text:"Deprecated since 3.0"}),p(a,{type:"danger",text:"For removal in 4.0"}),n(),i]),y,s("h2",d,[u,n(),p(a,{type:"warning",text:"Deprecated since 3.0"}),n(),g]),F,s("h2",m,[h,n(),p(a,{type:"warning",text:"Deprecated since 3.0"}),n(),q]),_,s("h2",C,[v,n(),p(a,{type:"danger",text:"Removed in 3.0"}),n(),B]),x,s("h2",b,[k,n(),p(a,{type:"warning",text:"Deprecated since 3.0"}),n(),T]),f])}const S=o(r,[["render",A]]);export{P as __pageData,S as default};
