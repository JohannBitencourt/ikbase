"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;

var _channels = _interopRequireDefault(require("@storybook/channels"));

function createChannel() {
  var transport = {
    setHandler: function setHandler() {},
    send: function send() {}
  };
  return new _channels.default({
    transport: transport
  });
}