'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var restoreDesktopCtrl = function restoreDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.restore = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                var _ret;

                return regeneratorRuntime.wrap(function _callee3$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length >= 1)) {
                                    _context4.next = 13;
                                    break;
                                }

                                _context4.prev = 1;
                                return _context4.delegateYield(regeneratorRuntime.mark(function _callee2() {
                                    var response, restoreItems, _loop, i, removeSelectedItem;

                                    return regeneratorRuntime.wrap(function _callee2$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    if (!(!_.has($scope.data.selectedItems[0], 'group') || $scope.data.selectedItems[0].group != "trash")) {
                                                        _context3.next = 3;
                                                        break;
                                                    }

                                                    toaster.pop('error', "", "آیتم های انتخاب شده حذف نشده است");
                                                    return _context3.abrupt('return', {
                                                        v: void 0
                                                    });

                                                case 3:
                                                    _context3.next = 5;
                                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/restoreCtrl.js?dev=' + randomVersionName);

                                                case 5:
                                                    _context3.next = 7;
                                                    return restoreCtrl($uibModal, //modal func
                                                    desktopService.repository, //repository service
                                                    'getRootFolder', // rootPath
                                                    desktopService.folder // folder service
                                                    );

                                                case 7:
                                                    response = _context3.sent;
                                                    _context3.next = 10;
                                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                                                case 10:
                                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';
                                                    restoreItems = {};
                                                    _loop = regeneratorRuntime.mark(function _loop(i) {
                                                        var isRestore, _ii, _id;

                                                        return regeneratorRuntime.wrap(function _loop$(_context2) {
                                                            while (1) {
                                                                switch (_context2.prev = _context2.next) {
                                                                    case 0:
                                                                        isRestore = getPermisionArray($scope.data.selectedItems[i].permissions);

                                                                        if (!($scope.data.selectedItems[i].type == "FOLDER")) {
                                                                            _context2.next = 20;
                                                                            break;
                                                                        }

                                                                        if (!isRestore[2]) {
                                                                            _context2.next = 17;
                                                                            break;
                                                                        }

                                                                        _context2.prev = 3;
                                                                        _context2.next = 6;
                                                                        return desktopService.folder.cut($scope.data.selectedItems[i].uuid, response.addNode.id);

                                                                    case 6:
                                                                        restoreItems[$scope.data.selectedItems[i].uuid] = i;

                                                                        if (!($scope.data.trees.trashTree.currentNode != null)) {
                                                                            _context2.next = 9;
                                                                            break;
                                                                        }

                                                                        return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
                                                                            var parentID, id, _parentID, index, ii;

                                                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                                                while (1) {
                                                                                    switch (_context.prev = _context.next) {
                                                                                        case 0:
                                                                                            parentID = $scope.data.trees.trashTree.currentNode.uuid;

                                                                                            if ($('li#' + $scope.data.selectedItems[i].uuid)) $('li#' + $scope.data.selectedItems[i].uuid).remove();
                                                                                            _context.next = 4;
                                                                                            return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName);

                                                                                        case 4:
                                                                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName] = 'removeFolderChildes';
                                                                                            _context.next = 7;
                                                                                            return removeFolderChildes($scope.data.pointers['trashVisible'], $scope.data.selectedItems[i].uuid);

                                                                                        case 7:
                                                                                            id = $scope.data.selectedItems[i].uuid;

                                                                                            if ($scope.data.trees.trashTree.currentNode != null) {
                                                                                                _parentID = $scope.data.trees.trashTree.currentNode.uuid;

                                                                                                if (_.has($scope.data.pointers['trashVisible'][_parentID], 'children') && _.isArray($scope.data.pointers['trashVisible'][_parentID].children)) {
                                                                                                    index = _.findIndex($scope.data.pointers['trashVisible'][_parentID].children, function (child) {
                                                                                                        return child.uuid == id;
                                                                                                    });

                                                                                                    if (index >= 0) $scope.data.pointers['trashVisible'][_parentID].children.splice(index, 1);
                                                                                                    if ($scope.data.pointers['trashVisible'][_parentID].children.length == 0) $scope.data.pointers['trashVisible'][_parentID].hasChildrenFolder = false;
                                                                                                }
                                                                                                $scope.data.pointers['trashVisible'][id] = null;
                                                                                                delete $scope.data.pointers['trashVisible'][id];
                                                                                            }
                                                                                            ii = _.findIndex($scope.data.list, function (item) {
                                                                                                return item.uuid == id;
                                                                                            });

                                                                                            if (ii >= 0) $scope.data.list.splice(ii, 1);

                                                                                        case 11:
                                                                                        case 'end':
                                                                                            return _context.stop();
                                                                                    }
                                                                                }
                                                                            }, _callee, _this);
                                                                        })(), 't0', 9);

                                                                    case 9:
                                                                        _context2.next = 15;
                                                                        break;

                                                                    case 11:
                                                                        _context2.prev = 11;
                                                                        _context2.t1 = _context2['catch'](3);

                                                                        console.error(_context2.t1);
                                                                        toaster.pop('error', "", ' امکان بازگرداندن پوشه' + $scope.data.selectedItems[i].name + ' وجود ندارد ');

                                                                    case 15:
                                                                        _context2.next = 18;
                                                                        break;

                                                                    case 17:
                                                                        toaster.pop('error', "", ' امکان بازگرداندن پوشه' + $scope.data.selectedItems[i].name + ' وجود ندارد ');

                                                                    case 18:
                                                                        _context2.next = 37;
                                                                        break;

                                                                    case 20:
                                                                        if (!isRestore[2]) {
                                                                            _context2.next = 36;
                                                                            break;
                                                                        }

                                                                        _context2.prev = 21;
                                                                        _context2.next = 24;
                                                                        return desktopService.folder.cut($scope.data.selectedItems[i].uuid, response.addNode.id);

                                                                    case 24:
                                                                        restoreItems[$scope.data.selectedItems[i].uuid] = i;
                                                                        _ii = _.findIndex($scope.data.list, function (item) {
                                                                            return item.uuid == $scope.data.selectedItems[i].uuid;
                                                                        });
                                                                        _id = $scope.data.selectedItems[i].uuid;

                                                                        $scope.data.list.splice(_ii, 1);
                                                                        _context2.next = 34;
                                                                        break;

                                                                    case 30:
                                                                        _context2.prev = 30;
                                                                        _context2.t2 = _context2['catch'](21);

                                                                        console.error(_context2.t2);
                                                                        toaster.pop('error', "", ' امکان بازگرداندن سند ' + $scope.data.selectedItems[i].name + ' وجود ندارد ');

                                                                    case 34:
                                                                        _context2.next = 37;
                                                                        break;

                                                                    case 36:
                                                                        toaster.pop('error', "", ' امکان بازگرداندن سند ' + $scope.data.selectedItems[i].name + ' وجود ندارد ');

                                                                    case 37:
                                                                    case 'end':
                                                                        return _context2.stop();
                                                                }
                                                            }
                                                        }, _loop, _this, [[3, 11], [21, 30]]);
                                                    });
                                                    i = 0;

                                                case 14:
                                                    if (!(i < $scope.data.selectedItems.length)) {
                                                        _context3.next = 19;
                                                        break;
                                                    }

                                                    return _context3.delegateYield(_loop(i), 't0', 16);

                                                case 16:
                                                    i++;
                                                    _context3.next = 14;
                                                    break;

                                                case 19:
                                                    removeSelectedItem = _.has(restoreItems, $scope.data.selectedFileOrFolder.uuid);

                                                    _.remove($scope.data.selectedItems, function (v, i) {
                                                        return _.includes(_.values(restoreItems), i);
                                                    });
                                                    if (removeSelectedItem) {
                                                        $scope.data.selectedFileOrFolder = $scope.data.trees.trashTree.currentNode;
                                                        _.defer(function () {
                                                            return $scope.$apply($scope.func.selectLeftNav());
                                                        });
                                                    }
                                                    _context3.next = 24;
                                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/restoreCtrl.js?dev=' + randomVersionName, 'restoreCtrl');

                                                case 24:
                                                case 'end':
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee2, _this);
                                })(), 't0', 3);

                            case 3:
                                _ret = _context4.t0;

                                if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                                    _context4.next = 6;
                                    break;
                                }

                                return _context4.abrupt('return', _ret.v);

                            case 6:
                                _context4.next = 11;
                                break;

                            case 8:
                                _context4.prev = 8;
                                _context4.t1 = _context4['catch'](1);

                                console.error(_context4.t1);

                            case 11:
                                _context4.next = 14;
                                break;

                            case 13:
                                toaster.pop('error', "", "لطفا حداقل یک سند یا پوشه انتخاب کنید");

                            case 14:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee3, _this, [[1, 8]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};