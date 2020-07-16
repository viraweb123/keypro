"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = generator;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function generator($compile, $http, $parse) {
    var _this = this;

    return {
        restrict: "EA",
        scope: {
            externalScope: "="
        },
        templateUrl: "../../../ecma5/Directive/generator/generator.html?dev=" + randomVersionName,
        controller: ['$scope', '$translate', '$element', '$sce', 'toaster', '$uibModal', function ($scope, $translate, $element, $sce, toaster, $uibModal) {

            $scope.FORM = {};

            $scope.data = {
                check: {
                    require: false
                },
                service: null,
                properties: null,
                removeExternalFuncs: {},
                isOpen: {},
                open: function open($event, type) {
                    angular.forEach($scope.data.isOpen, function (value, key) {
                        this[key] = false;
                    }, $scope.data.isOpen);
                    $event.preventDefault();
                    $event.stopPropagation();
                    if (typeof $scope.data.isOpen[type] !== 'undifined') {
                        $scope.data.isOpen[type] = true;
                    }
                },
                classSpliter: 'col-sm-12',
                isInternalButton: false,
                footer: null
            };

            $scope.querySearch = function (options, query) {
                return new Promise(function (resolve, reject) {
                    try {
                        var list = _.filter(options, function (option) {
                            return _.startsWith(option.label, _.trim(query));
                        });

                        resolve(_.forEach(list, function (option) {
                            return option.label = String(option.label);
                        }));
                    } catch (e) {
                        reject(null);
                    } finally {
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    }
                });
            };
            $scope.changeAutoComplate = function (property) {
                try {

                    if (_.has(property, 'selected') && property.selected != null) _.map(property.options, function (option) {
                        return option.selected = property.selected.label == option.label;
                    });else _.map(property.options, function (option) {
                        return option.selected = false;
                    });
                    if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { action: 'changeSingleOption' });
                    if (_.has(property, 'childName')) {
                        if (_.has($scope.data.properties, property.childName)) {
                            try {
                                $scope.data.properties[property.childName].options = [];
                                $scope.data.properties[property.childName].selected = null;
                                _.map($scope.data.properties[property.childName].allOptions, function (option) {
                                    return option.selected = false;
                                });
                                $scope.data.properties[property.childName].options = _.filter($scope.data.properties[property.childName].allOptions, function (option) {
                                    return option.value.startsWith(property.selected.value);
                                });
                                $scope.data.properties[property.childName].searchText = null;
                            } catch (e) {
                                console.error(e);
                            } finally {
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            }
                            if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty($scope.data.properties[property.childName], { action: 'changeSingleOption' });
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.searchTextChange = function (name) {
                try {
                    console.log($scope.data.properties[name]);
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.getForm = function () {
                return new Promise(function (resolve, reject) {
                    try {
                        var form = $scope.FORM.formGeneratoName;
                        if (form !== undefined) resolve(form);
                    } catch (e) {
                        reject("عدم دریافت فرم .");
                    }
                });
            };

            $scope.editMetadataFrom = function () {
                try {
                    var form = $scope.FORM.formGeneratoName;
                    if ($scope.data.check.require == true) {
                        if (_.has(form.$error, 'required') && _.isArray(form.$error.required) && form.$error.required.length > 0) {
                            toaster.pop('error', '', 'لطفا فیلدهای اجباری را پر کنید');
                            if (form.$invalid) {
                                _.forEach(form.$error, function (field) {
                                    _.forEach(field, function (errorField) {
                                        return errorField.$setTouched();
                                    });
                                });
                            }
                        } else if (_.has(form.$error, 'pattern') && _.isArray(form.$error.pattern) && form.$error.pattern.length > 0) {
                            toaster.pop('error', '', 'لطفا الگوهای درست وارد کنید .');
                        } else if (_.has($scope.externalScope, 'internalFuncs')) {
                            $scope.externalScope.internalFuncs.editMetadataFrom(angular.copy($scope.data.properties));
                        }
                    } else if (_.has($scope.externalScope, 'internalFuncs')) {
                        $scope.externalScope.internalFuncs.editMetadataFrom(angular.copy($scope.data.properties));
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.removeMetadataForm = function () {
                try {
                    $scope.externalScope.internalFuncs.removeMetadataForm();
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.addElement = function (property, form, type) {
                try {
                    form[property.name].$setTouched();
                    $scope[type](property);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.selectTreeThezarus = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(property) {
                    var response;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.prev = 1;
                                    _context.next = 4;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js');

                                case 4:
                                    _context.next = 6;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js');

                                case 6:
                                    _context.next = 8;
                                    return selectThesaurusChild($uibModal, //modal func
                                    $scope.data.service.repository, //repository service
                                    'getThesaurusFolder', // rootPath
                                    $scope.data.service.folder, // folder service
                                    "thesaurus", getNameFromPath);

                                case 8:
                                    response = _context.sent;

                                    if (_.has(response, 'addNode') && !_.isEmpty(response.addNode)) {
                                        property.value = response.addNode.label;
                                        if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { action: 'changeTreeThezarus' });
                                    }
                                    _context.next = 12;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Public/getNameFromPath.js', 'getNameFromPath');

                                case 12:
                                    _context.next = 14;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js', 'selectThesaurusChild');

                                case 14:
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    _context.next = 26;
                                    break;

                                case 17:
                                    _context.prev = 17;
                                    _context.t0 = _context["catch"](1);

                                    property.value = "";
                                    if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { action: 'changeTreeThezarus' });
                                    _context.next = 23;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Public/getNameFromPath.js', 'getNameFromPath');

                                case 23:
                                    _context.next = 25;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js', 'selectThesaurusChild');

                                case 25:
                                    console.error(_context.t0);

                                case 26:
                                    _context.next = 31;
                                    break;

                                case 28:
                                    _context.prev = 28;
                                    _context.t1 = _context["catch"](0);

                                    console.error(_context.t1);

                                case 31:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 28], [1, 17]]);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }();
            $scope.selectMultiSelected = function (property) {
                var i = _.findIndex(property.selected, function (s) {
                    return s.selected != true;
                });
                if (i >= 0) {
                    // TODO element added
                    var optionIndex = _.findIndex(property.options, function (option) {
                        return option.label == property.selected[i].label;
                    });
                    try {
                        property.options[optionIndex].selected = true;
                        if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { optionIndex: optionIndex, action: 'changeMultiSelectOption' });
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    // TODO element removed
                    var _optionIndex = _.findIndex(property.options, function (option) {
                        return option.selected == true && !_.includes(_.map(property.selected, 'label'), option.label);
                    });
                    try {
                        property.options[_optionIndex].selected = false;
                        if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { optionIndex: _optionIndex, action: 'changeMultiSelectOption' });
                    } catch (e) {
                        console.error(e);
                    }
                }
            };
            $scope.selectSingle = function (property) {
                try {
                    if (_.has(property, 'selected') && property.selected != null) _.map(property.options, function (option) {
                        return option.selected = property.selected.label == option.label;
                    });else _.map(property.options, function (option) {
                        return option.selected = false;
                    });
                    if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { action: 'changeSingleOption' });

                    if (_.has(property, 'childName')) {
                        if (_.has($scope.data.properties, property.childName)) {
                            try {
                                $scope.data.properties[property.childName].options = [];
                                $scope.data.properties[property.childName].selected = null;
                                _.map($scope.data.properties[property.childName].allOptions, function (option) {
                                    return option.selected = false;
                                });
                                $scope.data.properties[property.childName].options = _.filter($scope.data.properties[property.childName].allOptions, function (option) {
                                    return option.value.startsWith(property.selected.value);
                                });
                            } catch (e) {
                                console.error(e);
                            }
                            if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty($scope.data.properties[property.childName], { action: 'changeSingleOption' });
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.changeDate = function (property) {

                if (!_.has(property, 'mainName')) {
                    if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { action: 'changeDate' });
                } else {

                    if (_.includes([null, "", ''], $scope.data.properties[property.bindName].value)) {
                        $scope.data.properties[property.bindName].value = _.clone(property.value);
                    }

                    if (_.isDate(property.value) && _.isDate($scope.data.properties[property.bindName].value)) {

                        var minDate = _.has(property, 'isMin') && property.isMin == true ? angular.copy(property) : angular.copy($scope.data.properties[property.bindName]);
                        var maxDate = _.has(property, 'isMin') && property.isMin == false ? angular.copy(property) : angular.copy($scope.data.properties[property.bindName]);

                        if (minDate.value.getTime() <= maxDate.value.getTime()) {
                            var date = angular.copy(minDate);
                            date.name = date.mainName;
                            date.mainName = undefined;
                            delete date.mainName;

                            date.isMin = undefined;
                            delete date.isMin;

                            date.value = {
                                start: angular.copy(minDate.value),
                                end: angular.copy(maxDate.value)
                            };

                            minDate = undefined;
                            maxDate = undefined;

                            $scope.externalScope.changeProperty(date, { action: 'changeDate' });
                        } else {
                            toaster.pop("error", "", "باید زمان شروع کوچکتر یا مساوی زمان پایان باشد .");
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            return;
                        }
                    } else {
                        toaster('error', '', 'لطفا مقدار تاریخ درست انتخاب کنید .');
                    }
                }
            };
            $scope.changeTextArea = function (property) {
                if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { action: 'changeTextArea' });
            };
            $scope.changeText = function (property) {
                if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { action: 'changeText' });
            };
            $scope.changeCheckbox = function (property) {
                if (_.has($scope.externalScope, 'changeProperty')) $scope.externalScope.changeProperty(property, { action: 'changeCheckbox' });
            };
            $scope.maxRegex = function (number) {
                var minarray = [];
                var len = number.length;
                if (len == 1) {
                    try {
                        minarray.push("(?=(^[1-9][0-9]+$))");
                        minarray.push("(?=(^[" + number[0] + "-9]$))");
                    } catch (e) {
                        console.error(e);
                    }
                } else if (len > 1) {
                    minarray.push("(?=(^[1-9][0-9]{" + len + ",}$))");
                    for (var n = 0; n < len; n++) {
                        try {
                            var num = Number(number[n]);
                            if (num < 9) {
                                if (n == len - 1) minarray.push("(?=(^" + number.substr(0, n) + "[" + num + "-9][0-9]*$))");else minarray.push("(?=(^" + number.substr(0, n) + "[" + (num + 1) + "-9][0-9]{" + (len - n - 1) + ",}$))");
                            } else {
                                minarray.push("(?=(^" + number + "[0-9]*$))");
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
                return minarray;
            };
            $scope.minRegex = function (number) {
                var minarray = [];
                var len = number.length;
                if (len == 1) {
                    try {
                        if (Number(number[0]) != 0) minarray.push("(?=(^[1-" + number[0] + "]$))");else minarray.push("(?=(^0$))");
                    } catch (e) {
                        console.error(e);
                    }
                } else if (len > 1) {
                    minarray.push("(?=(^[1-9][0-9]{0," + (len - 2) + "}$))");
                    for (var n = 0; n < len; n++) {
                        try {
                            var num = Number(number[n]);
                            if (n == 0 && (num == 1 || num == 0)) continue;
                            if (num > 1) {
                                if (n == len - 1) minarray.push("(?=(^" + number.substr(0, n) + "[0-" + num + "]$))");else minarray.push("(?=(^" + number.substr(0, n) + "[0-" + (num - 1) + "][0-9]{1," + (len - n - 1) + "}$))");
                            } else if (num == 1 && n == len - 1) {
                                minarray.push("(?=(^" + number.substr(0, n) + "[0-1]$))");
                            } else minarray.push("(?=(^" + number + "$))");
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
                return minarray;
            };

            /**TODO Initialization   form with Items **/
            $scope.InitializationForm = function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(propertyGroup, items) {
                    var properties, i, patterns, property, from, to, property1, property2, index, j, reg, listMax, _listMax;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;

                                    $scope.data.check.require = _.has(items, 'require') && items.require == true;
                                    $scope.data.service = _.has(items, 'service') ? items.service : null;
                                    $scope.data.classSpliter = _.has(items, 'classSpliter') ? items.classSpliter : 'col-sm-12';

                                    if (!(propertyGroup != null && _.isArray(propertyGroup))) {
                                        _context2.next = 139;
                                        break;
                                    }

                                    $scope.data.properties = null;
                                    properties = {};
                                    i = 0;

                                case 8:
                                    if (!(i < propertyGroup.length)) {
                                        _context2.next = 133;
                                        break;
                                    }

                                    patterns = [];
                                    property = angular.copy(propertyGroup[i]);

                                    property.validators = _.has(property, 'validators') ? _.isArray(property.validators) ? property.validators : [property.validators] : [];
                                    property.require = false;
                                    property.index = i;
                                    _context2.t0 = property.objClass;
                                    _context2.next = _context2.t0 === 'com.openkm.bean.form.Input' ? 17 : _context2.t0 === 'com.openkm.bean.form.Select' ? 73 : _context2.t0 === 'com.openkm.bean.form.TextArea' ? 86 : _context2.t0 === 'com.openkm.bean.form.CheckBox' ? 86 : 87;
                                    break;

                                case 17:
                                    if (!_.has(property, 'type')) {
                                        _context2.next = 72;
                                        break;
                                    }

                                    _context2.t1 = property.type;
                                    _context2.next = _context2.t1 === 'date' ? 21 : _context2.t1 === 'text' ? 61 : _context2.t1 === 'number' ? 63 : _context2.t1 === 'email' ? 66 : _context2.t1 === 'link' ? 69 : 72;
                                    break;

                                case 21:
                                    if (!_.has(items, 'filter')) {
                                        _context2.next = 46;
                                        break;
                                    }

                                    from = property.name + ".from";
                                    to = property.name + ".to";
                                    property1 = angular.copy(property);

                                    property1.mainName = property.name;
                                    property1.name = from;
                                    property1.bindName = to;
                                    property1.isMin = true;
                                    property1.label = property1.label + " از ";
                                    $scope.data.isOpen[property1.name] = false;
                                    properties[property1.name] = angular.copy(property1);

                                    property2 = angular.copy(property);

                                    property2.mainName = property.name;
                                    property2.name = to;
                                    property2.bindName = from;
                                    property2.isMin = false;
                                    property2.label = property2.label + " تا ";
                                    $scope.data.isOpen[property2.name] = false;
                                    properties[property2.name] = angular.copy(property2);

                                    property1 = undefined;
                                    property2 = undefined;
                                    property = undefined;

                                    return _context2.abrupt("continue", 130);

                                case 46:
                                    $scope.data.isOpen[property.name] = false;

                                    if (!(!_.includes[(null, "")], property.value)) {
                                        _context2.next = 60;
                                        break;
                                    }

                                    _context2.prev = 48;
                                    _context2.next = 51;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js');

                                case 51:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js'] = 'miladiToJalaliFunction';
                                    _context2.next = 54;
                                    return miladiToJalaliFunction(property.value);

                                case 54:
                                    property.value = _context2.sent;
                                    _context2.next = 60;
                                    break;

                                case 57:
                                    _context2.prev = 57;
                                    _context2.t2 = _context2["catch"](48);

                                    console.error(_context2.t2);

                                case 60:
                                    return _context2.abrupt("break", 72);

                                case 61:
                                    property.isThesaurus = false;
                                    return _context2.abrupt("break", 72);

                                case 63:
                                    property.isThesaurus = false;
                                    //todo fixed problem with just adding '0'
                                    patterns.push('(?:(?=(^[1-9][0-9]*$))|(?=(^0$)))');
                                    return _context2.abrupt("break", 72);

                                case 66:
                                    property.isThesaurus = false;
                                    patterns.push('(?=(^[a-zA-Z]+[a-zA-Z0-9._]+@([a-zA-Z_0-9]+\\.)*[a-zA-Z]{2,}$))');
                                    return _context2.abrupt("break", 72);

                                case 69:
                                    property.isThesaurus = false;
                                    // ((ht|f)tp(s|)
                                    patterns.push('(?=(^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$))');
                                    return _context2.abrupt("break", 72);

                                case 72:
                                    return _context2.abrupt("break", 87);

                                case 73:
                                    if (!_.has(property, 'type')) {
                                        _context2.next = 85;
                                        break;
                                    }

                                    if (!_.has(property, 'options') || property.options == null) property.options = [];else if (!_.isArray(property.options)) {
                                        property.options = [property.options];
                                    }
                                    _context2.t3 = property.type;
                                    _context2.next = _context2.t3 === 'simple' ? 78 : _context2.t3 === 'multiple' ? 83 : 85;
                                    break;

                                case 78:
                                    if (_.has(property, 'parentName')) {
                                        (function () {
                                            property.allOptions = _.clone(property.options);
                                            var index = _.findIndex(propertyGroup, function (p) {
                                                return _.has(p, 'childName') && p.childName == property.name;
                                            });
                                            if (index >= 0) {
                                                (function () {
                                                    var optionIndex = _.findIndex(propertyGroup[index].options, function (option) {
                                                        return option.selected;
                                                    });
                                                    if (optionIndex >= 0) {
                                                        _.remove(property.options, function (option) {
                                                            return !option.value.startsWith(propertyGroup[index].options[optionIndex].value);
                                                        });
                                                    } else {
                                                        property.options = [];
                                                    }
                                                })();
                                            }
                                        })();
                                    }
                                    index = _.findIndex(property.options, function (option) {
                                        return option.selected;
                                    });

                                    property.selected = null;
                                    if (index >= 0) property.selected = property.options[index];
                                    return _context2.abrupt("break", 85);

                                case 83:
                                    property.selected = _.filter(property.options, function (option) {
                                        return option.selected;
                                    });
                                    return _context2.abrupt("break", 85);

                                case 85:
                                    return _context2.abrupt("break", 87);

                                case 86:
                                    return _context2.abrupt("break", 87);

                                case 87:
                                    if (!(typeof property !== "undefined")) {
                                        _context2.next = 130;
                                        break;
                                    }

                                    j = 0;

                                case 89:
                                    if (!(j < property.validators.length)) {
                                        _context2.next = 126;
                                        break;
                                    }

                                    _context2.prev = 90;
                                    _context2.t4 = property.validators[j].type;
                                    _context2.next = _context2.t4 === 'req' ? 94 : _context2.t4 === 'regexp' ? 96 : _context2.t4 === 'maxlen' ? 106 : _context2.t4 === 'minlen' ? 108 : _context2.t4 === 'alpha' ? 110 : _context2.t4 === 'defaultValue' ? 112 : _context2.t4 === 'min' ? 114 : _context2.t4 === 'max' ? 116 : 118;
                                    break;

                                case 94:
                                    property.require = $scope.data.check.require;
                                    return _context2.abrupt("break", 118);

                                case 96:
                                    _context2.t5 = property.validators[j].parameter;
                                    _context2.next = _context2.t5 === 'thesaurus' ? 99 : _context2.t5 === 'ltr' ? 101 : 103;
                                    break;

                                case 99:
                                    property.isThesaurus = true;
                                    return _context2.abrupt("break", 105);

                                case 101:
                                    property.isLTR = true;
                                    return _context2.abrupt("break", 105);

                                case 103:
                                    if (!_.includes(["", null], property.validators[j].parameter)) {
                                        try {
                                            reg = new RegExp(property.validators[j].parameter);

                                            patterns.push("(?=(^" + property.validators[j].parameter + "$))");
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }
                                    return _context2.abrupt("break", 105);

                                case 105:
                                    return _context2.abrupt("break", 118);

                                case 106:
                                    if (Number(property.validators[j].parameter) == property.validators[j].parameter) patterns.push("(?=(^.{0," + Number(property.validators[j].parameter) + "}$))");
                                    return _context2.abrupt("break", 118);

                                case 108:
                                    if (Number(property.validators[j].parameter) == property.validators[j].parameter) patterns.push("(?=(^.{" + Number(property.validators[j].parameter) + ",}$))");
                                    return _context2.abrupt("break", 118);

                                case 110:
                                    patterns.push("(?=(^[؀-ۿa-zA-Z][؀-ۿsa-zA-Z][؀-ۿa-zA-Z][؀-ۿsa-zA-Z\\W]*$))");
                                    return _context2.abrupt("break", 118);

                                case 112:
                                    if (!_.has(items, 'filter') && _.includes([null, ""], property.value) && !_.includes([null, ""], property.validators[j].parameter)) property.value = angular.copy(property.validators[j].parameter);
                                    return _context2.abrupt("break", 118);

                                case 114:
                                    //TODO 148 or top
                                    //'(?:(?=(^[2-9][0-9]{2,}$))|(?=(^1[5-9][0-9]{1,}$))|(?=(^14[8-9][0-9]*$)))'
                                    if (Number(property.validators[j].parameter) == property.validators[j].parameter) {
                                        listMax = $scope.maxRegex(String(property.validators[j].parameter));

                                        patterns.push("(?:" + listMax.join('|') + ")");
                                    }
                                    return _context2.abrupt("break", 118);

                                case 116:
                                    //TODO 148 or top
                                    //'(?:(?=(^[2-9][0-9]{2,}$))|(?=(^1[5-9][0-9]{1,}$))|(?=(^14[8-9][0-9]*$)))'
                                    if (Number(property.validators[j].parameter) == property.validators[j].parameter) {
                                        _listMax = $scope.minRegex(String(property.validators[j].parameter));

                                        patterns.push("(?:" + _listMax.join('|') + ")");
                                    }
                                    return _context2.abrupt("break", 118);

                                case 118:
                                    _context2.next = 123;
                                    break;

                                case 120:
                                    _context2.prev = 120;
                                    _context2.t6 = _context2["catch"](90);

                                    console.error(_context2.t6);

                                case 123:
                                    j++;
                                    _context2.next = 89;
                                    break;

                                case 126:
                                    if (patterns.length > 0) property.patterns = new RegExp("(?:" + patterns.join('') + ")", 'g'); //'|'
                                    else property.patterns = /[\w|\W]*/; //  /.*/gim

                                    property.readonly = property.readonly && !_.has(items, 'notReadOnly');
                                    properties[property.name] = angular.copy(property);
                                    property = undefined;

                                case 130:
                                    i++;
                                    _context2.next = 8;
                                    break;

                                case 133:
                                    $scope.data.properties = angular.copy(properties);
                                    properties = undefined;

                                    if (_.has($scope.externalScope, 'footer')) {
                                        _.forEach($scope.externalScope.footer, function (val, key) {
                                            if (_.has(val, 'form')) val.form = $scope.getForm;
                                            if (_.has(val, 'property')) val.property = $scope.data.properties;
                                        });
                                    }
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    _context2.next = 142;
                                    break;

                                case 139:
                                    $scope.data.properties = null;
                                    $scope.data.metaData = null;
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 142:
                                    _context2.next = 147;
                                    break;

                                case 144:
                                    _context2.prev = 144;
                                    _context2.t7 = _context2["catch"](0);

                                    console.error(_context2.t7);

                                case 147:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[0, 144], [48, 57], [90, 120]]);
                }));

                return function (_x2, _x3) {
                    return _ref2.apply(this, arguments);
                };
            }();

            if ($scope.externalScope.InitializationForm == null) $scope.externalScope.InitializationForm = $scope.InitializationForm;
            if (_.has($scope.externalScope, 'externalFuncs') && $scope.externalScope.externalFuncs != null) {
                _.forEach($scope.externalScope.externalFuncs, function (v, k) {
                    if (_.has($scope, k) && _.isFunction($scope[k])) $scope.externalScope.externalFuncs[k] = $scope[k];
                });
            }
            if (_.has($scope.externalScope, 'footer')) {
                $scope.data.footer = {
                    isShow: true,
                    list: $scope.externalScope.footer
                };
                _.defer(function () {
                    return $scope.$apply();
                });
            }

            $element.on('$destroy', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                try {
                                    _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(funcName, src) {
                                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                while (1) {
                                                    switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                            _context3.prev = 0;
                                                            _context3.next = 3;
                                                            return JSManagement.removeJS(src, funcName);

                                                        case 3:
                                                            _context3.next = 8;
                                                            break;

                                                        case 5:
                                                            _context3.prev = 5;
                                                            _context3.t0 = _context3["catch"](0);

                                                            console.error(_context3.t0);

                                                        case 8:
                                                        case "end":
                                                            return _context3.stop();
                                                    }
                                                }
                                            }, _callee3, _this, [[0, 5]]);
                                        }));

                                        return function (_x4, _x5) {
                                            return _ref4.apply(this, arguments);
                                        };
                                    }());
                                } catch (e) {
                                    console.error(e);
                                }

                                try {
                                    $scope.$destroy();
                                } catch (e) {
                                    console.error(e);
                                }

                            case 2:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this);
            })));
        }]
    };
}