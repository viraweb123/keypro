"use strict";

var renameFilDesktopCtrl = function renameFilDesktopCtrl(uibModal, docService, currentNode, _banList) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Desktop/renameFilDesktop.html?dev=" + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, name, banList) {
                $scope.newFolderForm = {};

                $scope.data = {
                    txtFolderName: _.clone(name).replace(/\.[^\.]+$/, ""),
                    extension: /\.[^\.]+$/.exec(name)[0]
                };

                $scope.func = {};

                $scope.func.checkTrue = function () {
                    if ($scope.newFolderForm.txtFolderName.hasOwnProperty('$setTouched')) $scope.newFolderForm.txtFolderName.$setTouched();
                    if ($scope.newFolderForm.$valid == true) {
                        var index = _.findIndex(banList, function (ban) {
                            return _.toLower(ban) == _.toLower($scope.data.txtFolderName);
                        });
                        if (index >= 0) toaster.pop("error", "", "این سند با این فرمت و نام در لیست وجود دارد.");else $scope.func.createNewFolder();
                    }
                };

                $scope.func.createNewFolder = function () {
                    return $uibModalInstance.close({ name: $scope.data.txtFolderName + $scope.data.extension });
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
                    return currentNode.name;
                },
                banList: function banList() {
                    return typeof _banList !== "undefined" ? _banList : [];
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) {
                docService.rename(currentNode.uuid || currentNode.id, response.name).then(function (res) {
                    return resolve(response.name);
                }, function (error) {
                    return reject('عدم تغییر نام سند');
                });
            } else reject('عدم تغییر نام سند');
        }, function (error) {
            return reject('عدم تغییر نام سند');
        });
    });
};