# svelte-preprocess-sass

[![CircleCI](https://circleci.com/gh/ls-age/svelte-preprocess-sass.svg?style=svg)](https://circleci.com/gh/ls-age/svelte-preprocess-sass)
[![codecov](https://codecov.io/gh/ls-age/svelte-preprocess-sass/branch/master/graph/badge.svg)](https://codecov.io/gh/ls-age/svelte-preprocess-sass)
[![Greenkeeper badge](https://badges.greenkeeper.io/ls-age/svelte-preprocess-sass.svg)](https://greenkeeper.io/)

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

For available options visit [the sass documentation](http://sass-lang.com/documentation/).

