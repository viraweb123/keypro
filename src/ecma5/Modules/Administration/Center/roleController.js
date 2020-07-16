'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var roleController = function roleController($scope, $state, $compile, administrationService, toaster, $uibModal, $upload) {
    var _this = this;

    _classCallCheck(this, roleController);

    $scope.data = {
        removeExternalFuncs: {},
        selectRole: null,
        Roles: null,
        sort: {
            type: null,
            ascDesc: true
        }
    };

    $scope.func = {};

    $scope.func.remove = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(roleKey) {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!_.has($scope.data.Roles, roleKey)) {
                                _context.next = 19;
                                break;
                            }

                            _context.prev = 1;
                            _context.next = 4;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/removeSelectedRole.js?dev=' + randomVersionName);

                        case 4:
                            _context.next = 6;
                            return removeSelectedRole($uibModal, {
                                name: roleKey
                            });

                        case 6:
                            result = _context.sent;

                            if (result) administrationService.auth.deleteRole(roleKey).then(function (res) {
                                $scope.data.Roles[roleKey] = undefined;
                                delete $scope.data.Roles[roleKey];
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                toaster.pop('successs', '', 'نقش مورد نظر با موفقیت حذف گردید.');
                            });
                            _context.next = 10;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeSelectedRole.js?dev=' + randomVersionName, 'removeSelectedRole');

                        case 10:
                            _context.next = 17;
                            break;

                        case 12:
                            _context.prev = 12;
                            _context.t0 = _context['catch'](1);

                            console.error(_context.t0);
                            _context.next = 17;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeSelectedRole.js?dev=' + randomVersionName, 'removeSelectedRole');

                        case 17:
                            _context.next = 20;
                            break;

                        case 19:
                            toaster.pop('error', '', 'نقش مورد نظر در لیست وجود ندارد یا قبلا حذف گردیده است.');

                        case 20:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[1, 12]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();

    $scope.func.edit = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(roleKey) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
                                var result;
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _context2.next = 2;
                                                return JSManagement.addJS('ecma5/ExternalLiberary/Administration/createNewRole.js?dev=' + randomVersionName);

                                            case 2:
                                                _context2.next = 4;
                                                return createNewRole($uibModal, {
                                                    name: roleKey,
                                                    Active: $scope.data.Roles[roleKey].active
                                                }, _.map(_.keys($scope.data.Roles), function (role) {
                                                    return role.toLowerCase();
                                                }) //_.keys($scope.data.Roles)
                                                );

                                            case 4:
                                                result = _context2.sent;
                                                _context2.next = 7;
                                                return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/createNewRole.js?dev=' + randomVersionName, 'createNewRole');

                                            case 7:
                                                administrationService.auth.updateRole(result.role, result.active).then(function (res) {
                                                    $scope.data.Roles[roleKey] = {
                                                        id: result.role,
                                                        active: result.active
                                                    };
                                                    _.defer(function () {
                                                        return $scope.$apply();
                                                    });
                                                }, function (error) {
                                                    return toaster.pop('error', '', 'مشکلی در ویرایش نقش در سرور رخ داده است لطفا مجددا تلاش بفرمایید');
                                                });

                                            case 8:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this);
                            })(), 't0', 2);

                        case 2:
                            _context3.next = 9;
                            break;

                        case 4:
                            _context3.prev = 4;
                            _context3.t1 = _context3['catch'](0);

                            console.error(_context3.t1);
                            _context3.next = 9;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/createNewRole.js?dev=' + randomVersionName, 'createNewRole');

                        case 9:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[0, 4]]);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }();

    $scope.func.add = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        return _context5.delegateYield(regeneratorRuntime.mark(function _callee4() {
                            var result;
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:
                                            _context4.next = 2;
                                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/createNewRole.js?dev=' + randomVersionName);

                                        case 2:
                                            _context4.next = 4;
                                            return createNewRole($uibModal, {
                                                name: null,
                                                id: null,
                                                Active: false
                                            }, _.map(_.keys($scope.data.Roles), function (role) {
                                                return role.toLowerCase();
                                            }) //_.keys($scope.data.Roles)
                                            );

                                        case 4:
                                            result = _context4.sent;
                                            _context4.next = 7;
                                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/createNewRole.js?dev=' + randomVersionName, 'createNewRole');

                                        case 7:
                                            administrationService.auth.createRole(result.role, result.active).then(function (res) {
                                                $scope.data.Roles[result.role] = {
                                                    id: result.role,
                                                    active: result.active
                                                };
                                                $scope.data.selectRole = result.role;
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });
                                            }, function (error) {
                                                return toaster.pop('error', '', 'مشکلی در ویرایش نقش در سرور رخ داده است لطفا مجددا تلاش بفرمایید');
                                            });

                                        case 8:
                                        case 'end':
                                            return _context4.stop();
                                    }
                                }
                            }, _callee4, _this);
                        })(), 't0', 2);

                    case 2:
                        _context5.next = 9;
                        break;

                    case 4:
                        _context5.prev = 4;
                        _context5.t1 = _context5['catch'](0);

                        console.error(_context5.t1);
                        _context5.next = 9;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/createNewRole.js?dev=' + randomVersionName, 'createNewRole');

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, _this, [[0, 4]]);
    }));

    $scope.func.todo = function () {
        try {
            window.document.querySelector('.administration .CR div.tabel-body  div.body-view table').classList.remove('display');
            window.document.querySelector('.administration .CR div.tabel-body  div.body-view div.not-result').classList.remove('display');
            $scope.data.isDownload = true;
            administrationService.auth.getRoles().then(function () {
                var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(res) {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    if (res.data != null && _.isArray(res.data.originalElement)) {
                                        $scope.data.Roles = _.keyBy(_.clone(res.data.originalElement), 'id');
                                        window.document.querySelector('.administration .CR div.tabel-body  div.body-view table').classList.add('display');
                                        /*_.defer(()=>{
                                            $(".administration .CR div.tabel-body  div.body-view table").niceScroll({
                                                cursorcolor:"#ed4356",
                                                cursorwidth: "8px",
                                                cursorborderradius: "0px",
                                                rtlmode: false
                                            });
                                        },100);*/
                                    } else {
                                        window.document.querySelector('.administration .CR div.tabel-body  div.body-view div.not-result').classList.add('display');
                                    }
                                    $scope.data.isDownload = false;
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 3:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, _this);
                }));

                return function (_x3) {
                    return _ref4.apply(this, arguments);
                };
            }(), function (error) {
                return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
            });
        } catch (e) {
            console.error(e);
        }
    };

    $scope.$on('featureReady', function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(event, args) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context7.next = 6;
                                break;
                            }

                            _context7.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context7.sent;

                            //TODO login with server
                            $scope.func.todo();

                        case 6:
                            _context7.next = 11;
                            break;

                        case 8:
                            _context7.prev = 8;
                            _context7.t0 = _context7['catch'](0);

                            console.error(_context7.t0);

                        case 11:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this, [[0, 8]]);
        }));

        return function (_x4, _x5) {
            return _ref5.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        try {

                            /*try{
                                $(".administration .CR div.tabel-body  div.body-view table").getNiceScroll().remove();
                            }catch(error){
                                console.error(error);
                            }*/

                            //TODO clear all interval and timeouts
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                        while (1) {
                                            switch (_context8.prev = _context8.next) {
                                                case 0:
                                                    _context8.prev = 0;
                                                    _context8.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context8.next = 8;
                                                    break;

                                                case 5:
                                                    _context8.prev = 5;
                                                    _context8.t0 = _context8['catch'](0);

                                                    console.error(_context8.t0);

                                                case 8:
                                                case 'end':
                                                    return _context8.stop();
                                            }
                                        }
                                    }, _callee8, _this, [[0, 5]]);
                                }));

                                return function (_x6, _x7) {
                                    return _ref7.apply(this, arguments);
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
                        return _context9.stop();
                }
            }
        }, _callee9, _this);
    })));
};

exports.default = roleController;


roleController.$inject = ['$scope', '$state', '$compile', 'administrationService', 'toaster', '$uibModal', '$upload'];