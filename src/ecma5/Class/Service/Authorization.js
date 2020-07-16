'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./Service');

var _CurrentUserInfoSrvc = require('./CurrentUserInfoSrvc');

var _CurrentUserInfoSrvc2 = _interopRequireDefault(_CurrentUserInfoSrvc);

var _Base = require('./../Base64');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthorizationModule = angular.module('authorizationService', []);

var Authorization = function () {
    function Authorization(Restangular, $http, $state, $rootScope, $uibModal, $q) {
        _classCallCheck(this, Authorization);

        this.$state = $state;
        this.$rootScope = $rootScope;
        this.uibModal = $uibModal;
        this.auth = new _Service.Auth(Restangular, $q);
    }

    /** TODO -------------------------------------------------------   Variables  -------------------------------------------------  **/


    _createClass(Authorization, [{
        key: 'removePermision',


        /** TODO -------------------------------------------------------   Functions  -------------------------------------------------  **/

        value: function removePermision() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.Promise == null;
                resolve(true);
            });
        }
    }, {
        key: 'backToLoign',
        value: function backToLoign() {
            /* TODO
                back to login page and refresh site
            */
            /*window.location.hash = "#/login";
            window.location.reload(true);*/
            this.$state.go('main.login', {}, { reload: false });
        }
    }, {
        key: 'setAuthenticate',
        value: function setAuthenticate(username, password, $http, authService, expiresTimeig) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                try {
                    var expiresTime;

                    (function () {
                        var item = password; //base.encode(`${username}:${password}`);
                        try {
                            expiresTime = new Date();

                            var time = typeof expiresTimeig !== "undefined" && _.isNumber(expiresTimeig) ? expiresTimeig : expiresTimeLefy;
                            expiresTime.setUTCMinutes(expiresTime.getUTCMinutes() + time);
                            expiresTime = ' expires=' + expiresTime.toUTCString();
                            createCookiesWithNameFunction('Authorization', 'Bearer' + item, expiresTime).then(function () {
                                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    try {
                                                        $http.defaults.headers.common['Authorization'] = 'Bearer' + item;
                                                        $http.defaults.headers.common['Content-Type'] = 'application/json';
                                                        $http.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
                                                        authService.changeRestangularItems(item);
                                                        $.ajaxSetup({
                                                            headers: {
                                                                'Authorization': 'Bearer' + item,
                                                                'Content-Type': 'application/json'
                                                            }
                                                        });
                                                    } catch (err) {
                                                        console.error(err);
                                                    } finally {
                                                        resolve({ data: 'sucess' });
                                                    }

                                                case 1:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this2);
                                }));

                                return function (_x) {
                                    return _ref.apply(this, arguments);
                                };
                            }(), function (rej) {
                                reject(rej);
                            });
                        } catch (e) {
                            reject(e.message || e);
                        }
                    })();
                } catch (e) {
                    reject(e.message || e);
                }
            });
        }
    }, {
        key: 'authorizationFunc',
        value: function authorizationFunc() {
            var _this3 = this;

            if (this.Promise == null) {
                this.Promise = new Promise(function (resolve, reject) {
                    if (isCookieFunction("Authorization") != null) FeaturesManagement.getFeatures(_this3.auth).then(function (res) {
                        return resolve(true);
                    }, function (error) {
                        return _this3.modal(resolve, reject);
                    });else _this3.modal(resolve, reject);
                });
            }
            return this.Promise;
        }
    }, {
        key: 'modal',
        value: function modal(resolve, reject) {
            var _this4 = this;

            FeaturesManagement.removeFeatures();
            this.modalInstance = this.uibModal.open({
                animation: true,
                templateUrl: 'login.html',
                controller: function controller($scope, $http, $uibModalInstance, toaster, auth, setAuthenticate, feature, removeUser) {
                    $scope.loginForm = {};
                    $scope.data = {
                        txtUsername: '',
                        txtPassword: '',
                        removeExternalFuncs: {}
                    };
                    $scope.func = {
                        checkTrue: function checkTrue() {
                            if ($scope.loginForm.txtUsername.hasOwnProperty('$setTouched')) $scope.loginForm.txtUsername.$setTouched();
                            if ($scope.loginForm.txtPassword.hasOwnProperty('$setTouched')) $scope.loginForm.txtPassword.$setTouched();
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            if ($scope.loginForm.$valid == true) $scope.func.login();
                        },
                        clearCashes: function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                try {
                                                    window.localStorage.clear();
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                                //todo clear all Cashe
                                                _context2.prev = 1;
                                                _context2.next = 4;
                                                return clearSelectedCashFunction(['Authorization', 'TOKEN','JSESSIONID']);

                                            case 4:
                                                _context2.next = 9;
                                                break;

                                            case 6:
                                                _context2.prev = 6;
                                                _context2.t0 = _context2['catch'](1);

                                                console.error(_context2.t0);

                                            case 9:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this4, [[1, 6]]);
                            }));

                            function clearCashes() {
                                return _ref2.apply(this, arguments);
                            }

                            return clearCashes;
                        }(),
                        sendLoginRequest: function sendLoginRequest() {
                            return new Promise(function (resolve, reject) {
                                auth.login($scope.data.txtUsername, $scope.data.txtPassword).then(function (authResult) {
                                    setAuthenticate($scope.data.txtUsername, authResult.data.Tokens.Token, $http, auth, expiresTimeLefy).then(function (authenticationResult) {
                                        feature.setFeatures(authResult).then(function (featureResult) {
                                            return resolve(featureResult);
                                        }, function (featureError) {
                                            $scope.func.clearCashes();
                                            reject("عدم دریافت ویژگی ها");
                                        });
                                    }, function (authenticationError) {
                                        $scope.func.clearCashes();
                                        reject("عدم ذخیره در کش سایت");
                                    });
                                }, function (error) {
                                    return reject(error);
                                });
                            });
                        },

                        login: function () {
                            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.prev = 0;
                                                _context3.next = 3;
                                                return $scope.func.sendLoginRequest();

                                            case 3:
                                                $uibModalInstance.close(true);
                                                _context3.next = 10;
                                                break;

                                            case 6:
                                                _context3.prev = 6;
                                                _context3.t0 = _context3['catch'](0);

                                                toaster.pop('error', '', 'مشکلی در ارتباط با سرور ایجاد شده است لطفا دوباره تلاش کنید .');
                                                $uibModalInstance.close(false);

                                            case 10:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this4, [[0, 6]]);
                            }));

                            function login() {
                                return _ref3.apply(this, arguments);
                            }

                            return login;
                        }(),

                        cancel: function cancel() {
                            return $uibModalInstance.close(false);
                        }

                    };

                    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                                switch (_context5.prev = _context5.next) {
                                    case 0:
                                        try {
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
                                                    }, _callee4, _this4, [[0, 5]]);
                                                }));

                                                return function (_x2, _x3) {
                                                    return _ref5.apply(this, arguments);
                                                };
                                            }());
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
                        }, _callee5, _this4);
                    })));
                },
                size: 'md',
                backdrop: 'static', // false,
                keyboard: false,
                resolve: {
                    auth: function auth() {
                        return _this4.auth;
                    },
                    setAuthenticate: function setAuthenticate() {
                        return _this4.setAuthenticate;
                    },
                    feature: function feature() {
                        return FeaturesManagement;
                    },
                    removeUser: function removeUser() {
                        return _CurrentUserInfoSrvc2.default.removeUser().then(function (res) {});
                    }
                }
            });
            this.modalInstance.result.then(function (response) {
                if (response) {
                    _this4.Promise = null;
                    _this4.$rootScope.$broadcast("changeFeature", { changeInfo: true });
                    resolve(response);
                } else {
                    _this4.Promise = null;
                    reject('در برقراری ارتباط با سرور مشکلی ایجاد شده است');
                }
            }, function (error) {
                _this4.Promise = null;reject('در برقراری ارتباط با سرور مشکلی ایجاد شده است');
            });
        }
    }, {
        key: '$state',
        set: function set($state) {
            this._$state = $state;
        },
        get: function get() {
            this._$state = this._$state || null;
            return this._$state;
        }
    }, {
        key: '$rootScope',
        set: function set($rootScope) {
            this._$rootScope = $rootScope;
        },
        get: function get() {
            this._$rootScope = this._$rootScope || null;
            return this._$rootScope;
        }
    }, {
        key: 'uibModal',
        set: function set(uibModal) {
            this._uibModal = uibModal;
        },
        get: function get() {
            this._uibModal = this._uibModal || null;
            return this._uibModal;
        }
    }, {
        key: 'auth',
        get: function get() {
            this._auth = this._auth || null;
            return this._auth;
        },
        set: function set(auth) {
            this._auth = auth;
        }
    }, {
        key: 'Promise',
        get: function get() {

            this._Promise = this._Promise || null;
            return this._Promise;
        },
        set: function set(Promise) {
            this._Promise = Promise;
        }
    }, {
        key: 'modalInstance',
        get: function get() {
            this._modalInstance = typeof this._modalInstance !== 'undefined' ? this._modalInstance : undefined;
            return this._modalInstance;
        },
        set: function set(modalInstance) {
            this._modalInstance = modalInstance;
        }
    }], [{
        key: 'AuthorizationFactory',
        value: function AuthorizationFactory(Restangular, $http, $state, $rootScope, $uibModal, $q) {
            'ngInject';

            return new Authorization(Restangular, $http, $state, $rootScope, $uibModal, $q);
        }
    }]);

    return Authorization;
}();

AuthorizationModule.factory('Authentication', Authorization.AuthorizationFactory);
exports.default = AuthorizationModule = AuthorizationModule.name;