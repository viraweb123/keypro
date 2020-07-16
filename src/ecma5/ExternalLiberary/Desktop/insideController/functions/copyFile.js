"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var copyFileDesktopCtrl = function copyFileDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.copyFile = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(currentNode, pointerType, treeType) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/cretaeFilesDesktopCtrl.js?dev=" + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Desktop/cretaeFilesDesktopCtrl.js?dev=" + randomVersionName] = 'cretaeFilesDesktopCtrl';
                                    _context.next = 6;
                                    return cretaeFilesDesktopCtrl($uibModal, currentNode, desktopService, $scope.data.profile.prfDigitalSignPermit, JSManagement);

                                case 6:

                                    $scope.data.trees[treeType].changeCurrentNode($scope.data.pointers[pointerType][currentNode.uuid], false);

                                    _context.next = 12;
                                    break;

                                case 9:
                                    _context.prev = 9;
                                    _context.t0 = _context["catch"](0);

                                    console.error(_context.t0);

                                case 12:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 9]]);
                }));

                return function (_x, _x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            }();
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};