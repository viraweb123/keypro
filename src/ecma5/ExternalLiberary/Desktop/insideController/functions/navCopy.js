'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var navCopyDesktopCtrl = function navCopyDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.navCopy = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length > 0 && $scope.data.selectedItems[0].group != "trash")) {
                                    _context2.next = 15;
                                    break;
                                }

                                _context2.next = 4;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/multiCopy2DesktopCtrl.js?dev=' + randomVersionName);

                            case 4:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/multiCopy2DesktopCtrl.js?dev=' + randomVersionName] = 'multiCopy2DesktopCtrl';

                                _context2.next = 7;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                            case 7:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';

                                _context2.prev = 8;
                                return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
                                    var response, i;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.next = 2;
                                                    return multiCopy2DesktopCtrl($uibModal, //modal func
                                                    desktopService.repository, //repository service
                                                    'getRootFolder', // rootPath
                                                    desktopService.folder, // folder service
                                                    $scope.data.selectedItems[0].group);

                                                case 2:
                                                    response = _context.sent;


                                                    if (!$scope.data.pointers["taxonomyVisible"][response.addNode.id]) {
                                                        (function () {
                                                            var paths = response.addNode.path.split("/");
                                                            paths.splice(0, 1);
                                                            var currentNodeID = null;
                                                            var path = '/' + paths.shift();

                                                            if (!$scope.data.pointers["taxonomyVisible"][response.selectNodes[path].id]) {

                                                                root = [{
                                                                    label: response.selectNodes[path].path,
                                                                    path: response.selectNodes[path].path,
                                                                    hasChildrenFolder: true,
                                                                    id: response.selectNodes[path].uuid,
                                                                    collapsed: true,
                                                                    root: true,
                                                                    children: [],
                                                                    group: "taxonomy",
                                                                    type: "FOLDER"
                                                                }];
                                                                $scope.data.pointers["taxonomyVisible"][response.selectNodes[path].id] = root[0];
                                                                if (response.selectNodes[path].children && _.isArray(response.selectNodes[path].children)) response.selectNodes[path].children.forEach(function (child) {

                                                                    root[0].children.push(response.selectNodes[child.path]);
                                                                    $scope.data.pointers[response.selectNodes[child.path].id] = root[0].children.slice(-1)[0];
                                                                });
                                                            }
                                                            currentNodeID = response.selectNodes[path].id;
                                                            while (paths.length > 0) {
                                                                path = path + '/' + paths.shift();
                                                                if (!$scope.data.pointers["taxonomyVisible"][response.selectNodes[path].id]) {
                                                                    $scope.data.pointers["taxonomyVisible"][currentNodeID].children = $scope.data.pointers["taxonomyVisible"][currentNodeID].children && _.isArray($scope.data.pointers["taxonomyVisible"][currentNodeID].children) ? $scope.data.pointers["taxonomyVisible"][currentNodeID].children : [];

                                                                    $scope.data.pointers["taxonomyVisible"][currentNodeID].children.push({
                                                                        label: response.selectNodes[path].label,
                                                                        path: response.selectNodes[path].path,
                                                                        hasChildrenFolder: response.selectNodes[path].hasChildren || false,
                                                                        id: response.selectNodes[path].id,
                                                                        collapsed: true,
                                                                        children: [],
                                                                        selected: false,
                                                                        type: 'FOLDER',
                                                                        group: "taxonomy",
                                                                        uuid: response.selectNodes[path].id,
                                                                        permissions: response.selectNodes[path].permissions
                                                                    });

                                                                    $scope.data.pointers["taxonomyVisible"][response.selectNodes[path].id] = $scope.data.pointers["taxonomyVisible"][currentNodeID].children.slice(-1)[0];
                                                                    if (response.selectNodes[path].children && _.isArray(response.selectNodes[path].children)) _.forEach(response.selectNodes[path].children, function (child) {
                                                                        $scope.data.pointers["taxonomyVisible"][currentNodeID].children.push(response.selectNodes[child.path]);
                                                                        $scope.data.pointers["taxonomyVisible"][response.selectNodes[child.path].id] = $scope.data.pointers["taxonomyVisible"][currentNodeID].children.slice(-1)[0];
                                                                    });
                                                                }
                                                                $scope.data.pointers["taxonomyVisible"][response.selectNodes[path].id].collapsed = false;
                                                                currentNodeID = response.selectNodes[path].id;
                                                            }
                                                        })();
                                                    }

                                                    //send all copy to server
                                                    i = 0;

                                                case 5:
                                                    if (!(i < $scope.data.selectedItems.length)) {
                                                        _context.next = 16;
                                                        break;
                                                    }

                                                    if (!($scope.data.selectedItems[i].type == 'FOLDER')) {
                                                        _context.next = 11;
                                                        break;
                                                    }

                                                    _context.next = 9;
                                                    return desktopService.folder.copy($scope.data.selectedItems[i].uuid, response.addNode.id);

                                                case 9:
                                                    _context.next = 13;
                                                    break;

                                                case 11:
                                                    _context.next = 13;
                                                    return desktopService.document.copy($scope.data.selectedItems[i].uuid, response.addNode.id);

                                                case 13:
                                                    i++;
                                                    _context.next = 5;
                                                    break;

                                                case 16:
                                                    $scope.data.trees.taxonomy.changeCurrentNode($scope.data.pointers["taxonomyVisible"][response.addNode.id], false);

                                                case 17:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                })(), 't0', 10);

                            case 10:
                                _context2.next = 15;
                                break;

                            case 12:
                                _context2.prev = 12;
                                _context2.t1 = _context2['catch'](8);

                                toaster.pop('error', '', _context2.t1);

                            case 15:
                                _context2.next = 20;
                                break;

                            case 17:
                                _context2.prev = 17;
                                _context2.t2 = _context2['catch'](0);

                                console.error(_context2.t2);

                            case 20:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[0, 17], [8, 12]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};