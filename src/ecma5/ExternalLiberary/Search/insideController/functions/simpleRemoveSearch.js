'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var simpleRemoveSearchSimpleCtrl = function simpleRemoveSearchSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.simpleRemoveSearch = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(item) {
                    var response, removeItems, isRemove;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';
                                    _context.next = 6;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/deleteSelectedFileAndFoldersDesktopCtrl.js?dev=' + randomVersionName);

                                case 6:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/deleteSelectedFileAndFoldersDesktopCtrl.js?dev=' + randomVersionName] = 'deleteSelectedFileAndFoldersDesktopCtrl';

                                    _context.next = 9;
                                    return deleteSelectedFileAndFoldersDesktopCtrl($uibModal);

                                case 9:
                                    response = _context.sent;
                                    removeItems = {};
                                    isRemove = getPermisionArray(item.permissions);
                                    //TODO remove folder

                                    if (!(item.type == "folder")) {
                                        _context.next = 31;
                                        break;
                                    }

                                    if (!isRemove[1]) {
                                        _context.next = 28;
                                        break;
                                    }

                                    _context.prev = 14;
                                    _context.next = 17;
                                    return simpleService.folder.remove(item.uuid);

                                case 17:
                                    //TODO add remove item from selected items
                                    toaster.pop('success', "", ' پوشه' + item.name + ' با موفقیت حذف گردید. ');
                                    $scope.data.itemsPagination.currentPage = 1;
                                    $scope.data.itemsPagination.pageChanged();
                                    _context.next = 26;
                                    break;

                                case 22:
                                    _context.prev = 22;
                                    _context.t0 = _context['catch'](14);

                                    console.error(_context.t0);
                                    toaster.pop('error', "", ' امکان حذف پوشه' + item.name + ' وجود ندارد. ');

                                case 26:
                                    _context.next = 29;
                                    break;

                                case 28:
                                    toaster.pop('error', "", "شما مجوز حذف این پوشه را ندارید.");

                                case 29:
                                    _context.next = 47;
                                    break;

                                case 31:
                                    if (!isRemove[1]) {
                                        _context.next = 46;
                                        break;
                                    }

                                    _context.prev = 32;
                                    _context.next = 35;
                                    return simpleService.document.remove(item.uuid);

                                case 35:
                                    toaster.pop('success', "", ' سند' + item.name + ' با موفقیت حذف گردید. ');
                                    $scope.data.itemsPagination.currentPage = 1;
                                    $scope.data.itemsPagination.pageChanged();
                                    _context.next = 44;
                                    break;

                                case 40:
                                    _context.prev = 40;
                                    _context.t1 = _context['catch'](32);

                                    console.error(_context.t1);
                                    toaster.pop('error', "", ' امکان حذف سند' + item.name + ' وجود ندارد. ');

                                case 44:
                                    _context.next = 47;
                                    break;

                                case 46:
                                    toaster.pop('error', "", "شما مجوز حذف این سند را ندارید.");

                                case 47:
                                    _context.next = 52;
                                    break;

                                case 49:
                                    _context.prev = 49;
                                    _context.t2 = _context['catch'](0);

                                    toaster.pop('error', "", "مشکلی در فرایند حذف به وجود آمده است.");

                                case 52:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 49], [14, 22], [32, 40]]);
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