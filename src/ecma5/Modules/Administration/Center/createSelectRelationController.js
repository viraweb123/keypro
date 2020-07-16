"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createSelectRelationController = function createSelectRelationController($scope, $state, $compile, $uibModal, administrationService, toaster) {
    var _this = this;

    _classCallCheck(this, createSelectRelationController);

    $scope.data = {
        selectMetadata: null,
        metadatas: null,
        metadata: null,
        parentProperty: null,
        childProperty: null,
        type: 'create',
        sort: {
            type: null,
            ascDesc: true
        },
        relationList: null,
        selectRelation: null
    };

    $scope.func = {};

    $scope.func.editRelation = function (relation) {
        try {
            if ($scope.data.selectRelation != null && $scope.data.selectRelation.id == relation.id) {
                $scope.data.selectRelation = null;
                $scope.data.type = "create";
            } else {
                $scope.data.selectRelation = angular.copy(relation);
                $scope.data.parentProperty = angular.copy($scope.data.metadata.properties[relation.col01]);
                $scope.data.childProperty = angular.copy($scope.data.metadata.properties[relation.col02]);
                $scope.data.type = "edit";
            }
        } catch (e) {
            console.error(e);
        } finally {
            _.defer(function () {
                return $scope.$apply();
            });
        }
    };

    $scope.func.addRelation = function (isEdit) {
        try {

            if ($scope.data.metadata == null) {
                toaster.pop("error", "", "لطفا ابتدا یک فراداده انتخاب کنید.");
                return;
            }
            if ($scope.data.parentProperty == null) {
                toaster.pop("error", "", "لطفا یک پدر برای رابطه انتخاب کنید.");
                return;
            }
            if ($scope.data.childProperty == null) {
                toaster.pop("error", "", "لطفا یک فرزند برای رابطه انتخاب کنید.");
                return;
            }
            if ($scope.data.parentProperty.name == $scope.data.childProperty.name) {
                toaster.pop("error", "", "پدر و فرزند نمی توانند یکی باشند.");
                return;
            }
            var ind = _.findIndex($scope.data.relationList, function (v, k) {
                return $scope.data.parentProperty.name == v.col01 && $scope.data.childProperty.name == v.col02;
            });
            if (ind >= 0) {
                toaster.pop("error", "", "این رابطه در لیست وجود دارد.");
                return;
            }
            var query = "grpName=" + $scope.data.metadata.name + "&parentSelect=" + $scope.data.parentProperty.name + "&childSelect=" + $scope.data.childProperty.name;
            if ($scope.data.selectRelation != null && _.has($scope.data.selectRelation, 'id')) query += "&relationId=" + $scope.data.selectRelation.id;
            administrationService.propertyGroup.manageRelationSelect(query).then(function (res) {
                if ($scope.data.selectRelation != null && _.has($scope.data.selectRelation, 'id')) {
                    toaster.pop("success", "", "رابطه با موفقیت تغییر کرد");
                    var index = _.findIndex($scope.data.relationList, function (relation) {
                        return relation.id == $scope.data.selectRelation.id;
                    });
                    if (index >= 0) {
                        $scope.data.relationList[index].col01 = _.clone($scope.data.parentProperty.name);
                        $scope.data.relationList[index].col02 = _.clone($scope.data.childProperty.name);
                    }
                } else {
                    toaster.pop("success", "", "رابطه با موفقیت ایجاد گردید");
                    $scope.data.relationList.push({
                        col00: _.clone($scope.data.metadata.name),
                        col01: _.clone($scope.data.parentProperty.name),
                        col02: _.clone($scope.data.childProperty.name),
                        id: res.data.data,
                        table: "property_relation"
                    });
                }
                _.defer(function () {
                    return $scope.$apply();
                });
            }, function (err) {
                console.error(err);
                toaster.pop("error", "", "خطا در ذخیره رابطه به وجود آمده است.");
            });
        } catch (e) {
            console.error(e);
            toaster.pop("error", "", "خطا در ذخیره رابطه به وجود آمده است.");
        }
    };

    $scope.func.cancel = function () {
        try {
            $scope.data.parentProperty = null;
            $scope.data.childProperty = null;
            $scope.data.selectRelation = null;
            $scope.data.type = "create";
        } catch (e) {
            console.error(e);
        } finally {
            _.defer(function () {
                return $scope.$apply();
            });
        }
    };

    $scope.func.removeRelation = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(relation) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            $scope.data.selectRelation = angular.copy(relation);

                            _context.next = 4;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Administration/removeSelectedRelation.js?dev=" + randomVersionName);

                        case 4:
                            _context.next = 6;
                            return removeSelectedRelation($uibModal);

                        case 6:

                            administrationService.propertyGroup.deleteRelationSelect(relation.id).then(function (res) {
                                var index = _.findIndex($scope.data.relationList, function (r) {
                                    return r.id == relation.id;
                                });
                                if (index >= 0) {
                                    $scope.data.relationList.splice(index, 1);
                                    toaster.pop("success", "", "رابطه با موفقیت حذف گردید");
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                }
                            });
                            _context.next = 9;
                            return JSManagement.removeJS("ecma5/ExternalLiberary/Administration/removeSelectedRelation.js?dev=" + randomVersionName, 'removeSelectedRelation');

                        case 9:
                            _context.next = 16;
                            break;

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context["catch"](0);

                            console.error(_context.t0);
                            _context.next = 16;
                            return JSManagement.removeJS("ecma5/ExternalLiberary/Administration/removeSelectedRelation.js?dev=" + randomVersionName, 'removeSelectedRelation');

                        case 16:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 11]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();

    $scope.func.changeParentProperty = function () {};

    $scope.func.changeChildProperty = function () {};

    $scope.func.changeMetaData = function () {
        try {

            if ($scope.data.selectMetadata != null) {
                administrationService.propertyGroup.form({ name: $scope.data.selectMetadata.name }).then(function (res) {

                    $scope.data.metadata = {};
                    $scope.data.metadata.properties = angular.copy(_.keyBy(_.filter(res.data.properties, function (r) {
                        return r.objClass == "com.openkm.bean.form.Select";
                    }), 'name'));
                    $scope.data.metadata.label = angular.copy(res.data.label);
                    $scope.data.metadata.name = angular.copy(res.data.name);

                    administrationService.propertyGroup.getAllRelationSelect($scope.data.metadata.name).then(function (res) {
                        $scope.data.relationList = angular.copy(res.data.originalElement);
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    }, function (er) {
                        return console.error(er);
                    });
                }, function (err) {
                    return console.error(err);
                });
            } else {
                console.error(12);
            }
        } catch (e) {
            console.error(e);
        }
    };

    $scope.func.getMetadataList = function () {
        return new Promise(function (resolve, reject) {
            if ($scope.data.metadatas != null) resolve($scope.data.metadatas);else {
                administrationService.propertyGroup.list().then(function (pgres) {
                    if (pgres.data != null) {
                        $scope.data.metadatas = _.clone(pgres.data);
                        resolve($scope.data.metadatas);
                    }
                }, function (error) {
                    return reject(error);
                });
            }
        });
    };

    $scope.$on('featureReady', function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event, args) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context2.next = 5;
                                break;
                            }

                            _context2.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context2.sent;

                        case 5:
                            _context2.next = 10;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](0);

                            console.error(_context2.t0);

                        case 10:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[0, 7]]);
        }));

        return function (_x2, _x3) {
            return _ref2.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        try {
                            //TODO clear all interval and timeouts
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    _context3.prev = 0;
                                                    _context3.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context3.next = 8;
                                                    break;

                                                case 5:
                                                    _context3.prev = 5;
                                                    _context3.t0 = _context3["catch"](0);

                                                    console.error(_context3.t0);

                                                case 8:
                                                case "end":
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee3, _this, [[0, 5]]);
                                }));

                                return function (_x4, _x5) {
                                    return _ref4.apply(this, arguments);
                                };
                            }());
                            //TODO  clear all data and functions inside scope
                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, _this);
    })));
};

exports.default = createSelectRelationController;


createSelectRelationController.$inject = ['$scope', '$state', '$compile', '$uibModal', 'administrationService', 'toaster'];