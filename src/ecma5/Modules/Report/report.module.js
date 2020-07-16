'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _report = require('./report.controller');

var _report2 = _interopRequireDefault(_report);

var _report3 = require('./report.config');

var _report4 = _interopRequireDefault(_report3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reportModule = angular.module('report', []);

reportModule.factory('reportService', _service2.default);

reportModule.controller('ReportController', _report2.default);

reportModule.config(_report4.default);
exports.default = reportModule = reportModule.name;