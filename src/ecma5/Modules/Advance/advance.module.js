'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _advance = require('./advance.controller');

var _advance2 = _interopRequireDefault(_advance);

var _advance3 = require('./advance.config');

var _advance4 = _interopRequireDefault(_advance3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var advanceModule = angular.module('advance', []);

advanceModule.factory('advanceService', _service2.default);

advanceModule.controller('AdvanceController', _advance2.default);

advanceModule.config(_advance4.default);
exports.default = advanceModule = advanceModule.name;