'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addAccessMetadata = function addAccessMetadata(uibModal, _service, _JS) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Administration/addAccessMetadata.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, service, JS) {

                $scope.data = {
                    metadatas: null,
                    selectMetadata: null,
                    PropertyGroup: null,

                    Roles: null,
                    cloneRole: null,

                    Users: null,
                    cloneUsers: null
                };

                $scope.func = {};

                //TODO metadata functions
                $scope.externalScope = {
                    InitializationForm: null,
                    externalFuncs: {
                        'editMetadataFrom': null,
                        'removeMetadataForm': null
                    },
                    internalFuncs: {
                        'editMetadataFrom': function editMetadataFrom(CloneProperties) {
                            try {
                                var _loop = function _loop(i) {
                                    var name = $scope.data.PropertyGroup.properties[i].name;

                                    switch (CloneProperties[name].objClass) {
                                        case 'com.openkm.bean.form.Input':
                                            if (_.has($scope.data.PropertyGroup.properties[i], 'type')) switch ($scope.data.PropertyGroup.properties[i].type) {
                                                case 'date':
                                                    if (_.isDate(CloneProperties[name].value)) $scope.data.PropertyGroup.properties[i].value = CloneProperties[name].value.toISOString();
                                                    break;
                                                case 'text':
                                                case 'number':
                                                case 'email':
                                                case 'link':
                                                    $scope.data.PropertyGroup.properties[i].value = _.clone(CloneProperties[name].value);
                                                    break;
                                            }
                                            break;
                                        case 'com.openkm.bean.form.Select':
                                            if (_.has($scope.data.PropertyGroup.properties[i], 'type')) {
                                                if (!_.isArray($scope.data.PropertyGroup.properties[i].options)) {
                                                    if ($scope.data.PropertyGroup.properties[i].options != null) $scope.data.PropertyGroup.properties[i].options = [$scope.data.PropertyGroup.properties[i].options];else $scope.data.PropertyGroup.properties[i].options = [];
                                                }

                                                (function () {
                                                    switch ($scope.data.PropertyGroup.properties[i].type) {
                                                        case 'simple':
                                                            _.map($scope.data.PropertyGroup.properties[i].options, function (option) {
                                                                return option.selected = false;
                                                            });
                                                            if (CloneProperties[name].selected != null) {
                                                                var index = _.findIndex($scope.data.PropertyGroup.properties[i].options, function (option) {
                                                                    return option.value == CloneProperties[name].selected.value;
                                                                });
                                                                if (index >= 0) $scope.data.PropertyGroup.properties[i].options[index].selected = true;
                                                            }
                                                            break;
                                                        case 'multiple':
                                                            var selectedValues = _.map(CloneProperties[name].selected, 'value');
                                                            _.map($scope.data.PropertyGroup.properties[i].options, function (option) {
                                                                return option.selected = _.includes(selectedValues, option.value);
                                                            });
                                                            break;
                                                    }
                                                })();
                                            }
                                            break;
                                        case 'com.openkm.bean.form.TextArea':
                                        case 'com.openkm.bean.form.CheckBox':
                                            $scope.data.PropertyGroup.properties[i].value = _.clone(CloneProperties[name].value);
                                            break;
                                    }
                                };

                                for (var i = 0; i < $scope.data.PropertyGroup.properties.length; i++) {
                                    _loop(i);
                                }

                                $scope.func.createQuery();
                            } catch (e) {
                                console.error(e);
                            }
                        },
                        'removeMetadataForm': function () {
                            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                try {

                                                    $scope.data.selectMetadata = null;
                                                    $scope.data.PropertyGroup = null;
                                                    if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(null, {});
                                                    $scope.data.cloneRole = null;
                                                } catch (e) {
                                                    console.error(e);
                                                }

                                            case 1:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            function removeMetadataForm() {
                                return _ref.apply(this, arguments);
                            }

                            return removeMetadataForm;
                        }()
                    }
                };

                $scope.func.getMetadataList = function () {
                    return new Promise(function (resolve, reject) {
                        if ($scope.data.metadatas != null) resolve($scope.data.metadatas);else {
                            service.propertyGroup.list().then(function (pgres) {
                                if (pgres.data != null) {
                                    $scope.data.metadatas = _.clone(pgres.data);
                                    resolve($scope.data.metadatas);
                                }
                            }, function (error) {
                                return reject(error);
                            });
                        }
                    });
                };
                $scope.func.changeMetaData = function () {
                    try {

                        $scope.data.PropertyGroup = null;

                        $scope.data.cloneRole = null;
                        $scope.data.cloneUsers = null;

                        if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(null, {});

                        if ($scope.data.selectMetadata != null) {
                            service.propertyGroup.form($scope.data.selectMetadata).then(function () {
                                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(res) {
                                    var index;
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    $scope.data.PropertyGroup = _.clone(res.data);

                                                    index = _.findIndex($scope.data.PropertyGroup.properties, function (property) {
                                                        return property.name == $scope.data.PropertyGroup.name + '.pggrpname';
                                                    });

                                                    if (index >= 0) {
                                                        $scope.data.PropertyGroup.properties[index].value = angular.copy($scope.data.PropertyGroup.name);
                                                        $scope.data.PropertyGroup.properties[index].readonly = true;
                                                    }

                                                    _context2.next = 5;
                                                    return $scope.func.getRoles();

                                                case 5:
                                                    $scope.data.cloneRole = _context2.sent;
                                                    _context2.next = 8;
                                                    return $scope.func.getUsers();

                                                case 8:
                                                    $scope.data.cloneUsers = _context2.sent;

                                                    if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(angular.copy($scope.data.PropertyGroup.properties), { service: service, require: false });
                                                    _.defer(function () {
                                                        return $scope.$apply();
                                                    });

                                                case 11:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, _this);
                                }));

                                return function (_x) {
                                    return _ref2.apply(this, arguments);
                                };
                            }(), function (error) {
                                return toaster.pop('error', '', 'عدم دریافت مشخصات فراداده.');
                            });
                        } else {
                            $scope.externalScope.internalFuncs.removeMetadataForm();
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.getUsers = function () {
                    return new Promise(function (resolve, reject) {
                        if ($scope.data.Users != null) resolve(angular.copy($scope.data.Users));else {
                            service.auth.getUsers().then(function (res) {
                                try {

                                    if (_.isArray(res.data.list)) {
                                        $scope.data.Users = _.clone(_.keyBy(_.map(res.data.list, function (i) {
                                            var r = { securityArray: [0, 0, 0, 0], clonePermissions: 0, user: i, permissions: 0, recursive: 0, isEdit: false };return r;
                                        }), function (j) {
                                            return j.user;
                                        }));
                                        resolve(angular.copy($scope.data.Users));
                                    } else resolve(null);
                                } catch (e) {
                                    console.error(e);
                                    reject(null);
                                }
                            }, function (error) {
                                console.error(error);
                                reject(null);
                            });
                        }
                    });
                };
                $scope.func.changeUserPermission = function (user) {
                    try {
                        $scope.data.cloneUsers[user].permissions = _.sum(_.map($scope.data.cloneUsers[user].securityArray, function (i, j) {
                            return i * Math.pow(2, 3 - j);
                        }));
                        $scope.data.cloneUsers[user].isEdit = $scope.data.cloneUsers[user].permissions != $scope.data.cloneUsers[user].clonePermissions;
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.getRoles = function () {
                    return new Promise(function (resolve, reject) {
                        if ($scope.data.Roles != null) resolve(angular.copy($scope.data.Roles));else {
                            service.auth.getRoles().then(function (res) {
                                try {
                                    if (_.isArray(res.data)) {
                                        $scope.data.Roles = _.clone(_.keyBy(_.map(_.filter(res.data, function (rr) {
                                            return rr.active;
                                        }), function (i) {
                                            var r = { securityArray: [0, 0, 0, 0], clonePermissions: 0, role: i, permissions: 0, isEdit: false };return r;
                                        }), function (j) {
                                            return j.role.id;
                                        }));
                                        resolve(angular.copy($scope.data.Roles));
                                    } else {
                                        resolve(null);
                                    }
                                } catch (e) {
                                    console.error(e);
                                    reject(null);
                                }
                            }, function (error) {
                                console.error(error);
                                reject(null);
                            });
                        }
                    });
                };
                $scope.func.changePermission = function (role) {
                    try {
                        $scope.data.cloneRole[role].permissions = _.sum(_.map($scope.data.cloneRole[role].securityArray, function (i, j) {
                            return i * Math.pow(2, 3 - j);
                        }));
                        $scope.data.cloneRole[role].isEdit = $scope.data.cloneRole[role].permissions != $scope.data.cloneRole[role].clonePermissions;
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.func.save = function () {
                    try {
                        if ($scope.data.PropertyGroup == null) throw new Error('لطفا یک فراداده انتخاب کنید.');
                        if (_.filter($scope.data.cloneRole, function (value, role) {
                            return value.isEdit;
                        }).length == 0 && _.filter($scope.data.cloneUsers, function (value, role) {
                            return value.isEdit;
                        }).length == 0) throw new Error('لطفا حداقل یک نقش یا یک کاربر را انتخاب کنید.');
                        $scope.externalScope.externalFuncs.editMetadataFrom();
                    } catch (e) {
                        toaster.pop('error', '', e || e.message);
                    }
                };

                $scope.func.getPermisionArray = function (permision) {
                    var newPermision = [0, 0, 0, 0];
                    var per = _.map(permision.toString(2).split(''), function (i) {
                        return parseInt(i);
                    });
                    newPermision.splice(0, per.length);
                    return newPermision.concat(per);
                };

                $scope.func.createQuery = function () {

                    var query = "";
                    var result = {};
                    var maxLen = 12;
                    var propertyNumber = 1;
                    _.forEach($scope.data.PropertyGroup.properties, function (property) {
                        if (maxLen == 0) {
                            toaster.pop('error', '', 'لطفا حداکثر ۱۲ فیلد از فراداده ها پر کنید');
                            return;
                        }
                        if (property.value && !_.includes([null, undefined, "", ''], property.value)) {
                            maxLen--;
                            query += 'property=' + property.name + '=' + property.value + '=' + property.label + '&';
                            result['property' + propertyNumber++] = [property.name, property.value, property.label];
                        } else if (_.has(property, 'options')) _.forEach(property.options, function (_option) {
                            if (_option.selected) {
                                query += 'property=' + property.name + '=' + _option.value + '=' + property.label + ':' + _option.label + '&';
                                result['property' + propertyNumber++] = [property.name, property.label, _option.value];
                                maxLen--;
                            }
                        });
                    });
                    if (maxLen == 12) {
                        toaster.pop('error', '', 'لطفا حداقل یک  فیلد از فراداده ها پر کنید');
                        return;
                    }

                    while (propertyNumber <= 12) {
                        result['property' + propertyNumber++] = [];
                    }query += 'propertyGroup=' + $scope.data.PropertyGroup.name + '&';
                    result['groupName'] = $scope.data.PropertyGroup.label;

                    result['Roles'] = [];
                    _.forEach(_.filter($scope.data.cloneRole, function (value, role) {
                        return value.isEdit;
                    }), function (r) {
                        query += 'role=' + r.role.id + '=' + r.permissions + '&';
                        result['Roles'].push([r.role.id, $scope.func.getPermisionArray(r.permissions)]);
                    });

                    result['Users'] = [];
                    _.forEach(_.filter($scope.data.cloneUsers, function (value, role) {
                        return value.isEdit;
                    }), function (u) {
                        query += 'user=' + u.user + '=' + u.permissions + '&';
                        result['Users'].push([u.user, $scope.func.getPermisionArray(u.permissions)]);
                    });
                    if (query.endsWith("&")) query = query.slice(0, query.length - 1);

                    service.auth.addGrantRevokeRoleForProps(query).then(function (res) {
                        result.id = res.data.data;
                        $uibModalInstance.close(result);
                    }, function (error) {
                        toaster.pop('error', '', 'مشکلی در ارتباط با سرور پیش آمده است.');
                        $uibModalInstance.close(false);
                    });
                };

                $scope.$on("$destroy", function () {
                    try {

                        try {
                            $(".modal-body form").getNiceScroll().remove();
                        } catch (error) {
                            console.error(error);
                        }

                        // clear all data and functions
                        $scope.func = undefined;
                        $scope.data = undefined;
                    } catch (e) {
                        console.error(e);
                    }
                });
            },
            size: 'lg',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                service: function service() {
                    return _service;
                },
                JS: function JS() {
                    return _JS;
                }
            }
        });

        modalInstance.result.then(function (response) {
            if (response) {
                resolve(response);
            } else reject('عدم ایجاد دسترسی جدید');
        }, function (error) {
            return reject('عدم ایجاد دسترسی جدید');
        });
    });
};