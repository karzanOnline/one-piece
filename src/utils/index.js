import { get, isString, isObject, isArray } from 'lodash';
import { isInIcestark } from '@ice/stark-app';
const plugins = require('umi/_runtimePlugin');

const ICE_STARK = 'icestark';
const QIAN_KUN = 'qiankun';
const QIAN_KUN_ROUTES_API = ['entry', 'history', 'basename', 'path', 'mountElementId'];
const QIAN_KUN_API_LIST_MAPPING_TABLE = { sandbox: 'jsSandbox' }

// umi-qiankun-plugin 对应 api 映射表
const QIAN_KUN_API_MAPPING_TABLE = {
  basename: 'name',
  base: 'activeRule',
  path: 'base'
}
// qiankun 原生映射表
const QIAN_KUN_ORIGIN_API_TABLE = {
  container: 'mountElementId',
  activeRule: 'path',
}

// iceStark 映射表
const ICE_STARK_API_MAPPING_TABLE = {
  entry: 'url',
  history: {
    key: 'hashType',
    valueChange: (value) => value === 'hash'
  },
  mountElementId: 'rootId',
}

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
const EmptyDom = ({ children }) => <div>{children}</div>
const engineList = [ICE_STARK, QIAN_KUN];

export const getOriginQiankunApi = (config) => {
  if (isArray(config)) {
    return config.map(_ => getOriginQiankunApi(_))
  }

  Object.keys(QIAN_KUN_ORIGIN_API_TABLE).map(_key => {
    const _valueKey = QIAN_KUN_ORIGIN_API_TABLE[_key]
    config[_key] = config[_valueKey]
  })

  return config
}

/**
 * 获取当前环境的微前端引擎
 * @param {*} engine 
 */
export const getEnv = async (engine) => {
  const hasEngine = engineList.some(_ => _ === engine);
  let isUmiQiankun = false;

  try {
    if (plugins && plugins.getItem('qiankun')) {
      isUmiQiankun = true
    } else {
      isUmiQiankun = false;
      return ICE_STARK
    }
  } catch (e) {
    isUmiQiankun = false;

    return ICE_STARK
  }

  if (hasEngine) return engine;
  if (isInIcestark && !isUmiQiankun) return ICE_STARK;

  return QIAN_KUN;
}


export const getConfig = async config => {
  // 获取当前运行的基础环境
  const _envEngine = await getEnv(get(config, 'engine'))

  return { _config: config, envEngine: _envEngine }
}

// 全局的微前端hook配置
export const MicroConfig = (config => {
  let _value = {}
  
  return {
    useConfig: (initialMicro) => {
      const setConfig = (newValue) => {
        _value = initialMicro
      }

      initialMicro && setConfig(initialMicro)
      return [initialMicro, setConfig]
    },
    setConfig: (newConfig) => {

      _value = {
        ..._value,
        ...newConfig
      }
      return _value
    },
    getConfig: () => _value
  }  
})();

const setRootId = (origin, globalRootId) => {
  if (isArray) {
    return origin.map(_ => {
      if (globalRootId && !_.mountElementId) {
        _.rootId = globalRootId
      }
      return _
    })
  }

  return origin
}

export const iceStarkFlattenConfig = (config) => {
  const globalRootId = get(config, 'mountElementId') || '';
  const apps = get(config, 'apps') || [];
  const components = get(config, 'components') || {};

  setRootId(apps, globalRootId);

  const { LayoutComponent = EmptyDom, ...OtherComponents } = components;
  const routerType = get(config, 'history') || 'hashHistory'; 

  return {
    apps,
    rootId: globalRootId,
    Layout: LayoutComponent,
    OtherComponents,
    routerType
  }
}

const changeValue = (mappingKey, value) => {
  if (!isString(mappingKey) && isObject(mappingKey)) {
    const _action = get(mappingKey, 'valueChange') || {};
    return _action(value)
  }

  return value
}

