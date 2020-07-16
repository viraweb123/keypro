'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var changeCurrentNodeTaxonomyDesktopCtrl = function changeCurrentNodeTaxonomyDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.changeCurrentNodeTaxonomy = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(node, collapsed, viewDoc) {
                    var viewDocs;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    viewDocs = typeof viewDoc === "undefined" ? undefined : viewDoc;

                                    $scope.data.trees.taxonomyTree.currentNode = node;

                                    if (typeof collapsed !== 'undefined') $scope.data.trees.taxonomyTree.currentNode.collapsed = collapsed;
                                    $scope.data.selectedFileOrFolder = node;

                                    if (!angular.isObject($scope.data.trees.taxonomyTree.currentNode)) {
                                        _context.next = 11;
                                        break;
                                    }

                                    _context.next = 8;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                case 8:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';
                                    try {
                                        $scope.func.stopAllPlayers();
                                    } catch (e) {
                                        console.error(e);
                                    }
                                    if ($scope.data.trees.taxonomyTree.currentNode.hasChildrenFolder) desktopService.folder.listChild($scope.data.trees.taxonomyTree.currentNode.id).then(function (result) {
                                        if (result.data != null) {
                                            $scope.data.trees.taxonomy.currentNodeCount = result.data.length;
                                            $scope.data.trees.taxonomyTree.currentNode.children = $scope.data.trees.taxonomyTree.currentNode.children && angular.isArray($scope.data.trees.taxonomyTree.currentNode.children) ? $scope.data.trees.taxonomyTree.currentNode.children : [];
                                            _.forEach(result.data, function (res) {
                                                if (_.has(res, 'uuid') || _.has(res, 'id')) {
                                                    if (typeof $scope.data.pointers["taxonomyVisible"][res.uuid || res.id] === "undefined") {
                                                        $scope.data.trees.taxonomyTree.currentNode.children.push({
                                                            id: res.uuid || res.id,
                                                            uuid: res.uuid,
                                                            label: getNameFromPath(res.path),
                                                            permissions: res.permissions,
                                                            path: res.path,
                                                            hasChildrenFolder: res.hasChildren,
                                                            collapsed: true,
                                                            selected: false,
                                                            type: 'FOLDER',
                                                            group: 'taxonomy',
                                                            subscribed: _.has(res, 'subscribed') ? res.subscribed : false
                                                        });
                                                        $scope.data.pointers["taxonomyVisible"][res.uuid || res.id] = $scope.data.trees.taxonomyTree.currentNode.children.slice(-1)[0];
                                                        $scope.data.nodesFolder[res.path] = $scope.data.pointers["taxonomyVisible"][res.uuid || res.id];
                                                    }
                                                }
                                            });
                                        } else $scope.data.trees.taxonomy.currentNodeCount = 0;
                                        $scope.func.selectFolder($scope.data.trees.taxonomyTree.currentNode, false, viewDocs);
                                    }, function (error) {
                                        return console.error(error);
                                    });else $scope.func.selectFolder($scope.data.trees.taxonomyTree.currentNode, false, viewDocs);
                                    /*$scope.func.stopAllPlayers();
                                    $scope.func.selectLeftNav();*/

                                case 11:
                                    _context.next = 16;
                                    break;

                                case 13:
                                    _context.prev = 13;
                                    _context.t0 = _context['catch'](0);

                                    console.error(_context.t0);

                                case 16:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 13]]);
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