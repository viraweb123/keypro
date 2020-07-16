'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Base = require('./../../../Class/Base64');

var _Base2 = _interopRequireDefault(_Base);

var _isLoginManagement = require('./../../../Class/Service/isLoginManagement');

var _isLoginManagement2 = _interopRequireDefault(_isLoginManagement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var externalManagementIFRAME = function externalManagementIFRAME($scope, $state, $compile, administrationService, toaster) {
    var _this = this;

    _classCallCheck(this, externalManagementIFRAME);

    $scope.data = {
        removeExternalFuncs: {},
        profile: null
    };
    $scope.func = {};

    $scope.func.todo = function (src) {
        try {
            while (window.document.querySelector("#managementIFrameParent").childElementCount > 0) {
                window.document.querySelector("#managementIFrameParent").removeChild(window.document.querySelector("#managementIFrameParent").firstChild);
            }
            angular.element(window.document.querySelector("#managementIFrameParent")).append($compile('<iframe id="externalIFrame"  style="width:100%;height:100%;" src="' + src + '" ></iframe>')($scope));
            if (typeof isReadyDom !== "undefined") {
                clearInterval(isReadyDom);
                isReadyDom = null;
            }
            var isReadyDom = setInterval(function () {
                try {
                    if ($($('#externalIFrame')[0]).contents().find("html #breadcrumb").length > 0) {
                        clearInterval(isReadyDom);
                        isReadyDom = null;
                        $($('#externalIFrame')[0]).contents().find("html #breadcrumb").hide();
                        $('#externalIFrame').load(function () {
                            if ($($('#externalIFrame')[0]).contents().find("html #breadcrumb").length > 0) $($('#externalIFrame')[0]).contents().find("html #breadcrumb").hide();
                        });
                    }
                } catch (e) {
                    console.error(e);
                }
            }, 100);
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.login2OldSite = function (state) {
        return new Promise(function (resolve, reject) {
            try {
                if (_isLoginManagement2.default.isLogin == null) {
                    var username, password;

                    (function () {
                        var _$split = _.split(_Base2.default.decode(_.trim(_.replace(decodeURIComponent(isCookieFunction('Authorization')), /Bearer/g, ""))), ":");

                        var _$split2 = _slicedToArray(_$split, 2);

                        username = _$split2[0];
                        password = _$split2[1];

                        var xmlhttp = new window.XMLHttpRequest();
                        xmlhttp.open("POST", 'KeydocPro/j_spring_security_check?j_language=fa-IR&j_password=' + password + '&j_username=' + username);
                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4) {
                                try {
                                    if (xmlhttp.status == 200 || xmlhttp.status == 204) {
                                        var xmlhttpGet = new window.XMLHttpRequest();
                                        xmlhttpGet.open("GET", 'KeydocPro/admin/index.jsp?lang=fa-IR');
                                        xmlhttpGet.onreadystatechange = function () {
                                            if (xmlhttpGet.readyState == 4) {
                                                if (xmlhttpGet.status == 200 || xmlhttp.status == 204) {
                                                    var list = [];
                                                    try {
                                                        _.forEach($($.parseHTML(xmlhttpGet.responseText)).find("li>a"), function (a) {
                                                            return list.push(_.clone(a.pathname));
                                                        });
                                                    } catch (er) {
                                                        console.error(er);
                                                    }
                                                    _isLoginManagement2.default.isLogin = list;
                                                    resolve(true);
                                                } else {
                                                    resolve(true);
                                                }
                                            }
                                        };
                                        xmlhttpGet.send();
                                    } else {
                                        reject("عدم دریافت اطلاعات از سرور");
                                    }
                                } catch (error) {
                                    reject(error);
                                }
                            }
                        };
                        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
                        xmlhttp.send(null);
                    })();
                } else {
                    resolve(true);
                }
            } catch (e) {
                reject(e);
            }
        });
    };
    $scope.$on('featureReady', function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event, args) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context.next = 8;
                                break;
                            }

                            _context.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context.sent;
                            _context.next = 7;
                            return $scope.func.login2OldSite();

                        case 7:
                            if (_.has($state.params, "src") && !_.includes([null, ""], $state.params.src)) $scope.func.todo($state.params.src);

                        case 8:
                            _context.next = 13;
                            break;

                        case 10:
                            _context.prev = 10;
                            _context.t0 = _context['catch'](0);

                            console.error(_context.t0);

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 10]]);
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
                            try {
                                if (typeof isReadyDom !== "undefined") {
                                    clearInterval(isReadyDom);
                                    isReadyDom = null;
                                }
                            } catch (e) {
                                console.error(e);
                            }
                            try {
                                while (window.document.querySelector("#managementIFrameParent").childElementCount > 0) {
                                    window.document.querySelector("#managementIFrameParent").removeChild(window.document.querySelector("#managementIFrameParent").firstChild);
                                }
                            } catch (e) {
                                console.error(e);
                            }
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
                                                    _context2.t0 = _context2['catch'](0);

                                                    console.error(_context2.t0);

                                                case 8:
                                                case 'end':
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
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this);
    })));
};

exports.default = externalManagementIFRAME;


externalManagementIFRAME.$inject = ['$scope', '$state', '$compile', 'administrationService', 'toaster'];