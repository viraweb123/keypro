'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _cloud = require('./cloud.controller');

var _cloud2 = _interopRequireDefault(_cloud);

var _cloud3 = require('./cloud.config');

var _cloud4 = _interopRequireDefault(_cloud3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloudModule = angular.module('cloud', []);

cloudModule.factory('cloudService', _service2.default);

cloudModule.controller('CloudController', _cloud2.default);

cloudModule.config(_cloud4.default);
exports.default = cloudModule = cloudModule.name;