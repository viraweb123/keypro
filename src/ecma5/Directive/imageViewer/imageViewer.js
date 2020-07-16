"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = imageViewer;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//imageViewer
function imageViewer() {
    return {
        restrict: "EA",
        scope: {
            runing: "="
        },
        templateUrl: "../../../ecma5/Directive/imageViewer/imageViewer.html?dev=" + randomVersionName,
        controller: ['$scope', 'toaster', '$rootScope', '$element', '$compile', '$sce', function ($scope, toaster, $rootScope, $element, $compile, $sce) {
            var _this = this;

            $scope.data = {
                content: null,
                map: null,
                type: null,
                imageLayer: null,
                img: null,
                flages: {
                    isFull: false
                },
                removeExternalFuncs: {},
                rotation: 0,
                degers: [0, 0.5 * Math.PI, Math.PI, 1.5 * Math.PI]
            };

            $scope.func = {};
            $scope.func.readyMap = function () {
                $scope.data.type = null;
                $element.css('cursor', 'grab');
                $element.css('cursor', '-webkit-grab');
                $element.css('cursor', '-moz-grab');
            };
            $scope.func.clearLayers = function () {
                return new Promise(function (resolve, reject) {
                    $scope.data.type = null;
                    try {
                        $scope.data.map.removeLayer($scope.data.imageLayer);
                    } catch (e) {
                        console.error(e);
                    }
                    _.defer(function () {
                        return resolve(true);
                    });
                });
            };
            $scope.func.image = function (imageUuid) {
                return new Promise(function (resolve, reject) {
                    try {
                        if (isCookieFunction("Authorization") != null) resolve($sce.trustAsResourceUrl("/KeydocPro/services/rest/document/getContent?docId=" + imageUuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + "&" + new Date().getTime()));else reject("لطفا ابتدا وارد سیستم شوید.");
                    } catch (e) {
                        console.error(e);
                        reject(e);
                    }
                });
            };
            $scope.func.navBar = {};
            $scope.func.navBar.screen = {};
            $scope.func.navBar.screen.goFull = function (event) {
                try {
                    $scope.data.flages.isFull = true;
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

            $scope.func.rotateLeftMap = function () {
                try {
                    console.log("L  ", _.clone($scope.data.map.getView().getRotation()));
                    $scope.data.rotation--;
                    $scope.data.rotation = $scope.data.rotation < 0 ? $scope.data.degers.length - 1 : $scope.data.rotation;
                    $scope.data.map.getView().rotate($scope.data.degers[$scope.data.rotation], ol.extent.getCenter($scope.data.target));
                    //setCenter(ol.extent.getCenter(target));
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.rotateRightMap = function () {
                try {
                    console.log("R  ", _.clone($scope.data.map.getView().getRotation()));
                    $scope.data.rotation++;
                    $scope.data.rotation %= 4;
                    $scope.data.map.getView().rotate($scope.data.degers[$scope.data.rotation], ol.extent.getCenter($scope.data.target));
                } catch (e) {
                    console.error(e);
                }
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
            $scope.func.initiallize = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(content) {
                    var URL, xhr;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    $scope.data.content = angular.copy(content);
                                    $scope.func.readyMap();
                                    // TODO clear all layer in MAP
                                    _context.next = 5;
                                    return $scope.func.clearLayers();

                                case 5:
                                    $scope.data.img = null;
                                    $scope.data.img = new Image();
                                    //todo start download image
                                    try {
                                        $("#show-waiting-get-rest-from-server-id").addClass('show-waiting');
                                    } catch (e) {}
                                    _context.next = 10;
                                    return $scope.func.image(content.doc.uuid);

                                case 10:
                                    URL = _context.sent;

                                    $scope.data.rotation = 0;

                                    if (!(content.doc.mimeType == "image/tiff")) {
                                        _context.next = 23;
                                        break;
                                    }

                                    _context.next = 15;
                                    return JSManagement.addJS("resource/javaScript/tiff.min.js?dev=" + randomVersionName);

                                case 15:
                                    $scope.data.removeExternalFuncs["resource/javaScript/tiff.min.js?dev=" + randomVersionName] = 'Tiff,TiffTag';

                                    xhr = new XMLHttpRequest();

                                    xhr.open('GET', URL);
                                    xhr.responseType = 'arraybuffer';
                                    xhr.onload = function (e) {
                                        try {
                                            var buffer = xhr.response;
                                            Tiff.initialize({ TOTAL_MEMORY: 16777216 * 10 });
                                            var tiff = new Tiff({ buffer: buffer });
                                            var canvas = tiff.toCanvas();
                                            var width = tiff.width();
                                            var height = tiff.height();
                                            var newfile = $scope.func.dataURItoBlob(canvas.toDataURL("image/jpeg"), "image/jpeg");
                                            var readerFileCanvas = new FileReader();
                                            readerFileCanvas.onerror = function () {
                                                toaster.pop("error", "", "مشکلی در دریافت تصویر به وجود آمده است .");
                                                try {
                                                    $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                                } catch (e) {} finally {
                                                    try {
                                                        tiff = undefined;
                                                        canvas = undefined;
                                                        width = undefined;
                                                        height = undefined;
                                                        newfile = undefined;
                                                        readerFileCanvas = undefined;
                                                    } catch (e) {
                                                        console.error(e);
                                                    }
                                                }
                                            };
                                            readerFileCanvas.onload = function (evt) {
                                                try {
                                                    $scope.data.target = [0, 0, angular.copy(width), angular.copy(height)];
                                                    //**TODO if map is exist clear all inside layers **/
                                                    if ($scope.data.map == null) {
                                                        $scope.data.map = new ol.Map({
                                                            layers: [],
                                                            target: 'imageViewerShowResult',
                                                            view: new ol.View({
                                                                projection: new ol.proj.Projection({
                                                                    code: 'xkcd-image', //'pixel',
                                                                    units: 'pixels',
                                                                    extent: $scope.data.target
                                                                }),
                                                                center: ol.extent.getCenter($scope.data.target),
                                                                rotation: $scope.data.rotation,
                                                                zoom: 2,
                                                                maxZoom: 10
                                                            })
                                                        });
                                                    } else {
                                                        try {
                                                            $scope.data.map.getView().getProjection().setExtent($scope.data.target);
                                                        } catch (e) {
                                                            console.error(e);
                                                        }
                                                        try {
                                                            $scope.data.map.getView().setCenter(ol.extent.getCenter($scope.data.target));
                                                        } catch (e) {
                                                            console.error(e);
                                                        }
                                                        try {
                                                            $scope.data.map.getView().setZoom(2);
                                                        } catch (e) {
                                                            console.error(e);
                                                        }
                                                        try {
                                                            $scope.data.map.getView().rotate($scope.data.rotation, ol.extent.getCenter($scope.data.target));
                                                        } catch (e) {
                                                            console.error(e);
                                                        }
                                                    }

                                                    _.defer(function () {
                                                        return window.document.querySelector('.imageViewerShowResult').style.display = "block";
                                                    }, 500);
                                                    /* TODO add Image layer to Map */

                                                    $scope.data.imageLayer = new ol.layer.Image({
                                                        source: new ol.source.ImageStatic({
                                                            url: evt.target.result,
                                                            projection: new ol.proj.Projection({
                                                                code: 'xkcd-image',
                                                                units: 'pixels',
                                                                extent: $scope.data.target
                                                            }),
                                                            imageExtent: $scope.data.target,
                                                            imageSize: [width, height],
                                                            center: ol.extent.getCenter($scope.data.target)
                                                        })
                                                    });
                                                    $scope.data.map.addLayer($scope.data.imageLayer);

                                                    /**todo  remove openlayer logo in corner right down*/
                                                    try {
                                                        $("#imageViewerShowResult .ol-viewport  .ol-overlaycontainer-stopevent  ul").remove();
                                                    } catch (e) {
                                                        console.error(e);
                                                    }

                                                    /**todo remove openlayer zooms icon */
                                                    try {
                                                        $("#imageViewerShowResult .ol-overlaycontainer-stopevent .ol-zoom").remove();
                                                    } catch (e) {}

                                                    _.defer(function () {
                                                        return $scope.$apply();
                                                    });
                                                } catch (e) {
                                                    console.error(e);
                                                } finally {
                                                    try {
                                                        $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                                    } catch (e) {}
                                                    try {
                                                        tiff = undefined;
                                                        canvas = undefined;
                                                        width = undefined;
                                                        height = undefined;
                                                        newfile = undefined;
                                                        readerFileCanvas = undefined;
                                                    } catch (e) {
                                                        console.error(e);
                                                    }
                                                }
                                            };
                                            readerFileCanvas.readAsDataURL(newfile);
                                        } catch (e) {
                                            toaster.pop("error", "", "مشکلی در دریافت تصویر به وجود آمده است .");
                                            try {
                                                $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                            } catch (e) {}
                                        }
                                    };
                                    xhr.send();
                                    _context.next = 24;
                                    break;

                                case 23:
                                    $($scope.data.img).load(function () {
                                        try {
                                            $scope.data.target = [0, 0, $(this)[0].width, $(this)[0].height];
                                            //**TODO if map is exist clear all inside layers **/
                                            if ($scope.data.map == null) {
                                                $scope.data.map = new ol.Map({
                                                    layers: [],
                                                    target: 'imageViewerShowResult',
                                                    view: new ol.View({
                                                        projection: new ol.proj.Projection({
                                                            code: 'xkcd-image', //'pixel',
                                                            units: 'pixels',
                                                            extent: $scope.data.target
                                                        }),
                                                        center: ol.extent.getCenter($scope.data.target),
                                                        rotation: $scope.data.rotation,
                                                        zoom: 2,
                                                        maxZoom: 8
                                                    })
                                                });
                                            } else {
                                                try {
                                                    $scope.data.map.getView().getProjection().setExtent($scope.data.target);
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                                try {
                                                    $scope.data.map.getView().setCenter(ol.extent.getCenter($scope.data.target));
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                                try {
                                                    $scope.data.map.getView().setZoom(2);
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                                try {
                                                    $scope.data.map.getView().rotate($scope.data.rotation, ol.extent.getCenter($scope.data.target));
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                            }
                                            _.defer(function () {
                                                return window.document.querySelector('.imageViewerShowResult').style.display = "block";
                                            }, 500);
                                            /* TODO add Image layer to Map */
                                            $scope.data.imageLayer = new ol.layer.Image({
                                                source: new ol.source.ImageStatic({
                                                    url: $(this)[0].src,
                                                    projection: new ol.proj.Projection({
                                                        code: 'xkcd-image',
                                                        units: 'pixels',
                                                        extent: $scope.data.target
                                                    }),
                                                    imageExtent: $scope.data.target,
                                                    imageSize: [$(this)[0].width, $(this)[0].height],
                                                    center: ol.extent.getCenter($scope.data.target)
                                                })
                                            });
                                            $scope.data.map.addLayer($scope.data.imageLayer);
                                            /**todo  remove openlayer logo in corner right down*/
                                            try {
                                                $("#imageViewerShowResult .ol-viewport  .ol-overlaycontainer-stopevent  ul").remove();
                                            } catch (e) {
                                                console.error(e);
                                            }
                                            try {
                                                $("#imageViewerShowResult .ol-overlaycontainer-stopevent .ol-zoom").remove();
                                            } catch (e) {}
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        } catch (e) {
                                            console.error(e);
                                        } finally {
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            try {
                                                $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                            } catch (e) {}
                                        }
                                    }).error(function () {
                                        //TODO notify the users that the image could not be loaded
                                        toaster.pop('error', '', 'مشکلی در دریافت تصویر به وجود آمده است .');
                                        try {
                                            $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                        } catch (e) {}
                                    }).attr('src', URL);

                                case 24:
                                    _context.next = 30;
                                    break;

                                case 26:
                                    _context.prev = 26;
                                    _context.t0 = _context["catch"](0);

                                    try {
                                        $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                    } catch (e) {}
                                    console.error(_context.t0);

                                case 30:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 26]]);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }();
            if ($scope.runing == null) $scope.runing = $scope.func.initiallize;
            $element.on('$destroy', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                try {

                                    _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(funcName, src) {
                                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                while (1) {
                                                    switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                            _context2.prev = 0;
                                                            _context2.next = 3;
                                                            return JSManagement.removeJS(src, funcName);

                                                        case 3:
                                                            _context2.next = 8;
                                                            break;

                                                        case 5:
                                                            _context2.prev = 5;
                                                            _context2.t0 = _context2["catch"](0);

                                                            console.error(_context2.t0);

                                                        case 8:
                                                        case "end":
                                                            return _context2.stop();
                                                    }
                                                }
                                            }, _callee2, _this, [[0, 5]]);
                                        }));

                                        return function (_x2, _x3) {
                                            return _ref3.apply(this, arguments);
                                        };
                                    }());

                                    $scope.data = undefined;
                                    $scope.func = undefined;
                                } catch (e) {
                                    console.error(e);
                                }
                                try {
                                    $scope.$destroy();
                                } catch (e) {
                                    console.error(e);
                                }

                            case 2:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this);
            })));
        }]
    };
}