"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addCategoriesDesktopCtrl = function addCategoriesDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.addCategories = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var isCategories, root, path;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!($scope.data.selectedItems.length == 1)) {
                                    _context2.next = 25;
                                    break;
                                }

                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context2.next = 5;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان ایجاد گروه در آیتم های داخل سطل زباله وجود ندارد.");
                                _context2.next = 23;
                                break;

                            case 5:
                                _context2.next = 7;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                            case 7:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';

                                isCategories = getPermisionArray($scope.data.selectedItems[0].permissions);

                                if (!isCategories[2]) {
                                    _context2.next = 22;
                                    break;
                                }

                                _context2.next = 12;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/addCategories2DesktopCtrl.js?dev=" + randomVersionName);

                            case 12:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Desktop/addCategories2DesktopCtrl.js?dev=" + randomVersionName] = 'addCategories2DesktopCtrl';

                                _context2.prev = 13;
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
                                                    desktopService.folder // folder service
                                                    );

                                                case 2:
                                                    response = _context.sent;


                                                    if (!_.has($scope.data.pointers['categoryVisible'], response.addNode.id)) {
                                                        (function () {
                                                            root = null;

                                                            var paths = _.remove(_.split(response.addNode.path, '/'), function (p) {
                                                                return p != "";
                                                            });

                                                            var currentNodeID = null;
                                                            path = "/" + paths.shift();

                                                            if (!_.has($scope.data.pointers['categoryVisible'], response.selectNodes[path].id)) {
                                                                root = [{
                                                                    label: response.selectNodes[path].path,
                                                                    path: response.selectNodes[path].path,
                                                                    hasChildrenFolder: true,
                                                                    id: response.selectNodes[path].id,
                                                                    uuid: response.selectNodes[path].id,
                                                                    collapsed: true,
                                                                    root: true,
                                                                    children: [],
                                                                    type: 'FOLDER'
                                                                }];
                                                                $scope.data.pointers['categoryVisible'][response.selectNodes[path].id] = root[0];
                                                                if (response.selectNodes[path].children && _.isArray(response.selectNodes[path].children)) _.forEach(response.selectNodes[path].children, function (child) {
                                                                    root[0].children.push(response.selectNodes[child.path]);
                                                                    $scope.data.pointers[response.selectNodes[child.path].id] = root[0].children.slice(-1)[0];
                                                                });
                                                            }
                                                            currentNodeID = response.selectNodes[path].id;
                                                            while (paths.length > 0) {
                                                                path = path + "/" + paths.shift();
                                                                if (!_.has($scope.data.pointers['categoryVisible'], response.selectNodes[path].id)) {
                                                                    $scope.data.pointers['categoryVisible'][currentNodeID].children = $scope.data.pointers['categoryVisible'][currentNodeID].children && _.isArray($scope.data.pointers['categoryVisible'][currentNodeID].children) ? $scope.data.pointers['categoryVisible'][currentNodeID].children : [];
                                                                    $scope.data.pointers['categoryVisible'][currentNodeID].children.push({
                                                                        label: response.selectNodes[path].label,
                                                                        path: response.selectNodes[path].path,
                                                                        hasChildrenFolder: response.selectNodes[path].hasChildren || false,
                                                                        id: response.selectNodes[path].id,
                                                                        collapsed: true,
                                                                        children: [],
                                                                        selected: false,
                                                                        type: 'FOLDER',
                                                                        uuid: response.selectNodes[path].id,
                                                                        permissions: response.selectNodes[path].permissions
                                                                    });

                                                                    $scope.data.pointers['categoryVisible'][response.selectNodes[path].id] = $scope.data.pointers['categoryVisible'][currentNodeID].children.slice(-1)[0];
                                                                    if (response.selectNodes[path].children && _.isArray(response.selectNodes[path].children)) _.forEach(response.selectNodes[path].children, function (child) {
                                                                        $scope.data.pointers['categoryVisible'][currentNodeID].children.push(response.selectNodes[child.path]);
                                                                        $scope.data.pointers['categoryVisible'][response.selectNodes[child.path].id] = $scope.data.pointers['categoryVisible'][currentNodeID].children.slice(-1)[0];
                                                                    });
                                                                }
                                                                $scope.data.pointers['categoryVisible'][response.selectNodes[path].id].collapsed = false;
                                                                currentNodeID = response.selectNodes[path].id;
                                                            }
                                                        })();
                                                    }
                                                    _context.next = 6;
                                                    return desktopService.property.addCategory($scope.data.selectedItems[0].uuid, response.addNode.id);

                                                case 6:

                                                    toaster.pop('success', '', 'دسته بندی با موفقیت افزوده شد.');

                                                    $scope.data.pointers['categoryVisible'][response.addNode.id].hasChildrenFolder = true;
                                                    $scope.data.pointers['categoryVisible'][response.addNode.id].collapsed = false;

                                                case 9:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                })(), "t0", 15);

                            case 15:
                                _context2.next = 20;
                                break;

                            case 17:
                                _context2.prev = 17;
                                _context2.t1 = _context2["catch"](13);

                                toaster.pop('error', '', _context2.t1);

                            case 20:
                                _context2.next = 23;
                                break;

                            case 22:
                                toaster.pop('warning', "", " امکان افزودن به دسته بندی " + $scope.data.selectedItems[0].name + " وجود ندارد ");

                            case 23:
                                _context2.next = 26;
                                break;

                            case 25:
                                toaster.pop('error', "", "لطفا فقط یک آیتم انتخاب کنید");

                            case 26:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[13, 17]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};