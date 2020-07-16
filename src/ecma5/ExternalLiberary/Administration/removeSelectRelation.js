'use strict';

var removeSelectRelation = function removeSelectRelation(uibModal, _name) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Administration/removeSelectRelation.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, name) {
                $scope.deleteFolderForm = {};

                $scope.data = {
                    name: name
                };

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
            resolve: {
                name: function name() {
                    return _name;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) resolve(true);else reject('انصراف از حذف رابطه انتخابی');
        }, function (error) {
            return reject('انصراف از حذف رابطه انتخابی');
        });
    });
};