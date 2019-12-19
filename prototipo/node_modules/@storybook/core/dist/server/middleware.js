"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.webpackValid = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = require("express");

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _utils = require("./utils");

var _config = _interopRequireDefault(require("./config"));

let webpackResolve = () => {};

let webpackReject = () => {};

const webpackValid = new Promise((resolve, reject) => {
  webpackResolve = resolve;
  webpackReject = reject;
});
exports.webpackValid = webpackValid;

async function _default(options) {
  const {
    configDir
  } = options; // Build the webpack configuration using the `getBaseConfig`
  // custom `.babelrc` file and `webpack.config.js` files

  const config = await (0, _config.default)({
    configType: 'DEVELOPMENT',
    corePresets: [require.resolve('./core-preset-dev.js')],
    ...options
  });
  const middlewareFn = (0, _utils.getMiddleware)(configDir); // remove the leading '/'

  let {
    publicPath
  } = config.output;

  if (publicPath[0] === '/') {
    publicPath = publicPath.slice(1);
  }

  const compiler = (0, _webpack.default)(config);
  const devMiddlewareOptions = {
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: config.watchOptions || {},
    ...config.devServer
  };
  const router = new _express.Router();
  const webpackDevMiddlewareInstance = (0, _webpackDevMiddleware.default)(compiler, devMiddlewareOptions);
  router.use(webpackDevMiddlewareInstance);
  router.use((0, _webpackHotMiddleware.default)(compiler)); // custom middleware

  middlewareFn(router);
  webpackDevMiddlewareInstance.waitUntilValid(stats => {
    router.get('/', (req, res) => {
      res.set('Content-Type', 'text/html');
      res.sendFile(_path.default.join(`${__dirname}/public/index.html`));
    });
    router.get('/iframe.html', (req, res) => {
      res.set('Content-Type', 'text/html');
      res.sendFile(_path.default.join(`${__dirname}/public/iframe.html`));
    });

    if (stats.toJson().errors.length) {
      webpackReject(stats);
    } else {
      webpackResolve(stats);
    }
  });
  return router;
}