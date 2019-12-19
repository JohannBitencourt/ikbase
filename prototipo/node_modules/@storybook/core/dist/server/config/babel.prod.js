"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _babel = _interopRequireDefault(require("./babel.dev"));

var _default = { ..._babel.default,
  presets: [..._babel.default.presets, [require.resolve('babel-preset-minify'), {
    builtIns: false,
    mangle: false
  }]]
};
exports.default = _default;