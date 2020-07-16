'use strict';

var deleteMapCtrl = function deleteMapCtrl(uibModal) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: '/ecma5/ExternalLiberary/Map/deleteMap.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance) {
                $scope.deleteFolderForm = {};

                $scope.func = {};
                $scope.func.remove = function () {
                    return $uibModalInstance.close(true);
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
            if (response) resolve();else reject('انصراف از حذف نقشه انتخابی');
        }, function (error) {
            return reject('انصراف از حذف نقشه انتخابی');
        });
    });
};