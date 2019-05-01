import { dirname } from 'path';
import sassCompiler from 'node-sass';
import { style as filter } from 'svelte-preprocess-filter';

export async function preprocessSass(
  sassOptions = {},
  filterOptions = {},
  { filename, content, attributes }
) {
  if (!filter(Object.assign({ name: 'sass' }, filterOptions), { attributes })) { return null; }

  const { css, map, stats } = await new Promise((resolve, reject) => sassCompiler.render({
    file: filename,
    data: content,
    includePaths: [
      dirname(filename),
    ],
    ...sassOptions,
  }, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  }));

  return { code: css.toString(), map, dependencies: stats.includedFiles };
}

export function sass(sassOptions, filterOptions) {
  return preprocessSass.bind(null, sassOptions, filterOptions);
}
