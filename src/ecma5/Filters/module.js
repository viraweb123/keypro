'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _minifyText = require('./../Filters/minifyText');

var _minifyText2 = _interopRequireDefault(_minifyText);

var _arrayHighLight = require('./../Filters/arrayHighLight');

var _arrayHighLight2 = _interopRequireDefault(_arrayHighLight);

var _trustUrl = require('./../Filters/trustUrl');

var _trustUrl2 = _interopRequireDefault(_trustUrl);

var _highlight = require('./../Filters/highlight');

var _highlight2 = _interopRequireDefault(_highlight);

var _listFilter = require('./../Filters/listFilter');

var _listFilter2 = _interopRequireDefault(_listFilter);

var _fileSize = require('./../Filters/fileSize');

var _fileSize2 = _interopRequireDefault(_fileSize);

var _en2faNum = require('./../Filters/en2faNum');

var _en2faNum2 = _interopRequireDefault(_en2faNum);

var _removeOKM = require('./../Filters/removeOKM');

var _removeOKM2 = _interopRequireDefault(_removeOKM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterModule = angular.module('filter', []);

filterModule.filter('minifyText', _minifyText2.default);

filterModule.filter('arrayHighLight', _arrayHighLight2.default);

filterModule.filter('trustUrl', _trustUrl2.default);

filterModule.filter('highlight', _highlight2.default);

filterModule.filter('listFilter', _listFilter2.default);

filterModule.filter('fileSize', _fileSize2.default);

filterModule.filter('en2faNum', _en2faNum2.default); //convert all EnToFaNumber --> en2faNum

filterModule.filter('removeOKM', _removeOKM2.default);

//import { default as  getNameFromPath } from './../Filters/getNameFromPath';
//filterModule.filter('getNameFromPath',getNameFromPath);
//import { default as toArray } from './../Filters/toArray';
//filterModule.filter('toArray',toArray);
//import { default as  toPersian} from './../Filters/toPersian';
//filterModule.filter('toPersian',toPersian);
//import { default as  orderFilterBy} from './../Filters/orderFilterBy';
//filterModule.filter('orderFilterBy',orderFilterBy);
//import { default as  isArray} from './../Filters/isArray';
//filterModule.filter('isArray',isArray);
//import { default as  showFile} from './../Filters/showFile';
//filterModule.filter('showFile',showFile);

exports.default = filterModule = filterModule.name;