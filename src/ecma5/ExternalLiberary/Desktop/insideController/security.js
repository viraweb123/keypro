'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addSecuritySection2DesktopCtrl = function addSecuritySection2DesktopCtrl($scope, desktopService, JSManagement, toaster, $uibModal) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.data.security = {
                Roles: null,
                Users: null
            };

            $scope.func.updateUsers = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var isRun;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash")) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.next = 4;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                            case 4:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';
                                isRun = getPermisionArray($scope.data.selectedFileOrFolder.permissions);

                                if (!isRun[0]) {
                                    _context.next = 17;
                                    break;
                                }

                                _context.next = 9;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/updateSecurityUsersFunc.js?dev=' + randomVersionName);

                            case 9:
                                _context.next = 11;
                                return updateSecurityUsersFunc($uibModal, $scope.data.security.Users, desktopService, $scope.data.selectedFileOrFolder.uuid);

                            case 11:
                                _context.next = 13;
                                return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/updateSecurityUsersFunc.js?dev=' + randomVersionName, 'updateSecurityUsersFunc');

                            case 13:
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                $scope.func.zone.securityVisible();

                                _context.next = 18;
                                break;

                            case 17:
                                toaster.pop('error', "شما مجوز ویرایش دسترسی کاربران به این سند را ندارید.");

                            case 18:
                                _context.next = 23;
                                break;

                            case 20:
                                _context.prev = 20;
                                _context.t0 = _context['catch'](0);

                                console.error(_context.t0);

                            case 23:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 20]]);
            }));
            $scope.func.updateRoles = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var isRun;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                if (!($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash")) {
                                    _context2.next = 18;
                                    break;
                                }

                                _context2.next = 4;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                            case 4:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';
                                isRun = getPermisionArray($scope.data.selectedFileOrFolder.permissions);

                                if (!isRun[0]) {
                                    _context2.next = 17;
                                    break;
                                }

                                _context2.next = 9;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/updateSecurityRolesFunc.js?dev=' + randomVersionName);

                            case 9:
                                _context2.next = 11;
                                return updateSecurityRolesFunc($uibModal, $scope.data.security.Roles, desktopService, $scope.data.selectedFileOrFolder.uuid);

                            case 11:
                                _context2.next = 13;
                                return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/updateSecurityRolesFunc.js?dev=' + randomVersionName, 'updateSecurityRolesFunc');

                            case 13:
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                $scope.func.zone.securityVisible();
                                _context2.next = 18;
                                break;

                            case 17:
                                toaster.pop('error', "شما مجوز ویرایش قوانین این سند را ندارید.");

                            case 18:
                                _context2.next = 23;
                                break;

                            case 20:
                                _context2.prev = 20;
                                _context2.t0 = _context2['catch'](0);

                                console.error(_context2.t0);

                            case 23:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[0, 20]]);
            }));
            $scope.func.runSecurity = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                try {
                                    if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash") {
                                        desktopService.auth.listRole($scope.data.selectedFileOrFolder.uuid).then(function () {
                                            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(res) {
                                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                    while (1) {
                                                        switch (_context3.prev = _context3.next) {
                                                            case 0:
                                                                if (!(res.data != null && _.isArray(res.data))) {
                                                                    _context3.next = 9;
                                                                    break;
                                                                }

                                                                _context3.next = 3;
                                                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                                                            case 3:
                                                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';
                                                                _.forEach(res.data, function (v) {
                                                                    return v.securityArray = getPermisionArray(v.permissions);
                                                                });
                                                                $scope.data.security.Roles = _.clone(res.data);
                                                                _.remove($scope.data.security.Roles, function (role) {
                                                                    return role.permissions == 0;
                                                                });
                                                                _context3.next = 10;
                                                                break;

                                                            case 9:
                                                                $scope.data.security.Roles = null;

                                                            case 10:
                                                                _.defer(function () {
                                                                    return $scope.$apply();
                                                                });

                                                            case 11:
                                                            case 'end':
                                                                return _context3.stop();
                                                        }
                                                    }
                                                }, _callee3, _this);
                                            }));

                                            return function (_x) {
                                                return _ref4.apply(this, arguments);
                                            };
                                        }(), function (error) {
                                            return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                        });
                                        desktopService.auth.listUser($scope.data.selectedFileOrFolder.uuid).then(function () {
                                            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(res) {
                                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                    while (1) {
                                                        switch (_context4.prev = _context4.next) {
                                                            case 0:
                                                                if (!(res.data != null && _.isArray(res.data))) {
                                                                    _context4.next = 9;
                                                                    break;
                                                                }

                                                                _context4.next = 3;
                                                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                                                            case 3:
                                                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';
                                                                _.forEach(res.data, function (v) {
                                                                    return v.securityArray = getPermisionArray(v.permissions);
                                                                });
                                                                $scope.data.security.Users = _.clone(res.data);
                                                                _.remove($scope.data.security.Users, function (role) {
                                                                    return role.permissions == 0;
                                                                });
                                                                _context4.next = 10;
                                                                break;

                                                            case 9:
                                                                $scope.data.security.Users = null;

                                                            case 10:
                                                                _.defer(function () {
                                                                    return $scope.$apply();
                                                                });

                                                            case 11:
                                                            case 'end':
                                                                return _context4.stop();
                                                        }
                                                    }
                                                }, _callee4, _this);
                                            }));

                                            return function (_x2) {
                                                return _ref5.apply(this, arguments);
                                            };
                                        }(), function (error) {
                                            return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                        });
                                    }
                                } catch (e) {
                                    console.error(e);
                                }

                            case 1:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};