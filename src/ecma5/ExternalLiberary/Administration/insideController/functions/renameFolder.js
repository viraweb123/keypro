'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var renameFolderAdminCtrl = function renameFolderAdminCtrl($scope, service, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.renameFolder = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(currentNode, pointerType, treeType) {
                    var oldName;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/renameFolder.js?dev=' + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/renameFolder.js?dev=' + randomVersionName] = 'renameFolderDesktopCtrl';
                                    _context.prev = 3;

                                    console.log(currentNode);

                                    oldName = _.clone(currentNode.label);
                                    _context.next = 8;
                                    return renameFolderDesktopCtrl($uibModal, //modal func,
                                    service.folder, // folder service,
                                    currentNode // current node
                                    );

                                case 8:
                                    currentNode.label = _context.sent;


                                    currentNode.path = currentNode.path.replace('/' + oldName, '/' + currentNode.label);

                                    $scope.data.pointers[pointerType][currentNode.uuid || currentNode.id].label = currentNode.label;
                                    $scope.data.pointers[pointerType][currentNode.uuid || currentNode.id].path = currentNode.path;

                                    $scope.data.trees[treeType].changeCurrentNode(currentNode, false);

                                    _context.next = 18;
                                    break;

                                case 15:
                                    _context.prev = 15;
                                    _context.t0 = _context['catch'](3);

                                    toaster.pop('error', '', _context.t0 || _context.t0.message);

                                case 18:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[3, 15]]);
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