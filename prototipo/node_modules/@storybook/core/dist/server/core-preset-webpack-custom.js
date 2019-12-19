"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpack = webpack;

var _nodeLogger = require("@storybook/node-logger");

var _loadCustomWebpackConfig = _interopRequireDefault(require("./loadCustomWebpackConfig"));

var _mergeConfigs = _interopRequireDefault(require("./mergeConfigs"));

var _webpackConfig = require("./config/webpack.config.default");

function informAboutCustomConfig(defaultConfigName) {
  if (!defaultConfigName) {
    _nodeLogger.logger.info('=> Using default webpack setup.');

    return;
  }

  _nodeLogger.logger.info(`=> Using default webpack setup based on "${defaultConfigName}".`);
}

function wrapPresets(presets) {
  return {
    webpackFinal: async (config, args) => presets.apply('webpackFinal', config, args)
  };
}

async function createFinalDefaultConfig(presets, config, options) {
  const defaultConfig = (0, _webpackConfig.createDefaultWebpackConfig)(config);
  return presets.webpackFinal(defaultConfig, options);
}

async function webpack(config, options) {
  const {
    configDir,
    configType,
    defaultConfigName
  } = options;
  const presets = wrapPresets(options.presets);
  const finalConfig = await presets.webpackFinal(config, options); // Check whether user has a custom webpack config file and
  // return the (extended) base configuration if it's not available.

  const customConfig = (0, _loadCustomWebpackConfig.default)(configDir);

  if (customConfig === null) {
    informAboutCustomConfig(defaultConfigName);
    return createFinalDefaultConfig(presets, config, options);
  }

  if (typeof customConfig === 'function') {
    _nodeLogger.logger.info('=> Loading custom webpack config (full-control mode).');

    const finalDefaultConfig = await createFinalDefaultConfig(presets, config, options);
    return customConfig(finalConfig, configType, finalDefaultConfig);
  }

  _nodeLogger.logger.info('=> Loading custom webpack config (extending mode).');

  return (0, _mergeConfigs.default)(finalConfig, customConfig);
}