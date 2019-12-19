"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function plugins({
  plugins: defaultPlugins = []
}, {
  plugins: customPlugins = []
}) {
  return [...defaultPlugins, ...customPlugins];
}

function rules({
  rules: defaultRules = []
}, {
  rules: customRules = []
}) {
  return [...defaultRules, ...customRules];
}

function extensions({
  extensions: defaultExtensions = []
}, {
  extensions: customExtensions = []
}) {
  return [...defaultExtensions, ...customExtensions];
}

function alias({
  alias: defaultAlias = {}
}, {
  alias: customAlias = {}
}) {
  return { ...defaultAlias,
    ...customAlias
  };
}

function _module({
  module: defaultModule = {}
}, {
  module: customModule = {}
}) {
  return { ...defaultModule,
    ...customModule,
    rules: rules(defaultModule, customModule)
  };
}

function resolve({
  resolve: defaultResolve = {}
}, {
  resolve: customResolve = {}
}) {
  return { ...defaultResolve,
    ...customResolve,
    alias: alias(defaultResolve, customResolve),
    extensions: extensions(defaultResolve, customResolve)
  };
}

function optimization({
  optimization: defaultOptimization = {}
}, {
  optimization: customOptimization = {}
}) {
  return { ...defaultOptimization,
    ...customOptimization
  };
}

function mergeConfigs(config, customConfig) {
  return { // We'll always load our configurations after the custom config.
    // So, we'll always load the stuff we need.
    ...customConfig,
    ...config,
    devtool: customConfig.devtool || config.devtool,
    plugins: plugins(config, customConfig),
    module: _module(config, customConfig),
    resolve: resolve(config, customConfig),
    optimization: optimization(config, customConfig)
  };
}

var _default = mergeConfigs;
exports.default = _default;