'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var cutFolderDesktopCtrl = function cutFolderDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.cutFolder = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(currentNode, pointerType, treeType, rootPath) {
                    var response, rootNodeID, index;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/multiCut2DesktopCtrl.js?dev=' + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/multiCut2DesktopCtrl.js?dev=' + randomVersionName] = 'multiCut2DesktopCtrl';

                                    _context.prev = 3;
                                    _context.next = 6;
                                    return multiCut2DesktopCtrl($uibModal, //modal func
                                    desktopService.repository, //repository service
                                    rootPath, // rootPath
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
                                    return desktopService.folder.cut(currentNode.uuid, response.addNode.id);

                                case 14:
                                    _.defer(function () {
                                        return $scope.$apply($('li#' + (currentNode.uuid || currentNode.id)).remove());
                                    });
                                    _context.next = 17;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName);

                                case 17:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName] = 'removeFolderChildes';

                                    _context.next = 20;
                                    return removeFolderChildes($scope.data.pointers[pointerType], currentNode.uuid || currentNode.id);

                                case 20:
                                    rootNodeID = _.filter($scope.data.pointers[pointerType], function (node, key) {
                                        return _.includes(_.map(node.children, 'id'), currentNode.uuid || currentNode.id);
                                    })[0];

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

                                    $scope.data.pointers[pointerType][response.addNode.id].hasChildrenFolder = true;
                                    $scope.data.pointers[pointerType][response.addNode.id].collapsed = false;
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    $scope.data.trees[treeType].changeCurrentNode($scope.data.pointers[pointerType][response.addNode.id], false);
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    _context.next = 32;
                                    break;

                                case 29:
                                    _context.prev = 29;
                                    _context.t0 = _context['catch'](3);

                                    toaster.pop('error', '', _context.t0);

                                case 32:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[3, 29]]);
                }));

                return function (_x, _x2, _x3, _x4) {
                    return _ref.apply(this, arguments);
                };
            }();
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};