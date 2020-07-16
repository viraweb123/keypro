"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var editDesktopCtrl = function editDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.edit = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var isEdit;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                if (!_.isArray($scope.data.selectedItems)) {
                                    _context2.next = 19;
                                    break;
                                }

                                if (!($scope.data.selectedItems.length == 1 && $scope.data.selectedItems[0].type == "FILE")) {
                                    _context2.next = 18;
                                    break;
                                }

                                if (!$scope.data.selectedItems[0].checkedOut) {
                                    _context2.next = 7;
                                    break;
                                }

                                toaster.pop('warning', "", "این سند قبلا جهت ویرایش دریافت شده است.");
                                _context2.next = 16;
                                break;

                            case 7:
                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context2.next = 11;
                                    break;
                                }

                                toaster.pop('warning', "امکان ویرایش سند های داخل سطل زباله وجود ندارد.");
                                _context2.next = 16;
                                break;

                            case 11:
                                _context2.next = 13;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 13:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                isEdit = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (isEdit[2]) {
                                    desktopService.document.checkout($scope.data.selectedItems[0].uuid).then(function () {
                                        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            _context.next = 2;
                                                            return JSManagement.addJS("ecma5/ExternalLiberary/Public/downloadFileFunction.js?dev=" + randomVersionName);

                                                        case 2:
                                                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/downloadFileFunction.js?dev=" + randomVersionName] = 'downloadFileFunction';
                                                            downloadFileFunction($scope.data.selectedItems[0]);
                                                            $scope.data.selectedItems[0].checkedOut = true;

                                                        case 5:
                                                        case "end":
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, _this);
                                        }));

                                        return function (_x) {
                                            return _ref2.apply(this, arguments);
                                        };
                                    }(), function (error) {
                                        return toaster.pop('error', "", "امکان ویرایش این سند وجود ندارد");
                                    });
                                } else toaster.pop('error', "", "شما مجوز تغییر این سند را ندارید.");

                            case 16:
                                _context2.next = 19;
                                break;

                            case 18:
                                toaster.pop('error', "", "لطفا فقط یک سند انتخاب کنید.");

                            case 19:
                                _context2.next = 24;
                                break;

                            case 21:
                                _context2.prev = 21;
                                _context2.t0 = _context2["catch"](0);

                                console.error(_context2.t0);

                            case 24:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[0, 21]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};