'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var updateSecurityRolesFunc = function updateSecurityRolesFunc(uibModal, _Roles, _service, uuid) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Desktop/updateSecurityRoles.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, Roles, service) {

                $scope.data = {
                    Roles: {}
                };

                $scope.func = {};
                $scope.func.update = function () {
                    var editRoles = _.filter($scope.data.Roles, function (role) {
                        return role.isEdit;
                    });
                    if (editRoles.length == 0) toaster.pop('error', '', 'لطفا حداقل یک مورد را ویرایش کنید');else {
                        $uibModalInstance.close(_.keyBy(editRoles, function (role) {
                            return role.role.id;
                        }));
                    }
                };
                $scope.func.cancel = function () {
                    $scope.data = undefined;
                    $uibModalInstance.close(false);
                };
                $scope.func.changePermission = function (role) {
                    try {
                        $scope.data.Roles[role].permissions = _.sum(_.map($scope.data.Roles[role].securityArray, function (i, j) {
                            return i * Math.pow(2, 3 - j);
                        }));
                        $scope.data.Roles[role].isEdit = $scope.data.Roles[role].permissions != $scope.data.Roles[role].clonePermissions;
                    } catch (e) {
                        console.error(e);
                    }
                };
                $scope.func.run = function () {
                    service.auth.getRoles().then(function (res) {
                        try {
                            if (_.has(res, 'data') && _.isArray(res.data)) var roleList = _.clone(_.keyBy(_.map(_.filter(res.data, function (rr) {
                                return rr.active;
                            }), function (i) {
                                var r = {
                                    securityArray: [0, 0, 0, 0],
                                    clonePermissions: 0,
                                    role: i,
                                    permissions: 0,
                                    recursive: false,
                                    isEdit: false
                                };
                                return r;
                            }), function (j) {
                                return j.role.id;
                            }));
                            if (_.isArray(Roles)) {
                                var tempRoles = angular.copy(Roles);
                                _.map(tempRoles, function (role) {
                                    role.role = {
                                        active: true,
                                        id: role.role
                                    };
                                    return role;
                                });
                                var sendList = _.clone(_.keyBy(_.map(tempRoles, function (k) {
                                    k.clonePermissions = _.clone(k.permissions);
                                    k.recursive = false;
                                    k.isEdit = false;
                                    return k;
                                }), function (j) {
                                    return j.role.id;
                                }));
                            }
                            $scope.data.Roles = _.clone(_.merge(roleList, sendList));
                            roleList = undefined;
                            sendList = undefined;
                        } catch (e) {
                            console.error(e);
                        }
                    }, function (error) {});
                };
                // run block
                {
                    $scope.func.run();
                }
            },
            size: 'md',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                Roles: function Roles() {
                    return _Roles;
                },
                service: function service() {
                    return _service;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) {
                _.forEach(response, function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(value, role) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.next = 2;
                                        return _service.auth.grantRevokeRole(uuid, role, value.permissions, value.recursive);

                                    case 2:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this);
                    }));

                    return function (_x, _x2) {
                        return _ref.apply(this, arguments);
                    };
                }());
                resolve(true);
            } else reject(false);
        }, function (error) {
            return reject(false);
        });
    });
};