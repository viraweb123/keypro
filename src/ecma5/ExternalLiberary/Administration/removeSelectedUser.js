"use strict";

var removeSelectedUser = function removeSelectedUser(uibModal, _user) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Administration/removeSelectedUser.html?dev=" + randomVersionName,
            controller: function controller($scope, $uibModalInstance, user) {
                $scope.deleteFolderForm = {};

                $scope.data = {
                    name: user.UserId
                };

                $scope.func = {};
                $scope.func.remove = function () {
                    return $uibModalInstance.close(true);
                };
                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.func.run = function () {
                    try {
                        $.ajax({
                            processData: false,
                            contentType: false,
                            method: "GET",
                            headers: {},
                            //contentType: 'multipart/form-data',
                            url: "/KeydocPro/services/rest/auth/getUserImage?user=" + user.UserId + "&" + new Date().getTime()
                        }).done(function (res) {
                            var img = document.getElementById("current-user-image");
                            img.src = "/KeydocPro/services/rest/auth/getUserImage?user=" + user.UserId + "&" + new Date().getTime();
                        }).fail(function (err) {
                            var img = document.getElementById("current-user-image");
                            img.src = err.status == 200 && err.readyState == 4 ? "/KeydocPro/services/rest/auth/getUserImage?user=" + user.UserId + "&" + new Date().getTime() : '../../../../resource/img/user.png';
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };
                $scope.func.run();
            },
            size: 'md',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                user: function user() {
                    return _user;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) resolve(true);else reject('انصراف از حذف کلیدواژه انتخابی');
        }, function (error) {
            return reject('انصراف از حذف کلیدواژه انتخابی');
        });
    });
};