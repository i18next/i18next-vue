import{_ as l,C as p,o as e,c as o,k as n,a as s,H as t,Q as c}from"./chunks/framework.a3f83090.js";const q=JSON.parse('{"title":"Single file components: <i18n>","description":"","frontmatter":{},"headers":[],"relativePath":"guide/single-file-component.md","filePath":"guide/single-file-component.md","lastUpdated":1690126106000}'),r={name:"guide/single-file-component.md"},i={id:"single-file-components-i18n",tabindex:"-1"},y=n("code",null,"<i18n>",-1),E=n("a",{class:"header-anchor",href:"#single-file-components-i18n","aria-label":'Permalink to "Single file components: `<i18n>` <Badge type="danger" text="Removed in 3.0" />"'},"​",-1),d=c(`<div class="danger custom-block"><p class="custom-block-title">NOTE</p><p><code>&lt;i18n&gt;</code> blocks are no longer supported in <code>i18next-vue</code> v3. This is probably already not working in v2, because there are no Vue 3 loaders producing the right format.</p></div><p>by <a href="https://github.com/kazupon" target="_blank" rel="noreferrer">@kazupon</a></p><p>Single File Components can have an <code>&lt;i18n&gt;</code> block for defining translations locally in the component.</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">i18n</span><span style="color:#E1E4E8;">&gt; { &quot;en&quot;: { &quot;hello&quot;: &quot;hello world!&quot; } } &lt;/</span><span style="color:#85E89D;">i18n</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">&gt;&lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;message: {{ $t(&#39;hello&#39;) }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;app&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">i18n</span><span style="color:#24292E;">&gt; { &quot;en&quot;: { &quot;hello&quot;: &quot;hello world!&quot; } } &lt;/</span><span style="color:#22863A;">i18n</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">&gt;&lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;message: {{ $t(&#39;hello&#39;) }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;app&quot;</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="i18n-tag" tabindex="-1">i18n tag <a class="header-anchor" href="#i18n-tag" aria-label="Permalink to &quot;i18n tag&quot;">​</a></h2><p>To use the <code>&lt;i18&gt;</code> tag you need to use vue-loader:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm install @kazupon/vue-i18n-loader --save-dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm install @kazupon/vue-i18n-loader --save-dev</span></span></code></pre></div><p>For detailed documentation check the <a href="https://github.com/kazupon/vue-i18n-loader" target="_blank" rel="noreferrer">original docs</a>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// vue-loader (~v14.x):</span></span>
<span class="line"><span style="color:#e1e4e8;">module.exports = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  // ...</span></span>
<span class="line"><span style="color:#e1e4e8;">  module: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    rules: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      {</span></span>
<span class="line"><span style="color:#e1e4e8;">        test: /\\.vue$/,</span></span>
<span class="line"><span style="color:#e1e4e8;">        loader: &#39;vue-loader&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        options: {</span></span>
<span class="line"><span style="color:#e1e4e8;">          loaders: {</span></span>
<span class="line"><span style="color:#e1e4e8;">            // you need to specify \`i18n\` loaders key with \`vue-i18n-loader\` (https://github.com/kazupon/vue-i18n-loader)</span></span>
<span class="line"><span style="color:#e1e4e8;">            i18n: &#39;@kazupon/vue-i18n-loader&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">          }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">      },</span></span>
<span class="line"><span style="color:#e1e4e8;">      // ...</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  // ...</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// vue-loader (~v14.x):</span></span>
<span class="line"><span style="color:#24292e;">module.exports = {</span></span>
<span class="line"><span style="color:#24292e;">  // ...</span></span>
<span class="line"><span style="color:#24292e;">  module: {</span></span>
<span class="line"><span style="color:#24292e;">    rules: [</span></span>
<span class="line"><span style="color:#24292e;">      {</span></span>
<span class="line"><span style="color:#24292e;">        test: /\\.vue$/,</span></span>
<span class="line"><span style="color:#24292e;">        loader: &#39;vue-loader&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        options: {</span></span>
<span class="line"><span style="color:#24292e;">          loaders: {</span></span>
<span class="line"><span style="color:#24292e;">            // you need to specify \`i18n\` loaders key with \`vue-i18n-loader\` (https://github.com/kazupon/vue-i18n-loader)</span></span>
<span class="line"><span style="color:#24292e;">            i18n: &#39;@kazupon/vue-i18n-loader&#39;</span></span>
<span class="line"><span style="color:#24292e;">          }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">      },</span></span>
<span class="line"><span style="color:#24292e;">      // ...</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  // ...</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="use-it-with-yaml" tabindex="-1">Use it with YAML: <a class="header-anchor" href="#use-it-with-yaml" aria-label="Permalink to &quot;Use it with YAML:&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm install yaml-loader --save-dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm install yaml-loader --save-dev</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#FDAEB7;font-style:italic;">i18n</span><span style="color:#E1E4E8;">&gt; en: hello: &quot;hello world!&quot; &lt;/</span><span style="color:#FDAEB7;font-style:italic;">i18n</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#B31D28;font-style:italic;">i18n</span><span style="color:#24292E;">&gt; en: hello: &quot;hello world!&quot; &lt;/</span><span style="color:#B31D28;font-style:italic;">i18n</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#85E89D;font-weight:bold;">\\.</span><span style="color:#DBEDFF;">vue</span><span style="color:#F97583;">$</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        loader: </span><span style="color:#9ECBFF;">&quot;vue-loader&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        options: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          preLoaders: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            i18n: </span><span style="color:#9ECBFF;">&quot;yaml-loader&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          },</span></span>
<span class="line"><span style="color:#E1E4E8;">          loaders: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            i18n: </span><span style="color:#9ECBFF;">&quot;@kazupon/vue-i18n-loader&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">  module: {</span></span>
<span class="line"><span style="color:#24292E;">    rules: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        test:</span><span style="color:#032F62;"> /</span><span style="color:#22863A;font-weight:bold;">\\.</span><span style="color:#032F62;">vue</span><span style="color:#D73A49;">$</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        loader: </span><span style="color:#032F62;">&quot;vue-loader&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        options: {</span></span>
<span class="line"><span style="color:#24292E;">          preLoaders: {</span></span>
<span class="line"><span style="color:#24292E;">            i18n: </span><span style="color:#032F62;">&quot;yaml-loader&quot;</span></span>
<span class="line"><span style="color:#24292E;">          },</span></span>
<span class="line"><span style="color:#24292E;">          loaders: {</span></span>
<span class="line"><span style="color:#24292E;">            i18n: </span><span style="color:#032F62;">&quot;@kazupon/vue-i18n-loader&quot;</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,13);function u(g,h,v,m,k,b){const a=p("Badge");return e(),o("div",null,[n("h1",i,[s("Single file components: "),y,s(),t(a,{type:"danger",text:"Removed in 3.0"}),s(),E]),d])}const f=l(r,[["render",u]]);export{q as __pageData,f as default};
