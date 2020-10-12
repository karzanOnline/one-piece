function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from "react";
import { get, isString, isObject, isArray } from 'lodash';
import { isInIcestark } from '@ice/stark-app';

var plugins = require('umi/_runtimePlugin');

var ICE_STARK = 'icestark';
var QIAN_KUN = 'qiankun';
var QIAN_KUN_ROUTES_API = ['entry', 'history', 'basename', 'path', 'mountElementId'];
var QIAN_KUN_API_LIST_MAPPING_TABLE = {
  sandbox: 'jsSandbox'
}; // umi-qiankun-plugin 对应 api 映射表

var QIAN_KUN_API_MAPPING_TABLE = {
  basename: 'name',
  base: 'activeRule',
  path: 'base'
}; // qiankun 原生映射表

var QIAN_KUN_ORIGIN_API_TABLE = {
  container: 'mountElementId',
  activeRule: 'path'
}; // iceStark 映射表

var ICE_STARK_API_MAPPING_TABLE = {
  entry: 'url',
  history: {
    key: 'hashType',
    valueChange: function valueChange(value) {
      return value === 'hash';
    }
  },
  mountElementId: 'rootId'
};

var delay = function delay(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
};

var EmptyDom = function EmptyDom(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", null, children);
};

var engineList = [ICE_STARK, QIAN_KUN];
export var getOriginQiankunApi = function getOriginQiankunApi(config) {
  if (isArray(config)) {
    return config.map(function (_) {
      return getOriginQiankunApi(_);
    });
  }

  Object.keys(QIAN_KUN_ORIGIN_API_TABLE).map(function (_key) {
    var _valueKey = QIAN_KUN_ORIGIN_API_TABLE[_key];
    config[_key] = config[_valueKey];
  });
  return config;
};
/**
 * 获取当前环境的微前端引擎
 * @param {*} engine 
 */

