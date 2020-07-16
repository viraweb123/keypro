'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var simpleGenerateTableSimpleCtrl = function simpleGenerateTableSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.simpleGenerateTable = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';

                                    $scope.data.itemsPagination.totalItems = _.clone(res.total);
                                    $scope.data.total = res.total;
                                    simpleService.PropertyGroup.forId($scope.data.treefrequency.currentNode.name, _.map(res.list, function (item) {
                                        return item[Object.keys(item)[0]].uuid;
                                    })).then(function (result) {
                                        try {
                                            var r = _.keyBy(_.map(res.list, function (i) {
                                                var k = _.first(Object.keys(i));
                                                var v = i[k];
                                                v['type'] = k;
                                                return v;
                                            }), 'uuid');
                                            var array = [];
                                            var headers = {};

                                            _.forEach(r, function (value, key) {

                                                var item = {};
                                                _.forEach(result.data[0].originalElement[key], function (v) {
                                                    switch (v.objClass) {
                                                        case 'com.openkm.bean.form.Input':
                                                            if (v.type == "date") {
                                                                item[v.name] = {};
                                                                miladiToJalaliFunction(v.value).then(function (res) {
                                                                    return item[v.name].value = res;
                                                                }, function (error) {
                                                                    return item[v.name].value = v.value;
                                                                });
                                                            } else item[v.name] = {
                                                                value: v.value
                                                            };
                                                            break;
                                                        case 'com.openkm.bean.form.Select':
                                                            if (_.has(v, 'options') && _.isArray(v.options) && v.options.length > 0) {
                                                                try {
                                                                    item[v.name] = {
                                                                        value: _.join(_.map(_.filter(v.options, function (option) {
                                                                            return option.selected;
                                                                        }), 'label'), ',')
                                                                    };
                                                                } catch (e) {
                                                                    item[v.name] = {
                                                                        value: v.value
                                                                    };
                                                                }
                                                            }
                                                            break;
                                                        case 'com.openkm.bean.form.TextArea':
                                                            item[v.name] = {
                                                                value: v.value
                                                            };
                                                            break;
                                                        case 'com.openkm.bean.form.CheckBox':
                                                            if (_.includes([true, "true", 1, false, "false", 0], v.value)) item[v.name] = {
                                                                icon: _.includes([true, "true", 1], v.value) ? 'fa-check' : 'fa-remove'
                                                            };
                                                            break;
                                                    }

                                                    headers[v.name] = v.label;
                                                });
                                                array.push({
                                                    list: item,
                                                    value: _.clone(value),
                                                    type: value.mimeType ? 'fa-file' : 'fa-folder'
                                                });
                                            });
                                            $scope.data.list = _.clone(array);
                                            array = undefined;
                                            $scope.data.headers = _.clone(headers);
                                            headers = undefined;
                                            r = undefined;
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }, function (error) {
                                        return console.error(error);
                                    });
                                    _context.next = 12;
                                    break;

                                case 9:
                                    _context.prev = 9;
                                    _context.t0 = _context['catch'](0);

                                    console.error(_context.t0);

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 9]]);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }();
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};