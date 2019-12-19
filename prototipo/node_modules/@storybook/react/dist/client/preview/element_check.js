"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isPriorToFiber = exports.isValidFiberElement = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _flattenDeep = _interopRequireDefault(require("lodash/flattenDeep"));

// return true if the element is renderable with react fiber
var isValidFiberElement = function isValidFiberElement(element) {
  return typeof element === 'string' || typeof element === 'number' || _react.default.isValidElement(element);
};

exports.isValidFiberElement = isValidFiberElement;

var isPriorToFiber = function isPriorToFiber(version) {
  var _version$split = version.split('.'),
      _version$split2 = (0, _slicedToArray2.default)(_version$split, 1),
      majorVersion = _version$split2[0];

  return Number(majorVersion) < 16;
}; // accepts an element and return true if renderable else return false


exports.isPriorToFiber = isPriorToFiber;

var isReactRenderable = function isReactRenderable(element) {
  // storybook is running with a version prior to fiber,
  // run a simple check on the element
  if (isPriorToFiber(_react.default.version)) {
    return _react.default.isValidElement(element);
  } // the element is not an array, check if its a fiber renderable element


  if (!Array.isArray(element)) {
    return isValidFiberElement(element);
  } // the element is in fact a list of elements (array),
  // loop on its elements to see if its ok to render them


  var elementsList = element.map(isReactRenderable); // flatten the list of elements (possibly deep nested)

  var flatList = (0, _flattenDeep.default)(elementsList); // keep only invalid elements

  var invalidElements = flatList.filter(function (elementIsRenderable) {
    return elementIsRenderable === false;
  }); // it's ok to render this list if there is no invalid elements inside

  return !invalidElements.length;
};

var _default = isReactRenderable;
exports.default = _default;