'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _login = require('./login.controller');

var _login2 = require('./login.config');

var _login3 = _interopRequireDefault(_login2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginModule = angular.module('login', []);

loginModule.factory('userService', _service2.default);

loginModule.controller('LoginController', _login.LoginController);

loginModule.config(['$stateProvider', _login3.default]);

exports.default = loginModule = loginModule.name;