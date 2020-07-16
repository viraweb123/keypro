'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var changeCurrentNodeCategoryAdminCtrl = function changeCurrentNodeCategoryAdminCtrl($scope, service, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.changeCurrentNodeCategory = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(node, collapsed, viewDoc) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    viewDoc = typeof viewDoc === "undefined" ? undefined : viewDoc;
                                    $scope.data.trees.categoryTree.currentNode = node;
                                    if (typeof collapsed !== 'undefined') $scope.data.trees.categoryTree.currentNode.collapsed = collapsed;
                                    $scope.data.selectedFileOrFolder = node;

                                    if (!angular.isObject($scope.data.trees.categoryTree.currentNode)) {
                                        _context.next = 10;
                                        break;
                                    }

                                    _context.next = 8;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                case 8:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';

                                    if ($scope.data.trees.categoryTree.currentNode.hasChildrenFolder) {
                                        service.folder.listChild($scope.data.trees.categoryTree.currentNode.id).then(function (result) {
                                            try {
                                                if (result.data != null) {
                                                    $scope.data.trees.category.currentNodeCount = result.data.length;
                                                    $scope.data.trees.categoryTree.currentNode.children = $scope.data.trees.categoryTree.currentNode.children && angular.isArray($scope.data.trees.categoryTree.currentNode.children) ? $scope.data.trees.categoryTree.currentNode.children : [];
                                                    _.forEach(result.data, function (res) {
                                                        try {
                                                            var newId = res.uuid || res.id;
                                                            if (typeof $scope.data.pointers["categoryVisible"][newId] === "undefined") {
                                                                $scope.data.trees.categoryTree.currentNode.children.push({
                                                                    id: newId,
                                                                    uuid: newId,
                                                                    label: getNameFromPath(res.path),
                                                                    permissions: res.permissions,
                                                                    path: res.path,
                                                                    hasChildrenFolder: res.hasChildren,
                                                                    collapsed: true,
                                                                    selected: false,
                                                                    type: 'FOLDER',
                                                                    group: 'category',
                                                                    subscribed: _.has(res, 'subscribed') ? res.subscribed : false
                                                                });
                                                                $scope.data.pointers["categoryVisible"][newId] = $scope.data.trees.categoryTree.currentNode.children.slice(-1)[0];
                                                                $scope.data.nodesFolder[res.path] = $scope.data.pointers["categoryVisible"][newId];
                                                            }
                                                        } catch (e) {}
                                                    });
                                                } else {
                                                    $scope.data.trees.category.currentNodeCount = 0;
                                                }
                                            } catch (err) {}
                                        }, function (error) {
                                            return console.error(error);
                                        });
                                    }

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