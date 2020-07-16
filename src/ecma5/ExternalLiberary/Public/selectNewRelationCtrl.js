'use strict';

var selectNewRelationCtrl = function selectNewRelationCtrl(uibModal) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Public/selectNewRelation.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance) {
                $scope.deleteFolderForm = {};

                $scope.data = {
                    isHeader: false
                };

                $scope.func = {};
                $scope.func.add = function () {
                    return $uibModalInstance.close({ isHeader: $scope.data.isHeader });
                };
                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };
            },
            size: 'md',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {}
        });
        modalInstance.result.then(function (response) {
            if (response) resolve(response);else reject('انصراف از افزودن رابطه');
        }, function (error) {
            return reject('انصراف از افزودن رابطه');
        });
    });
};