"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var emptyTrashDesktopCtrl = function emptyTrashDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.emptyTrash = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/deleteComplateTrash.js?dev=" + randomVersionName);

                            case 3:
                                _context.next = 5;
                                return deleteComplateTrash($uibModal);

                            case 5:
                                _context.next = 7;
                                return desktopService.repository.purgeTrash();

                            case 7:
                                $scope.func.refreshTrash();
                                toaster.pop('error', "", "اطلاعات سطل زباله به طور کامل پاک گردید.");
                                _context.next = 11;
                                return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/deleteComplateTrash.js?dev=" + randomVersionName, 'deleteComplateTrash');

                            case 11:
                                _context.next = 19;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context["catch"](0);

                                console.error(_context.t0);
                                _context.next = 18;
                                return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/deleteComplateTrash.js?dev=" + randomVersionName, 'deleteComplateTrash');

                            case 18:
                                toaster.pop('error', "", "مشکلی در پاک سازی کامل سطل زباله رخ داده است.");

                            case 19:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 13]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};