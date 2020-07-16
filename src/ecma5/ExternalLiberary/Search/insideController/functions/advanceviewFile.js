'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advanceviewFileAdvanceCtrl = function advanceviewFileAdvanceCtrl($scope, advanceService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.advanceviewFile = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(doc) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.t0 = doc.type;
                                    _context.next = _context.t0 === 'document' ? 4 : _context.t0 === 'folder' ? 17 : 41;
                                    break;

                                case 4:
                                    _context.next = 6;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName);

                                case 6:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName] = 'viewerFolderFunction';

                                    _context.prev = 7;
                                    _context.next = 10;
                                    return viewerFolderFunction($uibModal, JSManagement, CSSManagement, advanceService, { uuid: doc.uuid, type: 'document' }, $scope.data.profile);

                                case 10:
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    _context.next = 16;
                                    break;

                                case 13:
                                    _context.prev = 13;
                                    _context.t1 = _context['catch'](7);

                                    console.error(_context.t1);

                                case 16:
                                    return _context.abrupt('break', 43);

                                case 17:
                                    _context.next = 19;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName);

                                case 19:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName] = 'viewerFolderFunction';
                                    _context.prev = 20;
                                    _context.next = 23;
                                    return viewerFolderFunction($uibModal, JSManagement, CSSManagement, advanceService, { uuid: doc.uuid, type: 'folder' }, $scope.data.profile);

                                case 23:
                                    _context.prev = 23;
                                    _context.next = 26;
                                    return getSelectedLocalStorage('clipBoardResults');

                                case 26:
                                    $scope.data.selectedClipBoardStorage = _context.sent;

                                    if ($scope.data.selectedClipBoardStorage == null) $scope.data.selectedClipBoardStorage = {};

                                    _context.next = 33;
                                    break;

                                case 30:
                                    _context.prev = 30;
                                    _context.t2 = _context['catch'](23);

                                    console.error(_context.t2);

                                case 33:

                                    $scope.data.isItemInClipboard = !_.isEqual($scope.data.selectedClipBoardStorage, {}) && $scope.data.selectedClipBoardStorage != null;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                    _context.next = 40;
                                    break;

                                case 37:
                                    _context.prev = 37;
                                    _context.t3 = _context['catch'](20);

                                    console.error(_context.t3);

                                case 40:
                                    return _context.abrupt('break', 43);

                                case 41:
                                    toaster.pop("error", "", "امکان نمایش محتوای آیتم انتخابی وجود ندارد.");
                                    return _context.abrupt('break', 43);

                                case 43:
                                    _context.next = 49;
                                    break;

                                case 45:
                                    _context.prev = 45;
                                    _context.t4 = _context['catch'](0);

                                    toaster.pop("error", "", "امکان نمایش محتوای آیتم انتخابی وجود ندارد.");
                                    console.error(_context.t4);

                                case 49:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 45], [7, 13], [20, 37], [23, 30]]);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }();
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};