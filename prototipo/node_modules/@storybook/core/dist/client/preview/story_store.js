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

var _events = require("events");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

/* eslint no-underscore-dangle: 0 */
var count = 0;

function getId() {
  count += 1;
  return count;
}

var StoryStore =
/*#__PURE__*/
function (_EventEmitter) {
  (0, _inherits2.default)(StoryStore, _EventEmitter);

  function StoryStore() {
    var _this;

    (0, _classCallCheck2.default)(this, StoryStore);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StoryStore).call(this));
    _this._data = {};
    _this._revision = 0;
    return _this;
  }

  (0, _createClass2.default)(StoryStore, [{
    key: "getRevision",
    value: function getRevision() {
      return this._revision;
    }
  }, {
    key: "incrementRevision",
    value: function incrementRevision() {
      this._revision += 1;
    }
  }, {
    key: "addStory",
    value: function addStory(kind, name, fn) {
      var parameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (!this._data[kind]) {
        this._data[kind] = {
          kind: kind,
          fileName: parameters.fileName,
          index: getId(),
          stories: {}
        };
      }

      this._data[kind].stories[name] = {
        name: name,
        index: getId(),
        fn: fn,
        parameters: parameters
      };
      this.emit(_coreEvents.default.STORY_ADDED, kind, name, fn, parameters);
    }
  }, {
    key: "getStoryKinds",
    value: function getStoryKinds() {
      var _this2 = this;

      return Object.keys(this._data).map(function (key) {
        return _this2._data[key];
      }).filter(function (kind) {
        return Object.keys(kind.stories).length > 0;
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.kind;
      });
    }
  }, {
    key: "getStories",
    value: function getStories(kind) {
      var _this3 = this;

      if (!this._data[kind]) {
        return [];
      }

      return Object.keys(this._data[kind].stories).map(function (name) {
        return _this3._data[kind].stories[name];
      }).sort(function (info1, info2) {
        return info1.index - info2.index;
      }).map(function (info) {
        return info.name;
      });
    }
  }, {
    key: "getStoryFileName",
    value: function getStoryFileName(kind) {
      var storiesKind = this._data[kind];

      if (!storiesKind) {
        return null;
      }

      return storiesKind.fileName;
    }
  }, {
    key: "getStoryAndParameters",
    value: function getStoryAndParameters(kind, name) {
      var storiesKind = this._data[kind];

      if (!storiesKind) {
        return null;
      }

      var storyInfo = storiesKind.stories[name];

      if (!storyInfo) {
        return null;
      }

      var fn = storyInfo.fn,
          parameters = storyInfo.parameters;
      return {
        story: fn,
        parameters: parameters
      };
    }
  }, {
    key: "getStory",
    value: function getStory(kind, name) {
      var data = this.getStoryAndParameters(kind, name);
      return data && data.story;
    }
  }, {
    key: "getStoryWithContext",
    value: function getStoryWithContext(kind, name) {
      var data = this.getStoryAndParameters(kind, name);

      if (!data) {
        return null;
      }

      var story = data.story,
          parameters = data.parameters;
      return function () {
        return story({
          kind: kind,
          story: name,
          parameters: parameters
        });
      };
    }
  }, {
    key: "removeStoryKind",
    value: function removeStoryKind(kind) {
      if (this.hasStoryKind(kind)) {
        this._data[kind].stories = {};
      }
    }
  }, {
    key: "hasStoryKind",
    value: function hasStoryKind(kind) {
      return Boolean(this._data[kind]);
    }
  }, {
    key: "hasStory",
    value: function hasStory(kind, name) {
      return Boolean(this.getStory(kind, name));
    }
  }, {
    key: "dumpStoryBook",
    value: function dumpStoryBook() {
      var _this4 = this;

      var data = this.getStoryKinds().map(function (kind) {
        return {
          kind: kind,
          stories: _this4.getStories(kind)
        };
      });
      return data;
    }
  }, {
    key: "size",
    value: function size() {
      return Object.keys(this._data).length;
    }
  }, {
    key: "clean",
    value: function clean() {
      var _this5 = this;

      this.getStoryKinds().forEach(function (kind) {
        return delete _this5._data[kind];
      });
    }
  }]);
  return StoryStore;
}(_events.EventEmitter);

exports.default = StoryStore;