"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assignDigitalSign = function assignDigitalSign($scope, $state, $compile, administrationService, toaster, $uibModal, $upload) {
    var _this = this;

    _classCallCheck(this, assignDigitalSign);

    $scope.data = {
        removeExternalFuncs: {},

        tree: {},
        pointer: {},
        nodes: {},
        root: null,
        selectedFileOrFolder: null,
        currentNodeCount: -1,
        documents: [],

        dbClicked: 0,
        docSelected: null,
        isNotSelectedImage: true,

        isNewThumbnailsRequest: false,

        imageTypes: ["image/bmp", "image/gif", "image/jpeg", "image/jpg", "image/png", "image/tiff"],

        usersList: null,
        selectedUser: null,

        userStampList: null,
        selectedStamp: null,

        sdbClicked: 0,
        isNewStampThumbnailsRequest: false,

        list: []
    };

    $scope.func = {};

    $scope.func.treeView = {
        changeCurrentNode: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(node, collapsed, path) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                $scope.func.clearImage();
                                $scope.data.tree.currentNode = node;
                                if (typeof collapsed !== 'undefined') $scope.data.tree.currentNode.collapsed = collapsed;
                                $scope.data.selectedFileOrFolder = node;

                                if (!($scope.data.tree.currentNode && $scope.data.tree.currentNode.hasChildrenFolder)) {
                                    _context.next = 11;
                                    break;
                                }

                                _context.next = 7;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName);

                            case 7:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName] = 'getNameFromPath';

                                administrationService.folder.listChild($scope.data.tree.currentNode.id).then(function (result) {
                                    if (result.data != null) {
                                        $scope.data.tree.currentNode['children'] = $scope.data.tree.currentNode.children && _.isArray($scope.data.tree.currentNode.children) ? $scope.data.tree.currentNode.children : [];
                                        _.forEach(result.data, function (res) {

                                            if (_.findIndex(_.map($scope.data.tree.currentNode.children, 'id'), function (id) {
                                                return id == (res.uuid || res.id);
                                            }) == -1) {
                                                $scope.data.tree.currentNode.children.push({
                                                    id: res.uuid || res.id,
                                                    uuid: res.uuid || res.id,
                                                    label: getNameFromPath(res.path),
                                                    name: getNameFromPath(res.path),
                                                    path: res.path,
                                                    hasChildrenFolder: res.hasChildren,
                                                    collapsed: true,
                                                    type: 'FOLDER'
                                                });
                                                $scope.data.pointer[res.uuid || res.id] = $scope.data.tree.currentNode.children[$scope.data.tree.currentNode.children.length - 1];
                                                $scope.data.nodes[res.path] = $scope.data.tree.currentNode.children[$scope.data.tree.currentNode.children.length - 1];
                                            }
                                        });
                                    } else $scope.data.currentNodeCount = 0;
                                    $scope.func.selectFolder($scope.data.tree.currentNode, path);
                                });

                                _context.next = 12;
                                break;

                            case 11:
                                $scope.func.selectFolder($scope.data.tree.currentNode, path);

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            function changeCurrentNode(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return changeCurrentNode;
        }()
    };
    $scope.func.clickImage = function (e, doc) {
        $scope.data.dbClicked = e.detail || e.originalEvent.detail;
        $scope.data.selectedFileOrFolder = _.clone(doc);
        switch ($scope.data.dbClicked) {
            case 1:
                /* TODO click in image */
                setTimeout(function () {
                    if ($scope.data.dbClicked == 1) {
                        $scope.data.dbClicked = 0;
                        $scope.func.clickInDoc(doc);
                    }
                }, 500);
                break;
            case 2:
                /* TODO double click in image */
                $scope.func.dbClickInDoc(doc);

                break;
            default:
                break;
        }
    };
    $scope.func.clickInDoc = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(doc) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            try {
                                $scope.data.docSelected = angular.copy(doc);
                                $scope.data.file = $scope.func.splitFileAndMimeType(_.clone(doc.label));
                                $scope.data.isNotSelectedImage = !_.includes(['.jpg', '.jpeg', '.png', '.bmp', '.tiff'], $scope.data.file.extension);
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            } catch (e) {
                                console.error(e);
                            }

                        case 1:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x4) {
            return _ref2.apply(this, arguments);
        };
    }();
    $scope.func.dbClickInDoc = function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(doc, pathing) {
            var paths, path;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;

                            if (!(doc.type == 'FILE')) {
                                _context3.next = 5;
                                break;
                            }

                            $scope.func.clickInDoc(doc);
                            _context3.next = 20;
                            break;

                        case 5:
                            $scope.func.clearImage();
                            _.forEach($scope.data.nodes, function (node) {
                                return node.collapsed = false;
                            });
                            paths = _.remove(_.split(doc.path.trim(), "/"), function (v) {
                                return v != "";
                            });
                            path = "/" + paths.shift();

                            if (!_.has($scope.data.nodes, doc.path)) {
                                _context3.next = 15;
                                break;
                            }

                            $scope.data.nodes[doc.path].collapsed = false;
                            while (paths.length > 0) {
                                path = path + "/" + paths.shift();
                                $scope.data.nodes[path].collapsed = false;
                            }
                            $scope.func.treeView.changeCurrentNode($scope.data.pointer[doc.uuid], false, pathing);
                            _context3.next = 20;
                            break;

                        case 15:
                            $scope.data.list = [];
                            _context3.next = 18;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName);

                        case 18:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName] = 'getNameFromPath';
                            administrationService.folder.listChild(doc.id).then(function (result) {

                                if (result.data != null) {
                                    doc.children = doc.children || [];
                                    _.forEach(result.data, function (res) {
                                        doc.children.push({
                                            id: res.uuid || res.id,
                                            uuid: res.uuid,
                                            label: getNameFromPath(res.path),
                                            name: getNameFromPath(res.path),
                                            permissions: res.permissions,
                                            path: res.path,
                                            hasChildrenFolder: res.hasChildren,
                                            collapsed: true,
                                            selected: false,
                                            type: 'FOLDER',
                                            subscribed: _.has(res, 'subscribed') ? res.subscribed : false
                                        });
                                    });
                                    $scope.func.selectFolder(doc);
                                }
                            }, function (error) {
                                return console.error(error);
                            });

                        case 20:
                            _context3.next = 25;
                            break;

                        case 22:
                            _context3.prev = 22;
                            _context3.t0 = _context3["catch"](0);

                            console.error(_context3.t0);

                        case 25:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[0, 22]]);
        }));

        return function (_x5, _x6) {
            return _ref3.apply(this, arguments);
        };
    }();
    $scope.func.splitFileAndMimeType = function (file) {
        return {
            name: _.clone(file).replace(/\.[^/.]+$/, ""),
            extension: /\.[^/.]+$/.exec(file)[0]
        };
    };
    $scope.func.clearImage = function () {
        $scope.data.file = {
            name: "",
            extension: ""
        };
        $scope.func.isNotSelectedImage = true;
        _.defer(function () {
            return $scope.$apply();
        });
    };
    $scope.func.getRoot = function () {
        try {
            administrationService.repository.getRoot("getRootFolder").then(function (result) {
                $scope.data.root = angular.copy(result.data);
                $scope.data.nodes[$scope.data.root[0].path] = $scope.data.root[0];
            }, function (error) {
                toaster.pop('error', '', 'عدم دریافت موفقیت آمیز ریشه');
            });
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.getThumbnailFile = function (file, getSrcFromType) {
        return new Promise(function (resolve, reject) {
            try {
                administrationService.document.thumbnail(file, 0, 75).then(function (result) {
                    return resolve("data:image/png;base64," + result.data);
                }, function (error) {
                    return resolve(getSrcFromType(file.mimeType));
                });
            } catch (e) {
                console.error(e);
                resolve(getSrcFromType(file.mimeType));
            }
        });
    };
    $scope.func.getImage = function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(list) {
            var i;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            _context4.next = 3;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                        case 3:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType';
                            i = 0;

                        case 5:
                            if (!(i < list.length)) {
                                _context4.next = 21;
                                break;
                            }

                            if (!($scope.data.isNewThumbnailsRequest == true)) {
                                _context4.next = 8;
                                break;
                            }

                            throw new Error("Stopping get Thumbnail function!");

                        case 8:
                            _context4.prev = 8;

                            if (!(_.has(list[i], "type") && list[i].type == "FILE")) {
                                _context4.next = 13;
                                break;
                            }

                            _context4.next = 12;
                            return $scope.func.getThumbnailFile(list[i], getSrcFromType);

                        case 12:
                            list[i].thumbnailSrc = _context4.sent;

                        case 13:
                            _context4.next = 18;
                            break;

                        case 15:
                            _context4.prev = 15;
                            _context4.t0 = _context4["catch"](8);

                            console.error(_context4.t0.message || _context4.t0);

                        case 18:
                            i++;
                            _context4.next = 5;
                            break;

                        case 21:
                            $scope.data.isNewThumbnailsRequest = false;
                            _context4.next = 27;
                            break;

                        case 24:
                            _context4.prev = 24;
                            _context4.t1 = _context4["catch"](0);

                            console.error(_context4.t1);

                        case 27:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[0, 24], [8, 15]]);
        }));

        return function (_x7) {
            return _ref4.apply(this, arguments);
        };
    }();
    $scope.func.selectFolder = function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(folder, path) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:

                            $scope.data.isNewThumbnailsRequest = true;

                            _context5.next = 3;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName);

                        case 3:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName] = 'getNameFromPath';
                            _context5.next = 6;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                        case 6:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType';
                            folder.uuid = folder.id;
                            $scope.data.selectedFileOrFolder = folder;
                            $scope.data.list = [];
                            if (folder.children && _.isArray(folder.children) && folder.children.length > 0) {
                                _.forEach(folder.children, function (v) {
                                    $scope.data.list.push({
                                        type: v.type,
                                        thumbnailSrc: "../../../../static/image/folder" + (v.hasChildrenFolder ? 's' : '') + ".png",
                                        selected: false,
                                        uuid: v.uuid || v.id,
                                        id: v.uuid || v.id,
                                        name: v.label,
                                        label: v.label,
                                        path: v.path,
                                        hasChildrenFolder: v.hasChildrenFolder,
                                        permissions: v.permissions,
                                        collapsed: v.collapsed,
                                        subscribed: _.has(v, 'subscribed') ? v.subscribed : false
                                    });
                                });
                            }
                            administrationService.document.listChild(folder.id).then(function (res) {

                                if (res.data != null) {
                                    _.forEach(res.data, function (v) {
                                        if (_.has(v, 'mimeType') && _.includes($scope.data.imageTypes, v.mimeType)) {
                                            v.name = getNameFromPath(v.path);
                                            v.label = v.name;
                                            v.type = 'FILE';
                                            v.mimeType = v.mimeType == 'application/octet-stream' ? getNameFromPath(v.name.split('.').pop()) : v.mimeType;
                                            v.selected = false;
                                            v.thumbnailSrc = getSrcFromType(v.mimeType);
                                            if (v.hasOwnProperty('notes')) v.hasNotes = true;
                                            if (typeof path !== "undefined" && path == v.path) {
                                                v.selected = true;
                                                $scope.data.selectedFileOrFolder = v;
                                            }
                                            $scope.data.list.push(v);
                                        }
                                    });
                                    $scope.data.isNewThumbnailsRequest = false;
                                    $scope.func.getImage($scope.data.list);
                                }
                            }, function (error) {
                                return console.error(error);
                            });

                        case 12:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this);
        }));

        return function (_x8, _x9) {
            return _ref5.apply(this, arguments);
        };
    }();
    $scope.func.sendAssignedSign = function () {
        try {
            if ($scope.data.isNotSelectedImage) throw "لطفا یک تصویر انتخاب کنید";
            if ($scope.data.selectedUser == null) throw "لطفا یک کاربر انتخاب کنید";
            if ($scope.data.userStampList != null && _.findIndex($scope.data.userStampList, function (stamp) {
                return stamp.stampId == $scope.data.docSelected.uuid;
            }) >= 0) throw "تصویر فوق در لیست امضای دیجیتال موجود است.";
            administrationService.stamp.assignSignToUser("userId=" + $scope.data.selectedUser + "&type=tree&usage=stamp&stampId=" + $scope.data.docSelected.uuid).then(function (res) {
                toaster.pop("success", "", "اختصاص امضای دیجیتال به کاربر با موفقفیت انجام گرفت.");
                $scope.func.changeUser();
            }, function (error) {
                console.error(error);
                toaster.pop("error", "", "مشکلی در اختصاص امضای دیجیتال به کاربر رخ داده است.");
            });
        } catch (e) {
            console.error(e);
            toaster.pop("error", "", e);
        }
    };
    $scope.func.clickStampImage = function (e, stamp) {
        $scope.data.sdbClicked = e.detail || e.originalEvent.detail;
        $scope.data.selectedStamp = _.clone(stamp);
        switch ($scope.data.sdbClicked) {
            case 1:
                /* TODO click in image */
                setTimeout(function () {
                    if ($scope.data.sdbClicked == 1) {
                        $scope.data.sdbClicked = 0;
                        $scope.func.clickInStamp(stamp);
                    }
                }, 500);
                break;
            case 2:
                /* TODO double click in image */
                $scope.func.clickInStamp(stamp);

                break;
            default:
                break;
        }
    };
    $scope.func.clickInStamp = function (stamp) {};
    $scope.func.changeUser = function () {
        try {

            $scope.data.userStampList = null;
            $scope.data.isNewStampThumbnailsRequest = true;
            if ($scope.data.selectedUser != null) administrationService.stamp.getStampsByUser($scope.data.selectedUser).then(function (res) {
                if (_.has(res, 'data') && _.has(res.data, 'originalElement') && _.has(res.data.originalElement, 'stampUsers') && _.isArray(res.data.originalElement.stampUsers)) {

                    $scope.data.userStampList = [];
                    _.forEach(res.data.originalElement.stampUsers, function (v) {
                        v.thumbnailSrc = '/static/img/jpg.png';
                        $scope.data.userStampList.push(v);
                    });
                    $scope.data.isNewStampThumbnailsRequest = false;
                    $scope.func.getStampsThumbnail($scope.data.userStampList);
                    _.defer(function () {
                        return $scope.$apply();
                    });
                }
            }, function (error) {
                console.error(error);
            });
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.getStampThumbnail = function (file) {
        return new Promise(function (resolve, reject) {
            try {
                administrationService.document.thumbnail(file, 0, 75).then(function (result) {
                    return resolve("data:image/png;base64," + result.data);
                }, function (error) {
                    return resolve('/static/img/jpg.png');
                });
            } catch (e) {
                console.error(e);
                resolve('/static/img/jpg.png');
            }
        });
    };
    $scope.func.getStampsThumbnail = function () {
        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(list) {
            var i;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.prev = 0;
                            _context6.next = 3;
                            return JSManagement.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                        case 3:
                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType';
                            i = 0;

                        case 5:
                            if (!(i < list.length)) {
                                _context6.next = 20;
                                break;
                            }

                            if (!($scope.data.isNewStampThumbnailsRequest == true)) {
                                _context6.next = 8;
                                break;
                            }

                            throw new Error("Stopping get Thumbnail function!");

                        case 8:
                            _context6.prev = 8;
                            _context6.next = 11;
                            return $scope.func.getStampThumbnail({ uuid: list[i].stampId });

                        case 11:
                            list[i].thumbnailSrc = _context6.sent;
                            _context6.next = 17;
                            break;

                        case 14:
                            _context6.prev = 14;
                            _context6.t0 = _context6["catch"](8);

                            console.error(_context6.t0.message || _context6.t0);

                        case 17:
                            i++;
                            _context6.next = 5;
                            break;

                        case 20:
                            $scope.data.isNewStampThumbnailsRequest = false;
                            _context6.next = 26;
                            break;

                        case 23:
                            _context6.prev = 23;
                            _context6.t1 = _context6["catch"](0);

                            console.error(_context6.t1);

                        case 26:
                            _context6.prev = 26;

                            _.defer(function () {
                                return $scope.$apply();
                            });
                            return _context6.finish(26);

                        case 29:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this, [[0, 23, 26, 29], [8, 14]]);
        }));

        return function (_x10) {
            return _ref6.apply(this, arguments);
        };
    }();

    $scope.func.refreshTaxonomy = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        try {
                            $scope.data.tree = {};
                            $scope.data.pointer = {};
                            $scope.data.nodes = {};
                            $scope.data.root = null;
                            $scope.data.selectedFileOrFolder = null;
                            $scope.data.documents = [];
                            $scope.data.list = [];

                            $scope.func.getRoot();
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, _this);
    }));

    $scope.func.toggleActiveStamp = function (stamp, index) {
        administrationService.stamp.toggleActiveStampUser("id=" + stamp.id).then(function (res) {
            $scope.data.userStampList[index].active = !$scope.data.userStampList[index].active;
            _.defer(function () {
                return $scope.$apply();
            });
            toaster.pop('success', '', ($scope.data.userStampList[index].active ? '' : 'غیر') + " فعال سازی امضای دیجیتال انجام شد.");
        }, function (error) {
            toaster.pop('error', '', 'مشکلی در فعال\غیر فعال سازی امضای دیجیتال رخ داده است.');
        });
    };

    $scope.func.getUsersList = function () {
        return new Promise(function (resolve, reject) {
            if ($scope.data.usersList != null) resolve($scope.data.usersList);else {
                administrationService.auth.getUsers().then(function (list) {
                    if (list.data != null && _.has(list.data, 'list') && _.isArray(list.data.list)) {
                        $scope.data.usersList = _.clone(list.data.list);
                        resolve($scope.data.usersList);
                    }
                }, function (error) {
                    return reject(error);
                });
            }
        });
    };

    $scope.func.removeAssignedSign = function () {};

    $scope.func.todo = function () {
        return $scope.func.getRoot();
    };

    $scope.$on('featureReady', function () {
        var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(event, args) {
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context8.next = 6;
                                break;
                            }

                            _context8.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context8.sent;

                            //TODO login with server
                            $scope.func.todo();

                        case 6:
                            _context8.next = 11;
                            break;

                        case 8:
                            _context8.prev = 8;
                            _context8.t0 = _context8["catch"](0);

                            console.error(_context8.t0);

                        case 11:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, _this, [[0, 8]]);
        }));

        return function (_x11, _x12) {
            return _ref8.apply(this, arguments);
        };
    }());
    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        try {

                            //TODO clear all interval and timeouts
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                        while (1) {
                                            switch (_context9.prev = _context9.next) {
                                                case 0:
                                                    _context9.prev = 0;
                                                    _context9.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context9.next = 8;
                                                    break;

                                                case 5:
                                                    _context9.prev = 5;
                                                    _context9.t0 = _context9["catch"](0);

                                                    console.error(_context9.t0);

                                                case 8:
                                                case "end":
                                                    return _context9.stop();
                                            }
                                        }
                                    }, _callee9, _this, [[0, 5]]);
                                }));

                                return function (_x13, _x14) {
                                    return _ref10.apply(this, arguments);
                                };
                            }());
                            //TODO  clear all data and functions inside scope
                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, _this);
    })));
};

exports.default = assignDigitalSign;


assignDigitalSign.$inject = ['$scope', '$state', '$compile', 'administrationService', 'toaster', '$uibModal', '$upload'];