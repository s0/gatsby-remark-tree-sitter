# gatsby-remark-tree-sitter

Highlight code in Markdown files using
[tree-sitter](https://github.com/tree-sitter/tree-sitter), powered by [remark-tree-sitter](https://github.com/samlanning/remark-tree-sitter).

## Install

```
npm install --save gatsby-remark-tree-sitter
```

## How it works

This plugin uses the same mechanism and data as Atom for syntax highlighting,
So to highlight a particular language, you need to either:

* Install the APM (Atom) package for that language and tell `remark-tree-sitter`
  to import it, using the [`grammarPackages` option](https://github.com/samlanning/remark-tree-sitter#optionsgrammarpackages).
* Provide the `tree-sitter` grammar and scopeMappings manually,
  using the using the [`grammars` option](https://github.com/samlanning/remark-tree-sitter#optionsgrammars).

*For more information on how this mechanism works,
[check out the documentation for `tree-sitter-hast`](https://github.com/samlanning/tree-sitter-hast#scope-mappings).*

Any code blocks that are encountered for which there is not a matching language will be ignored.

## How to use

Add `gatsby-remark-tree-sitter` to the list of plugins for `gatsby-transformer-remark`,
and list the grammars you want to use in your `gatsby-config.js` file:

**Example:**

```
npm install --save @atom-languages/language-typescript
```

```js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-tree-sitter",
          options: {
            grammarPackages: ['@atom-languages/language-typescript']
          },
        },
      ],
    },
  },
]
```

This would then render the following markdown:

````markdown
```typescript
function foo() {
  return 1;
}
```
````

As this HTML:

```html
<pre><code class="tree-sitter language-typescript"><span class="source ts"><span class="storage type function">function</span> <span class="entity name function">foo</span><span class="punctuation definition parameters begin bracket round">(</span><span class="punctuation definition parameters end bracket round">)</span> <span class="punctuation definition function body begin bracket curly">{</span>
  <span class="keyword control">return</span> <span class="constant numeric">1</span><span class="punctuation terminator statement semicolon">;</span>
<span class="punctuation definition function body end bracket curly">}</span></span></code></pre>
```

*Note that either `grammarPackages` or `grammars` **must** be specified in the options.*

For a list of language packages that you can use in `grammarPackages`, please see [Atom language packages](https://github.com/samlanning/remark-tree-sitter#atom-language-packages).

## Whitelisting classes

Sometimes including the full list of classes applied can be too much,
and you'd like to only include those that you have stylesheets for.

To do this, you can pass in a whitelist of classes that you actually care about.

**Example:** The following configuration...

```js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-tree-sitter",
          options: {
            grammarPackages: ['@atom-languages/language-typescript'],
            classWhitelist: ['storage', 'numeric']
          },
        },
      ],
    },
  },
]
```

...will convert this markdown...

````md
```typescript
function foo() {
  return 1;
}
```
````

...to this:

```html
<pre><code class="tree-sitter language-typescript"><span><span class="storage">function</span> foo() {
  return <span class="numeric">1</span>;
}</span></code></pre>
```

## Full Documentation

For for full documentation on the options you can use, please see [the documentation for `remark-tree-sitter`](https://github.com/samlanning/remark-tree-sitter#api), as options are passed directly to that plugin.
