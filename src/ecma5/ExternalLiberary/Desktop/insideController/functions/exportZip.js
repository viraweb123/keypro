"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var exportZipDesktopCtrl = function exportZipDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.exportZip = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var isDownload, itemsList, i, isExportToZip;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length > 0)) {
                                    _context.next = 47;
                                    break;
                                }

                                if (!($scope.data.selectedItems.length == 1)) {
                                    _context.next = 24;
                                    break;
                                }

                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context.next = 7;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان فشرده سازی سند های داخل سطل زباله وجود ندارد.");
                                _context.next = 22;
                                break;

                            case 7:
                                _context.next = 9;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 9:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                isDownload = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (!isDownload[2]) {
                                    _context.next = 21;
                                    break;
                                }

                                _context.next = 14;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/convertTozipFolderFunction.js?dev=" + randomVersionName);

                            case 14:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/convertTozipFolderFunction.js?dev=" + randomVersionName] = 'convertTozipFolderFunction';
                                $("#show-waiting-get-rest-from-server-id").addClass('show-waiting');
                                _context.next = 18;
                                return convertTozipFolderFunction($scope.data.selectedItems[0]);

                            case 18:
                                $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                _context.next = 22;
                                break;

                            case 21:
                                toaster.pop('warning', "", " امکان فشرده سازی " + $scope.data.selectedItems[0].name + " وجود ندارد. ");

                            case 22:
                                _context.next = 45;
                                break;

                            case 24:
                                if (!($scope.data.selectedItems.length > 1)) {
                                    _context.next = 45;
                                    break;
                                }

                                if (!(_.findIndex($scope.data.selectedItems, function (selectedItem) {
                                    return selectedItem.type == 'FOLDER';
                                }) >= 0)) {
                                    _context.next = 29;
                                    break;
                                }

                                toaster.pop('error', "", "لطفا فقط یک پوشه و یا چند سند انتخاب کنید.");
                                _context.next = 45;
                                break;

                            case 29:
                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context.next = 33;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان فشرده سازی سند های داخل سطل زباله وجود ندارد");
                                _context.next = 45;
                                break;

                            case 33:
                                _context.next = 35;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 35:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                itemsList = [];

                                for (i = 0; i < $scope.data.selectedItems.length; i++) {
                                    isExportToZip = getPermisionArray($scope.data.selectedItems[i].permissions);

                                    if (isExportToZip[2]) itemsList.push(_.clone($scope.data.selectedItems[i]));else toaster.pop('warning', "", " امکان فشرده سازی  " + $scope.data.selectedItems[i].name + " وجود ندارد ");
                                }
                                _context.next = 40;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/convertTozipFileListFunction.js?dev=" + randomVersionName);

                            case 40:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/convertTozipFileListFunction.js?dev=" + randomVersionName] = 'convertTozipFileListFunction';
                                $("#show-waiting-get-rest-from-server-id").addClass('show-waiting');
                                _context.next = 44;
                                return convertTozipFileListFunction(itemsList);

                            case 44:
                                $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');

                            case 45:
                                _context.next = 48;
                                break;

                            case 47:
                                toaster.pop('error', "", "لطفا حداقل یک سند یا پوشه انتخاب کنید.");

                            case 48:
                                _context.next = 54;
                                break;

                            case 50:
                                _context.prev = 50;
                                _context.t0 = _context["catch"](0);

                                console.error(_context.t0);
                                $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');

                            case 54:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 50]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};