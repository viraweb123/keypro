'use strict';

var addOrEditRelationFunction = function addOrEditRelationFunction(uibModal, _relation, _relations) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Administration/addOrEditRelation.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, relation, relations) {

                $scope.formGeneratorName = {};
                $scope.data = {
                    isEdit: _.has(relation, 'id'),
                    header: _.has(relation, 'id') ? 'administration.zm.relation_definition_modal_edit' : 'administration.zm.relation_definition_modal_create',
                    relation: _.clone(relation),
                    relationTypes: [{
                        label: 'یک به یک',
                        value: 'oneToOne'
                    }, {
                        label: 'یک به چند',
                        value: 'oneToMany'
                    }, {
                        label: 'چند به چند',
                        value: 'manyToMany'
                    }]
                };

                $scope.func = {};

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.func.save = function () {
                    try {

                        if (_.has($scope.formGeneratorName.$error, 'required') && _.isArray($scope.formGeneratorName.$error.required) && $scope.formGeneratorName.$error.required.length > 0) {
                            toaster.pop('error', '', 'لطفا فیلد های اجباری را پر کنید');

                            if ($scope.formGeneratorName.$invalid) {
                                _.forEach($scope.formGeneratorName.$error, function (field) {

                                    _.forEach(field, function (errorField) {

                                        errorField.$setTouched();

                                        if (_.has(errorField, '$name')) {
                                            var res = errorField.$name.match(/metadata-\d+/);
                                            if (res != null) {
                                                try {
                                                    window.document.getElementById(res).classList.add("property-body-error");
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                            }
                                        }
                                    });
                                });
                            }
                        } else if (_.has($scope.formGeneratorName.$error, 'pattern') && _.isArray($scope.formGeneratorName.$error.pattern) && $scope.formGeneratorName.$error.pattern.length > 0) {

                            toaster.pop('error', '', 'لطفا الگوهای درست وارد کنید');
                        } else if ($scope.data.relation.relationType == null) {
                            toaster.pop('error', '', 'لطفا یک رابطه انتخاب کنید.');
                        } else if ($scope.data.isEdit == false && _.includes(relations, $scope.data.relation.title)) toaster.pop('error', '', ' ارتباطی با نام ' + $scope.data.relation.title + ' قبلا در سیستم اضافه شده است');else $uibModalInstance.close($scope.data.relation);
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.$on("$destroy", function () {
                    try {

                        // clear all data and functions
                        $scope.func = undefined;
                        $scope.data = undefined;
                        $scope.formGeneratorName = undefined;
                    } catch (e) {
                        console.error(e);
                    }
                });
            },
            size: 'lg',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                relation: function relation() {
                    return _relation;
                },
                relations: function relations() {
                    return _relations;
                }
            }
        });

        modalInstance.result.then(function (response) {
            if (response) {
                resolve(response);
            } else reject('عدم ایجاد رابطه');
        }, function (error) {
            return reject('عدم ایجاد رابطه');
        });
    });
};