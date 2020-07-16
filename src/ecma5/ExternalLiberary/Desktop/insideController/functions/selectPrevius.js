"use strict";

var selectPreviusDesktopCtrl = function selectPreviusDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        try {

            $scope.func.selectPrevius = function () {

                if (_.isArray($scope.data.list) && $scope.data.list.length > 0 && $scope.data.selectedFileOrFolder != null) {
                    var index = _.findIndex($scope.data.list, function (item) {
                        return item.uuid == $scope.data.selectedFileOrFolder.uuid;
                    });

                    if (index >= 0 && $scope.data.list.length > 1) {
                        $scope.func.stopAllPlayers();
                        if (index >= 1) $scope.data.selectedFileOrFolder = $scope.data.list[--index];else $scope.data.selectedFileOrFolder = $scope.data.list[$scope.data.list.length - 1];
                    } else $scope.data.selectedFileOrFolder = $scope.data.list[$scope.data.list.length - 1];

                    if ($scope.data.selectedFileOrFolder.type != 'FOLDER') $scope.func.clickInDoc($scope.data.selectedFileOrFolder);
                    $scope.func.selectLeftNav();
                };
            };

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};