'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var createFolderDesktopCtrl = function createFolderDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.createFolder = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(currentNode, pointerType, treeType) {
                    var response;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/createNewFolder.js?dev=' + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/createNewFolder.js?dev=' + randomVersionName] = 'createNewFolderDesktopCtrl';

                                    _context.prev = 3;
                                    _context.next = 6;
                                    return createNewFolderDesktopCtrl($uibModal, //modal func,
                                    desktopService.folder, // folder service,
                                    currentNode, // current node
                                    treeType);

                                case 6:
                                    response = _context.sent;

                                    $scope.data.pointers[pointerType][response] = currentNode.children.slice(-1)[0];
                                    $scope.data.trees[treeType].changeCurrentNode($scope.data.pointers[pointerType][response], false);
                                    _context.next = 14;
                                    break;

                                case 11:
                                    _context.prev = 11;
                                    _context.t0 = _context['catch'](3);

                                    toaster.pop('error', '', _context.t0);

                                case 14:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[3, 11]]);
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