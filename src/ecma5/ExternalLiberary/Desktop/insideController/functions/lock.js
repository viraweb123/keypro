"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var lockDesktopCtrl = function lockDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.lock = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var i, isLock;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length > 0)) {
                                    _context.next = 40;
                                    break;
                                }

                                if (!($scope.data.selectedItems[0].group != "trash")) {
                                    _context.next = 37;
                                    break;
                                }

                                _context.next = 5;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 5:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                i = 0;

                            case 7:
                                if (!(i < $scope.data.selectedItems.length)) {
                                    _context.next = 34;
                                    break;
                                }

                                isLock = getPermisionArray($scope.data.selectedItems[i].permissions);

                                if (!isLock[2]) {
                                    _context.next = 30;
                                    break;
                                }

                                if (!($scope.data.selectedItems[i].type != "FOLDER" && $scope.data.selectedItems[i].locked)) {
                                    _context.next = 14;
                                    break;
                                }

                                toaster.pop('warning', "", " سند " + $scope.data.selectedItems[i].name + "  ویرایش شده یا از قبل قفل شده قفل نمی شود");
                                _context.next = 28;
                                break;

                            case 14:
                                if (!($scope.data.selectedItems[i].type == "FOLDER")) {
                                    _context.next = 18;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان قفل کردن پوشه وجود ندارد.");
                                _context.next = 28;
                                break;

                            case 18:
                                _context.prev = 18;
                                _context.next = 21;
                                return desktopService.document.locked($scope.data.selectedItems[i].uuid);

                            case 21:
                                $scope.data.selectedItems[i].locked = true;
                                toaster.pop('success', "", " قفل گذاری سند " + $scope.data.selectedItems[i].name + " با موفقیت انجام شد. ");
                                _context.next = 28;
                                break;

                            case 25:
                                _context.prev = 25;
                                _context.t0 = _context["catch"](18);

                                toaster.pop('warning', "", " مشکل در قفل گذاری سند " + $scope.data.selectedItems[i].name + " به وجود آمده است. ");

                            case 28:
                                _context.next = 31;
                                break;

                            case 30:
                                toaster.pop('warning', "", " مشکل در قفل گذاری سند " + $scope.data.selectedItems[i].name + " به وجود آمده است. ");

                            case 31:
                                i++;
                                _context.next = 7;
                                break;

                            case 34:
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                _context.next = 38;
                                break;

                            case 37:
                                toaster.pop('warning', "", "در سطل زباله امکان قفل گذاری وجود ندارد.");

                            case 38:
                                _context.next = 41;
                                break;

                            case 40:
                                toaster.pop('warning', "", "لطفا حداقل یک آیتم انتخاب کنید.");

                            case 41:
                                _context.next = 46;
                                break;

                            case 43:
                                _context.prev = 43;
                                _context.t1 = _context["catch"](0);

                                console.error(_context.t1);

                            case 46:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 43], [18, 25]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};