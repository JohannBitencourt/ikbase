"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _package = _interopRequireDefault(require("../../package.json"));

var _default = {
  packageJson: _package.default,
  defaultConfigName: 'create-react-app',
  frameworkPresets: [require.resolve('./framework-preset-react.js'), require.resolve('./framework-preset-react-docgen.js'), require.resolve('./framework-preset-cra-styles.js')]
};
exports.default = _default;