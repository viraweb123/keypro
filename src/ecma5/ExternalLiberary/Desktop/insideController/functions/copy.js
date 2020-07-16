"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var copyDesktopCtrl = function copyDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.copy = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var response, i, isCopy;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!($scope.data.selectedItems.length <= 0)) {
                                    _context.next = 3;
                                    break;
                                }

                                throw new Error('لطفا حداقل یک سند یا پوشه انتخاب کنید');

                            case 3:
                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context.next = 5;
                                    break;
                                }

                                throw new Error("امکان کپی از سند های داخل سطل زباله وجود ندارد");

                            case 5:
                                _context.next = 7;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/multiCopy2DesktopCtrl.js?dev=" + randomVersionName);

                            case 7:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Desktop/multiCopy2DesktopCtrl.js?dev=" + randomVersionName] = 'multiCopy2DesktopCtrl';

                                _context.prev = 8;
                                _context.next = 11;
                                return multiCopy2DesktopCtrl($uibModal, //modal func
                                desktopService.repository, //repository service
                                'getRootFolder', // rootPath
                                desktopService.folder, // folder service
                                $scope.data.selectedItems[0].group);

                            case 11:
                                response = _context.sent;
                                _context.next = 14;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/getHiddenTreeDesktopCtrl.js?dev=" + randomVersionName);

                            case 14:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Desktop/getHiddenTreeDesktopCtrl.js?dev=" + randomVersionName] = 'getHiddenTreeDesktopCtrl';
                                _context.next = 17;
                                return getHiddenTreeDesktopCtrl($scope.data.pointers["taxonomyVisible"], response, $scope.data.selectedItems[0].group);

                            case 17:
                                _context.next = 19;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 19:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';

                                //send all copy to server
                                i = 0;

                            case 21:
                                if (!(i < $scope.data.selectedItems.length)) {
                                    _context.next = 42;
                                    break;
                                }

                                isCopy = getPermisionArray($scope.data.selectedItems[i].permissions);

                                if (!($scope.data.selectedItems[i].type == 'FOLDER')) {
                                    _context.next = 33;
                                    break;
                                }

                                if (!isCopy[2]) {
                                    _context.next = 30;
                                    break;
                                }

                                _context.next = 27;
                                return desktopService.folder.copy($scope.data.selectedItems[i].uuid, response.addNode.id);

                            case 27:
                                $scope.data.pointers["taxonomyVisible"][response.addNode.id].hasChildrenFolder = true;
                                _context.next = 31;
                                break;

                            case 30:
                                toaster.pop('warning', "", " امکان کپی از پوشه " + $scope.data.selectedItems[i].name + " وجود ندارد. ");

                            case 31:
                                _context.next = 39;
                                break;

                            case 33:
                                if (!isCopy[2]) {
                                    _context.next = 38;
                                    break;
                                }

                                _context.next = 36;
                                return desktopService.document.copy($scope.data.selectedItems[i].uuid, response.addNode.id);

                            case 36:
                                _context.next = 39;
                                break;

                            case 38:
                                toaster.pop('warning', "", " امکان کپی از سند" + $scope.data.selectedItems[i].name + " وجود ندارد. ");

                            case 39:
                                i++;
                                _context.next = 21;
                                break;

                            case 42:

                                $scope.data.trees.taxonomy.changeCurrentNode($scope.data.pointers["taxonomyVisible"][response.addNode.id], false);
                                _context.next = 48;
                                break;

                            case 45:
                                _context.prev = 45;
                                _context.t0 = _context["catch"](8);

                                toaster.pop('error', '', _context.t0.message || _context.t0);

                            case 48:
                                _context.next = 53;
                                break;

                            case 50:
                                _context.prev = 50;
                                _context.t1 = _context["catch"](0);

                                toaster.pop('error', '', _context.t1.message || _context.t1);

                            case 53:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 50], [8, 45]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};