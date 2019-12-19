"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var Iframe =
/*#__PURE__*/
(0, _styled.default)("iframe", {
  target: "e5sbqfd0"
})({
  width: '100%',
  height: '100%',
  border: 0,
  margin: 'auto',
  padding: 0
});

var Preview =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Preview, _Component);

  function Preview() {
    (0, _classCallCheck2.default)(this, Preview);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Preview).apply(this, arguments));
  }

  (0, _createClass2.default)(Preview, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      // When the manager is re-rendered, due to changes in the layout (going full screen / changing
      // addon panel to right) Preview section will update. If its re-rendered the whole html page
      // inside the html is re-rendered making the story to re-mount.
      // We dont have to re-render this component for any reason since changes are communicated to
      // story using the channel and necessary changes are done by it.
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var url = this.props.url;
      return _react.default.createElement(Iframe, {
        id: "storybook-preview-iframe",
        title: "preview",
        src: url,
        allowFullScreen: true
      });
    }
  }]);
  return Preview;
}(_react.Component);

Preview.propTypes = {
  url: _propTypes.default.string.isRequired
};
var _default = Preview;
exports.default = _default;