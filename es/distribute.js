import URI from 'urijs'; // 开 treeSharking

import { get, isFunction } from 'lodash';
import { MicroConfig } from './utils';
import { isInBrowser } from './utils/runtime-environment'; // TODO 这个变量后面用来优化 iceStark 后面的家在逻辑

var routeInIceStark = false;

var isInnerIceStark = function isInnerIceStark(microInstance, pathname) {
  if (!microInstance) {
    return false;
  }

  var appConfig = microInstance.getConfig();
  var apps = get(appConfig, 'icestarkConfig.apps') || [];
  return apps.some(function (_) {
    return pathname.startsWith(_.path);
  });
};

var distributeCore = function distributeCore() {
  if (!isInBrowser) {
    return;
  }

  window.addEventListener('hashchange', function (e) {
    var pathname = new URI(e.newURL).fragment();

    var _MicroConfig$getConfi = MicroConfig.getConfig(),
        microInstance = _MicroConfig$getConfi.microInstance;

    if (isInnerIceStark(microInstance, pathname)) {
      MicroConfig.getConfig().icestarkStart();
    }
  });
};

export default distributeCore;