"use strict";

var addCategories2DesktopCtrl = function addCategories2DesktopCtrl(uibModal, repository, rootPath, _folder, _treeType) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Desktop/addCategories2Desktop.html?dev=" + randomVersionName,
            controller: function controller($scope, $uibModalInstance, root, folder, treeType) {

                $scope.data = {
                    copyTree: {},
                    nodes: {},
                    root: angular.copy(root)

                };
                $scope.data.nodes[$scope.data.root[0].path] = $scope.data.root[0];
                $scope.func = {};
                $scope.func.getNameFromPath = function (path) {
                    return typeof path === "string" ? path.split("/").pop() : "";
                };
                $scope.func.copyTreeView = {
                    changeCurrentNode: function changeCurrentNode(node) {

                        $scope.data.copyTree.currentNode = node;
                        if ($scope.data.copyTree.currentNode && $scope.data.copyTree.currentNode.hasChildrenFolder) folder.listChild($scope.data.copyTree.currentNode.id).then(function (result) {
                            if (result.data != null) {
                                $scope.data.copyTree.currentNode.children = $scope.data.copyTree.currentNode.children && Array.isArray($scope.data.copyTree.currentNode.children) ? $scope.data.copyTree.currentNode.children : [];
                                _.forEach(result.data, function (res) {
                                    if (_.has(res, 'uuid') || _.has(res, 'id')) {
                                        //if (_.findIndex(_.map($scope.data.trees.taxonomyTree.currentNode.children, 'id'), id => id == (res.uuid || res.id)) == -1) {
                                        if (_.findIndex($scope.data.copyTree.currentNode.children, function (child) {
                                            return (child.uuid || child.id) == (res.uuid || res.id);
                                        }) == -1) {

                                            $scope.data.copyTree.currentNode.children.push({
                                                id: res.uuid || res.id,
                                                uuid: res.uuid || res.id,
                                                label: $scope.func.getNameFromPath(res.path),
                                                permissions: res.permissions,
                                                path: res.path,
                                                hasChildrenFolder: res.hasChildren,
                                                collapsed: true,
                                                selected: false,
                                                type: 'FOLDER',
                                                group: treeType,
                                                subscribed: _.has(res, 'subscribed') ? res.subscribed : false
                                            });
                                            $scope.data.nodes[res.path] = $scope.data.copyTree.currentNode.children[$scope.data.copyTree.currentNode.children.length - 1];
                                        }
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
                    if ($scope.data.copyTree.currentNode) $uibModalInstance.close({
                        addNode: $scope.data.copyTree.currentNode,
                        selectNodes: $scope.data.nodes

                    });else $uibModalInstance.close(false);
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
                treeType: function treeType() {
                    return _treeType;
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