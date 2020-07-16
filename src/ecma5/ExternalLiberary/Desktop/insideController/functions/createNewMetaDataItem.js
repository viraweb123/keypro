'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var createNewMetaDataItemDesktopCtrl = function createNewMetaDataItemDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.createNewMetaDataItem = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(node) {
                    var _node, uuid, type;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _node = _slicedToArray(node, 2);
                                    uuid = _node[0];
                                    type = _node[1];

                                    $scope.data.isSpecialDocOrFolder = true;

                                    _context.next = 7;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                case 7:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';
                                    _context.next = 10;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                case 10:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType,srcMimeType';
                                    _context.t0 = type;
                                    _context.next = _context.t0 === "document" ? 14 : _context.t0 === "folder" ? 24 : 34;
                                    break;

                                case 14:
                                    _context.prev = 14;
                                    _context.next = 17;
                                    return $scope.func.clearBeforeInput();

                                case 17:
                                    _context.next = 22;
                                    break;

                                case 19:
                                    _context.prev = 19;
                                    _context.t1 = _context['catch'](14);

                                    console.error(_context.t1);

                                case 22:
                                    desktopService.document.getProperties(uuid).then(function (res) {
                                        if (_.has(res.data, 'originalElement') && _.has(res.data.originalElement, 'document')) {
                                            desktopService.folder.getProperties(res.data.originalElement.document.path.replace(/\/[^\/]*$/, "")).then(function (folder) {
                                                if (_.has(folder.data, 'originalElement') && _.has(folder.data.originalElement, 'folder')) {
                                                    folder = folder.data.originalElement.folder;
                                                    var label = getNameFromPath(folder.path);
                                                    $scope.data.trees.taxonomyVisible = [{
                                                        hasChildrenFolder: folder.hasChildren,
                                                        rootFolder: [],
                                                        collapsed: true,
                                                        children: [],
                                                        label: label,
                                                        root: true,
                                                        id: folder.uuid,
                                                        uuid: folder.uuid,
                                                        type: "FOLDER",
                                                        group: "taxonomy",
                                                        path: folder.path,
                                                        permissions: folder.permissions
                                                    }];
                                                    $scope.data.pointers["taxonomyVisible"][folder.uuid] = $scope.data.trees.taxonomyVisible[0];
                                                    $scope.data.nodesFolder[folder.path] = $scope.data.trees.taxonomyVisible[0];
                                                    $scope.data.trees.taxonomyTree.currentNode = $scope.data.trees.taxonomyVisible[0];
                                                    //$scope.data.nav.right.select('taxonomyVisible');

                                                    if ($scope.data.nav.right.selectedSide != null && $scope.data.nav.right.selectedSide != 'taxonomyVisible') {
                                                        try {
                                                            window.document.querySelector('.D div.taxonomyVisible').classList.remove("show");
                                                        } catch (e) {
                                                            console.error(e);
                                                        }
                                                    }
                                                    try {
                                                        window.document.querySelector('.D div.taxonomyVisible').classList.add("show");
                                                    } catch (e) {
                                                        console.error(e);
                                                    } finally {
                                                        $scope.data.nav.right.selectedSide = 'taxonomyVisible';
                                                        $scope.data.nav.right.isOpened = $scope.data.nav.right.isOpened || true;
                                                        $scope.data.trees.taxonomy.changeCurrentNode($scope.data.pointers["taxonomyVisible"][folder.uuid], false, res.data.originalElement.document);
                                                    }
                                                }
                                            }, function (e) {
                                                console.error(e);
                                            });
                                        }
                                    }, function (error) {
                                        console.error(e);
                                    });
                                    return _context.abrupt('break', 35);

                                case 24:
                                    _context.prev = 24;
                                    _context.next = 27;
                                    return $scope.func.clearBeforeInput();

                                case 27:
                                    _context.next = 32;
                                    break;

                                case 29:
                                    _context.prev = 29;
                                    _context.t2 = _context['catch'](24);

                                    console.error(_context.t2);

                                case 32:
                                    desktopService.folder.getProperties(uuid).then(function (res) {
                                        if (_.has(res.data, 'originalElement') && _.has(res.data.originalElement, 'folder')) {
                                            var label = getNameFromPath(res.data.originalElement.folder.path);
                                            $scope.data.trees.taxonomyVisible = [{
                                                hasChildrenFolder: res.data.originalElement.folder.hasChildren,
                                                rootFolder: [],
                                                collapsed: true,
                                                children: [],
                                                label: label,
                                                id: uuid,
                                                root: true,
                                                uuid: uuid,
                                                type: "FOLDER",
                                                group: "taxonomy",
                                                path: res.data.originalElement.folder.path,
                                                permissions: res.data.originalElement.folder.permissions
                                            }];
                                            $scope.data.pointers["taxonomyVisible"][uuid] = $scope.data.trees.taxonomyVisible[0];
                                            $scope.data.nodesFolder[res.data.originalElement.folder.path] = $scope.data.trees.taxonomyVisible[0];
                                            $scope.data.trees.taxonomyTree.currentNode = $scope.data.trees.taxonomyVisible[0];
                                            $scope.data.nav.right.select('taxonomyVisible');
                                        }
                                    }, function (error) {
                                        console.error(e);
                                    });
                                    return _context.abrupt('break', 35);

                                case 34:
                                    return _context.abrupt('break', 35);

                                case 35:
                                    _context.next = 40;
                                    break;

                                case 37:
                                    _context.prev = 37;
                                    _context.t3 = _context['catch'](0);

                                    console.error(_context.t3);

                                case 40:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 37], [14, 19], [24, 29]]);
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