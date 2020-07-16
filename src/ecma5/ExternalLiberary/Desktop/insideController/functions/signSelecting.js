'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var signSelectingDesktopCtrl = function signSelectingDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.signSelecting = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var mimeType, userInfos, result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length == 1 && $scope.data.selectedItems[0].type == "FILE")) {
                                    _context.next = 33;
                                    break;
                                }

                                if (!_.includes(['taxonomy', 'templates'], $scope.data.selectedItems[0].group)) {
                                    _context.next = 30;
                                    break;
                                }

                                mimeType = _.clone($scope.data.selectedItems[0].name).match(/\.([^/.]+)$/);

                                if (!(mimeType != null && _.isArray(mimeType) && mimeType.length > 0 && _.includes($scope.data.signValidesTypes, mimeType[0]))) {
                                    _context.next = 27;
                                    break;
                                }

                                _context.prev = 5;
                                _context.next = 8;
                                return userInfoService.getUser(desktopService.auth.currentUser);

                            case 8:
                                userInfos = _context.sent;
                                _context.next = 11;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/signSelectdFromDesktop.js?dev=' + randomVersionName);

                            case 11:
                                _context.next = 13;
                                return signSelectdFromDesktop($uibModal, JSManagement, CSSManagement, desktopService, $scope.data.selectedItems[0], userInfos, $scope.data.profile, Authentication);

                            case 13:
                                result = _context.sent;

                                toaster.pop("success", "", result);
                                _context.next = 17;
                                return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/signSelectdFromDesktop.js?dev=' + randomVersionName, 'signSelectdFromDesktop');

                            case 17:
                                if ($scope.data.selectedFileOrFolder.uuid == $scope.data.selectedItems[0].uuid) _.defer(function () {
                                    return $scope.$apply($scope.func.selectLeftNav());
                                });

                                _context.next = 25;
                                break;

                            case 20:
                                _context.prev = 20;
                                _context.t0 = _context['catch'](5);

                                console.error(_context.t0);
                                _context.next = 25;
                                return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/selectTemplateCtrl.js?dev=' + randomVersionName, 'selectTemplateCtrl');

                            case 25:
                                _context.next = 28;
                                break;

                            case 27:
                                toaster.pop('warning', "", "لطفا سندی مطابق با الگو های امضای دیجیتال انتخاب کنید.");

                            case 28:
                                _context.next = 31;
                                break;

                            case 30:
                                toaster.pop('warning', "", "لطفا یک سند از درخت اصلی یا الگو انتخاب کنید");

                            case 31:
                                _context.next = 34;
                                break;

                            case 33:
                                toaster.pop('error', "", "لطفا یک سند انتخاب کنید");

                            case 34:
                                _context.next = 39;
                                break;

                            case 36:
                                _context.prev = 36;
                                _context.t1 = _context['catch'](0);

                                console.error(_context.t1);

                            case 39:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 36], [5, 20]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};