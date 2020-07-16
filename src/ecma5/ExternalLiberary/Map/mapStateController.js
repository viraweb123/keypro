"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advanceStateController = function advanceStateController($scope, mapService, toaster, $state, $uibModal, $sce, JS, style, feature) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func = {};
            $scope.func.getThumbnail = function (id) {
                return new Promise(function (resolve, reject) {
                    mapService.document.thumbnail({ uuid: id }, 0, 75).then(function (result) {
                        return resolve("data:image/png;base64," + result.data);
                    }, function (error) {
                        return resolve('/static/img/jpg.png');
                    });
                });
            };
            $scope.func.getList = function (id) {

                mapService.map.getMaps().then(function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                        var rand, s, map, i, index;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        rand = _.random(1, 100);
                                        s = Date.parse(new Date());
                                        _context.prev = 2;

                                        $scope.data.maps = [];
                                        map = null;
                                        i = 0;

                                    case 6:
                                        if (!(i < res.data.originalElement.length)) {
                                            _context.next = 14;
                                            break;
                                        }

                                        _context.next = 9;
                                        return $scope.func.getThumbnail(res.data.originalElement[i].imageUuid);

                                    case 9:
                                        res.data.originalElement[i].thumbnailSrc = _context.sent;

                                        $scope.data.maps.push(res.data.originalElement[i]);

                                    case 11:
                                        i++;
                                        _context.next = 6;
                                        break;

                                    case 14:

                                        if (typeof id !== "undefined") {
                                            index = _.findIndex($scope.data.maps, function (map) {
                                                return map.id == id;
                                            });

                                            if (index >= 0) {
                                                $scope.func.selectMap($scope.data.maps[index]);
                                                //$scope.data.selected = id;
                                                //$scope.func.selectMap($scope.data.maps[index]);
                                            }
                                        }

                                        _context.next = 20;
                                        break;

                                    case 17:
                                        _context.prev = 17;
                                        _context.t0 = _context["catch"](2);

                                        console.error(_context.t0);

                                    case 20:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this, [[2, 17]]);
                    }));

                    return function (_x) {
                        return _ref.apply(this, arguments);
                    };
                }());
            };
            $scope.func.map = {};
            $scope.func.map.select = function (Obj) {
                return new Promise(function () {
                    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(resolve, reject) {
                        var result;
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        _context2.prev = 0;
                                        _context2.next = 3;
                                        return JS.addJS("ecma5/ExternalLiberary/Map/selectMap.js?dev=" + randomVersionName);

                                    case 3:
                                        $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Map/selectMap.js?dev=" + randomVersionName] = 'selectMapCtrl';
                                        _context2.next = 6;
                                        return selectMapCtrl($uibModal, mapService, JS, Obj);

                                    case 6:
                                        result = _context2.sent;

                                        resolve(result);
                                        _context2.next = 14;
                                        break;

                                    case 10:
                                        _context2.prev = 10;
                                        _context2.t0 = _context2["catch"](0);

                                        console.error(_context2.t0);
                                        reject(_context2.t0);

                                    case 14:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, _this, [[0, 10]]);
                    }));

                    return function (_x2, _x3) {
                        return _ref2.apply(this, arguments);
                    };
                }());
            };
            $scope.func.map.addToMap = function (query) {
                return mapService.map.setMapSection(query);
            };
            $scope.func.getMapItems = function (map) {
                return new Promise(function (resolve, reject) {
                    mapService.map.getMapSections(map.id).then(function (res) {
                        resolve({
                            image: $sce.trustAsResourceUrl("/KeydocPro/services/rest/document/getContent?docId=" + map.imageUuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + "&" + new Date().getTime()),
                            list: _.clone(res.data.originalElement)
                        });
                    }, function (error) {
                        reject('error');
                    });
                });
            };
            $scope.func.getMapWithId = function (id) {
                return new Promise(function (resolve, reject) {
                    mapService.map.getMap(id).then(function (res) {
                        return resolve({ map: res.data });
                    }, function (error) {
                        return reject('error');
                    });
                });
            };
            $scope.func.image = function (imageUuid) {
                return new Promise(function (resolve, reject) {
                    try {
                        if (isCookieFunction("Authorization") != null) resolve($sce.trustAsResourceUrl("/KeydocPro/services/rest/document/getContent?docId=" + imageUuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + "&" + new Date().getTime()));else throw "لطفا ابتدا وارد سیستم شوید";
                    } catch (e) {
                        console.error(e);
                        throw "error", "", e.massage || e;
                        reject(e);
                    }
                });
            };
            $scope.func.changeThumnail = function () {
                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
                    var index;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    index = _.findIndex($scope.data.maps, function (map) {
                                        return map.id == id;
                                    });

                                    if (!(index >= 0)) {
                                        _context3.next = 7;
                                        break;
                                    }

                                    _context3.next = 4;
                                    return JS.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                                case 4:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType,srcMimeType';
                                    $scope.data.maps[index].thumbnailSrc = getSrcFromType('image/jpeg');

                                    mapService.document.thumbnail({ uuid: $scope.data.maps[index].imageUuid }, 0, 75).then(function (result) {
                                        return $scope.data.maps[index].thumbnailSrc = "data:image/png;base64," + result.data;
                                    }, function (error) {
                                        return $scope.data.maps[index].thumbnailSrc = getSrcFromType('image/jpeg');
                                    });

                                case 7:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this);
                }));

                return function (_x4) {
                    return _ref3.apply(this, arguments);
                };
            }();
            $scope.func.map.description = function (map) {
                return new Promise(function () {
                    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(resolve, reject) {
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        _context4.next = 2;
                                        return JS.addJS("ecma5/ExternalLiberary/Map/descriptionMap.js?dev=" + randomVersionName);

                                    case 2:
                                        $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Map/descriptionMap.js?dev=" + randomVersionName] = 'descriptionMapCtrl';
                                        _context4.next = 5;
                                        return descriptionMapCtrl($uibModal, map);

                                    case 5:
                                        resolve(true);

                                    case 6:
                                    case "end":
                                        return _context4.stop();
                                }
                            }
                        }, _callee4, _this);
                    }));

                    return function (_x5, _x6) {
                        return _ref4.apply(this, arguments);
                    };
                }());
            };
            $scope.func.erase = function (id) {
                return mapService.map.removeMap(id);
            };
            $scope.func.askRemove = function () {
                return new Promise(function (resolve, reject) {
                    var modalInstance = $uibModal.open({
                        template: "\n                                    <div class=\"modal-content\">\n                                        <div class=\"modal-header fontStyle\">\n                                            <div class=\"form-group\">\n                                                <div class=\"col-sm-1 pull-left\">\n                                                    <i class=\"fa fa-close\"\n                                                       data-placement=\"top\" title=\"بستن\"\n                                                       data-toggle=\"tooltip\"\n                                                       style=\"cursor: pointer;color: red;\"\n                                                       ng-click=\"cancel()\">\n                                                    </i>\n                                                </div>\n                                                <h4  class=\"modal-title col-sm-11 pull-right fontStyle\">\n                                                                حذف \n                                        </div>\n                                        <div class=\"modal-body\">\n                                            <span class=\"fontStyle\">آیا از حذف این نقشه اطمینان دارید</span>\n                                        </div> \n                                        <div class=\"modal-footer\">\n                                         \n                                             <div class=\"row\">\n                                                   \n                                                \n                                                    \n                                                    <div class=\"col-sm-9 pull-left\">\n                                                    \n                                                        <div class=\"col-sm-6 pull-right\">\n                                                           <a \n                                                                class=\"btn btn-danger btn-social pull-left modal-butons\" \n                                                                ng-click=\"remove()\">{{'map.zl.delete.map'|translate}}\n                                                              <i \n                                                                style=\"font-size: 13px; top: -5px; width: 17px; background-color: rgb(201, 48, 44);\" \n                                                                class=\"glyphicon glyphicon-trash butonsIcon\">\n                                                              </i>\n                                                            </a>\n                                                        </div>\n                                                        <div class=\"col-sm-6 pull-left\"> \n                                                            <a \n                                                                    class=\"btn btn-warning btn-social pull-left modal-butons\" \n                                                                    ng-click=\"cancel()\">\n                                                                {{'map.zl.cancel.map'|translate}}\n                                                                <i \n                                                                    style=\"background-color:  #ec971f;font-size: 13px;top: -5px;width: 17px;\" \n                                                                    class=\"glyphicon glyphicon-remove-circle butonsIcon\">\n                                                                </i>\n                                                            </a>\n                                                        </div>\n                                                    </div>\n                                             </div>\n                                         </div>    \n                                    </div>    \n                                ",
                        controller: function controller($scope, $uibModalInstance) {

                            $scope.cancel = function () {
                                return $uibModalInstance.close(false);
                            };
                            $scope.remove = function () {
                                return $uibModalInstance.close(true);
                            };
                        },
                        size: 'sm',
                        backdrop: 'static', // false,
                        keyboard: false
                    });

                    modalInstance.result.then(function (response) {

                        if (response) resolve(response);else reject('cancel del');
                    });
                });
            };
            $scope.func.end = function () {
                $scope.func.erase($scope.data.mapViewer.data.id).then(function (res) {
                    var index = _.findIndex($scope.data.maps, function (map) {
                        return map.id == $scope.data.mapViewer.data.id;
                    });
                    if (index >= 0) $scope.data.maps.splice(index, 1);
                    $scope.data.selectedID = -1;
                    $scope.data.mapViewer.data.id = -1;
                    $scope.data.mapViewer.data.map = null;
                });
            };
            $scope.func.map.showResult = function () {
                var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(query) {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    _context6.next = 3;
                                    return JS.addJS("ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=" + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=" + randomVersionName] = 'miladiToJalaliFunction';

                                    _.defer(_asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                            while (1) {
                                                switch (_context5.prev = _context5.next) {
                                                    case 0:
                                                        _context5.prev = 0;
                                                        _context5.next = 3;
                                                        return JS.addJS("ecma5/ExternalLiberary/Map/showMapResultWithQuery.js?dev=" + randomVersionName);

                                                    case 3:
                                                        $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Map/showMapResultWithQuery.js?dev=" + randomVersionName] = 'showMapResultWithQueryCtrl';
                                                        _context5.next = 6;
                                                        return showMapResultWithQueryCtrl($uibModal, $scope.data.profile, mapService, query, miladiToJalaliFunction);

                                                    case 6:
                                                        _context5.next = 11;
                                                        break;

                                                    case 8:
                                                        _context5.prev = 8;
                                                        _context5.t0 = _context5["catch"](0);

                                                        console.error(_context5.t0);

                                                    case 11:
                                                    case "end":
                                                        return _context5.stop();
                                                }
                                            }
                                        }, _callee5, _this, [[0, 8]]);
                                    })), 100);
                                    _context6.next = 10;
                                    break;

                                case 7:
                                    _context6.prev = 7;
                                    _context6.t0 = _context6["catch"](0);

                                    console.error(_context6.t0);

                                case 10:
                                case "end":
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, _this, [[0, 7]]);
                }));

                return function (_x7) {
                    return _ref5.apply(this, arguments);
                };
            }();
            $scope.func.map.add = function (parentId) {
                if (typeof parentId !== 'undefined') $scope.func.map.select({
                    parentId: parentId,
                    id: 0,
                    coordinate: '',
                    style: '',
                    type: '',
                    title: '',
                    description: '',
                    query: {},
                    imageUuid: -1
                }).then(function (res) {
                    return $scope.func.map.addToMap(res.query).then(function (result) {
                        return $scope.func.getList(result.data);
                    }, function (error) {
                        return console.error(error);
                    });
                }, function (error) {
                    return console.error(error);
                });
            };
            $scope.func.askRemove = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
                var result;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.prev = 0;
                                _context7.next = 3;
                                return JS.addJS("ecma5/ExternalLiberary/Map/deleteMap.js?dev=" + randomVersionName);

                            case 3:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Map/deleteMap.js?dev=" + randomVersionName] = 'deleteMapCtrl';
                                _context7.next = 6;
                                return deleteMapCtrl($uibModal);

                            case 6:
                                result = _context7.sent;

                                if (result) {}
                                _context7.next = 13;
                                break;

                            case 10:
                                _context7.prev = 10;
                                _context7.t0 = _context7["catch"](0);

                                console.error(_context7.t0);

                            case 13:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, _this, [[0, 10]]);
            }));
            $scope.func.click = function (e, map) {
                $scope.data.dbClicked = e.detail || e.originalEvent.detail;

                switch ($scope.data.dbClicked) {
                    case 1:
                        /* TODO click in image */
                        setTimeout(function () {
                            if ($scope.data.dbClicked == 1) {
                                $scope.data.dbClicked = 0;
                                $scope.func.selectMap(map);
                            }
                        }, 500);
                        break;
                    case 2:
                        /* TODO double click in image */
                        //Do nothing
                        break;
                    default:
                        break;
                }
            };
            $scope.func.selectMap = function (map) {

                $scope.data.selected = map.id;
                if (typeof $scope.data.mapViewer.data.id === 'undefined' || $scope.data.mapViewer.data.id !== map.imageUuid) {
                    $scope.data.mapViewer.data.query = {};

                    // get sections
                    mapService.map.getMapSections(map.id).then(function (res) {

                        $scope.data.mapViewer.data.id = map.id;
                        $scope.data.mapViewer.data.map = map;
                        $scope.data.mapViewer.data.list = _.clone(res.data.originalElement);
                        $scope.data.mapViewer.data.query = _.clone(map.query);

                        $scope.func.image(map.imageUuid).then(function (result) {
                            $scope.data.mapViewer.data.image = result;
                            if (_.isFunction($scope.data.runInit)) $scope.data.runInit();
                        }, function (error) {
                            $scope.data.currentID = undefined;
                        });
                    }, function (error) {});
                }
            };
            $scope.func.remove = function () {
                $scope.func.askRemove().then(function (res) {
                    return $scope.func.end();
                });
            };
            $scope.func.add = function (id) {};
            $scope.func.run = _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.prev = 0;
                                _context8.next = 3;
                                return feature.getFeatures(mapService.auth);

                            case 3:
                                $scope.data.profile = _context8.sent;

                                $scope.func.getList();
                                _context8.next = 10;
                                break;

                            case 7:
                                _context8.prev = 7;
                                _context8.t0 = _context8["catch"](0);

                                toaster.pop('error', '', 'عدم دریافت اطلاعات کاربری لطفا ابتدا وارد سیستم شوید');

                            case 10:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, _this, [[0, 7]]);
            }));

            $scope.$on("$destroy", function () {
                try {
                    window.clearAllIntervals();

                    _.forEach(_.clone($scope.data.removeExternalCSS), function () {
                        var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(value, src) {
                            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                while (1) {
                                    switch (_context9.prev = _context9.next) {
                                        case 0:
                                            _context9.prev = 0;
                                            _context9.next = 3;
                                            return style.removeCSS(src);

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

                        return function (_x8, _x9) {
                            return _ref9.apply(this, arguments);
                        };
                    }());

                    _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                        var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(funcName, src) {
                            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                while (1) {
                                    switch (_context10.prev = _context10.next) {
                                        case 0:
                                            _context10.prev = 0;
                                            _context10.next = 3;
                                            return JS.removeJS(src, funcName);

                                        case 3:
                                            _context10.next = 8;
                                            break;

                                        case 5:
                                            _context10.prev = 5;
                                            _context10.t0 = _context10["catch"](0);

                                            console.error(_context10.t0);

                                        case 8:
                                        case "end":
                                            return _context10.stop();
                                    }
                                }
                            }, _callee10, _this, [[0, 5]]);
                        }));

                        return function (_x10, _x11) {
                            return _ref10.apply(this, arguments);
                        };
                    }());
                    // clear all data and functions
                    $scope.func = undefined;
                    $scope.data = undefined;
                    $scope.notReadyMap = undefined;
                } catch (e) {
                    console.error(e);
                }
            });
            $scope.$on('changeFeature', function () {
                var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(event, args) {
                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                        _context11.next = 5;
                                        break;
                                    }

                                    _context11.next = 3;
                                    return feature.getFeatures(mapService.auth);

                                case 3:
                                    $scope.data.profile = _context11.sent;

                                    $scope.func.getList();

                                case 5:
                                case "end":
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, _this);
                }));

                return function (_x12, _x13) {
                    return _ref11.apply(this, arguments);
                };
            }());

            $scope.data = {
                dbClicked: 0,
                runInit: null,
                mapViewer: {
                    data: {
                        query: {},
                        style: [{ key: 'position', value: 'relative' }, { key: 'overflow', value: 'scroll' },
                        //{key:'height'    , value:'100%'},
                        //{key:'max-height', value:'1000px'},
                        //{key:'max-height', value:'500px'},
                        //{key:'max-width' , value:'1500px'},
                        { key: 'max-height', value: '100%' }, { key: 'max-width', value: '100%' }, { key: 'direction', value: 'ltr' }]
                    },
                    func: {
                        getList: function getList(id) {
                            return mapService.map.getMapSections(id);
                        },
                        addImage: $scope.func.map.select,
                        addToMap: $scope.func.map.addToMap,
                        getMapItems: $scope.func.getMapItems,
                        getMap: $scope.func.getMapWithId,
                        image: $scope.func.image,
                        changeThumnail: $scope.func.changeThumnail,
                        description: $scope.func.map.description,
                        erase: $scope.func.erase,
                        end: $scope.func.end,
                        showResult: $scope.func.map.showResult
                    }
                },
                maps: [],
                removeExternalFuncs: {},
                removeExternalCSS: {},
                selected: -1,
                state: 'map',
                nav: {
                    right: {
                        selectedSide: null,
                        isOpened: false,
                        select: function select(selectedSide) {
                            $scope.data.nav.right.selectedSide = selectedSide;
                        }
                    },
                    left: {
                        selectedSide: null,
                        isOpened: false,
                        select: function select(selectedSide) {
                            $scope.data.nav.left.selectedSide = selectedSide;
                        }
                    }
                },
                profile: null
            };

            resolve(true);
        } catch (e) {
            reject("مشکلی در ساخت State ایجاد شده است.");
        }
    });
};