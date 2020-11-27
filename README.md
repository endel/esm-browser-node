# Broken ESM modules?

> Is it possible to have an ESM module that works both on Node.js and in the browser??

EXAMPLE: The `httpie` package specifies "browser" paths on its `package.json` multiple times, but frontend build tools don't seem to pick up the correct file - always selecting `node/index.mjs` (and failing because it has a built-in node dependency).

<img src="screenshot.png?raw=1" />

**Expectation:** When bundling a dependency that has both `"module"` and `"browser"` field, it is expected that the build-tool is going to use the **`"browser"`** version of it, since the **`"module"`** version is potentially targetted for Node.js (thus having a Node.js dependency inside)

**Reality:** Most build tools are trying to get the `"module"` version, and fail because the `"module"` version was made for Node.js and not browsers.

# Build tool

- [vite](#using-vite) ❌
- [snowpack](#using-snowpack) ❌
- [webpack](#using-webpack) ❌
- [esbuild](#using-esbuild) ✅
- [rollup](#using-rollup) ❌

## How to reproduce

## Using `vite`

```
cd vite
npm install
npm run dev
```

**Error**

Try to load `node/index.mjs` (node version)

```
[vite] Dep optimization failed with error:
Could not load http (imported by node_modules/httpie/node/index.mjs): ENOENT: no such file or directory, open 'http'
[Error: Could not load http (imported by node_modules/httpie/node/index.mjs): ENOENT: no such file or directory, open 'http'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'http',
  watchFiles: [
    '/Users/endel/projects/vite-esm-browser-node/node_modules/httpie/node/index.mjs',
    '/Users/endel/projects/vite-esm-browser-node/node_modules/vue/dist/vue.runtime.esm-bundler.js',
    '/Users/endel/projects/vite-esm-browser-node/node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js',
    '/Users/endel/projects/vite-esm-browser-node/node_modules/@vue/shared/dist/shared.esm-bundler.js',
    '/Users/endel/projects/vite-esm-browser-node/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js',
    '/Users/endel/projects/vite-esm-browser-node/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js',
    'http',
    'https',
    'url'
  ]
}
```

## Using `snowpack`

```
cd snowpack
npm install
npm start
```

**Error**

```
[snowpack] node_modules/httpie/node/index.mjs
   Module "https" (Node.js built-in) is not available in the browser. Run Snowpack with --polyfill-node to fix.
```


## Using `webpack`

```
cd webpack
npm install
npm start
```

**Error**

```
ERROR in ./node_modules/httpie/node/index.mjs 1:0-32
Module not found: Error: Can't resolve 'https' in '/Users/endel/projects/esm-browser-node/webpack/node_modules/httpie/node'
```


## Using `esbuild`

```
cd esbuild
npm install
npm start
```

`esbuild` successfully uses the "/xhr/index.mjs" path!

Though, its [comment section](https://github.com/evanw/esbuild/blob/f4cec94deaa61e5bb9bd3c0d14ad37ead1d8ca55/internal/resolver/resolver.go#L26-L33) references to an unresolved webpack issue ([webpack/webpack#4674](https://github.com/webpack/webpack/issues/4674)) as the guidance for the implementation - that has changed direction already. esbuild might then eventually move towards the latest webpack implementation and fail on this aspect as others do.

## Using `rollup`

```
cd rollup
npm install
npm start
```

**ERROR**

> Not sure if I've configured this properly (??)

Can't resolve the module. Ask to treat as external dependency.

```
(!) Unresolved dependencies
https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
httpie (imported by src/index.js)
(!) Missing global variable name
Use output.globals to specify browser global variable names corresponding to external modules
httpie (guessing 'httpie')
```
