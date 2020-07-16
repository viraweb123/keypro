"use strict";

var renameFolderExternalDesktopCtrl = function renameFolderExternalDesktopCtrl(uibModal, folder, currentNode, _banList) {
    return new Promise(function (resolve, reject) {

        console.log(3);

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Desktop/renameFolderDesktop.html?dev=" + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, name, banList) {
                $scope.newFolderForm = {};

                $scope.data = {
                    txtFolderName: name
                };

                $scope.func = {};

                $scope.func.checkTrue = function () {
                    if ($scope.newFolderForm.txtFolderName.hasOwnProperty('$setTouched')) $scope.newFolderForm.txtFolderName.$setTouched();
                    if ($scope.newFolderForm.$valid == true) {
                        var index = _.findIndex(banList, function (ban) {
                            return _.toLower(ban) == _.toLower($scope.data.txtFolderName) || ban == $scope.data.txtFolderName;
                        });
                        if (index >= 0) toaster.pop("error", "", "این پوشه با این فرمت در لیست وجود دارد.");else $scope.func.createNewFolder();
                    }
                };

                $scope.func.createNewFolder = function () {
                    return $uibModalInstance.close({ name: $scope.data.txtFolderName });
                };

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };
            },
            size: 'md',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                name: function name() {
                    return currentNode.label;
                },
                banList: function banList() {
                    return typeof _banList !== "undefined" ? _banList : [];
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) {
                folder.rename(currentNode.uuid || currentNode.id, response.name).then(function (res) {
                    return resolve(response.name);
                }, function (error) {
                    return reject('عدم تغییر نام پوشه');
                });
            } else reject('عدم تغییر نام پوشه');
        }, function (error) {
            return reject('عدم تغییر نام پوشه');
        });
    });
};