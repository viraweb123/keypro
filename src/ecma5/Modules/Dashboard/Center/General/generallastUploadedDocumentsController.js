"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var generallastUploadedDocumentsController = function generallastUploadedDocumentsController($scope, $state, dashboardService, toaster) {
    var _this = this;

    _classCallCheck(this, generallastUploadedDocumentsController);

    $scope.data = {
        removeExternalFuncs: {},
        profile: null,
        list: [],
        isDownload: true,
        sort: {
            type: null,
            ascDesc: true
        },
        isGetThumbnailsRequest: false
    };

    $scope.func = {};

    $scope.func.showThumbnails = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(list) {
            var i;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            i = 0;

                        case 2:
                            if (!(i < list.length)) {
                                _context.next = 20;
                                break;
                            }

                            if ($scope.data.isGetThumbnailsRequest) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt("break", 20);

                        case 5:
                            _context.prev = 5;
                            _context.next = 8;
                            return $scope.func.getThumbnailFile(list[i].document, getSrcFromType);

                        case 8:
                            list[i].src = _context.sent;
                            _context.next = 14;
                            break;

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context["catch"](5);

                            console.error("can not get iamge");

                        case 14:
                            _context.prev = 14;

                            _.defer(function () {
                                return $scope.$apply();
                            });
                            return _context.finish(14);

                        case 17:
                            i++;
                            _context.next = 2;
                            break;

                        case 20:
                            $scope.data.isGetThumbnailsRequest = false;
                            _context.next = 26;
                            break;

                        case 23:
                            _context.prev = 23;
                            _context.t1 = _context["catch"](0);

                            console.error(_context.t1.message || _context.t1);

                        case 26:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 23], [5, 11, 14, 17]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
    $scope.func.getThumbnailFile = function (file, getSrc) {
        return new Promise(function (resolve, reject) {
            try {
                dashboardService.document.thumbnail(file, 0, 75).then(function (result) {
                    return resolve("data:image/png;base64," + result.data);
                }, function (error) {
                    return resolve(getSrc(file.mimeType));
                });
            } catch (e) {
                console.error(e);
                resolve(getSrc(file.mimeType));
            }
        });
    };

    $scope.func.todo = function () {
        try {
            window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.remove('display');
            window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.remove('display');
            $scope.data.isDownload = true;
            $scope.data.isGetThumbnailsRequest = false;
            dashboardService.dashboard.getList("getLastUploadedDocuments").then(function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(res) {
                    var i;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=" + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=" + randomVersionName] = 'toDateDashboardCtrl';
                                    _context2.next = 5;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                                case 5:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType,srcMimeType';
                                    if (_.isArray(res.data.originalElement) && res.data.originalElement.length > 0) {
                                        for (i = 0; i < res.data.originalElement.length; i++) {
                                            res.data.originalElement[i].document.created = toDateDashboardCtrl(res.data.originalElement[i].document.created);
                                            res.data.originalElement[i].document.lastModified = toDateDashboardCtrl(res.data.originalElement[i].document.lastModified);
                                            res.data.originalElement[i].document.title = res.data.originalElement[i].document.path.split("/").pop();
                                            res.data.originalElement[i].src = getSrcFromType(res.data.originalElement[i].document.mimeType);
                                            $scope.data.list.push(angular.copy(res.data.originalElement[i]));
                                        }
                                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.add('display');
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        $scope.data.isGetThumbnailsRequest = true;
                                        $scope.func.showThumbnails($scope.data.list);
                                    } else {
                                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.add('display');
                                    }

                                    $scope.data.isDownload = false;

                                case 8:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this);
                }));

                return function (_x2) {
                    return _ref2.apply(this, arguments);
                };
            }(), function (error) {
                return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
            });
        } catch (e) {
            console.error(e);
        }
    };

    $scope.func.go2Desktop = function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(item) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;

                            if ($scope.data.profile.prfStack.taxonomyVisible) {
                                _context3.next = 3;
                                break;
                            }

                            throw new Error("امکان ورود به این صفحه وجود ندارد .");

                        case 3:
                            _context3.prev = 3;
                            _context3.next = 6;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Public/saveChangeStateVar.js?dev=" + randomVersionName);

                        case 6:
                            _context3.next = 8;
                            return setStateVarFunction(item.document);

                        case 8:
                            $state.go('main.page.desktop', {}, { reload: false });
                            _context3.next = 14;
                            break;

                        case 11:
                            _context3.prev = 11;
                            _context3.t0 = _context3["catch"](3);

                            console.error(_context3.t0);

                        case 14:
                            _context3.prev = 14;

                            $scope.data.isGetThumbnailsRequest = false;
                            return _context3.finish(14);

                        case 17:
                            _context3.next = 23;
                            break;

                        case 19:
                            _context3.prev = 19;
                            _context3.t1 = _context3["catch"](0);

                            console.error(_context3.t1);
                            toaster.pop("error", "", _context3.t1.message);

                        case 23:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[0, 19], [3, 11, 14, 17]]);
        }));

        return function (_x3) {
            return _ref3.apply(this, arguments);
        };
    }();

    $scope.$on('featureReady', function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(event, args) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context4.next = 6;
                                break;
                            }

                            _context4.next = 4;
                            return FeaturesManagement.getFeatures(dashboardService.auth);

                        case 4:
                            $scope.data.profile = _context4.sent;

                            $scope.func.todo();

                        case 6:
                            _context4.next = 11;
                            break;

                        case 8:
                            _context4.prev = 8;
                            _context4.t0 = _context4["catch"](0);

                            console.error(_context4.t0);

                        case 11:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[0, 8]]);
        }));

        return function (_x4, _x5) {
            return _ref4.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {
                            $scope.data.isGetThumbnailsRequest = false;

                            //$(".dashboard .CR div.tabel-body  div.body-view table").getNiceScroll().remove();
                            //TODO clear all interval and timeouts
                            /*window.clearAllTimeouts();*/
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    _context5.prev = 0;
                                                    _context5.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context5.next = 8;
                                                    break;

                                                case 5:
                                                    _context5.prev = 5;
                                                    _context5.t0 = _context5["catch"](0);

                                                    console.error(_context5.t0);

                                                case 8:
                                                case "end":
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _callee5, _this, [[0, 5]]);
                                }));

                                return function (_x6, _x7) {
                                    return _ref6.apply(this, arguments);
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
                        return _context6.stop();
                }
            }
        }, _callee6, _this);
    })));
};

exports.default = generallastUploadedDocumentsController;


generallastUploadedDocumentsController.$inject = ['$scope', '$state', 'dashboardService', 'toaster'];