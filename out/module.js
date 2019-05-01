import { dirname } from 'path';
import sassCompiler from 'node-sass';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/* eslint-disable import/prefer-default-export */
function style({
  name,
  all = false,
  type = true,
  lang = true
} = {}, {
  attributes
} = {}) {
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

async function preprocessSass(sassOptions = {}, filterOptions = {}, {
  filename,
  content,
  attributes
}) {
  if (!style(Object.assign({
    name: 'sass'
  }, filterOptions), {
    attributes
  })) {
    return null;
  }

  const {
    css,
    map,
    stats
  } = await new Promise((resolve, reject) => sassCompiler.render(_objectSpread({
    file: filename,
    data: content,
    includePaths: [dirname(filename)]
  }, sassOptions), (err, result) => {
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

export { preprocessSass, sass };
//# sourceMappingURL=module.js.map
