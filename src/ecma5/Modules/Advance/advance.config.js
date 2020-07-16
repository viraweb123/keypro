'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdvanceConfig = function () {
    function AdvanceConfig() {
        _classCallCheck(this, AdvanceConfig);
    }

    _createClass(AdvanceConfig, null, [{
        key: 'config',
        value: function config($stateProvider) {
            'ngInject';

            var _this = this;

            _.forEach([{
                state: 'main.page.advance',
                config: {
                    url: '/advance',
                    views: {
                        'pageContent@main.page': {
                            templateUrl: 'ecma5/Modules/Advance/advance.html?dev=' + randomVersionName,
                            controller: 'AdvanceController'
                        },
                        'sideZone@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Sides/zone.html?dev=' + randomVersionName
                        },
                        'sideR@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Sides/sideR.html?dev=' + randomVersionName
                        },
                        'sideL@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Sides/sideL.html?dev=' + randomVersionName
                        },
                        'zoneR@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Sides/zoneR.html?dev=' + randomVersionName
                        },
                        'zoneL@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Sides/zoneL.html?dev=' + randomVersionName
                        },
                        'systematicVisible@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Zones/systematicVisible.html?dev=' + randomVersionName
                        },
                        'contentKeywordsNoteVisible@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Zones/contentKeywordsNoteVisible.html?dev=' + randomVersionName
                        },
                        'smetadataVisible@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Zones/smetadataVisible.html?dev=' + randomVersionName
                        },
                        'storeVisible@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Zones/storeVisible.html?dev=' + randomVersionName
                        },
                        'newsVisible@main.page.advance': {
                            templateUrl: 'ecma5/Modules/Advance/Zones/newsVisible.html?dev=' + randomVersionName
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
                                            return CSSManagement.addCSS('ecma5/Modules/Advance/advance.css?dev=' + randomVersionName);

                                        case 3:
                                            _context.next = 8;
                                            break;

                                        case 5:
                                            _context.prev = 5;
                                            _context.t0 = _context['catch'](0);

                                            console.error(_context.t0);

                                        case 8:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this, [[0, 5]]);
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
                                            return CSSManagement.removeCSS('ecma5/Modules/Advance/advance.css?dev=' + randomVersionName);

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

    return AdvanceConfig;
}();

exports.default = AdvanceConfig.config;