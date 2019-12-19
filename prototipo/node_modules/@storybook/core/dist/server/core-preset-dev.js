"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpack = webpack;
exports.babel = babel;
exports.manager = manager;
exports.preview = preview;
exports.addons = addons;
exports.config = config;

var _loadCustomBabelConfig = _interopRequireDefault(require("./loadCustomBabelConfig"));

var _loadCustomAddonsFile = _interopRequireDefault(require("./loadCustomAddonsFile"));

var _loadCustomConfigFile = _interopRequireDefault(require("./loadCustomConfigFile"));

var _webpackConfig = _interopRequireDefault(require("./config/webpack.config.dev"));

var _babel = _interopRequireDefault(require("./config/babel.dev"));

var _entries = require("./config/entries");

async function webpack(_, options) {
  return (0, _webpackConfig.default)(options);
}

async function babel(_, options) {
  const {
    configDir,
    presets
  } = options;
  return (0, _loadCustomBabelConfig.default)(configDir, () => presets.apply('babelDefault', _babel.default, options));
}

async function manager(_, options) {
  return (0, _entries.createManagerEntry)(options);
}

async function preview(_, options) {
  const entry = await (0, _entries.createPreviewEntry)(options);
  return [...entry, `${require.resolve('webpack-hot-middleware/client')}?reload=true`];
}

async function addons(_, options) {
  return (0, _loadCustomAddonsFile.default)(options);
}

async function config(_, options) {
  return (0, _loadCustomConfigFile.default)(options);
}