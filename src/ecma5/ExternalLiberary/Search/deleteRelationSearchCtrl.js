'use strict';

var deleteRelationSearchCtrl = function deleteRelationSearchCtrl(uibModal) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Search/deleteRelationSearch.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance) {
                $scope.deleteRelationForm = {};

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
            if (response) resolve(true);else reject('انصراف از حذف رابطه انتخابی');
        }, function (error) {
            return reject('انصراف از حذف رابطه انتخابی');
        });
    });
};