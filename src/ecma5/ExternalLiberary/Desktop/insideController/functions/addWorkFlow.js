'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addWorkFlowDesktopCtrl = function addWorkFlowDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.addWorkFlow = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var isRelation;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length == 1)) {
                                    _context.next = 24;
                                    break;
                                }

                                _context.prev = 1;
                                _context.next = 4;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                            case 4:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';
                                isRelation = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (!isRelation[2]) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.next = 9;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/addWorkFlowCtrl.js?dev=' + randomVersionName);

                            case 9:
                                _context.next = 11;
                                return addWorkFlowCtrl($uibModal, $scope.data.selectedItems[0], desktopService);

                            case 11:
                                _context.next = 13;
                                return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/addWorkFlowCtrl.js?dev=' + randomVersionName, 'addWorkFlowCtrl');

                            case 13:
                                toaster.pop('success', "", "گردش کار با موفقیت افزوده شد");
                                _context.next = 17;
                                break;

                            case 16:
                                toaster.pop('warning', "", ' امکان افزودن گردش کار برای آیتم ' + $scope.data.selectedItems[0].name + ' نیست ');

                            case 17:
                                _context.next = 22;
                                break;

                            case 19:
                                _context.prev = 19;
                                _context.t0 = _context['catch'](1);

                                console.error(_context.t0);

                            case 22:
                                _context.next = 25;
                                break;

                            case 24:
                                toaster.pop('error', "", "لطفا یک سند یا پوشه انتخاب کنید");

                            case 25:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[1, 19]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};