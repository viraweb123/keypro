'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _page = require('./page.controller');

var _main = require('./main.controller');

var _main2 = require('./main.config');

var _main3 = _interopRequireDefault(_main2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainModule = angular.module('main', []);

mainModule.factory('mainService', _service2.default);

mainModule.controller('PageController', _page.PageCtrl);

mainModule.controller('MainController', _main.MainCtrl);

mainModule.config(['$stateProvider', _main3.default]);

exports.default = mainModule = mainModule.name;