'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addRelationSection2DesktopCtrl = function addRelationSection2DesktopCtrl($scope, desktopService, JSManagement, toaster, $uibModal) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.relationChangePath = function (doc) {
                try {
                    console.log(doc);
                    //var destDOC = (_.has(doc , 'reverse') && doc.reverse == true) ? angular.copy(doc.source) : angular.copy(doc.dest);
                    var destDOC = angular.copy(doc.dest);
                    $scope.func.generateAbstractPath(destDOC.path, destDOC);
                } catch (e) {
                    console.error(e || e.message);
                }
            };
            $scope.func.removeRelation = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(item, index, relation) {
                    var relationIndex, response, sourceID, destID;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    relationIndex = _.findIndex($scope.data.relations, function (r) {
                                        return r.tabs == relation.tabs;
                                    });
                                    _context.prev = 1;
                                    _context.next = 4;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/deleteRelationDesktopCtrl.js?dev=' + randomVersionName);

                                case 4:
                                    _context.next = 6;
                                    return deleteRelationDesktopCtrl($uibModal);

                                case 6:
                                    response = _context.sent;
                                    sourceID = item.reverse ? item.dest.uuid : item.source.uuid;
                                    destID = item.reverse ? item.source.uuid : item.dest.uuid;

                                    if (!response) {
                                        _context.next = 15;
                                        break;
                                    }

                                    _context.next = 12;
                                    return desktopService.relation.remove(sourceID, //item.source.uuid,
                                    destID, //item.dest.uuid,
                                    item.relationDefinition.id);

                                case 12:
                                    toaster.pop('success', '', 'رابطه با موفقیت حذف شد');
                                    //$scope.relation.items.splice(_.findIndex($scope.relation.items,t=>t.id == item.id),1);
                                    $scope.data.relations[relationIndex].items.splice(index, 1);

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 15:
                                    _context.next = 17;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/deleteRelation.js?dev=' + randomVersionName, 'deleteRelationDesktopCtrl');

                                case 17:
                                    _context.next = 25;
                                    break;

                                case 19:
                                    _context.prev = 19;
                                    _context.t0 = _context['catch'](1);

                                    toaster.pop('error', '', 'مشکلی در حذف رابطه ایجاد شده است.');
                                    console.error(_context.t0);
                                    _context.next = 25;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/deleteRelation.js?dev=' + randomVersionName, 'deleteRelationDesktopCtrl');

                                case 25:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[1, 19]]);
                }));

                return function (_x, _x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            }();
            $scope.func.relationTitle = function (reltion, index) {};

            $scope.func.runRelation = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                try {

                                    if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash") {
                                        desktopService.relation.ListRelation($scope.data.selectedFileOrFolder.uuid, 1).then(function () {
                                            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(res) {
                                                var i, temp;
                                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                    while (1) {
                                                        switch (_context2.prev = _context2.next) {
                                                            case 0:
                                                                if (!(res.data != null)) {
                                                                    _context2.next = 28;
                                                                    break;
                                                                }

                                                                _context2.next = 3;
                                                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                                            case 3:
                                                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType';

                                                                _context2.next = 6;
                                                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                                            case 6:
                                                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';

                                                                i = 0;

                                                            case 8:
                                                                if (!(i < res.data.length)) {
                                                                    _context2.next = 25;
                                                                    break;
                                                                }

                                                                res.data[i].reverse = false;
                                                                if (res.data[i].dest.uuid == $scope.data.selectedFileOrFolder.uuid) {
                                                                    temp = angular.copy(res.data[i].source);

                                                                    res.data[i].source = angular.copy(res.data[i].dest);
                                                                    res.data[i].dest = angular.copy(temp);
                                                                    res.data[i].reverse = true;
                                                                    temp = undefined;
                                                                }

                                                                res.data[i].dest.name = getNameFromPath(res.data[i].dest.path);
                                                                res.data[i].dest.thumbnailSrc = getSrcFromType(res.data[i].source.mimeType);

                                                                _context2.prev = 13;
                                                                _context2.next = 16;
                                                                return function (file, getSrcFromType) {
                                                                    return new Promise(function (resolve, reject) {
                                                                        try {
                                                                            desktopService.document.thumbnail(file.dest, 0, 75).then(function (result) {
                                                                                return resolve("data:image/png;base64," + result.data);
                                                                            }, function (error) {
                                                                                return resolve(getSrcFromType(file.source.mimeType));
                                                                            });
                                                                        } catch (e) {
                                                                            console.error(e);
                                                                            resolve(getSrcFromType(file.source.mimeType));
                                                                        }
                                                                    });
                                                                }(res.data[i], getSrcFromType);

                                                            case 16:
                                                                res.data[i].dest.thumbnailSrc = _context2.sent;
                                                                _context2.next = 22;
                                                                break;

                                                            case 19:
                                                                _context2.prev = 19;
                                                                _context2.t0 = _context2['catch'](13);

                                                                res.data[i].dest.thumbnailSrc = getSrcFromType(file.source.mimeType);

                                                            case 22:
                                                                i++;
                                                                _context2.next = 8;
                                                                break;

                                                            case 25:

                                                                $scope.data.relations = _.chain(res.data).groupBy('relationDefinition.title').toPairs().map(function (item) {
                                                                    return _.zipObject(["tabs", "items"], item);
                                                                }).value();

                                                                _context2.next = 29;
                                                                break;

                                                            case 28:
                                                                $scope.data.relations = [];

                                                            case 29:
                                                            case 'end':
                                                                return _context2.stop();
                                                        }
                                                    }
                                                }, _callee2, _this, [[13, 19]]);
                                            }));

                                            return function (_x4) {
                                                return _ref3.apply(this, arguments);
                                            };
                                        }(), function (error) {
                                            $scope.data.relations = [];
                                            toaster.pop('error', '', 'عدم دریافت لیست روابط');
                                        });
                                    }
                                } catch (e) {
                                    console.error(e);
                                }

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};