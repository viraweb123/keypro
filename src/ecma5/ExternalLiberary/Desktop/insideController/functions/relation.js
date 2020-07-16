"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var relationDesktopCtrl = function relationDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.relation = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var isRelation;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!_.isArray($scope.data.selectedItems)) {
                                    _context.next = 28;
                                    break;
                                }

                                if (!($scope.data.selectedItems.length == 1)) {
                                    _context.next = 27;
                                    break;
                                }

                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context.next = 7;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان ایجاد ارتباط در آیتم های داخل سطل زباله وجود ندارد.");
                                _context.next = 25;
                                break;

                            case 7:
                                _context.next = 9;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 9:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';

                                isRelation = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (!isRelation[2]) {
                                    _context.next = 24;
                                    break;
                                }

                                _context.next = 14;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/relationBetwenDocumentsFunc.js?dev=" + randomVersionName);

                            case 14:
                                _context.next = 16;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                            case 16:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType';
                                _context.next = 19;
                                return relationBetwenDocumentsFunc($scope.data.selectedItems[0].uuid, $uibModal, //modal func
                                desktopService.relation, desktopService.search, desktopService.document, getSrcFromType);

                            case 19:
                                _context.next = 21;
                                return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/relationBetwenDocumentsFunc.js?dev=" + randomVersionName, 'relationBetwenDocumentsFunc');

                            case 21:
                                $scope.func.selectLeftNav();
                                _context.next = 25;
                                break;

                            case 24:
                                toaster.pop('warning', "", " امکان افزودن رابطه برای آیتم " + $scope.data.selectedItems[0].name + " نیست. ");

                            case 25:
                                _context.next = 28;
                                break;

                            case 27:
                                toaster.pop('error', "", "لطفا فقط یک آیتم انتخاب کنید.");

                            case 28:
                                _context.next = 33;
                                break;

                            case 30:
                                _context.prev = 30;
                                _context.t0 = _context["catch"](0);

                                console.error(_context.t0);

                            case 33:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 30]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};