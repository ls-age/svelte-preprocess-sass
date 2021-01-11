<a name="1.0.0"></a>

# 1.0.0 (2021-01-11)

### Features

- Detect indented syntax from language attribute ([#104](https://github.com/ls-age/svelte-preprocess-sass/issues/104)) ([db0484c](https://github.com/ls-age/svelte-preprocess-sass/commits/db0484c))

### BREAKING CHANGES

- Now supports both SASS and SCSS syntax without the need to set the `name` filter option.

If you enabled SCSS before, just remove the filter options to support both:

```diff
  export default {
    ...
    plugins: [
      ...
      svelte({
        preprocess: {
-         style: sass({}, { name: 'scss' }),
+         style: sass(),
        },
      }),
    ],
  };
```

<a name="0.2.0"></a>

# 0.2.0 (2019-05-01)

### Features

- Return included files as dependencies ([#32](https://github.com/ls-age/svelte-preprocess-sass/issues/32)) ([26a0427](https://github.com/ls-age/svelte-preprocess-sass/commits/26a0427))

<a name="0.1.0"></a>

# 0.1.0 (2018-02-04)

### Features

- Implemented core functionality ([b4060bf](https://github.com/ls-age/svelte-preprocess-sass/commits/b4060bf))
