'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addIdentifySection2DesktopCtrl = function addIdentifySection2DesktopCtrl($scope, desktopService, JSManagement, toaster, $uibModal) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            /** TODO ------------------------- identifyVisible  functions ---------------------------------- **/

            $scope.func.changeMetaData = function () {
                try {
                    if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash") {
                        if ($scope.data.selectMetadata != null) {
                            $scope.data.PropertyGroup = null;
                            desktopService.propertyGroup.getGroups($scope.data.selectedFileOrFolder.path, $scope.data.selectMetadata).then(function (resIn) {
                                resIn.data.isSaved = false;
                                resIn.data.isMetaData = true;
                                resIn.data.type = 'FOLDER';
                                $scope.data.PropertyGroup = _.clone(resIn.data);
                                if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(angular.copy($scope.data.PropertyGroup.properties), { service: desktopService, require: true });
                            }, function (error) {
                                return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                            });
                        } else if ($scope.data.PropertyGroup != null) {
                            $scope.func.metadata.remove();
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.getMetadataList = function () {
                return new Promise(function (resolve, reject) {
                    if ($scope.data.metadatas != null) resolve($scope.data.metadatas);else {
                        desktopService.propertyGroup.list().then(function (pgres) {
                            if (pgres.data != null) {
                                _.forEach(pgres.data, function (pg) {
                                    return pg.isSaved = true;
                                });
                                $scope.data.metadatas = _.clone(pgres.data);
                                resolve($scope.data.metadatas);
                            }
                        }, function (error) {
                            return reject(error);
                        });
                    }
                });
            };

            /** TODO ------------------------- dragable Parent Metadata  functions ------------------------- **/

            $scope.func.hiddenSaved2Clipboard = function () {
                $scope.data.showClipboardFolder = false;
                _.defer(function () {
                    return $scope.$apply();
                });
            };
            $scope.func.showSaved2Clipboard = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                $scope.data.showClipboardFolder = true;
                                try {
                                    $("#clipBoardMetaDataSaved").draggable({ "axis": "x", "containment": "body" });
                                } catch (e) {
                                    console.error(e);
                                }

                                if (!($scope.data.PropertyGroupParent == null)) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.next = 6;
                                return $scope.func.getMetadataList();

                            case 6:
                                if (_.isFunction($scope.externalScopeParent.InitializationForm)) $scope.externalScopeParent.InitializationForm(null, {});
                                desktopService.propertyGroup.listGroup($scope.data.clipboardFolder.path).then(function (res) {
                                    if (!_.includes([null, ""], res.data.list)) {
                                        var index = _.findIndex($scope.data.metadatas, function (metadata) {
                                            return metadata.name == res.data.list[0].name;
                                        });
                                        $scope.data.selectMetadataParent = $scope.data.metadatas[index];
                                        desktopService.propertyGroup.getGroups($scope.data.clipboardFolder.path, $scope.data.selectMetadataParent).then(function (resIn) {

                                            resIn.data.isMetaData = true;
                                            resIn.data.type = 'FOLDER';
                                            $scope.data.PropertyGroupParent = _.clone(resIn.data);
                                            if (_.isFunction($scope.externalScopeParent.InitializationForm)) $scope.externalScopeParent.InitializationForm(angular.copy($scope.data.PropertyGroupParent.properties), { service: desktopService, require: true });
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        }, function (error) {
                                            return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                        });
                                    }
                                }, function (error) {
                                    return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                });

                            case 8:
                                _context.next = 13;
                                break;

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](0);

                                console.error(_context.t0);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 10]]);
            }));
            $scope.func.removeSaved2Clipboard = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.prev = 1;
                                _context2.next = 4;
                                return removeSelectedLocalStorage('selectedMetadataState');

                            case 4:
                                $scope.data.clipboardFolder = null;
                                $scope.data.showClipboardFolder = false;
                                $scope.data.PropertyGroupParent = null;
                                _context2.next = 12;
                                break;

                            case 9:
                                _context2.prev = 9;
                                _context2.t0 = _context2['catch'](1);

                                console.error(_context2.t0);

                            case 12:
                                toaster.pop('success', '', 'فراداده با موفقیت از حافظه موقت حذف گردید');
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                _context2.next = 19;
                                break;

                            case 16:
                                _context2.prev = 16;
                                _context2.t1 = _context2['catch'](0);

                                console.error(_context2.t1);

                            case 19:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[0, 16], [1, 9]]);
            }));
            $scope.func.saved2Clipboard = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;

                                if (!($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.type == "FOLDER")) {
                                    _context3.next = 18;
                                    break;
                                }

                                $scope.data.clipboardFolder = null;
                                $scope.data.showClipboardFolder = false;
                                $scope.data.clipboardFolderPushed = false;
                                $scope.data.PropertyGroupParent = null;
                                $scope.data.clipboardFolder = {
                                    uuid: _.clone($scope.data.selectedFileOrFolder.uuid),
                                    path: _.clone($scope.data.selectedFileOrFolder.path),
                                    group: _.clone($scope.data.selectedFileOrFolder.group),
                                    label: _.clone($scope.data.selectedFileOrFolder.label)
                                };

                                //await JS.addJS(`ecma5/ExternalLiberary/Public/localStorageManagement.js?dev=${randomVersionName}`);
                                //$scope.data.removeExternalFuncs[`ecma5/ExternalLiberary/Public/localStorageManagement.js?dev=${randomVersionName}`] = 'setSelectedLocalStorage,getSelectedLocalStorage,removeSelectedLocalStorage';
                                _context3.prev = 7;
                                _context3.next = 10;
                                return setSelectedLocalStorage(_.clone($scope.data.clipboardFolder), 'selectedMetadataState');

                            case 10:
                                _context3.next = 15;
                                break;

                            case 12:
                                _context3.prev = 12;
                                _context3.t0 = _context3['catch'](7);

                                console.error(_context3.t0);

                            case 15:

                                toaster.pop('success', '', 'فراداده در حافظه موقت ذخیره گردید');
                                _context3.next = 19;
                                break;

                            case 18:
                                toaster.pop('error', '', 'لطفا یک پوشه انتخاب کنید');

                            case 19:
                                _context3.next = 25;
                                break;

                            case 21:
                                _context3.prev = 21;
                                _context3.t1 = _context3['catch'](0);

                                toaster.pop('error', '', 'لطفا یک پوشه انتخاب کنید');
                                console.error(_context3.t1);

                            case 25:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this, [[0, 21], [7, 12]]);
            }));
            $scope.func.pinToLocation = function () {
                try {
                    $scope.data.clipboardFolderPushed = !$scope.data.clipboardFolderPushed;
                    try {
                        $("#clipBoardMetaDataSaved").draggable($scope.data.clipboardFolderPushed ? 'disable' : 'enable');
                    } catch (e) {
                        console.error(e);
                    }
                    _.defer(function () {
                        return $scope.$apply();
                    });
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.runIdentify = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                $scope.data.selectMetadata = null;
                                _context4.prev = 1;

                                if (!($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash")) {
                                    _context4.next = 12;
                                    break;
                                }

                                if (!($scope.data.selectedFileOrFolder.type == 'FILE' && $scope.data.profile.PropertyGroupOnlyForFolders)) {
                                    _context4.next = 7;
                                    break;
                                }

                                toaster.pop("error", "", 'شما مجوز افزودن فراداده به سند ها را ندارید.');
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                return _context4.abrupt('return');

                            case 7:
                                _context4.next = 9;
                                return $scope.func.getMetadataList();

                            case 9:
                                $scope.data.PropertyGroup = null;
                                if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(angular.copy($scope.data.PropertyGroup), {});
                                desktopService.propertyGroup.listGroup($scope.data.selectedFileOrFolder.path).then(function (res) {
                                    if (!_.includes([null, ""], res.data.list)) {
                                        var index = _.findIndex($scope.data.metadatas, function (metadata) {
                                            return metadata.name == res.data.list[0].name;
                                        });
                                        $scope.data.selectMetadata = $scope.data.metadatas[index];
                                        desktopService.propertyGroup.getGroups($scope.data.selectedFileOrFolder.path, $scope.data.selectMetadata).then(function (resIn) {
                                            resIn.data.isMetaData = true;
                                            resIn.data.type = 'FOLDER';
                                            $scope.data.PropertyGroup = _.clone(resIn.data);
                                            if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(angular.copy($scope.data.PropertyGroup.properties), { service: desktopService, require: true });
                                        }, function (error) {
                                            return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                        });
                                    }
                                }, function (error) {
                                    return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                });

                            case 12:
                                _context4.next = 17;
                                break;

                            case 14:
                                _context4.prev = 14;
                                _context4.t0 = _context4['catch'](1);

                                console.error(_context4.t0);

                            case 17:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this, [[1, 14]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};