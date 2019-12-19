"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _redux = require("redux");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _global = require("global");

var _channelPostmessage = _interopRequireDefault(require("@storybook/channel-postmessage"));

var _key_events = require("@storybook/ui/dist/libs/key_events");

var _clientLogger = require("@storybook/client-logger");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _story_store = _interopRequireDefault(require("./story_store"));

var _client_api = _interopRequireDefault(require("./client_api"));

var _config_api = _interopRequireDefault(require("./config_api"));

var _reducer = _interopRequireDefault(require("./reducer"));

var Actions = _interopRequireWildcard(require("./actions"));

var _syncUrlWithStore = _interopRequireDefault(require("./syncUrlWithStore"));

var classes = {
  MAIN: 'sb-show-main',
  NOPREVIEW: 'sb-show-nopreview',
  ERROR: 'sb-show-errordisplay'
};

function showMain() {
  _global.document.body.classList.remove(classes.NOPREVIEW);

  _global.document.body.classList.remove(classes.ERROR);

  _global.document.body.classList.add(classes.MAIN);
}

function showNopreview() {
  _global.document.body.classList.remove(classes.MAIN);

  _global.document.body.classList.remove(classes.ERROR);

  _global.document.body.classList.add(classes.NOPREVIEW);
}

function showErrorDisplay(_ref) {
  var message = _ref.message,
      stack = _ref.stack;
  _global.document.getElementById('error-message').textContent = message;
  _global.document.getElementById('error-stack').textContent = stack;

  _global.document.body.classList.remove(classes.MAIN);

  _global.document.body.classList.remove(classes.NOPREVIEW);

  _global.document.body.classList.add(classes.ERROR);
} // showError is used by the various app layers to inform the user they have done something
// wrong -- for instance returned the wrong thing from a story


function showError(_ref2) {
  var title = _ref2.title,
      description = _ref2.description;

  _addons.default.getChannel().emit(_coreEvents.default.STORY_ERRORED, {
    title: title,
    description: description
  });

  showErrorDisplay({
    message: title,
    stack: description
  });
} // showException is used if we fail to render the story and it is uncaught by the app layer


function showException(exception) {
  _addons.default.getChannel().emit(_coreEvents.default.STORY_THREW_EXCEPTION, exception);

  showErrorDisplay(exception); // Log the stack to the console. So, user could check the source code.

  _clientLogger.logger.error(exception.stack);
}

function start(render) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      decorateStory = _ref3.decorateStory;

  // check whether we're running on node/browser
  var isBrowser = _global.navigator && _global.navigator.userAgent && _global.navigator.userAgent !== 'storyshots' && !(_global.navigator.userAgent.indexOf('Node.js') > -1) && !(_global.navigator.userAgent.indexOf('jsdom') > -1);
  var storyStore = new _story_store.default();
  var reduxStore = (0, _redux.createStore)(_reducer.default);
  var context = {
    storyStore: storyStore,
    reduxStore: reduxStore,
    decorateStory: decorateStory,
    showMain: showMain,
    showError: showError,
    showException: showException
  };
  var clientApi = new _client_api.default(context);
  var channel;

  if (isBrowser) {
    // setup preview channel
    channel = (0, _channelPostmessage.default)({
      page: 'preview'
    });
    channel.on(_coreEvents.default.SET_CURRENT_STORY, function (data) {
      reduxStore.dispatch(Actions.selectStory(data.kind, data.story));
    });

    _addons.default.setChannel(channel);

    Object.assign(context, {
      channel: channel
    });
    (0, _syncUrlWithStore.default)(reduxStore); // Handle keyboard shortcuts

    _global.window.onkeydown = (0, _key_events.handleKeyboardShortcuts)(channel);
  } // Provide access to external scripts if `window` is defined.
  // NOTE this is different to isBrowser, primarily for the JSDOM use case


  if (typeof _global.window !== 'undefined') {
    _global.window.__STORYBOOK_CLIENT_API__ = clientApi;
    _global.window.__STORYBOOK_ADDONS_CHANNEL__ = channel; // may not be defined
  }

  var clearDecorators = clientApi.clearDecorators;
  var configApi = new _config_api.default((0, _objectSpread2.default)({
    clearDecorators: clearDecorators
  }, context));
  var previousKind = '';
  var previousStory = '';
  var previousRevision = -1;

  var renderMain = function renderMain(forceRender) {
    if (storyStore.size() === 0) {
      showNopreview();
      return;
    }

    var _reduxStore$getState = reduxStore.getState(),
        selectedKind = _reduxStore$getState.selectedKind,
        selectedStory = _reduxStore$getState.selectedStory;

    var revision = storyStore.getRevision();
    var story = storyStore.getStoryWithContext(selectedKind, selectedStory);

    if (!story) {
      showNopreview();
      return;
    } // Render story only if selectedKind or selectedStory has changed.
    // renderMain() gets executed after each action. Actions will cause the whole
    // story to re-render without this check.
    //    https://github.com/storybooks/react-storybook/issues/116
    // However, we do want the story to re-render if the store itself has changed
    // (which happens at the moment when HMR occurs)


    if (!forceRender && revision === previousRevision && selectedKind === previousKind && previousStory === selectedStory) {
      return;
    }

    if (!forceRender) {
      // Scroll to top of the page when changing story
      _global.document.documentElement.scrollTop = 0;
    }

    previousRevision = revision;
    previousKind = selectedKind;
    previousStory = selectedStory;
    render((0, _objectSpread2.default)({}, context, {
      story: story,
      selectedKind: selectedKind,
      selectedStory: selectedStory,
      forceRender: forceRender
    }));
  }; // initialize the UI


  var renderUI = function renderUI(forceRender) {
    if (isBrowser) {
      var _reduxStore$getState2 = reduxStore.getState(),
          error = _reduxStore$getState2.error;

      if (error) {
        showException(error);
        return;
      }

      try {
        renderMain(forceRender);

        _addons.default.getChannel().emit(_coreEvents.default.STORY_RENDERED);
      } catch (ex) {
        showException(ex);
      }
    }
  };

  var forceReRender = function forceReRender() {
    return renderUI(true);
  };

  if (isBrowser) {
    channel.on(_coreEvents.default.FORCE_RE_RENDER, forceReRender);
  }

  renderUI();
  reduxStore.subscribe(renderUI);
  return {
    context: context,
    clientApi: clientApi,
    configApi: configApi,
    forceReRender: forceReRender
  };
}