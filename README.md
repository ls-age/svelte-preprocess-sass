# svelte-preprocess-sass

[![CircleCI](https://circleci.com/gh/ls-age/svelte-preprocess-sass.svg?style=svg)](https://circleci.com/gh/ls-age/svelte-preprocess-sass)
[![codecov](https://codecov.io/gh/ls-age/svelte-preprocess-sass/branch/master/graph/badge.svg)](https://codecov.io/gh/ls-age/svelte-preprocess-sass)

> Svelte preprocessor for [sass](http://sass-lang.com)

## Installation

```bash
npm install --save-dev svelte-preprocess-sass node-sass
```

## Usage

**Using rollup-plugin-svelte**

```javascript
// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import { sass } from 'svelte-preprocess-sass';
...

export default {
  ...
  plugins: [
    ...
    svelte({
      preprocess: {
        style: sass(),
      },
    }),
  ],
};
```

Now all `<style>` elements in your components that have a `type="text/sass"` or `lang="sass"` attribute will be preprocessed by sass.

If you are using `type="text/scss"` or `lang="scss"` then you will have to supply
the `name` option as `scss`.

### Passing options to sass

The `sass` function passes the first argument to the sass compiler, e.g.:

```javascript
...
sass({
  plugins: [
    ...
  ]
})
```


### Filtering styles

The `sass` function passes the second argument to [svelte-preprocess-filter](https://github.com/ls-age/svelte-preprocess-filter), e.g.:

```javascript
...
sass(
  {} // Empty sass options
  { all: true } // Preprocess all styles
)
```

For available options visit the [sass](http://sass-lang.com/documentation/) and
the [node-sass](https://github.com/sass/node-sass) documentation.

> If you want to include scss from node_modules, you should supply the `includePaths`
property in the `options`. i.e. `includePaths: ['src', 'node_modules']`.

