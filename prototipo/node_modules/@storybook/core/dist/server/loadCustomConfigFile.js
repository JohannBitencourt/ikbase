"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _interpretFiles = require("./interpret-files");

function loadConfigFiles({
  configDir
}) {
  const storybookConfigPath = (0, _interpretFiles.getInterpretedFile)(_path.default.resolve(configDir, 'config'));

  if (storybookConfigPath) {
    return [storybookConfigPath];
  }

  return [];
}

var _default = loadConfigFiles;
exports.default = _default;