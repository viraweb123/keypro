'use strict';

var getHiddenTreeDesktopCtrl = function getHiddenTreeDesktopCtrl(pointer, response, treeType) {
    return new Promise(function (resolve, reject) {
        try {
            if (!pointer[response.addNode.id]) {
                (function () {

                    var arrayPaths = _.filter(_.split(response.addNode.path, '/'), function (i) {
                        return i != "";
                    });
                    var parentNodeID = null;
                    var path = '/' + arrayPaths.shift();
                    var currentNodeID = response.selectNodes[path].id;

                    // root exist
                    if (!pointer.hasOwnProperty(currentNodeID)) {
                        (function () {
                            var root = {
                                label: response.selectNodes[path].path,
                                path: response.selectNodes[path].path,
                                hasChildrenFolder: true,
                                id: response.selectNodes[path].uuid,
                                uuid: response.selectNodes[path].uuid,
                                collapsed: true,
                                root: true,
                                children: [],
                                type: 'FOLDER',
                                group: treeType
                            };
                            pointer[response.selectNodes[path].id] = root;
                            // if root is childrens add Childs to pointer
                            if (response.selectNodes[path].children && _.isArray(response.selectNodes[path].children)) _.forEach(response.selectNodes[path].children, function (child) {
                                root.children.push(response.selectNodes[child.path]);
                                pointer[response.selectNodes[child.path].id] = root.children.slice(-1)[0];
                            });
                        })();
                    }
                    parentNodeID = response.selectNodes[path].id;
                    for (var i = 0; i < arrayPaths.length; i++) {
                        path += '/' + arrayPaths[i];
                        currentNodeID = response.selectNodes[path].id;

                        if (!pointer.hasOwnProperty(currentNodeID)) {
                            pointer[parentNodeID].children = pointer[parentNodeID].children && _.isArray(pointer[parentNodeID].children) ? pointer[parentNodeID].children : [];

                            var index = _.findIndex(_.map(pointer[parentNodeID].children, 'id'), function (id) {
                                return id == currentNodeID;
                            });
                            if (index >= 0) {
                                pointer[parentNodeID].children[index] = {
                                    label: response.selectNodes[path].label,
                                    path: response.selectNodes[path].path,
                                    hasChildrenFolder: response.selectNodes[path].hasChildren || false,
                                    id: currentNodeID,
                                    collapsed: true,
                                    children: [],
                                    selected: false,
                                    type: 'FOLDER',
                                    group: treeType,
                                    uuid: currentNodeID,
                                    permissions: response.selectNodes[path].permissions,
                                    subscribed: _.has(response.selectNodes[path], 'subscribed') ? response.selectNodes[path].subscribed : false
                                };
                                pointer[currentNodeID] = pointer[parentNodeID].children[index];
                            } else {
                                pointer[parentNodeID].children.push({
                                    label: response.selectNodes[path].label,
                                    path: response.selectNodes[path].path,
                                    hasChildrenFolder: response.selectNodes[path].hasChildren || false,
                                    id: currentNodeID,
                                    collapsed: true,
                                    children: [],
                                    selected: false,
                                    type: 'FOLDER',
                                    group: treeType,
                                    uuid: currentNodeID,
                                    permissions: response.selectNodes[path].permissions,
                                    subscribed: _.has(response.selectNodes[path], 'subscribed') ? response.selectNodes[path].subscribed : false
                                });
                                pointer[currentNodeID] = pointer[parentNodeID].children.slice(-1)[0];
                            }

                            if (response.selectNodes[path].children && _.isArray(response.selectNodes[path].children)) _.forEach(response.selectNodes[path].children, function (child) {
                                pointer[currentNodeID].children.push(response.selectNodes[child.path]);
                                pointer[response.selectNodes[child.path].id] = pointer[currentNodeID].children.slice(-1)[0];
                            });
                        }
                        pointer[currentNodeID].collapsed = false;
                        parentNodeID = _.clone(currentNodeID);
                    }
                    resolve(true);
                })();
            } else resolve(true);
        } catch (e) {
            console.error(e);
        }
    });
};