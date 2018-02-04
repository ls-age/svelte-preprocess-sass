import test from 'ava';
import { sass, preprocessSass } from '../src/index';

test('preprocessSass should filter non-sass styles', async t => {
  t.is(await preprocessSass({}, {}, { attributes: {} }), null);
});

test('preprocessSass should return preprocessed styles', async t => {
  const result = await preprocessSass({}, {}, {
    attributes: { lang: 'sass' },
    filename: './src/components/App.html',
    content: `$color: red;
b {
  color: $color
}`,
  });
  t.is(result.code, `b {
  color: red; }
`);
});

test('sass should return a function', async t => {
  t.is(typeof sass(), 'function');
});
