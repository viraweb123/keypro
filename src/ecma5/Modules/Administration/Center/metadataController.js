'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var metadataController = function metadataController($scope, $state, $compile, $uibModal, administrationService, toaster) {
    var _this = this;

    _classCallCheck(this, metadataController);

    $scope.data = {

        sort: {
            type: null,
            ascDesc: true
        },
        selectMetadata: null,
        selectedProperty: null,
        removeExternalFuncs: {},
        profile: null,
        state: "METADATA",
        propertyGroups: null,
        propertyGroup: null,
        selecte: {
            fileTypes: ['input', 'select', 'suggestbox', 'checkbox', 'textarea'],
            inputContains: ['text', 'date', 'link', 'folder', 'email'],
            selectOptionsType: ['static', 'dynamic'],
            selectType: ['simple', 'multiple'],
            validType: ['req', 'alpha', 'dec', 'num', 'url', 'maxlen', 'minlen', 'lt', 'gt', 'min', 'max', 'regexp']
        }
    };

    $scope.func = {};
    $scope.func.todo = function () {
        try {
            administrationService.propertyGroup.listDefinition().then(function (res) {
                try {
                    if (_.has(res.data.originalElement, 'group')) $scope.data.propertyGroups = _.clone(res.data.originalElement.group);else $scope.data.propertyGroups = [];
                    _.defer(function () {
                        return $scope.$apply();
                    });
                } catch (e) {
                    console.error(e);
                    $scope.data.propertyGroups = [];
                }
            }, function (error) {
                toaster.pop('error', '', 'عدم دریافت لیست فراداده ها');
                $scope.data.propertyGroups = [];
            });
        } catch (e) {
            console.error(e);
        }
    };

    $scope.func.editOrCreateMetaData = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(metadata, isNew) {
            var i, create, response;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/editMetadataFunction.js?dev=' + randomVersionName);

                        case 3:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Administration/editMetadataFunction.js?dev=' + randomVersionName] = 'editMetadataFunction';

                            i = 0;

                            _.forEach(metadata.property, function (p) {
                                p.id = 'metadata-' + i++;
                                p.readonly = _.has(p, 'readonly') && (p.readonly == "true" || p.readonly == true);
                            });

                            _context.prev = 6;
                            create = typeof isNew !== "undefined";
                            _context.next = 10;
                            return editMetadataFunction($uibModal, administrationService, JSManagement, angular.copy(metadata), create);

                        case 10:
                            response = _context.sent;

                            _.map(response.property, function (p) {
                                return delete p.id;
                            });

                            if (create) $scope.func.createNewMetadata(response);else $scope.func.editMetadata(response);

                            _context.next = 18;
                            break;

                        case 15:
                            _context.prev = 15;
                            _context.t0 = _context['catch'](6);

                            console.error(_context.t0);

                        case 18:
                            _context.next = 23;
                            break;

                        case 20:
                            _context.prev = 20;
                            _context.t1 = _context['catch'](0);

                            console.error(_context.t1);

                        case 23:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 20], [6, 15]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();

    $scope.func.createNewMetadata = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(metadata) {
            var allGroups;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            try {
                                _.forEach(metadata.property, function (p) {
                                    return p.name = metadata.name + '.' + p.name;
                                });
                                allGroups = angular.copy($scope.data.propertyGroups);

                                allGroups.push(metadata);
                                allGroups = JSON.stringify(allGroups);
                                administrationService.propertyGroup.createDefinition(allGroups).then(function (res) {

                                    $scope.data.propertyGroups.push(metadata);
                                    toaster.pop('successs', '', 'فراداده جدید با موفقیت ثبت گردید');
                                    $scope.data.selectMetadata = metadata.name;
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    allGroups = undefined;
                                }, function (error) {
                                    return toaster.pop('error', '', 'مشکلی در ایجاد فراداده جدید در سرور به وجود آمده است');
                                });
                            } catch (e) {
                                console.error(e);
                            }

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x3) {
            return _ref2.apply(this, arguments);
        };
    }();
    $scope.func.editMetadata = function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(metadata) {
            var allGroups;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            try {

                                _.forEach(metadata.property, function (p) {
                                    if (!_.startsWith(p.name, metadata.name + '.')) p.name = metadata.name + '.' + p.name;
                                    return p.name;
                                });
                                allGroups = angular.copy($scope.data.propertyGroups);


                                try {
                                    (function () {
                                        var index = _.findIndex(allGroups, function (group) {
                                            return group.name == metadata.name;
                                        });
                                        allGroups[index] = _.clone(metadata);
                                        allGroups = JSON.stringify(allGroups);
                                        administrationService.propertyGroup.createDefinition(allGroups).then(function (res) {
                                            //let index = _.findIndex($scope.data.propertyGroups,propertyGroup=>propertyGroup.name == metadata.name);
                                            $scope.data.propertyGroups[index] = _.clone(metadata);
                                            toaster.pop('successs', '', 'فراداده با موفقیت ویرایش گردید');
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            allGroups = undefined;
                                        }, function (error) {
                                            return toaster.pop('error', '', 'مشکلی در ویرایش فراداده در سرور به وجود آمده است');
                                        });
                                    })();
                                } catch (e) {
                                    console.error(e);
                                }
                            } catch (e) {
                                console.error(e);
                            }

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function (_x4) {
            return _ref3.apply(this, arguments);
        };
    }();

    $scope.func.addMetaData = function () {
        try {
            (function () {
                var name = 'new_Group';
                var index = 0;
                while (_.findIndex($scope.data.propertyGroups, function (propertyGroup) {
                    return propertyGroup.name == name;
                }) >= 0) {
                    name = 'new_Group' + ++index;
                }$scope.func.editOrCreateMetaData({
                    name: name,
                    label: name,
                    property: []
                }, true);
            })();
        } catch (e) {
            console.error(e);
        }
    };

    $scope.func.removeMetadata = function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(p) {
            var result, index, allGroups;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            _context4.next = 3;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/removeSelectedMetadata.js?dev=' + randomVersionName);

                        case 3:
                            _context4.next = 5;
                            return removeSelectedMetadata($uibModal, p.label);

                        case 5:
                            result = _context4.sent;


                            if (result) {
                                index = _.findIndex($scope.data.propertyGroups, function (propertyGroup) {
                                    return propertyGroup.name == p.name;
                                });

                                if (index >= 0) {
                                    $scope.data.propertyGroups.splice(index, 1);
                                    allGroups = angular.copy($scope.data.propertyGroups);

                                    allGroups = JSON.stringify(allGroups);
                                    administrationService.propertyGroup.createDefinition(allGroups).then(function (res) {
                                        toaster.pop('successs', '', 'فراداده با موفقیت حذف گردید');
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        allGroups = undefined;
                                    }, function (error) {
                                        return toaster.pop('error', '', 'مشکلی در  حذف فراداده در سرور به وجود آمده است');
                                    });
                                }
                            }

                            _context4.next = 9;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeSelectedMetadata.js?dev=' + randomVersionName, 'removeSelectedMetadata');

                        case 9:
                            _context4.next = 16;
                            break;

                        case 11:
                            _context4.prev = 11;
                            _context4.t0 = _context4['catch'](0);

                            console.error(_context4.t0);
                            _context4.next = 16;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeSelectedMetadata.js?dev=' + randomVersionName, 'removeSelectedMetadata');

                        case 16:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[0, 11]]);
        }));

        return function (_x5) {
            return _ref4.apply(this, arguments);
        };
    }();

    $scope.$on('featureReady', function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(event, args) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context5.next = 6;
                                break;
                            }

                            _context5.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context5.sent;

                            //TODO after login with server and receive profiles
                            $scope.func.todo();

                        case 6:
                            _context5.next = 11;
                            break;

                        case 8:
                            _context5.prev = 8;
                            _context5.t0 = _context5['catch'](0);

                            console.error(_context5.t0);

                        case 11:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this, [[0, 8]]);
        }));

        return function (_x6, _x7) {
            return _ref5.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        try {
                            //TODO clear all interval and timeouts
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                        while (1) {
                                            switch (_context6.prev = _context6.next) {
                                                case 0:
                                                    _context6.prev = 0;
                                                    _context6.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context6.next = 8;
                                                    break;

                                                case 5:
                                                    _context6.prev = 5;
                                                    _context6.t0 = _context6['catch'](0);

                                                    console.error(_context6.t0);

                                                case 8:
                                                case 'end':
                                                    return _context6.stop();
                                            }
                                        }
                                    }, _callee6, _this, [[0, 5]]);
                                }));

                                return function (_x8, _x9) {
                                    return _ref7.apply(this, arguments);
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
                        return _context7.stop();
                }
            }
        }, _callee7, _this);
    })));
};

exports.default = metadataController;


metadataController.$inject = ['$scope', '$state', '$compile', '$uibModal', 'administrationService', 'toaster'];