export var getEnv = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(engine) {
    var hasEngine, isUmiQiankun;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hasEngine = engineList.some(function (_) {
              return _ === engine;
            });
            isUmiQiankun = false;
            _context.prev = 2;

            if (!(plugins && plugins.getItem('qiankun'))) {
              _context.next = 7;
              break;
            }

            isUmiQiankun = true;
            _context.next = 9;
            break;

          case 7:
            isUmiQiankun = false;
            return _context.abrupt("return", ICE_STARK);

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            isUmiQiankun = false;
            return _context.abrupt("return", ICE_STARK);

          case 15:
            if (!hasEngine) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", engine);

          case 17:
            if (!(isInIcestark && !isUmiQiankun)) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", ICE_STARK);

          case 19:
            return _context.abrupt("return", QIAN_KUN);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 11]]);
  }));

  return function getEnv(_x) {
    return _ref2.apply(this, arguments);
  };
}();
export var getConfig = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(config) {
    var _envEngine;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getEnv(get(config, 'engine'));

          case 2:
            _envEngine = _context2.sent;
            return _context2.abrupt("return", {
              _config: config,
              envEngine: _envEngine
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getConfig(_x2) {
    return _ref3.apply(this, arguments);
  };
}(); // 全局的微前端hook配置

export var MicroConfig = function (config) {
  var _value = {};
  return {
    useConfig: function useConfig(initialMicro) {
      var setConfig = function setConfig(newValue) {
        _value = initialMicro;
      };

      initialMicro && setConfig(initialMicro);
      return [initialMicro, setConfig];
    },
    setConfig: function setConfig(newConfig) {
      _value = _objectSpread(_objectSpread({}, _value), newConfig);
      return _value;
    },
    getConfig: function getConfig() {
      return _value;
    }
  };
}();

var setRootId = function setRootId(origin, globalRootId) {
  if (isArray) {
    return origin.map(function (_) {
      if (globalRootId && !_.mountElementId) {
        _.rootId = globalRootId;
      }

      return _;
    });
  }

  return origin;
};

export var iceStarkFlattenConfig = function iceStarkFlattenConfig(config) {
  var globalRootId = get(config, 'mountElementId') || '';
  var apps = get(config, 'apps') || [];
  var components = get(config, 'components') || {};
  setRootId(apps, globalRootId);

  var _components$LayoutCom = components.LayoutComponent,
      LayoutComponent = _components$LayoutCom === void 0 ? EmptyDom : _components$LayoutCom,
      OtherComponents = _objectWithoutProperties(components, ["LayoutComponent"]);

  var routerType = get(config, 'history') || 'hashHistory';
  return {
    apps: apps,
    rootId: globalRootId,
    Layout: LayoutComponent,
    OtherComponents: OtherComponents,
    routerType: routerType
  };
};

var changeValue = function changeValue(mappingKey, value) {
  if (!isString(mappingKey) && isObject(mappingKey)) {
    var _action = get(mappingKey, 'valueChange') || {};

    return _action(value);
  }

  return value;
};

var getKey = function getKey(origin) {
  if (!isString(origin) && isObject(origin)) {
    var _key = get(origin, 'key');

    return _key;
  }

  return origin;
};
/**
 * 这里只根据 entry 的类型做一个粗略的引擎判断
 * 目前的业务区分，icestark 使用场景在 url侧，qiankun 的使用场景在于 entry
 * TODO 这里判断的比较切合当前业务，如果后面需要开放则使用标准化判断
 * @param {} entry 
 */


var getEngine = function getEngine(entry) {
  return isArray(entry) ? ICE_STARK : QIAN_KUN;
};
/**
 * path补全
 * @param {*} origin
 */


var fixRoutes = function fixRoutes(origin) {
  var path = get(origin, 'path') || '';
  var basename = get(origin, 'basename') || '';

  if (!path) {
    origin.path = basename;
  }

  return origin;
};

export var getAppsConfig = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(config, engines) {
    var apps, history, mountElementId, _qiankunApps, _iceStarkApps;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return get(config, 'apps');

          case 2:
            _context3.t0 = _context3.sent;

            if (_context3.t0) {
              _context3.next = 5;
              break;
            }

            _context3.t0 = [];

          case 5:
            apps = _context3.t0;
            history = get(config, 'history') || 'browser';
            mountElementId = get(config, 'mountElementId');
            _qiankunApps = apps.map(function (_) {
              var _history = get(_, 'history') || history;

              var _mountElementId = get(_, 'mountElementId') || mountElementId || 'root-subapp-container';

              _.history = _history;
              _.mountElementId = _mountElementId;
              return _;
            }).map(function (_) {
              return fixRoutes(_);
            }).map(function (_) {
              var Api = {};
              QIAN_KUN_ROUTES_API.map(function (routeApi) {
                // 建立映射关系
                var _mappingKey = QIAN_KUN_API_MAPPING_TABLE[routeApi];
                Api[_mappingKey || routeApi] = _[routeApi];
              }); // 添加 engine

              Api.engine = _.engine || getEngine(_.entry);
              return Api;
            }).filter(function (_) {
              return _.engine === QIAN_KUN;
            });
            _iceStarkApps = apps.map(function (_) {
              var _history = get(_, 'history') || history;

              _.history = _history;
              return _;
            }).map(function (_ref5) {
              var entry = _ref5.entry,
                  _ = _objectWithoutProperties(_ref5, ["entry"]);

              var Api = _;
              Object.keys(Api).map(function (routeApi) {
                var _mappingKey = ICE_STARK_API_MAPPING_TABLE[routeApi];
                Api[getKey(_mappingKey) || routeApi] = changeValue(_mappingKey, _[routeApi]);
              }); // engine 添加

              Api.engine = _.engine || getEngine(entry);
              getEngine(entry) === ICE_STARK && (Api.url = entry);
              return Api;
            }).filter(function (_) {
              return _.engine === ICE_STARK;
            });
            return _context3.abrupt("return", {
              qiankunApps: _qiankunApps,
              iceStarkApps: _iceStarkApps
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAppsConfig(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();
export var getMainApi = function getMainApi(config, engines) {
  // 根据引擎区分运行环境
  var _qiankunMainApi = Object.keys(config).reduce(function (init, current) {
    var _mappingKey = QIAN_KUN_API_LIST_MAPPING_TABLE[current];
    var _values = config[current];
    _values && (init[getKey(_mappingKey) || current] = config[current]);
    return init;
  }, {});

  var _iceStarkMainApi = _objectSpread({}, config); // 这里添加默认渲染容器


  if (!_iceStarkMainApi.mountElementId) {
    _iceStarkMainApi.mountElementId = 'root-slave';
  }

  return {
    qiankunMainApi: _qiankunMainApi,
    iceStarkMainApi: _iceStarkMainApi
  };
};
export var getSimpleIceStarkConfig = function getSimpleIceStarkConfig(iceStarkConfig) {
  var historyType = iceStarkConfig.history || 'hash';
  var Layout = get(iceStarkConfig, 'components.LayoutComponent') || EmptyDom;

  var _ref6 = get(iceStarkConfig, 'components') || {},
      LayoutComponent = _ref6.LayoutComponent,
      otherComponent = _objectWithoutProperties(_ref6, ["LayoutComponent"]);

  var resultConfig = {
    app: {
      rootId: iceStarkConfig.mountElementId,
      addProvider: iceStarkConfig.addProvider
    },
    router: {
      type: historyType
    },
    icestark: {
      type: 'framework',
      Layout: Layout,
      getApps: function getApps() {
        return iceStarkConfig.apps;
      },
      appRouter: otherComponent
    }
  };
  return resultConfig;
};