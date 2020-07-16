'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var reportStateController = function reportStateController($scope, reportService, toaster, $state, $uibModal, $sce) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.data = {
                removeExternalFuncs: {},
                removeExternalCSS: {},
                state: 'desktop',
                profile: null,
                list: null,
                reportMetaData: null,
                selectReport: null,
                html: null,
                mimeType: ['txt', 'html', 'pdf', 'rtf', 'csv', 'odt', 'docx'],

                minimize: {
                    right: false,
                    left: false
                }
            };
            $scope.func = {};
            $scope.func.viewMetaData = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(properties, form) {
                    var CloneProperties, param, query, _loop, i, result;

                    return regeneratorRuntime.wrap(function _callee$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    CloneProperties = angular.copy(properties);

                                    if (!(_.has(form, '$error') && _.has(form.$error, 'required') && form.$error.required.length > 0)) {
                                        _context2.next = 5;
                                        break;
                                    }

                                    toaster.pop('error', '', 'فیلد های اجباری را پر کنید.');
                                    return _context2.abrupt('return');

                                case 5:
                                    try {
                                        CloneProperties['selectResultTODO'] = undefined;
                                        delete CloneProperties.selectResultTODO;
                                    } catch (e) {
                                        console.error(e);
                                    }
                                    param = null;
                                    query = [];
                                    _loop = regeneratorRuntime.mark(function _loop(i) {
                                        var name;
                                        return regeneratorRuntime.wrap(function _loop$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        name = $scope.data.reportMetaData[i].name;

                                                        if (!(name !== 'selectResultTODO')) {
                                                            _context.next = 26;
                                                            break;
                                                        }

                                                        _context.t0 = CloneProperties[name].objClass;
                                                        _context.next = _context.t0 === 'com.openkm.bean.form.Input' ? 5 : _context.t0 === 'com.openkm.bean.form.Select' ? 21 : _context.t0 === 'com.openkm.bean.form.TextArea' ? 23 : _context.t0 === 'com.openkm.bean.form.CheckBox' ? 23 : 26;
                                                        break;

                                                    case 5:
                                                        if (!_.has($scope.data.reportMetaData[i], 'type')) {
                                                            _context.next = 19;
                                                            break;
                                                        }

                                                        _context.t1 = $scope.data.reportMetaData[i].type;
                                                        _context.next = _context.t1 === 'date' ? 9 : _context.t1 === 'text' ? 17 : _context.t1 === 'number' ? 17 : _context.t1 === 'email' ? 17 : _context.t1 === 'link' ? 17 : 19;
                                                        break;

                                                    case 9:
                                                        if (!_.isDate(CloneProperties[name].value)) {
                                                            _context.next = 16;
                                                            break;
                                                        }

                                                        _context.next = 12;
                                                        return JSManagement.addJS('ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName);

                                                    case 12:
                                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName] = 'dateFormatInternal';
                                                        _context.next = 15;
                                                        return dateFormatInternal(CloneProperties[name].value);

                                                    case 15:
                                                        $scope.data.reportMetaData[i].value = _context.sent;

                                                    case 16:
                                                        return _context.abrupt('break', 19);

                                                    case 17:
                                                        $scope.data.reportMetaData[i].value = _.clone(CloneProperties[name].value);
                                                        return _context.abrupt('break', 19);

                                                    case 19:
                                                        if (!_.includes([null, ""], _.trim($scope.data.reportMetaData[i].value))) query.push('property=' + name + '=' + $scope.data.reportMetaData[i].value);
                                                        return _context.abrupt('break', 26);

                                                    case 21:

                                                        if (_.has($scope.data.reportMetaData[i], 'type')) {

                                                            if (!_.isArray($scope.data.reportMetaData[i].options)) {
                                                                if ($scope.data.reportMetaData[i].options != null) $scope.data.reportMetaData[i].options = [$scope.data.reportMetaData[i].options];else $scope.data.reportMetaData[i].options = [];
                                                            }

                                                            (function () {
                                                                switch ($scope.data.reportMetaData[i].type) {
                                                                    case 'simple':
                                                                        _.map($scope.data.reportMetaData[i].options, function (option) {
                                                                            return option.selected = false;
                                                                        });
                                                                        if (CloneProperties[name].selected != null) {
                                                                            var index = _.findIndex($scope.data.reportMetaData[i].options, function (option) {
                                                                                return option.value == CloneProperties[name].selected.value;
                                                                            });
                                                                            if (index >= 0) {
                                                                                $scope.data.reportMetaData[i].options[index].selected = true;
                                                                                query.push('property=' + name + '=' + CloneProperties[name].selected.value);
                                                                            }
                                                                        }
                                                                        break;
                                                                    case 'multiple':
                                                                        var selectedValues = _.map(CloneProperties[name].selected, 'value');
                                                                        _.map($scope.data.reportMetaData[i].options, function (option) {
                                                                            return option.selected = _.includes(selectedValues, option.value);
                                                                        });
                                                                        /*_.forEach(CloneProperties[name].selected, select=> {
                                                                            query.push(`property=${name}=${select.value}`);
                                                                        });*/
                                                                        if (_.isArray(CloneProperties[name].selected) && CloneProperties[name].selected.length > 0) query.push('property=' + name + '=' + _.join(_.map(CloneProperties[name].selected, 'value'), ','));
                                                                        break;
                                                                }
                                                            })();
                                                        }
                                                        return _context.abrupt('break', 26);

                                                    case 23:
                                                        $scope.data.reportMetaData[i].value = _.clone(CloneProperties[name].value);
                                                        if (!_.includes([null, ""], CloneProperties[name].value)) query.push('property=' + name + '=' + CloneProperties[name].value);
                                                        return _context.abrupt('break', 26);

                                                    case 26:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _loop, _this);
                                    });
                                    i = 0;

                                case 10:
                                    if (!(i < $scope.data.reportMetaData.length)) {
                                        _context2.next = 15;
                                        break;
                                    }

                                    return _context2.delegateYield(_loop(i), 't0', 12);

                                case 12:
                                    i++;
                                    _context2.next = 10;
                                    break;

                                case 15:
                                    result = 'rpId=' + $scope.data.selectReport.rpId + '&format=1&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', ''));

                                    if (query.length > 0) {
                                        param = _.join(query, '&');
                                        result += '&' + param;
                                    }
                                    result += '&' + Date.parse(new Date());
                                    reportService.dashboard.executeReport(result).then(function (res) {
                                        try {
                                            $scope.data.html = _.clone(res.data);
                                        } catch (e) {
                                            console.error(e);
                                        } finally {
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        }
                                    }, function (error) {
                                        return console.error(error);
                                    });
                                    _context2.next = 24;
                                    break;

                                case 21:
                                    _context2.prev = 21;
                                    _context2.t1 = _context2['catch'](0);

                                    console.error(_context2.t1);

                                case 24:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee, _this, [[0, 21]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();
            $scope.func.downloadMetaData = function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(properties, form) {
                    var CloneProperties, param, format, _ret3;

                    return regeneratorRuntime.wrap(function _callee3$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.prev = 0;
                                    return _context5.delegateYield(regeneratorRuntime.mark(function _callee2() {
                                        var query, _loop2, i, result;

                                        return regeneratorRuntime.wrap(function _callee2$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        CloneProperties = angular.copy(properties);

                                                        if (!(_.has(form, '$error') && _.has(form.$error, 'required') && form.$error.required.length > 0)) {
                                                            _context4.next = 4;
                                                            break;
                                                        }

                                                        toaster.pop('error', '', 'فیلد های اجباری را پر کنید.');
                                                        return _context4.abrupt('return', {
                                                            v: void 0
                                                        });

                                                    case 4:
                                                        param = null;
                                                        format = 0;
                                                        _context4.prev = 6;

                                                        format = _.clone(CloneProperties.selectResultTODO.selected.value);

                                                        if (!(format == null)) {
                                                            _context4.next = 10;
                                                            break;
                                                        }

                                                        throw "can not find format";

                                                    case 10:
                                                        CloneProperties['selectResultTODO'] = undefined;
                                                        delete CloneProperties.selectResultTODO;
                                                        _context4.next = 19;
                                                        break;

                                                    case 14:
                                                        _context4.prev = 14;
                                                        _context4.t0 = _context4['catch'](6);

                                                        console.error(_context4.t0);
                                                        toaster.pop('error', '', 'لطفا نوع نمایش را تعیین کنید');
                                                        return _context4.abrupt('return', {
                                                            v: void 0
                                                        });

                                                    case 19:
                                                        query = [];
                                                        _loop2 = regeneratorRuntime.mark(function _loop2(i) {
                                                            var name;
                                                            return regeneratorRuntime.wrap(function _loop2$(_context3) {
                                                                while (1) {
                                                                    switch (_context3.prev = _context3.next) {
                                                                        case 0:
                                                                            name = $scope.data.reportMetaData[i].name;

                                                                            if (!(name !== 'selectResultTODO')) {
                                                                                _context3.next = 26;
                                                                                break;
                                                                            }

                                                                            _context3.t0 = CloneProperties[name].objClass;
                                                                            _context3.next = _context3.t0 === 'com.openkm.bean.form.Input' ? 5 : _context3.t0 === 'com.openkm.bean.form.Select' ? 21 : _context3.t0 === 'com.openkm.bean.form.TextArea' ? 23 : _context3.t0 === 'com.openkm.bean.form.CheckBox' ? 23 : 26;
                                                                            break;

                                                                        case 5:
                                                                            if (!_.has($scope.data.reportMetaData[i], 'type')) {
                                                                                _context3.next = 19;
                                                                                break;
                                                                            }

                                                                            _context3.t1 = $scope.data.reportMetaData[i].type;
                                                                            _context3.next = _context3.t1 === 'date' ? 9 : _context3.t1 === 'text' ? 17 : _context3.t1 === 'number' ? 17 : _context3.t1 === 'email' ? 17 : _context3.t1 === 'link' ? 17 : 19;
                                                                            break;

                                                                        case 9:
                                                                            if (!_.isDate(CloneProperties[name].value)) {
                                                                                _context3.next = 12;
                                                                                break;
                                                                            }

                                                                            _context3.next = 12;
                                                                            return JSManagement.addJS('ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName);

                                                                        case 12:
                                                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName] = 'dateFormatInternal';
                                                                            _context3.next = 15;
                                                                            return dateFormatInternal(CloneProperties[name].value);

                                                                        case 15:
                                                                            $scope.data.reportMetaData[i].value = _context3.sent;
                                                                            return _context3.abrupt('break', 19);

                                                                        case 17:
                                                                            $scope.data.reportMetaData[i].value = _.clone(CloneProperties[name].value);
                                                                            return _context3.abrupt('break', 19);

                                                                        case 19:
                                                                            if (!_.includes([null, ""], _.trim(CloneProperties[name].value))) query.push('property=' + name + '=' + CloneProperties[name].value);
                                                                            return _context3.abrupt('break', 26);

                                                                        case 21:
                                                                            if (_.has($scope.data.reportMetaData[i], 'type')) {
                                                                                if (!_.isArray($scope.data.reportMetaData[i].options)) {
                                                                                    if ($scope.data.reportMetaData[i].options != null) $scope.data.reportMetaData[i].options = [$scope.data.reportMetaData[i].options];else $scope.data.reportMetaData[i].options = [];
                                                                                }

                                                                                (function () {
                                                                                    switch ($scope.data.reportMetaData[i].type) {
                                                                                        case 'simple':
                                                                                            _.map($scope.data.reportMetaData[i].options, function (option) {
                                                                                                return option.selected = false;
                                                                                            });
                                                                                            if (CloneProperties[name].selected != null) {
                                                                                                var index = _.findIndex($scope.data.reportMetaData[i].options, function (option) {
                                                                                                    return option.value == CloneProperties[name].selected.value;
                                                                                                });
                                                                                                if (index >= 0) {
                                                                                                    $scope.data.reportMetaData[i].options[index].selected = true;
                                                                                                    query.push('property=' + name + '=' + CloneProperties[name].selected.value);
                                                                                                }
                                                                                            }
                                                                                            break;
                                                                                        case 'multiple':
                                                                                            var selectedValues = _.map(CloneProperties[name].selected, 'value');
                                                                                            _.map($scope.data.reportMetaData[i].options, function (option) {
                                                                                                return option.selected = _.includes(selectedValues, option.value);
                                                                                            });
                                                                                            _.forEach(CloneProperties[name].selected, function (select) {
                                                                                                query.push('property=' + name + '=' + select.value);
                                                                                            });
                                                                                            break;
                                                                                    }
                                                                                })();
                                                                            }
                                                                            return _context3.abrupt('break', 26);

                                                                        case 23:
                                                                            $scope.data.reportMetaData[i].value = _.clone(CloneProperties[name].value);
                                                                            if (!_.includes([null, ""], CloneProperties[name].value)) query.push('property=' + name + '=' + CloneProperties[name].value);
                                                                            return _context3.abrupt('break', 26);

                                                                        case 26:
                                                                        case 'end':
                                                                            return _context3.stop();
                                                                    }
                                                                }
                                                            }, _loop2, _this);
                                                        });
                                                        i = 0;

                                                    case 22:
                                                        if (!(i < $scope.data.reportMetaData.length)) {
                                                            _context4.next = 27;
                                                            break;
                                                        }

                                                        return _context4.delegateYield(_loop2(i), 't1', 24);

                                                    case 24:
                                                        i++;
                                                        _context4.next = 22;
                                                        break;

                                                    case 27:

                                                        if (query.length > 0) param = _.join(query, '&');

                                                        result = 'executeReport?rpId=' + $scope.data.selectReport.rpId + '&format=' + format + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', ''));

                                                        if (param != null) result += '&' + param;

                                                        _context4.next = 32;
                                                        return JSManagement.addJS('ecma5/ExternalLiberary/Report/downloadReportFileFromServer.js?dev=' + randomVersionName);

                                                    case 32:
                                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Report/downloadReportFileFromServer.js?dev=' + randomVersionName] = 'downloadReportFileFromServer';
                                                        try {
                                                            downloadReportFileFromServer('/KeydocPro/services/rest/dashboard/' + result, $scope.data.selectReport.name + '.' + $scope.data.mimeType[format]);
                                                        } catch (e) {
                                                            console.error(e);
                                                        }

                                                    case 34:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee2, _this, [[6, 14]]);
                                    })(), 't0', 2);

                                case 2:
                                    _ret3 = _context5.t0;

                                    if (!((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object")) {
                                        _context5.next = 5;
                                        break;
                                    }

                                    return _context5.abrupt('return', _ret3.v);

                                case 5:
                                    _context5.next = 10;
                                    break;

                                case 7:
                                    _context5.prev = 7;
                                    _context5.t1 = _context5['catch'](0);

                                    console.error(_context5.t1);

                                case 10:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee3, _this, [[0, 7]]);
                }));

                return function (_x3, _x4) {
                    return _ref2.apply(this, arguments);
                };
            }();
            $scope.func.changeReport = function (rpId, name) {
                try {
                    if ($scope.data.selectReport != null && $scope.data.selectReport.rpId == rpId) return;
                    $scope.data.selectReport = {
                        rpId: rpId,
                        name: name
                    };
                    if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(null, {});

                    reportService.dashboard.getOne('getReportParams?rpId=' + rpId).then(function (res) {
                        try {
                            $scope.data.reportMetaData = [];
                            try {
                                $scope.data.reportMetaData = _.clone(res.data.originalElement.formElementsComplex.formElementComplex);
                            } catch (e) {
                                console.error(e);
                            }
                            $scope.data.reportMetaData = typeof $scope.data.reportMetaData === "undefined" ? [] : _.isArray($scope.data.reportMetaData) ? $scope.data.reportMetaData : [$scope.data.reportMetaData];
                            $scope.data.reportMetaData.push({
                                height: "25px",
                                label: "فرمت گزارش",
                                name: "selectResultTODO",
                                objClass: "com.openkm.bean.form.Select",
                                readonly: false,
                                type: "simple",
                                width: "150px",
                                options: [{
                                    label: "txt",
                                    selected: false,
                                    value: "0",
                                    icon: "fa-file-text-o"
                                }, {
                                    label: "html",
                                    selected: false,
                                    value: "1",
                                    icon: "fa-html5"
                                }, {
                                    label: "pdf",
                                    selected: false,
                                    value: "2",
                                    icon: "fa-file-pdf-o"
                                }, {
                                    label: "rtf",
                                    selected: false,
                                    value: "3",
                                    icon: "fa-file-o"
                                }, {
                                    label: "csv",
                                    selected: false,
                                    value: "4",
                                    icon: "fa-file-excel-o"
                                }, {
                                    label: "odt",
                                    selected: false,
                                    value: "5",
                                    icon: "fa-file-o"
                                }, {
                                    label: "docx",
                                    selected: false,
                                    value: "6",
                                    icon: "fa-file-word-o"
                                }]
                            });
                            if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(angular.copy($scope.data.reportMetaData), { require: true, service: reportService });
                        } catch (e) {
                            console.error(e);
                        }
                    }, function (error) {
                        return console.error(e);
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.todo = function () {
                try {
                    reportService.dashboard.getList("getAllReport").then(function () {
                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(res) {
                            return regeneratorRuntime.wrap(function _callee4$(_context6) {
                                while (1) {
                                    switch (_context6.prev = _context6.next) {
                                        case 0:
                                            try {
                                                $scope.data.list = _.clone(res.data.originalElement);
                                            } catch (e) {
                                                console.error(e);
                                            }

                                        case 1:
                                        case 'end':
                                            return _context6.stop();
                                    }
                                }
                            }, _callee4, _this);
                        }));

                        return function (_x5) {
                            return _ref3.apply(this, arguments);
                        };
                    }(), function (error) {
                        return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.run = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.prev = 0;
                                _context7.next = 3;
                                return FeaturesManagement.getFeatures(reportService.auth);

                            case 3:
                                $scope.data.profile = _context7.sent;

                                $scope.func.todo();
                                _context7.next = 10;
                                break;

                            case 7:
                                _context7.prev = 7;
                                _context7.t0 = _context7['catch'](0);

                                console.error(_context7.t0);

                            case 10:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee5, _this, [[0, 7]]);
            }));

            /** TODO ------------------------- background functions ----------------------------------------- **/
            $scope.$on('changeFeature', function () {
                var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(event, args) {
                    return regeneratorRuntime.wrap(function _callee6$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                        _context8.next = 5;
                                        break;
                                    }

                                    _context8.next = 3;
                                    return FeaturesManagement.getFeatures(reportService.auth);

                                case 3:
                                    $scope.data.profile = _context8.sent;

                                    $scope.func.todo();

                                case 5:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee6, _this);
                }));

                return function (_x6, _x7) {
                    return _ref5.apply(this, arguments);
                };
            }());
            $scope.$on("$destroy", function () {
                try {
                    window.clearAllIntervals();
                    _.forEach(_.clone($scope.data.removeExternalCSS), function () {
                        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(value, src) {
                            return regeneratorRuntime.wrap(function _callee7$(_context9) {
                                while (1) {
                                    switch (_context9.prev = _context9.next) {
                                        case 0:
                                            _context9.prev = 0;
                                            _context9.next = 3;
                                            return CSSManagement.removeCSS(src);

                                        case 3:
                                            _context9.next = 8;
                                            break;

                                        case 5:
                                            _context9.prev = 5;
                                            _context9.t0 = _context9['catch'](0);

                                            console.error(_context9.t0);

                                        case 8:
                                        case 'end':
                                            return _context9.stop();
                                    }
                                }
                            }, _callee7, _this, [[0, 5]]);
                        }));

                        return function (_x8, _x9) {
                            return _ref6.apply(this, arguments);
                        };
                    }());
                    _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(funcName, src) {
                            return regeneratorRuntime.wrap(function _callee8$(_context10) {
                                while (1) {
                                    switch (_context10.prev = _context10.next) {
                                        case 0:
                                            _context10.prev = 0;
                                            _context10.next = 3;
                                            return JSManagement.removeJS(src, funcName);

                                        case 3:
                                            _context10.next = 8;
                                            break;

                                        case 5:
                                            _context10.prev = 5;
                                            _context10.t0 = _context10['catch'](0);

                                            console.error(_context10.t0);

                                        case 8:
                                        case 'end':
                                            return _context10.stop();
                                    }
                                }
                            }, _callee8, _this, [[0, 5]]);
                        }));

                        return function (_x10, _x11) {
                            return _ref7.apply(this, arguments);
                        };
                    }());
                    // clear all data and functions
                    $scope.func = undefined;
                    $scope.data = undefined;
                    $scope.externalScope = undefined;
                } catch (e) {
                    console.error(e);
                }
            });

            resolve(true);
        } catch (e) {
            reject("مشکلی در ساخت State ایجاد شده است.");
        }
    });
};