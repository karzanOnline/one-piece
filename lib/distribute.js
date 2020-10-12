"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _urijs = _interopRequireDefault(require("urijs"));

var _lodash = require("lodash");

var _utils = require("./utils");

var _runtimeEnvironment = require("./utils/runtime-environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 开 treeSharking
// TODO 这个变量后面用来优化 iceStark 后面的家在逻辑
var routeInIceStark = false;

var isInnerIceStark = function isInnerIceStark(microInstance, pathname) {
  if (!microInstance) {
    return false;
  }

  var appConfig = microInstance.getConfig();
  var apps = (0, _lodash.get)(appConfig, 'icestarkConfig.apps') || [];
  return apps.some(function (_) {
    return pathname.startsWith(_.path);
  });
};

var distributeCore = function distributeCore() {
  if (!_runtimeEnvironment.isInBrowser) {
    return;
  }

  window.addEventListener('hashchange', function (e) {
    var pathname = new _urijs.default(e.newURL).fragment();

    var _MicroConfig$getConfi = _utils.MicroConfig.getConfig(),
        microInstance = _MicroConfig$getConfi.microInstance;

    if (isInnerIceStark(microInstance, pathname)) {
      _utils.MicroConfig.getConfig().icestarkStart();
    }
  });
};

var _default = distributeCore;
exports.default = _default;