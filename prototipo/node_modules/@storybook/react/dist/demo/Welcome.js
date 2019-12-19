"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Main = function Main(props) {
  return _react.default.createElement("article", (0, _extends2.default)({}, props, {
    style: {
      margin: 15,
      maxWidth: 600,
      lineHeight: 1.4,
      fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif'
    }
  }));
};

var Title = function Title(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children"]);
  return _react.default.createElement("h1", props, children);
};

var Note = function Note(props) {
  return _react.default.createElement("p", (0, _extends2.default)({}, props, {
    style: {
      opacity: 0.5
    }
  }));
};

var InlineCode = function InlineCode(props) {
  return _react.default.createElement("code", (0, _extends2.default)({}, props, {
    style: {
      fontSize: 15,
      fontWeight: 600,
      padding: '2px 5px',
      border: '1px solid #eae9e9',
      borderRadius: 4,
      backgroundColor: '#f3f2f2',
      color: '#3a3a3a'
    }
  }));
};

var Link = function Link(_ref2) {
  var children = _ref2.children,
      href = _ref2.href,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["children", "href"]);
  return _react.default.createElement("a", (0, _extends2.default)({
    href: href
  }, props, {
    style: {
      color: '#1474f3',
      textDecoration: 'none',
      borderBottom: '1px solid #1474f3',
      paddingBottom: 2
    }
  }), children);
};

var NavButton = function NavButton(_ref3) {
  var children = _ref3.children,
      props = (0, _objectWithoutProperties2.default)(_ref3, ["children"]);
  return _react.default.createElement("button", (0, _extends2.default)({}, props, {
    type: "button",
    style: {
      color: '#1474f3',
      textDecoration: 'none',
      borderBottom: '1px solid #1474f3',
      paddingBottom: 2,
      borderTop: 'none',
      borderRight: 'none',
      borderLeft: 'none',
      backgroundColor: 'transparent',
      padding: 0,
      cursor: 'pointer',
      font: 'inherit'
    }
  }), children);
};

var Welcome = function Welcome(_ref4) {
  var showApp = _ref4.showApp;
  return _react.default.createElement(Main, null, _react.default.createElement(Title, null, "Welcome to storybook"), _react.default.createElement("p", null, "This is a UI component dev environment for your app."), _react.default.createElement("p", null, "We've added some basic stories inside the ", _react.default.createElement(InlineCode, null, "src/stories"), " directory.", _react.default.createElement("br", null), "A story is a single state of one or more UI components. You can have as many stories as you want.", _react.default.createElement("br", null), "(Basically a story is like a visual test case.)"), _react.default.createElement("p", null, "See these sample ", _react.default.createElement(NavButton, {
    onClick: showApp
  }, "stories"), " for a component called", ' ', _react.default.createElement(InlineCode, null, "Button"), "."), _react.default.createElement("p", null, "Just like that, you can add your own components as stories.", _react.default.createElement("br", null), "You can also edit those components and see changes right away.", _react.default.createElement("br", null), "(Try editing the ", _react.default.createElement(InlineCode, null, "Button"), " stories located at", ' ', _react.default.createElement(InlineCode, null, "src/stories/index.js"), ".)"), _react.default.createElement("p", null, "Usually we create stories with smaller UI components in the app.", _react.default.createElement("br", null), "Have a look at the", ' ', _react.default.createElement(Link, {
    href: "https://storybook.js.org/basics/writing-stories",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Writing Stories"), ' ', "section in our documentation."), _react.default.createElement(Note, null, _react.default.createElement("b", null, "NOTE:"), _react.default.createElement("br", null), "Have a look at the ", _react.default.createElement(InlineCode, null, ".storybook/webpack.config.js"), " to add webpack loaders and plugins you are using in this project."));
};

exports.default = Welcome;
Welcome.displayName = 'Welcome';
Welcome.propTypes = {
  showApp: _propTypes.default.func
};
Welcome.defaultProps = {
  showApp: null
};