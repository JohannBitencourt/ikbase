"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  presets: [[require.resolve('@babel/preset-env')]],
  plugins: [require.resolve('babel-plugin-macros'), require.resolve('@babel/plugin-transform-regenerator'), require.resolve('@babel/plugin-proposal-class-properties'), [require.resolve('@babel/plugin-transform-runtime'), {
    helpers: true,
    regenerator: true
  }]]
};
exports.default = _default;