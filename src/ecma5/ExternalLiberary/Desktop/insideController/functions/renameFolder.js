'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var renameFolderDesktopCtrl = function renameFolderDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.renameFolder = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(currentNode, pointerType, treeType) {
                    var oldName, newLable;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/renameFolder.js?dev=' + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/renameFolder.js?dev=' + randomVersionName] = 'renameFolderExternalDesktopCtrl';
                                    _context.prev = 3;

                                    console.log(currentNode);

                                    oldName = _.clone(currentNode.label);


                                    console.log(1);
                                    console.log(renameFolderExternalDesktopCtrl);

                                    console.log($uibModal);
                                    console.log(desktopService.folder);

                                    _context.next = 12;
                                    return renameFolderExternalDesktopCtrl($uibModal, //modal func,
                                    desktopService.folder, // folder service,
                                    currentNode // current node
                                    );

                                case 12:
                                    newLable = _context.sent;


                                    currentNode.label = angular.copy(newLable);
                                    newLable = undefined;

                                    console.log(2);

                                    currentNode.path = currentNode.path.replace('/' + oldName, '/' + currentNode.label);

                                    $scope.data.pointers[pointerType][currentNode.uuid || currentNode.id].label = currentNode.label;
                                    $scope.data.pointers[pointerType][currentNode.uuid || currentNode.id].path = currentNode.path;

                                    $scope.data.trees[treeType].changeCurrentNode(currentNode, false);

                                    _context.next = 26;
                                    break;

                                case 22:
                                    _context.prev = 22;
                                    _context.t0 = _context['catch'](3);

                                    console.error(_context.t0);
                                    toaster.pop('error', '', _context.t0 || _context.t0.message);

                                case 26:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[3, 22]]);
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