const getKey = (origin) => {
  if (!isString(origin) && isObject(origin)) {
    const _key = get(origin, 'key');
    return _key
  }
  return origin
}

/**
 * 这里只根据 entry 的类型做一个粗略的引擎判断
 * 目前的业务区分，icestark 使用场景在 url侧，qiankun 的使用场景在于 entry
 * TODO 这里判断的比较切合当前业务，如果后面需要开放则使用标准化判断
 * @param {} entry 
 */
const getEngine = (entry) => isArray(entry) ? ICE_STARK : QIAN_KUN;

/**
 * path补全
 * @param {*} origin
 */
const fixRoutes = (origin) => {
  const path = get(origin, 'path') || '';
  const basename = get(origin, 'basename') || '';

  if (!path) {
    origin.path = basename
  }

  return origin
}

export const getAppsConfig = async (config, engines) => {
  const apps = await get(config, 'apps') || [];
  const history = get(config, 'history') || 'browser';
  const mountElementId = get(config, 'mountElementId')

  const _qiankunApps = apps.map((_) => {
    const _history = get(_, 'history') || history;
    const _mountElementId = get(_, 'mountElementId') || mountElementId || 'root-subapp-container';

    _.history = _history;
    _.mountElementId = _mountElementId;
    
    return _
  }).map(_ => fixRoutes(_)).map(_ => {
      const Api = {};
      QIAN_KUN_ROUTES_API.map(routeApi => {
        // 建立映射关系
        const _mappingKey = QIAN_KUN_API_MAPPING_TABLE[routeApi];

        Api[_mappingKey || routeApi] = _[routeApi]
      })
      
      // 添加 engine
      Api.engine = _.engine || getEngine(_.entry)
      return Api;
    })
    .filter((_) => _.engine === QIAN_KUN)

  const _iceStarkApps = apps.map((_) => {
    const _history = get(_, 'history') || history;
    _.history = _history;
    return _
  }).map(({entry, ..._}) => {
    const Api = _;
    Object.keys(Api).map(routeApi => {
      const _mappingKey = ICE_STARK_API_MAPPING_TABLE[routeApi];
      Api[getKey(_mappingKey) || routeApi] = changeValue(_mappingKey, _[routeApi]) 
    })

    // engine 添加
    Api.engine = _.engine || getEngine(entry);
    getEngine(entry) === ICE_STARK && (Api.url = entry)

    return Api
  }).filter((_) => _.engine === ICE_STARK);

  return {
    qiankunApps: _qiankunApps,
    iceStarkApps: _iceStarkApps
  };
}

export const getMainApi = (config, engines) => {
  // 根据引擎区分运行环境
  const _qiankunMainApi = Object.keys(config).reduce((init, current) => {
    const _mappingKey = QIAN_KUN_API_LIST_MAPPING_TABLE[current];
    const _values = config[current];
    _values && (init[getKey(_mappingKey) || current] = config[current]);

    return init
  }, {})

  const _iceStarkMainApi = { ...config };

  // 这里添加默认渲染容器
  if (!_iceStarkMainApi.mountElementId) {
    _iceStarkMainApi.mountElementId = 'root-slave'
  }

  return {
    qiankunMainApi: _qiankunMainApi,
    iceStarkMainApi: _iceStarkMainApi
  };
}

export const getSimpleIceStarkConfig = (iceStarkConfig) => {
  const historyType = iceStarkConfig.history || 'hash';
  const Layout = get(iceStarkConfig, 'components.LayoutComponent') || EmptyDom;
  const { LayoutComponent, ...otherComponent } = get(iceStarkConfig, 'components') || {};
  
  const resultConfig = {
    app: {
      rootId: iceStarkConfig.mountElementId,
      addProvider: iceStarkConfig.addProvider
    },
    router: {
      type: historyType
    },
    icestark: {
      type: 'framework',
      Layout,
      getApps: () => iceStarkConfig.apps,
      appRouter: otherComponent,
    },
  };

  return resultConfig;
}
