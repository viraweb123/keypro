'use strict';

var createNewRole = function createNewRole(uibModal, _role, _roles) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Administration/createNewRole.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, roles, role) {

                $scope.formRoleInfoEditName = {};

                $scope.data = {
                    isNew: role.name == null,
                    txtRole: _.clone(role.name),
                    txtActive: _.clone(role.Active),
                    buttonLabel: role.name == null ? 'ایجاد' : 'ویرایش',
                    buttonIcon: role.name == null ? 'plus' : 'edit'
                };

                $scope.func = {};

                $scope.func.editRole = function (form) {
                    if (_.has($scope.formRoleInfoEditName.txtRole, '$setTouched')) $scope.formRoleInfoEditName.txtRole.$setTouched();
                };

                $scope.func.edit = function (form) {
                    $scope.func.editRole();

                    if (_.has($scope.formRoleInfoEditName.$error, 'required') && _.isArray($scope.formRoleInfoEditName.$error.required) && $scope.formRoleInfoEditName.$error.required.length > 0) {
                        if ($scope.formRoleInfoEditName.$invalid) {
                            _.forEach($scope.formRoleInfoEditName.$error, function (field) {
                                _.forEach(field, function (errorField) {
                                    return errorField.$setTouched();
                                });
                            });
                        }
                        toaster.pop("error", "", 'لطفا فیلد های اجباری را پر کنید');
                        return;
                    } else if (_.has($scope.formRoleInfoEditName.$error, 'pattern') && _.isArray($scope.formRoleInfoEditName.$error.pattern) && $scope.formRoleInfoEditName.$error.pattern.length > 0) {
                        toaster.pop("error", "", 'لطفا الگوهای درست وارد کنید');
                        return;
                    }

                    if (_.includes([null, "", '', undefined], $scope.data.txtRole)) {
                        toaster.pop('error', "", "لطفا برای نقش یک عنوان مشخص کنید");
                        return;
                    }

                    if ($scope.data.isNew && _.includes(roles, _.lowerCase($scope.data.txtRole))) {
                        toaster.pop('error', "", "نقشی با این نام در لیست وجود دارد");
                        return;
                    }

                    var txt = $scope.data.isNew ? 'ROLE_' + $scope.data.txtRole : $scope.data.txtRole;
                    $uibModalInstance.close({
                        role: txt,
                        active: $scope.data.txtActive
                    });
                };
                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.$on("$destroy", function () {
                    try {

                        try {
                            $(".modal-body form").getNiceScroll().remove();
                        } catch (error) {
                            console.error(error);
                        }

                        // clear all data and functions
                        $scope.func = undefined;
                        $scope.data = undefined;
                    } catch (e) {
                        console.error(e);
                    }
                });

                $scope.func.run = function () {

                    try {
                        _.defer(function () {
                            $(".modal-body form").niceScroll({
                                cursorcolor: "#ed4356",
                                cursorwidth: "4px",
                                cursorborderradius: "0px",
                                rtlmode: false
                            });
                        }, 1000);
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };

                //run
                {
                    $scope.func.run();
                }
            },
            size: 'sm',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                role: function role() {
                    return _role;
                },
                roles: function roles() {
                    return _roles;
                }
            }
        });

        modalInstance.result.then(function (response) {
            if (response) {
                resolve(response);
            } else reject('عدم افزودن نقش جدید');
        }, function (error) {
            return reject('عدم افزودن نقس جدید');
        });
    });
};