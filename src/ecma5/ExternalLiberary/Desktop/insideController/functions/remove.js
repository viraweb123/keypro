'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var removeDesktopCtrl = function removeDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.remove = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.prev = 0;

                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length >= 1)) {
                                    _context7.next = 15;
                                    break;
                                }

                                _context7.next = 4;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                            case 4:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';
                                _context7.next = 7;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/deleteSelectedFileAndFoldersDesktopCtrl.js?dev=' + randomVersionName);

                            case 7:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/deleteSelectedFileAndFoldersDesktopCtrl.js?dev=' + randomVersionName] = 'deleteSelectedFileAndFoldersDesktopCtrl';

                                if (!(_.has($scope.data.selectedItems[0], 'group') && $scope.data.selectedItems[0].group == "trash")) {
                                    _context7.next = 12;
                                    break;
                                }

                                return _context7.delegateYield(regeneratorRuntime.mark(function _callee2() {
                                    var response, removeItems, _loop, ind, removeSelectedItem;

                                    return regeneratorRuntime.wrap(function _callee2$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    _context3.next = 2;
                                                    return deleteSelectedFileAndFoldersDesktopCtrl($uibModal);

                                                case 2:
                                                    response = _context3.sent;
                                                    removeItems = {};
                                                    _loop = regeneratorRuntime.mark(function _loop(ind) {
                                                        var isRemove, _i;

                                                        return regeneratorRuntime.wrap(function _loop$(_context2) {
                                                            while (1) {
                                                                switch (_context2.prev = _context2.next) {
                                                                    case 0:
                                                                        isRemove = getPermisionArray($scope.data.selectedItems[ind].permissions);

                                                                        if (!($scope.data.selectedItems[ind].type == "FOLDER")) {
                                                                            _context2.next = 16;
                                                                            break;
                                                                        }

                                                                        if (!isRemove[1]) {
                                                                            _context2.next = 13;
                                                                            break;
                                                                        }

                                                                        _context2.prev = 3;
                                                                        return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
                                                                            var id, parentID, index, i;
                                                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                                                while (1) {
                                                                                    switch (_context.prev = _context.next) {
                                                                                        case 0:
                                                                                            _context.next = 2;
                                                                                            return desktopService.folder.purge($scope.data.selectedItems[ind].uuid);

                                                                                        case 2:
                                                                                            removeItems[$scope.data.selectedItems[ind].uuid] = ind;
                                                                                            if ($('li#' + $scope.data.selectedItems[ind].uuid)) $('li#' + $scope.data.selectedItems[ind].uuid).remove();
                                                                                            _context.next = 6;
                                                                                            return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName);

                                                                                        case 6:
                                                                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName] = 'removeFolderChildes';
                                                                                            _context.next = 9;
                                                                                            return removeFolderChildes($scope.data.pointers['trashVisible'], $scope.data.selectedItems[ind].uuid);

                                                                                        case 9:
                                                                                            id = $scope.data.selectedItems[ind].uuid;

                                                                                            if ($scope.data.trees.trashTree.currentNode != null) {
                                                                                                parentID = $scope.data.trees.trashTree.currentNode.uuid;

                                                                                                if (_.has($scope.data.pointers['trashVisible'][parentID], 'children') && _.isArray($scope.data.pointers['trashVisible'][parentID].children)) {
                                                                                                    index = _.findIndex($scope.data.pointers['trashVisible'][parentID].children, function (child) {
                                                                                                        return child.uuid == id;
                                                                                                    });

                                                                                                    if (index >= 0) $scope.data.pointers['trashVisible'][parentID].children.splice(index, 1);
                                                                                                    if ($scope.data.pointers['trashVisible'][parentID].children.length == 0) $scope.data.pointers['trashVisible'][parentID].hasChildrenFolder = false;
                                                                                                }
                                                                                                $scope.data.pointers['trashVisible'][id] = null;
                                                                                                delete $scope.data.pointers['trashVisible'][id];
                                                                                            }
                                                                                            i = _.findIndex($scope.data.list, function (item) {
                                                                                                return item.uuid == id;
                                                                                            });

                                                                                            if (i >= 0) $scope.data.list.splice(i, 1);

                                                                                        case 13:
                                                                                        case 'end':
                                                                                            return _context.stop();
                                                                                    }
                                                                                }
                                                                            }, _callee, _this);
                                                                        })(), 't0', 5);

                                                                    case 5:
                                                                        _context2.next = 11;
                                                                        break;

                                                                    case 7:
                                                                        _context2.prev = 7;
                                                                        _context2.t1 = _context2['catch'](3);

                                                                        console.error(_context2.t1);
                                                                        toaster.pop('error', "", ' امکان حذف پوشه' + $scope.data.selectedItems[ind].name + ' وجود ندارد. ');

                                                                    case 11:
                                                                        _context2.next = 14;
                                                                        break;

                                                                    case 13:
                                                                        toaster.pop('error', "", "شما مجوز حذف این پوشه را ندارید.");

                                                                    case 14:
                                                                        _context2.next = 32;
                                                                        break;

                                                                    case 16:
                                                                        if (!isRemove[1]) {
                                                                            _context2.next = 31;
                                                                            break;
                                                                        }

                                                                        _context2.prev = 17;
                                                                        _context2.next = 20;
                                                                        return desktopService.document.purgeDoc($scope.data.selectedItems[ind].uuid);

                                                                    case 20:
                                                                        removeItems[$scope.data.selectedItems[ind].uuid] = ind;
                                                                        _i = _.findIndex($scope.data.list, function (item) {
                                                                            return item.uuid == $scope.data.selectedItems[ind].uuid;
                                                                        });

                                                                        $scope.data.list.splice(_i, 1);
                                                                        _context2.next = 29;
                                                                        break;

                                                                    case 25:
                                                                        _context2.prev = 25;
                                                                        _context2.t2 = _context2['catch'](17);

                                                                        console.error(_context2.t2);
                                                                        toaster.pop('error', "", ' امکان حذف سند' + $scope.data.selectedItems[ind].name + ' وجود ندارد. ');

                                                                    case 29:
                                                                        _context2.next = 32;
                                                                        break;

                                                                    case 31:
                                                                        toaster.pop('error', "", "شما مجوز حذف این سند را ندارید.");

                                                                    case 32:
                                                                    case 'end':
                                                                        return _context2.stop();
                                                                }
                                                            }
                                                        }, _loop, _this, [[3, 7], [17, 25]]);
                                                    });
                                                    ind = 0;

                                                case 6:
                                                    if (!(ind < $scope.data.selectedItems.length)) {
                                                        _context3.next = 11;
                                                        break;
                                                    }

                                                    return _context3.delegateYield(_loop(ind), 't0', 8);

                                                case 8:
                                                    ind++;
                                                    _context3.next = 6;
                                                    break;

                                                case 11:
                                                    removeSelectedItem = _.has(removeItems, $scope.data.selectedFileOrFolder.uuid);

                                                    _.remove($scope.data.selectedItems, function (v, i) {
                                                        return _.includes(_.values(removeItems), i);
                                                    });
                                                    if (removeSelectedItem) {
                                                        $scope.data.selectedFileOrFolder = $scope.data.trees.taxonomyTree.currentNode;
                                                        _.defer(function () {
                                                            return $scope.$apply($scope.func.selectLeftNav());
                                                        });
                                                    }

                                                case 14:
                                                case 'end':
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee2, _this);
                                })(), 't0', 10);

                            case 10:
                                _context7.next = 13;
                                break;

                            case 12:
                                return _context7.delegateYield(regeneratorRuntime.mark(function _callee4() {
                                    var response, removeItems, _loop2, ind, removeSelectedItem;

                                    return regeneratorRuntime.wrap(function _callee4$(_context6) {
                                        while (1) {
                                            switch (_context6.prev = _context6.next) {
                                                case 0:
                                                    _context6.next = 2;
                                                    return deleteSelectedFileAndFoldersDesktopCtrl($uibModal);

                                                case 2:
                                                    response = _context6.sent;
                                                    removeItems = {};
                                                    _loop2 = regeneratorRuntime.mark(function _loop2(ind) {
                                                        var isRemove, _i2;

                                                        return regeneratorRuntime.wrap(function _loop2$(_context5) {
                                                            while (1) {
                                                                switch (_context5.prev = _context5.next) {
                                                                    case 0:
                                                                        isRemove = getPermisionArray($scope.data.selectedItems[ind].permissions);
                                                                        //TODO remove folder

                                                                        if (!($scope.data.selectedItems[ind].type == "FOLDER")) {
                                                                            _context5.next = 16;
                                                                            break;
                                                                        }

                                                                        if (!isRemove[1]) {
                                                                            _context5.next = 13;
                                                                            break;
                                                                        }

                                                                        _context5.prev = 3;
                                                                        return _context5.delegateYield(regeneratorRuntime.mark(function _callee3() {
                                                                            var id, parentID, index, i;
                                                                            return regeneratorRuntime.wrap(function _callee3$(_context4) {
                                                                                while (1) {
                                                                                    switch (_context4.prev = _context4.next) {
                                                                                        case 0:
                                                                                            _context4.next = 2;
                                                                                            return desktopService.folder.remove($scope.data.selectedItems[ind].uuid);

                                                                                        case 2:
                                                                                            //TODO add remove item from selected items
                                                                                            removeItems[$scope.data.selectedItems[ind].uuid] = ind;
                                                                                            if ($('li#' + $scope.data.selectedItems[ind].uuid)) $('li#' + $scope.data.selectedItems[ind].uuid).remove();
                                                                                            _context4.next = 6;
                                                                                            return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName);

                                                                                        case 6:
                                                                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName] = 'removeFolderChildes';
                                                                                            _context4.next = 9;
                                                                                            return removeFolderChildes($scope.data.pointers['taxonomyVisible'], $scope.data.selectedItems[ind].uuid);

                                                                                        case 9:
                                                                                            id = $scope.data.selectedItems[ind].uuid;

                                                                                            if ($scope.data.trees.taxonomyTree.currentNode != null) {
                                                                                                parentID = $scope.data.trees.taxonomyTree.currentNode.uuid;

                                                                                                if (_.has($scope.data.pointers['taxonomyVisible'][parentID], 'children') && _.isArray($scope.data.pointers['taxonomyVisible'][parentID].children)) {
                                                                                                    index = _.findIndex($scope.data.pointers['taxonomyVisible'][parentID].children, function (child) {
                                                                                                        return child.uuid == id;
                                                                                                    });

                                                                                                    if (index >= 0) $scope.data.pointers['taxonomyVisible'][parentID].children.splice(index, 1);
                                                                                                    if ($scope.data.pointers['taxonomyVisible'][parentID].children.length == 0) $scope.data.pointers['taxonomyVisible'][parentID].hasChildrenFolder = false;
                                                                                                }
                                                                                                $scope.data.pointers['taxonomyVisible'][id] = null;
                                                                                                delete $scope.data.pointers['taxonomyVisible'][id];
                                                                                            }
                                                                                            i = _.findIndex($scope.data.list, function (item) {
                                                                                                return item.uuid == id;
                                                                                            });

                                                                                            if (i >= 0) $scope.data.list.splice(i, 1);

                                                                                        case 13:
                                                                                        case 'end':
                                                                                            return _context4.stop();
                                                                                    }
                                                                                }
                                                                            }, _callee3, _this);
                                                                        })(), 't0', 5);

                                                                    case 5:
                                                                        _context5.next = 11;
                                                                        break;

                                                                    case 7:
                                                                        _context5.prev = 7;
                                                                        _context5.t1 = _context5['catch'](3);

                                                                        console.error(_context5.t1);
                                                                        toaster.pop('error', "", ' امکان حذف پوشه' + $scope.data.selectedItems[ind].name + ' وجود ندارد. ');

                                                                    case 11:
                                                                        _context5.next = 14;
                                                                        break;

                                                                    case 13:
                                                                        toaster.pop('error', "", "شما مجوز حذف این پوشه را ندارید.");

                                                                    case 14:
                                                                        _context5.next = 32;
                                                                        break;

                                                                    case 16:
                                                                        if (!isRemove[1]) {
                                                                            _context5.next = 31;
                                                                            break;
                                                                        }

                                                                        _context5.prev = 17;
                                                                        _context5.next = 20;
                                                                        return desktopService.document.remove($scope.data.selectedItems[ind].uuid);

                                                                    case 20:
                                                                        removeItems[$scope.data.selectedItems[ind].uuid] = ind;
                                                                        _i2 = _.findIndex($scope.data.list, function (item) {
                                                                            return item.uuid == $scope.data.selectedItems[ind].uuid;
                                                                        });

                                                                        $scope.data.list.splice(_i2, 1);
                                                                        _context5.next = 29;
                                                                        break;

                                                                    case 25:
                                                                        _context5.prev = 25;
                                                                        _context5.t2 = _context5['catch'](17);

                                                                        console.error(_context5.t2);
                                                                        toaster.pop('error', "", ' امکان حذف سند' + $scope.data.selectedItems[ind].name + ' وجود ندارد. ');

                                                                    case 29:
                                                                        _context5.next = 32;
                                                                        break;

                                                                    case 31:
                                                                        toaster.pop('error', "", "شما مجوز حذف این سند را ندارید.");

                                                                    case 32:
                                                                    case 'end':
                                                                        return _context5.stop();
                                                                }
                                                            }
                                                        }, _loop2, _this, [[3, 7], [17, 25]]);
                                                    });
                                                    ind = 0;

                                                case 6:
                                                    if (!(ind < $scope.data.selectedItems.length)) {
                                                        _context6.next = 11;
                                                        break;
                                                    }

                                                    return _context6.delegateYield(_loop2(ind), 't0', 8);

                                                case 8:
                                                    ind++;
                                                    _context6.next = 6;
                                                    break;

                                                case 11:
                                                    removeSelectedItem = _.has(removeItems, $scope.data.selectedFileOrFolder.uuid);

                                                    _.remove($scope.data.selectedItems, function (v, i) {
                                                        return _.includes(_.values(removeItems), i);
                                                    });
                                                    if (removeSelectedItem) {
                                                        $scope.data.selectedFileOrFolder = $scope.data.trees.taxonomyTree.currentNode;
                                                        _.defer(function () {
                                                            return $scope.$apply($scope.func.selectLeftNav());
                                                        });
                                                    }

                                                case 14:
                                                case 'end':
                                                    return _context6.stop();
                                            }
                                        }
                                    }, _callee4, _this);
                                })(), 't1', 13);

                            case 13:
                                _context7.next = 16;
                                break;

                            case 15:
                                toaster.pop('error', "", "لطفا حداقل یک سند یا پوشه انتخاب کنید");

                            case 16:
                                _context7.next = 21;
                                break;

                            case 18:
                                _context7.prev = 18;
                                _context7.t2 = _context7['catch'](0);

                                console.error(_context7.t2);

                            case 21:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee5, _this, [[0, 18]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};