"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defineDigitalSignController = function defineDigitalSignController($scope, $state, $compile, administrationService, toaster, $uibModal, $upload) {
    var _this = this;

    _classCallCheck(this, defineDigitalSignController);

    $scope.data = {
        removeExternalFuncs: {}
    };

    $scope.func = {};

    $scope.func.todo = function () {};

    $scope.$on('featureReady', function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event, args) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context.next = 6;
                                break;
                            }

                            _context.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context.sent;

                            //TODO login with server
                            $scope.func.todo();

                        case 6:
                            _context.next = 11;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](0);

                            console.error(_context.t0);

                        case 11:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 8]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {

                            //TODO clear all interval and timeouts
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _context2.prev = 0;
                                                    _context2.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context2.next = 8;
                                                    break;

                                                case 5:
                                                    _context2.prev = 5;
                                                    _context2.t0 = _context2["catch"](0);

                                                    console.error(_context2.t0);

                                                case 8:
                                                case "end":
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, _this, [[0, 5]]);
                                }));

                                return function (_x3, _x4) {
                                    return _ref3.apply(this, arguments);
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
                        return _context3.stop();
                }
            }
        }, _callee3, _this);
    })));
};

exports.default = defineDigitalSignController;


defineDigitalSignController.$inject = ['$scope', '$state', '$compile', 'administrationService', 'toaster', '$uibModal', '$upload'];