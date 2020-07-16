'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*import  {default as theme}    from   './../../Class/loginTheme';*/
/*import  {default as captchaGenerator}    from   './../../ExternalLiberary/Intelligent/captchaGenerator';*/
var LoginController = exports.LoginController = function LoginController($scope, $http, toaster, $state, userService, Authentication) {
    var _this = this;

    _classCallCheck(this, LoginController);

    $scope.loginForm = {};
    $scope.data = {
        txtUsername: '',
        txtPassword: '',
        removeExternalFuncs: {},
        captchaValue: "",
        txtCaptcha: '',
        showCaptch: false,
        alphanum: new Array('A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'i', 'J', 'j', 'K', 'k', 'M', 'm', 'N', 'n', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9'),
        fontName: new Array('IRANSans-web', 'IRANSans-web-bold', 'IRANSans-web-medium', 'arial', 'sans-serif', 'IRANSans-web-ultraLight', 'IRANSans-web-light'),
        randomGeneratorFuncStyle: new Array(function (ctx, text) {
            ctx.setTransform(1, -0.2, 0, 1, 0, 0);
            ctx.fillText(text, 15, 40);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.save();
        }, function (ctx, text) {
            ctx.setTransform(1, -0.2, 0.5, 1, 0, 0);
            ctx.fillText(text, 0, 40);
            ctx.setTransform(0, -0.6, 1, 0, 1, 0);
            ctx.save();
        }, function (ctx, text) {
            ctx.setTransform(1, 0.32, 0, 1, 0, 0);
            ctx.fillText(text, 20, 12);
            ctx.setTransform(1, 0.05, 0, 1, 0, 0);
            ctx.save();
        }, function (ctx, text) {
            ctx.setTransform(1, 0.2, 1, 1, 0, 0);
            ctx.fillText(text, 0, 25);
            ctx.setTransform(1, -0.3, 1, 1, 0, 0);
            ctx.save();
        }, function (ctx, text) {
            ctx.setTransform(1, -0.44, 0, 0.5, 0, 0);
            ctx.fillText(text, 10, 98);
            ctx.setTransform(1, 0.27, 1, 0.5, -0.5, 0);
            ctx.save();
        }, function (ctx, text) {
            ctx.setTransform(1, 0.3, 1, 1, 0, 0);
            ctx.fillText(text, 0, 20);
            ctx.setTransform(1, -0.40, 0, 1, 0, 0);
            ctx.save();
        }, function (ctx, text) {
            ctx.setTransform(1, -0.1, 1, 1, 0, 0);
            ctx.fillText(text, 0, 31);
            ctx.setTransform(1, 0.2, 0, 1, 0, 0);
            ctx.save();
        }, function (ctx, text) {
            ctx.setTransform(1, 0.3, 1, 1, 0, 0);
            ctx.fillText(text, 10, 15);
            ctx.setTransform(1, 0.2, 0, 1, 0, 0);
            ctx.save();
        }, function (ctx, text) {
            ctx.setTransform(1, 0.34, 1, 1, 1, 1);
            ctx.fillText(text, 10, 13);
            ctx.setTransform(1, 0.4, 1, 1, 1, 1);
            ctx.save();
        })

    };

    $scope.func = {
        checkTrue: function checkTrue() {
            if ($scope.loginForm.txtUsername.hasOwnProperty('$setTouched')) $scope.loginForm.txtUsername.$setTouched();
            if ($scope.loginForm.txtPassword.hasOwnProperty('$setTouched')) $scope.loginForm.txtPassword.$setTouched();

            if ($scope.data.showCaptch && $scope.loginForm.txtCaptcha.hasOwnProperty('$setTouched')) {
                $scope.loginForm.txtCaptcha.$setTouched();
                if (_.toLower($scope.data.txtCaptcha) !== _.toLower($scope.data.captchaValue)) {
                    $scope.loginForm.txtCaptcha.$setValidity("size", false);
                    toaster.pop("error", "", "عبارت ورودی صحیح نمی باشد.");
                } else {
                    $scope.loginForm.txtCaptcha.$setValidity("size", true);
                }
            }
            _.defer(function () {
                return $scope.$apply();
            });
            if ($scope.loginForm.$valid == true) $scope.func.login();
        },
        checkCaptch: function checkCaptch() {
            if ($scope.loginForm.txtCaptcha.hasOwnProperty('$setTouched')) {
                $scope.loginForm.txtCaptcha.$setTouched();
                if (_.toLower($scope.data.txtCaptcha) !== _.toLower($scope.data.captchaValue)) {
                    $scope.loginForm.txtCaptcha.$setValidity("size", false);
                } else {
                    $scope.loginForm.txtCaptcha.$setValidity("size", true);
                }
            }
        },
        goToDaneshHamaraSite: function goToDaneshHamaraSite() {
            return window.open('http://www.dhamara.com', '_blank');
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
                                return clearSelectedCashFunction(['Authorization', 'TOKEN']);

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
                userService.auth.login($scope.data.txtUsername, $scope.data.txtPassword).then(function (authResult) {
					Authentication.setAuthenticate($scope.data.txtUsername, authResult.data.Tokens.Token, $http, userService.auth, expiresTimeLefy).then(function (authenticationResult) {
                        FeaturesManagement.setFeatures(authResult).then(function (featureResult) {
                            return resolve(featureResult);
                        }, function (featureError) {
                            try {
                                if (!$scope.data.showCaptch) {
                                    $scope.data.showCaptch = true;
                                    $scope.func.captcha(true);
                                } else $scope.func.captcha();
                                toaster.pop('error', '', "عدم دریافت ویژگی ها");
                            } catch (e) {
                                console.error(e || e.message);
                            } finally {
                                $scope.func.clearCashes();
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                reject(error);
                            }
                        });
                    }, function (authenticationError) {
                        try {
                            if (!$scope.data.showCaptch) {
                                $scope.data.showCaptch = true;
                                $scope.func.captcha(true);
                            } else $scope.func.captcha();
                            toaster.pop('error', '', "عدم ذخیره در کش سایت");
                        } catch (e) {
                            console.error(e || e.message);
                        } finally {
                            $scope.func.clearCashes();
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            reject(error);
                        }
                    });
                }, function (error) {
                    try {
                        if (!$scope.data.showCaptch) {
                            $scope.data.showCaptch = true;
                            $scope.func.captcha(true);
                        } else $scope.func.captcha();
                        toaster.pop('error', '', 'مشکلی در ورود به سیستم به وجود آمده است.');
                    } catch (e) {
                        console.error(e || e.message);
                    } finally {
                        $scope.func.clearCashes();
                        _.defer(function () {
                            return $scope.$apply();
                        });
                        reject(error);
                    }
                });
            });
        },
        login: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var authResult, state;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return $scope.func.sendLoginRequest();

                            case 3:
                                authResult = _context2.sent;
                                state = authResult.prfTab.defaultTab;
                                _context2.t0 = authResult.prfTab.defaultTab;
                                _context2.next = _context2.t0 === "administration" ? 8 : _context2.t0 === "search" ? 10 : 12;
                                break;

                            case 8:
                                if (!authResult.prfTab.administrationVisible) state = "desktop";
                                return _context2.abrupt('break', 13);

                            case 10:
                                state = "simple";
                                return _context2.abrupt('break', 13);

                            case 12:
                                return _context2.abrupt('break', 13);

                            case 13:
                                $state.go('main.page.' + state, {}, { reload: false });
                                _context2.next = 19;
                                break;

                            case 16:
                                _context2.prev = 16;
                                _context2.t1 = _context2['catch'](0);

                                toaster.pop('error', '', 'can not login');

                            case 19:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[0, 16]]);
            }));

            function login() {
                return _ref2.apply(this, arguments);
            }

            return login;
        }()
    };

    $scope.func.captcha = function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(firstTime) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            /*await JSManagement.addJS(`ecma5/ExternalLiberary/Intelligent/captchaGenerator.js?dev=${randomVersionName}`);
                            $scope.data.removeExternalFuncs[`ecma5/ExternalLiberary/Intelligent/captchaGenerator.js?dev=${randomVersionName}`] = 'captchaGenerator';
                            $scope.data.captchaValue = await captchaGenerator('.loginFormMainDiv canvas#captcha_canvas_keydocpro_login_state',5);*/
                            _.defer(function () {
                                try {
                                    var canvas = window.document.querySelector('.loginFormMainDiv canvas#captcha_canvas_keydocpro_login_state');
                                    var ctx = canvas.getContext('2d');
                                    ctx.clearRect(-500, -500, canvas.width + 1000, canvas.height + 1000);
                                    var digit = "";
                                    var value = "";
                                    var number = 5;
                                    for (var i = 0; i < number; i++) {
                                        var val = $scope.data.alphanum[_.random(0, $scope.data.alphanum.length - 1)];
                                        digit += val + " ";
                                        value += val;
                                    }
                                    digit = _.trim(digit);
                                    var fontSize = _.random(15, 18);
                                    ctx.font = fontSize + 'px ' + $scope.data.fontName[_.random($scope.data.fontName.length - 1)];
                                    ctx.fillStyle = 'black';

                                    $scope.data.randomGeneratorFuncStyle[_.random(0, $scope.data.randomGeneratorFuncStyle.length - 1)](ctx, digit);
                                    //$scope.data.randomGeneratorFuncStyle[3](ctx,digit);

                                    $scope.data.captchaValue = _.toLower(value);
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    if (typeof firstTime === "undefined") _.defer(function () {
                                        return $scope.func.checkCaptch();
                                    }, 50);
                                } catch (e) {
                                    console.error(e || e.message);
                                }
                            }, 100);

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function (_x) {
            return _ref3.apply(this, arguments);
        };
    }();

    // run
    $scope.func.run = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        // new theme('.loginMain .loginPageSub',8,10,{min:-10,max:10},{min:10,max:20},{min:1,max:40});
                        try {
                            window.document.querySelector(".loginMain .loginPageSub").style.backgroundImage = 'url("static/backgrounds/' + _.random(1, 16) + '.jpg")';
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                        //_.defer(()=>$scope.func.captcha(true),1000);

                    case 1:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, _this);
    }));

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {
                            window.clearAllIntervals();

                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    _context5.prev = 0;

                                                    console.info(src);
                                                    _context5.next = 4;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 4:
                                                    _context5.next = 9;
                                                    break;

                                                case 6:
                                                    _context5.prev = 6;
                                                    _context5.t0 = _context5['catch'](0);

                                                    console.error(_context5.t0);

                                                case 9:
                                                case 'end':
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _callee5, _this, [[0, 6]]);
                                }));

                                return function (_x2, _x3) {
                                    return _ref6.apply(this, arguments);
                                };
                            }());

                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, _this);
    })));

    $scope.$on('$stateChangeSuccess', function () {
        // do something
        $scope.func.run();
    });
};

LoginController.$inject = ['$scope', '$http', 'toaster', '$state', 'userService', 'Authentication'];