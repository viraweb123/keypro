'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clearCash = require('./clearCash');

var providersModule = angular.module('providers', []);

providersModule.provider('clearCash', _clearCash.clearCash);

exports.default = providersModule = providersModule.name;