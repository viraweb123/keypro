'use strict';

var viewStatusDashboardCtrl = function viewStatusDashboardCtrl(uibModal, _service, _src) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Dashboard/viewStatusDashboard.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, service, src) {

                $scope.data = {
                    imageSrc: null
                };

                $scope.func = {};

                $scope.run = function () {
                    try {
                        $scope.data.imageSrc = src;
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.run();

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
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
            size: 'lg',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                service: function service() {
                    return _service;
                },
                src: function src() {
                    return _src;
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