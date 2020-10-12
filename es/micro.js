function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { getAppsConfig, getMainApi, getSimpleIceStarkConfig, getOriginQiankunApi, MicroConfig } from './utils';
import _icestarkStart from './icestark'; // import { start, registerMicroApps } from 'qiankun';

import { qiankunStart } from 'umi'; // import { createApp } from 'ice';

var Micro = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(envEngine, config) {
    var _envEngine, _yield$getAppsConfig, iceStarkApps, qiankunApps, _yield$getMainApi, iceStarkMainApi, qiankunMainApi, _icestarkConfig, _qiankunConfig;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _envEngine = envEngine;
            _context2.next = 3;
            return getAppsConfig(config, _envEngine);

          case 3:
            _yield$getAppsConfig = _context2.sent;
            iceStarkApps = _yield$getAppsConfig.iceStarkApps;
            qiankunApps = _yield$getAppsConfig.qiankunApps;
            _context2.next = 8;
            return getMainApi(config, _envEngine);

          case 8:
            _yield$getMainApi = _context2.sent;
            iceStarkMainApi = _yield$getMainApi.iceStarkMainApi;
            qiankunMainApi = _yield$getMainApi.qiankunMainApi;
            _icestarkConfig = _objectSpread(_objectSpread({}, iceStarkMainApi), {}, {
              apps: iceStarkApps
            });
            _qiankunConfig = _objectSpread(_objectSpread({}, qiankunMainApi), {}, {
              apps: qiankunApps
            });
            console.log('_qiankunConfig =====> ', _qiankunConfig);
            console.log('_icestarkConfig =====> ', _icestarkConfig);
            return _context2.abrupt("return", {
              start: function () {
                var _start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (_envEngine === 'icestark') {// const _simpleIceStarkConfig = getSimpleIceStarkConfig(_icestarkConfig);
                            // const icestarkSimpleStart = createApp;
                            // icestarkSimpleStart && icestarkSimpleStart(_simpleIceStarkConfig);
                            // MicroConfig.setConfig({
                            //   icestarkStart: () => icestarkSimpleStart(_simpleIceStarkConfig)
                            // })
                            // import('ice').then(mod => {
                            //   const icestarkSimpleStart = mod && mod.createApp;
                            //   icestarkSimpleStart && icestarkSimpleStart(_simpleIceStarkConfig);
                            //   MicroConfig.setConfig({
                            //     icestarkStart: () => icestarkSimpleStart(_simpleIceStarkConfig)
                            //   })
                            // }).catch(e => {
                            //   throw new Error(e)
                            // })
                          } else {
                            console.log('icestarkStart =>>>>>', MicroConfig.getConfig());
                            MicroConfig.setConfig({
                              icestarkStart: function icestarkStart() {
                                return _icestarkStart(_icestarkConfig);
                              }
                            });

                            _icestarkStart(_icestarkConfig);
                          }

                          if (!(_envEngine === 'qiankun')) {
                            _context.next = 7;
                            break;
                          }

                          // import('umi').then(mod => {
                          //   const _qiankunStart = mod && mod.qiankunStart;
                          //   MicroConfig.setConfig({
                          //     qiankunStart: _qiankunStart
                          //   })
                          // })
                          console.log('qiankunStart =>>>>>', MicroConfig.getConfig());
                          MicroConfig.setConfig({
                            qiankunStart: qiankunStart
                          });
                          return _context.abrupt("return", new Promise(function (resolve) {
                            return resolve(_qiankunConfig);
                          }));

                        case 7:
                          console.log('MicroConfig =>>>>', MicroConfig.getConfig());

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function start() {
                  return _start.apply(this, arguments);
                }

                return start;
              }(),
              getConfig: function getConfig() {
                return {
                  icestarkConfig: _icestarkConfig,
                  qiankunConfig: _qiankunConfig
                };
              },
              domReadiedStart: function domReadiedStart() {
                var _MicroConfig$getConfi = MicroConfig.getConfig(),
                    qiankunStart = _MicroConfig$getConfi.qiankunStart,
                    icestarkStart = _MicroConfig$getConfi.icestarkStart;

                icestarkStart && icestarkStart();
                qiankunStart && qiankunStart();
              }
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function Micro(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

export default Micro;