'use strict';

var createNewFolderDesktopCtrl = function createNewFolderDesktopCtrl(uibModal, folder, currentNode, treeType) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Desktop/createNewFolderDesktop.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance) {
                $scope.newFolderForm = {};

                $scope.data = {
                    txtFolderName: ''
                };

                $scope.func = {};

                $scope.func.checkTrue = function () {
                    if ($scope.newFolderForm.txtFolderName.hasOwnProperty('$setTouched')) $scope.newFolderForm.txtFolderName.$setTouched();
                    if ($scope.newFolderForm.$valid == true) $scope.func.createNewFolder();
                };

                $scope.func.createNewFolder = function () {
                    return $uibModalInstance.close({ name: $scope.data.txtFolderName });
                };

                $scope.func.cancelNewFolder = function () {
                    return $uibModalInstance.close(false);
                };
            },
            size: 'md',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {}
        });
        modalInstance.result.then(function (response) {
            if (response) {

                folder.create(currentNode.path + '/' + response.name).then(function (res) {
                    if (res.data.folder) {
                        currentNode.children = currentNode.children || [];
                        currentNode.children.push({
                            label: response.name,
                            path: res.data.folder.path,
                            hasChildrenFolder: res.data.folder.hasChildren,
                            id: res.data.folder.uuid,
                            uuid: res.data.folder.uuid,
                            collapsed: false,
                            root: false,
                            children: [],
                            permissions: res.data.folder.permissions,
                            selected: false,
                            type: 'FOLDER',
                            group: treeType,
                            subscribed: _.has(res.data.folder, 'subscribed') ? res.data.folder.subscribed : false
                        });
                        currentNode.hasChildrenFolder = true;
                        currentNode.collapsed = false;
                        resolve(res.data.folder.uuid);
                    } else reject('عدم ساخت پوشه جدید در سرور');
                }, function (error) {
                    return reject('عدم ساخت پوشه جدید در سرور');
                });
            } else reject('عدم ساخت پوشه جدید در سرور');
        }, function (error) {
            return reject('عدم ساخت پوشه جدید');
        });
    });
};