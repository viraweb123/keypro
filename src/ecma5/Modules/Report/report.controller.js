'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReportController = function ReportController($scope, reportService, toaster, $state, $uibModal, $sce) {
    var _this = this;

    _classCallCheck(this, ReportController);

    $scope.externalScope = {
        InitializationForm: null,
        footer: {
            'edit': {
                'id': 'success',
                'click': function click(properties, form) {
                    return $scope.func.downloadMetaData(properties, form);
                },
                'icon': 'fa-download',
                'label': 'دریافت'
            },
            'view': {
                'id': 'success',
                'click': function click(properties, form) {
                    return $scope.func.viewMetaData(properties, form);
                },
                'icon': 'fa-eye',
                'label': 'نمایش'
            }
        }
    };
    $scope.initFillMetaData = null;
    $scope.getScopeItems = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Report/reportStateController.js?dev=' + randomVersionName);

                    case 3:
                        _context.next = 5;
                        return reportStateController($scope, reportService, toaster, $state, $uibModal, $sce);

                    case 5:
                        _context.next = 7;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Report/reportStateController.js?dev=' + randomVersionName, 'reportStateController');

                    case 7:
                        $scope.func.run();
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](0);

                        console.error(_context.t0);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this, [[0, 10]]);
    }));
    $scope.getScopeItems();
};

exports.default = ReportController;

ReportController.$inject = ['$scope', 'reportService', 'toaster', '$state', '$uibModal', '$sce'];