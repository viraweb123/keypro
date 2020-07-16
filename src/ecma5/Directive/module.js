'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _angularTreeview = require('./Treeview/angularTreeview');

var _angularTreeview2 = _interopRequireDefault(_angularTreeview);

var _focusMe = require('./focusMe');

var _focusMe2 = _interopRequireDefault(_focusMe);

var _rightClick = require('./rightClick');

var _rightClick2 = _interopRequireDefault(_rightClick);

var _generator = require('./generator/generator');

var _generator2 = _interopRequireDefault(_generator);

var _player = require('./player/player');

var _player2 = _interopRequireDefault(_player);

var _mapViewer = require('./mapViewer/mapViewer');

var _mapViewer2 = _interopRequireDefault(_mapViewer);

var _imageViewer = require('./imageViewer/imageViewer');

var _imageViewer2 = _interopRequireDefault(_imageViewer);

var _angularTOCView = require('./TOCview/angularTOCView');

var _angularTOCView2 = _interopRequireDefault(_angularTOCView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var directiveModule = angular.module('directive', []);

directiveModule.factory('directiveService', _service2.default);

directiveModule.directive('treeModel', _angularTreeview2.default);
/*TODO not used Directive*/
//import { default as ngRightClick } from './ngRightClick';
//directiveModule.directive('ngRightClick',ngRightClick);

directiveModule.directive('focusMe', _focusMe2.default);
/*TODO not used Directive*/
//import { default as scrollTheme } from './scrollTheme';
//directiveModule.directive('scrollTheme',scrollTheme);

directiveModule.directive('rightClick', _rightClick2.default);

directiveModule.directive('generator', _generator2.default);

directiveModule.directive('keydocPlayer', _player2.default);

directiveModule.directive('mapViewer', _mapViewer2.default);

directiveModule.directive('imageViewer', _imageViewer2.default);

directiveModule.directive('tocModel', _angularTOCView2.default);

exports.default = directiveModule = directiveModule.name;