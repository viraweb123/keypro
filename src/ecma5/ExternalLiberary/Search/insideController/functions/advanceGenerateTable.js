'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advanceGenerateTableAdvanceCtrl = function advanceGenerateTableAdvanceCtrl($scope, advanceService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.advanceGenerateTable = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(res, metadata) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';

                                    advanceService.PropertyGroup.forId(metadata, _.map(res.list, function (item) {
                                        return item[Object.keys(item)[0]].uuid;
                                    })).then(function (result) {
                                        $scope.data.showType = "table";
                                        try {
                                            var r = _.keyBy(_.map(res.list, function (i) {
                                                var k = _.first(Object.keys(i));var v = i[k];v['type'] = k;return v;
                                            }), 'uuid');
                                            var array = [];
                                            var headers = {};
                                            _.forEach(r, function (value, key) {
                                                var item = {};
                                                _.forEach(result.data[0].originalElement[key], function () {
                                                    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(v) {
                                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                                            while (1) {
                                                                switch (_context.prev = _context.next) {
                                                                    case 0:
                                                                        _context.t0 = v.objClass;
                                                                        _context.next = _context.t0 === 'com.openkm.bean.form.Input' ? 3 : _context.t0 === 'com.openkm.bean.form.Select' ? 5 : _context.t0 === 'com.openkm.bean.form.TextArea' ? 7 : _context.t0 === 'com.openkm.bean.form.CheckBox' ? 9 : 11;
                                                                        break;

                                                                    case 3:
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
                                                                        return _context.abrupt('break', 11);

                                                                    case 5:
                                                                        if (_.has(v, 'options')) {

                                                                            if (!_.isArray(v.options)) {
                                                                                if (v.options != null) v.options = [v.options];else v.options = [];
                                                                            }

                                                                            if (v.options.length > 0) {
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
                                                                        }
                                                                        return _context.abrupt('break', 11);

                                                                    case 7:
                                                                        item[v.name] = {
                                                                            value: v.value
                                                                        };
                                                                        return _context.abrupt('break', 11);

                                                                    case 9:
                                                                        if (_.includes([true, "true", 1, false, "false", 0], v.value)) item[v.name] = {
                                                                            icon: _.includes([true, "true", 1], v.value) ? 'fa-check' : 'fa-remove'
                                                                        };
                                                                        return _context.abrupt('break', 11);

                                                                    case 11:
                                                                        headers[v.name] = v.label;

                                                                    case 12:
                                                                    case 'end':
                                                                        return _context.stop();
                                                                }
                                                            }
                                                        }, _callee, _this);
                                                    }));

                                                    return function (_x3) {
                                                        return _ref2.apply(this, arguments);
                                                    };
                                                }());
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

                                        $scope.data.isSearched = true;
                                    }, function (error) {
                                        console.error(error);
                                        $scope.data.isSearched = true;
                                    });
                                    _context2.next = 10;
                                    break;

                                case 7:
                                    _context2.prev = 7;
                                    _context2.t0 = _context2['catch'](0);

                                    console.error(_context2.t0);

                                case 10:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[0, 7]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};