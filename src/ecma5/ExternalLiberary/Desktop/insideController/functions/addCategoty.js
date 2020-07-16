'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addCategotyDesktopCtrl = function addCategotyDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.addCategoty = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(currentNode, pointerType, treeType) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/addCategories2DesktopCtrl.js?dev=' + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/addCategories2DesktopCtrl.js?dev=' + randomVersionName] = 'addCategories2DesktopCtrl';

                                    _context2.prev = 3;
                                    return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
                                        var response;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _context.next = 2;
                                                        return addCategories2DesktopCtrl($uibModal, //modal func
                                                        desktopService.repository, //repository service
                                                        'getCategoriesFolder', // rootPath
                                                        desktopService.folder, // folder service
                                                        treeType);

                                                    case 2:
                                                        response = _context.sent;


                                                        if (!$scope.data.pointers[pointerType][response.addNode.id]) {
                                                            try {
                                                                (function () {
                                                                    var paths = response.addNode.path.split("/");
                                                                    paths.splice(0, 1);
                                                                    var currentNodeID = null;
                                                                    var path = '/' + paths.shift();
                                                                    if (!$scope.data.pointers[pointerType][response.selectNodes[path].id]) {
                                                                        root = [{
                                                                            label: response.selectNodes[path].path,
                                                                            path: response.selectNodes[path].path,
                                                                            hasChildrenFolder: true,
                                                                            id: response.selectNodes[path].uuid,
                                                                            uuid: response.selectNodes[path].uuid,
                                                                            collapsed: true,
                                                                            root: true,
                                                                            children: [],
                                                                            type: 'FOLDER',
                                                                            group: treeType
                                                                        }];
                                                                        $scope.data.pointers[pointerType][response.selectNodes[path].id] = root[0];
                                                                        if (response.selectNodes[path].children && _.isArray(response.selectNodes[path].children)) _.forEach(response.selectNodes[path].children, function (child) {
                                                                            root[0].children.push(response.selectNodes[child.path]);
                                                                            $scope.data.pointers[response.selectNodes[child.path].id] = root[0].children.slice(-1)[0];
                                                                        });
                                                                    }
                                                                    currentNodeID = response.selectNodes[path].id;
                                                                    while (paths.length > 0) {
                                                                        path = path + '/' + paths.shift();
                                                                        if (!$scope.data.pointers[pointerType][response.selectNodes[path].id]) {
                                                                            $scope.data.pointers[pointerType][currentNodeID].children = $scope.data.pointers[pointerType][currentNodeID].children && _.isArray($scope.data.pointers[pointerType][currentNodeID].children) ? $scope.data.pointers[pointerType][currentNodeID].children : [];
                                                                            $scope.data.pointers[pointerType][currentNodeID].children.push({
                                                                                label: response.selectNodes[path].label,
                                                                                path: response.selectNodes[path].path,
                                                                                hasChildrenFolder: response.selectNodes[path].hasChildren || false,
                                                                                id: response.selectNodes[path].id,
                                                                                collapsed: true,
                                                                                children: [],
                                                                                selected: false,
                                                                                type: 'FOLDER',
                                                                                group: treeType,
                                                                                uuid: response.selectNodes[path].id,
                                                                                permissions: response.selectNodes[path].permissions
                                                                            });

                                                                            $scope.data.pointers[pointerType][response.selectNodes[path].id] = $scope.data.pointers[pointerType][currentNodeID].children.slice(-1)[0];
                                                                            if (response.selectNodes[path].children && _.isArray(response.selectNodes[path].children)) _.forEach(response.selectNodes[path].children, function (child) {
                                                                                $scope.data.pointers[pointerType][currentNodeID].children.push(response.selectNodes[child.path]);
                                                                                $scope.data.pointers[pointerType][response.selectNodes[child.path].id] = $scope.data.pointers[pointerType][currentNodeID].children.slice(-1)[0];
                                                                            });
                                                                        }
                                                                        $scope.data.pointers[pointerType][response.selectNodes[path].id].collapsed = false;
                                                                        currentNodeID = response.selectNodes[path].id;
                                                                    }
                                                                })();
                                                            } catch (e) {
                                                                console.error(e);
                                                            }
                                                        }

                                                        _context.prev = 4;
                                                        _context.next = 7;
                                                        return desktopService.property.addCategory(currentNode.uuid || currentNode.id, response.addNode.id);

                                                    case 7:
                                                        _context.next = 12;
                                                        break;

                                                    case 9:
                                                        _context.prev = 9;
                                                        _context.t0 = _context['catch'](4);

                                                        console.error(_context.t0);

                                                    case 12:
                                                        try {
                                                            $scope.data.pointers[pointerType][response.addNode.id].hasChildrenFolder = true;
                                                            $scope.data.pointers[pointerType][response.addNode.id].collapsed = false;
                                                        } catch (e) {
                                                            console.error(e);
                                                        }

                                                    case 13:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this, [[4, 9]]);
                                    })(), 't0', 5);

                                case 5:
                                    _context2.next = 10;
                                    break;

                                case 7:
                                    _context2.prev = 7;
                                    _context2.t1 = _context2['catch'](3);

                                    toaster.pop('error', '', _context2.t1);

                                case 10:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[3, 7]]);
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