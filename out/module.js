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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
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
  // Detect if styles should be processed and in we should use sass (indented) syntax.
  let indentedSyntax;
  let processStyles;

  if (filterOptions.name === undefined) {
    indentedSyntax = style(_objectSpread2({
      name: 'sass'
    }, filterOptions), {
      attributes
    });
    processStyles = indentedSyntax || style(_objectSpread2({
      name: 'scss'
    }, filterOptions), {
      attributes
    });
  } else {
    indentedSyntax = filterOptions.name === 'sass';
    processStyles = style(filterOptions, {
      attributes
    });
  }

  if (!processStyles) return null;
  const {
    css,
    map,
    stats
  } = await new Promise((resolve, reject) => sassCompiler.render(_objectSpread2({
    file: filename,
    data: content,
    includePaths: [dirname(filename)],
    indentedSyntax
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
