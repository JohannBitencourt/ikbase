"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMiddleware = getMiddleware;
exports.getPreviewBodyHtml = getPreviewBodyHtml;
exports.getPreviewHeadHtml = getPreviewHeadHtml;
exports.getManagerHeadHtml = getManagerHeadHtml;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function getMiddleware(configDir) {
  const middlewarePath = _path.default.resolve(configDir, 'middleware.js');

  if (_fs.default.existsSync(middlewarePath)) {
    let middlewareModule = require(middlewarePath); // eslint-disable-line


    if (middlewareModule.__esModule) {
      // eslint-disable-line
      middlewareModule = middlewareModule.default;
    }

    return middlewareModule;
  }

  return () => {};
}

const interpolate = (string, data = {}) => Object.entries(data).reduce((acc, [k, v]) => acc.replace(`%${k}%`, v), string);

function getPreviewBodyHtml() {
  return _fs.default.readFileSync(_path.default.resolve(__dirname, 'templates/base-preview-body.html'), 'utf8');
}

function getPreviewHeadHtml(configDirPath, interpolations) {
  const base = _fs.default.readFileSync(_path.default.resolve(__dirname, 'templates/base-preview-head.html'), 'utf8');

  const headHtmlPath = _path.default.resolve(configDirPath, 'preview-head.html');

  let result = base;

  if (_fs.default.existsSync(headHtmlPath)) {
    result += _fs.default.readFileSync(headHtmlPath, 'utf8');
  }

  return interpolate(result, interpolations);
}

function getManagerHeadHtml(configDirPath, interpolations) {
  const base = _fs.default.readFileSync(_path.default.resolve(__dirname, 'templates/base-manager-head.html'), 'utf8');

  const scriptPath = _path.default.resolve(configDirPath, 'manager-head.html');

  let result = base;

  if (_fs.default.existsSync(scriptPath)) {
    result += _fs.default.readFileSync(scriptPath, 'utf8');
  }

  return interpolate(result, interpolations);
}