"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _global = require("global");

var _ui = _interopRequireDefault(require("@storybook/ui"));

var _provider = _interopRequireDefault(require("./provider"));

var rootEl = _global.document.getElementById('root');

(0, _ui.default)(rootEl, new _provider.default());