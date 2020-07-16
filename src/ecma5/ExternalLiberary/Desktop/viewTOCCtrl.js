'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var viewTOCCtrl = function viewTOCCtrl(uibModal, _JS, _style, _service, _Folder, _Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Desktop/viewTOC.html?dev=' + randomVersionName,
            controller: function controller($scope, $compile, $uibModalInstance, toaster, JS, style, service, Folder, Authentication) {

                $scope.data = {
                    removeExternalFuncs: {},
                    removeExternalCSS: {},

                    sort: {
                        type: 'index',
                        ascDesc: false
                    },

                    tree: null,
                    indexes: null,
                    map: null,
                    imageLayer: null,
                    vectorLayer: null,
                    vectors: null,
                    modify: null,
                    img: null,
                    currentTOC: null,
                    treeMap: {},

                    filterElement: 'index',
                    filterValue: null,
                    selectIndex: null

                };

                $scope.func = {};

                $scope.func.indexes = function (name) {
                    return _.map(_.split(_.replace(name, 'S', ''), "-"), function (n) {
                        return Number(n);
                    });
                };

                $scope.func.nextPage = function () {
                    try {

                        if ($scope.data.currentTOC != null && _.has($scope.data.currentTOC, 'currentPage')) {
                            if ($scope.data.currentTOC.currentPage + 1 <= $scope.data.currentTOC.pages) {
                                $scope.data.currentTOC.currentPage++;
                                $scope.func.initiallizeImage($scope.data.currentTOC.name + 'P' + $scope.data.currentTOC.currentPage);
                            } else {
                                var nextPage = _.find($scope.data.treeMap, function (toc) {
                                    return toc.start == $scope.data.currentTOC.pages + $scope.data.currentTOC.start && toc.pages > 0;
                                });
                                $scope.data.currentTOC = nextPage !== "undefined" ? _.clone(nextPage) : _.clone($scope.data.treeMap["S1"]);
                                $scope.data.currentTOC.currentPage = 1;
                                $scope.func.changeTOC.change($scope.data.currentTOC);
                                /*var Name = $scope.data.currentTOC.name;//"S1-3-2"
                                var lastIndex = _.map(_.split(_.replace(Name,'S',''),"-"),n=>Number(n)).pop();
                                _.replace(Name,/(\d{1})$/,++lastIndex);*/
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.prevPage = function () {
                    try {
                        if ($scope.data.currentTOC != null && _.has($scope.data.currentTOC, 'currentPage')) {
                            if ($scope.data.currentTOC.currentPage - 1 > 0) {
                                $scope.data.currentTOC.currentPage--;
                                $scope.func.initiallizeImage($scope.data.currentTOC.name + 'P' + $scope.data.currentTOC.currentPage);
                            } else {
                                var prevPage = _.find($scope.data.treeMap, function (toc) {
                                    return toc.start + toc.pages == $scope.data.currentTOC.start && toc.pages > 0;
                                });
                                $scope.data.currentTOC = prevPage !== "undefined" ? _.clone(prevPage) : _.clone($scope.data.treeMap["S1"]);
                                $scope.data.currentTOC.currentPage = 1;
                                $scope.func.changeTOC.change($scope.data.currentTOC);
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.goToSelectedPage = function (page) {
                    try {
                        var _page$path$split = page.path.split('P');

                        var _page$path$split2 = _slicedToArray(_page$path$split, 2);

                        var name = _page$path$split2[0];
                        var page = _page$path$split2[1];

                        $scope.data.currentTOC = _.clone($scope.data.treeMap[name]);
                        $scope.data.currentTOC.currentPage = Number(page);

                        var className = window.document.querySelector(".modal-body  div.toc-class .index-result");
                        if (className.classList.contains('index-result-view')) {
                            className.classList.remove("index-result-view");
                            try {
                                window.document.querySelector(".modal-body  div.toc-class .view-index").classList.remove("select-index");
                            } catch (err) {
                                console.error(err);
                            }
                        }
                        _.defer(function () {
                            return $scope.$apply();
                        });
                        $scope.func.changeTOC.change($scope.data.currentTOC);
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.makeIndexs = function (indexes) {
                    return new Promise(function (resolve, reject) {
                        try {
                            resolve(_.map(indexes, function (index) {
                                var temp = {
                                    index: index.index,
                                    pages: []
                                };
                                var name, page;
                                for (var i = 0; i < index.pages.length; i++) {
                                    try {
                                        var _index$pages$i$split = index.pages[i].split('P');

                                        var _index$pages$i$split2 = _slicedToArray(_index$pages$i$split, 2);

                                        name = _index$pages$i$split2[0];
                                        page = _index$pages$i$split2[1];

                                        temp.pages.push({
                                            number: $scope.data.treeMap[name].start + Number(page),
                                            path: index.pages[i]
                                        });
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }
                                return temp;
                            }));
                        } catch (e) {

                            reject(e);
                        }
                    });
                };

                $scope.func.makeGroups = function () {
                    return new Promise(function (resolve, reject) {
                        try {
                            if (_.isArray($scope.data.tree)) {
                                var tree = angular.copy($scope.data.tree);
                                while (tree.length > 0) {
                                    var node = tree.pop();
                                    if (_.has(node, 'childs') && node.childs.length > 0) {
                                        for (var i = 0; i < node.childs.length; i++) {
                                            tree.push(angular.copy(node.childs[i]));
                                        }
                                    }
                                    $scope.data.treeMap[node.name] = angular.copy(node);
                                }
                            }
                            resolve(true);
                        } catch (e) {
                            reject(false);
                            console.error(e);
                        }
                    });
                };

                $scope.func.changeTOC = {
                    change: function change(toc) {

                        if (_.has(toc, 'pages') && toc.pages > 0) {
                            $scope.data.currentTOC = _.clone(toc);
                            $scope.data.currentTOC.currentPage = 1;
                        } else if (_.has(toc, 'childs') && _.isArray(toc.childs) && toc.childs.length > 0) {
                            for (var i = 0; i < toc.childs.length; i++) {
                                if (_.has(toc.childs[i], 'pages') && toc.childs[i].pages > 0) {
                                    $scope.data.currentTOC = _.clone(toc.childs[i]);
                                    $scope.data.currentTOC.currentPage = 1;
                                    break;
                                }
                            }
                        } else if (_.has($scope.data.treeMap, "S1")) {
                            $scope.data.currentTOC = _.clone($scope.data.treeMap["S1"]);
                            $scope.data.currentTOC.currentPage = 1;
                        }

                        try {
                            var className = window.document.querySelector(".modal-body  div.toc-class .toc-result");
                            if (className.classList.contains('toc-result-view')) {
                                className.classList.remove("toc-result-view");
                                try {
                                    window.document.querySelector(".modal-body  div.toc-class .view-toc").classList.remove("select-toc");
                                } catch (err) {
                                    console.error(err);
                                }
                            }
                        } catch (e) {
                            console.error(e);
                        }

                        $scope.func.initiallizeImage($scope.data.currentTOC.name + 'P' + $scope.data.currentTOC.currentPage);

                        _.defer(function () {
                            return $scope.$apply();
                        });
                    }
                };

                $scope.func.removeModifyLayer = function () {
                    try {
                        $scope.data.map.removeInteraction($scope.data.modify);
                    } catch (er) {
                        console.error(er);
                    }
                    try {
                        $(".modal-body .toc-class .view-result-image").css('cursor', 'grab');
                        $(".modal-body .toc-class .view-result-image").css('cursor', '-webkit-grab');
                        $(".modal-body .toc-class .view-result-image").css('cursor', '-moz-grab');
                    } catch (e) {
                        console.error(e);
                    }
                };
                $scope.func.readyMap = function () {
                    try {
                        $scope.func.removeModifyLayer();
                        $(".modal-body .toc-class .view-result-image").css('cursor', 'grab');
                        $(".modal-body .toc-class .view-result-image").css('cursor', '-webkit-grab');
                        $(".modal-body .toc-class .view-result-image").css('cursor', '-moz-grab');
                    } catch (e) {
                        console.error(e);
                    }
                };
                $scope.func.clearLayers = function () {
                    return new Promise(function (resolve, reject) {
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

                $scope.func.initiallizeImage = function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(name) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.prev = 0;

                                        $scope.func.readyMap();
                                        /* TODO clear all layer in MAP */
                                        _context.next = 4;
                                        return $scope.func.clearLayers();

                                    case 4:
                                        $scope.data.img = null;
                                        $scope.data.img = new Image();
                                        $($scope.data.img).load(function () {
                                            try {
                                                var target = [0, 0, $(this)[0].width, $(this)[0].height];
                                                //**TODO if map is exist clear all inside layers **/
                                                if ($scope.data.map == null) {
                                                    $scope.data.map = new ol.Map({
                                                        controls: ol.control.defaults().extend([new ol.control.FullScreen()]),
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
                                                    });
                                                } else {
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
                                                    return window.document.querySelector('.view-result-image .mapViewer').style.display = "block";
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

                                                /**todo  remove openlayer logo in corner right down*/
                                                try {
                                                    $(".view-result-image #mapViewer .ol-viewport  .ol-overlaycontainer-stopevent  ul").remove();
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                                try {
                                                    $(".view-result-image #mapViewer .ol-viewport .ol-overlaycontainer-stopevent .ol-zoom").remove();
                                                } catch (e) {
                                                    console.error(e);
                                                }

                                                try {
                                                    window.document.querySelector(".ol-full-screen").style.marginRight = "40px";
                                                    window.document.querySelector(".ol-full-screen").style.marginTop = "-5px";
                                                } catch (e) {
                                                    console.error(e);
                                                }

                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }).error(function () {
                                            //TODO notify the users that the image could not be loaded
                                            toaster.pop('error', '', 'عدم دریافت تصویر');
                                        }).attr('src', '/static/image/toc/' + name + '.jpg'); //login-bg.jpg

                                        _context.next = 12;
                                        break;

                                    case 9:
                                        _context.prev = 9;
                                        _context.t0 = _context['catch'](0);

                                        console.error(_context.t0);

                                    case 12:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this, [[0, 9]]);
                    }));

                    return function (_x) {
                        return _ref.apply(this, arguments);
                    };
                }();

                $scope.func.convertTIFF2JPEG = function (img) {
                    /* TODO
                     try{
                        await JS.addJS('resource/javaScript/tiff.min.js');
                        let result =  await  $scope.func.convertTIFF2JPEG(file[0]);
                        await JS.removeJS('resource/javaScript/tiff.min.js','Tiff,TiffTag');
                        $scope.func.cropImage(result);
                     }catch(e){
                        console.error(e);
                        await JS.removeJS('resource/javaScript/tiff.min.js','Tiff,TiffTag');
                     }
                    */
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

                $scope.func.ShowIndex = function () {
                    try {
                        var className = window.document.querySelector(".modal-body  div.toc-class .index-result");
                        if (className.classList.contains('index-result-view')) {
                            className.classList.remove("index-result-view");
                            try {
                                window.document.querySelector(".modal-body  div.toc-class .view-index").classList.remove("select-index");
                            } catch (err) {
                                console.error(err);
                            }
                        } else {

                            try {
                                var classRightName = window.document.querySelector(".modal-body  div.toc-class .toc-result");
                                if (classRightName.classList.contains('toc-result-view')) {
                                    classRightName.classList.remove("toc-result-view");
                                    try {
                                        window.document.querySelector(".modal-body  div.toc-class .view-toc").classList.remove("select-toc");
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }
                            } catch (er) {
                                console.error(er);
                            }

                            className.classList.add("index-result-view");
                            try {
                                window.document.querySelector(".modal-body  div.toc-class .view-index").classList.add("select-index");
                            } catch (err) {
                                console.error(err);
                            }
                        }
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.ShowTOC = function () {

                    try {
                        var className = window.document.querySelector(".modal-body  div.toc-class .toc-result");
                        if (className.classList.contains('toc-result-view')) {
                            className.classList.remove("toc-result-view");
                            try {
                                window.document.querySelector(".modal-body  div.toc-class .view-toc").classList.remove("select-toc");
                            } catch (err) {
                                console.error(err);
                            }
                        } else {
                            try {
                                var classLeftName = window.document.querySelector(".modal-body  div.toc-class .index-result");
                                if (classLeftName.classList.contains('index-result-view')) {
                                    classLeftName.classList.remove("index-result-view");
                                    try {
                                        window.document.querySelector(".modal-body  div.toc-class .view-index").classList.remove("select-index");
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }
                            } catch (er) {
                                console.error(er);
                            }
                            className.classList.add("toc-result-view");
                            try {
                                window.document.querySelector(".modal-body  div.toc-class .view-toc").classList.add("select-toc");
                            } catch (err) {
                                console.error(err);
                            }
                        }
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };
                $scope.func.close = function () {
                    return $uibModalInstance.close(true);
                };
                $scope.func.run = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                    var res;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return JS.addJS('ecma5/ExternalLiberary/MOCK/getTOCTree.js?dev=' + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/MOCK/getTOCTree.js?dev=' + randomVersionName] = 'getTOCTree';
                                    _context2.next = 6;
                                    return getTOCTree(Folder.uuid);

                                case 6:
                                    res = _context2.sent;

                                    $scope.data.tree = _.clone(res.data.TOC);
                                    _context2.next = 10;
                                    return $scope.func.makeGroups();

                                case 10:
                                    _context2.prev = 10;
                                    _context2.next = 13;
                                    return $scope.func.makeIndexs(_.clone(res.data.INDEX));

                                case 13:
                                    $scope.data.indexes = _context2.sent;
                                    _context2.next = 19;
                                    break;

                                case 16:
                                    _context2.prev = 16;
                                    _context2.t0 = _context2['catch'](10);

                                    console.error(_context2.t0);

                                case 19:

                                    $scope.data.currentTOC = _.clone($scope.data.treeMap["S1"]);
                                    $scope.data.currentTOC.currentPage = 1;
                                    $scope.func.changeTOC.change($scope.data.currentTOC);

                                    _context2.next = 29;
                                    break;

                                case 24:
                                    _context2.prev = 24;
                                    _context2.t1 = _context2['catch'](0);

                                    console.error(_context2.t1);
                                    toaster.pop("error", "", "عدم دریافت فهرست.");
                                    $scope.func.close();

                                case 29:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[0, 24], [10, 16]]);
                }));

                $scope.func.run();

                $scope.$on("$destroy", function () {
                    try {
                        _.forEach(_.clone($scope.data.removeExternalCSS), function () {
                            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(value, src) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.prev = 0;
                                                _context3.next = 3;
                                                return style.removeCSS(src);

                                            case 3:
                                                _context3.next = 8;
                                                break;

                                            case 5:
                                                _context3.prev = 5;
                                                _context3.t0 = _context3['catch'](0);

                                                console.error(_context3.t0);

                                            case 8:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this, [[0, 5]]);
                            }));

                            return function (_x2, _x3) {
                                return _ref3.apply(this, arguments);
                            };
                        }());
                        _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(funcName, src) {
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                _context4.prev = 0;
                                                _context4.next = 3;
                                                return JS.removeJS(src, funcName);

                                            case 3:
                                                _context4.next = 8;
                                                break;

                                            case 5:
                                                _context4.prev = 5;
                                                _context4.t0 = _context4['catch'](0);

                                                console.error(_context4.t0);

                                            case 8:
                                            case 'end':
                                                return _context4.stop();
                                        }
                                    }
                                }, _callee4, _this, [[0, 5]]);
                            }));

                            return function (_x4, _x5) {
                                return _ref4.apply(this, arguments);
                            };
                        }());

                        //TODO clear all data and functions
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
                style: function style() {
                    return _style;
                },
                service: function service() {
                    return _service;
                },
                Folder: function Folder() {
                    return _Folder;
                },
                Authentication: function Authentication() {
                    return _Authentication;
                }
            }
        });
        modalInstance.result.then(function (response) {
            return reject(true);
        }, function (error) {
            return reject(true);
        });
    });
};