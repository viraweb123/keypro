'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Running = exports.Configuration = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FA = require('./../Class/translates/FA');

var _FA2 = _interopRequireDefault(_FA);

var _EN = require('./../Class/translates/EN');

var _EN2 = _interopRequireDefault(_EN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Configuration = exports.Configuration = function () {
    function Configuration() {
        _classCallCheck(this, Configuration);
    }

    _createClass(Configuration, null, [{
        key: 'configAPP',
        value: function configAPP($translateProvider, $compileProvider, $locationProvider) {
            'ngInject';

            $translateProvider.translations('fa', _FA2.default);
            $translateProvider.translations('en', _EN2.default);
            $translateProvider.translations('fa', _FA2.default).preferredLanguage('fa');
            $compileProvider.debugInfoEnabled = false;
            /* $locationProvider.html5Mode(true);*/
        }
    }]);

    return Configuration;
}();

var Running = exports.Running = function () {
    function Running() {
        _classCallCheck(this, Running);
    }

    _createClass(Running, null, [{
        key: 'runAPP',
        value: function runAPP($rootScope, Restangular, toaster, $state, $http, $q, Authentication) {
            var _this = this;

            /**todo prevent some keys in tab**/
            $(document).ready(function () {
                function copyToClipboard() {
                    // Create a "hidden" input
                    var aux = document.createElement("input");
                    // Assign it the value of the specified element
                    aux.setAttribute("value", "امکان گرفتن تصویر از این صفحه وجود ندارد");
                    // Append it to the body
                    document.body.appendChild(aux);
                    // Highlight its content
                    aux.select();
                    // Copy the highlighted text
                    document.execCommand("copy");
                    // Remove it from the body
                    document.body.removeChild(aux);
                    $("body").show();
                    window.document.body.style.display = "";
                    toaster.pop("error", "", "امکان دریافت تصویر در این صفحه نیست .");
                    _.defer(function () {
                        return $rootScope.$apply();
                    });
                }
                //todo window.addEventListener("keyup", function(event) {
                $(document).on("keyup", function (event) {
                    try {
                        if (event.keyCode == 44 || event.keyCode == 42 || event.key == "PrintScreen") {
                            $("body").hide();
                            window.document.body.style.display = "none";
                            event.cancelBubble = true;
                            event.preventDefault();
                            event.stopImmediatePropagation();
                            copyToClipboard();
                            return false;
                        }
                    } catch (e) {
                        $("body").show();
                        window.document.body.style.display = "";
                        console.error(e);
                    }
                });
                //todo $(window).keydown(function(event) {
                $(document).on("keydown", function (event) {
                    try {

                        if (event.keyCode == 44 || event.keyCode == 42 || event.key == "PrintScreen") {
                            $("body").hide();
                            window.document.body.style.display = "none";
                            event.cancelBubble = true;
                            event.preventDefault();
                            event.stopImmediatePropagation();
                            copyToClipboard();
                            return false;
                        }
                    } catch (e) {
                        $("body").show();
                        window.document.body.style.display = "";
                        console.error(e);
                    }

                    try {
                        //console.info(event.keyCode);
                        //cancel print page
                        if (event.ctrlKey && (event.key == "p" || event.key == "P" || event.keyCode == 80)) {
                            event.cancelBubble = true;
                            event.preventDefault();
                            event.stopImmediatePropagation();

                            toaster.pop("error", "", "امکان گرفتن پرینت از صفحه فوق نیست .");
                            _.defer(function () {
                                return $rootScope.$apply();
                            });
                            return false;
                        }
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        //cancel save page
                        if (event.ctrlKey && (event.key == "s" || event.key == "S" || event.keyCode == 83)) {
                            event.cancelBubble = true;
                            event.preventDefault();
                            event.stopImmediatePropagation();

                            toaster.pop("error", "", "امکان ذخیره کردن صفحه فوق نیست .");
                            _.defer(function () {
                                return $rootScope.$apply();
                            });
                            return false;
                        }
                    } catch (e) {
                        console.error(e);
                    }
                });
            });

            var statesTitleLookUpTable = {
                "desktop": "keydoc میزکار",
                "simple": "keydoc جستجو ساده",
                "advance": "keydoc جستجو پیشرفته",
                "cloud": "keydoc کلید واژه",
                "report": "keydoc گزارش",
                "dashboard": "keydoc داشبورد",
                "administration": "keydoc مدیریت",
                "login": "keydoc ورودبه سیستم",
                "map": "keydoc نقشه"
            };

            /**TODO   management forward , backward in menu navigation **/
            $rootScope.$on('$stateChangeStart', function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(e, toState, toParams, fromState, fromParams) {
                    var navigationItems;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:

                                    try {
                                        window.document.title = statesTitleLookUpTable[toState.name.replace(/(main.)?(page.)?/i, "").split(".")[0]] || "keydocPro";
                                    } catch (e) {
                                        window.document.title = "keydocPro";
                                    }

                                    _context.prev = 1;

                                    if (!(fromState.name == "main.page.administration.Profile")) {
                                        _context.next = 6;
                                        break;
                                    }

                                    FeaturesManagement._features = null;
                                    _context.next = 6;
                                    return FeaturesManagement.getFeatures(Authentication.auth);

                                case 6:
                                    _context.next = 11;
                                    break;

                                case 8:
                                    _context.prev = 8;
                                    _context.t0 = _context['catch'](1);

                                    console.error(_context.t0);

                                case 11:
                                    navigationItems = null;

                                    try {
                                        toaster.clear();
                                    } catch (e) {
                                        console.error(e);
                                    }
                                    _context.prev = 13;
                                    _context.next = 16;
                                    return getSelectedLocalStorage('navigationItems');

                                case 16:
                                    navigationItems = _context.sent;

                                    if (!(navigationItems == null || !_.has(navigationItems, 'List') || !_.isArray(navigationItems.List) || !_.has(navigationItems, 'currentLocation') || !_.isNumber(navigationItems.currentLocation))) {
                                        _context.next = 19;
                                        break;
                                    }

                                    throw new Error("not create older");

                                case 19:
                                    if (_.has(navigationItems, 'direction')) {
                                        navigationItems.currentLocation += navigationItems.direction;
                                        navigationItems.direction = undefined;
                                        delete navigationItems.direction;
                                    } else {
                                        navigationItems.List.splice(navigationItems.currentLocation + 1);
                                        if (navigationItems.List.length >= 25) {
                                            navigationItems.List.splice(0, 1);
                                            navigationItems.currentLocation--;
                                        }
                                        navigationItems.List.push(toState.name);
                                        navigationItems.currentLocation++;
                                    }
                                    _context.next = 22;
                                    return setSelectedLocalStorage(_.clone(navigationItems), 'navigationItems');

                                case 22:
                                    _context.next = 35;
                                    break;

                                case 24:
                                    _context.prev = 24;
                                    _context.t1 = _context['catch'](13);

                                    navigationItems = {
                                        List: [toState.name],
                                        currentLocation: 0
                                    };
                                    _context.prev = 27;
                                    _context.next = 30;
                                    return setSelectedLocalStorage(_.clone(navigationItems), 'navigationItems');

                                case 30:
                                    _context.next = 35;
                                    break;

                                case 32:
                                    _context.prev = 32;
                                    _context.t2 = _context['catch'](27);

                                    console.error(_context.t2);

                                case 35:
                                    _context.prev = 35;

                                    navigationItems = undefined;
                                    /*TODO reset authorization cookie expires time */
                                    creatNewExpiresCookieFunction("Authorization", expiresTimeLefy);
                                    return _context.finish(35);

                                case 39:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[1, 8], [13, 24, 35, 39], [27, 32]]);
                }));

                return function (_x, _x2, _x3, _x4, _x5) {
                    return _ref.apply(this, arguments);
                };
            }());

            Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                return data;
            });

            var newAuthorizationRequest = function newAuthorizationRequest(element, operation, route, url, headers, params, httpConfig) {
                return new Promise(function (resolve, reject) {
                    Authentication.authorizationFunc().then(function (res) {
                        Authentication.removePermision().then(function (success) {
                            var AuthName = isCookieFunction("Authorization");
                            resolve({
                                element: element,
                                params: params,
                                headers: AuthName != null ? _.extend(headers || {}, { Authorization: decodeURIComponent(_.replace(AuthName, "Bearer", "Bearer ")) }) : headers,
                                httpConfig: httpConfig || {}
                            });
                        }, function (err) {
                            return console.error(err);
                        });
                    }, function (error) {
                        return Authentication.backToLoign();
                    });
                });
            };

            var notShowWaiting = {
                'document/getThumbnail': 'thumbnail'
            };

            Restangular.addFullRequestInterceptor(function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(element, operation, route, url, headers, params, httpConfig) {
                    var defer, header, AuthName, loginInfo;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if (!_.has(notShowWaiting, route)) $("#show-waiting-get-rest-from-server-id").addClass('show-waiting');
                                    if (_.includes(['remove', 'delete'], operation)) {
                                        headers = _.extend(headers || {}, { 'Content-Type': 'application/json' });
                                        element = null;
                                    }
                                    defer = $q.defer();
                                    header = headers;

                                    if (!(url == "/KeydocPro/services/rest/auth/login")) {
                                        _context2.next = 8;
                                        break;
                                    }

                                    headers = _.extend(headers || {}, {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    });
                                    _context2.next = 25;
                                    break;

                                case 8:
                                    AuthName = isCookieFunction("Authorization");

                                    if (!(AuthName == null)) {
                                        _context2.next = 24;
                                        break;
                                    }

                                    httpConfig.timeout = defer.promise;
                                    defer.resolve();
                                    _context2.prev = 12;
                                    _context2.next = 15;
                                    return newAuthorizationRequest(element, operation, route, url, headers, params, httpConfig);

                                case 15:
                                    loginInfo = _context2.sent;
                                    return _context2.abrupt('return', loginInfo);

                                case 19:
                                    _context2.prev = 19;
                                    _context2.t0 = _context2['catch'](12);

                                    console.error(_context2.t0);

                                case 22:
                                    _context2.next = 25;
                                    break;

                                case 24:
                                    headers = _.extend(headers || {}, {
                                        Authorization: decodeURIComponent(_.replace(AuthName, "Bearer", "Bearer "))
                                    });

                                case 25:
                                    return _context2.abrupt('return', {
                                        element: element,
                                        headers: headers,
                                        params: params,
                                        httpConfig: httpConfig
                                    });

                                case 26:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[12, 19]]);
                }));

                return function (_x6, _x7, _x8, _x9, _x10, _x11, _x12) {
                    return _ref2.apply(this, arguments);
                };
            }());

            Restangular.setFullResponse(true);

            Restangular.setResponseExtractor(function (response, operation, what, url, response2, deferred) {
                if (operation == 'remove' && response2.status == 204) toaster.pop('success', '', 'اطلاعات با موفقیت حذف گردید');
                var newResponse = angular.copy(response) || {};
                if (operation === 'getList') {
                    if (!angular.isArray(response)) {
                        newResponse = response.items;
                        delete response.items;
                        angular.extend(newResponse, response);
                    }
                } else if (response !== null && _.has(response, 'items')) {
                    newResponse = response.items;
                    delete response.items;
                    angular.extend(newResponse, response);
                }
                var newResponse2 = newResponse;
                if (typeof newResponse2 !== 'string' && typeof newResponse2 !== 'boolean' && typeof newResponse2 !== 'number') {
                    newResponse2.originalElement = angular.copy(newResponse);
                    if (angular.isObject(response)) {
                        angular.extend(newResponse2.originalElement, response);
                    }
                }
                creatNewExpiresCookieFunction("Authorization", expiresTimeLefy);
                return newResponse2;
            });

            Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
                $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                switch (response.status) {
                    case 502:
                    case "502":
                        if (_.has(response.config, 'url')) {
                            switch (response.config.url) {
                                case "/KeydocPro/services/rest/propertyGroup/setProperties":
                                    toaster.pop("error", "", "در قسمت مدیریت دسترسی فراداده ای برای این مقادیر تعریف نگردیده است.");
                                    break;
                            }
                        }
                        break;
                    case 503:
                    case "503":
                        if (_.has(response, 'data')) toaster.pop("error", "", response.data);
                        break;
                }
                return !(response.status === 200); // error not handled
            });

            Restangular.setRequestInterceptor(function (element, operation, route, url) {
                if (element && element.name) delete element.name;
                return element;
            });

            Restangular.setDefaultHeaders({
                'X-Force-Content-Type': 'application/json',
                Accept: 'application/json, text/plain'
            });

            Restangular.setBaseUrl('/KeydocPro/services/rest');
        }
    }]);

    return Running;
}();