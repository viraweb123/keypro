'use strict';

var viewTypicalProcessDashboardCtrl = function viewTypicalProcessDashboardCtrl(uibModal, _service, _list) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Dashboard/viewTypicalProcessDashboard.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, service, list, path) {

                $scope.data = {
                    list: _.clone(list),
                    path: _.clone(path.data)
                };

                $scope.func = {};

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(path);
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
                service: function service() {
                    return _service;
                },
                list: function list() {
                    return _list;
                },
                path: function path() {
                    if (_list.path != null) return _list.path;else {
                        return _service.document.getPath(_list.uuid);
                    }
                }
            }
        });

        modalInstance.result.then(function (response) {
            return resolve(response);
        }, function (error) {
            return resolve(null);
        });
    });
};