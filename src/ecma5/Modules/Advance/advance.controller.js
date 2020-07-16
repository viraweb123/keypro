'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdvanceController = function AdvanceController($scope, advanceService, toaster, $state, $uibModal, $translate, Authentication) {
    var _this = this;

    _classCallCheck(this, AdvanceController);

    $scope.externalScope = {
        InitializationForm: null,
        changeProperty: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(property, actions) {
                var dateStart, dateEnd, serverTypeStart, serverTypeEnd;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!_.has(actions, 'action')) {
                                    _context.next = 45;
                                    break;
                                }

                                _context.t0 = actions.action;
                                _context.next = _context.t0 === 'changeText' ? 4 : _context.t0 === 'changeCheckbox' ? 6 : _context.t0 === 'changeTextArea' ? 8 : _context.t0 === 'changeDate' ? 10 : _context.t0 === 'changeSingleOption' ? 39 : _context.t0 === 'changeMultiSelectOption' ? 41 : _context.t0 === 'changeTreeThezarus' ? 43 : 45;
                                break;

                            case 4:
                                try {
                                    if (!_.includes(["", null], _.trim(property.value))) {
                                        if (!_.has(property, 'isUnique')) {
                                            $scope.data.filters['metadata-' + property.name + '-filter'] = {
                                                title: $scope.data.selectMetadata.label + '-' + property.label + ' : ' + property.value,
                                                value: _.clone(property.value),
                                                type: "smetadata",
                                                key: property.name
                                            };
                                        } else {
                                            $scope.data.filters['propertyGroups'] = {
                                                title: $scope.data.selectMetadata.label + '-' + property.label + ' : ' + property.value,
                                                value: _.clone(property.value),
                                                type: "propertyGroups",
                                                key: property.name
                                            };
                                        }
                                        $scope.func.checkIs2LayerReady();
                                    } else if (_.has($scope.data.filters, 'metadata-' + property.name + '-filter')) delete $scope.data.filters['metadata-' + property.name + '-filter'];
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                } catch (e) {
                                    console.error(e);
                                }
                                return _context.abrupt('break', 45);

                            case 6:
                                try {
                                    $scope.data.filters['metadata-' + property.name + '-filter'] = {
                                        title: $scope.data.selectMetadata.label + '-' + property.label + '-' + (property.value ? 'فعال' : 'غیر فعال'),
                                        value: _.clone(property.value),
                                        type: "smetadata",
                                        key: property.name
                                    };
                                    $scope.func.checkIs2LayerReady();
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                } catch (e) {
                                    console.error(e);
                                }
                                return _context.abrupt('break', 45);

                            case 8:
                                try {
                                    if (!_.includes(["", null], _.trim(property.value))) {
                                        $scope.data.filters['metadata-' + property.name + '-filter'] = {
                                            title: $scope.data.selectMetadata.label + '-' + property.label + ' : ' + property.value,
                                            value: _.clone(property.value),
                                            type: "smetadata",
                                            key: property.name
                                        };
                                        $scope.func.checkIs2LayerReady();
                                    } else if (_.has($scope.data.filters, 'metadata-' + property.name + '-filter')) delete $scope.data.filters['metadata-' + property.name + '-filter'];
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                } catch (e) {
                                    console.error(e);
                                }
                                return _context.abrupt('break', 45);

                            case 10:
                                _context.prev = 10;

                                if (!(_.has(property.value, "start") && _.has(property.value, "end") && _.isDate(property.value.start) && _.isDate(property.value.end))) {
                                    _context.next = 31;
                                    break;
                                }

                                _context.next = 14;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliWidthStandardDate.js?dev=' + randomVersionName);

                            case 14:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliWidthStandardDate.js?dev=' + randomVersionName] = 'miladiToJalaliWidthStandardDate';

                                _context.next = 17;
                                return miladiToJalaliWidthStandardDate(property.value.start);

                            case 17:
                                dateStart = _context.sent;
                                _context.next = 20;
                                return miladiToJalaliWidthStandardDate(property.value.end);

                            case 20:
                                dateEnd = _context.sent;
                                _context.next = 23;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName);

                            case 23:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName] = 'dateFormatInternal';

                                _context.next = 26;
                                return dateFormatInternal(property.value.start);

                            case 26:
                                serverTypeStart = _context.sent;
                                _context.next = 29;
                                return dateFormatInternal(property.value.end);

                            case 29:
                                serverTypeEnd = _context.sent;

                                $scope.data.filters['metadata-' + property.name + '-filter'] = {
                                    title: $scope.data.selectMetadata.label + '-' + property.label + ' : from ' + dateStart + ' to ' + dateEnd,
                                    value: _.clone(serverTypeStart) + ',' + _.clone(serverTypeEnd),
                                    type: "smetadata",
                                    key: property.name
                                };

                            case 31:
                                $scope.func.checkIs2LayerReady();
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                _context.next = 38;
                                break;

                            case 35:
                                _context.prev = 35;
                                _context.t1 = _context['catch'](10);

                                console.error(_context.t1);

                            case 38:
                                return _context.abrupt('break', 45);

                            case 39:
                                try {
                                    if (property.selected != null) {
                                        $scope.data.filters['metadata-' + property.name + '-filter'] = {
                                            title: $scope.data.selectMetadata.label + '-' + property.label + ' : ' + property.selected.label,
                                            value: _.clone(property.selected.value),
                                            type: "smetadata",
                                            key: property.name
                                        };
                                    } else if (_.has($scope.data.filters, 'metadata-' + property.name + '-filter')) delete $scope.data.filters['metadata-' + property.name + '-filter'];
                                    $scope.func.checkIs2LayerReady();
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                } catch (e) {
                                    console.error(e);
                                }
                                return _context.abrupt('break', 45);

                            case 41:
                                try {
                                    if (property.options[actions.optionIndex].selected) {
                                        $scope.data.filters['metadata-' + property.name + '-' + property.options[actions.optionIndex].label + '-filter'] = {
                                            title: $scope.data.selectMetadata.label + '-' + property.label + ' : ' + property.options[actions.optionIndex].label,
                                            value: _.clone(property.options[actions.optionIndex].value),
                                            type: "smetadata",
                                            key: property.name
                                        };
                                    } else if (_.has($scope.data.filters, 'metadata-' + property.name + '-' + property.options[actions.optionIndex].label + '-filter')) delete $scope.data.filters['metadata-' + property.name + '-' + property.options[actions.optionIndex].label + '-filter'];
                                    $scope.func.checkIs2LayerReady();
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                } catch (e) {
                                    console.error(e);
                                }
                                return _context.abrupt('break', 45);

                            case 43:
                                try {
                                    if (!_.includes(["", null], _.trim(property.value))) $scope.data.filters['metadata-' + property.name + '-filter'] = {
                                        title: $scope.data.selectMetadata.label + '-' + property.label + ' : ' + property.value,
                                        value: _.clone(property.value),
                                        type: "smetadata",
                                        key: property.name
                                    };else if (_.has($scope.data.filters, 'metadata-' + property.name + '-filter')) delete $scope.data.filters['metadata-' + property.name + '-filter'];
                                    $scope.func.checkIs2LayerReady();
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                } catch (e) {
                                    console.error(e);
                                }
                                return _context.abrupt('break', 45);

                            case 45:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[10, 35]]);
            }));

            function changeProperty(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return changeProperty;
        }()
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
                    var _loop = function _loop(i) {
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
                                break;
                            case 'com.openkm.bean.form.TextArea':
                            case 'com.openkm.bean.form.CheckBox':
                                $scope.data.PropertyGroupParent.properties[i].value = _.clone(CloneProperties[name].value);
                                break;
                        }
                    };

                    for (var i = 0; i < $scope.data.PropertyGroupParent.properties.length; i++) {
                        _loop(i);
                    }

                    advanceService.PropertyGroup.formElement($scope.data.clipboardFolder.uuid, $scope.data.PropertyGroupParent.name, {
                        formElementsComplex: {
                            formElementComplex: [$scope.data.PropertyGroupParent.properties]
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
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/deleteRequest.js?dev=' + randomVersionName);

                                case 3:
                                    _context2.next = 5;
                                    return deleteRequestCtrl($uibModal);

                                case 5:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/deleteRequest.js?dev=' + randomVersionName] = 'deleteRequestCtrl';
                                    advanceService.PropertyGroup.remove($scope.data.selectedFileOrFolder.path, $scope.data.PropertyGroupParent.name).then(function (res) {
                                        $scope.data.PropertyGroupParent = null;
                                        if (_.isFunction($scope.data.formMetadataParent)) $scope.data.formMetadataParent(angular.copy($scope.data.PropertyGroupParent), {
                                            JS: JSManagement,
                                            service: advanceService
                                        });
                                        toaster.pop('success', '', 'فراداده با موفقیت حذف گردید');
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    }, function (error) {
                                        return toaster.pop('error', '', 'عدم حذف موفق فراداده');
                                    });
                                    _context2.next = 12;
                                    break;

                                case 9:
                                    _context2.prev = 9;
                                    _context2.t0 = _context2['catch'](0);

                                    console.error(_context2.t0);

                                case 12:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[0, 9]]);
                }));

                function removeMetadataForm() {
                    return _ref2.apply(this, arguments);
                }

                return removeMetadataForm;
            }()
        }
    };

    $scope.getScopeItems = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Search/advanceStateController.js?dev=' + randomVersionName);

                    case 3:
                        _context3.next = 5;
                        return advanceStateController($scope, advanceService, toaster, $state, $uibModal, $translate, Authentication);

                    case 5:
                        _context3.next = 7;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Search/advanceStateController.js?dev=' + randomVersionName, 'advanceStateController');

                    case 7:
                        $scope.func.run();
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
        }, _callee3, _this, [[0, 10]]);
    }));

    $scope.getScopeItems();
};

exports.default = AdvanceController;

AdvanceController.$inject = ['$scope', 'advanceService', 'toaster', '$state', '$uibModal', '$translate', 'Authentication'];