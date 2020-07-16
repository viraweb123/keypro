'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CurrentUserInfoSrvc = require('./../../Class/Service/CurrentUserInfoSrvc');

var _CurrentUserInfoSrvc2 = _interopRequireDefault(_CurrentUserInfoSrvc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DesktopController = function DesktopController($scope, $rootScope, desktopService, toaster, $state, $translate, $sce, $window, $timeout, Authentication, $uibModal, $compile) {
    var _this = this;

    _classCallCheck(this, DesktopController);

    $scope.externalScope = {
        InitializationForm: null,
        externalFuncs: {
            'editMetadataFrom': null,
            'removeMetadataForm': null
        },
        internalFuncs: {
            'editMetadataFrom': function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(CloneProperties) {
                    var _loop, i, properties;

                    return regeneratorRuntime.wrap(function _callee$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _loop = regeneratorRuntime.mark(function _loop(i) {
                                        var name;
                                        return regeneratorRuntime.wrap(function _loop$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        name = $scope.data.PropertyGroup.properties[i].name;
                                                        _context.t0 = CloneProperties[name].objClass;
                                                        _context.next = _context.t0 === 'com.openkm.bean.form.Input' ? 4 : _context.t0 === 'com.openkm.bean.form.Select' ? 29 : _context.t0 === 'com.openkm.bean.form.TextArea' ? 31 : _context.t0 === 'com.openkm.bean.form.CheckBox' ? 31 : 33;
                                                        break;

                                                    case 4:
                                                        if (!_.has($scope.data.PropertyGroup.properties[i], 'type')) {
                                                            _context.next = 28;
                                                            break;
                                                        }

                                                        _context.t1 = $scope.data.PropertyGroup.properties[i].type;
                                                        _context.next = _context.t1 === 'date' ? 8 : _context.t1 === 'text' ? 26 : _context.t1 === 'number' ? 26 : _context.t1 === 'email' ? 26 : _context.t1 === 'link' ? 26 : 28;
                                                        break;

                                                    case 8:
                                                        if (!_.isDate(CloneProperties[name].value)) {
                                                            _context.next = 25;
                                                            break;
                                                        }

                                                        _context.prev = 9;
                                                        _context.next = 12;
                                                        return JSManagement.addJS('ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName);

                                                    case 12:
                                                        _context.next = 14;
                                                        return dateFormatInternal(CloneProperties[name].value);

                                                    case 14:
                                                        $scope.data.PropertyGroup.properties[i].value = _context.sent;
                                                        _context.next = 21;
                                                        break;

                                                    case 17:
                                                        _context.prev = 17;
                                                        _context.t2 = _context['catch'](9);

                                                        console.error(_context.t2);
                                                        $scope.data.PropertyGroup.properties[i].value = CloneProperties[name].value.toISOString();

                                                    case 21:
                                                        _context.prev = 21;
                                                        _context.next = 24;
                                                        return JSManagement.removeJS('ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName, 'dateFormatInternal');

                                                    case 24:
                                                        return _context.finish(21);

                                                    case 25:
                                                        return _context.abrupt('break', 28);

                                                    case 26:
                                                        $scope.data.PropertyGroup.properties[i].value = _.clone(CloneProperties[name].value);
                                                        return _context.abrupt('break', 28);

                                                    case 28:
                                                        return _context.abrupt('break', 33);

                                                    case 29:
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

                                                        return _context.abrupt('break', 33);

                                                    case 31:
                                                        $scope.data.PropertyGroup.properties[i].value = _.clone(CloneProperties[name].value);
                                                        return _context.abrupt('break', 33);

                                                    case 33:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _loop, _this, [[9, 17, 21, 25]]);
                                    });
                                    i = 0;

                                case 3:
                                    if (!(i < $scope.data.PropertyGroup.properties.length)) {
                                        _context2.next = 8;
                                        break;
                                    }

                                    return _context2.delegateYield(_loop(i), 't0', 5);

                                case 5:
                                    i++;
                                    _context2.next = 3;
                                    break;

                                case 8:
                                    properties = angular.copy($scope.data.PropertyGroup.properties);

                                    _.forEach(properties, function (property) {
                                        if (property.objClass == "com.openkm.bean.form.Select" && _.has(property, 'options') && _.isArray(property.options) && property.options.length == 1) property.options = property.options[0];
                                    });

                                    desktopService.propertyGroup.formElement($scope.data.selectedFileOrFolder.uuid, $scope.data.PropertyGroup.name, {
                                        formElementsComplex: {
                                            formElementComplex: [properties]
                                        }
                                    }).then(function (res) {
                                        toaster.pop('success', '', 'فراداده با موفقیت ویرایش گردید');

                                        if (_.isFunction($scope.externalScope.InitializationForm)) {
                                            $scope.data.PropertyGroup = null;
                                            $scope.externalScope.InitializationForm(angular.copy($scope.data.PropertyGroup), {});
                                            desktopService.propertyGroup.getGroups($scope.data.selectedFileOrFolder.path, $scope.data.selectMetadata).then(function (resIn) {
                                                resIn.data.isMetaData = true;
                                                resIn.data.type = 'FOLDER';
                                                $scope.data.PropertyGroup = angular.copy(resIn.data);
                                                if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(angular.copy($scope.data.PropertyGroup.properties), {
                                                    service: desktopService,
                                                    require: true
                                                });
                                            }, function (error) {
                                                return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                            });
                                        }
                                    }, function (error) {
                                        return toaster.pop('error', '', 'عدم ذخیره موفق داده');
                                    });

                                    _context2.next = 16;
                                    break;

                                case 13:
                                    _context2.prev = 13;
                                    _context2.t1 = _context2['catch'](0);

                                    console.error(_context2.t1);

                                case 16:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee, _this, [[0, 13]]);
                }));

                function editMetadataFrom(_x) {
                    return _ref.apply(this, arguments);
                }

                return editMetadataFrom;
            }(),
            'removeMetadataForm': function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;

                                    if (!($scope.data.selectedFileOrFolder != null && $scope.data.PropertyGroup != null && $scope.data.selectedFileOrFolder.group != "trash")) {
                                        _context3.next = 8;
                                        break;
                                    }

                                    _context3.next = 4;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/deleteRequest.js?dev=' + randomVersionName);

                                case 4:
                                    _context3.next = 6;
                                    return deleteRequestCtrl($uibModal);

                                case 6:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/deleteRequest.js?dev=' + randomVersionName] = 'deleteRequestCtrl';
                                    desktopService.propertyGroup.remove($scope.data.selectedFileOrFolder.path, $scope.data.PropertyGroup.name).then(function (res) {
                                        $scope.data.PropertyGroup = null;
                                        if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(null, {});

                                        $scope.data.selectMetadata = null;
                                        toaster.pop('success', '', 'فراداده با موفقیت حذف گردید');
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    }, function (error) {
                                        return toaster.pop('error', '', 'عدم حذف موفق فراداده');
                                    });

                                case 8:
                                    _context3.next = 13;
                                    break;

                                case 10:
                                    _context3.prev = 10;
                                    _context3.t0 = _context3['catch'](0);

                                    console.error(_context3.t0);

                                case 13:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee2, _this, [[0, 10]]);
                }));

                function removeMetadataForm() {
                    return _ref2.apply(this, arguments);
                }

                return removeMetadataForm;
            }()
        }
    };
    $scope.externalScopeParent = {
        InitializationForm: null,
        externalFuncs: {
            'editMetadataFrom': null,
            'removeMetadataForm': null
        },
        internalFuncs: {
            'editMetadataFrom': function editMetadataFrom(CloneProperties) {
                try {
                    var _loop2 = function _loop2(i) {
                        var name = $scope.data.PropertyGroupParent.properties[i].name;

                        switch (CloneProperties[name].objClass) {
                            case 'com.openkm.bean.form.Input':
                                if (_.has($scope.data.PropertyGroupParent.properties[i], 'type')) switch ($scope.data.PropertyGroupParent.properties[i].type) {
                                    case 'date':
                                        if (_.isDate(CloneProperties[name].value)) $scope.data.PropertyGroupParent.properties[i].value = CloneProperties[name].value.toISOString();
                                        break;
                                    case 'text':
                                    case 'number':
                                    case 'email':
                                    case 'link':
                                        $scope.data.PropertyGroupParent.properties[i].value = _.clone(CloneProperties[name].value);
                                        break;
                                }
                                break;
                            case 'com.openkm.bean.form.Select':
                                if (_.has($scope.data.PropertyGroupParent.properties[i], 'type')) {

                                    if (!_.isArray($scope.data.PropertyGroupParent.properties[i].options)) {
                                        if ($scope.data.PropertyGroupParent.properties[i].options != null) $scope.data.PropertyGroupParent.properties[i].options = [$scope.data.PropertyGroupParent.properties[i].options];else $scope.data.PropertyGroupParent.properties[i].options = [];
                                    }

                                    (function () {
                                        switch ($scope.data.PropertyGroupParent.properties[i].type) {
                                            case 'simple':
                                                _.map($scope.data.PropertyGroupParent.properties[i].options, function (option) {
                                                    return option.selected = false;
                                                });
                                                if (CloneProperties[name].selected != null) {
                                                    var index = _.findIndex($scope.data.PropertyGroupParent.properties[i].options, function (option) {
                                                        return option.value == CloneProperties[name].selected.value;
                                                    });
                                                    if (index >= 0) $scope.data.PropertyGroupParent.properties[i].options[index].selected = true;
                                                }
                                                break;
                                            case 'multiple':
                                                var selectedValues = _.map(CloneProperties[name].selected, 'value');
                                                _.map($scope.data.PropertyGroupParent.properties[i].options, function (option) {
                                                    return option.selected = _.includes(selectedValues, option.value);
                                                });
                                                break;
                                        }
                                    })();
                                }
                                if (_.isArray($scope.data.PropertyGroupParent.properties[i].options) && $scope.data.PropertyGroupParent.properties[i].options.length == 1) $scope.data.PropertyGroupParent.properties[i].options = $scope.data.PropertyGroupParent.properties[i].options[0];
                                break;
                            case 'com.openkm.bean.form.TextArea':
                            case 'com.openkm.bean.form.CheckBox':
                                $scope.data.PropertyGroupParent.properties[i].value = _.clone(CloneProperties[name].value);
                                break;
                        }
                    };

                    for (var i = 0; i < $scope.data.PropertyGroupParent.properties.length; i++) {
                        _loop2(i);
                    }

                    var properties = angular.copy($scope.data.PropertyGroupParent.properties);
                    _.forEach(properties, function (property) {
                        if (property.objClass == "com.openkm.bean.form.Select" && _.has(property, 'options') && _.isArray(property.options) && property.options.length == 1) property.options = property.options[0];
                    });

                    desktopService.propertyGroup.formElement($scope.data.clipboardFolder.uuid, $scope.data.PropertyGroupParent.name, {
                        formElementsComplex: {
                            formElementComplex: [properties]
                        }
                    }).then(function (res) {
                        toaster.pop('success', '', 'فراداده با موفقیت ویرایش گردید');
                    }, function (error) {
                        return toaster.pop('error', '', 'عدم ذخیره موفق داده');
                    });
                } catch (e) {
                    console.error(e);
                }
            },
            'removeMetadataForm': function () {
                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                    return regeneratorRuntime.wrap(function _callee3$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;
                                    _context4.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/deleteRequest.js?dev=' + randomVersionName);

                                case 3:
                                    _context4.next = 5;
                                    return deleteRequestCtrl($uibModal);

                                case 5:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/deleteRequest.js?dev=' + randomVersionName] = 'deleteRequestCtrl';
                                    desktopService.propertyGroup.remove($scope.data.selectedFileOrFolder.path, $scope.data.PropertyGroupParent.name).then(function (res) {
                                        $scope.data.PropertyGroupParent = null;
                                        if (_.isFunction($scope.data.formMetadataParent)) $scope.data.formMetadataParent(angular.copy($scope.data.PropertyGroupParent), {
                                            JS: JSManagement,
                                            service: desktopService
                                        });
                                        toaster.pop('success', '', 'فراداده با موفقیت حذف گردید');
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    }, function (error) {
                                        return toaster.pop('error', '', 'عدم حذف موفق فراداده');
                                    });
                                    _context4.next = 12;
                                    break;

                                case 9:
                                    _context4.prev = 9;
                                    _context4.t0 = _context4['catch'](0);

                                    console.error(_context4.t0);

                                case 12:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee3, _this, [[0, 9]]);
                }));

                function removeMetadataForm() {
                    return _ref3.apply(this, arguments);
                }

                return removeMetadataForm;
            }()
        }
    };
    $scope.getScopeItems = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/desktopStateController.js?dev=' + randomVersionName);

                    case 3:
                        _context5.next = 5;
                        return desktopStateController($scope, $rootScope, desktopService, toaster, $state, $translate, $sce, $window, $timeout, Authentication, $uibModal, $compile, _CurrentUserInfoSrvc2.default);

                    case 5:
                        _context5.next = 7;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/desktopStateController.js?dev=' + randomVersionName, 'desktopStateController');

                    case 7:
                        $scope.func.run();
                        _context5.next = 14;
                        break;

                    case 10:
                        _context5.prev = 10;
                        _context5.t0 = _context5['catch'](0);

                        console.error(_context5.t0);
                        toaster.pop("error", '', _context5.t0 || _context5.t0.message);

                    case 14:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee4, _this, [[0, 10]]);
    }));

    $scope.getScopeItems();
};

exports.default = DesktopController;

DesktopController.$inject = ['$scope', '$rootScope', 'desktopService', 'toaster', '$state', '$translate', '$sce', '$window', '$timeout', 'Authentication', '$uibModal', '$compile'];