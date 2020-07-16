'use strict';

var removeMetadataAdded = function removeMetadataAdded(uibModal, _name) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Administration/removeMetadataAdded.html?dev=' + randomVersionName,
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
            if (response) resolve(response);else reject('انصراف از حذف فراداده انتخابی');
        }, function (error) {
            return reject('انصراف از حذف فراداده انتخابی');
        });
    });
};