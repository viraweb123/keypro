'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var deleteFolderDesktopCtrl = function deleteFolderDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.deleteFolder = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(currentNode, pointerType, treeType) {
                    var isRemove, response, rootNodeID, index;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/deleteFolder.js?dev=' + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/deleteFolder.js?dev=' + randomVersionName] = 'deleteFolderDesktopExternalCtrl';

                                    _context.next = 5;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                                case 5:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';

                                    if (!($scope.data.profile.prfMenu.prfFile.purgeTrashVisible && currentNode.group == "trash" || $scope.data.profile.prfMenu.prfEdit.deleteVisible && currentNode.group != "trash")) {
                                        _context.next = 44;
                                        break;
                                    }

                                    _context.prev = 7;
                                    isRemove = getPermisionArray(currentNode.permissions);

                                    if (!isRemove[1]) {
                                        _context.next = 35;
                                        break;
                                    }

                                    _context.prev = 10;
                                    _context.next = 13;
                                    return deleteFolderDesktopExternalCtrl($uibModal);

                                case 13:
                                    response = _context.sent;
                                    _context.next = 16;
                                    return desktopService.folder.remove(currentNode.uuid);

                                case 16:
                                    if ($('li#' + (currentNode.uuid || currentNode.id))) $('li#' + (currentNode.uuid || currentNode.id)).remove();
                                    rootNodeID = _.filter($scope.data.pointers[pointerType], function (node, key) {
                                        return _.includes(_.map(node.children, 'id'), currentNode.uuid || currentNode.id);
                                    })[0];
                                    _context.next = 20;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName);

                                case 20:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName] = 'removeFolderChildes';

                                    _context.next = 23;
                                    return removeFolderChildes($scope.data.pointers[pointerType], currentNode.uuid || currentNode.id);

                                case 23:
                                    $scope.data.pointers[pointerType][currentNode.uuid || currentNode.id] = null;
                                    delete $scope.data.pointers[pointerType][currentNode.uuid || currentNode.id];
                                    if (rootNodeID != undefined) {
                                        $scope.data.pointers[pointerType][rootNodeID.uuid].hasChildrenFolder = $scope.data.pointers[pointerType][rootNodeID.uuid].children && _.isArray($scope.data.pointers[pointerType][rootNodeID.uuid].children) && $scope.data.pointers[pointerType][rootNodeID.uuid].children.length <= 1 ? false : $scope.data.pointers[pointerType][rootNodeID.uuid].hasChildrenFolder;
                                        if ($scope.data.pointers[pointerType][rootNodeID.uuid].children && _.isArray($scope.data.pointers[pointerType][rootNodeID.uuid].children)) {
                                            index = _.findIndex(_.map($scope.data.pointers[pointerType][rootNodeID.uuid].children, 'id'), function (id) {
                                                return id == (currentNode.uuid || currentNode.id);
                                            });

                                            if (index >= 0) $scope.data.pointers[pointerType][rootNodeID.uuid].children.splice(index, 1);
                                        }
                                        $scope.data.trees[treeType].changeCurrentNode($scope.data.pointers[pointerType][rootNodeID.uuid], false);
                                    }
                                    _context.next = 33;
                                    break;

                                case 28:
                                    _context.prev = 28;
                                    _context.t0 = _context['catch'](10);

                                    console.error(_context.t0);
                                    toaster.pop('error', "", ' امکان حذف پوشه ' + currentNode.name + ' وجود ندارد. ');
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 33:
                                    _context.next = 37;
                                    break;

                                case 35:
                                    toaster.pop('error', "", "شما امکان حذف این پوشه را ندارید.");
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 37:
                                    _context.next = 42;
                                    break;

                                case 39:
                                    _context.prev = 39;
                                    _context.t1 = _context['catch'](7);

                                    toaster.pop('error', '', _context.t1);

                                case 42:
                                    _context.next = 46;
                                    break;

                                case 44:
                                    toaster.pop("error", "", "شما مجوز لازم جهت حذف این پوشه را ندارید .");
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 46:
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 47:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[7, 39], [10, 28]]);
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