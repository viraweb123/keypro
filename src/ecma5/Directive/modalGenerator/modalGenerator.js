"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = modalGenerator;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function modalGenerator($compile, $http, $parse) {
    var _this = this;

    return {
        restrict: "EA",
        scope: {
            funcRun: "="
        },
        templateUrl: "../../../ecma5/Directive/modalGenerator/modalGenerator.html?dev=" + randomVersionName,
        controller: ['$scope', '$translate', '$element', '$sce', 'toaster', function ($scope, $translate, $element, $sce, toaster) {

            $scope.data = {
                modalClassType: null //['TOP23']
            };

            $scope.getControllerBody = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(path, name, viewClass, parameters) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    $scope.data.modalClassType = viewClass;
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    _context.next = 5;
                                    return JSManagement.addJS(path);

                                case 5:
                                    _context.next = 7;
                                    return window[name]($scope, $translate, $element, $sce, toaster, parameters);

                                case 7:
                                    _context.next = 9;
                                    return JSManagement.removeJS(path, name);

                                case 9:
                                    _context.next = 14;
                                    break;

                                case 11:
                                    _context.prev = 11;
                                    _context.t0 = _context["catch"](0);

                                    console.error(_context.t0);

                                case 14:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 11]]);
                }));

                return function (_x, _x2, _x3, _x4) {
                    return _ref.apply(this, arguments);
                };
            }();

            if ($scope.funcRun == null) $scope.funcRun = $scope.getControllerBody;

            $element.on('$destroy', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                try {
                                    $scope.$destroy();
                                } catch (e) {
                                    console.error(e);
                                }

                            case 1:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this);
            })));
        }]
    };
}