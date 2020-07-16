'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CurrentUserInfoSrvc = require('./../../Class/Service/CurrentUserInfoSrvc');

var _CurrentUserInfoSrvc2 = _interopRequireDefault(_CurrentUserInfoSrvc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginConfig = function () {
    function LoginConfig() {
        _classCallCheck(this, LoginConfig);
    }

    _createClass(LoginConfig, null, [{
        key: 'config',
        value: function config($stateProvider) {
            'ngInject';

            var _this = this;

            _.forEach([{
                state: 'main.login',
                config: {
                    url: '/login',
                    views: {
                        'mainContent@main': {
                            templateUrl: 'ecma5/Modules/Login/login.html?dev=' + randomVersionName,
                            controller: 'LoginController'
                        }
                    },
                    onEnter: function () {
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return CSSManagement.addCSS('ecma5/Modules/Login/login.css?dev=' + randomVersionName);

                                        case 3:
                                            //todo clear all local storage
                                            try {
                                                window.localStorage.clear();
                                            } catch (e) {
                                                console.error(e);
                                            }
                                            //todo clear all Cashe
                                            _context.prev = 4;
                                            _context.next = 7;
                                            return clearSelectedCashFunction(['Authorization', 'TOKEN']);

                                        case 7:
                                            _context.next = 12;
                                            break;

                                        case 9:
                                            _context.prev = 9;
                                            _context.t0 = _context['catch'](4);

                                            console.error(_context.t0);

                                        case 12:
                                            _context.prev = 12;
                                            _context.next = 15;
                                            return _CurrentUserInfoSrvc2.default.removeUser();

                                        case 15:
                                            _context.next = 20;
                                            break;

                                        case 17:
                                            _context.prev = 17;
                                            _context.t1 = _context['catch'](12);

                                            console.error(_context.t1);

                                        case 20:
                                            //todo clear all Features get From Server
                                            FeaturesManagement.removeFeatures();
                                            _context.next = 26;
                                            break;

                                        case 23:
                                            _context.prev = 23;
                                            _context.t2 = _context['catch'](0);

                                            console.error(_context.t2);

                                        case 26:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this, [[0, 23], [4, 9], [12, 17]]);
                        }));

                        function onEnter() {
                            return _ref.apply(this, arguments);
                        }

                        return onEnter;
                    }(),
                    onExit: function () {
                        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.prev = 0;
                                            _context2.next = 3;
                                            return CSSManagement.removeCSS('ecma5/Modules/Login/login.css?dev=' + randomVersionName);

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

                        function onExit() {
                            return _ref2.apply(this, arguments);
                        }

                        return onExit;
                    }()
                }
            }], function (state) {
                return $stateProvider.state(state.state, state.config);
            });
        }
    }]);

    return LoginConfig;
}();

exports.default = LoginConfig.config;