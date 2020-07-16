'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addHistorySection2DesktopCtrl = function addHistorySection2DesktopCtrl($scope, desktopService, JSManagement, toaster, $uibModal) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.restoreVersion = function (version) {
                try {
                    if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.type == 'FILE' && $scope.data.selectedFileOrFolder.group != "trash") {
                        desktopService.document.restoreVersion($scope.data.selectedFileOrFolder.uuid, version.name).then(function () {
                            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                                var index;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                $scope.data.selectedFileOrFolder.actual = true;
                                                _.forEach($scope.data.docVersions, function (v) {
                                                    v.actual = String(v.name) == String(version.name);
                                                });
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });
                                                _context.next = 5;
                                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                            case 5:
                                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType,srcMimeType';
                                                index = _.findIndex($scope.data.list, function (doc) {
                                                    return doc.uuid == $scope.data.selectedFileOrFolder.uuid;
                                                });
                                                //let index = _.findIndex($scope.data.list,i=>i.uuid==$scope.data.selectedFileOrFolder.uuid);

                                                desktopService.document.thumbnail($scope.data.selectedFileOrFolder, 0, 75).then(function (result) {
                                                    $scope.data.list[index].thumbnailSrc = "data:image/png;base64," + result.data;
                                                    _.defer(function () {
                                                        return $scope.$apply();
                                                    });
                                                }, function (error) {
                                                    $scope.data.list[index].thumbnailSrc = getSrcFromType($scope.data.selectedFileOrFolder.mimeType);
                                                    _.defer(function () {
                                                        return $scope.$apply();
                                                    });
                                                });
                                                $scope.func.dbClickInDoc($scope.data.selectedFileOrFolder);

                                            case 9:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x) {
                                return _ref.apply(this, arguments);
                            };
                        }(), function (error) {
                            return toaster.pop('error', '', 'امکان بازنمایی نسخه کنونی نیست');
                        });
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.removeNotActiveHistory = function () {
                try {
                    if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.type == 'FILE' && $scope.data.selectedFileOrFolder.group != "trash") {
                        desktopService.document.purgeDocument($scope.data.selectedFileOrFolder.uuid).then(function (res) {
                            $scope.data.docVersions = _.filter($scope.data.docVersions, function (docVersion) {
                                return docVersion.actual == true;
                            });
                            toaster.pop('success', '', 'نسخه های غیر فعال با موفقیت حذف گردیدند.');
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        }, function (error) {
                            return toaster.pop('error', '', 'امکان حذف نسخه های غیر فعال وجود ندارد');
                        });
                    }
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.runHistory = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;

                                if (!($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.type == "FILE" && $scope.data.selectedFileOrFolder.group != "trash")) {
                                    _context3.next = 11;
                                    break;
                                }

                                _context3.next = 4;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                            case 4:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';
                                _context3.next = 7;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/intToFloatConvertor.js?dev=' + randomVersionName);

                            case 7:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/intToFloatConvertor.js?dev=' + randomVersionName] = 'intToFloatConvertor';
                                desktopService.document.listVersion($scope.data.selectedFileOrFolder.uuid).then(function (res) {
                                    if (res.data != null) {
                                        _.forEach(res.data, function () {
                                            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(version) {
                                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                    while (1) {
                                                        switch (_context2.prev = _context2.next) {
                                                            case 0:
                                                                _context2.next = 2;
                                                                return miladiToJalaliFunction(version.created);

                                                            case 2:
                                                                version.jalalidate = _context2.sent;

                                                                version.name = intToFloatConvertor(version.name);

                                                            case 4:
                                                            case 'end':
                                                                return _context2.stop();
                                                        }
                                                    }
                                                }, _callee2, _this);
                                            }));

                                            return function (_x2) {
                                                return _ref3.apply(this, arguments);
                                            };
                                        }());
                                        $scope.data.docVersions = _.clone(res.data);
                                    }
                                }, function (error) {

                                    toaster.pop('error', '', 'عدم امکان نمایش لیست ورژن');
                                });
                                _context3.next = 12;
                                break;

                            case 11:
                                $scope.data.docVersions = [];

                            case 12:
                                _context3.next = 17;
                                break;

                            case 14:
                                _context3.prev = 14;
                                _context3.t0 = _context3['catch'](0);

                                console.error(_context3.t0);

                            case 17:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this, [[0, 14]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};