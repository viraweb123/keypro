"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var doubleClickInDocDesktopCtrl = function doubleClickInDocDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.doubleClickInDoc = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(doc) {
                    var paths, path;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;

                                    if (!(doc.type == 'FILE')) {
                                        _context2.next = 5;
                                        break;
                                    }

                                    $scope.func.clickInDoc(doc);
                                    _context2.next = 17;
                                    break;

                                case 5:
                                    _.forEach($scope.data.nodesFolder, function (node) {
                                        return node.collapsed = true;
                                    });
                                    paths = doc.path.split("/");

                                    paths.splice(0, 1);
                                    path = "/" + paths.shift();

                                    if (!$scope.data.isSpecialDocOrFolder) {
                                        _context2.next = 16;
                                        break;
                                    }

                                case 10:
                                    if (_.has($scope.data.nodesFolder, path)) {
                                        _context2.next = 16;
                                        break;
                                    }

                                    if (!(paths.length <= 0)) {
                                        _context2.next = 13;
                                        break;
                                    }

                                    return _context2.abrupt("break", 16);

                                case 13:
                                    path = path + "/" + paths.shift();
                                    _context2.next = 10;
                                    break;

                                case 16:
                                    if ($scope.data.nodesFolder[path]) {
                                        $scope.data.nodesFolder[path].collapsed = false;
                                        while (paths.length > 0) {
                                            path = path + "/" + paths.shift();
                                            $scope.data.nodesFolder[path].collapsed = false;
                                        }
                                        $scope.data.trees[doc.group].changeCurrentNode($scope.data.pointers[doc.group + "Visible"][doc.uuid || doc.id], false);
                                    } else {
                                        $scope.data.list = [];
                                        if (_.has(doc, 'hasChildrenFolder') && doc.hasChildrenFolder == true) desktopService.folder.listChild(doc.id).then(function () {
                                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(result) {
                                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                                    while (1) {
                                                        switch (_context.prev = _context.next) {
                                                            case 0:
                                                                if (!(result.data != null)) {
                                                                    _context.next = 8;
                                                                    break;
                                                                }

                                                                if (!_.isArray(result.data) && _.has(result.data, 'originalElement')) {
                                                                    if (_.has(result.data.originalElement, 'folders') && result.data.originalElement.folders != "") {
                                                                        if (_.has(result.data.originalElement.folders, 'folder') && _.isArray(result.data.originalElement.folders.folder)) result.data = result.data.originalElement.folders.folder;else if (_.has(result.data.originalElement.folders, 'folder') && _.isObject(result.data.originalElement.folders.folder)) result.data = [result.data.originalElement.folders.folder];
                                                                    }
                                                                }
                                                                doc.children = doc.children || [];
                                                                _context.next = 5;
                                                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName);

                                                            case 5:
                                                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName] = 'getNameFromPath';
                                                                _.forEach(result.data, function (res) {
                                                                    doc.children.push({

                                                                        id: res.uuid || res.id,
                                                                        uuid: res.uuid,
                                                                        label: getNameFromPath(res.path),
                                                                        permissions: res.permissions,
                                                                        path: res.path,
                                                                        hasChildrenFolder: res.hasChildren,
                                                                        collapsed: true,
                                                                        selected: false,
                                                                        type: 'FOLDER',
                                                                        group: "taxonomy" //doc.group//
                                                                    });
                                                                });
                                                                $scope.func.selectFolder(doc);

                                                            case 8:
                                                            case "end":
                                                                return _context.stop();
                                                        }
                                                    }
                                                }, _callee, _this);
                                            }));

                                            return function (_x2) {
                                                return _ref2.apply(this, arguments);
                                            };
                                        }(), function (error) {});else $scope.func.selectFolder(doc);
                                    }

                                case 17:
                                    _context2.next = 22;
                                    break;

                                case 19:
                                    _context2.prev = 19;
                                    _context2.t0 = _context2["catch"](0);

                                    console.error(_context2.t0);

                                case 22:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[0, 19]]);
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