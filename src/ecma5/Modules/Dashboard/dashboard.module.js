'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _dashboard = require('./dashboard.controller');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _userlockedDocumentsController = require('./Center/User/userlockedDocumentsController');

var _userlockedDocumentsController2 = _interopRequireDefault(_userlockedDocumentsController);

var _usereditedDocumentsController = require('./Center/User/usereditedDocumentsController');

var _usereditedDocumentsController2 = _interopRequireDefault(_usereditedDocumentsController);

var _userlastDownloadedDocumentsController = require('./Center/User/userlastDownloadedDocumentsController');

var _userlastDownloadedDocumentsController2 = _interopRequireDefault(_userlastDownloadedDocumentsController);

var _usersubscribedDocumentsController = require('./Center/User/usersubscribedDocumentsController');

var _usersubscribedDocumentsController2 = _interopRequireDefault(_usersubscribedDocumentsController);

var _usersubscribedFoldersController = require('./Center/User/usersubscribedFoldersController');

var _usersubscribedFoldersController2 = _interopRequireDefault(_usersubscribedFoldersController);

var _userlastModifiedDocumentsController = require('./Center/User/userlastModifiedDocumentsController');

var _userlastModifiedDocumentsController2 = _interopRequireDefault(_userlastModifiedDocumentsController);

var _userlastUploadedDocumentsController = require('./Center/User/userlastUploadedDocumentsController');

var _userlastUploadedDocumentsController2 = _interopRequireDefault(_userlastUploadedDocumentsController);

var _bookmarksController = require('./Center/User/bookmarksController');

var _bookmarksController2 = _interopRequireDefault(_bookmarksController);

var _emailelEctronicMailsController = require('./Center/Email/emailelEctronicMailsController');

var _emailelEctronicMailsController2 = _interopRequireDefault(_emailelEctronicMailsController);

var _emailAttachmentsController = require('./Center/Email/emailAttachmentsController');

var _emailAttachmentsController2 = _interopRequireDefault(_emailAttachmentsController);

var _generallastModifiedDocumentsController = require('./Center/General/generallastModifiedDocumentsController');

var _generallastModifiedDocumentsController2 = _interopRequireDefault(_generallastModifiedDocumentsController);

var _generallastMonthTopModifiedDocumentsController = require('./Center/General/generallastMonthTopModifiedDocumentsController');

var _generallastMonthTopModifiedDocumentsController2 = _interopRequireDefault(_generallastMonthTopModifiedDocumentsController);

var _generallastMonthTopViewedDocumentsController = require('./Center/General/generallastMonthTopViewedDocumentsController');

var _generallastMonthTopViewedDocumentsController2 = _interopRequireDefault(_generallastMonthTopViewedDocumentsController);

var _generallastUploadedDocumentsController = require('./Center/General/generallastUploadedDocumentsController');

var _generallastUploadedDocumentsController2 = _interopRequireDefault(_generallastUploadedDocumentsController);

var _generallastWeekTopModifiedDocumentsController = require('./Center/General/generallastWeekTopModifiedDocumentsController');

var _generallastWeekTopModifiedDocumentsController2 = _interopRequireDefault(_generallastWeekTopModifiedDocumentsController);

var _generallastWeekTopViewedDocumentsController = require('./Center/General/generallastWeekTopViewedDocumentsController');

var _generallastWeekTopViewedDocumentsController2 = _interopRequireDefault(_generallastWeekTopViewedDocumentsController);

var _newsController = require('./Center/News/newsController');

var _newsController2 = _interopRequireDefault(_newsController);

var _workflowPendingTasksController = require('./Center/Workflow/workflowPendingTasksController');

var _workflowPendingTasksController2 = _interopRequireDefault(_workflowPendingTasksController);

var _workflowUnassignedPendingTasksController = require('./Center/Workflow/workflowUnassignedPendingTasksController');

var _workflowUnassignedPendingTasksController2 = _interopRequireDefault(_workflowUnassignedPendingTasksController);

var _dashboard3 = require('./dashboard.config');

var _dashboard4 = _interopRequireDefault(_dashboard3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dashboardModule = angular.module('dashboard', []);

dashboardModule.factory('dashboardService', _service2.default);

dashboardModule.controller('DashboardController', _dashboard2.default);

// TODO USER STATE

dashboardModule.controller('userlockedDocumentsController', _userlockedDocumentsController2.default);

dashboardModule.controller('usereditedDocumentsController', _usereditedDocumentsController2.default);

dashboardModule.controller('userlastDownloadedDocumentsController', _userlastDownloadedDocumentsController2.default);

dashboardModule.controller('usersubscribedDocumentsController', _usersubscribedDocumentsController2.default);

dashboardModule.controller('usersubscribedFoldersController', _usersubscribedFoldersController2.default);

dashboardModule.controller('userlastModifiedDocumentsController', _userlastModifiedDocumentsController2.default);

dashboardModule.controller('userlastUploadedDocumentsController', _userlastUploadedDocumentsController2.default);

dashboardModule.controller('bookmarksController', _bookmarksController2.default);

// TODO Email STATE

dashboardModule.controller('emailelEctronicMailsController', _emailelEctronicMailsController2.default);

dashboardModule.controller('emailAttachmentsController', _emailAttachmentsController2.default);

// TODO GENERAL STATE

dashboardModule.controller('generallastModifiedDocumentsController', _generallastModifiedDocumentsController2.default);

dashboardModule.controller('generallastMonthTopModifiedDocumentsController', _generallastMonthTopModifiedDocumentsController2.default);

dashboardModule.controller('generallastMonthTopViewedDocumentsController', _generallastMonthTopViewedDocumentsController2.default);

dashboardModule.controller('generallastUploadedDocumentsController', _generallastUploadedDocumentsController2.default);

dashboardModule.controller('generallastWeekTopModifiedDocumentsController', _generallastWeekTopModifiedDocumentsController2.default);

dashboardModule.controller('generallastWeekTopViewedDocumentsController', _generallastWeekTopViewedDocumentsController2.default);

// TODO News STATE

dashboardModule.controller('newsController', _newsController2.default);

// TODO WorkFlow STATE
//import {default as workflowCommentsController} from './Center/Workflow/workflowCommentsController';
//dashboardModule.controller('workflowCommentsController',workflowCommentsController );
//import {default as workflowDataController} from './Center/Workflow/workflowDataController';
//dashboardModule.controller('workflowDataController', workflowDataController);
//import {default as workflowFormController} from './Center/Workflow/workflowFormController';
//dashboardModule.controller('workflowFormController',workflowFormController );

dashboardModule.controller('workflowPendingTasksController', _workflowPendingTasksController2.default);
//import {default as workflowProcessDefinitionController} from './Center/Workflow/workflowProcessDefinitionController';
//dashboardModule.controller('workflowProcessDefinitionController',workflowProcessDefinitionController );
//import {default as workflowProcessInstanceController} from './Center/Workflow/workflowProcessInstanceController';
//dashboardModule.controller('workflowProcessInstanceController', workflowProcessInstanceController);
//import {default as workflowTaskController} from './Center/Workflow/workflowTaskController';
//dashboardModule.controller('workflowTaskController', workflowTaskController);

dashboardModule.controller('workflowUnassignedPendingTasksController', _workflowUnassignedPendingTasksController2.default);

dashboardModule.config(_dashboard4.default);
exports.default = dashboardModule = dashboardModule.name;