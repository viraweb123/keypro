"use strict";

var viewOpinionesDashboardCtrl = function viewOpinionesDashboardCtrl(uibModal, _id, _actorId, _service, _comments, _convertDate) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Dashboard/viewOpinionesDashboard.html?dev=" + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, id, actorId, service, comments, convertDate) {

                $scope.data = {
                    comments: _.clone(comments),
                    comment: null
                };

                $scope.func = {};

                $scope.func.addComment = function () {
                    if (!_.includes(["", null], $scope.data.comment)) {
                        try {
                            window.document.querySelector(".modal-body form textarea").classList.remove("error-ocure");
                            service.workflow.addTaskInstanceComment(id, $scope.data.comment).then(function (res) {
                                var currentDate = new Date();
                                $scope.data.comments.push({
                                    message: _.clone($scope.data.comment),
                                    actorId: actorId,
                                    time: {
                                        year: currentDate.getYear(),
                                        month: currentDate.getMonth(),
                                        dayOfMonth: currentDate.getDay(),
                                        hourOfDay: currentDate.getHours(),
                                        minute: currentDate.getMinutes(),
                                        second: currentDate.getSeconds()
                                    },
                                    timeNew: Date.parse(currentDate)
                                });

                                $scope.data.comment = "";
                            }, function (error) {
                                return toaster.pop('error', '', 'مشکلی در درج اطلاعات ایجاد شده است.');
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    } else {
                        try {
                            window.document.querySelector(".modal-body form textarea").classList.add("error-ocure");
                            toaster.pop('error', '', 'لطفا یک نظر وارد کنید.');
                        } catch (e) {
                            console.error(e);
                        }
                    }
                };

                $scope.func.cancel = function () {
                    return $uibModalInstance.close($scope.data.comments);
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
                id: function id() {
                    return _id;
                },
                actorId: function actorId() {
                    return _actorId;
                },
                service: function service() {
                    return _service;
                },
                comments: function comments() {
                    return _comments;
                },
                convertDate: function convertDate() {
                    return _convertDate;
                }
            }
        });

        modalInstance.result.then(function (response) {
            return resolve(response);
        }, function (error) {
            return resolve([]);
        });
    });
};