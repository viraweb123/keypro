'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var viewFormDashboardCtrl = function viewFormDashboardCtrl(uibModal, _item) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Dashboard/viewFormDashboard.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, item) {

                $scope.FORM = {};

                $scope.data = {
                    removeExternalFuncs: [],
                    item: _.clone(item)
                };

                $scope.func = {};

                $scope.func.goTo = function (transition) {
                    try {
                        var form = $scope.FORM.formWorkflow;

                        if (_.has(form.$error, 'required') && _.isArray(form.$error.required) && form.$error.required.length > 0) {
                            toaster.pop('error', '', 'لطفا فیلد های اجباری را پر کنید');
                            if (form.$invalid) {
                                _.forEach(form.$error, function (field) {
                                    _.forEach(field, function (errorField) {
                                        return errorField.$setTouched();
                                    });
                                });
                            }
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            return;
                        } else if (_.has(form.$error, 'pattern') && _.isArray(form.$error.pattern) && form.$error.pattern.length > 0) {
                            toaster.pop('error', '', 'لطفا الگوهای درست وارد کنید');
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            return;
                        } else {
                            var tempForm = angular.copy($scope.data.form);
                            if (tempForm != null) {
                                _.forEach(tempForm, function (property, key) {
                                    if (_.has(property, 'patterns')) {
                                        property.patterns = undefined;
                                        delete property.patterns;
                                    }
                                    if (_.has(property, 'require')) {
                                        property.require = undefined;
                                        delete property.require;
                                    }
                                    if (_.has(property, 'type') && property.type == 'date') {
                                        if (!_.includes[(null, "")], property.value) {
                                            try {
                                                miladiToJalaliFunction(property.value).then(function (res) {
                                                    return property.value = res;
                                                }, function (err) {
                                                    return console.error(err);
                                                });
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }
                                    }

                                    if (_.has(property, 'selected')) {
                                        property.selected = undefined;
                                        delete property.selected;
                                    }
                                });

                                $uibModalInstance.close({ cloneForm: _.toArray(tempForm), transition: transition });
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.selectItem = function (element) {
                    return _.map(element.options, function (option) {
                        return option.selected = element.value == option.value;
                    });
                };

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.func.gerenarateForm = function (form) {
                    return new Promise(function (resolve, reject) {
                        try {
                            var formElements = {};
                            var transitionElements = [];

                            if (_.isArray(form)) {
                                for (var i = 0; i < form.length; i++) {

                                    var property = angular.copy(form[i]);
                                    property.validators = _.has(property, 'validators') ? _.isArray(property.validators) ? property.validators : [property.validators] : [];

                                    var patterns = [];
                                    property.require = false;

                                    if (_.has(property, 'type')) {

                                        switch (property.type) {
                                            case "simple":
                                                property.options = _.isArray(property.options) ? property.options : [property.options];
                                                property.selected = null;

                                                var index = _.findIndex(property.options, function (option) {
                                                    return option.selected;
                                                });
                                                if (index >= 0) property.selected = property.options[index];
                                                property.objClass = "com.openkm.bean.form.Select";
                                                break;
                                            case "multiple":
                                                property.options = _.isArray(property.options) ? property.options : [property.options];
                                                property.selected = _.filter(property.options, function (option) {
                                                    return option.selected;
                                                });
                                                property.objClass = "com.openkm.bean.form.Select";
                                                break;
                                            case "text":
                                                property.objClass = "com.openkm.bean.form.Input";
                                                break;
                                            case "date":
                                                $scope.data.isOpen[property.name] = false;
                                                property.objClass = "com.openkm.bean.form.Input";
                                                break;
                                            case "link":
                                                patterns.push('(?=(^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$))');
                                                property.objClass = "com.openkm.bean.form.Input";
                                                break;
                                        }
                                    } else if (_.has(property, 'value')) {

                                        /*todo this element is checkbox*/
                                        if (_.isBoolean(property.value)) {

                                            property.objClass = 'com.openkm.bean.form.CheckBox';
                                        }
                                        /*todo this element is textarea*/
                                        else {
                                                property.objClass = 'com.openkm.bean.form.TextArea';
                                            }

                                        formElements[property.name] = angular.copy(property);

                                        property = undefined;
                                        patterns = undefined;
                                        continue;
                                    } else if (_.has(property, 'confirmation')) {
                                        /*todo this element is button*/
                                        transitionElements.push(angular.copy(property));
                                        property = undefined;
                                        patterns = undefined;
                                        continue;
                                    }

                                    for (var j = 0; j < property.validators.length; j++) {
                                        try {
                                            switch (property.validators[j].type) {
                                                case 'req':
                                                    property.require = true;
                                                    break;
                                                case 'regexp':
                                                    switch (property.validators[j].parameter) {
                                                        case 'ltr':
                                                            property.isLTR = true;
                                                            break;
                                                    }
                                                    break;
                                                case 'maxlen':
                                                    if (Number(property.validators[j].parameter) == property.validators[j].parameter) patterns.push('(?=(^.{0,' + Number(property.validators[j].parameter) + '}$))');
                                                    break;
                                                case 'minlen':
                                                    if (Number(property.validators[j].parameter) == property.validators[j].parameter) patterns.push('(?=(^.{' + Number(property.validators[j].parameter) + ',}$))');
                                                    break;
                                                case 'alpha':
                                                    patterns.push('(?=(^[؀-ۿa-zA-Z][؀-ۿsa-zA-Z][؀-ۿa-zA-Z][؀-ۿsa-zA-Z\\W]*$))');
                                                    break;
                                                case 'min':
                                                    if (Number(property.validators[j].parameter) == property.validators[j].parameter) {
                                                        var listMax = $scope.func.maxRegex(String(property.validators[j].parameter));
                                                        patterns.push('(?:' + listMax.join('|') + ')');
                                                    }
                                                    break;
                                                case 'max':
                                                    if (Number(property.validators[j].parameter) == property.validators[j].parameter) {
                                                        var _listMax = $scope.func.minRegex(String(property.validators[j].parameter));
                                                        patterns.push('(?:' + _listMax.join('|') + ')');
                                                    }
                                                    break;
                                            }
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }

                                    if (patterns.length > 0) property.patterns = new RegExp('(?:' + patterns.join('') + ')', 'g');else property.patterns = /[\w|\W]*/;

                                    formElements[property.name] = angular.copy(property);
                                    property = undefined;
                                    patterns = undefined;
                                }

                                resolve({
                                    form: formElements,
                                    buttons: transitionElements
                                });
                            } else {
                                reject("عدم ایجاد فرم.");
                            }
                        } catch (e) {
                            reject("عدم ایجاد فرم.");
                        }
                    });
                };
                $scope.func.toDo = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var formRunConfig;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';

                                    _context.next = 6;
                                    return $scope.func.gerenarateForm(_.clone(item.form));

                                case 6:
                                    formRunConfig = _context.sent;


                                    $scope.data.form = angular.copy(formRunConfig.form);
                                    $scope.data.confirmations = angular.copy(formRunConfig.buttons);

                                    formRunConfig = undefined;

                                    _context.next = 15;
                                    break;

                                case 12:
                                    _context.prev = 12;
                                    _context.t0 = _context['catch'](0);

                                    console.error(_context.t0);

                                case 15:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 12]]);
                }));

                $scope.func.toDo();

                $scope.$on("$destroy", function () {
                    try {
                        _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(funcName, src) {
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _context2.prev = 0;

                                                console.info(src);
                                                _context2.next = 4;
                                                return JSManagement.removeJS(src, funcName);

                                            case 4:
                                                _context2.next = 9;
                                                break;

                                            case 6:
                                                _context2.prev = 6;
                                                _context2.t0 = _context2['catch'](0);

                                                console.error(_context2.t0);

                                            case 9:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this, [[0, 6]]);
                            }));

                            return function (_x, _x2) {
                                return _ref2.apply(this, arguments);
                            };
                        }());
                        // clear all data and functions
                        $scope.func = undefined;
                        $scope.data = undefined;
                        $scope.formModal = undefined;
                    } catch (e) {
                        console.error(e);
                    }
                });
            },
            size: 'md',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                item: function item() {
                    return _item;
                }
            }
        });

        modalInstance.result.then(function (response) {
            if (response) resolve(response);else reject(false);
        }, function (error) {
            return reject(false);
        });
    });
};