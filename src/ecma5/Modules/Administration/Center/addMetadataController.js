'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addMetadataController = function addMetadataController($scope, $state, $compile, $uibModal, administrationService, toaster) {
    var _this = this;

    _classCallCheck(this, addMetadataController);

    $scope.data = {

        removeExternalFuncs: {},
        profile: null,
        state: "ADDMETADATA",
        metadatas: null,
        selectMetadata: -1
    };

    $scope.func = {};

    $scope.func.addMetadata = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Administration/addMetadata.js?dev=' + randomVersionName);

                    case 2:
                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Administration/addMetadata.js?dev=' + randomVersionName] = 'addMetadata';
                        _context2.next = 5;
                        return addMetadata($uibModal, administrationService, $scope.data.metadatas != null && _.isArray($scope.data.metadatas) ? _.map($scope.data.metadatas, 'groupName') : []);

                    case 5:
                        res = _context2.sent;

                        administrationService.propertyGroup.manageSetPropertyTree(res).then(function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                try {
                                                    $scope.func.todo();
                                                } catch (e) {
                                                    $scope.data.metadatas = [];
                                                    console.error(e);
                                                }

                                            case 1:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x) {
                                return _ref2.apply(this, arguments);
                            };
                        }(), function (error) {
                            return toaster.pop('error', '', 'عدم دریافت لیست فراداده ها');
                        });

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    $scope.func.todo = function () {
        try {
            administrationService.propertyGroup.manageGetAllPropertyTree().then(function () {
                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(res) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;

                                    if (!(_.has(res.data, 'originalElement') && _.isArray(res.data.originalElement) && res.data.originalElement.length > 0)) {
                                        _context3.next = 6;
                                        break;
                                    }

                                    _context3.next = 4;
                                    return $scope.func.generateTable(res.data.originalElement);

                                case 4:
                                    $scope.data.metadatas = _context3.sent;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 6:
                                    _context3.next = 12;
                                    break;

                                case 8:
                                    _context3.prev = 8;
                                    _context3.t0 = _context3['catch'](0);

                                    $scope.data.metadatas = [];
                                    console.error(_context3.t0);

                                case 12:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this, [[0, 8]]);
                }));

                return function (_x2) {
                    return _ref3.apply(this, arguments);
                };
            }(), function (error) {
                return toaster.pop('error', '', 'عدم دریافت لیست فراداده ها');
            });
        } catch (e) {
            console.error(e);
        }
    };

    $scope.func.remove = function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(metadata) {
            var result;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            _context4.next = 3;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/removeMetadataAdded.js?dev=' + randomVersionName);

                        case 3:
                            _context4.next = 5;
                            return removeMetadataAdded($uibModal, metadata.groupName);

                        case 5:
                            result = _context4.sent;
                            _context4.next = 8;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeMetadataAdded.js?dev=' + randomVersionName, 'removeMetadataAdded');

                        case 8:
                            if (result) {
                                administrationService.propertyGroup.manageRemovePropertyTree(metadata.id).then(function (res) {
                                    try {
                                        $scope.data.metadatas.splice(_.findIndex($scope.data.metadatas, function (m) {
                                            return m.id == metadata.id;
                                        }), 1);
                                    } catch (e) {
                                        console.error(e);
                                    }
                                    toaster.pop('successs', '', 'اطلاعات با موفقیت حذف گردید');
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                }, function (error) {
                                    return toaster.pop('error', '', 'مشکلی در حذف به وجود آمده است');
                                });
                            }
                            _context4.next = 16;
                            break;

                        case 11:
                            _context4.prev = 11;
                            _context4.t0 = _context4['catch'](0);

                            console.error(_context4.t0);
                            _context4.next = 16;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeAccess.js?dev=' + randomVersionName, 'removeAccess');

                        case 16:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[0, 11]]);
        }));

        return function (_x3) {
            return _ref4.apply(this, arguments);
        };
    }();

    $scope.func.edit = function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(metadata) {
            var groupName, selectedProperties, i, name, res;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.prev = 0;
                            groupName = null;
                            selectedProperties = [];

                            for (i = 1; i < 12; i++) {
                                name = 'property' + i;

                                if (_.has(metadata, name) && metadata[name].name != null) {
                                    groupName = metadata[name].name.split(".")[0];
                                    selectedProperties.push(metadata[name].name);
                                }
                            }

                            if (!(groupName != null)) {
                                _context6.next = 12;
                                break;
                            }

                            _context6.next = 7;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/editTreeMetadata.js?dev=' + randomVersionName);

                        case 7:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Administration/editTreeMetadata.js?dev=' + randomVersionName] = 'editTreeMetadata';
                            _context6.next = 10;
                            return editTreeMetadata($uibModal, administrationService, metadata, {
                                name: groupName,
                                label: metadata.groupName
                            }, selectedProperties, $scope.data.metadatas != null && _.isArray($scope.data.metadatas) ? _.filter(_.map($scope.data.metadatas, 'groupName'), function (groupName) {
                                return groupName != metadata.groupName;
                            }) : []);

                        case 10:
                            res = _context6.sent;

                            administrationService.propertyGroup.manageSetPropertyTree(res).then(function () {
                                var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(res) {
                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    try {
                                                        $scope.func.todo();
                                                    } catch (e) {
                                                        $scope.data.metadatas = [];
                                                        console.error(e);
                                                    }

                                                case 1:
                                                case 'end':
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _callee5, _this);
                                }));

                                return function (_x5) {
                                    return _ref6.apply(this, arguments);
                                };
                            }(), function (error) {
                                return toaster.pop('error', '', 'عدم دریافت لیست فراداده ها');
                            });

                        case 12:
                            _context6.next = 17;
                            break;

                        case 14:
                            _context6.prev = 14;
                            _context6.t0 = _context6['catch'](0);

                            console.error(_context6.t0);

                        case 17:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this, [[0, 14]]);
        }));

        return function (_x4) {
            return _ref5.apply(this, arguments);
        };
    }();

    $scope.func.generateTable = function (list) {
        return new Promise(function (resolve, reject) {
            try {
                var result = [];
                var label, name;
                for (var i = 0; i < list.length; i++) {
                    var row = {};
                    try {
                        row.groupName = list[i].col00;

                        if (_.has(list[i], "col01") && list[i]["col01"] != "0") {
                            var _$split = _.split(list[i]["col01"].trim(), "=");

                            var _$split2 = _slicedToArray(_$split, 2);

                            name = _$split2[0];
                            label = _$split2[1];

                            row.property1 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property1 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col02") && list[i]["col02"] != "0") {
                            var _$split3 = _.split(list[i]["col02"].trim(), "=");

                            var _$split4 = _slicedToArray(_$split3, 2);

                            name = _$split4[0];
                            label = _$split4[1];

                            row.property2 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property2 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col03") && list[i]["col03"] != "0") {
                            var _$split5 = _.split(list[i]["col03"].trim(), "=");

                            var _$split6 = _slicedToArray(_$split5, 2);

                            name = _$split6[0];
                            label = _$split6[1];

                            row.property3 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property3 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col04") && list[i]["col04"] != "0") {
                            var _$split7 = _.split(list[i]["col04"].trim(), "=");

                            var _$split8 = _slicedToArray(_$split7, 2);

                            name = _$split8[0];
                            label = _$split8[1];

                            row.property4 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property4 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col05") && list[i]["col05"] != "0") {
                            var _$split9 = _.split(list[i]["col05"].trim(), "=");

                            var _$split10 = _slicedToArray(_$split9, 2);

                            name = _$split10[0];
                            label = _$split10[1];

                            row.property5 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property5 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col06") && list[i]["col06"] != "0") {
                            var _$split11 = _.split(list[i]["col06"].trim(), "=");

                            var _$split12 = _slicedToArray(_$split11, 2);

                            name = _$split12[0];
                            label = _$split12[1];

                            row.property6 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property6 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col07") && list[i]["col07"] != "0") {
                            var _$split13 = _.split(list[i]["col07"].trim(), "=");

                            var _$split14 = _slicedToArray(_$split13, 2);

                            name = _$split14[0];
                            label = _$split14[1];

                            row.property7 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property7 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col08") && list[i]["col08"] != "0") {
                            var _$split15 = _.split(list[i]["col08"].trim(), "=");

                            var _$split16 = _slicedToArray(_$split15, 2);

                            name = _$split16[0];
                            label = _$split16[1];

                            row.property8 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property8 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col09") && list[i]["col09"] != "0") {
                            var _$split17 = _.split(list[i]["col09"].trim(), "=");

                            var _$split18 = _slicedToArray(_$split17, 2);

                            name = _$split18[0];
                            label = _$split18[1];

                            row.property9 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property9 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col10") && list[i]["col10"] != "0") {
                            var _$split19 = _.split(list[i]["col10"].trim(), "=");

                            var _$split20 = _slicedToArray(_$split19, 2);

                            name = _$split20[0];
                            label = _$split20[1];

                            row.property10 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property10 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col11") && list[i]["col11"] != "0") {
                            var _$split21 = _.split(list[i]["col11"].trim(), "=");

                            var _$split22 = _slicedToArray(_$split21, 2);

                            name = _$split22[0];
                            label = _$split22[1];

                            row.property11 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property11 = {
                                name: null,
                                label: ""
                            };
                        }
                        if (_.has(list[i], "col12") && list[i]["col12"] != "0") {
                            var _$split23 = _.split(list[i]["col12"].trim(), "=");

                            var _$split24 = _slicedToArray(_$split23, 2);

                            name = _$split24[0];
                            label = _$split24[1];

                            row.property12 = {
                                name: name,
                                label: label
                            };
                        } else {
                            row.property12 = {
                                name: null,
                                label: ""
                            };
                        }

                        row.id = list[i].id;
                        row.table = list[i].table;
                        result.push(_.clone(row));
                    } catch (e) {
                        console.error(e);
                    } finally {
                        row = undefined;
                    }
                }
                resolve(result);
            } catch (e) {
                reject('عدم ایجاد جدول');
            }
        });
    };

    $scope.$on('featureReady', function () {
        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(event, args) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context7.next = 6;
                                break;
                            }

                            _context7.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context7.sent;

                            //TODO after login with server and receive profiles
                            $scope.func.todo();

                        case 6:
                            _context7.next = 11;
                            break;

                        case 8:
                            _context7.prev = 8;
                            _context7.t0 = _context7['catch'](0);

                            console.error(_context7.t0);

                        case 11:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this, [[0, 8]]);
        }));

        return function (_x6, _x7) {
            return _ref7.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        try {
                            //TODO clear all interval and timeouts
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                        while (1) {
                                            switch (_context8.prev = _context8.next) {
                                                case 0:
                                                    _context8.prev = 0;
                                                    _context8.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

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
                                    }, _callee8, _this, [[0, 5]]);
                                }));

                                return function (_x8, _x9) {
                                    return _ref9.apply(this, arguments);
                                };
                            }());
                            //TODO  clear all data and functions inside scope
                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, _this);
    })));
};

exports.default = addMetadataController;


addMetadataController.$inject = ['$scope', '$state', '$compile', '$uibModal', 'administrationService', 'toaster'];