'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _map = require('./map.controller');

var _map2 = _interopRequireDefault(_map);

var _map3 = require('./map.config');

var _map4 = _interopRequireDefault(_map3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapModule = angular.module('map', []);

mapModule.factory('mapService', _service2.default);

mapModule.controller('MapController', _map2.default);

mapModule.config(_map4.default);
exports.default = mapModule = mapModule.name;