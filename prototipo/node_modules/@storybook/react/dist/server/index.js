"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _server = require("@storybook/core/server");

var _options = _interopRequireDefault(require("./options"));

(0, _server.buildDev)(_options.default);