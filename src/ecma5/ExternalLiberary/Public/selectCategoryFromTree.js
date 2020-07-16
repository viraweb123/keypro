'use strict';

var selectCategoryFromTree = function selectCategoryFromTree(uibModal, repository, rootPath, _folder, _getNameFromPath) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Public/selectCategoryFromTree.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, root, folder, getNameFromPath) {

                $scope.data = {
                    copyTree: {},
                    nodes: {},
                    root: angular.copy(root)

                };
                $scope.data.nodes[$scope.data.root[0].path] = $scope.data.root[0];
                $scope.func = {};
                $scope.func.copyTreeView = {
                    changeCurrentNode: function changeCurrentNode(node) {

                        $scope.data.copyTree.currentNode = node;
                        if ($scope.data.copyTree.currentNode && $scope.data.copyTree.currentNode.hasChildrenFolder) folder.listChild($scope.data.copyTree.currentNode.id).then(function (result) {
                            if (result.data != null) {
                                $scope.data.copyTree.currentNode.children = $scope.data.copyTree.currentNode.children && Array.isArray($scope.data.copyTree.currentNode.children) ? $scope.data.copyTree.currentNode.children : [];
                                _.forEach(result.data, function (res) {
                                    var index = _.findIndex($scope.data.copyTree.currentNode.children, function (child) {
                                        return child.uuid == res.uuid;
                                    });
                                    if (index < 0) {
                                        $scope.data.copyTree.currentNode.children.push({
                                            id: res.uuid || res.id,
                                            uuid: res.uuid || res.id,
                                            label: getNameFromPath(res.path),
                                            permissions: res.permissions,
                                            path: res.path,
                                            hasChildrenFolder: res.hasChildren,
                                            collapsed: true,
                                            selected: false,
                                            type: 'FOLDER'
                                        });
                                        $scope.data.nodes[res.path] = $scope.data.copyTree.currentNode.children[$scope.data.copyTree.currentNode.children.length - 1];
                                    }
                                });
                            }
                        });
                    }
                };

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };
                $scope.func.copy = function () {
                    if ($scope.data.copyTree.currentNode) $uibModalInstance.close($scope.data.copyTree.currentNode);else $uibModalInstance.close(false);
                };
            },
            size: 'md',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                folder: function folder() {
                    return _folder;
                },
                root: function root() {
                    return repository.getRoot(rootPath).then(function (result) {
                        return result.data;
                    });
                },
                getNameFromPath: function getNameFromPath() {
                    return _getNameFromPath;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) resolve(response);else reject('عدم انتخاب مسیر');
        }, function (error) {
            return reject('عدم انتخاب مسیر');
        });

        //---------------------------------------------------------------------------------------------------------------
    });
};