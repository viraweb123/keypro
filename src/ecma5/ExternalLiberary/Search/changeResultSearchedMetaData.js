'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var changeResultSearchedMetaData = function changeResultSearchedMetaData(uibModal, _query, _filters, advanceService, _JS) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Search/changeResultSearchedMetaData.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, query, filters, service, propertyGroup, JS) {

                $scope.FORM = {};

                $scope.data = {
                    properties: [],

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
                    }

                };
                $scope.func = {};
                $scope.func.ok = function () {
                    return $uibModalInstance.close(true);
                };
                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.selectTreeThezarus = function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(property, index) {
                        var response;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.prev = 0;
                                        _context.prev = 1;
                                        _context.next = 4;
                                        return JS.addJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js?dev=' + randomVersionName);

                                    case 4:
                                        _context.next = 6;
                                        return JS.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                    case 6:
                                        _context.next = 8;
                                        return selectThesaurusChild($uibModalInstance, //modal func
                                        service.repository, //repository service
                                        'getThesaurusFolder', // rootPath
                                        service.folder, // folder service
                                        "thesaurus", getNameFromPath);

                                    case 8:
                                        response = _context.sent;


                                        if (_.has(response, 'addNode') && !_.isEmpty(response.addNode)) property.value = response.addNode.label;

                                        _context.next = 12;
                                        return JS.removeJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName, 'getNameFromPath');

                                    case 12:
                                        _context.next = 14;
                                        return JS.removeJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js?dev=' + randomVersionName, 'selectThesaurusChild');

                                    case 14:

                                        _.defer(function () {
                                            return $scope.$apply();
                                        });

                                        _context.next = 20;
                                        break;

                                    case 17:
                                        _context.prev = 17;
                                        _context.t0 = _context['catch'](1);

                                        console.error(_context.t0);

                                    case 20:
                                        _context.next = 25;
                                        break;

                                    case 22:
                                        _context.prev = 22;
                                        _context.t1 = _context['catch'](0);

                                        console.error(_context.t1);

                                    case 25:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this, [[0, 22], [1, 17]]);
                    }));

                    return function (_x, _x2) {
                        return _ref.apply(this, arguments);
                    };
                }();

                $scope.changeDate = function (property, index) {
                    try {} catch (e) {
                        console.error(e);
                    }
                };
                $scope.selectSingleSelected = function (index) {
                    try {
                        if ($scope.data.properties[index].selected != null) {
                            _.forEach($scope.data.properties[index].options, function (option) {
                                if ($scope.data.properties[index].selected.label == option.label) {
                                    option.selected = true;
                                } else option.selected = false;
                            });
                        } else _.forEach($scope.data.properties[index].options, function (option) {
                            option.selected = false;
                        });

                        if (_.has($scope.data.properties[index], 'childName')) {
                            var ind = _.findIndex($scope.data.properties, function (p) {
                                return _.has(p, 'parentName') && p.parentName == $scope.data.properties[index].name;
                            });
                            if (ind >= 0) {
                                try {
                                    $scope.data.properties[ind].options = [];
                                    $scope.data.properties[ind].selected = null;
                                    for (var i = 0; i < $scope.data.properties[ind].allOptions.length; i++) {
                                        $scope.data.properties[ind].allOptions[i].selected = false;
                                        if ($scope.data.properties[ind].allOptions[i].value.startsWith($scope.data.properties[index].selected.value)) $scope.data.properties[ind].options.push(_.clone($scope.data.properties[ind].allOptions[i]));
                                    }
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };
                $scope.selectMultiSelected = function (index) {
                    return new Promise(function (resolve, reject) {
                        var i = _.findIndex($scope.data.properties[index].selected, function (s) {
                            return s.selected != true;
                        });
                        if (i >= 0) {
                            // TODO element added
                            var optionIndex = _.findIndex($scope.data.properties[index].options, function (option) {
                                return option.value == $scope.data.properties[index].selected[i].value;
                            });
                            try {
                                $scope.data.properties[index].options[optionIndex].selected = true;
                                resolve();
                            } catch (e) {
                                console.error(e);
                                reject();
                            }
                        } else {
                            // TODO element removed
                            var _optionIndex = _.findIndex($scope.data.properties[index].options, function (option) {
                                return option.selected == true && !_.includes(_.map($scope.data.properties[index].selected, 'value'), option.value);
                            });
                            try {
                                $scope.data.properties[index].options[_optionIndex].selected = false;
                                resolve();
                            } catch (e) {
                                console.error(e);
                                reject();
                            }
                        }
                    });
                };
                $scope.CheckboxChange = function (property, index) {};
                $scope.addElement = function (property, form, index) {
                    /*
                     if(_.has(form[property.name],'$setTouched'))
                     form[property.name].$setTouched();
                     */
                };
                $scope.func.dateFormatInternalCreateQuery = function (date) {
                    return _.isDate(date) ? '' + String(date.getFullYear()) + (String(date.getMonth() + 1).length == 1 ? "0" + String(date.getMonth() + 1) : String(date.getMonth() + 1)) + (String(date.getDate()).length == 1 ? "0" + String(date.getDate()) : String(date.getDate())) + (String(date.getHours()).length == 1 ? "0" + String(date.getHours()) : String(date.getHours())) + (String(date.getMinutes()).length == 1 ? "0" + String(date.getMinutes()) : String(date.getMinutes())) + (String(date.getSeconds()).length == 1 ? "0" + String(date.getSeconds()) : String(date.getSeconds())) : null;
                };
                $scope.func.parseArabic = function (str) {
                    return str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
                        return d.charCodeAt(0) - 1632;
                    }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
                        return d.charCodeAt(0) - 1776;
                    });
                };

                $scope.func.edit = function () {
                    try {
                        var updates = "";
                        for (var i = 0; i < $scope.data.properties.length; i++) {
                            if (_.has($scope.data.properties[i], 'isEdit')) {
                                switch ($scope.data.properties[i].objClass) {
                                    case 'com.openkm.bean.form.Input':
                                        if ($scope.data.properties[i].type == 'date') {
                                            try {
                                                var date = _.isDate($scope.data.properties[i].value) ? $scope.func.dateFormatInternalCreateQuery($scope.data.properties[i].value) : $scope.data.properties[i].oldValue;
                                                if (date != $scope.data.properties[i].oldValue) {
                                                    var d = _.isDate($scope.data.properties[i].value) ? $scope.data.properties[i].valued.toISOString() : /^\d{14}$/i.test($scope.data.properties[i].oldValue) ? new Date($scope.data.properties[i].oldValue.substr(0, 4), $scope.data.properties[i].oldValue.substr(4, 2), $scope.data.properties[i].oldValue.substr(6, 2)).toISOString() : null;
                                                    updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + d + '&';
                                                }
                                            } catch (e) {
                                                updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + $scope.data.properties[i].oldValue + '&';
                                            }
                                        } else if ($scope.data.properties[i].type == 'text' && $scope.data.properties[i].value != $scope.data.properties[i].oldValue) updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + $scope.data.properties[i].value + '&';
                                        break;
                                    case 'com.openkm.bean.form.Select':
                                        if ($scope.data.properties[i].type == 'simple' && $scope.data.properties[i].selected.value != $scope.data.properties[i].oldValue.value) updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + String('["' + $scope.data.properties[i].selected.value + '"]') + '&';
                                        //updates += `propertyUpd=${$scope.data.properties[i].name}=${$scope.data.properties[i].selected.value}&`;
                                        else if ($scope.data.properties[i].type == 'multiple' && !_.isEqual(_.map(_.map($scope.data.properties[i].selected, 'value'), _.toString).sort(), _.map(_.map($scope.data.properties[i].oldValue, 'value'), _.toString).sort())) updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + String('[' + _.map(_.map($scope.data.properties[i].selected, 'value'), function (v) {
                                                return '"' + v + '"';
                                            }) + ']') + '&';
                                        break;
                                    case 'com.openkm.bean.form.CheckBox':
                                    case 'com.openkm.bean.form.TextArea':
                                        if (String($scope.data.properties[i].value) != String($scope.data.properties[i].oldValue)) updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + $scope.data.properties[i].value + '&';
                                        break;
                                }
                            } else {
                                /*TODO not value first time */
                                switch ($scope.data.properties[i].objClass) {
                                    case 'com.openkm.bean.form.Input':
                                        if (!_.includes([null, ""], _.trim($scope.data.properties[i].value))) {
                                            if ($scope.data.properties[i].type == 'date') {
                                                try {
                                                    if (_.isDate($scope.data.properties[i].value)) updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + $scope.data.properties[i].value.toISOString() + '&';
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                            } else if ($scope.data.properties[i].type == 'text') updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + $scope.data.properties[i].value + '&';
                                        }
                                        break;
                                    case 'com.openkm.bean.form.Select':
                                        if ($scope.data.properties[i].type == 'simple' && _.has($scope.data.properties[i], 'selected')) updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + String('["' + $scope.data.properties[i].selected.value + '"]') + '&';
                                        //updates += `propertyUpd=${$scope.data.properties[i].name}=${$scope.data.properties[i].selected.value}&`;
                                        else if ($scope.data.properties[i].type == 'multiple' && _.has($scope.data.properties[i], 'selected')) updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + String('[' + _.map(_.map($scope.data.properties[i].selected, 'value'), function (v) {
                                                return '"' + v + '"';
                                            }) + ']') + '&';
                                        break;
                                    case 'com.openkm.bean.form.CheckBox':
                                        if ($scope.data.properties[i].value == true) updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + $scope.data.properties[i].value + '&';
                                        break;
                                    case 'com.openkm.bean.form.TextArea':
                                        if (!_.includes([null, ""], _.trim($scope.data.properties[i].value))) updates += 'propertyUpd=' + $scope.data.properties[i].name + '=' + $scope.data.properties[i].value + '&';
                                        break;
                                }
                            }
                        }
                        /**TODO start send Data To Server */
                        if (updates == "") {
                            toaster.pop('error', '', 'لطفا حداقل یک فراداده را تغییر دهید.');
                        } else {
                            var q = _.clone(query);
                            q += '&' + updates;
                            if (q.endsWith("&")) q = q.slice(0, q.length - 1);
                            service.search.changeAllSelectedproperty(q).then(function (res) {
                                return $scope.func.ok();
                            }, function (err) {
                                return $scope.func.cancel();
                            });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.run = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    $scope.data.properties = _.clone(propertyGroup.data.properties);

                                case 1:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this);
                }));

                $scope.func.run();
            },
            size: 'md',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                JS: function JS() {
                    return _JS;
                },
                query: function query() {
                    return _query;
                },
                filters: function filters() {
                    return _.keyBy(_(_.filter(_filters, function (filter, k) {
                        return filter.type == "smetadata";
                    })).groupBy('key').map(function (val, key) {
                        return { 'key': key, 'value': _.join(_.map(val, 'value'), ',') };
                    }).value(), 'key');
                },
                service: function service() {
                    return advanceService;
                },
                propertyGroup: function propertyGroup() {
                    return advanceService.PropertyGroup.form({ name: _.split(_.filter(_filters, function (filter, key) {
                            return filter.type == "smetadata";
                        })[0].key, ".")[0] }).then(function (res) {
                        return res;
                    });
                }
            }
        });
        //var d = { 'a' : { k:'a.a' , v : 'aa' , t : 's' } , 'b' : { k:'a.b' , v : 'ab', t : 's' } , 'c' : { k:'a.c' , v : 'ac' , t : 't'} , 'd' : { k:'a.a' , v : 'aa' , t : 's'} }
        //_.keyBy(_( _.filter(d,(v,k)=>v.t =='s')).groupBy('k').map( (v,k)=> ({ 'k' : k , 'v' : _.join(_.map(v,'v'),',')  } ) ).value(),'k')

        modalInstance.result.then(function (response) {
            if (response) resolve('تغییرات با موفقیت اعمال شد.');else reject('انصراف از اعمال تغییر کلی');
        }, function (error) {
            return reject('انصراف از اعمال تغییر کلی');
        });
    });
};