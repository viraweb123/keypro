'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapConfig = function () {
    function MapConfig() {
        _classCallCheck(this, MapConfig);
    }

    _createClass(MapConfig, null, [{
        key: 'config',
        value: function config($stateProvider) {
            'ngInject';

            var _this = this;

            _.forEach([{
                state: 'main.page.map',
                config: {
                    url: '/map',
                    views: {
                        'pageContent@main.page': {
                            templateUrl: 'ecma5/Modules/Map/map.html?dev=' + randomVersionName,
                            controller: 'MapController'
                        },
                        'sideZone@main.page.map': {
                            templateUrl: 'ecma5/Modules/Map/Sides/zone.html?dev=' + randomVersionName
                        },
                        'zoneR@main.page.map': {
                            templateUrl: 'ecma5/Modules/Map/Sides/zoneR.html?dev=' + randomVersionName
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
                                            return CSSManagement.addCSS('ecma5/Modules/Map/map.css?dev=' + randomVersionName);

                                        case 3:
                                            _context.next = 5;
                                            return CSSManagement.addCSS('resource/styleSheet/ol.css?dev=' + randomVersionName);

                                        case 5:
                                            _context.next = 7;
                                            return JSManagement.addJS('resource/javaScript/ol.js?dev=' + randomVersionName);

                                        case 7:
                                            _context.next = 9;
                                            return JSManagement.addJS('static/js/ol3-ext_interaction_transforminteraction.js?dev=' + randomVersionName);

                                        case 9:
                                            _context.next = 14;
                                            break;

                                        case 11:
                                            _context.prev = 11;
                                            _context.t0 = _context['catch'](0);

                                            console.error(_context.t0);

                                        case 14:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this, [[0, 11]]);
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
                                            return CSSManagement.removeCSS('ecma5/Modules/Map/map.css?dev=' + randomVersionName);

                                        case 3:
                                            _context2.next = 5;
                                            return CSSManagement.removeCSS('resource/styleSheet/ol.css?dev=' + randomVersionName);

                                        case 5:
                                            _context2.next = 7;
                                            return JSManagement.removeJS('static/js/ol3-ext_interaction_transforminteraction.js?dev=' + randomVersionName, '');

                                        case 7:
                                            _context2.next = 9;
                                            return JSManagement.removeJS('resource/javaScript/ol.js?dev=' + randomVersionName, 'ol');

                                        case 9:
                                            _context2.next = 14;
                                            break;

                                        case 11:
                                            _context2.prev = 11;
                                            _context2.t0 = _context2['catch'](0);

                                            console.error(_context2.t0);

                                        case 14:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, _this, [[0, 11]]);
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

    return MapConfig;
}();

exports.default = MapConfig.config;