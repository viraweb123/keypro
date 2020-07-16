'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var editMetadataFunction = function editMetadataFunction(uibModal, _service, _JS, _metadata, _editOrCreate) {
    return new Promise(function (resolve, reject) {
        try {
            var modalInstance = uibModal.open({
                templateUrl: 'ecma5/ExternalLiberary/Administration/editMetadataFunction.html?dev=' + randomVersionName,
                controller: function controller($scope, $uibModalInstance, $translate, toaster, service, JS, metadata, editOrCreate) {

                    $scope.formGeneratorName = {};
                    $scope.data = {
                        editOrCreate: editOrCreate,
                        metadata: _.clone(metadata),

                        fileTypes: ['input', 'select', 'checkbox', 'textarea'],
                        inputContains: ['text', 'date', 'number', 'link', 'folder', 'email'],
                        selectOptionsType: ['static', 'dynamic'],
                        selectType: ['simple', 'multiple'],
                        validType: ['req', 'alpha', 'maxlen', 'minlen', 'regexp', 'min', 'max'], //'num',

                        types: {
                            'simple': ['req'],
                            'multiple': ['req'],
                            'text': ['req', 'alpha', 'maxlen', 'minlen', 'regexp'],
                            'date': ['req'],
                            'number': ['req', 'regexp', 'min', 'max'],
                            'link': ['req', 'regexp', 'maxlen', 'minlen'],
                            'folder': ['req', 'regexp', 'maxlen', 'minlen'],
                            'email': ['req', 'regexp', 'maxlen', 'minlen']
                        }

                    };

                    $scope.func = {};

                    //TODO Validation List
                    $scope.func.addValidation = function (property) {
                        try {
                            property.validator.push({
                                type: $scope.data.validType[0],
                                parameter: ''
                            });
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.removeValidator = function (validator, index) {
                        try {
                            validator.splice(index, 1);
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.move = function (array, fromIndex, toIndex) {
                        return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
                    };
                    $scope.func.direction = {};
                    $scope.func.direction.prev = function (property, index) {
                        try {
                            if (index > 0) $scope.func.move($scope.data.metadata.property, index, index - 1);

                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.direction.next = function (property, index) {
                        try {
                            if (index < $scope.data.metadata.property.length - 1) $scope.func.move($scope.data.metadata.property, index, index + 1);
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.direction.first = function (property, index) {
                        try {
                            $scope.func.move($scope.data.metadata.property, index, 0);
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.direction.last = function (property, index) {
                        try {
                            $scope.func.move($scope.data.metadata.property, index, $scope.data.metadata.property.length - 1);
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };

                    //TODO Option Static List
                    $scope.func.addOption = function (property) {
                        try {
                            property.SelectOption.static.push({
                                label: '',
                                value: '',
                                selected: false
                            });
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.removeOption = function (staticItem, index) {
                        try {
                            staticItem.splice(index, 1);
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.editProperty = function (property) {
                        if ($scope.data.selectedProperty != property.id) $scope.data.selectedProperty = _.clone(property.id);else $scope.data.selectedProperty = null;
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    };
                    $scope.func.removeProperty = function (property) {
                        try {
                            _.remove($scope.data.metadata.property, function (p) {
                                return p.name == property.name;
                            });
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.editGroupName = function (form) {};
                    $scope.func.editGroupLabel = function (form) {};
                    $scope.func.editPropertyName = function (form) {};
                    $scope.func.editPropertyLabel = function (form) {};
                    $scope.func.changeFileldSelectOptionsType = function (property) {
                        switch (property.SelectOptionsType) {
                            case 'static':
                                property.SelectOption.dynamic = {
                                    tableName: '',
                                    QueryOption: '',
                                    suggestion: ''
                                };
                                break;
                            case 'dynamic':
                                property.SelectOption.static = [];
                                break;
                        }
                    };
                    $scope.func.changeFileldType = function (property) {
                        try {
                            switch (property.fieldType) {
                                case 'input':
                                    property.InputContains = 'text';
                                    property.SelectType = '';
                                    property.SelectOptionsType = '';
                                    if (!_.has(property, 'SelectOption')) {
                                        try {
                                            property.SelectOption.dynamic = {
                                                tableName: '',
                                                QueryOption: '',
                                                suggestion: ''
                                            };
                                            property.SelectOption.static = [];
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }
                                    break;
                                case 'select':
                                    if (!_.has(property, 'SelectOption')) property.SelectOption = {};
                                    property.SelectOption.dynamic = {
                                        tableName: '',
                                        QueryOption: '',
                                        suggestion: ''
                                    };
                                    property.validator = [];
                                    property.SelectOption.static = [];
                                    property.InputContains = '';
                                    property.SelectType = 'simple';
                                    property.SelectOptionsType = 'static';
                                    break;
                            }
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.changeFileldSelectType = function (property) {};
                    $scope.func.changeFileldInputContains = function (property) {};

                    $scope.func.goToItem = function (selector) {
                        try {
                            $(".modal-body").animate({ scrollTop: $('' + selector).offset().top }, 500);
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.create = function () {
                        var name = 'new_Property';
                        var i = 1;
                        while (_.findIndex($scope.data.metadata.property, function (property) {
                            return property.name == name;
                        }) >= 0) {
                            name = 'new_Property' + i++;
                        }$scope.data.metadata.property.push({
                            id: 'metadata-' + $scope.data.metadata.property.length,
                            //Global
                            isNew: true,
                            label: name,
                            name: name,
                            readonly: '',
                            width: '',
                            height: '',
                            fieldType: 'input',
                            //Input
                            InputContains: 'text',
                            //suggestedbox
                            suggestedboxTableName: '',
                            suggestedboxFilterQuery: '',
                            suggestedboxValueQuery: '',
                            suggestedboxDialogTitle: '',
                            suggestedboxFilterMinLen: '',
                            //Select
                            SelectType: '',
                            SelectOptionsType: 'static',
                            SelectOption: {
                                dynamic: {
                                    tableName: '',
                                    QueryOption: '',
                                    suggestion: ''
                                },
                                static: []
                            },
                            validator: []
                        });

                        _.defer(function () {
                            $scope.$apply($scope.func.goToItem('form.metadata-form div#metadata-' + ($scope.data.metadata.property.length - 1)));
                            $scope.func.editProperty($scope.data.metadata.property[$scope.data.metadata.property.length - 1]);
                        }, 50);
                    };
                    $scope.func.ok = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.prev = 0;

                                        _.forEach($scope.data.metadata.property, function (p) {
                                            try {
                                                window.document.getElementById(p.id).classList.remove("property-body-error");
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        });

                                        if (!(_.has($scope.formGeneratorName.$error, 'required') && _.isArray($scope.formGeneratorName.$error.required) && $scope.formGeneratorName.$error.required.length > 0)) {
                                            _context.next = 7;
                                            break;
                                        }

                                        toaster.pop('error', '', 'لطفا فیلد های اجباری را پر کنید');

                                        if ($scope.formGeneratorName.$invalid) {
                                            _.forEach($scope.formGeneratorName.$error, function (field) {

                                                _.forEach(field, function (errorField) {

                                                    errorField.$setTouched();

                                                    if (_.has(errorField, '$name')) {
                                                        var res = errorField.$name.match(/metadata-\d+/);
                                                        if (res != null) {
                                                            try {
                                                                window.document.getElementById(res).classList.add("property-body-error");
                                                            } catch (e) {
                                                                console.error(e);
                                                            }
                                                        }
                                                    }
                                                });
                                            });
                                        }

                                        _context.next = 30;
                                        break;

                                    case 7:
                                        if (!(_.has($scope.formGeneratorName.$error, 'pattern') && _.isArray($scope.formGeneratorName.$error.pattern) && $scope.formGeneratorName.$error.pattern.length > 0)) {
                                            _context.next = 11;
                                            break;
                                        }

                                        toaster.pop('error', '', 'لطفا الگوهای درست وارد کنید');
                                        _context.next = 30;
                                        break;

                                    case 11:
                                        if (!($scope.data.metadata.property.length == 0)) {
                                            _context.next = 15;
                                            break;
                                        }

                                        toaster.pop('error', '', 'لطفا حداقل یک ویژگی به فراداده اضافه کنید');
                                        _context.next = 30;
                                        break;

                                    case 15:
                                        if (!(_($scope.data.metadata.property).groupBy('name').map(function (k) {
                                            return k.length;
                                        }).findIndex(function (v) {
                                            return v > 1;
                                        }) > -1)) {
                                            _context.next = 19;
                                            break;
                                        }

                                        toaster.pop('error', '', 'لطفا نام تکراری برای فراداده ها انتخاب نکنید.');
                                        _context.next = 30;
                                        break;

                                    case 19:
                                        _context.prev = 19;
                                        _context.next = 22;
                                        return $scope.func.checkValidations();

                                    case 22:
                                        $uibModalInstance.close($scope.data.metadata);
                                        _context.next = 30;
                                        break;

                                    case 25:
                                        _context.prev = 25;
                                        _context.t0 = _context['catch'](19);

                                        console.error(_context.t0);
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        toaster.pop("error", "", _context.t0);

                                    case 30:
                                        _context.next = 35;
                                        break;

                                    case 32:
                                        _context.prev = 32;
                                        _context.t1 = _context['catch'](0);

                                        console.error(_context.t1);

                                    case 35:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, undefined, [[0, 32], [19, 25]]);
                    }));

                    $scope.func.checkValidations = function () {
                        return new Promise(function (resolve, reject) {
                            try {
                                for (var i = 0; i < $scope.data.metadata.property.length; i++) {
                                    var validators = _.clone($scope.data.metadata.property[i].validator);
                                    if (_.isArray(validators) && validators.length > 0) {
                                        var seeValidations = {};
                                        for (var j = 0; j < validators.length; j++) {
                                            var validator = _.clone(validators[j]);
                                            if (_.has(seeValidations, validator.type)) reject("لطفا از هر نوع اعنبار در یک ویژگی فقط یک بار استفاده کنید.");
                                            seeValidations[validator.type] = _.clone(validator.parameter);
                                            switch (validator.type) {
                                                case "min":
                                                    if (_.includes([null, ""], validator.parameter) || Number(validator.parameter) != validator.parameter) reject("لطفا برای اعتبارسنجی حداقل مقداریک عدد وارد کنید.");
                                                    if (_.has(seeValidations, "max") && Number(seeValidations["max"]) == seeValidations["max"] && Number(validator.parameter) > Number(seeValidations["max"])) reject("لطفا برای اعتبار سنجی حداقل عددمقداری کوچکتر ازاعتبارسنجی حداکثر عدد انتخاب کنید.");
                                                    break;
                                                case "max":
                                                    if (_.includes([null, ""], validator.parameter) || Number(validator.parameter) != validator.parameter) reject("لطفا برای اعتبارسنجی حداکثر مقداریک عدد وارد کنید.");
                                                    if (_.has(seeValidations, "min") && Number(seeValidations["min"]) == seeValidations["min"] && Number(validator.parameter) < Number(seeValidations["min"])) reject("لطفا برای اعتبار سنجی حداکثر عددمقداری کوچکتر ازاعتبارسنجی حداقل عدد انتخاب کنید.");
                                                    break;
                                                case "minlen":
                                                    if (_.includes([null, ""], validator.parameter) || Number(validator.parameter) != validator.parameter) reject("لطفا برای اعتبار سنجی حداقل طول کاراکتر یک عدد وارد کنید.");
                                                    if (_.has(seeValidations, "maxlen") && Number(seeValidations["maxlen"]) == seeValidations["maxlen"] && Number(validator.parameter) > Number(seeValidations["maxlen"])) reject("لطفا برای اعتبار سنجی حداقل طول کاراکترمقداری کمتر از مقدار حداکثر طول کاراکتر انتخاب کنید.");
                                                    break;
                                                case "maxlen":
                                                    if (_.includes([null, ""], validator.parameter) || Number(validator.parameter) != validator.parameter) reject("لطفا برای اعتبار سنجی حداکثر طول کاراکتر یک عدد وارد کنید.");
                                                    if (_.has(seeValidations, "min") && Number(seeValidations["min"]) == seeValidations["min"] && Number(validator.parameter) < Number(seeValidations["min"])) reject("لطفا برای اعتبار سنجی حداکثر طول کاراکترمقداری کمتر از مقدار حداقلی طول کاراکتر انتخاب کنید.");
                                                    break;
                                            }
                                        }
                                    }
                                }
                                resolve(true);
                            } catch (e) {
                                reject(e);
                            }
                        });
                    };

                    $scope.func.cancel = function () {
                        return $uibModalInstance.close(false);
                    };

                    $scope.func.run = function () {
                        if (!editOrCreate) {
                            if (_.has(metadata, 'property') && _.isArray(metadata.property)) {
                                for (var i = 0; i < metadata.property.length; i++) {
                                    if (_.has(metadata.property[i], 'SelectOption')) {
                                        if (_.has(metadata.property[i].SelectOption, 'static') && _.isArray(metadata.property[i].SelectOption.static)) {
                                            for (var j = 0; j < metadata.property[i].SelectOption.static.length; j++) {
                                                metadata.property[i].SelectOption.static[j].selected = _.isString(metadata.property[i].SelectOption.static[j].selected) ? "true" == metadata.property[i].SelectOption.static[j].selected : metadata.property[i].SelectOption.static[j].selected;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };

                    $scope.func.run();

                    $scope.$on("$destroy", function () {

                        try {
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _context2.prev = 0;
                                                    _context2.next = 3;
                                                    return JS.removeJS(src, funcName);

                                                case 3:
                                                    _context2.next = 8;
                                                    break;

                                                case 5:
                                                    _context2.prev = 5;
                                                    _context2.t0 = _context2['catch'](0);

                                                    console.error(_context2.t0);

                                                case 8:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, undefined, [[0, 5]]);
                                }));

                                return function (_x, _x2) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                            // clear all data and functions
                            $scope.func = undefined;
                            $scope.data = undefined;
                            $scope.formGeneratorName = undefined;
                        } catch (e) {
                            console.error(e);
                        }
                    });
                },
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    service: function service() {
                        return _service;
                    },
                    JS: function JS() {
                        return _JS;
                    },
                    metadata: function metadata() {
                        return _metadata;
                    },
                    editOrCreate: function editOrCreate() {
                        return _editOrCreate;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                if (response) resolve(response);else reject('انصراف');
            }, function (error) {
                return reject('انصراف');
            });
        } catch (e) {
            reject(e);
        }
    });
};