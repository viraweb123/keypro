"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var cancelEditDesktopCtrl = function cancelEditDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.cancelEdit = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var isEdit;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!_.isArray($scope.data.selectedItems)) {
                                    _context.next = 19;
                                    break;
                                }

                                if (!($scope.data.selectedItems.length == 1 && $scope.data.selectedItems[0].type == "FILE")) {
                                    _context.next = 18;
                                    break;
                                }

                                if ($scope.data.selectedItems[0].checkedOut) {
                                    _context.next = 7;
                                    break;
                                }

                                toaster.pop('warning', "", "این سند نیازی به لغو ویرایش ندارد");
                                _context.next = 16;
                                break;

                            case 7:
                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context.next = 11;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان لغو ویرایش سند های داخل سطل زباله وجود ندارد.");
                                _context.next = 16;
                                break;

                            case 11:
                                _context.next = 13;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 13:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                isEdit = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (isEdit[2]) {
                                    desktopService.document.cancelEdit($scope.data.selectedItems[0].uuid).then(function (res) {
                                        return $scope.data.selectedItems[0].checkedOut = false;
                                    }, function (error) {
                                        return toaster.pop('error', "", "امکان ویرایش این سند وجود ندارد.");
                                    });
                                } else toaster.pop('error', "", "شما مجوز انصراف از تغییر این سند را ندارید.");

                            case 16:
                                _context.next = 19;
                                break;

                            case 18:
                                toaster.pop('error', "", "لطفا فقط یک سند را انتخاب کنید.");

                            case 19:
                                _context.next = 24;
                                break;

                            case 21:
                                _context.prev = 21;
                                _context.t0 = _context["catch"](0);

                                console.error(_context.t0);

                            case 24:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 21]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};