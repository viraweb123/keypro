"use strict";

var editTreeMetadata = function editTreeMetadata(uibModal, _service, _metadata, _group, _selectedProperties, _names) {
    return new Promise(function (resolve, reject) {

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Administration/editTreeMetadata.html?dev=" + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, service, metadata, group, properties, selectedProperties, names) {

                $scope.data = {
                    metadatas: null,
                    selectMetadata: null,
                    PropertyGroup: null,
                    formMetadata: null,
                    name: "",
                    propertGropLabel: ""
                };
                $scope.func = {};
                $scope.func.getSelectedItemsIncluding = function (list, item) {
                    item.selected = true;
                    return list.items.filter(function (item) {
                        return item.selected;
                    });
                };
                $scope.func.onDragstart = function (list, event) {

                    list.dragging = true;
                    if (event.dataTransfer.setDragImage) {
                        var img = new Image();
                        img.src = 'static/img/_smallblank.png';
                        event.dataTransfer.setDragImage(img, 0, 0, 50, 50);
                    }
                };
                $scope.func.onDrop = function (list, items, index) {
                    angular.forEach(items, function (item) {
                        item.selected = false;
                    });
                    list.items = list.items.slice(0, index).concat(items).concat(list.items.slice(index));
                    return true;
                };
                $scope.func.onMoved = function (list) {
                    list.items = list.items.filter(function (item) {
                        return !item.selected;
                    });
                };

                $scope.func.fillMetadata = function () {
                    try {

                        $scope.data.name = metadata.groupName;
                        $scope.data.propertGropLabel = properties.label;

                        $scope.data.models = [{ listName: "لیست انتخاب نشده", items: [], dragging: false }, { listName: "لیست انتخاب شده", items: [], dragging: false }];
                        if (_.has(properties, 'properties') && _.isArray(properties.properties)) {

                            var propertiesObjects = _.clone(_.keyBy(properties.properties, 'name'));
                            for (var i = 0; i < selectedProperties.length; i++) {

                                if (_.has(propertiesObjects, selectedProperties[i])) {
                                    $scope.data.models[1].items.push({
                                        label: propertiesObjects[selectedProperties[i]].label,
                                        value: _.clone(propertiesObjects[selectedProperties[i]])
                                    });
                                    propertiesObjects[selectedProperties[i]] = undefined;
                                    delete propertiesObjects[selectedProperties[i]];
                                }
                            }
                            for (var key in propertiesObjects) {
                                $scope.data.models[0].items.push({
                                    label: propertiesObjects[key].label,
                                    value: _.clone(propertiesObjects[key])
                                });
                            }

                            _.defer(function () {
                                return $scope.$apply();
                            });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.func.add = function () {
                    if ($scope.data.models[1].items.length == 0) toaster.pop('error', '', 'لطفا حداقل یک فیلد از فراداده ها انتخاب کنید');else if ($scope.data.models[1].items.length > 12) toaster.pop('error', '', 'لطفا حداکثر ۱۲ فیلد از فراداده ها پر کنید');else if (_.includes(["", null], $scope.data.name)) toaster.pop('error', '', 'لطفا یک نام برای فراداده بنویسید');else if (_.includes(names, $scope.data.name)) toaster.pop('error', '', 'نام فراداده فوق قبلا در ج شده است');else {
                        var query = "";
                        _.forEach($scope.data.models[1].items, function (property, index) {
                            return query += "property=" + (index + 1) + "=" + property.value.name + "=" + property.value.label + "&";
                        });

                        for (var i = $scope.data.models[1].items.length; i < 14; i++) {
                            query += "property=" + (i + 1) + "=0&";
                        }query += "id=" + metadata.id + "&";

                        query += "name=" + $scope.data.name; //$scope.data.propertyGroup.name

                        if (query.endsWith("&")) query = query.slice(0, query.length - 1);
                        $uibModalInstance.close(query);
                    }
                };

                $scope.func.fillMetadata();

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
                metadata: function metadata() {
                    return _metadata;
                },
                group: function group() {
                    return _group;
                },
                properties: function properties() {
                    return _service.propertyGroup.form(_group).then(function (res) {
                        return res.data;
                    });
                },
                selectedProperties: function selectedProperties() {
                    return _selectedProperties;
                },
                names: function names() {
                    return _names;
                }
            }
        });

        modalInstance.result.then(function (response) {
            if (response) {
                resolve(response);
            } else reject('عدم ایجاد فراداده جدید');
        }, function (error) {
            return reject('عدم ایجاد فراداده جدید');
        });
    });
};