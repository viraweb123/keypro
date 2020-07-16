'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addTemplatesDesktopCtrl = function addTemplatesDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.addTemplates = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var isTemplates, result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length == 1 && $scope.data.selectedItems[0].type == "FOLDER")) {
                                    _context.next = 32;
                                    break;
                                }

                                if (!_.includes(['taxonomy', 'metadata'], $scope.data.selectedItems[0].group)) {
                                    _context.next = 29;
                                    break;
                                }

                                _context.prev = 3;
                                _context.next = 6;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                            case 6:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';

                                isTemplates = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (!isTemplates[2]) {
                                    _context.next = 19;
                                    break;
                                }

                                _context.next = 11;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/selectTemplateCtrl.js?dev=' + randomVersionName);

                            case 11:
                                _context.next = 13;
                                return selectTemplateCtrl($uibModal, JSManagement, desktopService, 'getTemplatesFolder', $scope.data.selectedItems[0].path);

                            case 13:
                                result = _context.sent;
                                _context.next = 16;
                                return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/selectTemplateCtrl.js?dev=' + randomVersionName, 'selectTemplateCtrl');

                            case 16:

                                desktopService.document.createFromTemplate(result).then(function (res) {
                                    return $scope.func.dbClickInDoc($scope.data.selectedItems[0]);
                                }, function (err) {
                                    return console.error(e);
                                });

                                _context.next = 20;
                                break;

                            case 19:
                                toaster.pop('warning', "", ' امکان افزودن الگو به پوشه ' + $scope.data.selectedItems[0].name + ' وجود ندارد ');

                            case 20:
                                _context.next = 27;
                                break;

                            case 22:
                                _context.prev = 22;
                                _context.t0 = _context['catch'](3);

                                console.error(_context.t0);
                                _context.next = 27;
                                return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/selectTemplateCtrl.js?dev=' + randomVersionName, 'selectTemplateCtrl');

                            case 27:
                                _context.next = 30;
                                break;

                            case 29:
                                toaster.pop('warning', "", "لطفا یک پوشه از درخت اصلی یا فراداده انتخاب کنید");

                            case 30:
                                _context.next = 33;
                                break;

                            case 32:
                                toaster.pop('error', "", "لطفا یک پوشه انتخاب کنید");

                            case 33:
                                _context.next = 38;
                                break;

                            case 35:
                                _context.prev = 35;
                                _context.t1 = _context['catch'](0);

                                console.error(_context.t1);

                            case 38:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 35], [3, 22]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};