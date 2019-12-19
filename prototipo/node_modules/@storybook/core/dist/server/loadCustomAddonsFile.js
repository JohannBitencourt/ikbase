"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _nodeLogger = require("@storybook/node-logger");

var _interpretFiles = require("./interpret-files");

function loadCustomAddons({
  configDir
}) {
  const storybookCustomAddonsPath = (0, _interpretFiles.getInterpretedFile)(_path.default.resolve(configDir, 'addons'));

  if (storybookCustomAddonsPath) {
    _nodeLogger.logger.info('=> Loading custom addons config.');

    return [storybookCustomAddonsPath];
  }

  return [];
}

var _default = loadCustomAddons;
exports.default = _default;