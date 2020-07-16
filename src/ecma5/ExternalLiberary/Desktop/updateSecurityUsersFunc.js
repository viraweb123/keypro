'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var updateSecurityUsersFunc = function updateSecurityUsersFunc(uibModal, _Users, _service, uuid) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Desktop/updateSecurityUsers.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, Users, service) {

                $scope.data = {
                    Users: {}
                };

                $scope.func = {};
                $scope.func.update = function () {
                    var editUsers = _.filter($scope.data.Users, function (user) {
                        return user.isEdit;
                    });
                    if (editUsers.length == 0) toaster.pop('error', '', 'لطفا حداقل یک مورد را ویرایش کنید');else $uibModalInstance.close(_.keyBy(editUsers, 'user'));
                };
                $scope.func.cancel = function () {
                    $scope.data = undefined;
                    $uibModalInstance.close(false);
                };
                $scope.func.changePermission = function (user) {
                    try {
                        $scope.data.Users[user].permissions = _.sum(_.map($scope.data.Users[user].securityArray, function (i, j) {
                            return i * Math.pow(2, 3 - j);
                        }));
                        $scope.data.Users[user].isEdit = $scope.data.Users[user].permissions != $scope.data.Users[user].clonePermissions;
                    } catch (e) {
                        console.error(e);
                    }
                };
                $scope.func.run = function () {
                    service.auth.getUsers().then(function (res) {
                        try {

                            if (_.isArray(res.data.list)) var userList = _.clone(_.keyBy(_.map(res.data.list, function (i) {
                                var r = { securityArray: [0, 0, 0, 0], clonePermissions: 0, user: i, permissions: 0, recursive: false, isEdit: false };return r;
                            }), function (j) {
                                return j.user;
                            }));
                            if (_.isArray(Users)) var sendList = _.clone(_.keyBy(_.map(Users, function (k) {
                                k.clonePermissions = _.clone(k.permissions);k.recursive = false;return k;
                            }), function (j) {
                                return j.user;
                            }));
                            $scope.data.Users = _.clone(_.merge(userList, sendList));
                            userList = undefined;
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
                Users: function Users() {
                    return _Users;
                },
                service: function service() {
                    return _service;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) {
                _.forEach(response, function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(value, user) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.next = 2;
                                        return _service.auth.grantRevokeUser(uuid, user, value.permissions, value.recursive);

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