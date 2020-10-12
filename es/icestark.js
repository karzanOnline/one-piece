function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isArray } from 'lodash';
import { AppRouter, AppRoute } from '@ice/stark';
import { iceStarkFlattenConfig } from './utils';
import distributeCore from './distribute';

var IceStarkInstance = function IceStarkInstance(props) {
  var apps = props.apps,
      rootId = props.rootId,
      Layout = props.Layout,
      OtherComponents = props.OtherComponents,
      routerType = props.routerType;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      pathname = _useState2[0],
      setPathname = _useState2[1];

  var getAllApps = function getAllApps() {
    if (isArray(apps)) {
      return apps.map(function (app) {
        return /*#__PURE__*/React.createElement(AppRoute, app);
      });
    }

    return null;
  };

  var handleRouteChange = function handleRouteChange(pathname, hash, type) {
    return console.log('route change from icestark', pathname, hash, type);
  };

  return /*#__PURE__*/React.createElement(Layout, {
    pathname: pathname
  }, /*#__PURE__*/React.createElement(AppRouter, _extends({}, OtherComponents, {
    onRouteChange: handleRouteChange
  }), getAllApps()));
}; // 暂时套用api


var iceStarkStart = function iceStarkStart() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var envEngine = arguments.length > 1 ? arguments[1] : undefined;

  var _iceStarkFlattenConfi = iceStarkFlattenConfig(config),
      rootId = _iceStarkFlattenConfi.rootId,
      otherConfig = _objectWithoutProperties(_iceStarkFlattenConfi, ["rootId"]);

  var subAppContainerDom = document.getElementById(rootId);

  if (!subAppContainerDom) {
    return null;
  }

  ReactDOM.render( /*#__PURE__*/React.createElement(IceStarkInstance, otherConfig), document.getElementById(rootId));
};

export default iceStarkStart;