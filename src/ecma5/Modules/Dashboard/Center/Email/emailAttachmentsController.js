'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emailAttachmentsController = function emailAttachmentsController($scope, $state, dashboardService, toaster) {
    var _this = this;

    _classCallCheck(this, emailAttachmentsController);

    $scope.data = {
        removeExternalFuncs: {},
        profile: null,
        list: [],
        isDownload: true,
        sort: {
            type: null,
            ascDesc: true
        }
    };

    $scope.func = {};

    $scope.func.todo = function () {
        try {
            window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.remove('display');
            window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.remove('display');
            $scope.data.isDownload = true;
            dashboardService.dashboard.getList("getUserLastImportedMailAttachments").then(function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=' + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=' + randomVersionName] = 'toDateDashboardCtrl';
                                    _context.next = 5;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                case 5:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType,srcMimeType';
                                    //await JSManagement.addJS(`ecma5/ExternalLiberary/Dashboard/fileSizeDashboardCtrl.js?dev=${randomVersionName}`);
                                    //$scope.data.removeExternalFuncs[`ecma5/ExternalLiberary/Dashboard/fileSizeDashboardCtrl.js?dev=${randomVersionName}`] = 'fileSizeDashboardCtrl';

                                    if (_.isArray(res.data.originalElement) && res.data.originalElement.length > 0) {
                                        _.map(res.data.originalElement, function (item) {
                                            item.document.created = toDateDashboardCtrl(item.document.created);
                                            item.document.lastModified = toDateDashboardCtrl(item.document.lastModified);
                                            item.document.title = item.document.path.split("/").pop();
                                            item.mimeType = getSrcFromType(item.document.mimeType);
                                            //item.document.actualVersion.newSize = fileSizeDashboardCtrl(item.document.actualVersion.size);
                                            dashboardService.document.thumbnail(item.document, 0, 75).then(function (resThumnail) {
                                                return item.src = 'data:image/png;base64,' + resThumnail.data;
                                            }, function (error) {
                                                return item.src = getSrcFromType(item.document.mimeType);
                                            });
                                        });
                                        $scope.data.list = _.clone(res.data.originalElement);
                                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.add('display');
                                        /*_.defer(()=>{
                                            $(".dashboard .CR div.tabel-body  div.body-view table").niceScroll({
                                                cursorcolor:"#fbbb3d",
                                                cursorwidth: "8px",
                                                cursorborderradius: "0px",
                                                rtlmode: false
                                            });
                                        },100);*/
                                    } else {
                                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.add('display');
                                    }
                                    $scope.data.isDownload = false;

                                case 8:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }(), function (error) {
                return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
            });
        } catch (e) {
            console.error(e);
        }
    };

    $scope.func.go2Desktop = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(item) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            try {
                                /*await JSManagement.addJS(`ecma5/ExternalLiberary/Public/saveChangeStateVar.js?dev=${randomVersionName}`);
                                await setStateVarFunction(item.document);
                                $state.go('main.page.desktop', {}, {reload: false});*/
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

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }();

    $scope.$on('featureReady', function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(event, args) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context3.next = 6;
                                break;
                            }

                            _context3.next = 4;
                            return FeaturesManagement.getFeatures(dashboardService.auth);

                        case 4:
                            $scope.data.profile = _context3.sent;

                            $scope.func.todo();

                        case 6:
                            _context3.next = 11;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](0);

                            console.error(_context3.t0);

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[0, 8]]);
        }));

        return function (_x3, _x4) {
            return _ref3.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        try {
                            /*$(".dashboard .CR div.tabel-body  div.body-view table").getNiceScroll().remove();*/
                            //TODO clear all interval and timeouts
                            /*window.clearAllTimeouts();*/
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    _context4.prev = 0;
                                                    _context4.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context4.next = 8;
                                                    break;

                                                case 5:
                                                    _context4.prev = 5;
                                                    _context4.t0 = _context4['catch'](0);

                                                    console.error(_context4.t0);

                                                case 8:
                                                case 'end':
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, _this, [[0, 5]]);
                                }));

                                return function (_x5, _x6) {
                                    return _ref5.apply(this, arguments);
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
                        return _context5.stop();
                }
            }
        }, _callee5, _this);
    })));
};

exports.default = emailAttachmentsController;


emailAttachmentsController.$inject = ['$scope', '$state', 'dashboardService', 'toaster'];