"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.domReadiedStart = void 0;

var _utils = require("./utils");

var _distribute = _interopRequireDefault(require("./distribute"));

var _micro = _interopRequireDefault(require("./micro"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var OnePiece = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var config,
        _yield$getConfig,
        envEngine,
        _config,
        microInstance,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            _context.next = 3;
            return (0, _utils.getConfig)(config);

          case 3:
            _yield$getConfig = _context.sent;
            envEngine = _yield$getConfig.envEngine;
            _config = _yield$getConfig._config;
            console.log('envEngine= >>>>', envEngine);
            _context.next = 9;
            return (0, _micro.default)(envEngine, _config);

          case 9:
            microInstance = _context.sent;
            _context.next = 12;
            return _utils.MicroConfig.useConfig({
              microInstance: microInstance
            });

          case 12:
            console.log('microInstance =>>>>', microInstance); // 微应用引擎开始加载

            return _context.abrupt("return", microInstance.start(config));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function OnePiece() {
    return _ref.apply(this, arguments);
  };
}();

var domReadiedStart = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var _MicroConfig$getConfi, microInstance;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _MicroConfig$getConfi = _utils.MicroConfig.getConfig(), microInstance = _MicroConfig$getConfi.microInstance;
            microInstance && microInstance.domReadiedStart();
            (0, _distribute.default)();

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function domReadiedStart() {
    return _ref2.apply(this, arguments);
  };
}();

exports.domReadiedStart = domReadiedStart;
var _default = OnePiece;
exports.default = _default;