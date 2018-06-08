'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var sassCompiler = _interopDefault(require('node-sass'));

/* eslint-disable import/prefer-default-export */

function style({ name, all = false, type = true, lang = true } = {}, { attributes } = {}) {
  if (all) {
    return true;
  }

  if (!name) {
    throw new Error('Missing \'name\' filter option');
  }
  if (!attributes) {
    throw new Error('No attributes passed to filter');
  }

  const typeAttributes = [type && attributes.type, lang && attributes.lang];

  return typeAttributes.includes(name) || typeAttributes.includes(`text/${name}`);
}

async function preprocessSass(sassOptions = {}, filterOptions = {}, { filename, content, attributes }) {
  if (!style(Object.assign({ name: 'sass' }, filterOptions), { attributes })) {
    return null;
  }

  const { data, includePaths } = sassOptions;

  const { css, map } = await new Promise((resolve, reject) => sassCompiler.render(Object.assign({}, sassOptions, {
    file: filename,
    data: `${data ? `${data}
` : ''}${content}`,
    includePaths: (includePaths || []).concat([path.dirname(filename)])
  }), (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  }));

  return { code: css.toString(), map };
}

function sass(sassOptions, filterOptions) {
  return preprocessSass.bind(null, sassOptions, filterOptions);
}

exports.preprocessSass = preprocessSass;
exports.sass = sass;
//# sourceMappingURL=index.js.map
