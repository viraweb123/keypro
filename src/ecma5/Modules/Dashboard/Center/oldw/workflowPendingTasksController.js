"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var workflowPendingTasksController = function workflowPendingTasksController($scope, $state, dashboardService, toaster, $uibModal, Authentication) {
    var _this = this;

    _classCallCheck(this, workflowPendingTasksController);

    $scope.data = {
        removeExternalFuncs: {},
        profile: null,
        list: null,
        isDownload: true,
        sort: {
            type: null,
            ascDesc: true
        }
    };

    $scope.func = {};

    $scope.func.go2Desktop = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(item) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;

                            if ($scope.data.profile.prfStack.taxonomyVisible) {
                                _context3.next = 3;
                                break;
                            }

                            throw new Error("امکان ورود به این صفحه وجود ندارد .");

                        case 3:
                            dashboardService.document.getProperties(item.variables.uuid).then(function () {
                                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                                    var document;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    document = null;
                                                    _context.prev = 1;

                                                    document = res.data.originalElement.document;
                                                    _context.next = 5;
                                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/saveChangeStateVar.js?dev=" + randomVersionName);

                                                case 5:
                                                    _context.next = 7;
                                                    return setStateVarFunction(angular.copy(document));

                                                case 7:
                                                    $state.go('main.page.desktop', {}, { reload: false });
                                                    _context.next = 13;
                                                    break;

                                                case 10:
                                                    _context.prev = 10;
                                                    _context.t0 = _context["catch"](1);

                                                    toaster.pop("error", "", "مشکلی در دریافت اطلاعات سند به وجود آمده است.");

                                                case 13:
                                                    _context.prev = 13;

                                                    document = undefined;
                                                    return _context.finish(13);

                                                case 16:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this, [[1, 10, 13, 16]]);
                                }));

                                return function (_x2) {
                                    return _ref2.apply(this, arguments);
                                };
                            }(), function (error) {
                                dashboardService.folder.getProperties(item.variables.uuid).then(function () {
                                    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(res) {
                                        var folder;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        folder = null;
                                                        _context2.prev = 1;

                                                        folder = res.data.originalElement.folder;
                                                        _context2.next = 5;
                                                        return JSManagement.addJS("ecma5/ExternalLiberary/Public/saveChangeStateVar.js?dev=" + randomVersionName);

                                                    case 5:
                                                        _context2.next = 7;
                                                        return setStateVarFunction(angular.copy(folder));

                                                    case 7:
                                                        $state.go('main.page.desktop', {}, { reload: false });
                                                        _context2.next = 13;
                                                        break;

                                                    case 10:
                                                        _context2.prev = 10;
                                                        _context2.t0 = _context2["catch"](1);

                                                        toaster.pop("error", "", "مشکلی در دریافت اطلاعات پوشه به وجود آمده است.");

                                                    case 13:
                                                        _context2.prev = 13;

                                                        folder = undefined;
                                                        return _context2.finish(13);

                                                    case 16:
                                                    case "end":
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this, [[1, 10, 13, 16]]);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }(), function (err) {
                                    toaster.pop("error", "", "مشکلی در دریافت اطلاعات پوشه به وجود آمده است.");
                                });
                            });
                            _context3.next = 10;
                            break;

                        case 6:
                            _context3.prev = 6;
                            _context3.t0 = _context3["catch"](0);

                            console.error(_context3.t0);
                            toaster.pop("error", "", _context3.t0.message);

                        case 10:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[0, 6]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();

    $scope.func.viewTask = function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(item) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            _context4.next = 3;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Dashboard/viewTaskDashboardCtrl.js?dev=" + randomVersionName);

                        case 3:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Dashboard/viewTaskDashboardCtrl.js?dev=" + randomVersionName] = 'viewTaskDashboardCtrl';
                            viewTaskDashboardCtrl($uibModal, {
                                id: item.id,
                                name: item.name,
                                create: item.created
                            });
                            _context4.next = 10;
                            break;

                        case 7:
                            _context4.prev = 7;
                            _context4.t0 = _context4["catch"](0);

                            console.error(_context4.t0);

                        case 10:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[0, 7]]);
        }));

        return function (_x4) {
            return _ref4.apply(this, arguments);
        };
    }();
    $scope.func.viewTypicalProcess = function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(item) {
            var resalt;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;
                            _context5.next = 3;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Dashboard/viewTypicalProcessDashboardCtrl.js?dev=" + randomVersionName);

                        case 3:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Dashboard/viewTypicalProcessDashboardCtrl.js?dev=" + randomVersionName] = 'viewTypicalProcessDashboardCtrl';
                            _context5.next = 6;
                            return viewTypicalProcessDashboardCtrl($uibModal, dashboardService, {
                                id: item.id,
                                version: item.processInstance.version,
                                uuid: item.processInstance.variables.uuid,
                                path: _.has(item.processInstance.variables, 'path') ? item.processInstance.variables.path : null
                            });

                        case 6:
                            resalt = _context5.sent;

                            item.processInstance.variables.path = _.clone(resalt);
                            _context5.next = 13;
                            break;

                        case 10:
                            _context5.prev = 10;
                            _context5.t0 = _context5["catch"](0);

                            console.error(_context5.t0);

                        case 13:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this, [[0, 10]]);
        }));

        return function (_x5) {
            return _ref5.apply(this, arguments);
        };
    }();
    $scope.func.viewProcessDefinition = function () {
        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(item) {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.prev = 0;
                            _context6.next = 3;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Dashboard/viewProcessDefinitionDashboardCtrl.js?dev=" + randomVersionName);

                        case 3:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Dashboard/viewProcessDefinitionDashboardCtrl.js?dev=" + randomVersionName] = 'viewProcessDefinitionDashboardCtrl';
                            _context6.next = 6;
                            return viewProcessDefinitionDashboardCtrl($uibModal, {
                                id: item.id,
                                name: item.processInstance.processDefinition.name,
                                version: item.processInstance.processDefinition.version
                            });

                        case 6:
                            _context6.next = 11;
                            break;

                        case 8:
                            _context6.prev = 8;
                            _context6.t0 = _context6["catch"](0);

                            console.error(_context6.t0);

                        case 11:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this, [[0, 8]]);
        }));

        return function (_x6) {
            return _ref6.apply(this, arguments);
        };
    }();
    $scope.func.viewOpiniones = function () {
        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(item) {
            var comments;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.prev = 0;
                            _context7.next = 3;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Dashboard/viewOpinionesDashboardCtrl.js?dev=" + randomVersionName);

                        case 3:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Dashboard/viewOpinionesDashboardCtrl.js?dev=" + randomVersionName] = 'viewOpinionesDashboardCtrl';
                            _context7.next = 6;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=" + randomVersionName);

                        case 6:
                            if (_.has(item, 'comments') && _.isArray(item.comments)) _.map(item.comments, function (comment) {
                                return comment.timeNew = toDateDashboardCtrl(comment.time);
                            });
                            _context7.next = 9;
                            return viewOpinionesDashboardCtrl($uibModal, item.id, item.actorId, dashboardService, item.comments || [], toDateDashboardCtrl);

                        case 9:
                            comments = _context7.sent;

                            item.comments = _.clone(comments);
                            JSManagement.removeJS("ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=" + randomVersionName, 'toDateDashboardCtrl');
                            _context7.next = 18;
                            break;

                        case 14:
                            _context7.prev = 14;
                            _context7.t0 = _context7["catch"](0);

                            JSManagement.removeJS("ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=" + randomVersionName, 'toDateDashboardCtrl');
                            console.error(_context7.t0);

                        case 18:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, _this, [[0, 14]]);
        }));

        return function (_x7) {
            return _ref7.apply(this, arguments);
        };
    }();
    $scope.func.viewForm = function () {
        var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(item) {
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.prev = 0;
                            return _context9.delegateYield(regeneratorRuntime.mark(function _callee8() {
                                var result, id, i;
                                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                    while (1) {
                                        switch (_context8.prev = _context8.next) {
                                            case 0:
                                                _context8.next = 2;
                                                return JSManagement.addJS("ecma5/ExternalLiberary/Dashboard/viewFormDashboardCtrl.js?dev=" + randomVersionName);

                                            case 2:
                                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Dashboard/viewFormDashboardCtrl.js?dev=" + randomVersionName] = 'viewFormDashboardCtrl';
                                                _context8.next = 5;
                                                return $scope.func.getForm(_.clone(item));

                                            case 5:
                                                item = _context8.sent;


                                                if (_.has(item, 'variables')) {

                                                    item.form = _.keyBy(item.form, 'name');
                                                    _.forEach(item.variables, function (property, key) {

                                                        if (_.has(item.form, key) && _.has(item.form[key], 'value') && _.has(item.form[key], 'type') && !_.includes(['simple', 'multiple'], _.has(item.form[key].type))) {
                                                            item.form[key].value = property.value;
                                                        }
                                                    });
                                                    item.form = _.toArray(item.form);
                                                }
                                                _context8.next = 9;
                                                return viewFormDashboardCtrl($uibModal, angular.copy(item));

                                            case 9:
                                                result = _context8.sent;

                                                item.forms[item.name] = _.clone(result.cloneForm);
                                                id = -1;
                                                i = _.findIndex(item.availableTransitions, function (vailableTransition) {
                                                    return vailableTransition.name == result.transition;
                                                });

                                                if (i >= 0) id = item.availableTransitions[i].id;
                                                if (id != null) dashboardService.workflow.setTaskInstanceValues(item.id, result.transition, //name,
                                                {
                                                    formElementsComplex: {
                                                        formElementComplex: result.cloneForm //item.forms

                                                    }
                                                }).then(function (resprocessDefinitionForms) {
                                                    try {
                                                        var index = $scope.data.list.findIndex(function (l) {
                                                            return l.id == result.id;
                                                        });
                                                        $scope.data.list.splice(index, 1);

                                                        _.defer(function () {
                                                            return $scope.$apply();
                                                        });
                                                    } catch (e) {
                                                        console.error(e);
                                                    }
                                                }, function (error) {
                                                    try {
                                                        var index = $scope.data.list.findIndex(function (l) {
                                                            return l.id == result.id;
                                                        });
                                                        $scope.data.list.splice(index, 1);
                                                        _.defer(function () {
                                                            return $scope.$apply();
                                                        });
                                                    } catch (e) {
                                                        console.error(e);
                                                    }
                                                });

                                            case 15:
                                            case "end":
                                                return _context8.stop();
                                        }
                                    }
                                }, _callee8, _this);
                            })(), "t0", 2);

                        case 2:
                            _context9.next = 7;
                            break;

                        case 4:
                            _context9.prev = 4;
                            _context9.t1 = _context9["catch"](0);

                            console.error(_context9.t1);

                        case 7:
                        case "end":
                            return _context9.stop();
                    }
                }
            }, _callee9, _this, [[0, 4]]);
        }));

        return function (_x8) {
            return _ref8.apply(this, arguments);
        };
    }();
    $scope.func.viewStatus = function () {
        var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(item) {
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            if (!(isCookieFunction("Authorization") != null)) {
                                _context10.next = 13;
                                break;
                            }

                            _context10.prev = 1;
                            _context10.next = 4;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Dashboard/viewStatusDashboardCtrl.js?dev=" + randomVersionName);

                        case 4:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Dashboard/viewStatusDashboardCtrl.js?dev=" + randomVersionName] = 'viewStatusDashboardCtrl';
                            viewStatusDashboardCtrl($uibModal, dashboardService, "/KeydocPro/services/rest/workflow/getProcessDefinitionImage?pdId=" + item.processInstance.processDefinition.id + "&node=" + item.token.node + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace("Bearer", "").trim()) + "&date=" + new Date().getTime());
                            _context10.next = 11;
                            break;

                        case 8:
                            _context10.prev = 8;
                            _context10.t0 = _context10["catch"](1);

                            console.error(_context10.t0);

                        case 11:
                            _context10.next = 15;
                            break;

                        case 13:
                            toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                            Authentication.backToLoign();

                        case 15:
                        case "end":
                            return _context10.stop();
                    }
                }
            }, _callee10, _this, [[1, 8]]);
        }));

        return function (_x9) {
            return _ref9.apply(this, arguments);
        };
    }();

    $scope.func.getForm = function (item) {
        return new Promise(function (resolve, reject) {

            if (!_.has($scope.data.item, 'forms')) {
                dashboardService.workflow.processDefinitionForms(item.processInstance.processDefinition.name).then(function (res) {
                    item.forms = angular.copy(res.data.originalElement);
                    item.form = angular.copy(res.data.originalElement[item.name]);
                    item.cloneForm = angular.copy(res.data.originalElement[item.name]);
                    item.buttons = angular.copy(res.data.originalElement[item.name].filter(function (element) {
                        return _.has(element, 'transition') || _.has(element, 'confirmation');
                    }));
                    resolve(item);
                }, function (error) {
                    reject("مشکلی در دریافت فرم ایجاد گردیده است.");
                });
            } else {
                item.form = angular.copy(item.cloneForm);
                resolve(item);
            }
        });
    };

    $scope.func.todo = function () {
        try {
            window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.remove('display');
            window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.remove('display');
            $scope.data.isDownload = true;
            $scope.data.list = null;
            dashboardService.workflow.findUserTaskInstances().then(function () {
                var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(res) {
                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    if (!(_.has(res.data, 'originalElement') && _.isArray(res.data.originalElement) && res.data.originalElement.length > 0)) {
                                        _context11.next = 10;
                                        break;
                                    }

                                    _context11.next = 3;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=" + randomVersionName);

                                case 3:
                                    _.map(res.data.originalElement, function (element) {
                                        return element.created = toDateDashboardCtrl(element.create);
                                    });
                                    $scope.data.list = _.clone(res.data.originalElement);
                                    JSManagement.removeJS("ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=" + randomVersionName, 'toDateDashboardCtrl');
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.add('display');
                                    _context11.next = 11;
                                    break;

                                case 10:
                                    window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.add('display');

                                case 11:
                                    $scope.data.isDownload = false;

                                case 12:
                                case "end":
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, _this);
                }));

                return function (_x10) {
                    return _ref10.apply(this, arguments);
                };
            }(), function (error) {
                return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
            });
        } catch (e) {
            console.error(e);
        }
    };

    $scope.$on('featureReady', function () {
        var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(event, args) {
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            _context12.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context12.next = 6;
                                break;
                            }

                            _context12.next = 4;
                            return FeaturesManagement.getFeatures(dashboardService.auth);

                        case 4:
                            $scope.data.profile = _context12.sent;

                            $scope.func.todo();

                        case 6:
                            _context12.next = 11;
                            break;

                        case 8:
                            _context12.prev = 8;
                            _context12.t0 = _context12["catch"](0);

                            console.error(_context12.t0);

                        case 11:
                        case "end":
                            return _context12.stop();
                    }
                }
            }, _callee12, _this, [[0, 8]]);
        }));

        return function (_x11, _x12) {
            return _ref11.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        try {
                            $(".dashboard .CR div.tabel-body  div.body-view table").getNiceScroll().remove();
                            //TODO clear all interval and timeouts
                            /*window.clearAllTimeouts();*/
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee13$(_context13) {
                                        while (1) {
                                            switch (_context13.prev = _context13.next) {
                                                case 0:
                                                    _context13.prev = 0;
                                                    _context13.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context13.next = 8;
                                                    break;

                                                case 5:
                                                    _context13.prev = 5;
                                                    _context13.t0 = _context13["catch"](0);

                                                    console.error(_context13.t0);

                                                case 8:
                                                case "end":
                                                    return _context13.stop();
                                            }
                                        }
                                    }, _callee13, _this, [[0, 5]]);
                                }));

                                return function (_x13, _x14) {
                                    return _ref13.apply(this, arguments);
                                };
                            }());
                            //TODO  clear all data and functions inside scope
                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case "end":
                        return _context14.stop();
                }
            }
        }, _callee14, _this);
    })));
};

exports.default = workflowPendingTasksController;


workflowPendingTasksController.$inject = ['$scope', '$state', 'dashboardService', 'toaster', '$uibModal', 'Authentication'];