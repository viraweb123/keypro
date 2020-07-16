'use strict';

var _Config = require('./Config/Config');

var _module = require('./Directive/module');

var _module2 = _interopRequireDefault(_module);

var _main = require('./Modules/Main/main.module');

var _main2 = _interopRequireDefault(_main);

var _login = require('./Modules/Login/login.module');

var _login2 = _interopRequireDefault(_login);

var _advance = require('./Modules/Advance/advance.module');

var _advance2 = _interopRequireDefault(_advance);

var _report = require('./Modules/Report/report.module');

var _report2 = _interopRequireDefault(_report);

var _simple = require('./Modules/Simple/simple.module');

var _simple2 = _interopRequireDefault(_simple);

var _cloud = require('./Modules/Cloud/cloud.module');

var _cloud2 = _interopRequireDefault(_cloud);

var _desktop = require('./Modules/Desktop/desktop.module');

var _desktop2 = _interopRequireDefault(_desktop);

var _dashboard = require('./Modules/Dashboard/dashboard.module');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _module3 = require('./Filters/module');

var _module4 = _interopRequireDefault(_module3);

var _administration = require('./Modules/Administration/administration.module');

var _administration2 = _interopRequireDefault(_administration);

var _map = require('./Modules/Map/map.module');

var _map2 = _interopRequireDefault(_map);

var _Authorization = require('./Class/Service/Authorization');

var _Authorization2 = _interopRequireDefault(_Authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.element(document).ready(function () {

    var app = angular.module("app", ['ui.event', 'ui.keypress', 'ngRoute', 'ui.router', 'pascalprecht.translate', 'ngSanitize', 'ngPersian', 'ui.bootstrap', 'angularjs-dropdown-multiselect', 'splitter', 'restangular', 'ngAnimate', 'ngMaterial', 'ngMessages', 'toaster', 'persianDate', 'ui.bootstrap.persian.datepicker', 'ui.bootstrap.accordion', 'dndLists', "ngImgCrop", 'keyDocProPDFModule', 'angularFileUpload', _Authorization2.default, _module2.default, _module4.default, _main2.default, _login2.default, _administration2.default, _advance2.default, _simple2.default, _cloud2.default, _desktop2.default, _dashboard2.default, _report2.default, _map2.default]);
    app.config(_Config.Configuration.configAPP).run(['$rootScope', 'Restangular', 'toaster', '$state', '$http', '$q', 'Authentication', _Config.Running.runAPP]);

    angular.bootstrap(window.document.querySelector("html"), ["app"]);
});