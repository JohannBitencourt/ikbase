"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _actions = require("./actions");

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.types.CLEAR_ERROR:
      {
        return (0, _objectSpread2.default)({}, state, {
          error: null
        });
      }

    case _actions.types.SET_ERROR:
      {
        return (0, _objectSpread2.default)({}, state, {
          error: action.error
        });
      }

    case _actions.types.SELECT_STORY:
      {
        return (0, _objectSpread2.default)({}, state, {
          selectedKind: action.kind,
          selectedStory: action.story
        });
      }

    case _actions.types.SET_INITIAL_STORY:
      {
        var newState = (0, _objectSpread2.default)({}, state);
        var storyKindList = action.storyKindList;

        if (!newState.selectedKind && storyKindList.length > 0) {
          newState.selectedKind = storyKindList[0].kind;

          var _storyKindList$0$stor = (0, _slicedToArray2.default)(storyKindList[0].stories, 1);

          newState.selectedStory = _storyKindList$0$stor[0];
        }

        return newState;
      }

    default:
      return state;
  }
}