'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var relationController = function relationController($scope, $state, $compile, $uibModal, administrationService, toaster) {
    var _this = this;

    _classCallCheck(this, relationController);

    $scope.data = {

        removeExternalFuncs: {},
        profile: null,
        state: "relation",

        selectRelation: null,
        relations: null,
        sort: {
            type: null,
            ascDesc: true
        }
    };

    $scope.func = {};

    $scope.func.addNewRelation = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Administration/addOrEditRelationFunction.js?dev=' + randomVersionName);

                    case 3:
                        _context.next = 5;
                        return addOrEditRelationFunction($uibModal, {
                            description: null,
                            relationType: null,
                            title: null,
                            titleA2B: null,
                            titleB2A: null
                        }, _.map($scope.data.relations, 'title'));

                    case 5:
                        response = _context.sent;
                        _context.next = 8;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/addOrEditRelationFunction.js?dev=' + randomVersionName, 'addOrEditRelationFunction');

                    case 8:
                        administrationService.relation.createRelationDefinition(response.title, response.titleA2B, response.titleB2A, response.description, response.relationType).then(function (res) {
                            if (_.has(res.data, 'originalElement') && _.has(res.data.originalElement, 'relationDefinition')) {
                                $scope.data.relations = $scope.data.relations != null ? $scope.data.relations : [];
                                $scope.data.relations.push(_.clone(res.data.originalElement.relationDefinition));
                                $scope.data.selectRelation = res.data.originalElement.relationDefinition.id;
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            }
                        }, function (error) {
                            return toaster.pop('error', '', 'مشکلی در ایجاد رابطه جدید به وجود آمده است');
                        });

                        _context.next = 16;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](0);

                        console.error(_context.t0);
                        _context.next = 16;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/addOrEditRelationFunction.js?dev=' + randomVersionName, 'addOrEditRelationFunction');

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this, [[0, 11]]);
    }));

    $scope.func.editRelation = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(r) {
            var response;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/addOrEditRelationFunction.js?dev=' + randomVersionName);

                        case 3:
                            _context2.next = 5;
                            return addOrEditRelationFunction($uibModal, angular.copy(r), _.map($scope.data.relations, 'title'));

                        case 5:
                            response = _context2.sent;
                            _context2.next = 8;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/addOrEditRelationFunction.js?dev=' + randomVersionName, 'addOrEditRelationFunction');

                        case 8:
                            administrationService.relation.updateRelationDefinition(response.id, response.title, response.titleA2B, response.titleB2A, response.description).then(function (res) {
                                var index = _.findIndex($scope.data.relations, function (relation) {
                                    return relation.id == r.id;
                                });
                                if (index >= 0) {
                                    $scope.data.relations[index] = _.clone(res.data.originalElement.relationDefinition);
                                    $scope.data.selectRelation = $scope.data.relations[index].id;
                                }
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            });
                            _context2.next = 16;
                            break;

                        case 11:
                            _context2.prev = 11;
                            _context2.t0 = _context2['catch'](0);

                            console.error(_context2.t0);
                            _context2.next = 16;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/addOrEditRelationFunction.js?dev=' + randomVersionName, 'addOrEditRelationFunction');

                        case 16:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[0, 11]]);
        }));

        return function (_x) {
            return _ref2.apply(this, arguments);
        };
    }();

    $scope.func.removeRelation = function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(r) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/removeSelectRelation.js?dev=' + randomVersionName);

                        case 3:
                            _context3.next = 5;
                            return removeSelectRelation($uibModal, r.title);

                        case 5:
                            _context3.next = 7;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeSelectRelation.js?dev=' + randomVersionName, 'removeSelectRelation');

                        case 7:
                            administrationService.relation.deleteRelationDefinition(r.id).then(function (res) {
                                try {
                                    $scope.data.relations.splice(_.findIndex($scope.data.relations, function (relation) {
                                        return relation.id == r.id;
                                    }), 1);
                                } catch (e) {
                                    console.error(e);
                                }
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            }, function (error) {
                                return toaster.pop('error', '', 'مشکلی در حذف رابطه به وجود آمده است');
                            });
                            _context3.next = 15;
                            break;

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3['catch'](0);

                            console.error(_context3.t0);
                            _context3.next = 15;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeSelectRelation.js?dev=' + randomVersionName, 'removeSelectRelation');

                        case 15:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[0, 10]]);
        }));

        return function (_x2) {
            return _ref3.apply(this, arguments);
        };
    }();

    $scope.func.todo = function () {
        try {

            administrationService.relation.listDefinition().then(function () {
                var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(res) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    if (res.data != null && _.isArray(res.data)) {
                                        $scope.data.relations = _.clone(res.data);
                                    }

                                case 1:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, _this);
                }));

                return function (_x3) {
                    return _ref4.apply(this, arguments);
                };
            }(), function (error) {
                return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
            });
        } catch (e) {
            console.error(e);
        }
    };

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

        return function (_x4, _x5) {
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

                                return function (_x6, _x7) {
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

exports.default = relationController;


relationController.$inject = ['$scope', '$state', '$compile', '$uibModal', 'administrationService', 'toaster'];