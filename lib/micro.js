"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _icestark = _interopRequireDefault(require("./icestark"));

var _umi = require("umi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import { createApp } from 'ice';
var Micro = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(envEngine, config) {
    var _envEngine, _yield$getAppsConfig, iceStarkApps, qiankunApps, _yield$getMainApi, iceStarkMainApi, qiankunMainApi, _icestarkConfig, _qiankunConfig;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _envEngine = envEngine;
            _context2.next = 3;
            return (0, _utils.getAppsConfig)(config, _envEngine);

          case 3:
            _yield$getAppsConfig = _context2.sent;
            iceStarkApps = _yield$getAppsConfig.iceStarkApps;
            qiankunApps = _yield$getAppsConfig.qiankunApps;
            _context2.next = 8;
            return (0, _utils.getMainApi)(config, _envEngine);

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
                            console.log('icestarkStart =>>>>>', _utils.MicroConfig.getConfig());

                            _utils.MicroConfig.setConfig({
                              icestarkStart: function icestarkStart() {
                                return (0, _icestark.default)(_icestarkConfig);
                              }
                            });

                            (0, _icestark.default)(_icestarkConfig);
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
                          console.log('qiankunStart =>>>>>', _utils.MicroConfig.getConfig());

                          _utils.MicroConfig.setConfig({
                            qiankunStart: _umi.qiankunStart
                          });

                          return _context.abrupt("return", new Promise(function (resolve) {
                            return resolve(_qiankunConfig);
                          }));

                        case 7:
                          console.log('MicroConfig =>>>>', _utils.MicroConfig.getConfig());

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
                var _MicroConfig$getConfi = _utils.MicroConfig.getConfig(),
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

var _default = Micro;
exports.default = _default;