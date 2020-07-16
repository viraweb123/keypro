'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./Service');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginServiceModule = angular.module('LoginService', []);

var LoginService = function () {
    function LoginService($q, $uibModal, Authentication, toaster, Restangular, $rootScope) {
        _classCallCheck(this, LoginService);

        LoginService.$uibModal = $uibModal;
        LoginService.auth = new _Service.Auth(Restangular, $q);
        LoginService.Authentication = Authentication;
        LoginService.toaster = toaster;
        LoginService.$rootScope = $rootScope;
    }

    _createClass(LoginService, [{
        key: 'loginPage',
        value: function loginPage() {
            return LoginService.Promise;
        }

        /* static loginServiceFactory($q,$uibModal,Authentication,toaster ,Restangular,$rootScope){
             'ngInject';
             return new LoginService($q,$uibModal,Authentication,toaster ,Restangular,$rootScope);
         }*/

    }], [{
        key: 'authorization',
        value: function authorization() {
            return new Promise(function (resolve, reject) {
                if (isCookieFunction("Authorization") != null) {
                    resolve(true);
                } else return LoginService.Promise;
            });
        }
    }, {
        key: 'modal',
        value: function modal(resolve, reject) {
            var _this = this;

            console.log(LoginService.$uibModal);
            LoginService.modalInstance = LoginService.$uibModal.open({
                template: '<div class="modal-content">\n                            <div class="modal-header">\n                                <div class="form-group">\n                                    <div class="col-sm-1 pull-left" >\n                                        <i class="fa fa-remove"  data-placement="top"  title="canel"  data-toggle="tooltip"  style="cursor: pointer;margin-right: 35px;"  ng-click="func.cancel()"></i>\n                                    </div>\n                                    <h4 class="modal-title col-sm-11 pull-right fontStyle">ورود به سایت</h4>\n                                </div>\n                            </div>\n                            <style>\n                                .loginFormMainDiv{\n                                    background-color: rgba(255,255,255,0);\n                                }\n                            </style>\n                            <div class="loginPage- modal-body" style="width: 597px !important; height: 376px;direction: rtl;">\n                                \n                                \n                            <div class="row form-group loginFormMainDiv">\n                                <md-content layout-padding  id="loginFormContent" >\n                                    <div class="rom form-group  userLogo">\n                                        <span  class="fa fa-user  userLoginIcon">\n                                            <md-tooltip  md-direction="bottom"  style="z-index:10;">\n                                ورود به سیستم\n                                            </md-tooltip>\n                                         </span>\n                                    </div>\n\n                                    <hr />\n\n                                    <form name="loginForm" novalidate role="form">\n\n                                            <div layout="row">\n                                                <input type="text"  style="display:none" />\n                                                <md-input-container class="md-block md-icon-float col-sm-12 col-xs-12">\n                                                    <label>نام کاربری</label>\n                                                    <md-icon md-font-icon="fa fa-user"></md-icon>\n                                                    <input\n                                                            id="txtUsername"\n                                                            required\n                                                            type="text"\n                                                            name="txtUsername"\n                                                            ng-model="data.txtUsername"\n                                                            minlength="2"\n                                                            maxlength="100"\n                                                            ui-keypress="{13:\'func.checkTrue($event)\'}"\n                                                    />\n                                                    <div ng-messages="loginForm.txtUsername.$error" role="alert">\n                                                        <div ng-message="required">\n                                                            لطفا یک نام کاربری وارد کنید\n                                                        </div>\n                                                        <div ng-message="minlength">\n                                                            نام کاربری حداقل باید ۲ کاراکتر داشته باشد\n                                                        </div>\n                                                        <div ng-message="minlength">\n                                                            نام کاربری نباید بیش از ۱۰۰ کاراکتر داشته باشد\n                                                        </div>\n                                                    </div>\n                                                </md-input-container>\n                                            </div>\n                                            <div layout="row">\n                                                <input type="password"  style="display:none" />\n                                                <md-input-container class="md-block md-icon-float col-sm-12 col-xs-12">\n                                                    <label>کلمه عبور</label>\n                                                    <md-icon md-font-icon="fa fa-key"></md-icon>\n                                                    <input\n                                                            id="txtPassword"\n                                                            required\n                                                            type="password"\n                                                            name="txtPassword"\n                                                            ng-model="data.txtPassword"\n                                                            minlength="2"\n                                                            maxlength="100"\n                                                            ui-keypress="{13:\'func.checkTrue($event)\'}"\n                                                    />\n                                                    <div ng-messages="loginForm.txtPassword.$error" role="alert">\n                                                       <div ng-message-exp="[\'required\', \'minlength\', \'maxlength\', \'pattern\']">\n                                                        لطفا یک کلمه عبور وارد کنید\n                                                    </div>\n                                                        <div ng-message="required">\n                                                            لطفا یک کلمه عبور وارد کنید\n                                                        </div>\n                                                        <div ng-message="minlength">\n                                                            کلمه عبور حداقل باید ۲ کاراکتر داشته باشد\n                                                        </div>\n                                                        <div ng-message="minlength">\n                                                            کلمه عبور نباید بیش از ۱۰۰ کاراکتر داشته باشد\n                                                        </div>\n                                                    </div>\n                                                </md-input-container>\n                                            </div>\n                                            <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>\n                                                <md-button class="md-raised" ng-click="func.checkTrue()">ورود</md-button>\n                                            </section>\n                    \n                                        </form>\n                                    </md-content>\n                                </div>\n                                \n                                \n                            </div>\n                 </div>',
                controller: function controller($scope, $uibModalInstance, auth, AuthenticationService, toasteres) {

                    $scope.loginForm = {};
                    $scope.data = {
                        txtUsername: '',
                        txtPassword: ''
                    };

                    $scope.func = {

                        checkTrue: function checkTrue() {

                            if ($scope.loginForm.txtUsername.hasOwnProperty('$setTouched')) $scope.loginForm.txtUsername.$setTouched();

                            if ($scope.loginForm.txtPassword.hasOwnProperty('$setTouched')) $scope.loginForm.txtPassword.$setTouched();

                            if ($scope.loginForm.$valid == true) $scope.func.login();
                        },

                        clearCashes: function () {
                            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                try {
                                                    window.localStorage.clear();
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                                //todo clear all Cashe
                                                _context.prev = 1;
                                                _context.next = 4;
                                                return clearSelectedCashFunction(['Authorization', 'TOKEN','JSESSIONID']);

                                            case 4:
                                                _context.next = 9;
                                                break;

                                            case 6:
                                                _context.prev = 6;
                                                _context.t0 = _context['catch'](1);

                                                console.error(_context.t0);

                                            case 9:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this, [[1, 6]]);
                            }));

                            function clearCashes() {
                                return _ref.apply(this, arguments);
                            }

                            return clearCashes;
                        }(),

                        sendLoginRequest: function sendLoginRequest() {
                            return new Promise(function (resolve, reject) {
                                auth.login($scope.data.txtUsername, $scope.data.txtPassword).then(function (authResult) {
                                    Authentication.setAuthenticate($scope.data.txtUsername, $scope.data.txtPassword).then(function (authenticationResult) {
                                        FeaturesManagement.setFeatures(authResult).then(function (featureResult) {
                                            resolve(featureResult);
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
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _context2.prev = 0;
                                                _context2.next = 3;
                                                return $scope.func.sendLoginRequest();

                                            case 3:
                                                $uibModalInstance.close(true);
                                                _context2.next = 10;
                                                break;

                                            case 6:
                                                _context2.prev = 6;
                                                _context2.t0 = _context2['catch'](0);

                                                toaster.pop('error', '', 'مشکلی در ارتباط با سرور ایجاد شده است لطفا دوباره تلاش کنید .');
                                                $uibModalInstance.close(false);

                                            case 10:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this, [[0, 6]]);
                            }));

                            function login() {
                                return _ref2.apply(this, arguments);
                            }

                            return login;
                        }()

                    };
                },
                size: 'md',
                backdrop: 'static', // false,
                keyboard: false,
                resolve: {
                    auth: function auth() {
                        return LoginService.auth;
                    },
                    AuthenticationService: function AuthenticationService() {
                        return LoginService.Authentication;
                    },
                    toasteres: function toasteres() {
                        return LoginService.toaster;
                    }
                }
            });
            LoginService.modalInstance.result.then(function (response) {
                if (response) {
                    LoginService.$rootScope.$broadcast("changeFeature", { changeInfo: true });
                    resolve(response);
                } else reject('در برقراری ارتباط با سرور مشکلی ایجاد شده است');
            }, function (error) {
                return reject('در برقراری ارتباط با سرور مشکلی ایجاد شده است');
            });
        }
    }, {
        key: 'Promise',
        get: function get() {
            LoginService._Promise = typeof LoginService._Promise === "undefined" ? new Promise(LoginService.modal) : LoginService._Promise;
            return LoginService._Promise;
        },
        set: function set(Promise) {
            LoginService._Promise = Promise;
        }
    }, {
        key: 'modalInstance',
        get: function get() {
            LoginService._modalInstance = typeof LoginService._modalInstance !== 'undefined' ? LoginService._modalInstance : undefined;
            return LoginService._modalInstance;
        },
        set: function set(modalInstance) {
            LoginService._modalInstance = modalInstance;
        }
    }]);

    return LoginService;
}();

/*LoginServiceModule.factory('loginModalSrvc', LoginService.loginServiceFactory);
export default LoginServiceModule = LoginServiceModule.name;*/


exports.default = LoginService;