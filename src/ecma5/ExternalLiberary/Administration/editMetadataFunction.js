'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var editMetadataFunction = function editMetadataFunction(uibModal, _service, _JS, _metadata, _editOrCreate) {
    return new Promise(function (resolve, reject) {
        try {
            var modalInstance = uibModal.open({
                templateUrl: 'ecma5/ExternalLiberary/Administration/editMetadataFunction.html?dev=' + randomVersionName,
                controller: function controller($scope, $uibModalInstance, $translate, toaster, service, JS, metadata, editOrCreate) {

                    $scope.FORM = {};

                    $scope.data = {

                        ID: 0,

                        editOrCreate: editOrCreate,
                        metadata: _.clone(metadata),

                        fileTypes: ['input', 'select', 'checkbox', 'textarea'],
                        inputContains: ['text', 'date', 'number', 'link', 'email'], //'folder',
                        selectOptionsType: ['static', 'dynamic'],
                        selectType: ['simple', 'multiple'],
                        validType: ['req', 'alpha', 'maxlen', 'minlen', 'regexp', 'min', 'max', 'defaultValue'], //'num',

                        types: {
                            'simple': ['req', 'defaultValue'],
                            'multiple': ['req', 'defaultValue'],
                            'text': ['req', 'alpha', 'maxlen', 'minlen', 'regexp', 'date', 'defaultValue'],
                            'date': ['req', 'defaultValue'],
                            'number': ['req', 'regexp', 'min', 'max', 'defaultValue'],
                            'link': ['req', 'regexp', 'maxlen', 'minlen', 'defaultValue'],
                            //'folder' : ['req','regexp','maxlen','minlen'],
                            'email': ['req', 'regexp', 'maxlen', 'minlen', 'defaultValue']
                        },

                        patterns: {
                            'maxlen': new RegExp('(?:(?=(^[1-9][0-9]*$)))', 'g'),
                            'minlen': new RegExp('(?:(?=(^[1-9][0-9]*$)))', 'g'),
                            'min': new RegExp('(?:(?=(^[1-9][0-9]*$)))', 'g'),
                            'max': new RegExp('(?:(?=(^[1-9][0-9]*$)))', 'g'),
                            'alpha': /[\w|\W]*/, //new RegExp('(?:(?=(^[\w|\W]+$)))','g'),
                            'regexp': /[\w|\W]*/, //new RegExp('(?:(?=(^[\w|\W]+$)))','g'),
                            'req': /[\w|\W]*/, //new RegExp('(?:(?=(^[\w|\W]+$)))','g'),
                            /*
                            'date'   :  new RegExp(`(?:${[
                                '(?=(^([0-9]{2,4})\/(0[1-9]|[1-9]|1[0-2])\/([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$))',
                                '(?=(^([0-9]{2,4})\-(0[1-9]|[1-9]|1[0-2])\-([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$))',
                                '(?=(^([0-9]{2,4})\:(0[1-9]|[1-9]|1[0-2])\:([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$))',
                                '(?=(^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|[1-9]|1[0-2])\/([0-9]{2,4})$))',
                                '(?=(^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])\-(0[1-9]|[1-9]|1[0-2])\-([0-9]{2,4})$))',
                                '(?=(^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])\:(0[1-9]|[1-9]|1[0-2])\:([0-9]{2,4})$))'
                            ].join('|')})`, 'g')
                            */
                            'defaultValue': /^[^\s][\w|\W]+/gi
                        },

                        requires: {
                            'maxlen': true,
                            'minlen': true,
                            'min': true,
                            'max': true,
                            'alpha': false,
                            'regexp': false,
                            'req': false,
                            'defaultValue': true
                        },

                        selectedProperties: null,

                        regexpsList: [{
                            value: 'thesaurus',
                            label: 'تزاروس'
                        }, {
                            value: 'ltr',
                            label: 'چپ به راست'
                        }, {
                            value: '([+]?(\(\d{1,3}\)|\d{1,3})?[-]?|0)?[1-9]\d{9}',
                            label: 'موبایل'
                        }, {
                            value: '[0-9]{1,}',
                            label: 'حداقل یک عدد'
                        }, {
                            value: '([0-9]{2,4})\/(0[1-9]|[1-9]|1[0-2])\/([1-9]|0[1-9]|[1-2][0-9]|3[0-1])',
                            label: 'تاریخ'
                        }]

                    };

                    /*todo
                    all date type
                    [
                        '(?=(^([0-9]{2,4})\/(0[1-9]|[1-9]|1[0-2])\/([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$))',
                        '(?=(^([0-9]{2,4})\-(0[1-9]|[1-9]|1[0-2])\-([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$))',
                        '(?=(^([0-9]{2,4})\:(0[1-9]|[1-9]|1[0-2])\:([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$))',
                        '(?=(^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|[1-9]|1[0-2])\/([0-9]{2,4})$))',
                        '(?=(^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])\-(0[1-9]|[1-9]|1[0-2])\-([0-9]{2,4})$))',
                        '(?=(^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])\:(0[1-9]|[1-9]|1[0-2])\:([0-9]{2,4})$))'
                    ].join('|')*/

                    /*
                    `(?:${[
                         '(?=(^([0-9]{2,4})\/(0[1-9]|[1-9]|1[0-2])\/([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$))',
                         '(?=(^([0-9]{2,4})\-(0[1-9]|[1-9]|1[0-2])\-([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$))',
                         '(?=(^([0-9]{2,4})\:(0[1-9]|[1-9]|1[0-2])\:([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$))',
                         '(?=(^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|[1-9]|1[0-2])\/([0-9]{2,4})$))',
                         '(?=(^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])\-(0[1-9]|[1-9]|1[0-2])\-([0-9]{2,4})$))',
                         '(?=(^([1-9]|0[1-9]|[1-2][0-9]|3[0-1])\:(0[1-9]|[1-9]|1[0-2])\:([0-9]{2,4})$))'
                     ].join('|')})`,
                     */

                    $scope.func = {};

                    $scope.func.moveTo = function (array, from, to) {
                        return new Promise(function (res, rej) {
                            var cloneArray = angular.copy(array);
                            try {
                                array.splice(to, 0, array.splice(from, 1)[0]);
                                res(array);
                            } catch (e) {
                                res(angular.copy(cloneArray));
                            } finally {
                                cloneArray = undefined;
                            }
                        });
                    };
                    $scope.func.goLastSelect = function () {
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee($index) {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return $scope.func.moveTo($scope.data.selectedProperty.SelectOption.static, $index, $scope.data.selectedProperty.SelectOption.static.length - 1);

                                        case 3:
                                            $scope.data.selectedProperty.SelectOption.static = _context.sent;
                                            _context.next = 9;
                                            break;

                                        case 6:
                                            _context.prev = 6;
                                            _context.t0 = _context['catch'](0);

                                            console.error(_context.t0);

                                        case 9:
                                            _context.prev = 9;

                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            return _context.finish(9);

                                        case 12:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined, [[0, 6, 9, 12]]);
                        }));

                        return function (_x) {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    $scope.func.goDownSelect = function () {
                        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2($index) {
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.prev = 0;

                                            if (!($index < $scope.data.selectedProperty.SelectOption.static.length - 1)) {
                                                _context2.next = 5;
                                                break;
                                            }

                                            _context2.next = 4;
                                            return $scope.func.moveTo($scope.data.selectedProperty.SelectOption.static, $index, $index + 1);

                                        case 4:
                                            $scope.data.selectedProperty.SelectOption.static = _context2.sent;

                                        case 5:
                                            _context2.next = 10;
                                            break;

                                        case 7:
                                            _context2.prev = 7;
                                            _context2.t0 = _context2['catch'](0);

                                            console.error(_context2.t0);

                                        case 10:
                                            _context2.prev = 10;

                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            return _context2.finish(10);

                                        case 13:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, undefined, [[0, 7, 10, 13]]);
                        }));

                        return function (_x2) {
                            return _ref2.apply(this, arguments);
                        };
                    }();
                    $scope.func.goTopSelect = function () {
                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3($index) {
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.prev = 0;
                                            _context3.next = 3;
                                            return $scope.func.moveTo($scope.data.selectedProperty.SelectOption.static, $index, 0);

                                        case 3:
                                            $scope.data.selectedProperty.SelectOption.static = _context3.sent;
                                            _context3.next = 9;
                                            break;

                                        case 6:
                                            _context3.prev = 6;
                                            _context3.t0 = _context3['catch'](0);

                                            console.error(_context3.t0);

                                        case 9:
                                            _context3.prev = 9;

                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            return _context3.finish(9);

                                        case 12:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, undefined, [[0, 6, 9, 12]]);
                        }));

                        return function (_x3) {
                            return _ref3.apply(this, arguments);
                        };
                    }();
                    $scope.func.goUpSelect = function () {
                        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4($index) {
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:
                                            _context4.prev = 0;

                                            if (!($index > 0)) {
                                                _context4.next = 5;
                                                break;
                                            }

                                            _context4.next = 4;
                                            return $scope.func.moveTo($scope.data.selectedProperty.SelectOption.static, $index, $index - 1);

                                        case 4:
                                            $scope.data.selectedProperty.SelectOption.static = _context4.sent;

                                        case 5:
                                            _context4.next = 10;
                                            break;

                                        case 7:
                                            _context4.prev = 7;
                                            _context4.t0 = _context4['catch'](0);

                                            console.error(_context4.t0);

                                        case 10:
                                            _context4.prev = 10;

                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            return _context4.finish(10);

                                        case 13:
                                        case 'end':
                                            return _context4.stop();
                                    }
                                }
                            }, _callee4, undefined, [[0, 7, 10, 13]]);
                        }));

                        return function (_x4) {
                            return _ref4.apply(this, arguments);
                        };
                    }();

                    $scope.func.getSelectedItemsIncluding = function (list, item) {
                        item.selected = true;
                        return list.items.filter(function (item) {
                            return item.selected;
                        });
                    };
                    $scope.func.onDragstart = function (list, event) {

                        list.dragging = true;
                        if (event.dataTransfer.setDragImage) {
                            var img = new Image();
                            img.src = 'static/img/_smallblank.png';
                            event.dataTransfer.setDragImage(img, 0, 0, 50, 50);
                        }
                    };
                    $scope.func.onDrop = function (list, items, index) {
                        angular.forEach(items, function (item) {
                            item.selected = false;
                        });
                        list.items = list.items.slice(0, index).concat(items).concat(list.items.slice(index));
                        return true;
                    };
                    $scope.func.onMoved = function (list) {
                        list.items = list.items.filter(function (item) {
                            return !item.selected;
                        });
                    };

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

                    /*todo property public functions **/
                    $scope.func.editProperty = function (property, index) {
                        _.defer(function () {
                            try {
                                property.selected = false;
                                if ($scope.data.selectedProperty != null && $scope.data.selectedProperty.id == property.id) $scope.data.selectedProperty = null;else $scope.data.selectedProperty = angular.copy(property);
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            } catch (e) {
                                console.error(e);
                            }
                        }, 100);
                    };
                    $scope.func.saveProperty = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                        var index, isSelected;
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                                switch (_context5.prev = _context5.next) {
                                    case 0:
                                        index = _.findIndex($scope.data.models[0].items, function (item) {
                                            return item.id == $scope.data.selectedProperty.id;
                                        });
                                        _context5.prev = 1;
                                        _context5.next = 4;
                                        return $scope.func.checkValidation($scope.data.selectedProperty, 'formGeneratorProperty');

                                    case 4:
                                        try {
                                            $('li#metadata-' + index).removeClass("isErrorInProperties");
                                        } catch (e) {
                                            console.error(e);
                                        }

                                        isSelected = _.clone($scope.data.models[0].items[index].selected);

                                        $scope.data.models[0].items[index] = angular.copy($scope.data.selectedProperty);
                                        $scope.data.models[0].items[index].selected = isSelected;
                                        toaster.pop("success", "", "ویژگی تغییر یافت.");
                                        $scope.data.selectedProperty = null;

                                        _context5.next = 15;
                                        break;

                                    case 12:
                                        _context5.prev = 12;
                                        _context5.t0 = _context5['catch'](1);

                                        toaster.pop("error", "", _context5.t0 || _context5.t0.message);
                                        /*try{
                                            $(`li#metadata-${index}`).addClass("isErrorInProperties");
                                        }catch(e){
                                            console.error(e);
                                        }*/

                                    case 15:
                                        _context5.prev = 15;

                                        try {
                                            $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                        } catch (e) {
                                            console.error(e);
                                        }

                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        return _context5.finish(15);

                                    case 19:
                                    case 'end':
                                        return _context5.stop();
                                }
                            }
                        }, _callee5, undefined, [[1, 12, 15, 19]]);
                    }));

                    $scope.func.changeRegexp = function (opt, value) {
                        try {
                            opt.parameter = value;

                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };

                    $scope.func.checkValidation = function (property, formName) {
                        return new Promise(function (resolve, reject) {
                            try {
                                var form = $scope.FORM[formName];
                                if (_.has(form.$error, 'required') && _.isArray(form.$error.required) && form.$error.required.length > 0) {
                                    if (form.$invalid) {
                                        _.forEach(form.$error, function (field) {
                                            _.forEach(field, function (errorField) {
                                                return errorField.$setTouched();
                                            });
                                        });
                                    }
                                    reject('لطفا فیلد های اجباری را پر کنید');
                                } else if (_.has(form.$error, 'pattern') && _.isArray(form.$error.pattern) && form.$error.pattern.length > 0) {
                                    reject('لطفا الگوهای درست وارد کنید');
                                }

                                if (property.isNew && _.findIndex(_.map(_.filter($scope.data.models[0].items, function (item) {
                                    return item.id != property.id;
                                }), 'name'), function (name) {
                                    return name == property.name;
                                }) >= 0) reject("لطفا یک نام برای فراداده انتخاب کنید.");

                                //if(_.findIndex(_(property.validator).groupBy('type').map((items, type) => ({ type, count: items.length })).value(),v=>v.count>1)>=0)
                                if (_.findIndex(_(_.filter(property.validator, function (v) {
                                    return v.type != 'regexp';
                                })).groupBy('type').map(function (items, type) {
                                    return { type: type, count: items.length };
                                }).value(), function (v) {
                                    return v.count > 1;
                                }) >= 0) reject("لطفا از هر اعتبار سنجی فقط یک مورد را انتخاب کنید.");

                                switch (property.fieldType) {
                                    case 'select':
                                        if (property.SelectOptionsType == "static") {
                                            if (property.SelectOption.static.length == 0) {
                                                reject("لطفا حداقل یک مورد در قسمت گزینه ها درج کنید.");
                                            } else if (_.findIndex(_(property.SelectOption.static).groupBy('value').map(function (items, value) {
                                                return { value: value, count: items.length };
                                            }).value(), function (v) {
                                                return v.count > 1;
                                            }) >= 0) {
                                                reject("لطفا درقسمت ویژگی ها مقدار یکسان وارد نکنید .");
                                            }
                                            /*todo check labels is unique
                                            else if(_.findIndex(_(property.SelectOption.static).groupBy('label').map((items, label) => ({ label, count: items.length })).value(),v=>v.count>1)>=0){
                                                reject("لطفا درقسمت ویژگی ها برچسب یکسان وارد نکنید .");
                                            }*/
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                resolve(true);
                            } catch (e) {
                                reject("مشکلات را برطرف کنید.");
                            }
                        });
                    };
                    $scope.func.removeProperty = function (property) {
                        try {

                            if ($scope.data.selectedProperty != null && $scope.data.selectedProperty.id == property.id) $scope.data.selectedProperty = null;
                            _.remove($scope.data.models[0].items, function (p) {
                                return p.id == property.id;
                            });
                            toaster.pop("success", "", "ویژگی حذف گردید.");
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.cancelEditProperty = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
                        return regeneratorRuntime.wrap(function _callee6$(_context6) {
                            while (1) {
                                switch (_context6.prev = _context6.next) {
                                    case 0:
                                        $scope.data.selectedProperty = null;
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        /*try {
                                            await $scope.func.checkValidation($scope.data.selectedProperty, 'formGeneratorProperty');
                                            $(`li#metadata-${_.findIndex($scope.data.models[0].items,p=>p.id == $scope.data.selectedProperty.id)}`).removeClass("isErrorInProperties");
                                        }catch(e){
                                            $(`li#metadata-${_.findIndex($scope.data.models[0].items,p=>p.id == $scope.data.selectedProperty.id)}`).addClass("isErrorInProperties");
                                        }finally{
                                            $scope.data.selectedProperty = null;
                                            _.defer(()=>$scope.$apply());
                                        }*/

                                    case 2:
                                    case 'end':
                                        return _context6.stop();
                                }
                            }
                        }, _callee6, undefined);
                    }));

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
                        while (_.findIndex($scope.data.models[0].items, function (property) {
                            return property.name == name;
                        }) >= 0) {
                            name = 'new_Property' + i++;
                        }$scope.data.models[0].items.push({
                            id: 'metadata-' + $scope.data.models[0].items.length,
                            isNew: true,
                            label: name,
                            name: name,
                            readonly: false,
                            width: '',
                            height: '',
                            fieldType: 'input',
                            InputContains: 'text',
                            suggestedboxTableName: '',
                            suggestedboxFilterQuery: '',
                            suggestedboxValueQuery: '',
                            suggestedboxDialogTitle: '',
                            suggestedboxFilterMinLen: '',
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
                            try {
                                $scope.$apply($(".multiDemo").animate({ scrollTop: $('li#metadata-' + ($scope.data.models[0].items.length - 1)).offset().top }, 1000));
                            } catch (e) {
                                console.error(e);
                            } finally {
                                $scope.func.editProperty($scope.data.models[0].items[$scope.data.models[0].items.length - 1]);
                            }
                        }, 50);
                    };

                    $scope.func.ok = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
                        var form;
                        return regeneratorRuntime.wrap(function _callee7$(_context7) {
                            while (1) {
                                switch (_context7.prev = _context7.next) {
                                    case 0:
                                        _context7.prev = 0;
                                        form = $scope.FORM['formGeneratorName'];

                                        if (!(_.has(form.$error, 'required') && _.isArray(form.$error.required) && form.$error.required.length > 0)) {
                                            _context7.next = 8;
                                            break;
                                        }

                                        if (form.$invalid) {
                                            _.forEach(form.$error, function (field) {
                                                _.forEach(field, function (errorField) {
                                                    return errorField.$setTouched();
                                                });
                                            });
                                        }
                                        toaster.pop("error", "", "لطفا فیلد های اجباری را پر کنید");
                                        return _context7.abrupt('return');

                                    case 8:
                                        if (!(_.has(form.$error, 'pattern') && _.isArray(form.$error.pattern) && form.$error.pattern.length > 0)) {
                                            _context7.next = 13;
                                            break;
                                        }

                                        toaster.pop("error", "", 'لطفا الگوهای درست وارد کنید');
                                        return _context7.abrupt('return');

                                    case 13:
                                        if (!($scope.data.models[0].items.length == 0)) {
                                            _context7.next = 16;
                                            break;
                                        }

                                        toaster.pop("error", "", 'فراداده فاقد ویژگی است.');
                                        return _context7.abrupt('return');

                                    case 16:

                                        try {
                                            _.map($scope.data.models[0].items, function (property) {
                                                property.selected = false;
                                            });
                                            _.map($scope.data.models[0].items, function (p) {
                                                if (_.has(p, 'isNew')) {
                                                    p.isNew = undefined;
                                                    delete p.isNew;
                                                }
                                                return p;
                                            });

                                            $scope.data.metadata.property = angular.copy($scope.data.models[0].items);
                                            $uibModalInstance.close($scope.data.metadata);
                                        } catch (e) {
                                            console.error(e);
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            toaster.pop("error", "", e);
                                        }
                                        _context7.next = 22;
                                        break;

                                    case 19:
                                        _context7.prev = 19;
                                        _context7.t0 = _context7['catch'](0);

                                        console.error(_context7.t0);

                                    case 22:
                                    case 'end':
                                        return _context7.stop();
                                }
                            }
                        }, _callee7, undefined, [[0, 19]]);
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
                        _.map(metadata.property, function (property) {
                            return property.selected = false;
                        });
                        $scope.data.models = [{ listName: "لیست ویژگی ها", items: _.clone(metadata.property), dragging: false }];
                    };
                    $scope.func.run();
                    $scope.$on("$destroy", function () {

                        try {
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                        while (1) {
                                            switch (_context8.prev = _context8.next) {
                                                case 0:
                                                    _context8.prev = 0;
                                                    _context8.next = 3;
                                                    return JS.removeJS(src, funcName);

                                                case 3:
                                                    _context8.next = 8;
                                                    break;

                                                case 5:
                                                    _context8.prev = 5;
                                                    _context8.t0 = _context8['catch'](0);

                                                    console.error(_context8.t0);

                                                case 8:
                                                case 'end':
                                                    return _context8.stop();
                                            }
                                        }
                                    }, _callee8, undefined, [[0, 5]]);
                                }));

                                return function (_x5, _x6) {
                                    return _ref8.apply(this, arguments);
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