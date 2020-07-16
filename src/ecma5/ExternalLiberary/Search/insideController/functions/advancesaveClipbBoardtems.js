"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advancesaveClipbBoardtemsAdvanceCtrl = function advancesaveClipbBoardtemsAdvanceCtrl($scope, advanceService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.advancesaveClipbBoardtems = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(item) {
                    var list, i, isCopy, type;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.prev = 1;

                                    if (!($scope.data.selectedClipBoardStorage != null)) {
                                        _context.next = 74;
                                        break;
                                    }

                                    _context.prev = 3;

                                    if (!_.has($scope.data.selectedClipBoardStorage, item.uuid)) {
                                        _context.next = 8;
                                        break;
                                    }

                                    toaster.pop("error", "", " پوشه  " + item.name + " در حافظه موقت وجود دارد. ");
                                    _context.next = 67;
                                    break;

                                case 8:
                                    _context.next = 10;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                                case 10:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';

                                    //send all copy to server
                                    list = _.filter($scope.data.selectedClipBoardStorage, function (v, key) {
                                        return key != "TYPE";
                                    });
                                    i = 0;

                                case 13:
                                    if (!(i < list.length)) {
                                        _context.next = 49;
                                        break;
                                    }

                                    isCopy = getPermisionArray(list[i].permissions);

                                    if (!(list[i].type == 'folder')) {
                                        _context.next = 32;
                                        break;
                                    }

                                    if (!isCopy[2]) {
                                        _context.next = 29;
                                        break;
                                    }

                                    _context.prev = 17;
                                    _context.next = 20;
                                    return advanceService.folder[_.toLower($scope.data.selectedClipBoardStorage.TYPE)](list[i].uuid, item.uuid);

                                case 20:
                                    $scope.data.selectedClipBoardStorage[list[i].uuid] = undefined;
                                    delete $scope.data.selectedClipBoardStorage[list[i].uuid];
                                    _context.next = 27;
                                    break;

                                case 24:
                                    _context.prev = 24;
                                    _context.t0 = _context["catch"](17);

                                    toaster.pop('warning', "", " امکان کپی از پوشه " + list[i].name + " وجود ندارد. ");

                                case 27:
                                    _context.next = 30;
                                    break;

                                case 29:
                                    toaster.pop('warning', "", " امکان کپی از پوشه " + list[i].name + " وجود ندارد. ");

                                case 30:
                                    _context.next = 46;
                                    break;

                                case 32:
                                    if (!isCopy[2]) {
                                        _context.next = 45;
                                        break;
                                    }

                                    _context.prev = 33;
                                    _context.next = 36;
                                    return advanceService.document[_.toLower($scope.data.selectedClipBoardStorage.TYPE)](list[i].uuid, item.uuid);

                                case 36:
                                    $scope.data.selectedClipBoardStorage[list[i].uuid] = undefined;
                                    delete $scope.data.selectedClipBoardStorage[list[i].uuid];
                                    _context.next = 43;
                                    break;

                                case 40:
                                    _context.prev = 40;
                                    _context.t1 = _context["catch"](33);

                                    toaster.pop('warning', "", " امکان کپی از سند " + list[i].name + " وجود ندارد. ");

                                case 43:
                                    _context.next = 46;
                                    break;

                                case 45:
                                    toaster.pop('warning', "", " امکان کپی از سند" + list[i].name + " وجود ندارد. ");

                                case 46:
                                    i++;
                                    _context.next = 13;
                                    break;

                                case 49:

                                    list = undefined;

                                    type = angular.copy($scope.data.selectedClipBoardStorage.TYPE);


                                    $scope.data.selectedClipBoardStorage.TYPE = undefined;
                                    delete $scope.data.selectedClipBoardStorage.TYPE;

                                    if (!_.isEqual($scope.data.selectedClipBoardStorage, {})) {
                                        _context.next = 58;
                                        break;
                                    }

                                    $scope.data.selectedClipBoardStorage = null;
                                    $scope.func.hiddenClipboardResultList();
                                    _context.next = 67;
                                    break;

                                case 58:
                                    _context.prev = 58;

                                    $scope.data.selectedClipBoardStorage.TYPE = type;
                                    _context.next = 62;
                                    return setSelectedLocalStorage(_.clone($scope.data.selectedClipBoardStorage), 'clipBoardResults');

                                case 62:
                                    _context.next = 67;
                                    break;

                                case 64:
                                    _context.prev = 64;
                                    _context.t2 = _context["catch"](58);

                                    console.error(_context.t2);

                                case 67:
                                    _context.next = 72;
                                    break;

                                case 69:
                                    _context.prev = 69;
                                    _context.t3 = _context["catch"](3);

                                    console.error(_context.t3);

                                case 72:
                                    _context.next = 75;
                                    break;

                                case 74:
                                    toaster.pop("error", "", "آیتمی در حافظه موقت نیست.");

                                case 75:
                                    _context.next = 80;
                                    break;

                                case 77:
                                    _context.prev = 77;
                                    _context.t4 = _context["catch"](1);

                                    console.error(_context.t4);

                                case 80:
                                    _context.next = 85;
                                    break;

                                case 82:
                                    _context.prev = 82;
                                    _context.t5 = _context["catch"](0);

                                    rejection();

                                case 85:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 82], [1, 77], [3, 69], [17, 24], [33, 40], [58, 64]]);
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