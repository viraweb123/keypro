'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var categoriManagementController = function categoriManagementController($scope, $state, $compile, $uibModal, administrationService, toaster, $translate) {
    var _this = this;

    _classCallCheck(this, categoriManagementController);

    $scope.data = {
        profile: null,
        removeExternalFuncs: {},

        trees: {
            categoryVisible: null,
            categoryTree: {},
            category: {
                index: 1,
                list: {
                    cteateFolder: {
                        title: $translate.instant('angularTreeView.createNewFolder'),
                        rootAccess: false,
                        readOnly: true,
                        icon: 'fa fa-folder fa-flip-horizontal',
                        func: function func(currentNode) {
                            return $scope.func.runSelectTreeFunction('createFolder', currentNode, "categoryVisible", "category");
                        }
                    },
                    renameFolder: {
                        title: $translate.instant('angularTreeView.rename'),
                        rootAccess: true,
                        readOnly: true,
                        icon: 'fa fa-i-cursor',
                        func: function func(currentNode) {
                            return $scope.func.runSelectTreeFunction('renameFolder', currentNode, "categoryVisible", "category");
                        }
                    },
                    cutFolder: {
                        title: $translate.instant('angularTreeView.transfer'),
                        icon: 'fa fa-scissors',
                        rootAccess: true,
                        readOnly: true,
                        func: function func(currentNode) {
                            return $scope.func.runSelectTreeFunction('cutFolder', currentNode, "categoryVisible", "category", 'getCategoriesFolder');
                        }
                    },
                    deleteFolder: {
                        title: $translate.instant('angularTreeView.delete'),
                        rootAccess: true,
                        readOnly: true,
                        icon: 'fa fa-trash',
                        func: function func(currentNode) {
                            return $scope.func.runSelectTreeFunction('deleteFolder', currentNode, "categoryVisible", "category");
                        }
                    }
                },
                uuid: null,
                currentNodeCount: -1,
                changeCurrentNode: function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(node, collapsed, viewDoc) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.prev = 0;

                                        $scope.func.changeCurrentNodeCategory(node, collapsed, viewDoc);
                                        _context.next = 22;
                                        break;

                                    case 4:
                                        _context.prev = 4;
                                        _context.t0 = _context['catch'](0);

                                        console.error(_context.t0);
                                        _context.prev = 7;
                                        _context.next = 10;
                                        return JSManagement.addJS('ecma5/ExternalLiberary/Administration/insideController/functions/changeCurrentNodeCategory.js?dev=' + randomVersionName);

                                    case 10:
                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Administration/insideController/functions/changeCurrentNodeCategory.js?dev=' + randomVersionName] = 'changeCurrentNodeCategoryAdminCtrl';
                                        _context.next = 13;
                                        return changeCurrentNodeCategoryAdminCtrl($scope, administrationService, JSManagement, CSSManagement, toaster, $uibModal);

                                    case 13:
                                        $scope.func.changeCurrentNodeCategory(node, collapsed, viewDoc);
                                        _context.next = 19;
                                        break;

                                    case 16:
                                        _context.prev = 16;
                                        _context.t1 = _context['catch'](7);

                                        console.error(_context.t1);

                                    case 19:
                                        _context.prev = 19;

                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        return _context.finish(19);

                                    case 22:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this, [[0, 4], [7, 16, 19, 22]]);
                    }));

                    function changeCurrentNode(_x, _x2, _x3) {
                        return _ref.apply(this, arguments);
                    }

                    return changeCurrentNode;
                }()
            }
        },

        pointers: {
            "categoryVisible": {}
        },
        nodesFolder: {}

    };

    $scope.func = {};
    $scope.func.runSelectTreeFunction = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(func, currentNode, pointerType, treeType, rootPath) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            $scope.func[func](currentNode, pointerType, treeType, rootPath);
                            _context2.next = 22;
                            break;

                        case 4:
                            _context2.prev = 4;
                            _context2.t0 = _context2['catch'](0);

                            console.error(_context2.t0);
                            _context2.prev = 7;
                            _context2.next = 10;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/insideController/functions/' + func + '.js?dev=' + randomVersionName);

                        case 10:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Administration/insideController/functions/' + func + '.js?dev=' + randomVersionName] = func + 'AdminCtrl';
                            _context2.next = 13;
                            return window[func + 'AdminCtrl']($scope, administrationService, JSManagement, CSSManagement, toaster, $uibModal);

                        case 13:
                            $scope.func[func](currentNode, pointerType, treeType, rootPath);
                            _context2.next = 19;
                            break;

                        case 16:
                            _context2.prev = 16;
                            _context2.t1 = _context2['catch'](7);

                            console.error(_context2.t1);

                        case 19:
                            _context2.prev = 19;

                            _.defer(function () {
                                return $scope.$apply();
                            });
                            return _context2.finish(19);

                        case 22:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[0, 4], [7, 16, 19, 22]]);
        }));

        return function (_x4, _x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
        };
    }();

    $scope.func.refreshCategory = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {
                            $scope.data.trees.categoryVisible = undefined;
                            $scope.data.pointers.categoryVisible = undefined;
                            $scope.data.pointers.categoryVisible = {};
                            administrationService.repository.getRoot('getCategoriesFolder').then(function (result) {
                                result.data[0].type = "FOLDER";
                                result.data[0].group = "category";
                                $scope.data.trees.categoryVisible = _.clone(result.data);
                                $scope.data.pointers.categoryVisible[result.data[0].id] = $scope.data.trees.categoryVisible[0];
                                $scope.data.nodesFolder[result.data[0].path] = $scope.data.trees.categoryVisible[0];
                            }, function (error) {
                                return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز ریشه');
                            });
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this);
    }));

    $scope.$on('featureReady', function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(event, args) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context4.next = 6;
                                break;
                            }

                            _context4.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context4.sent;

                            //TODO after login with server and receive profiles
                            $scope.func.refreshCategory();

                        case 6:
                            _context4.next = 11;
                            break;

                        case 8:
                            _context4.prev = 8;
                            _context4.t0 = _context4['catch'](0);

                            console.error(_context4.t0);

                        case 11:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[0, 8]]);
        }));

        return function (_x9, _x10) {
            return _ref4.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {
                            //TODO clear all interval and timeouts
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    _context5.prev = 0;
                                                    _context5.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context5.next = 8;
                                                    break;

                                                case 5:
                                                    _context5.prev = 5;
                                                    _context5.t0 = _context5['catch'](0);

                                                    console.error(_context5.t0);

                                                case 8:
                                                case 'end':
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _callee5, _this, [[0, 5]]);
                                }));

                                return function (_x11, _x12) {
                                    return _ref6.apply(this, arguments);
                                };
                            }());
                            //TODO  clear all data and functions inside scope
                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, _this);
    })));
};

exports.default = categoriManagementController;


categoriManagementController.$inject = ['$scope', '$state', '$compile', '$uibModal', 'administrationService', 'toaster', '$translate'];