'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var createMetaDataFunction = function createMetaDataFunction(uibModal, _service, _dateFormatInternal, _JS, _style, _profile) {
    return new Promise(function (resolve, reject) {
        try {
            var modalInstance = uibModal.open({
                templateUrl: 'ecma5/ExternalLiberary/Public/createMetaData.html?dev=' + randomVersionName,
                controller: function controller($scope, $uibModalInstance, $translate, $upload, $compile, toaster, service, dateFormatInternal, JS, style, profile) {

                    $scope.data = {

                        profile: angular.copy(profile),
                        prfDigitalSignPermit: profile.prfDigitalSignPermit,

                        player: {},

                        viewer: {
                            type: null,
                            media: {
                                type: ""
                            },
                            pdf: {
                                url: null,
                                changeURL: null,
                                firstSearch: null,
                                isOpenfileShower: false
                            },
                            player: {
                                func: null
                            }

                        },

                        stateLookup: {
                            'selectMetadata': 'انتخاب فراداده',
                            'uploadFiles': 'افزودن سند',
                            'fillMetaData': 'ویرایش فراداده',
                            'selectTemplate': 'انتخاب الگو'
                        },
                        state: 'selectMetadata',

                        selectedImage: null,

                        createFolder: null,

                        selectMetadata: null,
                        metadata: null,
                        list: [],

                        removeExternalFuncs: {},
                        removeExternalCSS: {},

                        showFormGeneratorButtons: true,
                        fileData: null,
                        filesList: {},
                        startUpload: false,

                        CloneProperties: null,

                        minimize: {
                            right: false,
                            left: false
                        },

                        tree: {},
                        pointer: {},
                        nodes: {},
                        root: null,
                        selectedFileOrFolder: null,
                        currentNodeCount: -1,
                        documents: [],
                        TemplatePropertyGroup: null,
                        formMetadata: null,

                        isFirstTemplateSelect: false,
                        dbClicked: 0,
                        docSelected: null,
                        isNotReadyMetaData: true,
                        notMetadataContent: true,

                        byCategories: false,
                        byKeywords: false,
                        byNotes: false,
                        byPropertyGroups: false

                    };

                    $scope.func = {};
                    $scope.func.goState = function () {
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(state) {
                            var key;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.t0 = $scope.data.state;
                                            _context.next = _context.t0 === 'selectMetadata' ? 3 : _context.t0 === 'selectTemplate' ? 15 : _context.t0 === 'uploadFiles' ? 17 : _context.t0 === 'fillMetaData' ? 39 : 41;
                                            break;

                                        case 3:
                                            _context.prev = 3;
                                            _context.next = 6;
                                            return $scope.func.createMetaDataItem();

                                        case 6:
                                            toaster.pop("success", "", "فراداده با موفقیت ایجاد گردید.");
                                            $scope.data.state = state;
                                            if (!$scope.data.isFirstTemplateSelect) {
                                                $scope.data.isFirstTemplateSelect = true;
                                                $scope.func.getRoot();
                                            }

                                            _context.next = 14;
                                            break;

                                        case 11:
                                            _context.prev = 11;
                                            _context.t1 = _context['catch'](3);

                                            toaster.pop("error", "", _context.t1.message || _context.t1);

                                        case 14:
                                            return _context.abrupt('break', 41);

                                        case 15:
                                            try {
                                                $scope.data.state = state;
                                            } catch (e) {
                                                toaster.pop("error", "", e.message || e);
                                            }
                                            return _context.abrupt('break', 41);

                                        case 17:
                                            if (!(_.filter($scope.data.filesList, function (upload) {
                                                return upload.status == "Sending";
                                            }).length > 0)) {
                                                _context.next = 21;
                                                break;
                                            }

                                            toaster.pop("warning", "", "لطفا تا ارسال کامل سند ها منتظر بمانید.");
                                            _context.next = 38;
                                            break;

                                        case 21:
                                            _context.t2 = regeneratorRuntime.keys($scope.data.filesList);

                                        case 22:
                                            if ((_context.t3 = _context.t2()).done) {
                                                _context.next = 36;
                                                break;
                                            }

                                            key = _context.t3.value;

                                            if (!($scope.data.filesList[key].status == "Error")) {
                                                _context.next = 34;
                                                break;
                                            }

                                            console.info(key);
                                            _context.prev = 26;
                                            _context.next = 29;
                                            return service.document.remove($scope.data.filesList[key].Upload.path);

                                        case 29:
                                            _context.next = 34;
                                            break;

                                        case 31:
                                            _context.prev = 31;
                                            _context.t4 = _context['catch'](26);

                                            console.error(_context.t4);

                                        case 34:
                                            _context.next = 22;
                                            break;

                                        case 36:

                                            if (state == "fillMetaData") {
                                                $scope.func.fillMetadata();
                                            } else {
                                                if (!$scope.data.isFirstTemplateSelect) {
                                                    $scope.data.isFirstTemplateSelect = true;
                                                    $scope.func.getRoot();
                                                }
                                            }
                                            $scope.data.state = state;

                                        case 38:
                                            return _context.abrupt('break', 41);

                                        case 39:

                                            $scope.data.state = state;
                                            return _context.abrupt('break', 41);

                                        case 41:
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });

                                        case 42:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined, [[3, 11], [26, 31]]);
                        }));

                        return function (_x) {
                            return _ref.apply(this, arguments);
                        };
                    }();

                    /*todo ************************ state = Select Template ***************************************/
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
                    $scope.func.templateClickImage = function (e, doc) {
                        $scope.data.dbClicked = e.detail || e.originalEvent.detail;
                        $scope.data.selectedFileOrFolder = _.clone(doc);

                        switch ($scope.data.dbClicked) {
                            case 1:
                                /* TODO click in image */
                                setTimeout(function () {
                                    if ($scope.data.dbClicked == 1) {
                                        $scope.data.dbClicked = 0;
                                        $scope.func.clickInDocTemplate(doc);
                                    }
                                }, 500);
                                break;
                            case 2:
                                /* TODO double click in image */
                                $scope.func.dbClickInDocTemplate(doc);

                                break;
                            default:
                                break;
                        }
                    };
                    $scope.func.clickInDocTemplate = function () {
                        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(doc) {
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            $scope.data.docSelected = angular.copy(doc);
                                            $scope.data.file = $scope.func.splitFileAndMimeType(_.clone(doc.label));
                                            $scope.data.isNotReadyMetaData = !_.includes(['.odt', '.html', '.htm'], $scope.data.file.extension);
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            if (!$scope.data.isNotReadyMetaData) $scope.func.readyMetadata($scope.data.docSelected);

                                        case 5:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, undefined);
                        }));

                        return function (_x2) {
                            return _ref2.apply(this, arguments);
                        };
                    }();
                    $scope.func.dbClickInDocTemplate = function () {
                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(doc, pathing) {
                            var paths, path;
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:

                                            if (doc.type == 'FILE') $scope.func.clickInDoc(doc);else {
                                                $scope.func.clearMetaDataTemplate();
                                                _.forEach($scope.data.nodes, function (node) {
                                                    return node.collapsed = false;
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
                                                        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(result) {
                                                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                                while (1) {
                                                                    switch (_context3.prev = _context3.next) {
                                                                        case 0:
                                                                            _context3.next = 2;
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
                                                                                        type: 'FOLDER',
                                                                                        subscribed: _.has(res, 'subscribed') ? res.subscribed : false
                                                                                    });
                                                                                });
                                                                                $scope.func.selectFolder(doc);
                                                                            }

                                                                        case 4:
                                                                        case 'end':
                                                                            return _context3.stop();
                                                                    }
                                                                }
                                                            }, _callee3, undefined);
                                                        }));

                                                        return function (_x5) {
                                                            return _ref4.apply(this, arguments);
                                                        };
                                                    }(), function (error) {});
                                                }
                                            }

                                        case 1:
                                        case 'end':
                                            return _context4.stop();
                                    }
                                }
                            }, _callee4, undefined);
                        }));

                        return function (_x3, _x4) {
                            return _ref3.apply(this, arguments);
                        };
                    }();
                    $scope.func.readyMetadata = function (file) {
                        try {
                            $scope.data.TemplatePropertyGroup = null;
                            if (_.isFunction($scope.templateExternalScope.InitializationForm)) $scope.templateExternalScope.InitializationForm(null, {});
                            service.propertyGroup.listGroup(file.path).then(function (res) {
                                if (!_.includes([null, ""], res.data.list)) {
                                    if (res.data.list.length > 0) {
                                        service.propertyGroup.getGroups(file.path, res.data.list[0]).then(function (resIn) {
                                            $scope.data.TemplatePropertyGroup = _.clone(resIn.data);

                                            if (_.isFunction($scope.templateExternalScope.InitializationForm)) $scope.templateExternalScope.InitializationForm(angular.copy($scope.data.TemplatePropertyGroup.properties), { service: service, require: false });
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        }, function (error) {
                                            toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                            $scope.data.TemplatePropertyGroup = null;
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        });
                                    } else {
                                        $scope.data.TemplatePropertyGroup = null;
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    }
                                } else {
                                    toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                    $scope.data.TemplatePropertyGroup = null;
                                }
                            }, function (error) {
                                toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                $scope.data.TemplatePropertyGroup = null;
                            });
                        } catch (e) {
                            console.error(e);
                            $scope.data.TemplatePropertyGroup = null;
                        }
                    };
                    $scope.func.splitFileAndMimeType = function (file) {
                        return {
                            name: _.clone(file).replace(/\.[^/.]+$/, ""),
                            extension: /\.[^/.]+$/.exec(file)[0]
                        };
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
                            query += 'tplPath=' + $scope.data.docSelected.path + '&';
                            query += 'destinationPath=' + $scope.data.createFolder.path + '&';
                            //query+= `docName=${$scope.data.file.name}${$scope.data.file.extension == '.odt' ? '.doc' : $scope.data.file.extension}&`;
                            query += 'docName=' + $scope.data.file.name + ($scope.data.file.extension == '.odt' ? '.odt' : $scope.data.file.extension) + '&';

                            if (typeof $scope.data.templatPproperties !== "undefined" && _.isArray($scope.data.templatPproperties)) {

                                for (var i = 0; i < $scope.data.templatPproperties.length; i++) {
                                    if (_.has($scope.data.templatPproperties[i], 'options') && _.has($scope.data.templatPproperties[i], 'selected') && $scope.data.templatPproperties[i].selected != null) {
                                        if (_.isArray($scope.data.templatPproperties[i].selected)) query += 'property=' + $scope.data.templatPproperties[i].name + '=' + _.join(_.map($scope.data.templatPproperties[i].selected, 'value'), ',') + '&';else query += 'property=' + $scope.data.templatPproperties[i].name + '=' + $scope.data.templatPproperties[i].selected.value + '&';
                                    } else if (_.has($scope.data.templatPproperties[i], 'value') && !_.includes([null, ""], $scope.data.templatPproperties[i].value)) {
                                        query += 'property=' + $scope.data.templatPproperties[i].name + '=' + $scope.data.templatPproperties[i].value + '&';
                                    }
                                }
                            }
                            query += 'byCategories=' + $scope.data.byCategories + '&';
                            query += 'byKeywords=' + $scope.data.byKeywords + '&';
                            query += 'byNotes=' + $scope.data.byNotes + '&';
                            query += 'byPropertyGroups=' + $scope.data.byPropertyGroups + '&';
                            if (query.endsWith("&")) query = query.slice(0, query.length - 1);

                            console.info("query");
                            console.log(query);

                            service.document.createFromTemplate(query).then(function (res) {
                                console.log(res);
                                toaster.pop("success", "", "قالب با موفقیت ایجاد گردید.");
                            }, function (err) {
                                toaster.pop("error", "", "مشکلی در ایجاد قالب به وجود آمده است.");
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.editMetaDataTemplate = function () {
                        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(CloneProperties, form) {
                            var error, keys, i, _loop, _i;

                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                    switch (_context5.prev = _context5.next) {
                                        case 0:
                                            _context5.next = 2;
                                            return $scope.func.readyForm();

                                        case 2:
                                            error = false;
                                            keys = _.keys(CloneProperties);

                                            if (_.has(form.$error, 'pattern') && _.isArray(form.$error.pattern) && form.$error.pattern.length > 0) reject('لطفا الگوهای درست وارد کنید');
                                            if (_.has(form.$error, 'required') && _.isArray(form.$error.required) && form.$error.required.length > 0) {
                                                if (form.$invalid) {
                                                    _.forEach(form.$error, function (field) {
                                                        _.forEach(field, function (errorField) {
                                                            return errorField.$setTouched();
                                                        });
                                                    });
                                                }
                                                reject('لطفا فیلد های اجباری را پر کنید');
                                            }
                                            for (i = 0; i < keys.length; i++) {
                                                if (_.has(form[keys[i]], '$setTouched')) form[keys[i]].$setTouched();
                                                if (typeof form[keys[i]] !== "undefined" && _.has(form[keys[i]], '$error') && !_.isEqual(form[keys[i]].$error, {})) error = true;
                                            }
                                            if (!error) {

                                                if (typeof CloneProperties !== "undefined" && CloneProperties != null) {
                                                    _loop = function _loop(_i) {
                                                        var name = $scope.data.TemplatePropertyGroup.properties[_i].name;

                                                        switch (CloneProperties[name].objClass) {
                                                            case 'com.openkm.bean.form.Input':
                                                                if (_.has($scope.data.TemplatePropertyGroup.properties[_i], 'type')) switch ($scope.data.TemplatePropertyGroup.properties[_i].type) {
                                                                    case 'date':
                                                                        if (_.isDate(CloneProperties[name].value)) $scope.data.TemplatePropertyGroup.properties[_i].value = CloneProperties[name].value.toISOString();
                                                                        break;
                                                                    case 'text':
                                                                    case 'number':
                                                                    case 'email':
                                                                    case 'link':
                                                                        $scope.data.TemplatePropertyGroup.properties[_i].value = _.clone(CloneProperties[name].value);
                                                                        break;
                                                                }
                                                                break;
                                                            case 'com.openkm.bean.form.Select':
                                                                if (_.has($scope.data.TemplatePropertyGroup.properties[_i], 'type')) {

                                                                    if (!_.isArray($scope.data.TemplatePropertyGroup.properties[_i].options)) {
                                                                        if ($scope.data.TemplatePropertyGroup.properties[_i].options != null) $scope.data.TemplatePropertyGroup.properties[_i].options = [$scope.data.TemplatePropertyGroup.properties[_i].options];else $scope.data.TemplatePropertyGroup.properties[_i].options = [];
                                                                    }

                                                                    switch ($scope.data.TemplatePropertyGroup.properties[_i].type) {
                                                                        case 'simple':
                                                                            _.map($scope.data.TemplatePropertyGroup.properties[_i].options, function (option) {
                                                                                return option.selected = false;
                                                                            });
                                                                            if (_.has(CloneProperties[name], 'selected') && CloneProperties[name].selected != null) {
                                                                                $scope.data.TemplatePropertyGroup.properties[_i].selected = angular.copy(CloneProperties[name].selected);
                                                                                var index = _.findIndex($scope.data.TemplatePropertyGroup.properties[_i].options, function (option) {
                                                                                    return option.value == CloneProperties[name].selected.value;
                                                                                });
                                                                                if (index >= 0) $scope.data.TemplatePropertyGroup.properties[_i].options[index].selected = true;
                                                                            }
                                                                            break;
                                                                        case 'multiple':
                                                                            _.map($scope.data.TemplatePropertyGroup.properties[_i].options, function (option) {
                                                                                return option.selected = false;
                                                                            });
                                                                            if (_.has(CloneProperties[name], 'selected') && CloneProperties[name].selected != null) {
                                                                                (function () {
                                                                                    var selected = _.isArray(CloneProperties[name].selected) ? CloneProperties[name].selected : [CloneProperties[name].selected];
                                                                                    $scope.data.TemplatePropertyGroup.properties[_i].selected = _.clone(selected);
                                                                                    var selectedValues = _.map(selected, 'value');
                                                                                    _.map($scope.data.TemplatePropertyGroup.properties[_i].options, function (option) {
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
                                                                $scope.data.TemplatePropertyGroup.properties[_i].value = _.clone(CloneProperties[name].value);
                                                                break;
                                                        }
                                                    };

                                                    for (_i = 0; _i < $scope.data.TemplatePropertyGroup.properties.length; _i++) {
                                                        _loop(_i);
                                                    }

                                                    $scope.data.templatPproperties = angular.copy($scope.data.TemplatePropertyGroup.properties);
                                                    $scope.func.generateQuery();
                                                }
                                            }

                                        case 8:
                                        case 'end':
                                            return _context5.stop();
                                    }
                                }
                            }, _callee5, undefined);
                        }));

                        return function (_x6, _x7) {
                            return _ref5.apply(this, arguments);
                        };
                    }();
                    $scope.templateExternalScope = {
                        InitializationForm: null,
                        footer: {
                            'next': {
                                'id': 'success',
                                'click': function click(properties, form) {
                                    return $scope.func.editMetaDataTemplate(properties, form);
                                },
                                'icon': 'fa-floppy-o',
                                'label': 'تغییرات',
                                'form': null,
                                'property': null
                            }
                        }
                    };
                    $scope.func.clearMetaDataTemplate = function () {
                        if (_.isFunction($scope.templateExternalScope.InitializationForm)) $scope.templateExternalScope.InitializationForm(null, {});
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    };
                    $scope.func.getTemplateImage = function () {
                        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(list) {
                            var i;
                            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                while (1) {
                                    switch (_context6.prev = _context6.next) {
                                        case 0:
                                            _context6.prev = 0;
                                            _context6.next = 3;
                                            return JS.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                        case 3:
                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType';
                                            i = 0;

                                        case 5:
                                            if (!(i < list.length)) {
                                                _context6.next = 19;
                                                break;
                                            }

                                            _context6.prev = 6;

                                            if (!(_.has(list[i], "type") && list[i].type == "FILE")) {
                                                _context6.next = 11;
                                                break;
                                            }

                                            _context6.next = 10;
                                            return $scope.func.getThumbnailFile(list[i], getSrcFromType);

                                        case 10:
                                            list[i].thumbnailSrc = _context6.sent;

                                        case 11:
                                            _context6.next = 16;
                                            break;

                                        case 13:
                                            _context6.prev = 13;
                                            _context6.t0 = _context6['catch'](6);

                                            console.error(_context6.t0);

                                        case 16:
                                            i++;
                                            _context6.next = 5;
                                            break;

                                        case 19:
                                            _context6.next = 24;
                                            break;

                                        case 21:
                                            _context6.prev = 21;
                                            _context6.t1 = _context6['catch'](0);

                                            console.error(_context6.t1);

                                        case 24:
                                        case 'end':
                                            return _context6.stop();
                                    }
                                }
                            }, _callee6, undefined, [[0, 21], [6, 13]]);
                        }));

                        return function (_x8) {
                            return _ref6.apply(this, arguments);
                        };
                    }();
                    $scope.func.selectTemplateFolder = function () {
                        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(folder, path) {
                            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                while (1) {
                                    switch (_context7.prev = _context7.next) {
                                        case 0:
                                            _context7.next = 2;
                                            return JS.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                        case 2:
                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';
                                            _context7.next = 5;
                                            return JS.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                        case 5:
                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType';

                                            folder.uuid = folder.id;
                                            $scope.data.selectedFileOrFolder = folder;

                                            $scope.data.themplateList = [];
                                            if (folder.children && _.isArray(folder.children) && folder.children.length > 0) {
                                                _.forEach(folder.children, function (v) {
                                                    $scope.data.themplateList.push({
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
                                                        collapsed: v.collapsed,
                                                        subscribed: _.has(v, 'subscribed') ? v.subscribed : false
                                                    });
                                                });
                                            }
                                            service.document.listChild(folder.id).then(function (res) {

                                                if (res.data != null) {
                                                    _.forEach(res.data, function (v) {
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
                                                        $scope.data.themplateList.push(v);
                                                    });
                                                    $scope.func.getTemplateImage($scope.data.themplateList);
                                                }
                                            }, function (error) {
                                                return console.error(error);
                                            });

                                        case 11:
                                        case 'end':
                                            return _context7.stop();
                                    }
                                }
                            }, _callee7, undefined);
                        }));

                        return function (_x9, _x10) {
                            return _ref7.apply(this, arguments);
                        };
                    }();
                    $scope.func.treeView = {
                        changeCurrentNode: function () {
                            var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(node, collapsed, path) {
                                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                    while (1) {
                                        switch (_context8.prev = _context8.next) {
                                            case 0:
                                                $scope.func.clearMetaDataTemplate();
                                                $scope.data.tree.currentNode = node;
                                                if (typeof collapsed !== 'undefined') $scope.data.tree.currentNode.collapsed = collapsed;
                                                $scope.data.selectedFileOrFolder = node;

                                                if (!($scope.data.tree.currentNode && $scope.data.tree.currentNode.hasChildrenFolder)) {
                                                    _context8.next = 11;
                                                    break;
                                                }

                                                _context8.next = 7;
                                                return JS.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                            case 7:
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
                                                    $scope.func.selectTemplateFolder($scope.data.tree.currentNode, path);
                                                });

                                                _context8.next = 12;
                                                break;

                                            case 11:
                                                $scope.func.selectTemplateFolder($scope.data.tree.currentNode, path);

                                            case 12:
                                            case 'end':
                                                return _context8.stop();
                                        }
                                    }
                                }, _callee8, undefined);
                            }));

                            function changeCurrentNode(_x11, _x12, _x13) {
                                return _ref8.apply(this, arguments);
                            }

                            return changeCurrentNode;
                        }()
                    };
                    /*todo ************************ state = uploadFiles *******************************************/
                    $scope.func.createMetaDataItem = function () {
                        return new Promise(function (resolve, reject) {
                            try {
                                if ($scope.data.metadata == null || $scope.data.selectMetadata == null) reject("لطفا یک فراداده انتخاب کنید.");
                                service.folder.createWithPropertyGroup($scope.data.metadata.name, {
                                    formElementsComplex: {
                                        formElementComplex: $scope.data.metadata.properties
                                    }
                                }).then(function (res) {
                                    $scope.data.createFolder = _.clone(res.data.data.originalElement.folder);
                                    resolve(true);
                                }, function (error) {
                                    return reject("مشکلی در ایجاد فراداده به وجود آمده است .");
                                });
                            } catch (e) {
                                reject("مشکلی در ایجاد فراداده ایجاد شده است.");
                            }
                        });
                    };
                    $scope.func.changeMetaData = function () {
                        $scope.data.metadata = null;
                        if ($scope.data.selectMetadata != null) {
                            service.propertyGroup.form({ name: $scope.data.selectMetadata.name }).then(function (res) {
                                return $scope.data.metadata = _.clone(res.data);
                            }, function (error) {
                                return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز اطلاعات');
                            });
                        }
                    };
                    /*todo ************************ state = selectMetadata ****************************************/
                    $scope.func.uploadAgain = function () {
                        var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(key) {
                            var result;
                            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                while (1) {
                                    switch (_context9.prev = _context9.next) {
                                        case 0:
                                            if (!(isCookieFunction('Authorization') != null)) {
                                                _context9.next = 34;
                                                break;
                                            }

                                            _context9.prev = 1;
                                            _context9.prev = 2;
                                            _context9.next = 5;
                                            return service.document.remove($scope.data.filesList[key].Upload.path);

                                        case 5:
                                            _context9.next = 10;
                                            break;

                                        case 7:
                                            _context9.prev = 7;
                                            _context9.t0 = _context9['catch'](2);

                                            console.error(_context9.t0);

                                        case 10:

                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            $scope.data.filesList[key].Upload = undefined;
                                            delete $scope.data.filesList[key].Upload;
                                            _context9.prev = 13;
                                            _context9.next = 16;
                                            return $scope.func.sendingFile2Server(key);

                                        case 16:
                                            result = _context9.sent;

                                            toaster.pop("success", "", result);
                                            _context9.next = 23;
                                            break;

                                        case 20:
                                            _context9.prev = 20;
                                            _context9.t1 = _context9['catch'](13);

                                            toaster.pop("error", "", _context9.t1 || _context9.t1.message);

                                        case 23:
                                            _context9.prev = 23;

                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            return _context9.finish(23);

                                        case 26:
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            _context9.next = 32;
                                            break;

                                        case 29:
                                            _context9.prev = 29;
                                            _context9.t2 = _context9['catch'](1);

                                            console.error(_context9.t2);

                                        case 32:
                                            _context9.next = 36;
                                            break;

                                        case 34:
                                            toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                                            $scope.func.cancel();

                                        case 36:
                                        case 'end':
                                            return _context9.stop();
                                    }
                                }
                            }, _callee9, undefined, [[1, 29], [2, 7], [13, 20, 23, 26]]);
                        }));

                        return function (_x14) {
                            return _ref9.apply(this, arguments);
                        };
                    }();
                    $scope.func.sendingFile2Server = function (name) {
                        return new Promise(function (resolve, reject) {
                            try {
                                $scope.data.filesList[name].status = "Sending";
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                $scope.data.filesList[name].Upload = {
                                    percent: 0,
                                    filename: name,
                                    path: $scope.data.createFolder.path + '/' + name,
                                    upload: $upload.upload({
                                        url: '/KeydocPro/services/rest/document/createSimple',
                                        data: {
                                            docPath: $scope.data.createFolder.path + '/' + name,
                                            isSigned: $scope.data.filesList[name].isSelect,
                                            content: $scope.data.filesList[name].file,
                                            sizeOfFile: $scope.data.filesList[name].file.size
                                        },
                                        headers: { 'Authorization': decodeURIComponent(_.replace(isCookieFunction("Authorization"), "Bearer", "Bearer ")) }
                                    }).progress(function (evt) {
                                        _.defer(function () {
                                            return $scope.$apply($scope.data.filesList[name].Upload.percent = parseInt(100.0 * evt.loaded / evt.total));
                                        });
                                    }).success(function (data, status, headers, config) {
                                        $scope.data.filesList[name].status = "Success";
                                        resolve("سند " + name + " با موفقیت ارسال شد.");
                                    }).error(function (error) {
                                        $scope.data.filesList[name].status = "Error";
                                        reject("مشکلی در ارسال سند  " + name + " به سرور رخ داده است.");
                                    }) /*.xhr( function(xhr){
                                         // to abort, use ng-click like: ng-click="abort()"
                                         console.log(111111111);
                                         $scope.func.onCancelFileUpload = function(){
                                             xhr.abort();
                                             $scope.data.filesList[name].status = "Error";
                                         }
                                       })*/
                                };
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            } catch (e) {
                                reject("مشکلی در ارسال سند  " + name + " به سرور رخ داده است.");
                            } finally {
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            }
                        });
                    };
                    $scope.func.startUpload = _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
                        var keys, i, name, result;
                        return regeneratorRuntime.wrap(function _callee10$(_context10) {
                            while (1) {
                                switch (_context10.prev = _context10.next) {
                                    case 0:
                                        if (!(isCookieFunction('Authorization') != null)) {
                                            _context10.next = 24;
                                            break;
                                        }

                                        keys = _.keys($scope.data.filesList);
                                        i = 0;

                                    case 3:
                                        if (!(i < keys.length)) {
                                            _context10.next = 22;
                                            break;
                                        }

                                        name = keys[i];

                                        if (!(_.has($scope.data.filesList, name) && _.includes(["New", "Error"], $scope.data.filesList[name].status))) {
                                            _context10.next = 19;
                                            break;
                                        }

                                        _context10.prev = 6;
                                        _context10.next = 9;
                                        return $scope.func.sendingFile2Server(name);

                                    case 9:
                                        result = _context10.sent;

                                        toaster.pop("success", "", result);
                                        _context10.next = 16;
                                        break;

                                    case 13:
                                        _context10.prev = 13;
                                        _context10.t0 = _context10['catch'](6);

                                        toaster.pop("error", "", _context10.t0 || _context10.t0.message);

                                    case 16:
                                        _context10.prev = 16;

                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        return _context10.finish(16);

                                    case 19:
                                        i++;
                                        _context10.next = 3;
                                        break;

                                    case 22:
                                        _context10.next = 26;
                                        break;

                                    case 24:
                                        toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                                        $scope.func.cancel();

                                    case 26:
                                    case 'end':
                                        return _context10.stop();
                                }
                            }
                        }, _callee10, undefined, [[6, 13, 16, 19]]);
                    }));
                    $scope.func.uploadFiles = function () {
                        if (_.filter($scope.data.filesList, function (file) {
                            return file.status == 'Sending';
                        }).length > 0) toaster.pop("error", "", "تا اتمام ارسال سند ها لطفا منتظر بمانید");else if (_.filter($scope.data.filesList, function (file) {
                            return _.includes(["New", "Error"], file.status);
                        }).length == 0) toaster.pop('error', '', 'لطفا حداقل یک سند جدید برای ارسال انتخاب کنید');else $scope.func.startUpload();
                    };
                    $scope.func.createCanvas = function (name) {
                        return new Promise(function (resolveTIFF, rejectTIFF) {
                            try {

                                var c = document.createElement("canvas");
                                c.width = 120;
                                c.height = 80;
                                var ctx = c.getContext("2d");
                                ctx.clearRect(-500, -500, c.width + 500, c.height + 500);

                                ctx.rect(0, 0, c.width, c.height);
                                // add linear gradient
                                var grd = ctx.createLinearGradient(0, 0, c.width, c.height);
                                // light blue
                                grd.addColorStop(1, '#8ED6FF');
                                // dark blue
                                grd.addColorStop(0, '#004CB3');
                                ctx.fillStyle = grd;
                                ctx.fill();

                                ctx.globalAlpha = 1;
                                ctx.fillStyle = '#fff';
                                ctx.font = '30px arial,sans-serif';
                                ctx.setTransform(1, 0, 0, 1, 25, 10);
                                ctx.fillText(name, 10, 40);
                                resolveTIFF(c.toDataURL());
                            } catch (e) {
                                resolveTIFF("./../../../static/backgrounds/1.jpg");
                            }
                        });
                    };
                    $scope.func.addFiles = function (files) {

                        _.forEach(files, function () {
                            var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(file) {
                                var imageItem, reader;
                                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                    while (1) {
                                        switch (_context11.prev = _context11.next) {
                                            case 0:
                                                if (!$scope.data.filesList[file.name]) {
                                                    _context11.next = 4;
                                                    break;
                                                }

                                                toaster.pop('error', '', 'سند ' + file.name + ' در این پوشه وجود دارد');
                                                _context11.next = 42;
                                                break;

                                            case 4:
                                                if (!file.type.match('image.*')) {
                                                    _context11.next = 36;
                                                    break;
                                                }

                                                if (!(file.type == "image/tiff")) {
                                                    _context11.next = 14;
                                                    break;
                                                }

                                                /*todo convert tiff format to jpeg (web stndard)  
                                                try {
                                                     await JS.addJS('resource/javaScript/tiff.min.js?dev=${randomVersionName}`);
                                                     let result = await  $scope.func.convertTIFF2JPEG(file);
                                                     await JS.removeJS('resource/javaScript/tiff.min.js?dev=${randomVersionName}`, 'Tiff,TiffTag');
                                                     $scope.data.filesList[file.name] = {
                                                         file : file,
                                                         status : 'New',
                                                         Upload : null,
                                                         isSelect : false,
                                                         color : '#fff',
                                                         url : result
                                                     };
                                                     _.defer(()=>$scope.$apply());
                                                 } catch (e) {
                                                     console.error(e);
                                                     await JS.removeJS('resource/javaScript/tiff.min.js', 'Tiff,TiffTag');
                                                     $scope.data.filesList[file.name] = {
                                                         file : file,
                                                         status : 'New',
                                                         Upload : null,
                                                         isSelect : false,
                                                         color : '#fff',
                                                         url : "./../../../static/backgrounds/1.jpg"
                                                     };
                                                     _.defer(()=>$scope.$apply());
                                                 }*/
                                                imageItem = {
                                                    file: file,
                                                    status: 'New',
                                                    Upload: null,
                                                    isSelect: false,
                                                    color: '#000'
                                                };
                                                _context11.next = 9;
                                                return $scope.func.createCanvas(file.name.split(".").pop());

                                            case 9:
                                                imageItem.url = _context11.sent;

                                                $scope.data.filesList[file.name] = _.clone(imageItem);
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });
                                                _context11.next = 34;
                                                break;

                                            case 14:
                                                _context11.prev = 14;

                                                if (!(file.size <= 1500000)) {
                                                    _context11.next = 21;
                                                    break;
                                                }

                                                reader = new FileReader();

                                                reader.onload = function (img) {
                                                    $scope.data.filesList[file.name] = {
                                                        file: file,
                                                        status: 'New',
                                                        Upload: null,
                                                        isSelect: false,
                                                        color: '#fff',
                                                        url: img.target.result
                                                    };
                                                    _.defer(function () {
                                                        return $scope.$apply();
                                                    });
                                                };
                                                reader.readAsDataURL(file);
                                                _context11.next = 27;
                                                break;

                                            case 21:
                                                imageItem = {
                                                    file: file,
                                                    status: 'New',
                                                    Upload: null,
                                                    isSelect: false,
                                                    color: '#000'
                                                };
                                                _context11.next = 24;
                                                return $scope.func.createCanvas(file.name.split(".").pop());

                                            case 24:
                                                imageItem.url = _context11.sent;

                                                $scope.data.filesList[file.name] = _.clone(imageItem);
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });

                                            case 27:
                                                _context11.next = 34;
                                                break;

                                            case 29:
                                                _context11.prev = 29;
                                                _context11.t0 = _context11['catch'](14);

                                                console.error(_context11.t0);
                                                $scope.data.filesList[file.name] = {
                                                    file: file,
                                                    status: 'New',
                                                    Upload: null,
                                                    isSelect: false,
                                                    color: '#fff',
                                                    url: "./../../../static/backgrounds/1.jpg"
                                                };
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });

                                            case 34:
                                                _context11.next = 42;
                                                break;

                                            case 36:
                                                imageItem = {
                                                    file: file,
                                                    status: 'New',
                                                    Upload: null,
                                                    isSelect: false,
                                                    color: '#000'
                                                };
                                                _context11.next = 39;
                                                return $scope.func.createCanvas(file.name.split(".").pop());

                                            case 39:
                                                imageItem.url = _context11.sent;

                                                $scope.data.filesList[file.name] = _.clone(imageItem);
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });

                                            case 42:
                                            case 'end':
                                                return _context11.stop();
                                        }
                                    }
                                }, _callee11, undefined, [[14, 29]]);
                            }));

                            return function (_x15) {
                                return _ref11.apply(this, arguments);
                            };
                        }());
                    };
                    $scope.func.convertTIFF2JPEG = function (img) {
                        return new Promise(function (resolveTIFF, rejectTIFF) {
                            try {
                                var reader = new FileReader();
                                reader.onerror = function () {
                                    return rejectTIFF(e);
                                };
                                reader.onload = function (e) {
                                    Tiff.initialize({ TOTAL_MEMORY: 16777216 * 10 });
                                    var tiff = new Tiff({ buffer: e.target.result });
                                    var canvas = tiff.toCanvas();
                                    var newfile = $scope.func.dataURItoBlob(canvas.toDataURL("image/jpeg"), "image/jpeg");
                                    var readerFileCanvas = new FileReader();
                                    readerFileCanvas.onerror = function () {
                                        return rejectTIFF("عدم تبدیل فرمت tiff ");
                                    };
                                    readerFileCanvas.onload = function (evt) {
                                        return resolveTIFF(evt.target.result);
                                    };
                                    readerFileCanvas.readAsDataURL(newfile);
                                };
                                reader.readAsArrayBuffer(img);
                            } catch (e) {
                                console.error(e);
                                rejectTIFF(e);
                            }
                        });
                    };
                    $scope.func.resizeFile = function (src) {
                        var imageObj = new Image();
                        imageObj.onload = function (img) {
                            // Check for empty images
                            if (imageObj.width > 0 && imageObj.height > 0) {

                                var v = 0;
                                var h = 0;
                                if (imageObj.width > imageObj.height) {
                                    v = 150;
                                    h = imageObj.height / (imageObj.width / v);
                                } else {
                                    h = 150;
                                    v = imageObj.width / (imageObj.height / h);
                                }
                                var _canvas = document.createElement("canvas");
                                _canvas.style.visibility = "hidden";
                                _canvas.width = v;
                                _canvas.height = h;
                                document.body.appendChild(_canvas);
                                var context = _canvas.getContext("2d");
                                context.clearRect(0, 0, v, h);
                                context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, v, h);
                                $scope.data.file = $scope.func.dataURItoBlob(_canvas.toDataURL("image/jpeg"), "image/jpeg");
                                document.body.removeChild(_canvas);
                            }
                        };
                        imageObj.onabort = function () {
                            window.document.body.removeChild(canvas);
                        };
                        imageObj.onerror = function () {
                            window.document.body.removeChild(canvas);
                        };
                        imageObj.src = src;
                    };
                    $scope.func.dataURItoBlob = function (dataURI, dataTYPE) {
                        try {
                            var binary = atob(dataURI.split(',')[1]),
                                array = [];
                            for (var i = 0; i < binary.length; i++) {
                                array.push(binary.charCodeAt(i));
                            }return new Blob([new Uint8Array(array)], { type: dataTYPE });
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.cancelUpload = function () {
                        return $scope.func.close();
                    };
                    $scope.func.onCancelFileUpload = function (key) {
                        try {
                            if ($scope.data.filesList[key].Upload != null && $scope.data.filesList[key].status == "Sending") {
                                $scope.data.filesList[key].Upload.upload.abort();
                                $scope.data.filesList[key].status = "Error";
                            }
                        } catch (e) {
                            console.error(e);
                        } finally {
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        }
                    };
                    $scope.func.onCancelFileClick = function (key) {
                        try {
                            if (_.has($scope.data.filesList[key], 'Upload') && $scope.data.filesList[key].Upload != null && $scope.data.filesList[key].status == "Sending") $scope.data.filesList[key].Upload.upload.abort();
                            $scope.data.filesList[key] = undefined;
                            delete $scope.data.filesList[key];
                        } catch (e) {
                            console.error(e);
                        }
                    };
                    $scope.func.onDeleteItemClick = function (key) {
                        if ($scope.data.filesList[key]) $scope.func.onCancelFileClick(key);
                    };
                    $scope.func.back = function () {
                        _.forEach($scope.data.filesList, function (v, k) {
                            try {
                                if (v.status == 'Sending') {
                                    v.Upload.upload.abort();
                                    v.status = "Cancel";
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        });
                        $scope.func.close();
                    };
                    $scope.func.clickImage = function (doc) {
                        $scope.data.selectedImage = _.clone(doc);
                        $scope.func.showFile(doc);
                    };
                    $scope.func.showFile = function () {
                        var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(doc) {
                            var viewerType;
                            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                                while (1) {
                                    switch (_context12.prev = _context12.next) {
                                        case 0:
                                            _context12.prev = 0;

                                            if (!(isCookieFunction("Authorization") != null)) {
                                                _context12.next = 44;
                                                break;
                                            }

                                            _context12.next = 4;
                                            return JS.addJS('ecma5/ExternalLiberary/Public/removeAllPlayers.js?dev=' + randomVersionName);

                                        case 4:
                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/removeAllPlayers.js?dev=' + randomVersionName] = 'removeAllPlayers';
                                            try {
                                                removeAllPlayers();
                                            } catch (e) {
                                                console.error(e);
                                            }

                                            if (!$scope.data.profile.prfTab.prfDocument.previewVisible) {
                                                _context12.next = 42;
                                                break;
                                            }

                                            _context12.next = 9;
                                            return JS.addJS('ecma5/ExternalLiberary/Public/getViewer.js?dev=' + randomVersionName);

                                        case 9:
                                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getViewer.js?dev=' + randomVersionName] = 'getViewer,fileTypeFromViewerHashTable';
                                            viewerType = getViewer(doc.mimeType);
                                            //if (!$scope.data.profile.prfMisc.acrobatPluginPreview && !_.includes(['video', 'audio', 'flash'], viewerType))

                                            _context12.t0 = viewerType;
                                            _context12.next = _context12.t0 === "pdfjs" ? 14 : _context12.t0 === "flash" ? 37 : _context12.t0 === "video" ? 37 : _context12.t0 === "audio" ? 37 : 42;
                                            break;

                                        case 14:
                                            _context12.next = 16;
                                            return style.addCSS('static/pdfDirectiveViewer/web/viewer.css?dev=' + randomVersionName);

                                        case 16:
                                            $scope.data.removeExternalCSS['static/pdfDirectiveViewer/web/viewer.css?dev=' + randomVersionName] = true;
                                            _context12.next = 19;
                                            return JS.addJS('static/pdfDirectiveViewer/web/compatibility.min.js?dev=' + randomVersionName);

                                        case 19:
                                            $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/web/compatibility.min.js?dev=' + randomVersionName] = 'PDFJS';
                                            _context12.next = 22;
                                            return JS.addJS('static/pdfDirectiveViewer/web/l10n.min.js?dev=' + randomVersionName);

                                        case 22:
                                            $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/web/l10n.min.js?dev=' + randomVersionName] = 'webL10n';
                                            _context12.next = 25;
                                            return JS.addJS('static/pdfDirectiveViewer/build/pdf.min.js?dev=' + randomVersionName);

                                        case 25:
                                            $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/build/pdf.min.js?dev=' + randomVersionName] = 'PDFJS';
                                            _context12.next = 28;
                                            return JS.addJS('static/pdfDirectiveViewer/web/debugger.min.js?dev=' + randomVersionName);

                                        case 28:
                                            $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/web/debugger.min.js?dev=' + randomVersionName] = 'FontInspector,StepperManager,Stepper,Stats,PDFBug';
                                            _context12.next = 31;
                                            return JS.addJS('static/pdfDirectiveViewer/web/debugger.js?dev=' + randomVersionName);

                                        case 31:
                                            $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/web/debugger.js?dev=' + randomVersionName] = 'FontInspector,StepperManager,Stepper,Stats,PDFBug';
                                            $scope.data.viewer.type = "pdf";
                                            $scope.data.viewer.pdf.isOpenfileShower = true;
                                            $scope.data.viewer['pdf'].url = '/KeydocPro/services/rest/convertor/topdf?uuid=' + doc.uuid + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + '&' + Date.parse(new Date());
                                            _.defer(function () {
                                                if (window.document.querySelector("#modal-pdf-viewer-parent  #modal-pdf-viewer-child  #key-doc-pro-pdf-shower-id") == null) angular.element(window.document.querySelector("#modal-pdf-viewer-parent  #modal-pdf-viewer-child")).append($compile('<key-doc-pro-pdf-shower  id="key-doc-pro-pdf-shower-id" change-url="data.viewer.pdf.changeURL" first-search = "data.viewer.pdf.firstSearch" path-url="data.viewer.pdf.url" show-file="data.viewer.pdf.isOpenfileShower" ></key-doc-pro-pdf-shower>')($scope));
                                                _.defer(function () {
                                                    $scope.$apply();
                                                    if (_.isFunction($scope.data.viewer.pdf.changeURL)) $scope.data.viewer['pdf'].changeURL($scope.data.viewer['pdf'].url, $scope.data.viewer['pdf'].firstSearch);
                                                });
                                            }, 100);
                                            return _context12.abrupt('break', 42);

                                        case 37:
                                            $scope.data.player = {};
                                            $scope.data.viewer.type = "media";
                                            $scope.data.viewer.media.type = viewerType;
                                            try {
                                                if (_.isFunction($scope.data.viewer['player'].func)) $scope.data.viewer['player'].func({
                                                    thumbnail: doc.thumbnailSrc,
                                                    src: '/KeydocPro/services/rest/document/getContent?docId=' + doc.uuid + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + '&' + new Date().getTime(),
                                                    type: /(audio)/.test(doc.mimeType) ? 'audio' : 'video',
                                                    duration: undefined,
                                                    guid: doc.uuid,
                                                    service: service.document,
                                                    tags: null,
                                                    first: true
                                                }, $scope.data.profile.MultiMediaTagPermit);
                                            } catch (e) {
                                                console.error(e);
                                            }
                                            return _context12.abrupt('break', 42);

                                        case 42:
                                            _context12.next = 46;
                                            break;

                                        case 44:
                                            toaster("error", "", "لطفا ابتدا وارد سیستم شوید.");
                                            Authentication.backToLoign();

                                        case 46:
                                            _context12.next = 51;
                                            break;

                                        case 48:
                                            _context12.prev = 48;
                                            _context12.t1 = _context12['catch'](0);

                                            console.error(_context12.t1);

                                        case 51:
                                        case 'end':
                                            return _context12.stop();
                                    }
                                }
                            }, _callee12, undefined, [[0, 48]]);
                        }));

                        return function (_x16) {
                            return _ref12.apply(this, arguments);
                        };
                    }();
                    $scope.func.close = function () {
                        $scope.data = undefined;
                        $uibModalInstance.close(false);
                    };
                    /*todo ************************ selectMetadata ************************************************/
                    $scope.func.getMetadataList = function () {
                        return new Promise(function (resolve, reject) {
                            if ($scope.data.metadatas != null) resolve($scope.data.metadatas);else {
                                service.propertyGroup.list().then(function (pgres) {
                                    if (pgres.data != null) {
                                        $scope.data.metadatas = _.clone(pgres.data);
                                        try {
                                            _.map($scope.data.metadatas, function (metadata) {
                                                return metadata.active = _.includes($scope.data.profile.prfWizard.propertyGroups, metadata.name);
                                            });
                                        } catch (e) {
                                            console.error(e);
                                        } finally {
                                            resolve($scope.data.metadatas);
                                        }
                                    }
                                }, function (error) {
                                    return reject(error);
                                });
                            }
                        });
                    };
                    $scope.externalScopeFill = {
                        InitializationForm: null,
                        footer: {
                            'next': {
                                'id': 'success',
                                'click': function click(properties, form) {
                                    return $scope.func.editMetaData(properties, form);
                                },
                                'icon': 'fa-floppy-o',
                                'label': 'تغییر',
                                'form': null,
                                'property': null
                            }
                        }
                    };
                    $scope.func.editMetadataWithPromise = function (CloneProperties, form) {
                        return new Promise(function (resolve, reject) {
                            try {

                                var error = false;
                                var keys = _.keys(CloneProperties);
                                if (_.has(form.$error, 'pattern') && _.isArray(form.$error.pattern) && form.$error.pattern.length > 0) reject('لطفا الگوهای درست وارد کنید');
                                if (_.has(form.$error, 'required') && _.isArray(form.$error.required) && form.$error.required.length > 0) {
                                    if (form.$invalid) {
                                        _.forEach(form.$error, function (field) {
                                            _.forEach(field, function (errorField) {
                                                return errorField.$setTouched();
                                            });
                                        });
                                    }
                                    reject('لطفا فیلد های اجباری را پر کنید');
                                }
                                for (var i = 0; i < keys.length; i++) {
                                    if (_.has(form[keys[i]], '$setTouched')) form[keys[i]].$setTouched();
                                    if (typeof form[keys[i]] !== "undefined" && _.has(form[keys[i]], '$error') && !_.isEqual(form[keys[i]].$error, {})) error = true;
                                }
                                if (!error) {
                                    var _loop2 = function _loop2(_i2) {
                                        var name = $scope.data.CloneProperties[_i2].name;
                                        switch (CloneProperties[name].objClass) {
                                            case 'com.openkm.bean.form.Input':
                                                if (_.has($scope.data.CloneProperties[_i2], 'type')) switch ($scope.data.CloneProperties[_i2].type) {
                                                    case 'date':
                                                        if (_.isDate(CloneProperties[name].value)) {
                                                            try {
                                                                var tempDate = _.clone(CloneProperties[name].value);
                                                                $scope.data.CloneProperties[_i2].value = '' + String(tempDate.getFullYear()) + (String(tempDate.getMonth() + 1).length == 1 ? "0" + String(tempDate.getMonth() + 1) : String(tempDate.getMonth() + 1)) + (String(tempDate.getDate()).length == 1 ? "0" + String(tempDate.getDate()) : String(tempDate.getDate())) + (String(tempDate.getHours()).length == 1 ? "0" + String(tempDate.getHours()) : String(tempDate.getHours())) + (String(tempDate.getMinutes()).length == 1 ? "0" + String(tempDate.getMinutes()) : String(tempDate.getMinutes())) + (String(tempDate.getSeconds()).length == 1 ? "0" + String(tempDate.getSeconds()) : String(tempDate.getSeconds()));
                                                            } catch (e) {
                                                                console.error(e);
                                                                $scope.data.CloneProperties[_i2].value = CloneProperties[name].value.toISOString();
                                                            }
                                                        }
                                                        //$scope.data.CloneProperties[i].value = CloneProperties[name].value.toISOString();
                                                        break;
                                                    case 'text':
                                                    case 'number':
                                                    case 'email':
                                                    case 'link':
                                                        $scope.data.CloneProperties[_i2].value = _.clone(CloneProperties[name].value);
                                                        break;
                                                }
                                                break;
                                            case 'com.openkm.bean.form.Select':
                                                if (_.has($scope.data.CloneProperties[_i2], 'type')) {

                                                    if (!_.isArray($scope.data.CloneProperties[_i2].options)) {
                                                        if ($scope.data.CloneProperties[_i2].options != null) $scope.data.CloneProperties[_i2].options = [$scope.data.CloneProperties[_i2].options];else $scope.data.CloneProperties[_i2].options = [];
                                                    }
                                                    switch ($scope.data.CloneProperties[_i2].type) {
                                                        case 'simple':
                                                            try {
                                                                _.map($scope.data.CloneProperties[_i2].options, function (option) {
                                                                    return option.selected = false;
                                                                });
                                                                if (CloneProperties[name].selected != null) {
                                                                    var index = _.findIndex($scope.data.CloneProperties[_i2].options, function (option) {
                                                                        return option.value == CloneProperties[name].selected.value;
                                                                    });
                                                                    if (index >= 0) $scope.data.CloneProperties[_i2].options[index].selected = true;
                                                                }
                                                            } catch (e) {
                                                                console.error(e);
                                                            }
                                                            break;
                                                        case 'multiple':
                                                            try {
                                                                (function () {
                                                                    var selectedValues = _.map(CloneProperties[name].selected, 'value');
                                                                    _.map($scope.data.CloneProperties[_i2].options, function (option) {
                                                                        return option.selected = _.includes(selectedValues, option.value);
                                                                    });
                                                                })();
                                                            } catch (e) {
                                                                console.error(e);
                                                            }
                                                            break;
                                                    }
                                                }
                                                break;
                                            case 'com.openkm.bean.form.TextArea':
                                            case 'com.openkm.bean.form.CheckBox':
                                                $scope.data.CloneProperties[_i2].value = _.clone(CloneProperties[name].value);
                                                break;
                                        }
                                    };

                                    for (var _i2 = 0; _i2 < $scope.data.CloneProperties.length; _i2++) {
                                        _loop2(_i2);
                                    }

                                    var properties = angular.copy($scope.data.CloneProperties);
                                    _.forEach(properties, function (property) {
                                        if (property.objClass == "com.openkm.bean.form.Select" && _.has(property, 'options') && _.isArray(property.options) && property.options.length == 1) property.options = property.options[0];
                                    });

                                    service.propertyGroup.formElement($scope.data.createFolder.uuid, $scope.data.selectMetadata.name, {
                                        formElementsComplex: {
                                            formElementComplex: [properties]
                                        }
                                    }).then(function (res) {
                                        resolve('فراداده با موفقیت تغییر کرد.');
                                        service.propertyGroup.getGroups($scope.data.createFolder.uuid, $scope.data.selectMetadata).then(function (resIn) {

                                            $scope.data.CloneProperties = angular.copy(resIn.data.properties);

                                            if (_.isFunction($scope.externalScopeFill.InitializationForm)) {
                                                $scope.externalScopeFill.InitializationForm(null, {});
                                                _.defer(function () {
                                                    $scope.externalScopeFill.InitializationForm(angular.copy($scope.data.CloneProperties), {
                                                        service: service,
                                                        require: true,
                                                        classSpliter: 'col-sm-12'
                                                    });
                                                }, 10);
                                            }
                                        }, function (error) {
                                            return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                        });
                                    }, function (error) {
                                        return reject('عدم ذخیره موفق داده');
                                    });
                                } else reject('فیلد های اجباری را پر کنید.');
                            } catch (e) {
                                console.error(e);
                                reject(e || e.message);
                            }
                        });
                    };
                    $scope.func.editMetaData = function () {
                        var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(CloneProperties, form) {
                            var result;
                            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                                while (1) {
                                    switch (_context13.prev = _context13.next) {
                                        case 0:
                                            _context13.prev = 0;
                                            _context13.next = 3;
                                            return $scope.func.editMetadataWithPromise(CloneProperties, form);

                                        case 3:
                                            result = _context13.sent;

                                            toaster.pop('success', '', result);
                                            _context13.next = 10;
                                            break;

                                        case 7:
                                            _context13.prev = 7;
                                            _context13.t0 = _context13['catch'](0);

                                            toaster.pop('error', '', _context13.t0 || _context13.t0.message);

                                        case 10:
                                            _context13.prev = 10;

                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            return _context13.finish(10);

                                        case 13:
                                        case 'end':
                                            return _context13.stop();
                                    }
                                }
                            }, _callee13, undefined, [[0, 7, 10, 13]]);
                        }));

                        return function (_x17, _x18) {
                            return _ref13.apply(this, arguments);
                        };
                    }();
                    $scope.func.fillMetadata = _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
                        return regeneratorRuntime.wrap(function _callee15$(_context15) {
                            while (1) {
                                switch (_context15.prev = _context15.next) {
                                    case 0:
                                        //$scope.data.state = 'fillMetaData';
                                        $scope.data.list = [];

                                        service.propertyGroup.getGroups($scope.data.createFolder.uuid, $scope.data.selectMetadata).then(function (resIn) {

                                            $scope.data.CloneProperties = angular.copy(resIn.data.properties);

                                            if (_.isFunction($scope.externalScopeFill.InitializationForm)) {
                                                $scope.externalScopeFill.InitializationForm(null, {});
                                                _.defer(function () {
                                                    $scope.externalScopeFill.InitializationForm(angular.copy(resIn.data.properties), {
                                                        service: service,
                                                        require: true,
                                                        classSpliter: 'col-sm-12'
                                                    });
                                                }, 10);
                                            }
                                        }, function (error) {
                                            return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                        });
                                        service.document.listChild($scope.data.createFolder.uuid).then(function () {
                                            var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(res) {
                                                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                                                    while (1) {
                                                        switch (_context14.prev = _context14.next) {
                                                            case 0:
                                                                if (!(res.data != null)) {
                                                                    _context14.next = 8;
                                                                    break;
                                                                }

                                                                _context14.next = 3;
                                                                return JS.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                                            case 3:
                                                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';
                                                                _context14.next = 6;
                                                                return JS.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                                            case 6:
                                                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType';
                                                                _.forEach(res.data, function (v) {
                                                                    v.name = getNameFromPath(v.path);
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
                                                                    $scope.data.list.push(v);
                                                                });

                                                            case 8:
                                                            case 'end':
                                                                return _context14.stop();
                                                        }
                                                    }
                                                }, _callee14, undefined);
                                            }));

                                            return function (_x19) {
                                                return _ref15.apply(this, arguments);
                                            };
                                        }(), function (error) {
                                            return $scope.data.list = [];
                                        });

                                    case 3:
                                    case 'end':
                                        return _context15.stop();
                                }
                            }
                        }, _callee15, undefined);
                    }));

                    $scope.func.ok = _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
                        var form, result;
                        return regeneratorRuntime.wrap(function _callee16$(_context16) {
                            while (1) {
                                switch (_context16.prev = _context16.next) {
                                    case 0:
                                        _context16.prev = 0;
                                        _context16.prev = 1;
                                        _context16.next = 4;
                                        return $scope.externalScopeFill.footer.next.form();

                                    case 4:
                                        form = _context16.sent;
                                        _context16.next = 7;
                                        return $scope.func.editMetadataWithPromise($scope.externalScopeFill.footer.next.property, form);

                                    case 7:
                                        result = _context16.sent;

                                        if (!(_.filter($scope.data.filesList, function (file) {
                                            return file.status != "Success";
                                        }).length > 0)) {
                                            _context16.next = 12;
                                            break;
                                        }

                                        toaster.pop('error', '', 'شما چند سند آپلود نشده دارید.');
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        return _context16.abrupt('return');

                                    case 12:
                                        toaster.pop('success', '', result);
                                        $uibModalInstance.close({ success: 'فراداده با موفقیت ایجاد شد' });
                                        _context16.next = 19;
                                        break;

                                    case 16:
                                        _context16.prev = 16;
                                        _context16.t0 = _context16['catch'](1);

                                        toaster.pop('error', '', _context16.t0 || _context16.t0.message);

                                    case 19:
                                        _context16.next = 25;
                                        break;

                                    case 21:
                                        _context16.prev = 21;
                                        _context16.t1 = _context16['catch'](0);

                                        toaster.pop('error', '', _context16.t1);
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });

                                    case 25:
                                    case 'end':
                                        return _context16.stop();
                                }
                            }
                        }, _callee16, undefined, [[0, 21], [1, 16]]);
                    }));
                    $scope.func.cancel = function () {
                        try {
                            if ($scope.data.createFolder != null) service.folder.purge($scope.data.createFolder.uuid).then(function (res) {
                                $uibModalInstance.close({ error: 'انصراف از ساخت فراداده جدید' });
                            }, function (error) {

                                service.propertyGroup.remove($scope.data.createFolder.path, $scope.data.selectMetadata.name).then(function (res) {
                                    service.folder.remove($scope.data.createFolder.uuid).then(function (res) {
                                        return $uibModalInstance.close({ error: 'انصراف از ساخت فراداده جدید' });
                                    }, function (error) {
                                        return toaster.pop('error', '', 'عدم حذف موفق فراداده');
                                    });
                                }, function (error) {
                                    return toaster.pop('error', '', 'عدم حذف موفق فراداده');
                                });
                            });else $uibModalInstance.close({ error: 'انصراف از ساخت فراداده جدید' });
                        } catch (e) {
                            console.error(e);
                            $uibModalInstance.close({ error: 'انصراف از ساخت فراداده جدید' });
                        }
                    };
                    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee19() {
                        return regeneratorRuntime.wrap(function _callee19$(_context19) {
                            while (1) {
                                switch (_context19.prev = _context19.next) {
                                    case 0:
                                        _context19.prev = 0;
                                        _context19.next = 3;
                                        return JS.addJS('ecma5/ExternalLiberary/Public/removeAllPlayers.js?dev=' + randomVersionName);

                                    case 3:
                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/removeAllPlayers.js?dev=' + randomVersionName] = 'removeAllPlayers';
                                        try {
                                            removeAllPlayers();
                                        } catch (e) {
                                            console.error(e);
                                        }

                                        window.clearAllIntervals();

                                        _.forEach(_.clone($scope.data.removeExternalCSS), function () {
                                            var _ref18 = _asyncToGenerator(regeneratorRuntime.mark(function _callee17(value, src) {
                                                return regeneratorRuntime.wrap(function _callee17$(_context17) {
                                                    while (1) {
                                                        switch (_context17.prev = _context17.next) {
                                                            case 0:
                                                                _context17.prev = 0;
                                                                _context17.next = 3;
                                                                return style.removeCSS(src);

                                                            case 3:
                                                                _context17.next = 8;
                                                                break;

                                                            case 5:
                                                                _context17.prev = 5;
                                                                _context17.t0 = _context17['catch'](0);

                                                                console.error(_context17.t0);

                                                            case 8:
                                                            case 'end':
                                                                return _context17.stop();
                                                        }
                                                    }
                                                }, _callee17, undefined, [[0, 5]]);
                                            }));

                                            return function (_x20, _x21) {
                                                return _ref18.apply(this, arguments);
                                            };
                                        }());

                                        _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                            var _ref19 = _asyncToGenerator(regeneratorRuntime.mark(function _callee18(funcName, src) {
                                                return regeneratorRuntime.wrap(function _callee18$(_context18) {
                                                    while (1) {
                                                        switch (_context18.prev = _context18.next) {
                                                            case 0:
                                                                _context18.prev = 0;
                                                                _context18.next = 3;
                                                                return JS.removeJS(src, funcName);

                                                            case 3:
                                                                _context18.next = 8;
                                                                break;

                                                            case 5:
                                                                _context18.prev = 5;
                                                                _context18.t0 = _context18['catch'](0);

                                                                console.error(_context18.t0);

                                                            case 8:
                                                            case 'end':
                                                                return _context18.stop();
                                                        }
                                                    }
                                                }, _callee18, undefined, [[0, 5]]);
                                            }));

                                            return function (_x22, _x23) {
                                                return _ref19.apply(this, arguments);
                                            };
                                        }());

                                        // clear all data and functions
                                        $scope.func = undefined;
                                        $scope.data = undefined;
                                        _context19.next = 15;
                                        break;

                                    case 12:
                                        _context19.prev = 12;
                                        _context19.t0 = _context19['catch'](0);

                                        console.error(_context19.t0);

                                    case 15:
                                    case 'end':
                                        return _context19.stop();
                                }
                            }
                        }, _callee19, undefined, [[0, 12]]);
                    })));
                },
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    service: function service() {
                        return _service;
                    },
                    dateFormatInternal: function dateFormatInternal() {
                        return _dateFormatInternal;
                    },
                    JS: function JS() {
                        return _JS;
                    },
                    style: function style() {
                        return _style;
                    },
                    profile: function profile() {
                        return _profile;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                if (_.has(response, 'success')) resolve(response.success);else reject(response.error);
            }, function (error) {
                return reject('error');
            });
        } catch (e) {
            reject(e);
        }
    });
};