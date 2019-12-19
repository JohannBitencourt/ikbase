"use strict";

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

var _global = require("global");

var _qs = _interopRequireDefault(require("qs"));

var _react = _interopRequireDefault(require("react"));

var _ui = require("@storybook/ui");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _channelPostmessage = _interopRequireDefault(require("@storybook/channel-postmessage"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _preview = _interopRequireDefault(require("./preview"));

var ReactProvider =
/*#__PURE__*/
function (_Provider) {
  (0, _inherits2.default)(ReactProvider, _Provider);

  function ReactProvider() {
    var _this;

    (0, _classCallCheck2.default)(this, ReactProvider);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ReactProvider).call(this));
    _this.channel = (0, _channelPostmessage.default)({
      page: 'manager'
    });

    _addons.default.setChannel(_this.channel);

    _this.channel.emit(_coreEvents.default.CHANNEL_CREATED);

    return _this;
  }

  (0, _createClass2.default)(ReactProvider, [{
    key: "getPanels",
    value: function getPanels() {
      return _addons.default.getPanels();
    }
  }, {
    key: "renderPreview",
    value: function renderPreview(selectedKind, selectedStory) {
      var queryParams = {
        selectedKind: selectedKind,
        selectedStory: selectedStory
      }; // Add the react-perf query string to the iframe if that present.

      if (/react_perf/.test(_global.location.search)) {
        queryParams.react_perf = '1';
      }

      var queryString = _qs.default.stringify(queryParams);

      var url = "iframe.html?".concat(queryString);
      return _react.default.createElement(_preview.default, {
        url: url
      });
    }
  }, {
    key: "handleAPI",
    value: function handleAPI(api) {
      var _this2 = this;

      api.onStory(function (kind, story) {
        _this2.channel.emit(_coreEvents.default.SET_CURRENT_STORY, {
          kind: kind,
          story: story
        });
      });
      this.channel.on(_coreEvents.default.SET_STORIES, function (data) {
        api.setStories(data.stories);
      });
      this.channel.on(_coreEvents.default.SELECT_STORY, function (data) {
        api.selectStory(data.kind, data.story);
      });
      this.channel.on(_coreEvents.default.APPLY_SHORTCUT, function (data) {
        api.handleShortcut(data.event);
      });

      _addons.default.loadAddons(api);
    }
  }]);
  return ReactProvider;
}(_ui.Provider);

exports.default = ReactProvider;