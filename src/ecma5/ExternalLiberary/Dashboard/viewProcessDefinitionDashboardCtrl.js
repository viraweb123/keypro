'use strict';

var viewProcessDefinitionDashboardCtrl = function viewProcessDefinitionDashboardCtrl(uibModal, _list) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Dashboard/viewProcessDefinitionDashboard.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, list) {

                $scope.data = {
                    list: _.clone(list)
                };

                $scope.func = {};

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(true);
                };

                $scope.$on("$destroy", function () {
                    try {

                        // clear all data and functions
                        $scope.func = undefined;
                        $scope.data = undefined;
                    } catch (e) {
                        console.error(e);
                    }
                });
            },
            size: 'sm',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                list: function list() {
                    return _list;
                }
            }
        });

        modalInstance.result.then(function (response) {
            return resolve(true);
        }, function (error) {
            return resolve(true);
        });
    });
};