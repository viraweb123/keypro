'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Features = require('./../../../../Class/Service/Features');

var _Features2 = _interopRequireDefault(_Features);

var _CreateScript = require('./../../../../Class/Old/CreateScript');

var _CreateScript2 = _interopRequireDefault(_CreateScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*import {GetSetStateClass as exit}   from './../../../../Class/getSetState';*/

var generallastUploadedDocumentsController = function generallastUploadedDocumentsController($scope, dashboardService) {
    var _this = this;

    _classCallCheck(this, generallastUploadedDocumentsController);

    $scope.data = {
        profile: null,
        list: [],
        isDownload: true,
        sort: {
            type: null,
            ascDesc: true
        }
    };

    $scope.func = {};

    $scope.func.todo = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.remove('display');

                        _context.next = 3;
                        return (0, _CreateScript2.default)('ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=' + randomVersionName);

                    case 3:
                        _context.next = 5;
                        return (0, _CreateScript2.default)('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                    case 5:
                        _context.next = 7;
                        return (0, _CreateScript2.default)('ecma5/ExternalLiberary/Dashboard/fileSizeDashboardCtrl.js?dev=' + randomVersionName);

                    case 7:

                        $scope.data.isDownload = true;
                        dashboardService.dashboard.getList("getLastUploadedDocuments").then(function (res) {
                            _.map(res.data.originalElement, function (item) {
                                item.document.created = toDateDashboardCtrl(item.document.created);
                                item.document.lastModified = toDateDashboardCtrl(item.document.lastModified);
                                item.document.title = item.document.path.split("/").pop();
                            });
                            $scope.data.list = _.clone(res.data.originalElement);
                            _.forEach($scope.data.list, function (item) {
                                item.mimeType = getSrcFromType(item.document.mimeType);
                                item.document.actualVersion.newSize = fileSizeDashboardCtrl(item.document.actualVersion.size);
                                dashboardService.document.thumbnail(item.document, 0, 75).then(function (resThumnail) {
                                    return item.src = 'data:image/png;base64,' + resThumnail.data;
                                }, function (error) {
                                    return item.src = getSrcFromType(item.document.mimeType);
                                });
                            });
                            window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.add('display');
                            setTimeout(function () {
                                $(".dashboard .CR div.tabel-body  div.body-view table").niceScroll({
                                    cursorcolor: "#fbbb3d",
                                    cursorwidth: "8px",
                                    cursorborderradius: "0px",
                                    rtlmode: false
                                });
                            }, 100);
                            $scope.data.isDownload = false;
                        });

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    $scope.$on('featureReady', function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event, args) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context2.next = 5;
                                break;
                            }

                            _context2.next = 3;
                            return _Features2.default.getFeatures(dashboardService.auth);

                        case 3:
                            $scope.data.profile = _context2.sent;

                            $scope.func.todo();

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x, _x2) {
            return _ref2.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return (0, _CreateScript2.default)('ecma5/Class/getSetState.js?dev=' + randomVersionName);

                    case 3:
                        _context3.next = 5;
                        return exitFromStateFunction($scope.data, $scope.func);

                    case 5:
                        _context3.next = 11;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](0);

                        $scope.func = undefined;
                        $scope.data = undefined;

                    case 11:
                        _context3.prev = 11;

                        window.clearAllIntervals();
                        return _context3.finish(11);

                    case 14:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this, [[0, 7, 11, 14]]);
    })));
};

exports.default = generallastUploadedDocumentsController;


generallastUploadedDocumentsController.$inject = ['$scope', 'dashboardService'];