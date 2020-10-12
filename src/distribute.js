import URI from 'urijs';
// 开 treeSharking
import { get, isFunction } from 'lodash';
import { MicroConfig } from './utils';
import { isInBrowser } from './utils/runtime-environment';

// TODO 这个变量后面用来优化 iceStark 后面的家在逻辑
let routeInIceStark = false;

const isInnerIceStark = (microInstance, pathname) => {

  if (!microInstance) {
    return false
  }

  const appConfig = microInstance.getConfig();
  const apps = get(appConfig, 'icestarkConfig.apps') || [];

  return apps.some(_ => pathname.startsWith(_.path))
}

const distributeCore = () => {

  if (!isInBrowser) {
    return ;
  }

  window.addEventListener('hashchange', (e) => {
    const pathname = new URI(e.newURL).fragment();
    const { microInstance } = MicroConfig.getConfig();

    if (isInnerIceStark(microInstance, pathname)) {
      MicroConfig.getConfig().icestarkStart()
    }
  })

}

export default distributeCore;
