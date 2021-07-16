import { dirname } from 'path';
import sassCompiler from 'sass';
import { style as filter } from 'svelte-preprocess-filter';

export async function preprocessSass(
  sassOptions = {},
  filterOptions = {},
  { filename, content, attributes }
) {
  // Detect if styles should be processed and in we should use sass (indented) syntax.
  let indentedSyntax;
  let processStyles;

  if (filterOptions.name === undefined) {
    indentedSyntax = filter({ name: 'sass', ...filterOptions }, { attributes });
    processStyles = indentedSyntax || filter({ name: 'scss', ...filterOptions }, { attributes });
  } else {
    indentedSyntax = filterOptions.name === 'sass';
    processStyles = filter(filterOptions, { attributes });
  }

  if (!processStyles) return null;

  const { css, map, stats } = await new Promise((resolve, reject) =>
    sassCompiler.render(
      {
        file: filename,
        data: content,
        includePaths: [dirname(filename)],
        indentedSyntax,
        ...sassOptions,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  );

  return { code: css.toString(), map, dependencies: stats.includedFiles };
}

export function sass(sassOptions, filterOptions) {
  return preprocessSass.bind(null, sassOptions, filterOptions);
}
