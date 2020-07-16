'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bookmarksController = function bookmarksController($scope, $state, dashboardService, toaster) {
    var _this = this;

    _classCallCheck(this, bookmarksController);

    $scope.data = {
        removeExternalFuncs: {},
        profile: null,
        list: [],
        sort: {
            type: null,
            ascDesc: true
        },
        getThumbnails: false
    };

    $scope.func = {};

    $scope.func.getThumbnailFile = function (item) {
        return new Promise(function (resolve, reject) {
            try {
                dashboardService.document.thumbnail({ uuid: item.node }, 0, 75).then(function (result) {
                    return resolve("data:image/png;base64," + result.data);
                }, function (error) {
                    resolve(item.docType == 'document' ? '/static/img/_blank.png' : '/static/image/folder.png');
                });
            } catch (e) {
                console.error(e);
                resolve(item.docType == 'document' ? '/static/img/_blank.png' : '/static/image/folder.png');
            }
        });
    };

    $scope.func.getThumbnails = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        $scope.data.getThumbnails = true;
                        i = 0;

                    case 3:
                        if (!(i < $scope.data.list.length)) {
                            _context.next = 22;
                            break;
                        }

                        _context.prev = 4;
                        _context.next = 7;
                        return $scope.func.getThumbnailFile($scope.data.list[i]);

                    case 7:
                        $scope.data.list[i].src = _context.sent;
                        _context.next = 14;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](4);

                        $scope.data.list[i].src = $scope.data.list[i].docType == 'document' ? '/static/img/_blank.png' : '/static/image/folder.png';
                        return _context.abrupt('continue', 19);

                    case 14:
                        _context.prev = 14;

                        _.defer(function () {
                            return $scope.$apply();
                        });

                        if ($scope.data.getThumbnails) {
                            _context.next = 18;
                            break;
                        }

                        return _context.abrupt('break', 22);

                    case 18:
                        return _context.finish(14);

                    case 19:
                        i++;
                        _context.next = 3;
                        break;

                    case 22:
                        _context.next = 27;
                        break;

                    case 24:
                        _context.prev = 24;
                        _context.t1 = _context['catch'](0);

                        console.error(_context.t1);

                    case 27:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this, [[0, 24], [4, 10, 14, 19]]);
    }));

    $scope.func.go2Desktop = function (item) {
        try {
            if (!$scope.data.profile.prfStack.taxonomyVisible) throw new Error("امکان ورود به این صفحه وجود ندارد .");
            try {
                console.log(item);

                switch (item.docType) {
                    case "document":
                        dashboardService.document.getProperties(item.node).then(function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(res) {
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _context2.prev = 0;

                                                if (!(res != null && _.has(res, 'data') && res.data != null && _.has(res.data, 'originalElement') && res.data.originalElement != null && _.has(res.data.originalElement, 'document') && res.data.originalElement.document != null)) {
                                                    _context2.next = 9;
                                                    break;
                                                }

                                                _context2.next = 4;
                                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/saveChangeStateVar.js?dev=' + randomVersionName);

                                            case 4:
                                                _context2.next = 6;
                                                return setStateVarFunction(res.data.originalElement.document);

                                            case 6:
                                                $state.go('main.page.desktop', {}, { reload: false });
                                                _context2.next = 10;
                                                break;

                                            case 9:
                                                toaster.pop("error", "", "مشکلی در دریافت اطلاعات فایل درخواستی به وجود آمده است.");

                                            case 10:
                                                _context2.next = 15;
                                                break;

                                            case 12:
                                                _context2.prev = 12;
                                                _context2.t0 = _context2['catch'](0);

                                                toaster.pop("error", "", "مشکلی در دریافت اطلاعات فایل درخواستی به وجود آمده است.");

                                            case 15:
                                                console.log(res);

                                            case 16:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this, [[0, 12]]);
                            }));

                            return function (_x) {
                                return _ref2.apply(this, arguments);
                            };
                        }(), function (err) {
                            toaster.pop("error", "", "مشکلی در دریافت اطلاعات فایل درخواستی به وجود آمده است.");
                        });
                        break;
                    case "folder":
                        dashboardService.folder.getProperties(item.node).then(function () {
                            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(res) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.prev = 0;

                                                if (!(res != null && _.has(res, 'data') && res.data != null && _.has(res.data, 'originalElement') && res.data.originalElement != null && _.has(res.data.originalElement, 'folder') && res.data.originalElement.folder != null)) {
                                                    _context3.next = 9;
                                                    break;
                                                }

                                                _context3.next = 4;
                                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/saveChangeStateVar.js?dev=' + randomVersionName);

                                            case 4:
                                                _context3.next = 6;
                                                return setStateVarFunction(res.data.originalElement.folder);

                                            case 6:
                                                $state.go('main.page.desktop', {}, { reload: false });
                                                _context3.next = 10;
                                                break;

                                            case 9:
                                                toaster.pop("error", "", "مشکلی در دریافت اطلاعات پوشه درخواستی به وجود آمده است.");

                                            case 10:
                                                _context3.next = 15;
                                                break;

                                            case 12:
                                                _context3.prev = 12;
                                                _context3.t0 = _context3['catch'](0);

                                                toaster.pop("error", "", "مشکلی در دریافت اطلاعات پوشه درخواستی به وجود آمده است.");

                                            case 15:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this, [[0, 12]]);
                            }));

                            return function (_x2) {
                                return _ref3.apply(this, arguments);
                            };
                        }(), function (err) {
                            toaster.pop("error", "", "مشکلی در دریافت اطلاعات درخواستی به وجود آمده است.");
                        });
                        break;
                    default:
                        toaster.pop("error", "", "مشکلی در دریافت اطلاعات درخواستی به وجود آمده است.");
                        break;
                }
            } catch (e) {
                console.error(e);
            }
        } catch (e) {
            console.error(e);
            toaster.pop("error", "", e.message);
        }
    };

    $scope.func.todo = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var bookmarks, i;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;

                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.remove('display');
                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.remove('display');
                        $scope.data.isDownload = true;

                        _context4.prev = 4;
                        _context4.next = 7;
                        return dashboardService.bookmark.getList();

                    case 7:
                        bookmarks = _context4.sent;

                        if (!(bookmarks != null && _.has(bookmarks, 'data') && bookmarks.data != null && _.has(bookmarks.data, 'originalElement'))) {
                            _context4.next = 24;
                            break;
                        }

                        bookmarks = _.isArray(bookmarks.data.originalElement) ? bookmarks.data.originalElement : [bookmarks.data.originalElement];

                        for (i = 0; i < bookmarks.length; i++) {
                            bookmarks[i].src = '/static/img/_blank.png';
                            bookmarks[i].typeName = bookmarks[i].type == 'okm:document' ? 'فایل' : 'پوشه';
                            bookmarks[i].docType = bookmarks[i].type == 'okm:document' ? 'document' : 'folder';
                        }

                        _context4.next = 13;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=' + randomVersionName);

                    case 13:
                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=' + randomVersionName] = 'toDateDashboardCtrl';
                        _context4.next = 16;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                    case 16:
                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType,srcMimeType';

                        $scope.data.list = angular.copy(bookmarks);
                        bookmarks = undefined;
                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.add('display');
                        /*_.defer(()=>{
                            $(".dashboard .CR div.tabel-body  div.body-view table").niceScroll({
                                cursorcolor:"#fbbb3d",
                                cursorwidth: "8px",
                                cursorborderradius: "0px",
                                rtlmode: false
                            });
                        },100);*/
                        $scope.data.getThumbnails = false;
                        $scope.func.getThumbnails();

                        _context4.next = 25;
                        break;

                    case 24:
                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.add('display');

                    case 25:
                        $scope.data.isDownload = false;
                        _context4.next = 33;
                        break;

                    case 28:
                        _context4.prev = 28;
                        _context4.t0 = _context4['catch'](4);

                        toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
                        $scope.data.isDownload = false;
                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.add('display');

                    case 33:
                        _context4.next = 38;
                        break;

                    case 35:
                        _context4.prev = 35;
                        _context4.t1 = _context4['catch'](0);

                        console.error(_context4.t1);

                    case 38:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, _this, [[0, 35], [4, 28]]);
    }));

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
                            return FeaturesManagement.getFeatures(dashboardService.auth);

                        case 4:
                            $scope.data.profile = _context5.sent;

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

        return function (_x3, _x4) {
            return _ref5.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        try {

                            $scope.data.getThumbnails = false;

                            //$(".dashboard .CR div.tabel-body  div.body-view table").getNiceScroll().remove();
                            //TODO clear all interval and timeouts
                            /*window.clearAllTimeouts();*/
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

                                return function (_x5, _x6) {
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

exports.default = bookmarksController;


bookmarksController.$inject = ['$scope', '$state', 'dashboardService', 'toaster'];