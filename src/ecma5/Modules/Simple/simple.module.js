'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _simple = require('./simple.controller');

var _simple2 = _interopRequireDefault(_simple);

var _simple3 = require('./simple.config');

var _simple4 = _interopRequireDefault(_simple3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simpleModule = angular.module('simple', []);

simpleModule.factory('simpleService', _service2.default);

simpleModule.controller('SimpleController', _simple2.default);

simpleModule.config(_simple4.default);

exports.default = simpleModule = simpleModule.name;