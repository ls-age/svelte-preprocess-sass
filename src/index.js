import { dirname } from 'path';
import sassCompiler from 'node-sass';
import { style as filter } from 'svelte-preprocess-filter';

export async function preprocessSass(
  sassOptions = {},
  filterOptions = {},
  { filename, content, attributes }
) {
  if (!filter(Object.assign({ name: 'sass' }, filterOptions), { attributes })) { return null; }

  const { data, includePaths } = sassOptions;

  const { css, map } = await new Promise((resolve, reject) => sassCompiler.render(Object.assign({},
    sassOptions,
    {
      file: filename,
      data: `${data ? `${data}
` : ''}${content}`,
      includePaths: (includePaths || []).concat([
        dirname(filename),
      ]),
    }), (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  }));

  return { code: css.toString(), map };
}

export function sass(sassOptions, filterOptions) {
  return preprocessSass.bind(null, sassOptions, filterOptions);
}
