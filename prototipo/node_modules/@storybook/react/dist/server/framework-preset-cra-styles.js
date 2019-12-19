"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackFinal = webpackFinal;

var _nodeLogger = require("@storybook/node-logger");

var _cra_config = require("./cra_config");

function webpackFinal(config) {
  if (!(0, _cra_config.isReactScriptsInstalled)()) {
    _nodeLogger.logger.info('=> Using base config because react-scripts is not installed.');

    return config;
  }

  _nodeLogger.logger.info('=> Loading create-react-app config.');

  return (0, _cra_config.applyCRAWebpackConfig)(config);
}