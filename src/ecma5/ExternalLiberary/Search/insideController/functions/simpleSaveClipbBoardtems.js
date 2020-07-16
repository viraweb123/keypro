"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var simpleSaveClipbBoardtemsSimpleCtrl = function simpleSaveClipbBoardtemsSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.simpleSaveClipbBoardtems = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(item) {
                    var list, i, isCopy, type;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!($scope.data.selectedClipBoardStorage != null)) {
                                        _context.next = 73;
                                        break;
                                    }

                                    _context.prev = 2;

                                    if (!_.has($scope.data.selectedClipBoardStorage, item.uuid)) {
                                        _context.next = 7;
                                        break;
                                    }

                                    toaster.pop("error", "", " پوشه  " + item.name + " در حافظه موقت وجود دارد. ");
                                    _context.next = 66;
                                    break;

                                case 7:
                                    _context.next = 9;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                                case 9:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';

                                    //send all copy to server
                                    list = _.filter($scope.data.selectedClipBoardStorage, function (v, key) {
                                        return key != "TYPE";
                                    });
                                    i = 0;

                                case 12:
                                    if (!(i < list.length)) {
                                        _context.next = 48;
                                        break;
                                    }

                                    isCopy = getPermisionArray(list[i].permissions);

                                    if (!(list[i].type == 'folder')) {
                                        _context.next = 31;
                                        break;
                                    }

                                    if (!isCopy[2]) {
                                        _context.next = 28;
                                        break;
                                    }

                                    _context.prev = 16;
                                    _context.next = 19;
                                    return simpleService.folder[_.toLower($scope.data.selectedClipBoardStorage.TYPE)](list[i].uuid, item.uuid);

                                case 19:
                                    $scope.data.selectedClipBoardStorage[list[i].uuid] = undefined;
                                    delete $scope.data.selectedClipBoardStorage[list[i].uuid];
                                    _context.next = 26;
                                    break;

                                case 23:
                                    _context.prev = 23;
                                    _context.t0 = _context["catch"](16);

                                    toaster.pop('warning', "", " امکان کپی از پوشه " + list[i].name + " وجود ندارد. ");

                                case 26:
                                    _context.next = 29;
                                    break;

                                case 28:
                                    toaster.pop('warning', "", " امکان کپی از پوشه " + list[i].name + " وجود ندارد. ");

                                case 29:
                                    _context.next = 45;
                                    break;

                                case 31:
                                    if (!isCopy[2]) {
                                        _context.next = 44;
                                        break;
                                    }

                                    _context.prev = 32;
                                    _context.next = 35;
                                    return simpleService.document[_.toLower($scope.data.selectedClipBoardStorage.TYPE)](list[i].uuid, item.uuid);

                                case 35:
                                    $scope.data.selectedClipBoardStorage[list[i].uuid] = undefined;
                                    delete $scope.data.selectedClipBoardStorage[list[i].uuid];
                                    _context.next = 42;
                                    break;

                                case 39:
                                    _context.prev = 39;
                                    _context.t1 = _context["catch"](32);

                                    toaster.pop('warning', "", " امکان کپی از سند " + list[i].name + " وجود ندارد. ");

                                case 42:
                                    _context.next = 45;
                                    break;

                                case 44:
                                    toaster.pop('warning', "", " امکان کپی از سند" + list[i].name + " وجود ندارد. ");

                                case 45:
                                    i++;
                                    _context.next = 12;
                                    break;

                                case 48:

                                    list = undefined;

                                    type = angular.copy($scope.data.selectedClipBoardStorage.TYPE);


                                    $scope.data.selectedClipBoardStorage.TYPE = undefined;
                                    delete $scope.data.selectedClipBoardStorage.TYPE;

                                    if (!_.isEqual($scope.data.selectedClipBoardStorage, {})) {
                                        _context.next = 57;
                                        break;
                                    }

                                    $scope.data.selectedClipBoardStorage = null;
                                    $scope.func.hiddenClipboardResultList();
                                    _context.next = 66;
                                    break;

                                case 57:
                                    _context.prev = 57;

                                    $scope.data.selectedClipBoardStorage.TYPE = type;
                                    _context.next = 61;
                                    return setSelectedLocalStorage(_.clone($scope.data.selectedClipBoardStorage), 'clipBoardResults');

                                case 61:
                                    _context.next = 66;
                                    break;

                                case 63:
                                    _context.prev = 63;
                                    _context.t2 = _context["catch"](57);

                                    console.error(_context.t2);

                                case 66:
                                    _context.next = 71;
                                    break;

                                case 68:
                                    _context.prev = 68;
                                    _context.t3 = _context["catch"](2);

                                    console.error(_context.t3);

                                case 71:
                                    _context.next = 74;
                                    break;

                                case 73:
                                    toaster.pop("error", "", "آیتمی در حافظه موقت نیست.");

                                case 74:
                                    _context.next = 79;
                                    break;

                                case 76:
                                    _context.prev = 76;
                                    _context.t4 = _context["catch"](0);

                                    console.error(_context.t4);

                                case 79:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 76], [2, 68], [16, 23], [32, 39], [57, 63]]);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }();
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};