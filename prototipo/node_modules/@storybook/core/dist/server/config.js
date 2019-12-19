"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _nodeLogger = require("@storybook/node-logger");

var _presets = _interopRequireDefault(require("./presets"));

var _serverRequire = _interopRequireDefault(require("./serverRequire"));

function wrapCorePresets(presets) {
  return {
    babel: async (config, args) => presets.apply('babel', config, args),
    webpack: async (config, args) => presets.apply('webpack', config, args),
    preview: async (config, args) => presets.apply('preview', config, args),
    manager: async (config, args) => presets.apply('manager', config, args)
  };
}

function customPreset({
  configDir
}) {
  const presets = (0, _serverRequire.default)(_path.default.resolve(configDir, 'presets'));

  if (presets) {
    _nodeLogger.logger.warn('"Custom presets" is an experimental and undocumented feature that will be changed or deprecated soon. Use it on your own risk.');

    return presets;
  }

  return [];
}

async function getWebpackConfig(options, presets) {
  const babelOptions = await presets.babel({}, options);
  const entries = {
    iframe: await presets.preview([], options),
    manager: await presets.manager([], options)
  };
  return presets.webpack({}, { ...options,
    babelOptions,
    entries
  });
}

var _default = async options => {
  const {
    corePresets = [],
    frameworkPresets = [],
    ...restOptions
  } = options;
  const presetsConfig = [...corePresets, require.resolve('./core-preset-babel-cache.js'), ...frameworkPresets, ...customPreset(options), require.resolve('./core-preset-webpack-custom.js')];
  const presets = (0, _presets.default)(presetsConfig);
  return getWebpackConfig({ ...restOptions,
    presets
  }, wrapCorePresets(presets));
};

exports.default = _default;