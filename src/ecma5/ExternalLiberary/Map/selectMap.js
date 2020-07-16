'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var selectMapCtrl = function selectMapCtrl(uibModal, _service, _JS, _mapObject) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: '/ecma5/ExternalLiberary/Map/selectMap.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, $upload, $translate, toaster, service, root, JS, mapObject) {

                $scope.data = {
                    isCreate: mapObject.imageUuid == -1,
                    isFirstTime: false,
                    metadatas: null,
                    selectMetadata: null,

                    query: _.clone(mapObject.query),

                    upload: {},
                    file: {},
                    startUpload: false,

                    state: 'title',
                    Object: {
                        title: mapObject.title,
                        description: mapObject.description
                    },

                    removeExternalFuncs: {},
                    id: null,

                    dbClicked: 0,
                    tree: {},
                    pointer: {},
                    nodes: {},
                    root: _.clone(root),
                    selectedFileOrFolder: null,
                    currentNodeCount: -1,
                    documents: [],

                    imageFormat: ['image/tiff', 'image/gif', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/vnd.dwg', 'image/vnd.dxf']
                };

                $scope.func = {};

                $scope.externalScope = {
                    InitializationForm: null,
                    externalFuncs: {
                        'editMetadataFrom': null
                    },
                    internalFuncs: {
                        'editMetadataFrom': function editMetadataFrom(CloneProperties) {
                            var query = {};

                            var _loop = function _loop(i) {

                                if (_.has($scope.data.metadata.properties[i], 'notActive') && $scope.data.metadata.properties[i].notActive == true) return 'continue';

                                var name = $scope.data.metadata.properties[i].name;

                                switch (CloneProperties[name].objClass) {
                                    case 'com.openkm.bean.form.Input':
                                        if (_.has($scope.data.metadata.properties[i], 'type')) switch ($scope.data.metadata.properties[i].type) {
                                            case 'date':
                                                if (_.isDate(CloneProperties[name].value)) $scope.data.metadata.properties[i].value = CloneProperties[name].value.toISOString();
                                                break;
                                            case 'text':
                                            case 'number':
                                            case 'email':
                                            case 'link':
                                                $scope.data.metadata.properties[i].value = _.clone(CloneProperties[name].value);
                                                break;
                                        }
                                        if (!_.includes([null, ""], $scope.data.metadata.properties[i].value)) query[name] = {
                                            id: mapObject.id,
                                            key: name,
                                            value: $scope.data.metadata.properties[i].value
                                        };
                                        break;
                                    case 'com.openkm.bean.form.Select':
                                        if (_.has($scope.data.metadata.properties[i], 'type')) {

                                            if (!_.isArray($scope.data.metadata.properties[i].options)) {
                                                if ($scope.data.metadata.properties[i].options != null) $scope.data.metadata.properties[i].options = [$scope.data.metadata.properties[i].options];else $scope.data.metadata.properties[i].options = [];
                                            }

                                            (function () {
                                                switch ($scope.data.metadata.properties[i].type) {
                                                    case 'simple':
                                                        _.map($scope.data.metadata.properties[i].options, function (option) {
                                                            return option.selected = false;
                                                        });
                                                        if (CloneProperties[name].selected != null) {
                                                            var index = _.findIndex($scope.data.metadata.properties[i].options, function (option) {
                                                                return option.value == CloneProperties[name].selected.value;
                                                            });
                                                            if (index >= 0) {
                                                                $scope.data.metadata.properties[i].options[index].selected = true;
                                                                query[name] = {
                                                                    id: mapObject.id,
                                                                    key: name,
                                                                    value: CloneProperties[name].selected.value //label
                                                                };
                                                            }
                                                        }
                                                        break;
                                                    case 'multiple':
                                                        var selectedValues = _.map(CloneProperties[name].selected, 'value');
                                                        _.map($scope.data.metadata.properties[i].options, function (option) {
                                                            return option.selected = _.includes(selectedValues, option.value);
                                                        });
                                                        _.forEach(CloneProperties[name].selected, function (select) {
                                                            query[name] = {
                                                                id: mapObject.id,
                                                                key: name,
                                                                /*value: select.label*/
                                                                value: select.value
                                                            };
                                                        });
                                                        break;
                                                }
                                            })();
                                        }
                                        break;
                                    case 'com.openkm.bean.form.TextArea':
                                    case 'com.openkm.bean.form.CheckBox':
                                        $scope.data.metadata.properties[i].value = _.clone(CloneProperties[name].value);
                                        if (!_.includes([null, "", false], $scope.data.metadata.properties[i].value)) query[name] = {
                                            id: mapObject.id,
                                            key: name,
                                            value: $scope.data.metadata.properties[i].value
                                        };
                                        break;
                                }
                            };

                            for (var i = 0; i < $scope.data.metadata.properties.length; i++) {
                                var _ret = _loop(i);

                                if (_ret === 'continue') continue;
                            }

                            $uibModalInstance.close({
                                image: mapObject.imageUuid == -1 ? $scope.data.selectedFileOrFolder : { uuid: mapObject.imageUuid },
                                title: $scope.data.Object.title,
                                description: $scope.data.Object.description,
                                query: query
                            });
                        }
                    }
                };

                $scope.func.getMetadataList = function () {
                    return new Promise(function (resolve, reject) {
                        if ($scope.data.metadatas != null) resolve($scope.data.metadatas);else {
                            service.propertyGroup.list().then(function (pgres) {
                                if (pgres.data != null) {
                                    $scope.data.metadatas = _.clone(pgres.data);
                                    resolve($scope.data.metadatas);
                                }
                            }, function (error) {
                                return reject(error);
                            });
                        }
                    });
                };

                $scope.func.changeMetaData = function () {
                    $scope.data.metadata = null;
                    if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(null, {});
                    if ($scope.data.selectMetadata != null) {
                        service.propertyGroup.form({ name: $scope.data.selectMetadata.name }).then(function (res) {
                            res.data.isMetaData = false;
                            for (var i = 0; i < res.data.properties.length; i++) {
                                if (_.has($scope.data.query, res.data.properties[i].name)) {
                                    // if id equal current node  not need disable
                                    res.data.properties[i].notActive = $scope.data.query[res.data.properties[i].name].id != mapObject.id;
                                    if (_.has(res.data.properties[i], 'options')) {
                                        var options = _.split($scope.data.query[res.data.properties[i].name].value, ',');
                                        for (var j = 0; j < res.data.properties[i].options.length; j++) {
                                            if (_.includes(options, res.data.properties[i].options[j].value)) res.data.properties[i].options[j].selected = true;
                                        }
                                    } else if (_.has(res.data.properties[i], 'value')) res.data.properties[i].value = $scope.data.query[res.data.properties[i].name].value;
                                }
                            }

                            $scope.data.metadata = _.clone(res.data);
                            if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm($scope.data.metadata.properties, {
                                /*classSpliter  :  'col-sm-6',*/
                                service: service
                            });
                        });
                    }
                };

                $scope.func.selectState = function (state) {
                    $scope.data.state = state;
                    _.defer(function () {
                        return $scope.$apply();
                    });
                };

                $scope.func.treeView = {
                    changeCurrentNode: function () {
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(node, collapsed, path) {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            $scope.data.tree.currentNode = node;
                                            if (typeof collapsed !== 'undefined') $scope.data.tree.currentNode.collapsed = collapsed;
                                            $scope.data.selectedFileOrFolder = node;

                                            if (!($scope.data.tree.currentNode && $scope.data.tree.currentNode.hasChildrenFolder)) {
                                                _context.next = 10;
                                                break;
                                            }

                                            _context.next = 6;
                                            return JS.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                        case 6:
                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';

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

                                            _context.next = 11;
                                            break;

                                        case 10:
                                            $scope.func.selectFolder($scope.data.tree.currentNode, path);

                                        case 11:
                                        case 'end':
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

                $scope.func.selectFolder = function () {
                    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(folder, path) {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        _context2.next = 2;
                                        return JS.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                    case 2:
                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';
                                        _context2.next = 5;
                                        return JS.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                    case 5:
                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType';

                                        folder.uuid = folder.id;
                                        $scope.data.selectedFileOrFolder = folder;

                                        $scope.data.list = [];
                                        if (folder.children && _.isArray(folder.children) && folder.children.length > 0) {
                                            _.forEach(folder.children, function (v) {
                                                $scope.data.list.push({
                                                    type: v.type,
                                                    thumbnailSrc: '../../../../static/image/folder' + (v.hasChildrenFolder ? 's' : '') + '.png',
                                                    selected: false,
                                                    uuid: v.uuid || v.id,
                                                    id: v.uuid || v.id,
                                                    name: v.label,
                                                    label: v.label,
                                                    path: v.path,
                                                    hasChildrenFolder: v.hasChildrenFolder,
                                                    permissions: v.permissions,
                                                    collapsed: v.collapsed
                                                });
                                            });
                                        }
                                        service.document.listChild(folder.id).then(function (res) {

                                            if (res.data != null) {
                                                res.data = res.data.filter(function (file) {
                                                    return _.findIndex($scope.data.imageFormat, function (i) {
                                                        return i == file.mimeType;
                                                    }) >= 0;
                                                });
                                                _.forEach(res.data, function (v) {
                                                    v.name = getNameFromPath(v.path);
                                                    v.label = v.name;
                                                    v.type = 'FILE';
                                                    v.mimeType = v.mimeType == 'application/octet-stream' ? getNameFromPath(v.name.split('.').pop()) : v.mimeType;
                                                    v.selected = false;
                                                    v.thumbnailSrc = getSrcFromType(v.mimeType);
                                                    service.document.thumbnail(v, 0, 75).then(function (result) {
                                                        v.thumbnailSrc = "data:image/png;base64," + result.data;
                                                    }, function (error) {
                                                        v.thumbnailSrc = getSrcFromType(v.mimeType);
                                                        v.notShowFile = true;
                                                    });
                                                    if (v.hasOwnProperty('notes')) v.hasNotes = true;
                                                    if (typeof path !== "undefined" && path == v.path) {
                                                        v.selected = true;
                                                        $scope.data.selectedFileOrFolder = v;
                                                    }

                                                    $scope.data.list.push(v);
                                                });
                                            }
                                        }, function (error) {
                                            return console.error(error);
                                        });

                                    case 11:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, _this);
                    }));

                    return function (_x4, _x5) {
                        return _ref2.apply(this, arguments);
                    };
                }();

                $scope.func.clickInDoc = function () {
                    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(doc) {
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        $scope.data.docSelected = angular.copy(doc);

                                    case 1:
                                    case 'end':
                                        return _context3.stop();
                                }
                            }
                        }, _callee3, _this);
                    }));

                    return function (_x6) {
                        return _ref3.apply(this, arguments);
                    };
                }();

                $scope.func.selectFile = function (doc) {
                    return $scope.data.selectedFileOrFolder = _.clone(doc);
                };

                $scope.func.dbClickInDoc = function () {
                    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(doc, pathing) {
                        var paths, path;
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                                switch (_context5.prev = _context5.next) {
                                    case 0:

                                        if (doc.type == 'FILE') $scope.func.clickInDoc(doc);else {
                                            _.forEach($scope.data.nodes, function (node) {
                                                return node.collapsed = true;
                                            });

                                            paths = _.remove(_.split(doc.path.trim(), "/"), function (v) {
                                                return v != "";
                                            });
                                            path = '/' + paths.shift();

                                            if (_.has($scope.data.nodes, doc.path)) {
                                                $scope.data.nodes[doc.path].collapsed = false;
                                                while (paths.length > 0) {
                                                    path = path + '/' + paths.shift();
                                                    $scope.data.nodes[path].collapsed = false;
                                                }
                                                $scope.func.treeView.changeCurrentNode($scope.data.pointer[doc.uuid], false, pathing);
                                            } else {

                                                $scope.data.list = [];

                                                service.folder.listChild(doc.id).then(function () {
                                                    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(result) {
                                                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                                            while (1) {
                                                                switch (_context4.prev = _context4.next) {
                                                                    case 0:
                                                                        _context4.next = 2;
                                                                        return JS.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                                                    case 2:
                                                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';

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
                                                                                    type: 'FOLDER'
                                                                                });
                                                                            });
                                                                            $scope.func.selectFolder(doc);
                                                                        }

                                                                    case 4:
                                                                    case 'end':
                                                                        return _context4.stop();
                                                                }
                                                            }
                                                        }, _callee4, _this);
                                                    }));

                                                    return function (_x9) {
                                                        return _ref5.apply(this, arguments);
                                                    };
                                                }(), function (error) {});
                                            }
                                        }

                                    case 1:
                                    case 'end':
                                        return _context5.stop();
                                }
                            }
                        }, _callee5, _this);
                    }));

                    return function (_x7, _x8) {
                        return _ref4.apply(this, arguments);
                    };
                }();

                $scope.func.addFiles = function (files) {

                    if (files.length == 0) return;

                    $scope.data.file = {
                        file: files[0],
                        isSelect: false

                    };

                    $scope.func.startUpload();
                };

                $scope.func.onRemoveFileClick = function () {
                    try {
                        if (!_.isEqual($scope.data.upload, {})) {
                            $scope.data.upload.upload.abort();
                            $scope.data.upload = {};
                        }
                        $scope.data.file = null;
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.onCancelFileClick = function () {
                    try {
                        if (!_.isEqual($scope.data.upload, {})) {
                            $scope.data.upload.upload.abort();
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.uploadAgain = function () {
                    if (!_.isEqual($scope.data.upload, {}) && $scope.data.upload.status == 'ERROR') $scope.func.startUpload();
                };

                $scope.func.startUpload = function () {

                    if (isCookieFunction("Authorization") != null) {

                        if (_.isEqual($scope.data.file, {})) {
                            toaster.pop('error', "", "لطفا یک سند انتخاب کنید");
                            $scope.data.startUpload = false;
                        } else {
                            var _ret3 = function () {

                                var parentFolder = null;
                                if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.type == "FOLDER") {
                                    parentFolder = _.clone($scope.data.selectedFileOrFolder);
                                } else if (typeof $scope.data.tree.currentNode !== "undefined") {
                                    parentFolder = _.clone($scope.data.tree.currentNode);
                                }

                                if (parentFolder == null) {
                                    toaster.pop('error', "", "لطفا یک پوشه انتخاب کنید");
                                    $scope.data.startUpload = false;
                                    return {
                                        v: void 0
                                    };
                                } else {
                                    $scope.data.startUpload = true;
                                    $scope.data.upload = {
                                        percent: 0,
                                        filename: $scope.data.file.file.name,
                                        path: parentFolder.path + '/' + $scope.data.file.file.name,
                                        status: "SEND",
                                        upload: $upload.upload({
                                            url: '/KeydocPro/services/rest/document/createSimple',
                                            data: {
                                                docPath: parentFolder.path + '/' + $scope.data.file.file.name,
                                                isSigned: false,
                                                content: $scope.data.file.file,
                                                sizeOfFile: $scope.data.file.file.size
                                            },
                                            headers: { 'Authorization': decodeURIComponent(_.replace(isCookieFunction("Authorization"), "Bearer", "Bearer ")) }
                                        }).progress(function (evt) {
                                            _.defer(function () {
                                                $scope.$apply($scope.data.upload.percent = parseInt(100.0 * evt.loaded / evt.total));
                                            });
                                        }).success(function (data, status, headers, config) {
                                            $scope.data.upload.status = 'SUCCESS';
                                            _.defer(function () {
                                                return $scope.$apply($scope.data.upload.percent = 100);
                                            });
                                            $scope.func.dbClickInDoc(parentFolder, parentFolder.path + '/' + $scope.data.file.file.name);
                                        }).error(function (error) {
                                            $scope.data.upload.status = 'ERROR';
                                            _.defer(function () {
                                                return $scope.$apply($scope.data.upload.percent = 100);
                                            });
                                        })
                                    };
                                }
                            }();

                            if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
                        }
                    } else {
                        toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                        $scope.func.cancel();
                    }
                };

                $scope.func.translate = function () {
                    if (_.includes([null, ""], $scope.data.Object.title)) {
                        toaster.pop('error', "", "لطفا یک عنوان انتخاب کنید");
                        return;
                    }
                    if ($scope.data.isCreate && ($scope.data.selectedFileOrFolder == null || $scope.data.selectedFileOrFolder.type == "FOLDER")) {
                        toaster.pop('error', "", "لطفا یک تصویر انتخاب کنید");
                        return;
                    }

                    $scope.externalScope.externalFuncs.editMetadataFrom();
                };

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.$on("$destroy", function () {
                    try {

                        _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                            var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(funcName, src) {
                                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                    while (1) {
                                        switch (_context6.prev = _context6.next) {
                                            case 0:
                                                _context6.prev = 0;
                                                _context6.next = 3;
                                                return JS.removeJS(src, funcName);

                                            case 3:
                                                _context6.next = 8;
                                                break;

                                            case 5:
                                                _context6.prev = 5;
                                                _context6.t0 = _context6['catch'](0);

                                                console.error(_context6.t0);

                                            case 8:
                                            case 'end':
                                                return _context6.stop();
                                        }
                                    }
                                }, _callee6, _this, [[0, 5]]);
                            }));

                            return function (_x10, _x11) {
                                return _ref6.apply(this, arguments);
                            };
                        }());
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
                service: function service() {
                    return _service;
                },
                root: function root() {
                    return _service.repository.getRoot('getRootFolder').then(function (result) {
                        return result.data;
                    });
                },
                JS: function JS() {
                    return _JS;
                },
                mapObject: function mapObject() {
                    return _mapObject;
                }
            }
        });

        modalInstance.result.then(function (response) {
            if (response) {
                resolve({
                    id: _mapObject.id,
                    parentId: _mapObject.parentId,
                    image: response.image.uuid,
                    description: response.description,
                    title: response.title,
                    queryItems: response.query,
                    query: 'id=' + _mapObject.id + '&query=' + JSON.stringify(_.keyBy(_.map(_.filter(response.query, function (i) {
                        return i.id == _mapObject.id;
                    }), function (j) {
                        return { key: j.key, value: j.value };
                    }), 'key')) + '&parentId=' + _mapObject.parentId + '&imageUuid=' + response.image.uuid + '&coordinate=' + _mapObject.coordinate + '&style=' + _mapObject.style + '&type=' + _mapObject.type + '&title=' + response.title + '&description=' + response.description
                });
            } else reject('مشکل');
        }, function (error) {
            return reject('مشکل');
        });
    });
};