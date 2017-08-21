/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
var fs = require('fs');

function stringOfLength(string, length) {
  var newString = '';
  for (var i = 0; i < length; i++) {
    newString += string;
  }
  return newString;
}

function generateTitle(name) {
  var title = '`' + name + '` (component)';
  return title + '\n' + stringOfLength('=', title.length) + '\n';
}

function generateDesciption(description) {
  const includeFlag = description.indexOf('$$');
  if (includeFlag >= 0) {
    const includeFile = description.indexOf('$$', includeFlag + 2) - 2;
    const filePath = description.substr(includeFlag + 2, includeFile);
    const descriptionOut = description.substr(0,includeFlag) + description.substr(includeFlag + filePath.length + 4, description.length);
    if (fs.existsSync(filePath)) {
      const text = fs.readFileSync(filePath, 'utf-8');
      return text + '\n'  + descriptionOut + '\n';
    }
  }
  return description + '\n';
}

function generatePropType(type) {
  var values;
  if (Array.isArray(type.value)) {
    values = '(' +
      type.value.map(function(typeValue) {
        return typeValue.name || typeValue.value;
      }).join('|') +
      ')';
  } else {
    values = type.value && type.value.name ? type.value.name : type.value;
  }

  return 'type: `' + type.name + (values ? ' ' + values:'') + '`\n';
}

function generatePropDefaultValue(value) {
  return 'defaultValue: `' + value.value + '`\n';
}

function generateProp(propName, prop) {
  if (prop.description && prop.description.indexOf('@ignore') !== -1) {
    return '';
  } else {
    return (
      '### `' + propName + '`' + (prop.required ? ' (required)' : '') + '\n' +
      '\n' +
      (prop.description ? prop.description + '\n\n' : '') +
      (prop.type ? generatePropType(prop.type) : '') +
      (prop.defaultValue ? generatePropDefaultValue(prop.defaultValue) : '') +
      '\n'
    );
  }
}

function generateProps(props) {
  var title = 'Properties';
  return (
    title + '\n' +
    stringOfLength('-', title.length) + '\n' +
    '\n' +
    Object.keys(props).sort().map(function(propName) {
      return generateProp(propName, props[propName]);
    }).join('\n')
  );
}

function generateMarkdown(name, reactAPI) {
  var markdownString =
    generateTitle(name) + '\n' +
    generateDesciption(reactAPI.description) + '\n' +
    ((reactAPI.props !== undefined) ? generateProps(reactAPI.props) : '');

  return markdownString;
}

module.exports = generateMarkdown;
