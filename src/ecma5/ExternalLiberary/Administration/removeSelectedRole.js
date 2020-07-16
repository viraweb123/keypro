"use strict";

var removeSelectedRole = function removeSelectedRole(uibModal, _role) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Administration/removeSelectedRole.html?dev=" + randomVersionName,
            controller: function controller($scope, $uibModalInstance, role) {
                $scope.deleteFolderForm = {};

                $scope.data = {
                    name: role.name
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
                role: function role() {
                    return _role;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) resolve(true);else reject('انصراف از حذف نقش انتخابی');
        }, function (error) {
            return reject('انصراف از حذف نقش انتخابی');
        });
    });
};