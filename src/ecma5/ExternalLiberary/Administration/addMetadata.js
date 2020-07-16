"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addMetadata = function addMetadata(uibModal, _service, _names) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Administration/addMetadata.html?dev=" + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, service, names) {

                $scope.data = {
                    metadatas: null,
                    selectMetadata: null,
                    PropertyGroup: null,
                    formMetadata: null,
                    name: ""
                };

                $scope.data.models = [{ listName: "لیست انتخاب نشده", items: [], dragging: false }, { listName: "لیست انتخاب شده", items: [], dragging: false }];

                $scope.func = {};

                $scope.func.getMetadataList = function () {
                    return new Promise(function (resolve, reject) {
                        if ($scope.data.metadatas != null) resolve($scope.data.metadatas);else {
                            service.propertyGroup.list().then(function (pgres) {
                                if (pgres.data != null) {
                                    $scope.data.metadatas = _.clone(pgres.data);
                                    resolve($scope.data.metadatas);
                                }
                            }, function (error) {
                                return reject(error);
                            });
                        }
                    });
                };

                $scope.func.changeMetaData = function () {
                    try {
                        $scope.data.PropertyGroup = null;
                        service.propertyGroup.form($scope.data.selectMetadata).then(function () {
                            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                $scope.data.propertyGroup = _.clone(res.data);
                                                $scope.data.models = [{ listName: "لیست انتخاب نشده", items: [], dragging: false }, { listName: "لیست انتخاب شده", items: [], dragging: false }];
                                                if (_.has($scope.data.propertyGroup, 'properties') && _.isArray($scope.data.propertyGroup.properties)) _.forEach($scope.data.propertyGroup.properties, function (property) {
                                                    $scope.data.models[0].items.push({
                                                        label: property.label,
                                                        value: _.clone(property)
                                                    });
                                                });
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });

                                            case 4:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x) {
                                return _ref.apply(this, arguments);
                            };
                        }(), function (error) {
                            return toaster.pop('error', '', 'عدم دریافت مشخصات فراداده.');
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };

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
                        }query += "name=" + $scope.data.name; //$scope.data.propertyGroup.name
                        if (query.endsWith("&")) query = query.slice(0, query.length - 1);
                        $uibModalInstance.close(query);
                    }
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
            },
            size: 'lg',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                service: function service() {
                    return _service;
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