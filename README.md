# Broken ESM modules?

> Is it possible to have an ESM module that works both on Node.js and in the browser??

The `httpie` package specifies "browser" paths on its `package.json` multiple times, but frontend build tools don't seem to pick up the correct file (always selecting `node/index.mjs`)

<img src="screenshot.png?raw=1" />

## How to reproduce

## Using `vite`

```
cd vite
npm install
npm run dev
```

**Error**

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

**Error**

```
...
ERROR in ./node_modules/httpie/node/index.mjs 1:0-32
Module not found: Error: Can't resolve 'https' in '/Users/endel/projects/esm-browser-node/webpack/node_modules/httpie/node'
...
```
