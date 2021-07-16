'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var sassCompiler = require('sass');
var sveltePreprocessFilter = require('svelte-preprocess-filter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sassCompiler__default = /*#__PURE__*/_interopDefaultLegacy(sassCompiler);

async function preprocessSass(sassOptions = {}, filterOptions = {}, {
  filename,
  content,
  attributes
}) {
  // Detect if styles should be processed and in we should use sass (indented) syntax.
  let indentedSyntax;
  let processStyles;

  if (filterOptions.name === undefined) {
    indentedSyntax = sveltePreprocessFilter.style({
      name: 'sass',
      ...filterOptions
    }, {
      attributes
    });
    processStyles = indentedSyntax || sveltePreprocessFilter.style({
      name: 'scss',
      ...filterOptions
    }, {
      attributes
    });
  } else {
    indentedSyntax = filterOptions.name === 'sass';
    processStyles = sveltePreprocessFilter.style(filterOptions, {
      attributes
    });
  }

  if (!processStyles) return null;
  const {
    css,
    map,
    stats
  } = await new Promise((resolve, reject) => sassCompiler__default['default'].render({
    file: filename,
    data: content,
    includePaths: [path.dirname(filename)],
    indentedSyntax,
    ...sassOptions
  }, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  }));
  return {
    code: css.toString(),
    map,
    dependencies: stats.includedFiles
  };
}
function sass(sassOptions, filterOptions) {
  return preprocessSass.bind(null, sassOptions, filterOptions);
}

exports.preprocessSass = preprocessSass;
exports.sass = sass;
//# sourceMappingURL=index.js.map
