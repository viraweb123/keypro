'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var copyFolderDesktopCtrl = function copyFolderDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.copyFolder = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(currentNode, pointerType, treeType) {
                    var response;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/multiCopy2DesktopCtrl.js?dev=' + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/multiCopy2DesktopCtrl.js?dev=' + randomVersionName] = 'multiCopy2DesktopCtrl';

                                    _context.prev = 3;
                                    _context.next = 6;
                                    return multiCopy2DesktopCtrl($uibModal, //modal func
                                    desktopService.repository, //repository service
                                    'getRootFolder', // rootPath
                                    desktopService.folder, // folder service
                                    treeType);

                                case 6:
                                    response = _context.sent;
                                    _context.next = 9;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/getHiddenTreeDesktopCtrl.js?dev=' + randomVersionName);

                                case 9:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/getHiddenTreeDesktopCtrl.js?dev=' + randomVersionName] = 'getHiddenTreeDesktopCtrl';

                                    _context.next = 12;
                                    return getHiddenTreeDesktopCtrl($scope.data.pointers[pointerType], response, treeType);

                                case 12:
                                    _context.next = 14;
                                    return desktopService.folder.copy(currentNode.uuid, response.addNode.id);

                                case 14:
                                    $scope.data.pointers[pointerType][response.addNode.id].hasChildrenFolder = true;
                                    $scope.data.pointers[pointerType][response.addNode.id].collapsed = false;
                                    $scope.data.trees[treeType].changeCurrentNode($scope.data.pointers[pointerType][response.addNode.id], false);
                                    _context.next = 22;
                                    break;

                                case 19:
                                    _context.prev = 19;
                                    _context.t0 = _context['catch'](3);

                                    toaster.pop('error', '', _context.t0);

                                case 22:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[3, 19]]);
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