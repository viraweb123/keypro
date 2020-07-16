'use strict';

var deleteSelectedKeywordCtrl = function deleteSelectedKeywordCtrl(uibModal) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Desktop/deleteSelectedKeyword.html?dev=' + randomVersionName,
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
            if (response) resolve(true);else reject('انصراف از حذف کلیدواژه انتخابی');
        }, function (error) {
            return reject('انصراف از حذف کلیدواژه انتخابی');
        });
    });
};