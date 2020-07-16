'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _desktop = require('./desktop.controller');

var _desktop2 = _interopRequireDefault(_desktop);

var _desktop3 = require('./desktop.config');

var _desktop4 = _interopRequireDefault(_desktop3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var desktopModule = angular.module('desktop', []);

desktopModule.factory('desktopService', _service2.default);

desktopModule.controller('DesktopController', _desktop2.default);

desktopModule.config(_desktop4.default);
exports.default = desktopModule = desktopModule.name;