"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.babel = babel;

var _findCacheDir = _interopRequireDefault(require("find-cache-dir"));

function babel(babelConfig) {
  return {
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables a cache directory for faster-rebuilds
    // `find-cache-dir` will create the cache directory under the node_modules directory.
    cacheDirectory: (0, _findCacheDir.default)({
      name: 'react-storybook'
    }),
    ...babelConfig
  };
}