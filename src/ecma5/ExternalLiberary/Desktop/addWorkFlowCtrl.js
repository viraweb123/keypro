'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addWorkFlowCtrl = function addWorkFlowCtrl(uibModal, _fileItem, _service) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            var modalInstance = uibModal.open({
                templateUrl: 'ecma5/ExternalLiberary/Desktop/addWorkFlow.html?dev=' + randomVersionName,
                controller: function controller($scope, $uibModalInstance, toaster, fileItem, service) {

                    $scope.FORM = {};

                    $scope.data = {
                        removeExternalFuncs: [],
                        state: 'selectWorkFlow',
                        workflows: null,
                        workflow: null,
                        form: null,
                        key: null,
                        confirmations: [],
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
                        }

                    };

                    $scope.func = {};

                    $scope.func.close = function () {
                        return $uibModalInstance.close(false);
                    };

                    $scope.func.addWorkFlow = function () {

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
                            }

                            var tempForm = angular.copy($scope.data.form);
                            if ($scope.data.workflow != null && tempForm != null) {
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
                            }

                            _.defer(function () {
                                $uibModalInstance.close({
                                    form: _.toArray(tempForm),
                                    id: $scope.data.workflow.id
                                });
                            }, 100);
                        } catch (e) {
                            console.error(e);
                            toaster.pop("error", "", "مشکلی در ایجاد فرم به وجود آمده است.");
                        }
                    };

                    $scope.func.selectState = function (state) {
                        $scope.data.state = state;
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    };

                    $scope.func.getWorkFlowsList = function () {
                        return new Promise(function (resolve, reject) {
                            if ($scope.data.workflows != null) resolve($scope.data.workflows);else {
                                service.workflow.ProcessDefinitionsList().then(function (res) {
                                    if (res.data != null) {
                                        $scope.data.workflows = _.clone(res.data.originalElement);
                                        resolve($scope.data.workflows);
                                    }
                                }, function (error) {
                                    return reject(error);
                                });
                            }
                        });
                    };

                    $scope.func.changeElement = function (propertyName, form) {
                        try {
                            form[propertyName].$setTouched();
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.selectSingle = function (property) {
                        try {
                            if (_.has(property, 'selected') && property.selected != null) _.map(property.options, function (option) {
                                return option.selected = property.selected.label == option.label;
                            });else _.map(property.options, function (option) {
                                return option.selected = false;
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.selectMultiSelected = function (property) {
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
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    };

                    $scope.func.maxRegex = function (number) {
                        var minarray = [];
                        var len = number.length;
                        if (len == 1) {
                            try {
                                minarray.push('(?=(^[1-9][0-9]+$))');
                                minarray.push('(?=(^[' + number[0] + '-9]$))');
                            } catch (e) {
                                console.error(e);
                            }
                        } else if (len > 1) {
                            minarray.push('(?=(^[1-9][0-9]{' + len + ',}$))');
                            for (var n = 0; n < len; n++) {
                                try {
                                    var num = Number(number[n]);
                                    if (num < 9) {
                                        if (n == len - 1) minarray.push('(?=(^' + number.substr(0, n) + '[' + num + '-9][0-9]*$))');else minarray.push('(?=(^' + number.substr(0, n) + '[' + (num + 1) + '-9][0-9]{' + (len - n - 1) + ',}$))');
                                    } else {
                                        minarray.push('(?=(^' + number + '[0-9]*$))');
                                    }
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        }
                        return minarray;
                    };
                    $scope.func.minRegex = function (number) {
                        var minarray = [];
                        var len = number.length;
                        if (len == 1) {
                            try {
                                if (Number(number[0]) != 0) minarray.push('(?=(^[1-' + number[0] + ']$))');else minarray.push('(?=(^0$))');
                            } catch (e) {
                                console.error(e);
                            }
                        } else if (len > 1) {
                            minarray.push('(?=(^[1-9][0-9]{0,' + (len - 2) + '}$))');
                            for (var n = 0; n < len; n++) {
                                try {
                                    var num = Number(number[n]);
                                    if (n == 0 && (num == 1 || num == 0)) continue;
                                    if (num > 1) {
                                        if (n == len - 1) minarray.push('(?=(^' + number.substr(0, n) + '[0-' + num + ']$))');else minarray.push('(?=(^' + number.substr(0, n) + '[0-' + (num - 1) + '][0-9]{1,' + (len - n - 1) + '}$))');
                                    } else minarray.push('(?=(^' + number + '$))');
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        }
                        return minarray;
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

                    $scope.func.selectWorkFlow = function () {
                        if ($scope.data.workflow != null) {
                            service.workflow.processDefinitionForms($scope.data.workflow.name).then(function () {
                                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                                    var formRunConfig;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!_.has(res.data.originalElement, 'run_config')) {
                                                        _context.next = 16;
                                                        break;
                                                    }

                                                    _context.prev = 1;
                                                    _context.next = 4;
                                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                                                case 4:
                                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';
                                                    _context.next = 7;
                                                    return $scope.func.gerenarateForm(_.clone(res.data.originalElement['run_config']));

                                                case 7:
                                                    formRunConfig = _context.sent;

                                                    $scope.data.form = angular.copy(formRunConfig.form);
                                                    $scope.data.confirmations = angular.copy(formRunConfig.buttons);
                                                    formRunConfig = undefined;
                                                    _context.next = 16;
                                                    break;

                                                case 13:
                                                    _context.prev = 13;
                                                    _context.t0 = _context['catch'](1);

                                                    toaster.pop("error", "", _context.t0 || _context.t0.message);

                                                case 16:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this, [[1, 13]]);
                                }));

                                return function (_x) {
                                    return _ref.apply(this, arguments);
                                };
                            }());
                        } else {
                            $scope.data.confirmation = null;
                            $scope.data.form = null;
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        }
                    };

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

                                return function (_x2, _x3) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());

                            // clear all data and functions
                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }
                    });
                },
                size: 'md',
                backdrop: 'static', // false,
                keyboard: false,
                resolve: {

                    fileItem: function fileItem() {
                        return _fileItem;
                    },
                    service: function service() {
                        return _service;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                if (response) {
                    /*_.map(response.form,val => {
                       if(_.has(val,'type')) {
                           val.objClass = 'com.openkm.bean.form.CheckBox';
                       }else{
                           val.objClass = 'com.openkm.bean.form.Input';
                       }
                    });*/
                    _service.workflow.runProcessDefinitionTemp(_fileItem.uuid, response.id, {
                        formElementsComplex: {
                            formElementComplex: [response.form]

                        }
                    }).then(function (res) {
                        return resolve(res);
                    }, function (error) {
                        return reject('عدم افزودن گردش کار');
                    });
                } else reject('عدم افزودن گردش کار');
            });
        } catch (e) {
            reject('عدم افزودن گردش کار');
        }
    });
};