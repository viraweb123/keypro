'use strict';

var updateSelected = function updateSelected(uibModal, _fileItem, _service) {
    return new Promise(function (resolve, reject) {
        try {
            var modalInstance = uibModal.open({
                templateUrl: 'ecma5/ExternalLiberary/Desktop/updateSelected.html?dev=' + randomVersionName,
                controller: function controller($scope, $uibModalInstance, toaster, $upload, fileItem, service) {
                    $scope.data = {
                        upload: {},
                        file: {},
                        startUpload: false
                    };

                    $scope.func = {};

                    $scope.func.getname = function (name) {
                        return _.replace(name, /\.[A-Za-z0-9]+$/, '');
                    };

                    //else if(! _.isEqual($scope.func.getname(files[0].name) , fileItem.uuid))
                    $scope.func.addFiles = function (files) {
                        if (files.length == 0) toaster.pop('error', "", "لطفا یک سند انتخاب کنید");else if (!_.isEqual(files[0].name, fileItem.name)) toaster.pop('error', "", "لطفا یک سند هم نام با سند اصلی انتخاب کنید");else {
                            $scope.data.file = {
                                file: files[0]
                            };
                            $scope.func.startUpload();
                        }
                    };

                    $scope.func.onRemoveFileClick = function () {
                        try {
                            if (!_.isEqual($scope.data.upload, {})) {
                                $scope.data.upload.upload.abort();
                                $scope.data.upload = {};
                            }
                            $scope.data.file = null;
                        } catch (e) {
                            console.error(e);
                        }
                    };

                    $scope.func.onCancelFileClick = function () {
                        try {
                            if (!_.isEqual($scope.data.upload, {})) {
                                $scope.data.upload.upload.abort();
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    };

                    $scope.func.uploadAgain = function () {
                        if (!_.isEqual($scope.data.upload, {}) && $scope.data.upload.status == 'ERROR') $scope.func.startUpload();
                    };

                    $scope.func.startUpload = function () {

                        if (isCookieFunction('Authorization') != null) {

                            if (_.isEqual($scope.data.file, {})) {
                                toaster.pop('error', "", "لطفا یک سند انتخاب کنید");
                                $scope.data.startUpload = false;
                            } else {

                                $scope.data.startUpload = true;
                                $scope.data.upload = {
                                    percent: 0,
                                    filename: $scope.data.file.file.name,
                                    path: fileItem.path + '/' + $scope.data.file.file.name,
                                    status: "SEND",
                                    upload: $upload.upload({
                                        url: '/KeydocPro/services/rest/document/checkin',
                                        data: {
                                            docId: fileItem.uuid,
                                            content: $scope.data.file.file
                                        },
                                        headers: { 'Authorization': decodeURIComponent(_.replace(isCookieFunction("Authorization"), "Bearer", "Bearer ")) }
                                    }).progress(function (evt) {
                                        _.defer(function () {
                                            $scope.$apply($scope.data.upload.percent = parseInt(100.0 * evt.loaded / evt.total));
                                        });
                                    }).success(function (data, status, headers, config) {
                                        $scope.data.upload.status = 'SUCCESS';
                                        _.defer(function () {
                                            return $scope.$apply($scope.data.upload.percent = 100);
                                        });
                                        $scope.data.startUpload = false;
                                    }).error(function (error) {
                                        $scope.data.upload.status = 'ERROR';
                                        _.defer(function () {
                                            return $scope.$apply($scope.data.upload.percent = 100);
                                        });
                                        $scope.data.startUpload = false;
                                    })
                                };
                            }
                        } else {
                            toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                            $uibModalInstance.close(false);
                        }
                    };

                    $scope.func.close = function () {
                        return $uibModalInstance.close(_.has($scope.data.upload, 'status') && $scope.data.upload.status == 'SUCCESS');
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
                size: 'md',
                backdrop: 'static', // false,
                keyboard: false,
                resolve: {

                    fileItem: function fileItem() {
                        return _fileItem;
                    },
                    service: function service() {
                        return _service;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                if (response) resolve(true);else reject('عدم به روز رسانی سند انتخابی');
            });
        } catch (e) {
            reject('عدم به روز رسانی سند انتخابی');
        }
    });
};