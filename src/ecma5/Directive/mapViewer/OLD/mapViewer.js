"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mapViewer;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function mapViewer() {
    return {
        restrict: "EA",
        scope: {
            nodeValue: "=",
            runInit: "="
        },
        templateUrl: "../../../ecma5/Directive/mapViewer/mapViewer.html?dev=" + randomVersionName,
        controller: ['$scope', 'Upload', 'toaster', '$rootScope', '$element', '$uibModal', '$upload', '$compile', function ($scope, Upload, toaster, $rootScope, $element, $uibModal, $upload, $compile) {
            var _this = this;

            var Point = function Point(x, y) {
                this._x = x;
                this._y = y;
            };

            Point.prototype = {
                set x(x) {
                    this._x = x;
                },
                get x() {
                    return this._x;
                },
                set y(y) {
                    this._y = y;
                },
                get y() {
                    return this._y;
                }
            };
            var Area = function Area(w, h) {
                this._w = w;
                this._h = h;
            };
            Area.prototype = {
                set w(w) {
                    this._w = w;
                },
                get w() {
                    return this._w;
                },
                set h(h) {
                    this._h = h;
                },
                get h() {
                    return this._h;
                }
            };
            var browserType = function browserType() {
                var ua = navigator.userAgent,
                    tem,
                    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];return 'IE ' + (tem[1] || '');
                }
                if (M[1] === 'Chrome') {
                    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
                }
                M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
                return M.join(' ');
            };
            var browserName = function browserName() {
                var ua = navigator.userAgent,
                    tem,
                    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return 'IE';
                }
                if (M[1] === 'Chrome') {
                    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
                }
                M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
                return M[0];
            };

            $scope.data = {

                query: {},
                browser: browserName(),
                position: new Point(0, 0),
                p: new Point(0, 0),
                mapSize: null,
                previousEvent: null,
                desingCanvas: null,
                currentTag: null,
                flages: {
                    isEdit: true,
                    isFull: true
                },
                img: {
                    width: 0,
                    height: 0
                },
                currentPoint: null,
                map: null,
                circle: {
                    point: null,
                    radius: null
                },
                square: {
                    point: null,
                    width: 0,
                    height: 0
                },
                polygon: {
                    points: []
                },
                base: new Point(0, 0),
                isClick: false,
                zoom: 1,
                zoomParam: {
                    // zoom out to 400% percent
                    upper: 2,
                    lower: 0.1,
                    level: 1,
                    ratio: 0.1
                },
                buttons: {
                    edit: null,
                    close: null,
                    arrowSpan: null,
                    arrowSpanDiv: null,
                    top: null,
                    topTimer: null,
                    down: null,
                    downTimer: null,
                    left: null,
                    leftTimer: null,
                    right: null,
                    rightTimer: null,
                    circle: null,
                    squar: null,
                    poly: null,
                    erase: null,
                    download: null,
                    view: null,
                    full: null,
                    backFull: null
                },
                // new File Upload
                upload: null,
                file: null
            };

            $scope.func = {};
            $scope.func.initiallize = function () {
                try {

                    $scope.data.flages.isEdit = true;
                    $scope.data.currentTag = $element;

                    angular.element($element).bind('mouseleave', $scope.func.removeFuncs);
                    angular.element($element).bind('mousemove', $scope.func.show);
                    $scope.func.addStyle();
                    //TODO Add Image If Exist
                    if ($scope.nodeValue.data.id != null) {
                        if ($scope.nodeValue.data.map.parentId == 0) $scope.func.clearQuery();
                        $scope.data.img = null;
                        $scope.data.img = new Image();
                        $scope.data.img.classList.add('map');
                        if ($element[0].querySelector("div .map")) angular.element($element[0].querySelector("div .map")).remove();
                        if ($element[0].querySelector('map[name="useMapName"]')) angular.element($element[0].querySelector('map[name="useMapName"]')).remove();
                        $($scope.data.img).load(function () {

                            // Image Successfully Loaded
                            $element.attr("width", $(this).width() + "px");
                            $element.attr("height", $(this).height() + "px");
                            this.setAttribute("id", $scope.nodeValue.data.id);
                            this.setAttribute("usemap", "#useMapName");
                            $element.append($(this));
                            $scope.data.map = $('<map  name="useMapName" ></map>');
                            $element.append($scope.data.map);
                            $scope.data.img.width = $(this).width();
                            $scope.data.img.height = $(this).height();
                            $scope.data.mapSize = new Area($(this).width(), $(this).height());
                            if ($scope.data.browser == "Firefox") angular.element($element[0].querySelector('.map')).bind('wheel', $scope.func.zoom.wheel);else if ($scope.data.browser == "Chrome") angular.element($element[0].querySelector('.map')).bind('mousewheel', $scope.func.zoom.wheel);
                            angular.element($element[0].querySelector('div .map')).bind('wheel', $scope.func.zoom.wheel);
                            ////$scope.func.addAreaToMap(list, $scope.data.map, $scope.openerCallbackFunction  , $('.map'));
                            $element.css('cursor', 'grabbing');
                            $element.css('cursor', '-webkit-grabbing');
                            $element.css('cursor', '-moz-grabbing');
                            angular.element($element[0].querySelector('.map')).bind('mousedown', $scope.func.drag.draggable);
                            // Get Nodes List
                            $scope.func.getNodeList();
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        }).error(function () {
                            //TODO notify the users that the image could not be loaded
                            toaster.pop('error', '', 'مشکلی در دریافت تصویر به وجود آمده است .');
                        }).attr('src', $scope.nodeValue.data.image);
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.getNodeList = function () {
                try {
                    $scope.data.list = [];
                    $scope.nodeValue.func.getList($scope.nodeValue.data.id).then(function (res) {
                        $('.map').maphilight({
                            strokeColor: '808080',
                            strokeWidth: 10,
                            strokeOpacity: 1,
                            fillColor: '00c31d'
                        });
                        $scope.data.list = _.clone(res.data.originalElement);
                        $scope.func.addAreaToMap();
                    }, function (error) {
                        return toaster.pop('error', '', 'مشکلی در دریافت اتصالات به وجود آمده است .');
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.description = function () {
                $scope.nodeValue.func.description($scope.nodeValue.data.map).then(function (res) {}, function (error) {});
            };

            $scope.func.update = function () {
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
                            $scope.func.changeQuery(res.queryItems, $scope.nodeValue.data.id);
                            $scope.nodeValue.func.image(res.image).then(function (resultImage) {
                                $scope.nodeValue.data.map.title = res.title;
                                $scope.nodeValue.data.map.description = res.description;

                                $scope.nodeValue.data.image = resultImage;
                                if ($scope.nodeValue.data.map.parentId == 0) $scope.nodeValue.func.changeThumnail($scope.nodeValue.data.map.id);
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
            $scope.func.canvasFuncs = function () {
                return {
                    showDetail: function showDetail(item) {
                        //show modal
                        var modalInstance = $uibModal.open({
                            template: '<style>' + '.modal-header{' + 'background-color: #9560F4 !important;' + 'color: white !important;' + 'border-top-left-radius: 0px !important;' + 'border-top-right-radius: 0px !important;' + 'margin: -15px 0px 0px 0px !important;' + '}' + '</style>' + '<div style="z-index:1000">' + '<script>$(function() {$("[data-toggle=\'tooltip\']").tooltip();});</script>' + '<div class="modal-header"  >' + '<div class="row">' + '<div class="form-group col-sm-12">' + '<div class="col-sm-1 pull-right" >' + '<span class="fa  fa-remove pull-left" data-placement="top" title="Ø¨Ø³ØªÙ Ù¾ÙØ¬Ø±Ù Ø¬Ø§Ø±Û" data-toggle="tooltip" style="margin-top: 5px; cursor: pointer" ng-click="onNoClick();"></span>' + '</div>' + '<div class="col-sm-11" >' + '<label class="control-label pull-left"  style="font-size: 20px;">new {{Data.createItem.type}} detail</label>' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="modal-body">' + '<div class="form-group row" style="direction: ltr;">' + '<div class="col-sm-2 pull-left"><label class="control-label">create : </label></div>' + '<div class="col-sm-10"><span class="control-label" ><pre style="background-color: white; font-weight: bold;"> {{Data.createItem|json}}</pre></span></div>' + '</div>' + '</div>' + '</div>',

                            controller: function controller($scope, $uibModalInstance, createItem) {
                                $scope.Data = {
                                    createItem: createItem
                                };
                                $scope.onNoClick = function () {
                                    $uibModalInstance.close(false);
                                };
                                $scope.onYesClick = function () {
                                    $uibModalInstance.close(true);
                                };
                            },
                            size: 'lg',
                            backdrop: 'static', // false,
                            keyboard: false,
                            resolve: {
                                createItem: function createItem() {
                                    return item;
                                }
                            }
                        });
                        modalInstance.result.then(function (response) {
                            $scope.func.navBar.view();
                            document.querySelector(".map").addEventListener('mousedown', $scope.func.drag.draggable);
                            if (!response) {}
                        });
                    },
                    add: function add() {
                        return {
                            circle: function circle(shape) {
                                try {
                                    $('.map').maphilight(shape.style);
                                    $scope.data.map.append('<area    shape="circle" coords="' + shape.coordes.toString() + '" id="' + value.id + '"  href="javascript:void(0)"   alt="' + shape.id + '"  >');
                                    $("#" + shape.id).click(function (e) {
                                        $scope.func.goToNode(shape.id);
                                    }).mouseover();
                                    $("#" + shape.id).data('maphilight', shape.style).trigger('alwaysOn.maphilight');
                                    $scope.func.canvasFuncs().add().clearOBJ();
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            rect: function rect(shape) {
                                try {
                                    $('.map').maphilight(shape.style);
                                    $scope.data.map.append('<area    shape="rect" coords="' + shape.coordes.toString() + '" id="' + value.id + '" href="javascript:void(0)"   alt="' + shape.id + '"  >');
                                    $("#" + shape.id).click(function (e) {
                                        $scope.func.goToNode(shape.id);
                                    }).mouseover();
                                    $("#" + shape.id).data('maphilight', shape.style).trigger('alwaysOn.maphilight');
                                    $scope.func.canvasFuncs().add().clearOBJ();
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            poly: function poly(shape) {
                                try {
                                    $('.map').maphilight(shape.style);
                                    $scope.data.map.append('<area href="javascript:void(0)"  shape="poly" coords="' + shape.coordes.toString() + '" id="' + value.id + '"     alt="' + shape.id + '"  >');
                                    $("#" + shape.id).click(function (e) {
                                        $scope.func.goToNode(shape.id);
                                    }).mouseover();
                                    $("#" + shape.id).data('maphilight', shape.style).trigger('alwaysOn.maphilight');
                                    $scope.func.canvasFuncs().add().clearOBJ();
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            clearOBJ: function clearOBJ() {
                                $scope.data.circle = {
                                    point: null,
                                    radius: null
                                };
                                $scope.data.square = {
                                    point: null,
                                    width: 0,
                                    height: 0
                                };
                                $scope.data.polygon = {
                                    points: []
                                };
                            }
                        };
                    },
                    getShapeName: function getShapeName(shape, callbackFunc) {
                        var shape = shape;
                        var callbackFunc = callbackFunc;
                        $scope.nodeValue.func.addImage({
                            parentId: $scope.nodeValue.data.map.id,
                            id: 0,
                            coordinate: JSON.stringify(shape.coordes),
                            style: JSON.stringify(shape.style),
                            type: shape.type,
                            title: '',
                            description: '',
                            query: $scope.data.query,
                            imageUuid: -1
                        }).then(function (res) {
                            $scope.nodeValue.func.addToMap(res.query).then(function (result) {
                                try {
                                    shape.id = result.data;
                                    var newNode = {
                                        id: result.data,
                                        coordinate: JSON.stringify(shape.coordes),
                                        parentId: $scope.nodeValue.data.id,
                                        imageUuid: res.image,
                                        style: JSON.stringify(shape.style),
                                        title: res.title,
                                        description: res.description,
                                        query: JSON.stringify(res.queryItems)
                                    };

                                    $scope.data.list.push(newNode);

                                    $('map[name="useMapName"]').maphilight({
                                        strokeColor: '808080',
                                        strokeWidth: 10,
                                        strokeOpacity: 1,
                                        fillColor: '00c31d'
                                    });

                                    $scope.data.map.append('<area   shape="' + shape.type + '" coords="' + shape.coordes.toString() + '" id="' + shape.id + '"  href="javascript:void(0)"  alt="' + shape.id + '" ></area>');

                                    $("#" + shape.id).click(function () {
                                        $scope.func.goToNode(shape.id);
                                    }).mouseover();
                                    $("#" + shape.id).data('maphilight', shape.style).trigger('alwaysOn.maphilight');

                                    $scope.func.canvasFuncs().showDetail(shape);
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                } catch (e) {
                                    console.error(e);
                                }
                            }, function (error) {
                                try {
                                    var ctx = angular.element($element[0].querySelector('#canvasID'))[0].getContext("2d"); //$("#canvasID")[0].getContext("2d") ||  $('#canvasID').getContext("2d");
                                    ctx.clearRect(0, 0, parseInt(angular.element($element[0].querySelector('#canvasID'))[0].style.width), parseInt(angular.element($element[0].querySelector('#canvasID'))[0].style.height));
                                    $scope.func.navBar.view();
                                    document.querySelector(".map").addEventListener('mousedown', $scope.func.drag.draggable);
                                } catch (e) {
                                    console.error(e);
                                }
                            });
                        }, function (error) {
                            return console.error(error);
                        });
                    },
                    //TODO all function to create circle shape
                    circle: function circle() {
                        return {
                            create: function create() {
                                try {
                                    var ctx = angular.element($element[0].querySelector('.map > #canvasID'))[0].getContext("2d");
                                    ctx.clearRect(0, 0, parseInt($($element[0].querySelector('.map > #canvasID')).width()), parseInt($($element[0].querySelector('.map > #canvasID')).height()));
                                    ctx.fillStyle = "#E2FA49";
                                    ctx.beginPath();
                                    ctx.arc($scope.data.circle.point.x, $scope.data.circle.point.y, $scope.data.circle.radius, 0, Math.PI * 2, true);
                                    ctx.closePath();
                                    //ctx.fill();
                                    ctx.stroke();
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            click: function click(e) {},
                            dblclick: function dblclick(e) {},
                            mousedown: function mousedown(e) {
                                if ($scope.data.circle == null) {
                                    $scope.data.circle = {
                                        point: null,
                                        radius: null
                                    };
                                }
                                $scope.data.circle = {
                                    point: $scope.func.position(e, $(angular.element($element[0].querySelector('.map'))[0])),
                                    radius: 0
                                };
                                $scope.func.canvasFuncs().circle().create($scope.data.circle);
                                angular.element($element[0].querySelector('.map > #canvasID')).bind('mousemove', $scope.func.canvasFuncs()['circle']()['mousemove']);
                            },
                            mouseup: function mouseup(e) {
                                angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousemove');
                                $scope.func.canvasFuncs().getShapeName({
                                    type: "circle",
                                    id: null,
                                    coordes: [$scope.data.circle.point.x, $scope.data.circle.point.y, $scope.data.circle.radius],
                                    style: {
                                        strokeColor: '238080',
                                        strokeWidth: 1,
                                        strokeOpacity: 0.7,
                                        fillColor: '23c31d'
                                    }
                                }, $scope.func.canvasFuncs().add().circle);
                            },
                            mousemove: function mousemove(e) {
                                try {
                                    $scope.data.circle.radius = Math.round(Math.sqrt(Math.pow($scope.data.p.x - $scope.data.circle.point.x, 2) + Math.pow($scope.data.p.y - $scope.data.circle.point.y, 2)));
                                    $scope.func.canvasFuncs().circle().create();
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        };
                    },
                    //TODO all function to create square shape
                    square: function square() {
                        return {
                            create: function create() {
                                try {
                                    var ctx = angular.element($element[0].querySelector('.map > #canvasID'))[0].getContext("2d");
                                    ctx.clearRect(0, 0, parseInt($($element[0].querySelector('.map > #canvasID')).width()), parseInt($($element[0].querySelector('.map > #canvasID')).height()));
                                    ctx.fillStyle = "#E2FA49";
                                    ctx.beginPath();
                                    ctx.rect($scope.data.square.point.x, $scope.data.square.point.y, $scope.data.square.width, $scope.data.square.height);
                                    ctx.stroke();
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            click: function click(e) {},
                            mousedown: function mousedown(e) {
                                try {
                                    $scope.data.square = {
                                        point: $scope.data.p,
                                        width: 0,
                                        height: 0
                                    };
                                    $scope.func.canvasFuncs().square().create();
                                    angular.element($element[0].querySelector('.map > #canvasID')).bind('mousemove', $scope.func.canvasFuncs()['square']()['mousemove']);
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            mousemove: function mousemove(e) {
                                try {
                                    $scope.data.square.width = $scope.data.p.x - $scope.data.square.point.x;
                                    $scope.data.square.height = $scope.data.p.y - $scope.data.square.point.y;
                                    $scope.func.canvasFuncs().square().create();
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            dblclick: function dblclick(e) {},
                            mouseup: function mouseup(e) {
                                try {
                                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousemove');
                                    angular.element($element[0].querySelector('.map')).bind('mousedown', $scope.func.drag.draggable);
                                    $scope.func.canvasFuncs().getShapeName({
                                        type: "rect",
                                        id: null,
                                        coordes: [$scope.data.square.point.x, $scope.data.square.point.y, $scope.data.square.point.x + $scope.data.square.width, $scope.data.square.point.y + $scope.data.square.height],
                                        style: {
                                            strokeColor: '238080',
                                            strokeWidth: 1,
                                            strokeOpacity: 0.7,
                                            fillColor: '23c31d'
                                        }
                                    }, $scope.func.canvasFuncs().add().rect);
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        };
                    },
                    //TODO all function to create polygon shape
                    polygon: function polygon() {
                        return {
                            create: function create(points) {
                                try {
                                    var ctx = angular.element($element[0].querySelector('.map > #canvasID'))[0].getContext("2d");
                                    ctx.clearRect(0, 0, parseInt($($element[0].querySelector('.map > #canvasID')).width()), parseInt($($element[0].querySelector('.map > #canvasID')).height()));
                                    ctx.fillStyle = "#E2FA49";
                                    ctx.beginPath();
                                    ctx.moveTo(points.x, points[0].y);
                                    _.each(points, function (point, i) {
                                        return ctx.lineTo(point.x, point.y);
                                    });
                                    ctx.lineTo($scope.data.p.x, $scope.data.p.y);
                                    ctx.closePath();
                                    ctx.stroke();
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            dest: function dest(p1, p2) {
                                return Math.sqrt(Math.abs(Math.pow(p1.x - p2.x, 2)) + Math.abs(Math.pow(p1.y - p2.y, 2)));
                            },
                            click: function click(e) {},
                            dblclick: function dblclick(e) {
                                try {
                                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousedown');
                                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousemove');
                                    var listPoints = [];
                                    _.each($scope.data.polygon.points, function (point) {
                                        listPoints.push(point.x);
                                        listPoints.push(point.y);
                                    });
                                    $scope.data.polygon.points = [];
                                    $scope.func.canvasFuncs().getShapeName({
                                        type: "poly",
                                        id: null,
                                        coordes: listPoints,
                                        style: {
                                            strokeColor: '238080',
                                            strokeWidth: 1,
                                            strokeOpacity: 0.7,
                                            fillColor: '23c31d'
                                        }
                                    }, $scope.func.canvasFuncs().add().poly);
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            mousedown: function mousedown(e) {
                                try {
                                    if ($scope.data.polygon == null) {
                                        $scope.data.polygon = {
                                            points: []
                                        };
                                    }
                                    $scope.data.polygon.points.push($scope.data.p);
                                    angular.element($element[0].querySelector('.map > #canvasID')).bind('mousemove', $scope.func.canvasFuncs()['polygon']()['mousemove']);
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            mouseup: function mouseup(e) {
                                try {
                                    if ($scope.data.polygon.points.length > 2 && $scope.func.canvasFuncs().polygon().dest($scope.data.polygon.points[0], $scope.data.polygon.points[$scope.data.polygon.points.length - 1]) <= 4) {
                                        angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousedown');
                                        angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousemove');
                                        var listPoints = [];
                                        _.each($scope.data.polygon.points, function (point) {
                                            listPoints.push(point.x);
                                            listPoints.push(point.y);
                                        });
                                        $scope.data.polygon.points = [];
                                        $scope.func.canvasFuncs().getShapeName({
                                            type: "poly",
                                            id: null,
                                            coordes: listPoints,
                                            style: {
                                                strokeColor: '238080',
                                                strokeWidth: 1,
                                                strokeOpacity: 0.7,
                                                fillColor: '23c31d'
                                            }
                                        }, $scope.func.canvasFuncs().add().poly);
                                    } else $scope.func.canvasFuncs().polygon().create($scope.data.polygon.points);
                                } catch (e) {
                                    console.error(e);
                                }
                            },
                            mousemove: function mousemove(e) {
                                return $scope.func.canvasFuncs().polygon().create($scope.data.polygon.points);
                            }
                        };
                    }
                };
            };
            $scope.func.clearQuery = function () {
                try {
                    $scope.data.query = {};
                    _.forEach(JSON.parse($scope.nodeValue.data.map.query), function (val, key) {
                        return $scope.data.query[key] = {
                            key: key,
                            id: $scope.nodeValue.data.id,
                            value: val.value
                        };
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.changeQuery = function (newQuery, id) {
                try {
                    _.forEach(newQuery, function (v, k) {
                        if (_.has($scope.data.query, k)) {
                            if ($scope.data.query[k].id == id) $scope.data.query[k] = {
                                key: k,
                                id: id,
                                value: v.value
                            };
                        } else $scope.data.query[k] = {
                            key: k,
                            id: id,
                            value: v.value
                        };
                    });
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.startDrag = function () {
                $scope.data.currentTag.css('cursor', 'grabbing');
                document.querySelector(".map").addEventListener('mousedown', $scope.func.drag.draggable);
            };
            $scope.func.getImage = function ($file) {
                if ($scope.upload != null) $scope.upload.abort();
                $scope.upload = Upload.upload({
                    url: 'app/static/upload',
                    method: 'POST', //'PUT' or
                    data: { file: $file }
                }).then(function (resp) {
                    $("#" + $scope.nodeValue.data.id).fadeIn("slow", function () {
                        $scope.nodeValue.data.id = $file['$ngfName'];
                        $scope.func.relodeImage();
                    });
                }, function (resp) {
                    $("#" + $scope.nodeValue.data.id).fadeIn("slow", function () {
                        $scope.nodeValue.data.id = $file['$ngfName'];
                        $scope.func.relodeImage();
                    });
                }, function (evt) {});
            };
            $scope.func.relodeImage = function () {

                $scope.func.removeFuncs();
                try {
                    if ($scope.data.list != null && _.isArray($scope.data.list)) _.forEach(_.clone($scope.data.list), function (value) {
                        $("#" + value.id).off('click');
                        angular.element($element[0].querySelector("#" + value.id)).unbind('click');
                    });

                    $scope.data.list = null;
                    if (angular.element(document.querySelector("div .map"))) angular.element(document.querySelector("div .map")).remove();
                    if (angular.element(document.querySelector("map"))) angular.element(document.querySelector("map")).remove();
                    $scope.data.zoomParam.level = 1;
                    $scope.data.flages.isEdit = true;
                    $element.css('cursor', 'grab');
                    $element.css('cursor', '-webkit-grab');
                    $element.css('cursor', '-moz-grab');
                } catch (e) {
                    console.error(e);
                }
                $scope.func.initiallize();
            };
            $scope.func.movInImage = function () {
                try {
                    $scope.data.currentTag.css('cursor', 'grab');
                    $element.bind("mousemove", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        if ($scope.data.isClick) {
                            //var currentPoint = new Point(e.pageX,e.pageY);
                            var x = e.pageX - base.x;
                            var y = e.pageY - base.y;
                            var scrollX = 0;
                            var scrollY = 0;
                            if ($scope.data.currentTag.scrollLeft() - x > 0 && $scope.data.currentTag.scrollLeft() - x < document.getElementById($scope.data.currentTag.attr("id")).scrollWidth - document.getElementById($scope.data.currentTag.attr("id")).clientWidth) {
                                scrollX = $scope.data.currentTag.scrollLeft() - x;
                            } else {
                                scrollX = $scope.data.currentTag.scrollLeft();
                            }
                            if ($scope.data.currentTag.scrollTop() - y > 0 && $scope.data.currentTag.scrollTop() - y < document.getElementById($scope.data.currentTag.attr("id")).scrollHeight - document.getElementById($scope.data.currentTag.attr("id")).clientHeight) {
                                scrollY = $scope.data.currentTag.scrollTop() - y;
                            } else {
                                scrollY = $scope.data.currentTag.scrollTop();
                            }
                            document.getElementById($scope.data.currentTag.attr("id")).scrollTo(scrollX, scrollY);
                        }
                    });
                    $element.bind("mousedown", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        $scope.data.currentTag.css('cursor', 'grabbing');
                        $scope.data.isClick = true;
                        $scope.data.base = new Point(e.pageX, e.pageY);
                    });
                    $element.bind("mouseup", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        $scope.data.currentTag.css('cursor', 'grab');
                        $scope.data.isClick = false;
                        $scope.data.base = new Point(0, 0);
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.position = function (e, element) {
                return new Point(Math.round((e.pageX || e.clientX) - element.offset().left - $(window).scrollLeft()), Math.round((e.pageY || e.clientY) - element.offset().top - $(window).scrollTop()));
            };
            $scope.func.show = function (e) {
                try {
                    $scope.data.p = new Point(Math.round((e.pageX || e.clientX) - $(angular.element($element[0].querySelector('.map'))[0]).offset().left - $(window).scrollLeft()), Math.round((e.pageY || e.clientY) - $(angular.element($element[0].querySelector('.map'))[0]).offset().top - $(window).scrollTop()));
                    _.defer(function () {
                        return $scope.$apply();
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
                    angular.element($element[0].querySelector('.map')).unbind('mousemove', $scope.func.drag.start);
                    angular.element($element[0].querySelector('.map')).unbind('mouseup', $scope.func.drag.remove);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.drag = {};
            $scope.func.drag.start = function (e) {
                try {
                    e.preventDefault();
                    $scope.data.position.x += (e.pageX || e.clientX) - ($scope.data.previousEvent.pageX || $scope.data.previousEvent.clientX);
                    $scope.data.position.y += (e.pageY || e.clientY) - ($scope.data.previousEvent.pageY || $scope.data.previousEvent.clientY);
                    $scope.data.previousEvent = e;
                    angular.element($element)[0].scrollLeft = -1 * $scope.data.position.x;
                    angular.element($element)[0].scrollTop = -1 * $scope.data.position.y;
                    $scope.data.previousEvent = e;
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.drag.remove = function () {
                try {
                    angular.element($element[0].querySelector('.map')).unbind('mousemove', $scope.func.drag.start);
                    angular.element($element[0].querySelector('.map')).unbind('mouseup', $scope.func.drag.remove);
                    $element.css('cursor', 'grab');
                    $element.css('cursor', '-webkit-grab');
                    $element.css('cursor', '-moz-grab');
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.drag.draggable = function (e) {
                try {
                    e.preventDefault();
                    $scope.data.previousEvent = e;
                    angular.element($element[0].querySelector('.map')).bind('mousemove', $scope.func.drag.start);
                    angular.element($element[0].querySelector('.map')).bind('mouseup', $scope.func.drag.remove);

                    $element.css('cursor', 'grabbing');
                    $element.css('cursor', '-webkit-grabbing');
                    $element.css('cursor', '-moz-grabbing');
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.bind = function (query, name, func) {
                try {
                    angular.element($element[0].querySelector(query)).bind(name, func);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.navBar = {};
            $scope.func.navBar.goback = function (event) {
                try {
                    $scope.func.removeFromQuery($scope.nodeValue.data.map.id);
                    $scope.func.goToNode($scope.nodeValue.data.map.parentId);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.navBar.edit = function (event) {
                try {
                    $scope.data.flages.isEdit = false;
                    $scope.data.polygon.points == [];
                    $element.css('cursor', 'crosshair');
                    $element.css('cursor', '-webkit-crosshair');
                    $element.css('cursor', '-moz-crosshair');
                    angular.element($element[0].querySelector('.map > #canvasID')).remove();
                    angular.element($element[0].querySelector('.map')).append($compile('<canvas id="canvasID" width="{{data.mapSize.w * data.zoomParam.level}}px" height="{{data.mapSize.h * data.zoomParam.level}}px"style="position:absolute;top:0px;background-color:#95682e;opacity:0.7;z-index:10;" ></canvas>')($scope));
                    var isReadyDom = setInterval(function () {
                        if (angular.element($element[0].querySelector('.map > #canvasID')).length > 0) {
                            clearInterval(isReadyDom);
                            isReadyDom = null;
                            isReadyDom = undefined;
                            angular.element($element[0].querySelector('.map > #canvasID')).bind('mousedown', $scope.func.drag.draggable);
                            angular.element($element[0].querySelector('div .map')).bind('wheel', $scope.func.zoom.wheel);
                        }
                    });
                    /*if($scope.data.browser == "Firefox")
                     angular.element($element[0].querySelector('.map')).bind('wheel'				   , $scope.func.zoom.wheel);
                     else if($scope.data.browser == "Chrome")
                     angular.element($element[0].querySelector('.map')).bind('mousewheel'	   , $scope.func.zoom.wheel);*/
                    //angular.element($element[0].querySelector('.map')).bind('DOMMouseScroll'	   , $scope.func.zoom.wheel);
                    //angular.element($element[0].querySelector('.map')).bind('mousewheel'		   , $scope.func.zoom.wheel);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.navBar.view = function (event) {
                try {
                    $scope.data.flages.isEdit = true;
                    $element.css('cursor', 'grab');
                    $element.css('cursor', '-webkit-grab');
                    $element.css('cursor', '-moz-grab');
                    angular.element($element[0].querySelector('.map > #canvasID')).remove();
                    angular.element($element[0].querySelector('.map')).bind('mousedown', $scope.func.drag.draggable);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.navBar.direction = {};
            $scope.func.navBar.direction.top = {
                click: function click(event) {
                    if ($($scope.data.currentTag).scrollTop() > 0) $($scope.data.currentTag).scrollTop($($scope.data.currentTag).scrollTop() - 1);
                },
                keyup: function keyup(event) {
                    if ($scope.data.buttons.topTimer != null) {
                        clearInterval($scope.data.buttons.topTimer);
                        $scope.data.buttons.topTimer = null;
                    }
                    return false;
                },
                keydown: function keydown(event) {
                    $scope.data.buttons.topTimer = setInterval(function () {
                        if ($($scope.data.currentTag).scrollTop() > 0) $($scope.data.currentTag).scrollTop($($scope.data.currentTag).scrollTop() - 1);
                    }, 10);
                    return false;
                }
            };
            $scope.func.navBar.direction.down = {
                click: function click(event) {
                    if ($($scope.data.currentTag).scrollTop() < document.getElementById($scope.data.currentTag.attr("id")).scrollHeight - document.getElementById($scope.data.currentTag.attr("id")).clientHeight) $($scope.data.currentTag).scrollTop($($scope.data.currentTag).scrollTop() + 1);
                },
                keyup: function keyup(event) {
                    if ($scope.data.buttons.downTimer != null) {
                        clearInterval($scope.data.buttons.downTimer);
                        $scope.data.buttons.downTimer = null;
                    }
                    return false;
                },
                keydown: function keydown(event) {
                    $scope.data.buttons.downTimer = setInterval(function () {
                        if ($($scope.data.currentTag).scrollTop() < document.getElementById($scope.data.currentTag.attr("id")).scrollHeight - document.getElementById($scope.data.currentTag.attr("id")).clientHeight) $($scope.data.currentTag).scrollTop($($scope.data.currentTag).scrollTop() + 1);
                    }, 10);
                    return false;
                }
            };
            $scope.func.navBar.direction.right = {
                click: function click(event) {
                    if ($($scope.data.currentTag).scrollLeft() < document.getElementById($scope.data.currentTag.attr("id")).scrollWidth - document.getElementById($scope.data.currentTag.attr("id")).clientWidth) $($scope.data.currentTag).scrollLeft($($scope.data.currentTag).scrollLeft() + 1);
                },
                keyup: function keyup(event) {
                    if ($scope.data.buttons.rightTimer != null) {
                        clearInterval($scope.data.buttons.rightTimer);
                        $scope.data.buttons.rightTimer = null;
                    }
                    return false;
                },
                keydown: function keydown(event) {
                    $scope.data.buttons.rightTimer = setInterval(function () {
                        if ($($scope.data.currentTag).scrollLeft() < document.getElementById($scope.data.currentTag.attr("id")).scrollWidth - document.getElementById($scope.data.currentTag.attr("id")).clientWidth) $($scope.data.currentTag).scrollLeft($($scope.data.currentTag).scrollLeft() + 1);
                    }, 10);
                    return false;
                }
            };
            $scope.func.navBar.direction.left = {
                click: function click(event) {
                    if ($($scope.data.currentTag).scrollLeft() > 0) $($scope.data.currentTag).scrollLeft($($scope.data.currentTag).scrollLeft() - 1);
                },
                keyup: function keyup(event) {
                    if ($scope.data.buttons.leftTimer != null) {
                        clearInterval($scope.data.buttons.leftTimer);
                        $scope.data.buttons.leftTimer = null;
                    }
                    return false;
                },
                keydown: function keydown(event) {
                    $scope.data.buttons.leftTimer = setInterval(function () {
                        if ($($scope.data.currentTag).scrollLeft() > 0) $($scope.data.currentTag).scrollLeft($($scope.data.currentTag).scrollLeft() - 1);
                    }, 10);
                    return false;
                }
            };
            $scope.func.navBar.createShape = function (type) {
                try {
                    $element.css('cursor', 'crosshair');
                    $element.css('cursor', '-webkit-crosshair');
                    $element.css('cursor', '-moz-crosshair');
                    document.querySelector(".map").removeEventListener('mousedown', $scope.func.drag.draggable);
                    var ctx = angular.element($element[0].querySelector('.map > #canvasID'))[0].getContext("2d");
                    ctx.clearRect(0, 0, parseInt(angular.element($element[0].querySelector('.map'))[0].style.width), parseInt(angular.element($element[0].querySelector('.map'))[0].style.height));
                    angular.element($element[0].querySelector('.map ')).unbind('mousedown');
                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('click');
                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousedown');
                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('mouseup');
                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousemove');
                    angular.element($element[0].querySelector('.map > #canvasID')).bind('click', $scope.func.canvasFuncs()[type]()['click']);
                    angular.element($element[0].querySelector('.map > #canvasID')).bind('mousedown', $scope.func.canvasFuncs()[type]()['mousedown']);
                    angular.element($element[0].querySelector('.map > #canvasID')).bind('mouseup', $scope.func.canvasFuncs()[type]()['mouseup']);
                    angular.element($element[0].querySelector('.map > #canvasID')).bind('dblclick', $scope.func.canvasFuncs()[type]()['dblclick']);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.navBar.screen = {
                goFull: function goFull(event) {
                    try {
                        $scope.data.flages.isFull = false;

                        $($scope.data.buttons.backFull).css({ "display": "block" });
                        $($scope.data.buttons.full).css({ "display": "none" });
                        var tag = $element[0];
                        var request = tag.requestFullscreen || tag.webkitRequestFullscreen || tag.mozRequestFullScreen || tag.msRequestFullscreen;
                        if (typeof request !== "undefined" && request) request.call(tag);else if (typeof window.ActiveXObject !== "undefined") {
                            // for Internet Explorer
                            var wscript = new ActiveXObject("WScript.Shell");
                            if (wscript != null) wscript.SendKeys("{F11}");
                        }
                        setTimeout(function () {
                            document.addEventListener('webkitfullscreenchange', $scope.func.navBar.screen.backFull, false);
                            document.addEventListener('mozfullscreenchange', $scope.func.navBar.screen.backFull, false);
                            document.addEventListener('fullscreenchange', $scope.func.navBar.screen.backFull, false);
                            document.addEventListener('MSFullscreenChange', $scope.func.navBar.screen.backFull, false);
                        }, 1000);
                    } catch (e) {
                        console.error(e);
                    }
                },
                backFull: function backFull(event) {
                    try {
                        $scope.data.flages.isFull = true;
                        var request = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
                        if (typeof request !== "undefined" && request) request.call(document);
                        document.removeEventListener('webkitfullscreenchange', $scope.func.navBar.screen.backFull, false);
                        document.removeEventListener('mozfullscreenchange', $scope.func.navBar.screen.backFull, false);
                        document.removeEventListener('fullscreenchange', $scope.func.navBar.screen.backFull, false);
                        document.removeEventListener('MSFullscreenChange', $scope.func.navBar.screen.backFull, false);
                    } catch (e) {
                        console.error(e);
                    }
                }
            };
            $scope.func.navBar.erase = function (event) {
                $scope.nodeValue.func.erase($scope.nodeValue.data.map.id).then(function (res) {
                    if ($scope.nodeValue.data.map.parentId != 0) $scope.func.goToNode($scope.nodeValue.data.map.parentId);else {
                        $scope.func.removeFuncs();
                        if ($element[0].querySelector("div .map")) angular.element($element[0].querySelector("div .map")).remove();
                        if ($element[0].querySelector('map[name="useMapName"]')) angular.element($element[0].querySelector('map[name="useMapName"]')).remove();
                        $scope.nodeValue.func.end($scope.nodeValue.data.map);
                    }
                }, function (error) {});
            };
            $scope.func.navBar.download = function (event) {};
            $scope.func.zoom = {};
            $scope.func.zoom.wheel = function (e) {
                try {
                    angular.element($element[0].querySelector('div .map')).unbind('wheel');
                    e.preventDefault();
                    var deltaY = e.deltaY || -e.wheelDelta;
                    $scope.data.zoomParam.level += Math.sign(deltaY) > 0 && $scope.data.zoomParam.level > $scope.data.zoomParam.lower || Math.sign(deltaY) < 0 && $scope.data.zoomParam.level < $scope.data.zoomParam.upper ? -1 * Math.sign(deltaY) * $scope.data.zoomParam.ratio : 0;
                    $scope.data.zoomParam.level = Number($scope.data.zoomParam.level.toFixed(1));
                    var w = $scope.data.mapSize.w * $scope.data.zoomParam.level,
                        h = $scope.data.mapSize.h * $scope.data.zoomParam.level;
                    angular.element($element[0].querySelector('div .map'))[0].style.width = w + 'px';
                    angular.element($element[0].querySelector('div .map'))[0].style.height = h + 'px';
                    $($element[0].querySelector('div .map')).width(w);
                    $($element[0].querySelector('div .map')).height(h);
                    angular.element($element[0].querySelector('.map > canvas'))[0].style.width = w + 'px';
                    angular.element($element[0].querySelector('.map > canvas'))[0].style.height = h + 'px';
                    angular.element($element[0].querySelector('.map > img'))[0].style.width = w + 'px';
                    angular.element($element[0].querySelector('.map > img'))[0].style.height = h + 'px';
                    angular.element($element[0].querySelector('map'))[0].style.width = w + 'px';
                    angular.element($element[0].querySelector('map'))[0].style.height = h + 'px';
                    _.defer(function () {
                        return $scope.$apply();
                    });
                    if (typeof angular.element($element[0].querySelector('.map > #canvasID'))[0] !== "undefined") {
                        angular.element($element[0].querySelector('.map > #canvasID'))[0].style.width = w + 'px';
                        angular.element($element[0].querySelector('.map > #canvasID'))[0].style.height = h + 'px';
                    }

                    //TODO clear all map items
                    $scope.data.map.empty();
                    _.each($scope.data.list, function (coord, i) {
                        if (!coord.cloneCoords) coord.cloneCoords = angular.copy(coord.coordes);
                        coord.coordes = _.map(coord.coordes, function (c, i) {
                            return coord.cloneCoords[i] * $scope.data.zoomParam.level;
                        });
                        $('.map').maphilight(coord.style);
                        $scope.data.map.append('<area   shape="' + coord.type + '"  coords="' + coord.coordes.toString() + '"  id="' + coord.id + '"  href="javascript:void(0)"  alt="' + coord.id + '" >');
                        $("#" + coord.id).click(function () {
                            return $scope.func.goToNode(coord.id);
                        }).mouseover();
                        $("#" + coord.id).data('maphilight', coord.style).trigger('alwaysOn.maphilight');
                        angular.element($element[0].querySelector('map'))[0].children[i].attributes.coords.value = coord.coordes.toString();
                    });
                    w = undefined;
                    h = undefined;
                    angular.element($element[0].querySelector('.map')).bind('mousedown', $scope.func.drag.draggable);
                    angular.element($element[0].querySelector('div .map')).bind('wheel', $scope.func.zoom.wheel);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.showQuery = function () {
                if ($scope.data.query) $scope.nodeValue.func.showResult(_.map($scope.data.query, function (v, k) {
                    return "property=" + k + "=" + v.value;
                }).join('&'));
            };
            $scope.func.removeFromQuery = function (id) {
                try {
                    $scope.data.query = _.keyBy(_.filter($scope.data.query, function (v, k) {
                        return v.id != id;
                    }), 'key');
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.addAreaToMap = function () {
                _.forEach($scope.data.list, function (value) {
                    try {
                        $('map[name="useMapName"]').maphilight(JSON.parse(value.style));
                        $scope.data.map.append('<area   shape="' + value.type + '" coords="' + JSON.parse(value.coordinate).toString() + '" id="' + value.id + '"  href="javascript:void(0)"  alt="' + value.id + '" ></area>');
                        $("#" + value.id).click(function (e) {
                            $scope.func.goToNode(value.id);
                        }).mouseover();
                        $("#" + value.id).data('maphilight', JSON.parse(value.style)).trigger('alwaysOn.maphilight');
                    } catch (e) {
                        console.error(e);
                    }
                });
                $scope.func.startDrag();
            };
            $scope.func.getMapNodes = function (map) {
                $scope.nodeValue.func.getMapItems(map).then(function (res) {
                    try {

                        $scope.nodeValue.data.image = res.image;
                        $scope.nodeValue.data.list = res.list;
                        $scope.nodeValue.data.map = angular.copy(map);
                        $scope.nodeValue.data.id = map.id;
                        $scope.func.changeQuery(JSON.parse(map.query), map.id);
                        $($element[0].querySelector('.map')).fadeOut(1000, function () {
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
                    var index = _.findIndex($scope.data.list, function (node) {
                        return node.id == id;
                    });
                    if (index >= 0) $scope.func.getMapNodes($scope.data.list[index]);else $scope.nodeValue.func.getMap(id).then(function (res) {
                        return $scope.func.getMapNodes(res.map);
                    }, function (error) {
                        return console.error(error);
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.addStyle = function () {
                try {
                    if ($scope.nodeValue.data.style && Array.isArray($scope.nodeValue.data.style)) _.each($scope.nodeValue.data.style, function (val, key) {
                        $scope.data.currentTag.css(val.key, val.value);
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.createItem = function (type) {
                try {
                    var ctx = angular.element($element[0].querySelector('.map > #canvasID'))[0].getContext("2d");
                    ctx.clearRect(0, 0, parseInt(angular.element($element[0].querySelector('.map > #canvasID'))[0].style.width), parseInt(angular.element($element[0].querySelector('.map > #canvasID'))[0].style.height));
                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('click');
                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousedown');
                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('mouseup');
                    angular.element($element[0].querySelector('.map > #canvasID')).unbind('mousemove');
                    angular.element($element[0].querySelector('.map > #canvasID')).bind('click', $scope.func.canvasFuncs()['polygon']()['click']);
                    angular.element($element[0].querySelector('.map > #canvasID')).bind('mousedown', $scope.func.canvasFuncs()['polygon']()['mousedown']);
                    angular.element($element[0].querySelector('.map > #canvasID')).bind('mouseup', $scope.func.canvasFuncs()['polygon']()['mouseup']);
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.changeSrc = function () {};

            if ($scope.runInit == null) {
                $scope.runInit = $scope.func.initiallize;
            }

            $scope.$on('changeSrc', function (event, data) {
                return $scope.func.initiallize();
            });

            $element.on('$destroy', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                try {
                                    Point = undefined;
                                    Area = undefined;
                                    browserType = undefined;
                                    $scope.data = undefined;
                                    $scope.func = undefined;
                                    $scope.$destroy();
                                } catch (e) {
                                    console.error(e);
                                }

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            })));
        }]
    };
};