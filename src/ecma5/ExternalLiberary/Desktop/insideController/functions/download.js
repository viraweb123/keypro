"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var downloadDesktopCtrl = function downloadDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.download = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var isDownload;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length == 1)) {
                                    _context.next = 34;
                                    break;
                                }

                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context.next = 6;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان دریافت سند های داخل سطل زباله وجود ندارد");
                                _context.next = 32;
                                break;

                            case 6:
                                _context.next = 8;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 8:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                isDownload = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (!($scope.data.selectedItems[0].type == "FOLDER")) {
                                    _context.next = 24;
                                    break;
                                }

                                if (!isDownload[3]) {
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
                                toaster.pop('warning', "", " امکان دریافت پوشه " + $scope.data.selectedItems[0].name + " وجود ندارد. ");

                            case 22:
                                _context.next = 32;
                                break;

                            case 24:
                                if (!isDownload[3]) {
                                    _context.next = 31;
                                    break;
                                }

                                _context.next = 27;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/downloadFileFunction.js?dev=" + randomVersionName);

                            case 27:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/downloadFileFunction.js?dev=" + randomVersionName] = 'downloadFileFunction';
                                downloadFileFunction($scope.data.selectedItems[0]);
                                _context.next = 32;
                                break;

                            case 31:
                                toaster.pop('warning', "", " امکان دریافت سند" + $scope.data.selectedItems[0].name + " وجود ندارد. ");

                            case 32:
                                _context.next = 36;
                                break;

                            case 34:
                                toaster.pop('error', "", "لطفا فقط یک سند یا پوشه انتخاب کنید");
                                toaster.pop('info', "", "جهت دریافت بیش از یک فایل یا پوشه از گزینه فشرده سازی استفاده گردد .");

                            case 36:
                                _context.next = 42;
                                break;

                            case 38:
                                _context.prev = 38;
                                _context.t0 = _context["catch"](0);

                                console.error(_context.t0);
                                $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');

                            case 42:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 38]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};