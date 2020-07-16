"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mapViewer;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//http://stackoverflow.com/questions/26878659/openlayers-3-how-to-register-feature-modified-event-as-featuremodified-in-open
function mapViewer() {
    return {
        restrict: "EA",
        scope: {
            nodeValue: "=",
            runInit: "="
        },
        templateUrl: "../../../ecma5/Directive/mapViewer/mapViewer.html?dev=" + randomVersionName,
        controller: ['$scope', 'toaster', '$rootScope', '$element', '$uibModal', '$upload', '$compile', function ($scope, toaster, $rootScope, $element, $uibModal, $upload, $compile) {
            var _this = this;

            $scope.data = {
                map: null,
                imageLayer: null,
                vectorLayer: null,
                vectors: null,
                list: [],
                img: null,

                flages: {
                    isEdit: false,
                    isFull: false
                },

                draw: null,
                modify: null,
                query: {},

                type: null
            };

            $scope.func = {};

            /** TODO ----------------------Query-------------------------------- **/
            $scope.func.showQuery = function () {
                try {

                    if (!_.isEqual($scope.data.query, {})) $scope.nodeValue.func.showResult(_.map($scope.data.query, function (v, k) {
                        return "property=" + k + "=" + v.value;
                    }).join('&'));
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.navBar = {};
            $scope.func.navBar.edit = function (event) {
                try {
                    $scope.data.flages.isEdit = true;
                    try {
                        $scope.data.map.removeInteraction($scope.data.modify);
                    } catch (er) {
                        console.error(er);
                    } finally {
                        $scope.data.modify = null;
                        $scope.data.isEditShape = false;
                    }

                    $element.css('cursor', 'crosshair');
                    $element.css('cursor', '-webkit-crosshair');
                    $element.css('cursor', '-moz-crosshair');
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.navBar.view = function (event) {
                try {
                    $scope.data.flages.isEdit = false;
                    try {
                        $scope.data.map.removeInteraction($scope.data.modify);
                    } catch (er) {
                        console.error(er);
                    } finally {
                        $scope.data.modify = null;
                        $scope.data.isEditShape = false;
                    }
                    $element.css('cursor', 'grab');
                    $element.css('cursor', '-webkit-grab');
                    $element.css('cursor', '-moz-grab');
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.navBar.goback = function (event) {
                try {
                    $scope.func.Query.remove($scope.nodeValue.data.map.id);
                    $scope.func.goToNode($scope.nodeValue.data.map.parentId);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.navBar.erase = function (event) {

                $scope.nodeValue.func.erase($scope.nodeValue.data.map.id).then(function (res) {
                    if ($scope.nodeValue.data.map.parentId != 0) $scope.func.goToNode($scope.nodeValue.data.map.parentId);else {
                        $scope.func.removeFuncs();
                        $scope.nodeValue.func.end($scope.nodeValue.data.map);
                    }
                }, function (error) {});
            };
            $scope.func.navBar.screen = {};
            $scope.func.navBar.screen.goFull = function (event) {
                try {
                    $scope.data.flages.isFull = true;

                    //$($scope.data.buttons.backFull).css({"display": "block"});
                    //$($scope.data.buttons.full).css({"display": "none"});
                    var tag = $element[0];
                    var request = tag.requestFullscreen || tag.webkitRequestFullscreen || tag.mozRequestFullScreen || tag.msRequestFullscreen;
                    if (typeof request !== "undefined" && request) request.call(tag);else if (typeof window.ActiveXObject !== "undefined") {
                        // for Internet Explorer
                        var wscript = new ActiveXObject("WScript.Shell");
                        if (wscript != null) wscript.SendKeys("{F11}");
                    }
                    setTimeout(function () {
                        window.document.addEventListener('webkitfullscreenchange', $scope.func.navBar.screen.backFull, false);
                        window.document.addEventListener('mozfullscreenchange', $scope.func.navBar.screen.backFull, false);
                        window.document.addEventListener('fullscreenchange', $scope.func.navBar.screen.backFull, false);
                        window.document.addEventListener('MSFullscreenChange', $scope.func.navBar.screen.backFull, false);
                    }, 1000);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.navBar.screen.backFull = function (event) {
                try {
                    $scope.data.flages.isFull = false;
                    var request = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
                    if (typeof request !== "undefined" && request) request.call(document);
                    window.document.removeEventListener('webkitfullscreenchange', $scope.func.navBar.screen.backFull, false);
                    window.document.removeEventListener('mozfullscreenchange', $scope.func.navBar.screen.backFull, false);
                    window.document.removeEventListener('fullscreenchange', $scope.func.navBar.screen.backFull, false);
                    window.document.removeEventListener('MSFullscreenChange', $scope.func.navBar.screen.backFull, false);
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.navBar.createShape = function (type) {
                try {
                    try {
                        try {
                            $scope.data.map.removeInteraction($scope.data.modify);
                        } catch (er) {
                            console.error(er);
                        } finally {
                            $scope.data.modify = null;
                            $scope.data.isEditShape = false;
                        }
                        $scope.data.map.removeInteraction($scope.data.draw);
                    } catch (er) {
                        console.error(er);
                    }
                    $scope.data.draw = null;
                    $scope.data.modify = null;
                    $scope.data.type = type;
                    switch (type) {
                        case 'Square':
                            var dblclickzoom;
                            $scope.data.map.getInteractions().forEach(function (interaction) {
                                if (interaction instanceof ol.interaction.DoubleClickZoom) {
                                    dblclickzoom = interaction;
                                }
                            });
                            $scope.data.draw = new ol.interaction.Draw({
                                features: $scope.data.vectors.getFeatures(),
                                source: $scope.data.vectors,
                                type: 'Circle',
                                geometryFunction: ol.interaction.Draw.createRegularPolygon(4)

                            });
                            if (dblclickzoom) $scope.data.map.removeInteraction(dblclickzoom);
                            $scope.data.draw.on('drawend', function (e) {

                                e.feature.featureID = 1;
                                e.feature.setProperties({
                                    'id': 1,
                                    'name': 'Polygon',
                                    'description': 'Some values',
                                    'type': 'Square',
                                    'query': '',
                                    'imageUuid': -1,
                                    'parentId': _.clone($scope.nodeValue.data.map.id)
                                });
                                $scope.data.map.removeInteraction($scope.data.draw);
                                if (dblclickzoom) {
                                    setTimeout(function () {
                                        $scope.data.map.addInteraction(dblclickzoom);
                                        $scope.func.createFeature(e.feature);
                                    });
                                }
                            });
                            $scope.data.map.addInteraction($scope.data.draw);
                            break;
                        case 'Box':
                            var dblclickzoom;
                            $scope.data.map.getInteractions().forEach(function (interaction) {
                                if (interaction instanceof ol.interaction.DoubleClickZoom) {
                                    dblclickzoom = interaction;
                                }
                            });
                            $scope.data.draw = new ol.interaction.Draw({
                                features: $scope.data.vectors.getFeatures(),
                                source: $scope.data.vectors,
                                type: 'Circle',
                                geometryFunction: ol.interaction.Draw.createBox()

                            });
                            if (dblclickzoom) $scope.data.map.removeInteraction(dblclickzoom);
                            $scope.data.draw.on('drawend', function (e) {
                                e.feature.featureID = 1;
                                e.feature.setProperties({
                                    'id': 1,
                                    'name': 'Polygon',
                                    'description': 'Some values',
                                    'type': 'Box',
                                    'query': '',
                                    'imageUuid': -1,
                                    'parentId': $scope.nodeValue.data.map.id
                                });
                                $scope.data.map.removeInteraction($scope.data.draw);
                                if (dblclickzoom) {
                                    setTimeout(function () {
                                        $scope.data.map.addInteraction(dblclickzoom);
                                        $scope.func.createFeature(e.feature, e);
                                    });
                                }
                            });
                            $scope.data.map.addInteraction($scope.data.draw);
                            break;
                        case 'Star':
                            var dblclickzoom;
                            $scope.data.map.getInteractions().forEach(function (interaction) {
                                if (interaction instanceof ol.interaction.DoubleClickZoom) {
                                    dblclickzoom = interaction;
                                }
                            });
                            $scope.data.draw = new ol.interaction.Draw({
                                features: $scope.data.vectors.getFeatures(),
                                source: $scope.data.vectors,
                                type: 'Circle',
                                geometryFunction: function geometryFunction(coordinates, geometry) {
                                    if (!geometry) geometry = new ol.geom.Polygon(null);
                                    var center = coordinates[0];
                                    var last = coordinates[1];
                                    var dx = center[0] - last[0];
                                    var dy = center[1] - last[1];
                                    var radius = Math.sqrt(dx * dx + dy * dy);
                                    var rotation = Math.atan2(dy, dx);
                                    var newCoordinates = [];
                                    var numPoints = 12;
                                    for (var i = 0; i < numPoints; ++i) {
                                        var angle = rotation + i * 2 * Math.PI / numPoints;
                                        var fraction = i % 2 === 0 ? 1 : 0.5;
                                        var offsetX = radius * fraction * Math.cos(angle);
                                        var offsetY = radius * fraction * Math.sin(angle);
                                        newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
                                    }
                                    newCoordinates.push(newCoordinates[0].slice());
                                    geometry.setCoordinates([newCoordinates]);
                                    return geometry;
                                }
                            });
                            if (dblclickzoom) $scope.data.map.removeInteraction(dblclickzoom);
                            $scope.data.draw.on('drawend', function (e) {
                                e.feature.featureID = 1;
                                e.feature.setProperties({
                                    'id': 1,
                                    'name': 'Polygon',
                                    'description': 'Some values',
                                    'type': 'Star',
                                    'query': '',
                                    'imageUuid': -1,
                                    'parentId': $scope.nodeValue.data.map.id
                                });
                                $scope.data.map.removeInteraction($scope.data.draw);
                                if (dblclickzoom) {
                                    setTimeout(function () {
                                        $scope.data.map.addInteraction(dblclickzoom);
                                        $scope.func.createFeature(e.feature, e);
                                    });
                                }
                            });
                            $scope.data.map.addInteraction($scope.data.draw);
                            break;
                        case 'Polygon':
                            var dblclickzoom;
                            $scope.data.map.getInteractions().forEach(function (interaction) {
                                if (interaction instanceof ol.interaction.DoubleClickZoom) {
                                    dblclickzoom = interaction;
                                }
                            });
                            $scope.data.draw = new ol.interaction.Draw({
                                features: $scope.data.vectors.getFeatures(),
                                source: $scope.data.vectors,
                                type: type,
                                minPoints: 3
                            });
                            if (dblclickzoom) $scope.data.map.removeInteraction(dblclickzoom);
                            $scope.data.draw.on('drawend', function (e) {
                                e.feature.featureID = 1;
                                e.feature.setProperties({
                                    'id': 1,
                                    'name': 'Polygon',
                                    'description': 'Some values',
                                    'type': 'Polygon',
                                    'query': '',
                                    'imageUuid': -1,
                                    'parentId': $scope.nodeValue.data.map.id
                                });
                                $scope.data.map.removeInteraction($scope.data.draw);
                                if (dblclickzoom) {
                                    setTimeout(function () {
                                        $scope.data.map.addInteraction(dblclickzoom);
                                        $scope.func.createFeature(e.feature, e);
                                    });
                                }
                            });
                            $scope.data.map.addInteraction($scope.data.draw);
                            break;
                        case 'Circle':
                            var dblclickzoom;
                            $scope.data.map.getInteractions().forEach(function (interaction) {
                                if (interaction instanceof ol.interaction.DoubleClickZoom) {
                                    dblclickzoom = interaction;
                                }
                            });
                            $scope.data.draw = new ol.interaction.Draw({
                                features: $scope.data.vectors.getFeatures(),
                                source: $scope.data.vectors,
                                type: type
                            });
                            if (dblclickzoom) $scope.data.map.removeInteraction(dblclickzoom);
                            $scope.data.draw.on('drawend', function (e) {
                                e.feature.featureID = 1;
                                e.feature.setProperties({
                                    'id': 1,
                                    'name': 'Polygon',
                                    'description': 'Some values',
                                    'type': 'Circle',
                                    'query': '',
                                    'imageUuid': -1,
                                    'parentId': $scope.nodeValue.data.map.id
                                });
                                $scope.data.map.removeInteraction($scope.data.draw);
                                if (dblclickzoom) {
                                    setTimeout(function () {
                                        $scope.data.map.addInteraction(dblclickzoom);
                                        $scope.func.createFeature(e.feature, e);
                                    });
                                }
                            });
                            $scope.data.map.addInteraction($scope.data.draw);
                            break;
                        case 'Edit':
                            //http://viglino.github.io/ol3-ext/
                            $scope.data.isEditShape = true;
                            $scope.data.modify = new ol.interaction.Transform({
                                translateFeature: true,
                                scale: true,
                                rotate: true,
                                keepAspectRatio: ol.events.condition.always,
                                translate: true,
                                stretch: true
                            });
                            $scope.data.map.addInteraction($scope.data.modify);
                            $scope.data.modify.on('rotating', function (e) {
                                e.feature.set('angle', startangle - e.angle);
                            });
                            $scope.data.modify.on(['rotateend', 'translateend', 'scaleend'], function (e) {
                                try {
                                    $scope.func.modifyFeature(e.feature, e);
                                } catch (e) {
                                    console.error(e);
                                    try {
                                        $scope.data.map.removeInteraction($scope.data.modify);
                                    } catch (er) {
                                        console.error(er);
                                    } finally {
                                        $scope.data.isEditShape = false;
                                    }
                                }
                            });
                            break;
                    }
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.navBar.update = function () {
                try {

                    $scope.nodeValue.func.addImage({
                        parentId: $scope.nodeValue.data.map.parentId,
                        id: $scope.nodeValue.data.id,
                        coordinate: JSON.stringify($scope.nodeValue.data.map.coordinate),
                        style: JSON.stringify($scope.nodeValue.data.map.style),
                        type: $scope.nodeValue.data.map.type,
                        title: $scope.nodeValue.data.map.title,
                        description: $scope.nodeValue.data.map.description,
                        query: $scope.data.query,
                        imageUuid: $scope.nodeValue.data.map.imageUuid
                    }).then(function (res) {
                        $scope.nodeValue.func.addToMap(res.query).then(function (result) {
                            //$scope.func.changeQuery(res.queryItems, $scope.nodeValue.data.id);

                            $scope.func.Query.remove($scope.nodeValue.data.id);
                            _.defer(function () {
                                return $scope.func.Query.add(res.queryItems, $scope.nodeValue.data.id);
                            }, 10);

                            $scope.nodeValue.func.image(res.image).then(function (resultImage) {
                                $scope.nodeValue.data.map.title = res.title;
                                $scope.nodeValue.data.map.description = res.description;
                                $scope.nodeValue.data.image = resultImage;
                                $scope.func.initiallize();
                            }, function (error) {});
                        }, function (error) {
                            return console.error(error);
                        });
                    }, function (error) {
                        return console.error(error);
                    });
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.removeFuncs = function (e) {
                try {
                    if (e) e.preventDefault();
                    if (_.includes(['grabbing', '-webkit-grabbing', '-moz-grab'], $element.css('cursor'))) {
                        $element.css('cursor', 'grab');
                        $element.css('cursor', '-webkit-grab');
                        $element.css('cursor', '-moz-grab');
                    }
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.Query = {};
            $scope.func.Query.add = function (Queries, nodeId) {
                try {
                    _.forEach(Queries, function (v, k) {
                        if (!_.has($scope.data.query, k)) {
                            $scope.data.query[k] = {
                                key: k,
                                id: nodeId,
                                value: v.value
                            };
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.Query.remove = function (nodeId) {
                try {
                    $scope.data.query = _.keyBy(_.filter($scope.data.query, function (v, k) {
                        return v.id != nodeId;
                    }), 'key');
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.createFeature = function (feature, e) {
                try {
                    $scope.data.type = null;
                    if (_.has(feature, 'I')) {
                        var coordinat = [];
                        try {
                            coordinat = JSON.stringify(feature.getGeometry().getCoordinates());
                        } catch (e) {
                            try {
                                var center = feature.getGeometry().getCenter();
                                coordinat = JSON.stringify([center[0], center[1], feature.getGeometry().getRadius()]);
                            } catch (e) {
                                console.error(e);
                            }
                        }

                        $scope.nodeValue.func.addImage({
                            parentId: $scope.nodeValue.data.map.id,
                            id: 0,
                            coordinate: coordinat,
                            style: JSON.stringify({}),
                            type: feature.I.type,
                            title: '',
                            description: '',
                            query: $scope.data.query, //feature.I.query,
                            imageUuid: -1
                        }).then(function (res) {

                            $scope.nodeValue.func.addToMap(res.query).then(function (result) {

                                $scope.nodeValue.func.image(res.image).then(function () {
                                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resultImage) {
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:

                                                        $scope.nodeValue.data.map.title = res.title;
                                                        $scope.nodeValue.data.id = result.data;
                                                        $scope.nodeValue.data.map.parentId = res.parentId;
                                                        $scope.nodeValue.data.map.description = res.description;
                                                        $scope.nodeValue.data.image = resultImage;
                                                        $scope.nodeValue.data.map.id = result.data;

                                                        $scope.func.Query.add(res.queryItems, result.data);

                                                        $scope.nodeValue.data.map.query = JSON.stringify(res.queryItems);
                                                        $scope.nodeValue.data.query = JSON.stringify(res.queryItems);
                                                        $scope.func.navBar.view();
                                                        //$scope.nodeValue.data.query = _.clone(res.query);
                                                        /*await $scope.func.clearLayers();
                                                         $scope.func.initiallize();*/

                                                        $scope.func.initiallize();

                                                    case 11:
                                                    case "end":
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    }));

                                    return function (_x) {
                                        return _ref.apply(this, arguments);
                                    };
                                }(), function (error) {
                                    return console.error(error);
                                });
                            }, function (error) {
                                return console.error(error);
                            });
                        }, function (error) {
                            try {
                                $scope.data.vectors.removeFeature(feature);
                            } catch (er) {
                                console.error(er);
                            }
                            console.error(error);
                        });
                    } else {
                        toaster.pop('error', '', 'مشکلی در ایجاد شکل جدید ایجاد شده است .');
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    $scope.func.navBar.view();
                }
            };
            $scope.func.modifyFeature = function (feature, e) {
                $scope.data.type = null;
                try {

                    //http://viglino.github.io/ol3-ext/examples/map.interaction.transform.html

                    var coordinat = [];
                    try {
                        coordinat = JSON.stringify(feature.getGeometry().getCoordinates());
                    } catch (e) {
                        try {
                            var center = feature.getGeometry().getCenter();
                            coordinat = JSON.stringify([center[0], center[1], feature.getGeometry().getRadius()]);
                        } catch (e) {
                            console.error(e);
                        }
                    }

                    coordinat = coordinat.replace(/(\d+\.\d+)/g, function (dig) {
                        return Number(dig).toFixed(0);
                    });

                    $scope.nodeValue.func.addToMap("id=" + feature.I.data.id + "&query=" + JSON.stringify(_.keyBy(_.map(_.filter($scope.data.query, function (i) {
                        return i.id == feature.I.data.id;
                    }), function (j) {
                        return { key: j.key, value: j.value };
                    }), 'key')) + "&parentId=" + feature.I.data.parentId + "&imageUuid=" + feature.I.data.imageUuid + "&coordinate=" + coordinat + "&style=" + feature.I.data.style + "&type=" + feature.I.data.type + "&title=" + feature.I.data.title + "&description=" + feature.I.data.description).then(function (result) {
                        toaster.pop('success', '', 'آیتم با موفقیت ویرایش گردید .');
                        feature.I.data.coordinate = _.clone(coordinat);
                        coordinat = undefined;
                        $scope.func.removeModifyLayer();
                    }, function (error) {
                        console.error(error);
                        $scope.func.removeModifyLayer();
                    });
                } catch (e) {
                    $scope.func.removeModifyLayer();
                    console.error(e);
                }
            };
            $scope.func.removeModifyLayer = function () {
                try {
                    $scope.data.map.removeInteraction($scope.data.modify);
                } catch (er) {
                    console.error(er);
                } finally {
                    $scope.data.modify = null;
                    $scope.data.isEditShape = false;
                }

                try {
                    $scope.data.flages.isEdit = false;
                    $element.css('cursor', 'grab');
                    $element.css('cursor', '-webkit-grab');
                    $element.css('cursor', '-moz-grab');
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.getMapNodes = function (map) {
                $scope.nodeValue.func.getMapItems(map).then(function (res) {
                    try {
                        $scope.nodeValue.data.image = res.image;
                        $scope.nodeValue.data.list = res.list;
                        $scope.nodeValue.data.map = angular.copy(map);
                        $scope.nodeValue.data.id = map.id;
                        $scope.nodeValue.data.query = _.clone(map.query);
                        //$scope.nodeValue.data.query = _.clone(map.query);
                        $scope.func.Query.add(JSON.parse(map.query), map.id);
                        $($element[0].querySelector('.mapViewer')).fadeOut(1000, function () {
                            $scope.func.initiallize();
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }, function (error) {
                    return console.error(error);
                });
            };
            $scope.func.goToNode = function (id) {
                try {
                    $scope.nodeValue.func.getMap(id).then(function (res) {
                        return $scope.func.getMapNodes(res.map);
                    }, function (error) {
                        return console.error(error);
                    });
                } catch (e) {
                    console.error(e);
                }
            };

            /* TODO get Node's List from Server */
            $scope.func.getNodeList = function () {
                try {
                    $scope.data.list = [];
                    $scope.nodeValue.func.getList($scope.nodeValue.data.id).then(function (res) {
                        $scope.data.list = _.clone(res.data.originalElement);
                        $scope.data.list = _.isArray($scope.data.list) ? $scope.data.list : [$scope.data.list];
                        try {
                            for (var i = 0; i < $scope.data.list.length; i++) {
                                try {
                                    var array = _.chunk(eval($scope.data.list[i].coordinate), 2);
                                    switch ($scope.data.list[i].type) {
                                        case "Box":
                                        case "Star":
                                        case "Polygon":
                                        case "Square":
                                            array.push(array[0]);
                                            $scope.data.vectors.addFeature(new ol.Feature({
                                                data: $scope.data.list[i],
                                                id: $scope.data.list[i].id,
                                                geometry: new ol.geom.Polygon(eval($scope.data.list[i].coordinate))
                                            }));
                                            break;
                                        case "poly":
                                            array.push(array[0]);
                                            $scope.data.vectors.addFeature(new ol.Feature({
                                                data: $scope.data.list[i],
                                                id: $scope.data.list[i].id,
                                                geometry: new ol.geom.Polygon([array])
                                            }));
                                            break;
                                        case "circle":
                                        case "Circle":
                                            $scope.data.vectors.addFeature(new ol.Feature({
                                                data: $scope.data.list[i],
                                                id: $scope.data.list[i].id,
                                                geometry: new ol.geom.Circle(array[0], //center
                                                array[1][0] //opt_radius
                                                )
                                            }));
                                            break;
                                        case "rect":
                                            $scope.data.vectors.addFeature(new ol.Feature({
                                                data: $scope.data.list[i],
                                                id: $scope.data.list[i].id,
                                                geometry: new ol.geom.Polygon([[array[0], [array[1][0], array[0][1]], array[1], [array[0][0], array[1][1]], array[0]]])
                                            }));
                                            break;
                                    }
                                } catch (er) {
                                    console.error(er);
                                }
                            }
                            $scope.data.map.on("click", function (e) {
                                $scope.data.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    if (_.has(feature, 'I')) {

                                        if (!$scope.data.isEditShape) $scope.func.goToNode(feature.I.data.id);
                                    }
                                });
                            });

                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    }, function (error) {
                        return toaster.pop('error', '', 'مشکلی در دریافت اتصالات به وجود آمده است .');
                    });
                } catch (e) {
                    console.error(e);
                }
            };

            /* $scope.func.editFeature = (feature,layer) => {
                 $scope.data.modify = new ol.interaction.Modify({
                  });
                  /!*
                  if (dblclickzoom)
                  $scope.data.map.removeInteraction(dblclickzoom);
                  *!/
                  $scope.data.modify.on('modifyend', function (e) {
                      e.feature.featureID = 1;
                      e.feature.setProperties({
                      'id': 1,
                      'name': 'Polygon',
                      'description': 'Some values'
                     });
                  $scope.data.map.removeInteraction($scope.data.Modify);
                   });
             }*/

            $scope.func.clearLayers = function () {
                return new Promise(function (resolve, reject) {
                    $scope.data.type = null;
                    try {
                        $scope.data.map.removeLayer($scope.data.imageLayer);
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        $scope.data.vectors.clear();
                    } catch (e) {
                        console.error(e);
                    }

                    try {
                        $scope.data.map.removeLayer($scope.data.vectorLayer);
                    } catch (e) {
                        console.error(e);
                    }

                    $scope.func.removeModifyLayer();

                    _.defer(function () {
                        return resolve(true);
                    });
                });
            };
            $scope.func.readyMap = function () {
                $scope.data.type = null;
                $scope.func.removeModifyLayer();
                $element.css('cursor', 'grab');
                $element.css('cursor', '-webkit-grab');
                $element.css('cursor', '-moz-grab');
                $scope.data.flages.isEdit = false;
            };

            $scope.func.initiallize = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;


                                $scope.func.readyMap();

                                if (!($scope.nodeValue.data.id != null)) {
                                    _context2.next = 11;
                                    break;
                                }

                                /* TODO if node if root clear all Query Items */
                                if ($scope.nodeValue.data.map.parentId == 0) {
                                    try {
                                        $scope.data.query = {};
                                        $scope.func.Query.add(JSON.parse($scope.nodeValue.data.map.query), $scope.nodeValue.data.id);
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }

                                /* TODO clear all layer in MAP */
                                _context2.next = 6;
                                return $scope.func.clearLayers();

                            case 6:

                                $scope.data.img = null;
                                $scope.data.img = new Image();
                                $($scope.data.img).load(function () {
                                    try {

                                        var target = [0, 0, $(this)[0].width, $(this)[0].height];
                                        //**TODO if map is exist clear all inside layers **/
                                        if ($scope.data.map == null) $scope.data.map = new ol.Map({
                                            layers: [],
                                            target: 'mapViewer',
                                            view: new ol.View({
                                                projection: new ol.proj.Projection({
                                                    code: 'xkcd-image', //'pixel',
                                                    units: 'pixels',
                                                    extent: target
                                                }),
                                                center: ol.extent.getCenter(target),
                                                zoom: 2,
                                                maxZoom: 8
                                            })
                                        });else {
                                            try {
                                                $scope.data.map.getView().getProjection().setExtent(target);
                                            } catch (e) {
                                                console.error(e);
                                            }
                                            try {
                                                $scope.data.map.getView().setCenter(ol.extent.getCenter(target));
                                            } catch (e) {
                                                console.error(e);
                                            }
                                            try {
                                                $scope.data.map.getView().setZoom(2);
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }
                                        _.defer(function () {
                                            return window.document.querySelector('.mapViewer').style.display = "block";
                                        }, 500);
                                        /* TODO add Image layer to Map */
                                        $scope.data.imageLayer = new ol.layer.Image({
                                            source: new ol.source.ImageStatic({
                                                url: $(this)[0].src,
                                                projection: new ol.proj.Projection({
                                                    code: 'xkcd-image',
                                                    units: 'pixels',
                                                    extent: target
                                                }),
                                                imageExtent: target,
                                                imageSize: [$(this)[0].width, $(this)[0].height],
                                                center: ol.extent.getCenter(target)
                                            })
                                        });
                                        $scope.data.map.addLayer($scope.data.imageLayer);

                                        /* TODO add Cector layer to Map */
                                        $scope.data.vectors = new ol.source.Vector({});
                                        $scope.data.vectorLayer = new ol.layer.Vector({
                                            source: $scope.data.vectors,
                                            style: new ol.style.Style({
                                                fill: new ol.style.Fill({
                                                    color: 'rgba(255, 255, 255, 0.2)'
                                                }),
                                                stroke: new ol.style.Stroke({
                                                    color: '#ffcc33',
                                                    width: 2
                                                }),
                                                image: new ol.style.Circle({
                                                    radius: 5,
                                                    fill: new ol.style.Fill({
                                                        color: '#ffcc33'
                                                    })
                                                })
                                            })
                                        });
                                        $scope.data.map.addLayer($scope.data.vectorLayer);
                                        /**todo  remove openlayer logo in corner right down*/
                                        try {
                                            $("#mapViewer .ol-viewport  .ol-overlaycontainer-stopevent  ul").remove();
                                        } catch (e) {
                                            console.error(e);
                                        }

                                        /* TODO add All Vectors In Vector Layer from Server */
                                        $scope.func.getNodeList();

                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }).error(function () {
                                    //TODO notify the users that the image could not be loaded
                                    toaster.pop('error', '', 'مشکلی در دریافت تصویر به وجود آمده است .');
                                }).attr('src', $scope.nodeValue.data.image);
                                _context2.next = 12;
                                break;

                            case 11:
                                toaster.pop('error', "", "تصویر دریافتی فاقد ID می باشد .");

                            case 12:
                                _context2.next = 17;
                                break;

                            case 14:
                                _context2.prev = 14;
                                _context2.t0 = _context2["catch"](0);

                                console.error(_context2.t0);

                            case 17:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[0, 14]]);
            }));

            if ($scope.runInit == null) $scope.runInit = $scope.func.initiallize;

            $element.on('$destroy', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                try {
                                    $scope.data = undefined;
                                    $scope.func = undefined;
                                    $scope.$destroy();
                                } catch (e) {
                                    console.error(e);
                                }

                            case 1:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this);
            })));
        }]
    };
};