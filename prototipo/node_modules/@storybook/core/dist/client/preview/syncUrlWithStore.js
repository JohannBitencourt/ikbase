"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = syncUrlToStore;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _qs = _interopRequireDefault(require("qs"));

var _global = require("global");

var _actions = require("./actions");

// Ensure the story in the redux store and on the preview URL are in sync.
// In theory we should listen to pushState events but given it's an iframe
// the user can't actually change the URL.
// We should change this if we support a "preview only" mode in the future.
function syncUrlToStore(reduxStore) {
  // handle query params
  var queryParams = _qs.default.parse(_global.window.location.search.substring(1));

  if (queryParams.selectedKind) {
    reduxStore.dispatch((0, _actions.selectStory)(queryParams.selectedKind, queryParams.selectedStory));
  }

  reduxStore.subscribe(function () {
    var _reduxStore$getState = reduxStore.getState(),
        selectedKind = _reduxStore$getState.selectedKind,
        selectedStory = _reduxStore$getState.selectedStory;

    var queryString = _qs.default.stringify((0, _objectSpread2.default)({}, queryParams, {
      selectedKind: selectedKind,
      selectedStory: selectedStory
    }));

    _global.window.history.replaceState({}, '', "?".concat(queryString));
  });
}