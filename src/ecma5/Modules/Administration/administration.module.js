'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _administration = require('./administration.controller');

var _administration2 = _interopRequireDefault(_administration);

var _userController = require('./Center/userController');

var _userController2 = _interopRequireDefault(_userController);

var _roleController = require('./Center/roleController');

var _roleController2 = _interopRequireDefault(_roleController);

var _accessController = require('./Center/accessController');

var _accessController2 = _interopRequireDefault(_accessController);

var _addMetadataController = require('./Center/addMetadataController');

var _addMetadataController2 = _interopRequireDefault(_addMetadataController);

var _createSelectRelationController = require('./Center/createSelectRelationController');

var _createSelectRelationController2 = _interopRequireDefault(_createSelectRelationController);

var _relationController = require('./Center/relationController');

var _relationController2 = _interopRequireDefault(_relationController);

var _metadataController = require('./Center/metadataController');

var _metadataController2 = _interopRequireDefault(_metadataController);

var _externalManagementIFRAMEController = require('./Center/externalManagementIFRAMEController');

var _externalManagementIFRAMEController2 = _interopRequireDefault(_externalManagementIFRAMEController);

var _categoriManagementController = require('./Center/categoriManagementController');

var _categoriManagementController2 = _interopRequireDefault(_categoriManagementController);

var _assignDigitalSignController = require('./Center/assignDigitalSignController');

var _assignDigitalSignController2 = _interopRequireDefault(_assignDigitalSignController);

var _administration3 = require('./administration.config');

var _administration4 = _interopRequireDefault(_administration3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var administrationModule = angular.module('administration', []);

administrationModule.factory('administrationService', _service2.default);

administrationModule.controller('AdministrationController', _administration2.default);

administrationModule.controller('userController', _userController2.default);
/*administrationModule.controller('userController');*/

administrationModule.controller('roleController', _roleController2.default);

administrationModule.controller('accessController', _accessController2.default);

administrationModule.controller('addMetadataController', _addMetadataController2.default);

administrationModule.controller('createSelectRelationController', _createSelectRelationController2.default);

administrationModule.controller('relationController', _relationController2.default);

administrationModule.controller('metadataController', _metadataController2.default);

administrationModule.controller('externalManagementIFRAMEController', _externalManagementIFRAMEController2.default);

administrationModule.controller('categoriManagementController', _categoriManagementController2.default);

administrationModule.controller('assignDigitalSignController', _assignDigitalSignController2.default);

administrationModule.config(_administration4.default);
exports.default = administrationModule = administrationModule.name;