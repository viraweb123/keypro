'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var simpleCreateCircleSimpleCtrl = function simpleCreateCircleSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.simpleCreateCircle = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                    var _system, circleObjects, content, contentObject, keywords, keywordsObject, name, nameObject, notes, notesObject, _metadata, prop_Count, _groups, i, j, metadataObject;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!($scope.data.crrotObject != null && $scope.data.crrotObject.data && $scope.data.crrotObject.data.system)) {
                                        _context.next = 22;
                                        break;
                                    }

                                    _context.next = 4;
                                    return JSManagement.addJS('resource/javaScript/carrotsearch.circles.js?dev=' + randomVersionName);

                                case 4:
                                    $scope.data.removeExternalFuncs['resource/javaScript/carrotsearch.circles.js?dev=' + randomVersionName] = 'CarrotSearchCircles';

                                    _system = _.clone($scope.data.crrotObject.data.system);
                                    circleObjects = {
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

                                        circleObjects.dataObject.groups.push(contentObject);
                                    }
                                    keywords = _system.keywords.keywords;

                                    if (keywords.total > 0) {
                                        keywordsObject = {
                                            label: $translate.instant('search.zm.tree_frequency_keyword'),
                                            weight: keywords.total,
                                            key: 'keyword'
                                        };

                                        circleObjects.dataObject.groups.push(keywordsObject);
                                    }
                                    name = _system.name.name;

                                    if (name.total > 0) {
                                        nameObject = {
                                            label: $translate.instant('search.zm.tree_frequency_name'),
                                            weight: name.total,
                                            key: 'name'
                                        };

                                        circleObjects.dataObject.groups.push(nameObject);
                                    }
                                    notes = _system.notes.notes;

                                    if (notes.total > 0) {
                                        notesObject = {
                                            label: $translate.instant('search.zm.tree_frequency_note'),
                                            weight: notes.total,
                                            key: 'notes'
                                        };

                                        circleObjects.dataObject.groups.push(notesObject);
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
                                                type: 'propertyGroup',
                                                key: i
                                            });
                                        }
                                    }
                                    if (prop_Count > 0) {
                                        metadataObject = {
                                            label: $translate.instant('search.zm.tree_frequency_metadata'),
                                            weight: prop_Count,
                                            groups: _groups
                                        };

                                        circleObjects.dataObject.groups.push(metadataObject);
                                    }
                                    if (_.includes([null, undefined], $scope.data.circle)) {
                                        $scope.data.circle = new CarrotSearchCircles({
                                            id: "visualizationCirclesSimple",
                                            dataObject: _.clone(circleObjects.dataObject),
                                            onGroupSelectionChanged: $scope.func.carrot.proxy_groupClicked,
                                            onDocumentSelection: $scope.func.carrot.proxy_documentClicked,
                                            onModelChange: $scope.func.carrot.proxy_onModelChanged
                                        });
                                    }
                                    _.defer(function () {
                                        try {
                                            $scope.data.circle.set('dataObject', _.clone(circleObjects.dataObject));
                                            $scope.data.circle.redraw();
                                            circleObjects = undefined;
                                            $scope.data.circle.update();
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }, 50);

                                case 22:
                                    _context.next = 27;
                                    break;

                                case 24:
                                    _context.prev = 24;
                                    _context.t0 = _context['catch'](0);

                                    console.error(_context.t0);

                                case 27:
                                    _context.prev = 27;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context.finish(27);

                                case 30:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 24, 27, 30]]);
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