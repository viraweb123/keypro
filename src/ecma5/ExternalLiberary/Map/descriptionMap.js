'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var descriptionMapCtrl = function descriptionMapCtrl(uibModal, _map) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: '/ecma5/ExternalLiberary/Map/descriptionMap.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, map) {
                $scope.data = {
                    title: map.title,
                    description: map.description
                };
                $scope.func = {};
                $scope.func.exit = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    $uibModalInstance.close(true);

                                case 1:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));
            },
            size: 'md',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                map: function map() {
                    return _map;
                }
            }
        });
    });
};