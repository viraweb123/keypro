'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isLoginManagement = require('./../../Class/Service/isLoginManagement');

var _isLoginManagement2 = _interopRequireDefault(_isLoginManagement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdministrationConfig = function () {
    function AdministrationConfig() {
        _classCallCheck(this, AdministrationConfig);
    }

    _createClass(AdministrationConfig, null, [{
        key: 'config',
        value: function config($stateProvider) {
            'ngInject';

            var _this = this;

            _.forEach([{
                state: 'main.page.administration',
                config: {
                    url: '/administration',
                    views: {
                        'pageContent@main.page': {
                            templateUrl: 'ecma5/Modules/Administration/administration.html?dev=' + randomVersionName,
                            controller: 'AdministrationController'
                        },
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Sides/zone.html?dev=' + randomVersionName
                        },
                        'sideR@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Sides/sideR.html?dev=' + randomVersionName
                        },
                        'zoneR@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Sides/zoneR.html?dev=' + randomVersionName
                        },
                        'settingVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/settingVisible.html?dev=' + randomVersionName
                        },
                        'usersVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/usersVisible.html?dev=' + randomVersionName
                        },
                        'languageVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/languageVisible.html?dev=' + randomVersionName
                        },
                        'utilitiesVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/utilitiesVisible.html?dev=' + randomVersionName
                        },
                        'repositoryVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/repositoryVisible.html?dev=' + randomVersionName
                        },
                        'dictionaryVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/dictionaryVisible.html?dev=' + randomVersionName
                        },
                        'OMRVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/OMRVisible.html?dev=' + randomVersionName
                        },
                        'timerVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/timerVisible.html?dev=' + randomVersionName
                        },
                        'AutomationVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/AutomationVisible.html?dev=' + randomVersionName
                        },
                        'WorkflowVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/WorkflowVisible.html?dev=' + randomVersionName
                        },
                        'ReportVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/ReportVisible.html?dev=' + randomVersionName
                        },
                        'DatabaseQueryVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/DatabaseQueryVisible.html?dev=' + randomVersionName
                        },
                        'scriptingVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/scriptingVisible.html?dev=' + randomVersionName
                        },
                        'statsVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/statsVisible.html?dev=' + randomVersionName
                        },
                        'digitalSignVisible@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Zones/digitalSignVisible.html?dev=' + randomVersionName
                        }

                    },
                    onEnter: function () {
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return CSSManagement.addCSS('ecma5/Modules/Administration/administration.css?dev=' + randomVersionName);

                                        case 3:
                                            _isLoginManagement2.default.isLogin = null;
                                            _context.next = 9;
                                            break;

                                        case 6:
                                            _context.prev = 6;
                                            _context.t0 = _context['catch'](0);

                                            console.error(_context.t0);

                                        case 9:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this, [[0, 6]]);
                        }));

                        function onEnter() {
                            return _ref.apply(this, arguments);
                        }

                        return onEnter;
                    }(),
                    onExit: function () {
                        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.prev = 0;
                                            _context2.next = 3;
                                            return CSSManagement.removeCSS('ecma5/Modules/Administration/administration.css?dev=' + randomVersionName);

                                        case 3:
                                            _isLoginManagement2.default.isLogin = null;
                                            _context2.next = 9;
                                            break;

                                        case 6:
                                            _context2.prev = 6;
                                            _context2.t0 = _context2['catch'](0);

                                            console.error(_context2.t0);

                                        case 9:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, _this, [[0, 6]]);
                        }));

                        function onExit() {
                            return _ref2.apply(this, arguments);
                        }

                        return onExit;
                    }()
                }
            },
            // TODO ---------------------------------  settingVisible ----------------------------------------------
            {
                state: 'main.page.administration.generalSetting',
                config: {
                    url: '/generalSetting',
                    params: { src: 'KeydocPro/admin/Config' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.metadata',
                config: {
                    url: '/metadata',
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/metadata.html?dev=' + randomVersionName,
                            controller: 'metadataController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.addMetadata',
                config: {
                    url: '/addMetadata',
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/addMetadata.html?dev=' + randomVersionName,
                            controller: 'addMetadataController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.createSelectRelation',
                config: {
                    url: '/createSelectRelation',
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/createSelectRelation.html?dev=' + randomVersionName,
                            controller: 'createSelectRelationController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.relation',
                config: {
                    url: '/relation',
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/relation.html?dev=' + randomVersionName,
                            controller: 'relationController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.MimeType',
                config: {
                    url: '/MimeType',
                    params: { src: 'KeydocPro/admin/MimeType' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.loggedUsers',
                config: {
                    url: '/loggedUsers',
                    params: { src: 'KeydocPro/admin/LoggedUsers' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.messageList',
                config: {
                    url: '/messageList',
                    params: { src: 'KeydocPro/admin/LoggedUsers?action=messageList' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.categoriManagement',
                config: {
                    url: '/categoriManagement',
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/categoriManagement.html?dev=' + randomVersionName,
                            controller: 'categoriManagementController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  usersVisible ------------------------------------------------
            {
                state: 'main.page.administration.users',
                config: {
                    url: '/users',
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/user.html?dev=' + randomVersionName,
                            controller: 'userController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.roles',
                config: {
                    url: '/roles',
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/role.html?dev=' + randomVersionName,
                            controller: 'roleController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.Profile',
                config: {
                    url: '/Profile',
                    params: { src: 'KeydocPro/admin/Profile' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.access',
                config: {
                    url: '/access',
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/access.html?dev=' + randomVersionName,
                            controller: 'accessController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.ActivityLog',
                config: {
                    url: '/ActivityLog',
                    params: { src: 'KeydocPro/admin/ActivityLog' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  languageVisible ---------------------------------------------
            /*{
                state: 'main.page.administration.language',
                config: {
                    url: '/language',
                    params: {src : 'KeydocPro/admin/Language'},
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: `ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=${randomVersionName}`,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },*/
            //KeydocPro/admin/LoggedUsers?action=messageList
            // TODO ---------------------------------  utilitiesVisible --------------------------------------------
            {
                state: 'main.page.administration.checkEmail',
                config: {
                    url: '/checkEmail',
                    params: { src: 'KeydocPro/admin/CheckEmail' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.checkTextExtraction',
                config: {
                    url: '/checkTextExtraction',
                    params: { src: 'KeydocPro/admin/CheckTextExtraction' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.css',
                config: {
                    url: '/css',
                    params: { src: 'KeydocPro/admin/Css' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.dbRepositoryView',
                config: {
                    url: '/dbRepositoryView',
                    params: { src: 'KeydocPro/admin/DbRepositoryView' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.listIndexes',
                config: {
                    url: '/listIndexes',
                    params: { src: 'KeydocPro/admin/ListIndexes' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.logCat',
                config: {
                    url: '/logCat',
                    params: { src: 'KeydocPro/admin/LogCat' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.rebuildIndexes',
                config: {
                    url: '/rebuildIndexes',
                    params: { src: 'KeydocPro/admin/rebuild_indexes.jsp' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.repositoryChecker',
                config: {
                    url: '/repositoryChecker',
                    params: { src: 'KeydocPro/admin/repository_checker.jsp' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.systemProperties',
                config: {
                    url: '/systemProperties',
                    params: { src: 'KeydocPro/admin/system_properties.jsp' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  repositoryVisible -------------------------------------------
            {
                state: 'main.page.administration.repositoryExport',
                config: {
                    url: '/repositoryExport',
                    params: { src: 'KeydocPro/admin/repository_export.jsp?lang=fa-IR' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.repositoryImport',
                config: {
                    url: '/repositoryImport',
                    params: { src: 'KeydocPro/admin/repository_import.jsp?lang=fa-IR' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  dictionaryVisible -------------------------------------------
            {
                state: 'main.page.administration.dictionary',
                config: {
                    url: '/dictionary',
                    params: { src: 'KeydocPro/admin/generate_thesaurus.jsp?lang=fa-IR' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  OMRVisible --------------------------------------------------
            {
                state: 'main.page.administration.OMR',
                config: {
                    url: '/OMR',
                    params: { src: 'KeydocPro/admin/Omr' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  timerVisible ------------------------------------------------
            {
                state: 'main.page.administration.timer',
                config: {
                    url: '/timer',
                    params: { src: 'KeydocPro/admin/CronTab' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  AutomationVisible -------------------------------------------
            {
                state: 'main.page.administration.Automation',
                config: {
                    url: '/Automation',
                    params: { src: 'KeydocPro/admin/Automation' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  WorkflowVisible ---------------------------------------------
            {
                state: 'main.page.administration.Workflow',
                config: {
                    url: '/Workflow',
                    params: { src: 'KeydocPro/admin/Workflow' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  ReportVisible -----------------------------------------------
            {
                state: 'main.page.administration.Report',
                config: {
                    url: '/Report',
                    params: { src: 'KeydocPro/admin/Report' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  DatabaseQueryVisible ----------------------------------------
            {
                state: 'main.page.administration.DatabaseQuery',
                config: {
                    url: '/DatabaseQuery',
                    params: { src: 'KeydocPro/admin/DatabaseQuery' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  scriptingVisible --------------------------------------------
            {
                state: 'main.page.administration.scripting',
                config: {
                    url: '/scripting',
                    params: { src: 'KeydocPro/admin/scripting.jsp?lang=fa-IR' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  statsVisible ------------------------------------------------
            {
                state: 'main.page.administration.stats',
                config: {
                    url: '/stats',
                    params: { src: 'KeydocPro/admin/stats.jsp?lang=fa-IR' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.pendingTaskQueue',
                config: {
                    url: '/pendingTaskQueue',
                    params: { src: 'KeydocPro/admin/PendingTaskQueue' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            }, {
                state: 'main.page.administration.textExtractionQueue',
                config: {
                    url: '/textExtractionQueue',
                    params: { src: 'KeydocPro/admin/TextExtractionQueue' },
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/externalManagementIFRAME.html?dev=' + randomVersionName,
                            controller: 'externalManagementIFRAMEController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  digitalSign ------------------------------------------------
            {
                state: 'main.page.administration.assignDigitalSign',
                config: {
                    url: '/assignDigitalSign',
                    views: {
                        'sideZone@main.page.administration': {
                            templateUrl: 'ecma5/Modules/Administration/Center/assignDigitalSign.html?dev=' + randomVersionName,
                            controller: 'assignDigitalSignController'
                        }
                    }
                }
            }], function (state) {
                return $stateProvider.state(state.state, state.config);
            });
        }
    }]);

    return AdministrationConfig;
}();

exports.default = AdministrationConfig.config;