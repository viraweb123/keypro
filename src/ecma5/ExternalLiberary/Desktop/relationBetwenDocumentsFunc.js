'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var relationBetwenDocumentsFunc = function relationBetwenDocumentsFunc(uuid, uibModal, _service, _simple, _documentService, _getSrcFromType) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Desktop/relationBetwenDocuments.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, service, simple, documentService, getSrcFromType) {

                $scope.data = {
                    list: [],
                    selectedDocsForRel: {},
                    mainSearch: null,
                    relations: null,
                    relation: null,
                    itemsPagination: {
                        totalItems: -1,
                        range: 10,
                        currentPage: 1,
                        maxSize: 10,
                        perPage: 10,
                        offset: 0,
                        show: false,
                        pageChanged: function pageChanged() {
                            $scope.data.itemsPagination.offset = (parseInt($scope.data.itemsPagination.currentPage) - 1) * $scope.data.itemsPagination.perPage;
                            try {
                                $scope.func.startSearch();
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                };

                $scope.func = {};

                $scope.func.createDocRelation = function () {

                    if ($scope.data.relation == null) {
                        toaster.pop('error', '', 'لطفا یک رابطه انتخاب کنید');
                        return;
                    } else if (_.isEqual($scope.data.selectedDocsForRel, {})) {
                        toaster.pop('error', '', 'لطفا یک سند یا پوشه انتخاب کنید');
                        return;
                    } else {
                        var obj = {
                            selectedDocsForRel: _.clone($scope.data.selectedDocsForRel),
                            relDefType: $scope.data.relation
                        };
                        $scope.data = undefined;
                        $uibModalInstance.close(obj);
                    }
                };

                $scope.func.cancel = function () {
                    $scope.data = undefined;
                    $uibModalInstance.close(false);
                };

                $scope.func.searchResult = function (form) {
                    if (_.has(form.mainSearch, '$setTouched')) form.mainSearch.$setTouched();
                    if (form.$valid == true) {
                        $scope.func.resetPagination();
                        $scope.data.selectedDocsForRel = undefined;
                        $scope.data.selectedDocsForRel = {};
                        $scope.func.startSearch();
                    }
                };

                $scope.func.resetPagination = function () {
                    $scope.data.itemsPagination.offset = 0;
                    $scope.data.itemsPagination.currentPage = 1;
                };

                $scope.func.startSearch = function () {

                    try {
                        $scope.data.list = [];

                        simple.simple({
                            statement: $scope.data.mainSearch,
                            offset: $scope.data.itemsPagination.offset,
                            limit: $scope.data.itemsPagination.range,
                            isFuzzy: false
                        }).then(function () {
                            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                                var i, item;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                $scope.data.itemsPagination.totalItems = _.clone(res.data.total);

                                                if (!(res.data.list != null && res.data.total > 0)) {
                                                    _context.next = 21;
                                                    break;
                                                }

                                                i = 0;

                                            case 3:
                                                if (!(i < res.data.list.length)) {
                                                    _context.next = 18;
                                                    break;
                                                }

                                                item = null;

                                                if (_.has(res.data.list[i], 'document')) {

                                                    item = _.clone(res.data.list[i].document);
                                                    item.type = 'document';
                                                    item.name = _.last(_.remove(_.split(item.path, "/"), function (s) {
                                                        return s != "";
                                                    }));
                                                } else if (_.has(res.data.list[i], 'folder')) {
                                                    item = _.clone(res.data.list[i].folder);
                                                    item.type = 'folder';
                                                    item.name = _.last(_.remove(_.split(item.path, "/"), function (s) {
                                                        return s != "";
                                                    }));
                                                } else if (_.has(res.data.list[i], 'mail')) {
                                                    item = _.clone(res.data.list[i].mail);
                                                    item.type = 'mail';
                                                } else if (_.has(res.data.list[i], 'attachment')) {
                                                    item = _.clone(res.data.list[i].attachment);
                                                    item.type = 'attachment';
                                                }
                                                item.isSelected = typeof $scope.data.selectedDocsForRel[item.uuid] !== "undefined";
                                                _context.prev = 7;
                                                _context.next = 10;
                                                return $scope.func.add2List(_.clone(item));

                                            case 10:
                                                _context.next = 15;
                                                break;

                                            case 12:
                                                _context.prev = 12;
                                                _context.t0 = _context['catch'](7);

                                                console.error(_context.t0);

                                            case 15:
                                                i++;
                                                _context.next = 3;
                                                break;

                                            case 18:
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });
                                                _context.next = 22;
                                                break;

                                            case 21:
                                                toaster.pop('info', '', 'موردی جهت نمایش وجود ندارد');

                                            case 22:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this, [[7, 12]]);
                            }));

                            return function (_x) {
                                return _ref.apply(this, arguments);
                            };
                        }(), function (error) {
                            return toaster.pop('error', '', 'مشکل در دریافت اطلاعات از سرور.');
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.add2List = function (v) {
                    return new Promise(function (resolve, reject) {
                        try {
                            if (v.type == 'document') documentService.thumbnail(v, 0, 75).then(function (result) {
                                v.thumbnailSrc = "data:image/png;base64," + result.data;
                                $scope.data.list.push(_.clone(v));
                                resolve(true);
                            }, function (error) {
                                v.thumbnailSrc = getSrcFromType(v.mimeType) || null;
                                $scope.data.list.push(_.clone(v));
                                resolve(true);
                            });else {
                                v.thumbnailSrc = '/static/image/' + v.type + '.png';
                                $scope.data.list.push(_.clone(v));
                                resolve(true);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    });
                };

                $scope.func.changeSelecteds = function (item) {
                    try {
                        if (item.isSelected) $scope.data.selectedDocsForRel[item.uuid] = _.clone(item);else {
                            $scope.data.selectedDocsForRel[item.uuid] = undefined;
                            delete $scope.data.selectedDocsForRel[item.uuid];
                        }

                        _.defer(function () {
                            return $scope.$apply();
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.getRelationsList = function () {
                    return new Promise(function (resolve, reject) {
                        if ($scope.data.relations != null) resolve($scope.data.relations);else {
                            service.listDefinition().then(function (pgres) {
                                if (pgres.data != null) {
                                    $scope.data.relations = _.clone(pgres.data);
                                    resolve($scope.data.relations);
                                } else reject(null);
                            }, function (error) {
                                return reject(error);
                            });
                        }
                    });
                };
            },
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                service: function service() {
                    return _service;
                },
                simple: function simple() {
                    return _simple;
                },
                documentService: function documentService() {
                    return _documentService;
                },
                getSrcFromType: function getSrcFromType() {
                    return _getSrcFromType;
                }
            }
        });

        modalInstance.result.then(function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(response) {
                var id;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!response) {
                                    _context2.next = 24;
                                    break;
                                }

                                _context2.prev = 1;
                                _context2.t0 = regeneratorRuntime.keys(response.selectedDocsForRel);

                            case 3:
                                if ((_context2.t1 = _context2.t0()).done) {
                                    _context2.next = 15;
                                    break;
                                }

                                id = _context2.t1.value;
                                _context2.prev = 5;
                                _context2.next = 8;
                                return _service.create(uuid, id, response.relDefType.id);

                            case 8:
                                _context2.next = 13;
                                break;

                            case 10:
                                _context2.prev = 10;
                                _context2.t2 = _context2['catch'](5);

                                console.error(_context2.t2);

                            case 13:
                                _context2.next = 3;
                                break;

                            case 15:
                                resolve(true);
                                _context2.next = 22;
                                break;

                            case 18:
                                _context2.prev = 18;
                                _context2.t3 = _context2['catch'](1);

                                console.error(_context2.t3);
                                reject(false);

                            case 22:
                                _context2.next = 25;
                                break;

                            case 24:
                                reject(false);

                            case 25:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[1, 18], [5, 10]]);
            }));

            return function (_x2) {
                return _ref2.apply(this, arguments);
            };
        }(), function (error) {
            return reject(false);
        });
    });
};