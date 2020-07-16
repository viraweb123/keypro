'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var selectingFolderDesktopCtrl = function selectingFolderDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.selectingFolder = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(folder, search, selectedDoc) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    //TODO stop get older thumbnails item
                                    $scope.data.isNewThumbnailsRequest = true;
                                    _context.next = 4;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                case 4:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';
                                    _context.next = 7;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                case 7:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType';
                                    if (search) {} else {
                                        // clear all selected items from previus node selects
                                        $scope.data.selectedItems = [];
                                        $scope.data.nav.center.isOpened = true;
                                        setTimeout(function () {
                                            $(".desktop  .CR    .niseScrollClass").niceScroll({
                                                cursorcolor: "#00ACC1",
                                                cursorwidth: "8px",
                                                cursorborderradius: "0px",
                                                rtlmode: false
                                            });
                                        }, 100);
                                        folder.uuid = folder.id;
                                        $scope.data.selectedFileOrFolder = folder;
                                        $scope.data.list = [];
                                        if (folder.children && _.isArray(folder.children) && folder.children.length > 0) {
                                            _.forEach(folder.children, function (v) {
                                                var childFolder = {
                                                    type: v.type,
                                                    thumbnailSrc: '../../../../static/image/' + (v.permissions == 1 ? 'red-' : '') + 'folder' + (v.hasChildrenFolder ? 's' : '') + '.png',
                                                    selected: false,
                                                    uuid: v.uuid || v.id,
                                                    id: v.uuid || v.id,
                                                    name: v.label,
                                                    label: v.label,
                                                    path: v.path,
                                                    hasChildrenFolder: v.hasChildrenFolder,
                                                    permissions: v.permissions,
                                                    collapsed: v.collapsed,
                                                    checkedOut: v.checkedOut,
                                                    locked: v.locked,
                                                    subscribed: _.has(v, 'subscribed') ? v.subscribed : false
                                                };
                                                if (_.has(folder, "group")) childFolder.group = folder.group;
                                                $scope.data.list.push(_.clone(childFolder));
                                                childFolder = undefined;
                                            });
                                        }
                                        desktopService.document.listChild(folder.id).then(function (res) {
                                            if (res.data != null) {
                                                _.forEach(res.data, function (v) {
                                                    v.name = getNameFromPath(v.path);
                                                    v.type = 'FILE';
                                                    v.mimeType = v.mimeType == 'application/octet-stream' ? getNameFromPath(v.name.split('.').pop()) : v.mimeType;
                                                    v.selected = false;
                                                    v.thumbnailSrc = getSrcFromType(v.mimeType);
                                                    if (v.hasOwnProperty('notes')) v.hasNotes = true;
                                                    if (_.has(folder, "group")) v.group = folder.group;
                                                    $scope.data.list.push(v);
                                                });
                                                $scope.data.isNewThumbnailsRequest = false;
                                                $scope.func.getImage($scope.data.list);
                                                if (typeof selectedDoc !== "undefined" && _.has(selectedDoc, "uuid")) {
                                                    var index = _.findIndex($scope.data.list, function (item) {
                                                        return item.uuid == selectedDoc.uuid;
                                                    });
                                                    try {
                                                        if (typeof $scope.data.list[index] !== "undefined") $scope.data.selectedFileOrFolder = _.clone($scope.data.list[index]);
                                                        $scope.func.clickInDoc($scope.data.list[index]);
                                                    } catch (e) {
                                                        console.error(e);
                                                    }
                                                } else $scope.func.selectLeftNav();
                                            } else $scope.func.selectLeftNav();
                                        }, function (error) {
                                            return $scope.data.list = [];
                                        });
                                    }
                                    _context.next = 14;
                                    break;

                                case 11:
                                    _context.prev = 11;
                                    _context.t0 = _context['catch'](0);

                                    console.error(_context.t0);

                                case 14:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 11]]);
                }));

                return function (_x, _x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            }();
            resolve(true);
        } catch (e) {
            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};