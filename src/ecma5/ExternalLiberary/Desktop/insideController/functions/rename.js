"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var renameDesktopCtrl = function renameDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.rename = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var isRename, banlist, oldName, treeGroup, type, _oldName;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length == 1)) {
                                    _context.next = 45;
                                    break;
                                }

                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context.next = 6;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان تغییر نام سند های داخل سطل زباله وجود ندارد");
                                _context.next = 43;
                                break;

                            case 6:
                                _context.next = 8;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 8:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';

                                isRename = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (!($scope.data.selectedItems[0].type == "FOLDER")) {
                                    _context.next = 29;
                                    break;
                                }

                                if (!isRename[2]) {
                                    _context.next = 26;
                                    break;
                                }

                                banlist = _.map(_.filter($scope.data.list, function (item) {
                                    return item.type == 'FOLDER' && item.name != $scope.data.selectedItems[0].name;
                                }), 'name');
                                _context.next = 15;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/renameFolder.js?dev=" + randomVersionName);

                            case 15:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Desktop/renameFolder.js?dev=" + randomVersionName] = 'renameFolderExternalDesktopCtrl';

                                oldName = _.clone($scope.data.selectedItems[0].name);
                                _context.next = 19;
                                return renameFolderExternalDesktopCtrl($uibModal, //modal func,
                                desktopService.folder, // folder service,
                                $scope.data.selectedItems[0], // current node
                                banlist);

                            case 19:
                                $scope.data.selectedItems[0].name = _context.sent;


                                $scope.data.selectedItems[0].label = $scope.data.selectedItems[0].name;
                                $scope.data.selectedItems[0].path = $scope.data.selectedItems[0].path.replace("/" + oldName, "/" + $scope.data.selectedItems[0].label);

                                treeGroup = $scope.data.selectedItems[0].group + "Visible";


                                if (_.has($scope.data.pointers, treeGroup) && _.has($scope.data.pointers[treeGroup], $scope.data.selectedItems[0].uuid)) {
                                    $scope.data.pointers[treeGroup][$scope.data.selectedItems[0].uuid].label = $scope.data.selectedItems[0].name;
                                    $scope.data.pointers[treeGroup][$scope.data.selectedItems[0].uuid].path = $scope.data.selectedItems[0].path;
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                }
                                _context.next = 27;
                                break;

                            case 26:
                                toaster.pop('warning', "", " امکان تغییر نام پوشه " + $scope.data.selectedItems[0].name + " وجود ندارد. ");

                            case 27:
                                _context.next = 43;
                                break;

                            case 29:
                                if (!isRename[2]) {
                                    _context.next = 42;
                                    break;
                                }

                                type = /[^\.]+$/.exec($scope.data.selectedItems[0].name)[0];
                                banlist = _.map(_.filter($scope.data.list, function (item) {
                                    return item.type == 'FILE' && item.name != $scope.data.selectedItems[0].name && /[^\.]+$/.exec(item.name)[0] == type;
                                }), function (file) {
                                    return file.name.replace(/\.[^\.]+$/, '');
                                });
                                _context.next = 34;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/renameFile.js?dev=" + randomVersionName);

                            case 34:
                                _oldName = _.clone($scope.data.selectedItems[0].name);

                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Desktop/renameFile.js?dev=" + randomVersionName] = 'renameFolderExternalDesktopCtrl';
                                _context.next = 38;
                                return renameFilDesktopCtrl($uibModal, //modal func,
                                desktopService.document, // folder service,
                                $scope.data.selectedItems[0], // current node
                                banlist //ban names in list
                                );

                            case 38:
                                $scope.data.selectedItems[0].name = _context.sent;


                                $scope.data.selectedItems[0].path = $scope.data.selectedItems[0].path.replace("/" + _oldName, "/" + $scope.data.selectedItems[0].name);

                                _context.next = 43;
                                break;

                            case 42:
                                toaster.pop('warning', "", " امکان تغییر نام سند" + $scope.data.selectedItems[0].name + " وجود ندارد. ");

                            case 43:
                                _context.next = 46;
                                break;

                            case 45:
                                toaster.pop('error', "", "لطفا فقط یک سند یا پوشه انتخاب کنید.");

                            case 46:
                                _context.next = 51;
                                break;

                            case 48:
                                _context.prev = 48;
                                _context.t0 = _context["catch"](0);

                                console.error(_context.t0);

                            case 51:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 48]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};