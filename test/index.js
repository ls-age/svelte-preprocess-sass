import test from 'ava';
import { sass, preprocessSass } from '../src/index';

async function preprocess(attributes, styles, sassOptions = {}, filterOptions = {}) {
  return (
    await preprocessSass(sassOptions, filterOptions, {
      attributes,
      filename: './src/components/App.html',
      content: styles,
    })
  ).code;
}

const sampleScss = `$color: red;
b {
  color: $color
}`;

const sampleSass = `$primary: red
b
  color: $primary`;

const expected = `b {
  color: red;
}`;

test('preprocessSass should filter non-sass styles', async (t) => {
  t.is(await preprocessSass({}, {}, { attributes: {} }), null);
});

test('preprocessSass should return preprocessed styles', async (t) => {
  t.is(await preprocess({ lang: 'scss' }, sampleScss), expected);
  t.is(await preprocess({ type: 'text/scss' }, sampleScss), expected);
});

test('sass should return a function', async (t) => {
  t.is(typeof sass(), 'function');
});

test('preprocessSass should use indented syntax with language attribute set to "sass"', async (t) => {
  t.is(await preprocess({ lang: 'sass' }, sampleSass), expected);
  t.is(await preprocess({ type: 'text/sass' }, sampleSass), expected);
});

// Of course, using explicit sass in scss styles makes no sense at all 😅
test('preprocessSass should use indented syntax if set in sassOptions', async (t) => {
  t.is(await preprocess({ lang: 'scss' }, sampleSass, { indentedSyntax: true }), expected);
  t.is(await preprocess({ type: 'text/scss' }, sampleSass, { indentedSyntax: true }), expected);
});

test('preprocessSass should not detect sass with filterOptions', async (t) => {
  t.is(await preprocessSass({}, { name: 'scss' }, { attributes: { lang: 'sass' } }), null);
  t.is(await preprocessSass({}, { name: 'scss' }, { attributes: { type: 'text/sass' } }), null);
});
