"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var selectTemplateCtrl = function selectTemplateCtrl(uibModal, _JS, _service, _rootPath, _PATH) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Desktop/selectTemplate.html?dev=" + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, JS, service, rootPath, PATH) {

                $scope.data = {

                    removeExternalFuncs: {},

                    dbClicked: 0,

                    docSelected: null,

                    state: 'image',

                    file: {
                        name: "",
                        extension: ""
                    },
                    isNotReadyMetaData: true,
                    notMetadataContent: true,

                    tree: {},
                    pointer: {},
                    nodes: {},
                    root: null,
                    selectedFileOrFolder: null,
                    currentNodeCount: -1,
                    documents: [],

                    byCategories: false,
                    byKeywords: false,
                    byNotes: false,
                    byPropertyGroups: false,

                    PropertyGroup: null,
                    formMetadata: null

                };

                $scope.func = {};

                $scope.externalScope = {
                    InitializationForm: null,
                    externalFuncs: {
                        'editMetadataFrom': null
                    },
                    internalFuncs: {
                        'editMetadataFrom': function () {
                            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(CloneProperties) {
                                var _loop, i;

                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.prev = 0;
                                                _context.next = 3;
                                                return $scope.func.readyForm();

                                            case 3:

                                                if (typeof CloneProperties !== "undefined" && CloneProperties != null) {
                                                    _loop = function _loop(i) {
                                                        var name = $scope.data.PropertyGroup.properties[i].name;

                                                        switch (CloneProperties[name].objClass) {
                                                            case 'com.openkm.bean.form.Input':
                                                                if (_.has($scope.data.PropertyGroup.properties[i], 'type')) switch ($scope.data.PropertyGroup.properties[i].type) {
                                                                    case 'date':
                                                                        if (_.isDate(CloneProperties[name].value)) $scope.data.PropertyGroup.properties[i].value = CloneProperties[name].value.toISOString();
                                                                        break;
                                                                    case 'text':
                                                                    case 'number':
                                                                    case 'email':
                                                                    case 'link':
                                                                        $scope.data.PropertyGroup.properties[i].value = _.clone(CloneProperties[name].value);
                                                                        break;
                                                                }
                                                                break;
                                                            case 'com.openkm.bean.form.Select':
                                                                if (_.has($scope.data.PropertyGroup.properties[i], 'type')) {

                                                                    if (!_.isArray($scope.data.PropertyGroup.properties[i].options)) {
                                                                        if ($scope.data.PropertyGroup.properties[i].options != null) $scope.data.PropertyGroup.properties[i].options = [$scope.data.PropertyGroup.properties[i].options];else $scope.data.PropertyGroup.properties[i].options = [];
                                                                    }
                                                                    switch ($scope.data.PropertyGroup.properties[i].type) {
                                                                        case 'simple':
                                                                            _.map($scope.data.PropertyGroup.properties[i].options, function (option) {
                                                                                return option.selected = false;
                                                                            });
                                                                            if (_.has(CloneProperties[name], 'selected') && CloneProperties[name].selected != null) {
                                                                                $scope.data.PropertyGroup.properties[i].selected = angular.copy(CloneProperties[name].selected);
                                                                                var index = _.findIndex($scope.data.PropertyGroup.properties[i].options, function (option) {
                                                                                    return option.value == CloneProperties[name].selected.value;
                                                                                });
                                                                                if (index >= 0) $scope.data.PropertyGroup.properties[i].options[index].selected = true;
                                                                            }
                                                                            break;
                                                                        case 'multiple':
                                                                            _.map($scope.data.PropertyGroup.properties[i].options, function (option) {
                                                                                return option.selected = false;
                                                                            });
                                                                            if (_.has(CloneProperties[name], 'selected') && CloneProperties[name].selected != null) {
                                                                                (function () {
                                                                                    var selected = _.isArray(CloneProperties[name].selected) ? CloneProperties[name].selected : [CloneProperties[name].selected];
                                                                                    $scope.data.PropertyGroup.properties[i].selected = _.clone(selected);
                                                                                    var selectedValues = _.map(selected, 'value');
                                                                                    _.map($scope.data.PropertyGroup.properties[i].options, function (option) {
                                                                                        return option.selected = _.includes(selectedValues, option.value);
                                                                                    });
                                                                                })();
                                                                            }
                                                                            break;
                                                                    }
                                                                }
                                                                break;
                                                            case 'com.openkm.bean.form.TextArea':
                                                            case 'com.openkm.bean.form.CheckBox':
                                                                $scope.data.PropertyGroup.properties[i].value = _.clone(CloneProperties[name].value);
                                                                break;
                                                        }
                                                    };

                                                    for (i = 0; i < $scope.data.PropertyGroup.properties.length; i++) {
                                                        _loop(i);
                                                    }

                                                    $scope.data.properties = angular.copy($scope.data.PropertyGroup.properties);
                                                }

                                                $scope.func.generateQuery();

                                                _context.next = 10;
                                                break;

                                            case 7:
                                                _context.prev = 7;
                                                _context.t0 = _context["catch"](0);

                                                console.error(_context.t0);

                                            case 10:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this, [[0, 7]]);
                            }));

                            function editMetadataFrom(_x) {
                                return _ref.apply(this, arguments);
                            }

                            return editMetadataFrom;
                        }()
                    }
                };

                $scope.func.readyForm = function () {
                    return new Promise(function (res, rej) {
                        try {
                            if ($scope.data.docSelected == null) {
                                toaster.pop('error', '', 'لطفا یک سند انتخاب کنید.');
                                rej(e);
                            }
                            res(true);
                        } catch (e) {
                            rej(e);
                        }
                    });
                };
                $scope.func.generateQuery = function () {
                    var query = "";
                    try {
                        query += "tplPath=" + $scope.data.docSelected.path + "&";
                        query += "destinationPath=" + PATH + "&";
                        //query+= `docName=${$scope.data.file.name}${$scope.data.file.extension == '.odt' ? '.doc' : $scope.data.file.extension}&`;
                        query += "docName=" + $scope.data.file.name + ($scope.data.file.extension == '.odt' ? '.odt' : $scope.data.file.extension) + "&";

                        if (typeof $scope.data.properties !== "undefined" && _.isArray($scope.data.properties)) {

                            for (var i = 0; i < $scope.data.properties.length; i++) {
                                if (_.has($scope.data.properties[i], 'options') && _.has($scope.data.properties[i], 'selected') && $scope.data.properties[i].selected != null) {
                                    if (_.isArray($scope.data.properties[i].selected)) query += "property=" + $scope.data.properties[i].name + "=" + _.join(_.map($scope.data.properties[i].selected, 'value'), ',') + "&";else query += "property=" + $scope.data.properties[i].name + "=" + $scope.data.properties[i].selected.value + "&";
                                } else if (_.has($scope.data.properties[i], 'value') && !_.includes([null, ""], $scope.data.properties[i].value)) {
                                    query += "property=" + $scope.data.properties[i].name + "=" + $scope.data.properties[i].value + "&";
                                }
                            }
                        }
                        query += "byCategories=" + $scope.data.byCategories + "&";
                        query += "byKeywords=" + $scope.data.byKeywords + "&";
                        query += "byNotes=" + $scope.data.byNotes + "&";
                        query += "byPropertyGroups=" + $scope.data.byPropertyGroups + "&";
                        if (query.endsWith("&")) query = query.slice(0, query.length - 1);
                        $uibModalInstance.close(query);
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.clearMetaData = function () {
                    $scope.data.file = {
                        name: "",
                        extension: ""
                    };
                    $scope.func.isNotReadyMetaData = true;
                    $scope.func.PropertyGroup = null;
                    if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(null, {});
                    _.defer(function () {
                        return $scope.$apply();
                    });
                };

                $scope.func.treeView = {
                    changeCurrentNode: function () {
                        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(node, collapsed, path) {
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            $scope.func.clearMetaData();
                                            $scope.data.tree.currentNode = node;
                                            if (typeof collapsed !== 'undefined') $scope.data.tree.currentNode.collapsed = collapsed;
                                            $scope.data.selectedFileOrFolder = node;

                                            if (!($scope.data.tree.currentNode && $scope.data.tree.currentNode.hasChildrenFolder)) {
                                                _context2.next = 11;
                                                break;
                                            }

                                            _context2.next = 7;
                                            return JS.addJS("ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName);

                                        case 7:
                                            $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName] = 'getNameFromPath';

                                            service.folder.listChild($scope.data.tree.currentNode.id).then(function (result) {
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

                                            _context2.next = 12;
                                            break;

                                        case 11:
                                            $scope.func.selectFolder($scope.data.tree.currentNode, path);

                                        case 12:
                                        case "end":
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, _this);
                        }));

                        function changeCurrentNode(_x2, _x3, _x4) {
                            return _ref2.apply(this, arguments);
                        }

                        return changeCurrentNode;
                    }()
                };

                $scope.func.getThumbnailFile = function (file, getSrcFromType) {
                    return new Promise(function (resolve, reject) {
                        try {
                            service.document.thumbnail(file, 0, 75).then(function (result) {
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
                    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(list) {
                        var i;
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        _context3.prev = 0;
                                        _context3.next = 3;
                                        return JS.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                                    case 3:
                                        $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType';
                                        i = 0;

                                    case 5:
                                        if (!(i < list.length)) {
                                            _context3.next = 19;
                                            break;
                                        }

                                        _context3.prev = 6;

                                        if (!(_.has(list[i], "type") && list[i].type == "FILE")) {
                                            _context3.next = 11;
                                            break;
                                        }

                                        _context3.next = 10;
                                        return $scope.func.getThumbnailFile(list[i], getSrcFromType);

                                    case 10:
                                        list[i].thumbnailSrc = _context3.sent;

                                    case 11:
                                        _context3.next = 16;
                                        break;

                                    case 13:
                                        _context3.prev = 13;
                                        _context3.t0 = _context3["catch"](6);

                                        console.error(_context3.t0);

                                    case 16:
                                        i++;
                                        _context3.next = 5;
                                        break;

                                    case 19:
                                        _context3.next = 24;
                                        break;

                                    case 21:
                                        _context3.prev = 21;
                                        _context3.t1 = _context3["catch"](0);

                                        console.error(_context3.t1);

                                    case 24:
                                    case "end":
                                        return _context3.stop();
                                }
                            }
                        }, _callee3, _this, [[0, 21], [6, 13]]);
                    }));

                    return function (_x5) {
                        return _ref3.apply(this, arguments);
                    };
                }();
                $scope.func.selectFolder = function () {
                    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(folder, path) {
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        _context4.next = 2;
                                        return JS.addJS("ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName);

                                    case 2:
                                        $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName] = 'getNameFromPath';
                                        _context4.next = 5;
                                        return JS.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                                    case 5:
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
                                        service.document.listChild(folder.id).then(function (res) {

                                            if (res.data != null) {
                                                //res.data = res.data.filter(file => _.findIndex($scope.data.imageFormat , i => i == file.mimeType)  >= 0);
                                                _.forEach(res.data, function (v) {
                                                    v.name = getNameFromPath(v.path);
                                                    v.label = v.name;
                                                    v.type = 'FILE';
                                                    v.mimeType = v.mimeType == 'application/octet-stream' ? getNameFromPath(v.name.split('.').pop()) : v.mimeType;
                                                    v.selected = false;
                                                    v.thumbnailSrc = getSrcFromType(v.mimeType);
                                                    /* service.document.thumbnail(v, 0, 75).then(
                                                         result => {
                                                             v.thumbnailSrc = "data:image/png;base64," + result.data;
                                                         }, error => {
                                                             v.thumbnailSrc = getSrcFromType(v.mimeType);
                                                             v.notShowFile = true;
                                                         });*/
                                                    if (v.hasOwnProperty('notes')) v.hasNotes = true;
                                                    if (typeof path !== "undefined" && path == v.path) {
                                                        v.selected = true;
                                                        $scope.data.selectedFileOrFolder = v;
                                                    }

                                                    $scope.data.list.push(v);
                                                });

                                                $scope.func.getImage($scope.data.list);
                                            }
                                        }, function (error) {
                                            return console.error(error);
                                        });

                                    case 11:
                                    case "end":
                                        return _context4.stop();
                                }
                            }
                        }, _callee4, _this);
                    }));

                    return function (_x6, _x7) {
                        return _ref4.apply(this, arguments);
                    };
                }();

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
                $scope.func.splitFileAndMimeType = function (file) {
                    return {
                        name: _.clone(file).replace(/\.[^/.]+$/, ""),
                        extension: /\.[^/.]+$/.exec(file)[0]
                    };
                };
                $scope.func.showImage = function () {
                    $scope.data.state = 'image';
                    _.defer(function () {
                        return $scope.$apply();
                    });
                };

                $scope.func.showMetadata = function () {
                    $scope.data.state = 'metadata';
                    _.defer(function () {
                        return $scope.$apply();
                    });
                };

                $scope.func.readyMetadata = function (file) {
                    try {
                        $scope.data.PropertyGroup = null;
                        if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(null, {});
                        service.propertyGroup.listGroup(file.path).then(function (res) {
                            if (!_.includes([null, ""], res.data.list)) {
                                if (res.data.list.length > 0) {
                                    service.propertyGroup.getGroups(file.path, res.data.list[0]).then(function (resIn) {
                                        $scope.data.PropertyGroup = _.clone(resIn.data);

                                        if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(angular.copy($scope.data.PropertyGroup.properties), { service: service, require: false });
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    }, function (error) {
                                        toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                        $scope.data.PropertyGroup = null;
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    });
                                } else {
                                    $scope.data.PropertyGroup = null;
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                }
                            } else {
                                toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                $scope.data.PropertyGroup = null;
                            }
                        }, function (error) {
                            toaster.pop('error', '', 'عدم دریافت اطلاعات');
                            $scope.data.PropertyGroup = null;
                        });
                    } catch (e) {
                        console.error(e);
                        $scope.data.PropertyGroup = null;
                    }
                };

                $scope.func.clickInDoc = function () {
                    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(doc) {
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                                switch (_context5.prev = _context5.next) {
                                    case 0:
                                        $scope.data.docSelected = angular.copy(doc);
                                        $scope.data.file = $scope.func.splitFileAndMimeType(_.clone(doc.label));
                                        $scope.data.isNotReadyMetaData = !_.includes(['.odt', '.html', '.htm'], $scope.data.file.extension);
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        if (!$scope.data.isNotReadyMetaData) $scope.func.readyMetadata($scope.data.docSelected);

                                    case 5:
                                    case "end":
                                        return _context5.stop();
                                }
                            }
                        }, _callee5, _this);
                    }));

                    return function (_x8) {
                        return _ref5.apply(this, arguments);
                    };
                }();

                $scope.func.dbClickInDoc = function () {
                    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(doc, pathing) {
                        var paths, path;
                        return regeneratorRuntime.wrap(function _callee7$(_context7) {
                            while (1) {
                                switch (_context7.prev = _context7.next) {
                                    case 0:

                                        if (doc.type == 'FILE') $scope.func.clickInDoc(doc);else {
                                            $scope.func.clearMetaData();
                                            _.forEach($scope.data.nodes, function (node) {
                                                return node.collapsed = false;
                                            });
                                            paths = _.remove(_.split(doc.path.trim(), "/"), function (v) {
                                                return v != "";
                                            });
                                            path = "/" + paths.shift();

                                            if (_.has($scope.data.nodes, doc.path)) {
                                                $scope.data.nodes[doc.path].collapsed = false;
                                                while (paths.length > 0) {
                                                    path = path + "/" + paths.shift();
                                                    $scope.data.nodes[path].collapsed = false;
                                                }
                                                $scope.func.treeView.changeCurrentNode($scope.data.pointer[doc.uuid], false, pathing);
                                            } else {
                                                $scope.data.list = [];
                                                service.folder.listChild(doc.id).then(function () {
                                                    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(result) {
                                                        return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                                            while (1) {
                                                                switch (_context6.prev = _context6.next) {
                                                                    case 0:
                                                                        _context6.next = 2;
                                                                        return JS.addJS("ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName);

                                                                    case 2:
                                                                        $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=" + randomVersionName] = 'getNameFromPath';
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

                                                                    case 4:
                                                                    case "end":
                                                                        return _context6.stop();
                                                                }
                                                            }
                                                        }, _callee6, _this);
                                                    }));

                                                    return function (_x11) {
                                                        return _ref7.apply(this, arguments);
                                                    };
                                                }(), function (error) {});
                                            }
                                        }

                                    case 1:
                                    case "end":
                                        return _context7.stop();
                                }
                            }
                        }, _callee7, _this);
                    }));

                    return function (_x9, _x10) {
                        return _ref6.apply(this, arguments);
                    };
                }();

                $scope.func.getRoot = function () {
                    try {
                        service.repository.getRoot("getTemplatesFolder").then(function (result) {
                            $scope.data.root = angular.copy(result.data);
                            $scope.data.nodes[$scope.data.root[0].path] = $scope.data.root[0];
                        }, function (error) {
                            toaster.pop('error', '', 'عدم دریافت موفقیت آمیز ریشه');
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.run = function () {
                    $scope.func.getRoot();
                };

                $scope.run();

                $scope.$on("$destroy", function () {
                    try {

                        // clear all data and functions
                        $scope.func = undefined;
                        $scope.data = undefined;
                    } catch (e) {
                        console.error(e);
                    }
                });
            },
            size: 'lg',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                JS: function JS() {
                    return _JS;
                },
                service: function service() {
                    return _service;
                },
                rootPath: function rootPath() {
                    return _rootPath;
                },
                PATH: function PATH() {
                    return _PATH;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) resolve(response);else reject('عدم ایجاد الگوی جدید');
        }, function (error) {
            return reject('عدم ایجاد الگوی جدید');
        });

        //---------------------------------------------------------------------------------------------------------------
    });
};