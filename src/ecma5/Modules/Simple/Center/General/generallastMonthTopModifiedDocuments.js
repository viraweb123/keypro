'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Features = require('./../../../../Class/Service/Features');

var _Features2 = _interopRequireDefault(_Features);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var generallastMonthTopModifiedDocuments = function generallastMonthTopModifiedDocuments($scope, dashboardService) {
    var _this = this;

    _classCallCheck(this, generallastMonthTopModifiedDocuments);

    $scope.data = {
        profile: null
    };

    $scope.func = {};
    $scope.func.todo = function () {};

    $scope.$on('featureReady', function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event, args) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context.next = 5;
                                break;
                            }

                            _context.next = 3;
                            return _Features2.default.getFeatures(dashboardService.auth);

                        case 3:
                            $scope.data.profile = _context.sent;

                            $scope.func.todo();

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
};

exports.default = generallastMonthTopModifiedDocuments;


generallastMonthTopModifiedDocuments.$inject = ['$scope', 'dashboardService'];