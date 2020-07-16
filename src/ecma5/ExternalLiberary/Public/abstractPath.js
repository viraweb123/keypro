"use strict";

//   tree  ==  $scope.data.trees.taxonomyVisible
//   visible  ==  $scope.data.trees.taxonomyTree
//   pointer ==  $scope.data.pointers["taxonomyVisible"]
//   nodes  ==  $scope.data.nodesFolder
var abstractPath = function abstractPath(path, service, tree, visible, pointer, nodes, groupName) {
    return new Promise(function (resolve, reject) {
        try {
            service.folder.getAbstractPaths(path).then(function (res) {
                res = res.data.originalElement;
                var paths = _.remove(path.trim().split("/"), function (v) {
                    return v != "";
                });
                var currentPath = "/" + paths.shift();
                var index = 0;
                if (typeof pointer[res[index]] !== "undefined") {
                    visible.currentNode = pointer[res[index]];
                    visible.currentNode.collapsed = false;
                } else {
                    tree = [{
                        permissions: 15,
                        label: currentPath,
                        path: currentPath,
                        hasChildrenFolder: true,
                        id: res[index],
                        uuid: res[index],
                        collapsed: false,
                        root: true,
                        children: [],
                        type: 'FOLDER',
                        group: groupName
                    }];
                    visible.currentNode = tree[0];
                    pointer[res[index]] = tree[0];
                    nodes[currentPath] = pointer[res[index]];
                }

                index++;

                while (paths.length > 0) {
                    var label = paths.shift();
                    currentPath += "/" + label;
                    if (typeof pointer[res[index]] !== "undefined") {
                        visible.currentNode = pointer[res[index]];
                        visible.currentNode.collapsed = false;
                    } else {
                        visible.currentNode.children = visible.currentNode.children || [];
                        visible.currentNode.children.push({
                            id: res[index],
                            uuid: res[index],
                            label: label,
                            permissions: 15,
                            path: currentPath,
                            hasChildrenFolder: true,
                            collapsed: false,
                            selected: false,
                            children: [],
                            type: 'FOLDER',
                            group: groupName
                        });
                        pointer[res[index]] = visible.currentNode.children[0];
                        nodes[currentPath] = pointer[res[index]];
                        visible.currentNode = visible.currentNode.children[0];
                    }

                    index++;
                }
                resolve({ id: res.pop(), tree: tree });
            }, function (error) {
                return reject(error);
            });
        } catch (e) {
            reject(e);
        }
    });
};