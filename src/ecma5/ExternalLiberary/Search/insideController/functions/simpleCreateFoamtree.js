'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var simpleCreateFoamtreeSimpleCtrl = function simpleCreateFoamtreeSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.simpleCreateFoamtree = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var _system, foamtreeObjects, content, contentObject, keywords, keywordsObject, name, nameObject, notes, notesObject, _metadata, prop_Count, _groups, i, j, metadataObject;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!($scope.data.crrotObject != null)) {
                                    _context.next = 21;
                                    break;
                                }

                                _context.next = 4;
                                return JSManagement.addJS('resource/javaScript/carrotsearch.foamtree.js?dev=' + randomVersionName);

                            case 4:
                                $scope.data.removeExternalFuncs['resource/javaScript/carrotsearch.foamtree.js?dev=' + randomVersionName] = 'CarrotSearchFoamTree';

                                _system = $scope.data.crrotObject.data.system;
                                foamtreeObjects = {
                                    dataObject: {
                                        groups: []
                                    }
                                };
                                content = _system.content.content;

                                if (content.total > 0) {
                                    contentObject = {
                                        label: $translate.instant('search.zm.tree_frequency_content'),
                                        weight: content.total,
                                        key: 'content'
                                    };

                                    foamtreeObjects.dataObject.groups.push(contentObject);
                                }

                                keywords = _system.keywords.keywords;

                                if (keywords.total > 0) {
                                    keywordsObject = {
                                        label: $translate.instant('search.zm.tree_frequency_keyword'),
                                        weight: keywords.total,
                                        key: 'keyword'
                                    };

                                    foamtreeObjects.dataObject.groups.push(keywordsObject);
                                }

                                name = _system.name.name;

                                if (name.total > 0) {
                                    nameObject = {
                                        label: $translate.instant('search.zm.tree_frequency_name'),
                                        weight: name.total,
                                        key: 'name'
                                    };

                                    foamtreeObjects.dataObject.groups.push(nameObject);
                                }

                                notes = _system.notes.notes;

                                if (notes.total > 0) {
                                    notesObject = {
                                        label: $translate.instant('search.zm.tree_frequency_note'),
                                        weight: notes.total,
                                        key: 'notes'
                                    };

                                    foamtreeObjects.dataObject.groups.push(notesObject);
                                }

                                _metadata = $scope.data.crrotObject.data.metadata;
                                prop_Count = 0;
                                _groups = [];

                                for (i in _metadata) {
                                    for (j in _metadata[i]) {
                                        prop_Count += _metadata[i][j].total;
                                        if (_metadata[i][j].total > 0) _groups.push({
                                            label: j,
                                            weight: _metadata[i][j].total,
                                            key: i,
                                            type: 'propertyGroup'
                                        });
                                        //key : _metadata[i],
                                    }
                                }

                                if (prop_Count > 0) {
                                    metadataObject = {
                                        label: $translate.instant('search.zm.tree_frequency_metadata'),
                                        weight: prop_Count,
                                        groups: _groups
                                    };

                                    foamtreeObjects.dataObject.groups.push(metadataObject);
                                }

                                _.defer(function () {

                                    if ($scope.data.foamtree == undefined || $scope.data.foamtree == null) {

                                        $scope.data.foamtree = new CarrotSearchFoamTree({
                                            id: "visualizationFoamTreeSimple",
                                            dataObject: _.clone(foamtreeObjects.dataObject),
                                            onGroupSelectionChanged: $scope.func.carrot.proxy_groupClicked,
                                            onDocumentSelection: $scope.func.carrot.proxy_documentClicked,
                                            onModelChange: $scope.func.carrot.proxy_onModelChanged
                                        });
                                    } else {
                                        $scope.data.foamtree.set('dataObject', _.clone(foamtreeObjects.dataObject));
                                        $scope.data.foamtree.redraw();
                                    }
                                    $scope.data.foamtree.update();
                                    foamtreeObjects = undefined;
                                }, 10);

                            case 21:
                                _context.next = 26;
                                break;

                            case 23:
                                _context.prev = 23;
                                _context.t0 = _context['catch'](0);

                                console.error(_context.t0);

                            case 26:
                                _context.prev = 26;

                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                return _context.finish(26);

                            case 29:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 23, 26, 29]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};