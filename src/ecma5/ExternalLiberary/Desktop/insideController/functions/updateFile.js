"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var updateFileDesktopCtrl = function updateFileDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.updateFile = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var isUpload;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length == 1 && $scope.data.selectedItems[0].type == "FILE")) {
                                    _context.next = 38;
                                    break;
                                }

                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context.next = 5;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان ایجاد گروه در آیتم های داخل سطل زباله وجود ندارد");
                                _context.next = 36;
                                break;

                            case 5:
                                _context.prev = 5;

                                if ($scope.data.selectedItems[0].checkedOut) {
                                    _context.next = 10;
                                    break;
                                }

                                toaster.pop('error', "", "لطفا ابتدا سند مورد نظر را ویرایش کنید");
                                _context.next = 29;
                                break;

                            case 10:
                                _context.next = 12;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 12:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                isUpload = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (!isUpload[2]) {
                                    _context.next = 28;
                                    break;
                                }

                                _context.next = 17;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/updateSelected.js?dev=" + randomVersionName);

                            case 17:
                                _context.next = 19;
                                return updateSelected($uibModal, $scope.data.selectedItems[0], desktopService);

                            case 19:
                                _context.next = 21;
                                return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/updateSelected.js?dev=" + randomVersionName, 'updateSelected');

                            case 21:
                                _context.next = 23;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                            case 23:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType';
                                //$scope.data.list[index].thumbnailSrc = getSrcFromType($scope.data.selectedItems[0].mimeType);
                                desktopService.document.thumbnail($scope.data.selectedItems[0], 0, 75).then(function (result) {
                                    $scope.data.selectedItems[0].thumbnailSrc = "data:image/png;base64," + result.data;
                                    $scope.data.selectedItems[0].checkedOut = false;
                                }, function (error) {
                                    $scope.data.selectedItems[0].thumbnailSrc = getSrcFromType($scope.data.selectedItems[0].mimeType);
                                    $scope.data.selectedItems[0].checkedOut = false;
                                });
                                desktopService.document.listVersion($scope.data.selectedItems[0].uuid).then(function (res) {
                                    if (res.data != null) _.defer(function () {
                                        return $scope.$apply($scope.func.selectLeftNav());
                                    });
                                });
                                _context.next = 29;
                                break;

                            case 28:
                                toaster.pop('warning', "", " امکان به روز رسانی سند " + $scope.data.selectedItems[0].name + " وجود ندارد ");

                            case 29:
                                _context.next = 36;
                                break;

                            case 31:
                                _context.prev = 31;
                                _context.t0 = _context["catch"](5);

                                toaster.pop('error', "", _context.t0);
                                _context.next = 36;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/updateSelected.js?dev=" + randomVersionName, 'updateSelected');

                            case 36:
                                _context.next = 39;
                                break;

                            case 38:
                                toaster.pop('error', "", "لطفا فقط یک سند انتخاب کنید");

                            case 39:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[5, 31]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};