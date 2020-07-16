'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var changeCurrentNodeTrashDesktopCtrl = function changeCurrentNodeTrashDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.changeCurrentNodeTrash = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(node, collapsed) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    $scope.data.trees.trashTree.currentNode = node;
                                    if (typeof collapsed !== 'undefined') $scope.data.trees.trashTree.currentNode.collapsed = collapsed;
                                    $scope.data.selectedFileOrFolder = node;

                                    if (!angular.isObject($scope.data.trees.trashTree.currentNode)) {
                                        _context.next = 10;
                                        break;
                                    }

                                    _context.next = 7;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                case 7:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';

                                    try {
                                        $scope.func.stopAllPlayers();
                                    } catch (e) {
                                        console.error(e);
                                    }
                                    if ($scope.data.trees.trashTree.currentNode.hasChildrenFolder) desktopService.folder.listChild($scope.data.trees.trashTree.currentNode.id).then(function (result) {
                                        if (result.data != null) {
                                            $scope.data.trees.trash.currentNodeCount = result.data.length;
                                            $scope.data.trees.trashTree.currentNode.children = $scope.data.trees.trashTree.currentNode.children && angular.isArray($scope.data.trees.trashTree.currentNode.children) ? $scope.data.trees.trashTree.currentNode.children : [];
                                            _.forEach(result.data, function (res) {
                                                if (_.has(res, 'uuid') || _.has(res, 'id')) {
                                                    if (typeof $scope.data.pointers["trashVisible"][res.uuid || res.id] === "undefined") {
                                                        $scope.data.trees.trashTree.currentNode.children.push({
                                                            id: res.uuid || res.id,
                                                            uuid: res.uuid,
                                                            label: getNameFromPath(res.path),
                                                            permissions: res.permissions,
                                                            path: res.path,
                                                            hasChildrenFolder: res.hasChildren,
                                                            collapsed: true,
                                                            selected: false,
                                                            type: 'FOLDER',
                                                            group: 'trash',
                                                            subscribed: _.has(res, 'subscribed') ? res.subscribed : false
                                                        });
                                                        $scope.data.pointers["trashVisible"][res.uuid || res.id] = $scope.data.trees.trashTree.currentNode.children.slice(-1)[0];
                                                        $scope.data.nodesFolder[res.path] = $scope.data.pointers["trashVisible"][res.uuid || res.id];
                                                    }
                                                }
                                            });
                                        } else $scope.data.trees.trash.currentNodeCount = 0;
                                        $scope.func.selectFolder($scope.data.trees.trashTree.currentNode, false, undefined);
                                    }, function (error) {
                                        return console.error(e);
                                    });else $scope.func.selectFolder($scope.data.trees.trashTree.currentNode, false, undefined);
                                    /*$scope.func.stopAllPlayers();
                                    $scope.func.selectLeftNav();*/

                                case 10:
                                    _context.next = 15;
                                    break;

                                case 12:
                                    _context.prev = 12;
                                    _context.t0 = _context['catch'](0);

                                    console.error(_context.t0);

                                case 15:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 12]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};