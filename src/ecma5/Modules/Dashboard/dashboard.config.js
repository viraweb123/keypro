'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardConfig = function () {
    function DashboardConfig() {
        _classCallCheck(this, DashboardConfig);
    }

    _createClass(DashboardConfig, null, [{
        key: 'config',
        value: function config($stateProvider) {
            'ngInject';

            var _this = this;

            _.forEach([{
                state: 'main.page.dashboard',
                config: {
                    url: '/dashboard',
                    views: {
                        'pageContent@main.page': {
                            templateUrl: 'ecma5/Modules/Dashboard/dashboard.html?dev=' + randomVersionName,
                            controller: 'DashboardController'
                        },
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Sides/zone.html?dev=' + randomVersionName
                        },
                        'sideR@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Sides/sideR.html?dev=' + randomVersionName
                        },
                        'zoneR@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Sides/zoneR.html?dev=' + randomVersionName
                        },
                        'userVisible@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Zones/userVisible.html?dev=' + randomVersionName
                        },
                        'emailVisible@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Zones/emailVisible.html?dev=' + randomVersionName
                        },
                        'generalVisible@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Zones/generalVisible.html?dev=' + randomVersionName
                        },
                        'newsVisible@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Zones/newsVisible.html?dev=' + randomVersionName
                        },
                        'workflowVisible@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Zones/workflowVisible.html?dev=' + randomVersionName
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
                                            return CSSManagement.addCSS('ecma5/Modules/Dashboard/dashboard.css?dev=' + randomVersionName);

                                        case 3:
                                            _context.next = 8;
                                            break;

                                        case 5:
                                            _context.prev = 5;
                                            _context.t0 = _context['catch'](0);

                                            console.error(_context.t0);

                                        case 8:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this, [[0, 5]]);
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
                                            return CSSManagement.removeCSS('ecma5/Modules/Dashboard/dashboard.css?dev=' + randomVersionName);

                                        case 3:
                                            _context2.next = 8;
                                            break;

                                        case 5:
                                            _context2.prev = 5;
                                            _context2.t0 = _context2['catch'](0);

                                            console.error(_context2.t0);

                                        case 8:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, _this, [[0, 5]]);
                        }));

                        function onExit() {
                            return _ref2.apply(this, arguments);
                        }

                        return onExit;
                    }()
                }
            },
            // TODO ---------------------------------  User State-----------------------------------------------
            {
                state: 'main.page.dashboard.userlockedDocuments',
                config: {
                    url: '/userlockedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/User/userlockedDocuments.html?dev=' + randomVersionName,
                            controller: 'userlockedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.usereditedDocuments',
                config: {
                    url: '/usereditedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/User/usereditedDocuments.html?dev=' + randomVersionName,
                            controller: 'usereditedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.userlastDownloadedDocuments',
                config: {
                    url: '/userlastDownloadedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/User/userlastDownloadedDocuments.html?dev=' + randomVersionName,
                            controller: 'userlastDownloadedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.usersubscribedDocuments',
                config: {
                    url: '/usersubscribedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/User/usersubscribedDocuments.html?dev=' + randomVersionName,
                            controller: 'usersubscribedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.usersubscribedFolders',
                config: {
                    url: '/usersubscribedFolders',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/User/usersubscribedFolders.html?dev=' + randomVersionName,
                            controller: 'usersubscribedFoldersController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.userlastModifiedDocuments',
                config: {
                    url: '/userlastModifiedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/User/userlastModifiedDocuments.html?dev=' + randomVersionName,
                            controller: 'userlastModifiedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.userlastUploadedDocuments',
                config: {
                    url: '/userlastUploadedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/User/userlastUploadedDocuments.html?dev=' + randomVersionName,
                            controller: 'userlastUploadedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.bookmarks',
                config: {
                    url: '/bookmarks',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/User/bookmarks.html?dev=' + randomVersionName,
                            controller: 'bookmarksController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  Email State-----------------------------------------------
            {
                state: 'main.page.dashboard.emailelEctronicMails',
                config: {
                    url: '/emailelEctronicMails',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/Email/emailelEctronicMails.html?dev=' + randomVersionName,
                            controller: 'emailelEctronicMailsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.emailAttachments',
                config: {
                    url: '/emailAttachments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/Email/emailAttachments.html?dev=' + randomVersionName,
                            controller: 'emailAttachmentsController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  General State-----------------------------------------------
            {
                state: 'main.page.dashboard.generallastModifiedDocuments',
                config: {
                    url: '/generallastModifiedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/General/generallastModifiedDocuments.html?dev=' + randomVersionName,
                            controller: 'generallastModifiedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.generallastMonthTopModifiedDocuments',
                config: {
                    url: '/generallastMonthTopModifiedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/General/generallastMonthTopModifiedDocuments.html?dev=' + randomVersionName,
                            controller: 'generallastMonthTopModifiedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.generallastMonthTopViewedDocuments',
                config: {
                    url: '/generallastMonthTopViewedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/General/generallastMonthTopViewedDocuments.html?dev=' + randomVersionName,
                            controller: 'generallastMonthTopViewedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.generallastUploadedDocuments',
                config: {
                    url: '/generallastUploadedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/General/generallastUploadedDocuments.html?dev=' + randomVersionName,
                            controller: 'generallastUploadedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.generallastWeekTopModifiedDocuments',
                config: {
                    url: '/generallastWeekTopModifiedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/General/generallastWeekTopModifiedDocuments.html?dev=' + randomVersionName,
                            controller: 'generallastWeekTopModifiedDocumentsController'
                        }
                    }
                }
            }, {
                state: 'main.page.dashboard.generallastWeekTopViewedDocuments',
                config: {
                    url: '/generallastWeekTopViewedDocuments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/General/generallastWeekTopViewedDocuments.html?dev=' + randomVersionName,
                            controller: 'generallastWeekTopViewedDocumentsController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  News State-----------------------------------------------
            {
                state: 'main.page.dashboard.news',
                config: {
                    url: '/news',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/News/news.html?dev=' + randomVersionName,
                            controller: 'newsController'
                        }
                    }
                }
            },
            // TODO ---------------------------------  WorkFlow State-----------------------------------------------
            /*{
                state  : 'main.page.dashboard.workflowComments',
                config : {
                    url: '/comments',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: `ecma5/Modules/Dashboard/Center/Workflow/workflowComments.html?dev=${randomVersionName}`,
                            controller: 'workflowCommentsController'
                        }
                    }
                }
            },*/
            /*{
                state  : 'main.page.dashboard.workflowData',
                config : {
                    url: '/data',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: `ecma5/Modules/Dashboard/Center/Workflow/workflowData.html?dev=${randomVersionName}`,
                            controller: 'workflowDataController'
                        }
                    }
                }
            },*/
            /* {
                 state  : 'main.page.dashboard.workflowForm',
                 config : {
                     url: '/form',
                     views: {
                         'sideZone@main.page.dashboard': {
                             templateUrl: `ecma5/Modules/Dashboard/Center/Workflow/workflowForm.html?dev=${randomVersionName}`,
                             controller: 'workflowFormController'
                         }
                     }
                 }
             },*/
            {
                state: 'main.page.dashboard.workflowPendingTasks',
                config: {
                    url: '/pendingTasks',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/Workflow/workflowPendingTasks.html?dev=' + randomVersionName,
                            controller: 'workflowPendingTasksController'
                        }
                    }
                }
            },
            /*{
                state  : 'main.page.dashboard.workflowProcessDefinition',
                config : {
                    url: '/processDefinition',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: `ecma5/Modules/Dashboard/Center/Workflow/workflowProcessDefinition.html?dev=${randomVersionName}`,
                            controller: 'workflowProcessDefinitionController'
                        }
                    }
                }
            },*/
            /*{
                state  : 'main.page.dashboard.workflowProcessInstance',
                config : {
                    url: '/processInstance',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: `ecma5/Modules/Dashboard/Center/Workflow/workflowProcessInstance.html?dev=${randomVersionName}`,
                            controller: 'workflowProcessInstanceController'
                        }
                    }
                }
            },*/
            /*{
                state  : 'main.page.dashboard.workflowTask',
                config : {
                    url: '/task',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: `ecma5/Modules/Dashboard/Center/Workflow/workflowTask.html?dev=${randomVersionName}`,
                            controller: 'workflowTaskController'
                        }
                    }
                }
            },*/
            {
                state: 'main.page.dashboard.workflowUnassignedPendingTasks',
                config: {
                    url: '/unassignedPendingTasks',
                    views: {
                        'sideZone@main.page.dashboard': {
                            templateUrl: 'ecma5/Modules/Dashboard/Center/Workflow/workflowUnassignedPendingTasks.html?dev=' + randomVersionName,
                            controller: 'workflowUnassignedPendingTasksController'
                        }
                    }
                }
            }], function (state) {
                return $stateProvider.state(state.state, state.config);
            });
        }
    }]);

    return DashboardConfig;
}();

exports.default = DashboardConfig.config;