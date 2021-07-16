# svelte-preprocess-sass

[![CircleCI](https://circleci.com/gh/ls-age/svelte-preprocess-sass.svg?style=svg)](https://circleci.com/gh/ls-age/svelte-preprocess-sass)
[![codecov](https://codecov.io/gh/ls-age/svelte-preprocess-sass/branch/master/graph/badge.svg)](https://codecov.io/gh/ls-age/svelte-preprocess-sass)

> Svelte preprocessor for [sass](http://sass-lang.com)

## Installation

```bash
npm install --save-dev svelte-preprocess-sass sass
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

```svelte
<style type="text/sass">
  $primary: red

  button
    color: $primary
</style>

<button on:click>Click me</button>
```

### Using SCSS

...just use `type="text/scss"` or `lang="scss"` in your components:

```svelte
<style type="text/scss">
  $primary: red;

  button {
    color: $primary;
  }
</style>

<button on:click>Click me</button>
```

<details>
<summary>Note: Before version 1, you had to explicitly allow `scss` attributes</summary>

> From the old readme:

If you prefer the non-indented syntax you have to supply the `name` option:

```js
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
        style: sass({}, { name: 'scss' }),
      },
    }),
  ],
};
```

</details>

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

**Common options:**

- Allow imports from _node_modules_ via the _includePaths_ option:

  ```js
  import { join } from 'path';
  import svelte from 'rollup-plugin-svelte';
  import { sass } from 'svelte-preprocess-sass';

  export default {
    ...
    plugins: [
      ...
      svelte({
        preprocess: {
          style: sass({
            includePaths: [
              // Allow imports from 'node_modules'
              join(__dirname, 'node_modules'),
            ]
          }),
        },
      }),
    ],
  };
  ```

For available options visit the [sass](http://sass-lang.com/documentation/) and
[dart-sass](https://github.com/sass/dart-sass#javascript-api) docs.

### Filtering styles

The `sass` function passes the second argument to [svelte-preprocess-filter](https://github.com/ls-age/svelte-preprocess-filter), e.g.:

```javascript
...
sass(
  {}, // Empty sass options
  { all: true } // Preprocess all styles
)
```

### Creating component libraries

Take a look at the [LukasHechenberger/sample-svelte-scss-lib](https://github.com/LukasHechenberger/sample-svelte-scss-lib) repository for an example of how to create component libraries with extendable styles. (Discussed in [#95](https://github.com/ls-age/svelte-preprocess-sass/issues/95))
