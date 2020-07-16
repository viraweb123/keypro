"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var subscribeDesktopCtrl = function subscribeDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.subscribe = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var ind, treeGroup;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length >= 1)) {
                                    _context.next = 28;
                                    break;
                                }

                                if (!(_.has($scope.data.selectedItems[0], 'group') && $scope.data.selectedItems[0].group != "trash")) {
                                    _context.next = 25;
                                    break;
                                }

                                ind = 0;

                            case 3:
                                if (!(ind < $scope.data.selectedItems.length)) {
                                    _context.next = 22;
                                    break;
                                }

                                if ($scope.data.selectedItems[ind].subscribed) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.prev = 5;
                                _context.next = 8;
                                return desktopService.notification.subscribe($scope.data.selectedItems[ind].path);

                            case 8:
                                $scope.data.selectedItems[ind].subscribed = true;
                                if ($scope.data.selectedItems[ind].type == "FOLDER") {
                                    treeGroup = $scope.data.selectedItems[ind].group + "Visible";

                                    if (_.has($scope.data.pointers, treeGroup) && _.has($scope.data.pointers[treeGroup], $scope.data.selectedItems[ind].uuid)) {
                                        $scope.data.pointers[treeGroup][$scope.data.selectedItems[ind].uuid].subscribed = true;
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    }
                                    toaster.pop('success', "", " پوشه" + $scope.data.selectedItems[ind].name + " با موفقیت رصد شد ");
                                } else toaster.pop('success', "", " سند" + $scope.data.selectedItems[ind].name + " با موفقیت رصد شد ");
                                _context.next = 16;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context["catch"](5);

                                console.error(_context.t0);
                                if ($scope.data.selectedItems[ind].type == "FOLDER") toaster.pop('error', "", " امکان رصد پوشه" + $scope.data.selectedItems[ind].name + " وجود ندارد ");else toaster.pop('error', "", " امکان رصد سند" + $scope.data.selectedItems[ind].name + " وجود ندارد ");

                            case 16:
                                _context.next = 19;
                                break;

                            case 18:
                                if ($scope.data.selectedItems[ind].type == "FOLDER") toaster.pop('error', "", " امکان رصد پوشه" + $scope.data.selectedItems[ind].name + " وجود ندارد ");else toaster.pop('error', "", " امکان رصد سند" + $scope.data.selectedItems[ind].name + " وجود ندارد ");

                            case 19:
                                ind++;
                                _context.next = 3;
                                break;

                            case 22:
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                _context.next = 26;
                                break;

                            case 25:
                                toaster.pop('error', "", "امکان رصد آیتم های داخل سطل زباله وجود ندارد.");

                            case 26:
                                _context.next = 29;
                                break;

                            case 28:
                                toaster.pop('error', "", "لطفا حداقل یک سند یا پوشه انتخاب کنید");

                            case 29:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[5, 12]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};