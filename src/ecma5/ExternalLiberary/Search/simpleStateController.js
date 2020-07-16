"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var simpleStateController = function simpleStateController($scope, $rootscope, simpleService, toaster, $state, $translate, $uibModal, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.data = {

                icons: {
                    "document": "fa-file",
                    "folder": "fa-folder",
                    "email": "fa-envelope"
                },

                showComplate: true,
                removeExternalFuncs: {},
                removeExternalCSS: {},
                isSearched: false,
                sort: {
                    type: null,
                    ascDesc: true
                },
                foamtree: null,
                foam: null,
                circle: null,
                crrotObject: [],
                rangs: [5, 10, 25],
                state: 'simple',
                profile: null,
                list: [],
                total: -1,
                highlightFilter: null,
                searchOBJ: {
                    mainSearch: null,
                    range: 5,
                    type: 'list',
                    offset: 0,
                    isFuzzy: false

                },
                itemsPagination: {
                    totalItems: -1,
                    currentPage: 1,
                    maxSize: 5,
                    perPage: 5,
                    show: false,
                    pageChanged: function pageChanged() {
                        $scope.data.searchOBJ.offset = (parseInt($scope.data.itemsPagination.currentPage) - 1) * $scope.data.searchOBJ.range;
                        $scope.data.searchOBJ.limit = _.clone($scope.data.searchOBJ.range);
                        try {
                            $scope.func[$scope.data.searchType.func]();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                },
                searchType: {},
                nav: {
                    right: {
                        selectedSide: null,
                        isOpened: false,
                        select: function select(selectedSide) {
                            if ($scope.data.nav.right.selectedSide != null && $scope.data.nav.right.selectedSide != selectedSide) {
                                try {
                                    window.document.querySelector(".D div." + $scope.data.nav.right.selectedSide).classList.remove("show");
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                            try {
                                window.document.querySelector(".D div." + selectedSide).classList.add("show");
                            } catch (e) {
                                console.error(e);
                            } finally {
                                $scope.data.nav.right.selectedSide = selectedSide;
                                $scope.data.nav.right.isOpened = $scope.data.nav.right.isOpened || true;
                                if ($scope.func.zone[selectedSide] && _.isFunction($scope.func.zone[selectedSide])) $scope.func.zone[selectedSide]();
                            }
                        }
                    }
                },
                lookupTable: {
                    'document': 'سند',
                    'folder': 'پوشه',
                    'mail': 'ایمیل',
                    'attachment': 'ضمیمه'
                },
                domainValue: {
                    name: 3,
                    content: 5,
                    keyword: 7,
                    note: 7,
                    propertyGroup: 0
                },
                treefrequency: {},
                roleListFrequecy: null,
                treeNav: {
                    index: 1,
                    list: {},
                    changeCurrentNode: function () {
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(node) {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            $scope.func.resetPagination();
                                            $scope.data.treefrequency.currentNode = node;

                                            if (node.id != "a") {
                                                $scope.data.searchType = {
                                                    func: 'getTree'
                                                };
                                                $scope.func.getTree();
                                            }

                                        case 3:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this);
                        }));

                        function changeCurrentNode(_x) {
                            return _ref.apply(this, arguments);
                        }

                        return changeCurrentNode;
                    }()
                },
                showRelations: false,
                relationsPushed: false,
                relationStorage: null,
                relations: null,
                showSelectedResult: false,
                selectedResultPushed: false,
                selectedResultStorage: null,
                selectedResults: null,

                isItemInClipboard: false,
                showClipBoardResults: false,
                selectedClipBoardStorage: null,
                clipBoardResultPushed: false
            };
            $scope.func = {};
            //--------------------------------------------------- clipboards  ------------------------------------------
            $scope.func.hiddenClipboardResultList = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                $scope.data.showClipBoardResults = false;

                                if (!($scope.data.selectedClipBoardStorage == null)) {
                                    _context2.next = 13;
                                    break;
                                }

                                _context2.prev = 2;
                                _context2.next = 5;
                                return removeSelectedLocalStorage('clipBoardResults');

                            case 5:
                                $scope.data.isItemInClipboard = false;
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2["catch"](2);

                                console.error(_context2.t0);

                            case 11:
                                _context2.next = 21;
                                break;

                            case 13:
                                _context2.prev = 13;
                                _context2.next = 16;
                                return setSelectedLocalStorage(_.clone($scope.data.selectedClipBoardStorage), 'clipBoardResults');

                            case 16:
                                _context2.next = 21;
                                break;

                            case 18:
                                _context2.prev = 18;
                                _context2.t1 = _context2["catch"](13);

                                console.error(_context2.t1);

                            case 21:
                                _.defer(function () {
                                    return $scope.$apply();
                                });

                            case 22:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[2, 8], [13, 18]]);
            }));
            $scope.func.pinToClipboardResult = function () {
                try {
                    $scope.data.clipBoardResultPushed = !$scope.data.clipBoardResultPushed;
                    try {
                        $("#clipboardResultViewer").draggable($scope.data.clipBoardResultPushed ? 'disable' : 'enable');
                    } catch (e) {
                        console.error(e);
                    }
                    _.defer(function () {
                        return $scope.$apply();
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.removeClipboardResult = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;

                                if ($scope.data.selectedClipBoardStorage != null && !_.isEqual($scope.data.selectedClipBoardStorage, {})) {
                                    $scope.data.selectedClipBoardStorage = null;
                                    $scope.data.isItemInClipboard = false;
                                    $scope.func.hiddenClipboardResultList();
                                } else toaster.pop('error', '', 'شما رابطه ای برای حذف کردن ندارید.');
                                _context3.next = 9;
                                break;

                            case 4:
                                _context3.prev = 4;
                                _context3.t0 = _context3["catch"](0);

                                console.error(_context3.t0);
                                _context3.next = 9;
                                return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/deleteRelation.js?dev=" + randomVersionName, 'deleteRelationDesktopCtrl');

                            case 9:
                                _context3.prev = 9;

                                $scope.data.isItemInClipboard = !_.isEqual($scope.data.selectedClipBoardStorage, {}) && $scope.data.selectedClipBoardStorage != null;
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                return _context3.finish(9);

                            case 13:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this, [[0, 4, 9, 13]]);
            }));
            $scope.func.removeClipboardResultItem = function () {
                var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
                    var type;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.prev = 0;

                                    if (!($scope.data.selectedClipBoardStorage != null)) {
                                        _context4.next = 31;
                                        break;
                                    }

                                    _context4.prev = 2;

                                    if (!_.has($scope.data.selectedClipBoardStorage, id)) {
                                        _context4.next = 23;
                                        break;
                                    }

                                    $scope.data.selectedClipBoardStorage[id] = undefined;
                                    delete $scope.data.selectedClipBoardStorage[id];

                                    type = angular.copy($scope.data.selectedClipBoardStorage.TYPE);


                                    $scope.data.selectedClipBoardStorage.TYPE = undefined;
                                    delete $scope.data.selectedClipBoardStorage.TYPE;

                                    if (!_.isEqual($scope.data.selectedClipBoardStorage, {})) {
                                        _context4.next = 14;
                                        break;
                                    }

                                    $scope.data.selectedClipBoardStorage = null;
                                    $scope.func.hiddenClipboardResultList();
                                    _context4.next = 23;
                                    break;

                                case 14:
                                    _context4.prev = 14;

                                    $scope.data.selectedClipBoardStorage.TYPE = type;
                                    _context4.next = 18;
                                    return setSelectedLocalStorage(_.clone($scope.data.selectedClipBoardStorage), 'clipBoardResults');

                                case 18:
                                    _context4.next = 23;
                                    break;

                                case 20:
                                    _context4.prev = 20;
                                    _context4.t0 = _context4["catch"](14);

                                    console.error(_context4.t0);

                                case 23:
                                    _context4.next = 28;
                                    break;

                                case 25:
                                    _context4.prev = 25;
                                    _context4.t1 = _context4["catch"](2);

                                    console.error(_context4.t1);

                                case 28:
                                    _context4.prev = 28;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context4.finish(28);

                                case 31:
                                    _context4.next = 36;
                                    break;

                                case 33:
                                    _context4.prev = 33;
                                    _context4.t2 = _context4["catch"](0);

                                    console.error(_context4.t2);

                                case 36:
                                case "end":
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, _this, [[0, 33], [2, 25, 28, 31], [14, 20]]);
                }));

                return function (_x2) {
                    return _ref4.apply(this, arguments);
                };
            }();
			
			//by lava
			$scope.func.compareDocs=function(){
				if($scope.data.selectedClipBoardStorage!=null){
				 
				 console.log('----------lava--');
				 window.open('/compare/?docIds='+ _.join(Object.keys($scope.data.selectedClipBoardStorage),',') + '&token='+ decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')), '_blank');
				}
			};
            $scope.func.removeAllClipboards = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                try {
                                    $scope.data.selectedClipBoardStorage = null;
                                    $scope.func.hiddenClipboardResultList();
                                } catch (e) {
                                    console.error(e);
                                }

                            case 1:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this);
            }));
            $scope.func.addToClipBoardResults = function () {
                var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(item, type) {
                    var selectedResults;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _context6.prev = 0;
                                    _context6.prev = 1;
                                    _context6.next = 4;
                                    return getSelectedLocalStorage('clipBoardResults');

                                case 4:
                                    selectedResults = _context6.sent;

                                    if (selectedResults == null) selectedResults = {};

                                    selectedResults['TYPE'] = type;
                                    if (_.has(selectedResults, item.uuid)) toaster.pop('info', '', 'این آیتم قبلا به لیست انتخابی اضافه شده است.');else {
                                        selectedResults[item.uuid] = _.clone(item);

                                        $scope.data.selectedClipBoardStorage = _.clone(selectedResults);
                                        toaster.pop('success', '', 'آیتم با موفقیت به لیست موقت افزوده شد.');
                                    }
                                    _context6.prev = 8;
                                    _context6.next = 11;
                                    return setSelectedLocalStorage(_.clone(selectedResults), 'clipBoardResults');

                                case 11:
                                    _context6.next = 16;
                                    break;

                                case 13:
                                    _context6.prev = 13;
                                    _context6.t0 = _context6["catch"](8);

                                    console.error(_context6.t0);

                                case 16:

                                    selectedResults = undefined;
                                    $scope.data.isItemInClipboard = !_.isEqual($scope.data.selectedClipBoardStorage, {}) && $scope.data.selectedClipBoardStorage != null;

                                    _context6.next = 23;
                                    break;

                                case 20:
                                    _context6.prev = 20;
                                    _context6.t1 = _context6["catch"](1);

                                    console.error(_context6.t1);

                                case 23:
                                    _context6.prev = 23;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context6.finish(23);

                                case 26:
                                    _context6.next = 31;
                                    break;

                                case 28:
                                    _context6.prev = 28;
                                    _context6.t2 = _context6["catch"](0);

                                    console.error(_context6.t2);

                                case 31:
                                case "end":
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, _this, [[0, 28], [1, 20, 23, 26], [8, 13]]);
                }));

                return function (_x3, _x4) {
                    return _ref6.apply(this, arguments);
                };
            }();
            $scope.func.showClipBoardResultsList = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (!($scope.data.selectedClipBoardStorage == null)) {
                                    _context7.next = 12;
                                    break;
                                }

                                _context7.prev = 1;
                                _context7.next = 4;
                                return getSelectedLocalStorage('clipBoardResults');

                            case 4:
                                $scope.data.selectedClipBoardStorage = _context7.sent;

                                if ($scope.data.selectedClipBoardStorage == null) $scope.data.selectedClipBoardStorage = {};

                                _context7.next = 12;
                                break;

                            case 8:
                                _context7.prev = 8;
                                _context7.t0 = _context7["catch"](1);

                                console.error(_context7.t0);
                                return _context7.abrupt("return");

                            case 12:
                                $scope.data.showClipBoardResults = true;
                                $scope.data.isItemInClipboard = !_.isEqual($scope.data.selectedClipBoardStorage, {}) && $scope.data.selectedClipBoardStorage != null;

                                try {
                                    $("#clipboardResultViewer").draggable({ "axis": "x", "containment": "body" });
                                } catch (e) {
                                    console.error(e);
                                }
                                _.defer(function () {
                                    return $scope.$apply();
                                });

                            case 16:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, _this, [[1, 8]]);
            }));
            //--------------------------------------------------- search navigations  ------------------------------------------
            $scope.func.copySearch = function () {
                var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(sendItem) {
                    var item;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    _context8.prev = 0;
                                    item = angular.copy(sendItem);

                                    if (_.has(item, 'thumbnailSrc')) {
                                        _context8.next = 18;
                                        break;
                                    }

                                    if (!_.has(item, 'type')) {
                                        _context8.next = 18;
                                        break;
                                    }

                                    _context8.t0 = item.type;
                                    _context8.next = _context8.t0 === 'document' ? 7 : _context8.t0 === 'folder' ? 15 : 18;
                                    break;

                                case 7:
                                    _context8.next = 9;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                                case 9:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType';
                                    _context8.next = 12;
                                    return $scope.func.getImageLocal(item);

                                case 12:
                                    item.thumbnailSrc = _context8.sent;

                                    item.name = item.name;
                                    return _context8.abrupt("break", 18);

                                case 15:
                                    item.thumbnailSrc = "../../../../static/image/folder" + (item.hasChildren ? 's' : '') + ".png";
                                    item.name = item.name;
                                    return _context8.abrupt("break", 18);

                                case 18:
                                    $scope.func.addToClipBoardResults(item, 'COPY');

                                    _context8.next = 24;
                                    break;

                                case 21:
                                    _context8.prev = 21;
                                    _context8.t1 = _context8["catch"](0);

                                    console.error(_context8.t1);

                                case 24:
                                case "end":
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, _this, [[0, 21]]);
                }));

                return function (_x5) {
                    return _ref8.apply(this, arguments);
                };
            }();
            $scope.func.cutSearch = function () {
                var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(sendItem) {
                    var item;
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                    _context9.prev = 0;
                                    item = angular.copy(sendItem);

                                    if (_.has(item, 'thumbnailSrc')) {
                                        _context9.next = 18;
                                        break;
                                    }

                                    if (!_.has(item, 'type')) {
                                        _context9.next = 18;
                                        break;
                                    }

                                    _context9.t0 = item.type;
                                    _context9.next = _context9.t0 === 'document' ? 7 : _context9.t0 === 'folder' ? 15 : 18;
                                    break;

                                case 7:
                                    _context9.next = 9;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                                case 9:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType';
                                    _context9.next = 12;
                                    return $scope.func.getImageLocal(item);

                                case 12:
                                    item.thumbnailSrc = _context9.sent;

                                    item.name = item.name;
                                    return _context9.abrupt("break", 18);

                                case 15:
                                    item.thumbnailSrc = "../../../../static/image/folder" + (item.hasChildren ? 's' : '') + ".png";
                                    item.name = item.name;
                                    return _context9.abrupt("break", 18);

                                case 18:
                                    $scope.func.addToClipBoardResults(item, 'CUT');

                                    _context9.next = 24;
                                    break;

                                case 21:
                                    _context9.prev = 21;
                                    _context9.t1 = _context9["catch"](0);

                                    console.error(_context9.t1);

                                case 24:
                                case "end":
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, _this, [[0, 21]]);
                }));

                return function (_x6) {
                    return _ref9.apply(this, arguments);
                };
            }();
            $scope.func.removeSearch = function () {
                var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(item) {
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;

                                    $scope.func.simpleRemoveSearch(item);
                                    _context10.next = 22;
                                    break;

                                case 4:
                                    _context10.prev = 4;
                                    _context10.t0 = _context10["catch"](0);

                                    console.error(_context10.t0);
                                    _context10.prev = 7;
                                    _context10.next = 10;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/insideController/functions/simpleRemoveSearch.js?dev=" + randomVersionName);

                                case 10:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/insideController/functions/simpleRemoveSearch.js?dev=" + randomVersionName] = "simpleRemoveSearchSimpleCtrl";
                                    _context10.next = 13;
                                    return simpleRemoveSearchSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate);

                                case 13:
                                    $scope.func.simpleRemoveSearch(item);
                                    _context10.next = 19;
                                    break;

                                case 16:
                                    _context10.prev = 16;
                                    _context10.t1 = _context10["catch"](7);

                                    console.error(_context10.t1);

                                case 19:
                                    _context10.prev = 19;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context10.finish(19);

                                case 22:
                                case "end":
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, _this, [[0, 4], [7, 16, 19, 22]]);
                }));

                return function (_x7) {
                    return _ref10.apply(this, arguments);
                };
            }();
            $scope.func.downloadSearch = function () {
                var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(item) {
                    var isDownload;
                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    _context11.prev = 0;
                                    _context11.next = 3;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                    isDownload = getPermisionArray(item.permissions);

                                    if (!(item.type == "folder")) {
                                        _context11.next = 19;
                                        break;
                                    }

                                    if (!isDownload[2]) {
                                        _context11.next = 16;
                                        break;
                                    }

                                    _context11.next = 9;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/convertTozipFolderFunction.js?dev=" + randomVersionName);

                                case 9:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/convertTozipFolderFunction.js?dev=" + randomVersionName] = 'convertTozipFolderFunction';
                                    $("#show-waiting-get-rest-from-server-id").addClass('show-waiting');
                                    _context11.next = 13;
                                    return convertTozipFolderFunction(item);

                                case 13:
                                    $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                    _context11.next = 17;
                                    break;

                                case 16:
                                    toaster.pop('warning', '', " امکان دریافت پوشه " + item.name + " وجود ندارد. ");

                                case 17:
                                    _context11.next = 27;
                                    break;

                                case 19:
                                    if (!isDownload[2]) {
                                        _context11.next = 26;
                                        break;
                                    }

                                    _context11.next = 22;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/downloadFileFunction.js?dev=" + randomVersionName);

                                case 22:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/downloadFileFunction.js?dev=" + randomVersionName] = 'downloadFileFunction';
                                    downloadFileFunction(item);
                                    _context11.next = 27;
                                    break;

                                case 26:
                                    toaster.pop('warning', '', " امکان دریافت سند" + item.name + " وجود ندارد. ");

                                case 27:
                                    _context11.next = 34;
                                    break;

                                case 29:
                                    _context11.prev = 29;
                                    _context11.t0 = _context11["catch"](0);

                                    console.error(_context11.t0);
                                    $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                    toaster.pop('warning', '', "مشکلی در دریافت به وجود آمده است.");

                                case 34:
                                case "end":
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, _this, [[0, 29]]);
                }));

                return function (_x8) {
                    return _ref11.apply(this, arguments);
                };
            }();
            $scope.func.addCategoriesSearch = function () {
                var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(item) {
                    var isCategories, response;
                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    _context12.prev = 0;
                                    _context12.next = 3;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                    isCategories = getPermisionArray(item.permissions);

                                    if (!isCategories[2]) {
                                        _context12.next = 21;
                                        break;
                                    }

                                    _context12.next = 8;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/addCategories2DesktopCtrl.js?dev=" + randomVersionName);

                                case 8:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Desktop/addCategories2DesktopCtrl.js?dev=" + randomVersionName] = 'addCategories2DesktopCtrl';
                                    _context12.next = 11;
                                    return addCategories2DesktopCtrl($uibModal, //modal func
                                    simpleService.repository, //repository service
                                    'getCategoriesFolder', // rootPath
                                    simpleService.folder // folder service
                                    );

                                case 11:
                                    response = _context12.sent;
                                    _context12.prev = 12;
                                    _context12.next = 15;
                                    return simpleService.property.addCategory(item.uuid, response.addNode.id);

                                case 15:
                                    toaster.pop('success', '', 'دسته بندی با موفقیت افزوده شد.');
                                    _context12.next = 21;
                                    break;

                                case 18:
                                    _context12.prev = 18;
                                    _context12.t0 = _context12["catch"](12);

                                    toaster.pop('warning', '', " امکان افزودن به دسته بندی " + item.name + " وجود ندارد ");

                                case 21:
                                    toaster.pop('warning', '', "شما مجوز لازم جهت این کار را ندارید.");
                                    _context12.next = 28;
                                    break;

                                case 24:
                                    _context12.prev = 24;
                                    _context12.t1 = _context12["catch"](0);

                                    console.error(_context12.t1);
                                    toaster.pop('warning', '', " امکان افزودن به دسته بندی " + item.name + " وجود ندارد ");

                                case 28:
                                case "end":
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, _this, [[0, 24], [12, 18]]);
                }));

                return function (_x9) {
                    return _ref12.apply(this, arguments);
                };
            }();
            $scope.func.addWorkFlowSearch = function () {
                var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(item) {
                    var isRelation;
                    return regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while (1) {
                            switch (_context13.prev = _context13.next) {
                                case 0:
                                    _context13.prev = 0;
                                    _context13.next = 3;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';
                                    isRelation = getPermisionArray(item.permissions);

                                    if (!isRelation[2]) {
                                        _context13.next = 15;
                                        break;
                                    }

                                    _context13.next = 8;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/addWorkFlowCtrl.js?dev=" + randomVersionName);

                                case 8:
                                    _context13.next = 10;
                                    return addWorkFlowCtrl($uibModal, item, simpleService);

                                case 10:
                                    _context13.next = 12;
                                    return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/addWorkFlowCtrl.js?dev=" + randomVersionName, 'addWorkFlowCtrl');

                                case 12:
                                    toaster.pop('success', '', "گردش کار با موفقیت افزوده شد");
                                    _context13.next = 16;
                                    break;

                                case 15:
                                    toaster.pop('warning', '', " امکان افزودن گردش کار برای آیتم " + item.name + " نیست ");

                                case 16:
                                    _context13.next = 22;
                                    break;

                                case 18:
                                    _context13.prev = 18;
                                    _context13.t0 = _context13["catch"](0);

                                    console.error(_context13.t0);
                                    toaster.pop('warning', "", " مشکلی در افزودن گردش کار برای آیتم " + item.name + " به وجود آمده است. ");

                                case 22:
                                case "end":
                                    return _context13.stop();
                            }
                        }
                    }, _callee13, _this, [[0, 18]]);
                }));

                return function (_x10) {
                    return _ref13.apply(this, arguments);
                };
            }();
            $scope.func.addTemplatesSearch = function () {
                var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(item) {
                    return regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                            switch (_context14.prev = _context14.next) {
                                case 0:
                                    _context14.prev = 0;

                                    $scope.func.simpleaddTemplatesSearch(item);
                                    _context14.next = 22;
                                    break;

                                case 4:
                                    _context14.prev = 4;
                                    _context14.t0 = _context14["catch"](0);

                                    console.error(_context14.t0);
                                    _context14.prev = 7;
                                    _context14.next = 10;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/insideController/functions/simpleaddTemplatesSearch.js?dev=" + randomVersionName);

                                case 10:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/insideController/functions/simpleaddTemplatesSearch.js?dev=" + randomVersionName] = "simpleaddTemplatesSearchSimpleCtrl";
                                    _context14.next = 13;
                                    return simpleaddTemplatesSearchSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate);

                                case 13:
                                    $scope.func.simpleaddTemplatesSearch(item);
                                    _context14.next = 19;
                                    break;

                                case 16:
                                    _context14.prev = 16;
                                    _context14.t1 = _context14["catch"](7);

                                    console.error(_context14.t1);

                                case 19:
                                    _context14.prev = 19;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context14.finish(19);

                                case 22:
                                case "end":
                                    return _context14.stop();
                            }
                        }
                    }, _callee14, _this, [[0, 4], [7, 16, 19, 22]]);
                }));

                return function (_x11) {
                    return _ref14.apply(this, arguments);
                };
            }();
            $scope.func.saveClipbBoardtems = function () {
                var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee15(item) {
                    return regeneratorRuntime.wrap(function _callee15$(_context15) {
                        while (1) {
                            switch (_context15.prev = _context15.next) {
                                case 0:
                                    _context15.prev = 0;

                                    $scope.func.simpleSaveClipbBoardtems(item);
                                    _context15.next = 22;
                                    break;

                                case 4:
                                    _context15.prev = 4;
                                    _context15.t0 = _context15["catch"](0);

                                    console.error(_context15.t0);
                                    _context15.prev = 7;
                                    _context15.next = 10;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/insideController/functions/simpleSaveClipbBoardtems.js?dev=" + randomVersionName);

                                case 10:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/insideController/functions/simpleSaveClipbBoardtems.js?dev=" + randomVersionName] = "simpleSaveClipbBoardtemsSimpleCtrl";
                                    _context15.next = 13;
                                    return simpleSaveClipbBoardtemsSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate);

                                case 13:
                                    $scope.func.simpleSaveClipbBoardtems(item);
                                    _context15.next = 19;
                                    break;

                                case 16:
                                    _context15.prev = 16;
                                    _context15.t1 = _context15["catch"](7);

                                    console.error(_context15.t1);

                                case 19:
                                    _context15.prev = 19;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context15.finish(19);

                                case 22:
                                case "end":
                                    return _context15.stop();
                            }
                        }
                    }, _callee15, _this, [[0, 4], [7, 16, 19, 22]]);
                }));

                return function (_x12) {
                    return _ref15.apply(this, arguments);
                };
            }();
            $scope.func.erase = function () {
                $scope.data.isSearched = false;
                $scope.func.resetPagination();
                //remove tree
                try {
                    $scope.data.treefrequency = {};
                    $scope.data.roleListFrequecy = null;
                } catch (e) {
                    console.error(e);
                }
                // remove circle Carrot
                try {
                    $scope.data.circle.set('dataObject', null);
                    $scope.data.circle.redraw();
                } catch (e) {
                    console.error(e);
                }
                // remove foamtree Carrot
                try {
                    $scope.data.foamtree.set('dataObject', null);
                    $scope.data.foamtree.redraw();
                } catch (e) {
                    console.error(e);
                }

                try {
                    $scope.data.crrotObject = null;
                } catch (e) {
                    console.error(e);
                }
                //clear search object
                $scope.data.searchOBJ = {
                    mainSearch: null,
                    range: 5,
                    type: 'list',
                    offset: 0,
                    isFuzzy: false
                };
                try {
                    $(".simple  .CR   .body-search .show-body ~ .result-view  .list-view").getNiceScroll().remove();
                } catch (e) {
                    console.error(e);
                }
                $scope.data.itemsPagination.totalItems = -1;
                $scope.data.itemsPagination.currentPage = 1;
                $scope.data.itemsPagination.maxSize = 5;
                $scope.data.itemsPagination.perPage = 5;
                $scope.data.itemsPagination.show = false;
                $scope.data.list = [];
                $scope.data.total = -1;
                $scope.data.searchType = {};

                $scope.data.nav.right.selectedSide = null;
                $scope.data.nav.right.isOpened = false;

                _.defer(function () {
                    return $scope.$apply();
                });
            };
            $scope.func.resetPagination = function () {
                $scope.data.searchOBJ.offset = 0;
                $scope.data.itemsPagination.currentPage = 1;
            };
            /** TODO ------------------------- Close or Open -------------------------------------------------- **/
            $scope.func.closeOrOpenRight = function () {
                $scope.data.nav.right.isOpened = !$scope.data.nav.right.isOpened;
                if (!$scope.data.nav.right.isOpened && $scope.data.nav.right.selectedSide != null) {
                    window.document.querySelector(".D div." + $scope.data.nav.right.selectedSide).classList.remove("show");
                } else {
                    window.document.querySelector(".D div." + $scope.data.nav.right.selectedSide).classList.add("show");
                }
            };
            //-------------------------------------------------  Simple item    -----------------------------------------
            $scope.func.simpleSearchRequest = function (removeRightsZones) {
                try {
                    window.document.querySelector(".simple  .CR   .body-search .just-header").classList.remove("show-body");
                } catch (e) {
                    console.error(e);
                }
                if (removeRightsZones) {
                    //remove tree
                    try {
                        $scope.data.treefrequency = {};
                        $scope.data.roleListFrequecy = null;
                    } catch (e) {
                        console.error(e);
                    }
                    // remove circle Carrot
                    try {
                        $scope.data.circle.set('dataObject', null);
                        $scope.data.circle.redraw();
                        $scope.data.circle.update();
                    } catch (e) {
                        console.error(e);
                    }
                    // remove foamtree Carrot
                    try {
                        $scope.data.foamtree.set('dataObject', null);
                        $scope.data.foamtree.redraw();
                        $scope.data.foamtree.update();
                    } catch (e) {
                        console.error(e);
                    }
                    try {
                        $scope.data.crrotObject = null;
                    } catch (e) {
                        console.error(e);
                    }
                    _.defer(function () {
                        return $scope.$apply();
                    });
                }
                $scope.data.list = [];
                var mainConntent = _.clone($scope.data.searchOBJ.mainSearch);
                $scope.data.highlightFilter = mainConntent.replace(/[\+\-\*]/g, '');
                $scope.data.isSearched = false;
                simpleService.search.simple({
                    statement: $scope.data.searchOBJ.mainSearch,
                    offset: $scope.data.searchOBJ.offset,
                    limit: $scope.data.searchOBJ.range,
                    isFuzzy: $scope.data.searchOBJ.isFuzzy
                }).then(function (res) {
                    if (res.data.list != null && res.data.total > 0) _.defer(function () {
                        return $scope.func.generateResult(res.data);
                    }, 500);else {
                        $scope.data.isSearched = true;
                        toaster.pop('info', '', 'موردی جهت نمایش وجود ندارد');
                    }
                    _.defer(function () {
                        return $scope.$apply();
                    });
                }, function (error) {
                    $scope.data.isSearched = true;
                    toaster.pop('error', '', 'مشکل در دریافت اطلاعات از سرور.');
                });
            };
            $scope.func.searchSimple = function (form) {
                if (_.has(form.mainSearch, '$setTouched')) form.mainSearch.$setTouched();
                if (form.$valid == true) {
                    $scope.func.resetPagination();
                    $scope.data.searchType = {
                        func: 'simpleSearchRequest'
                    };
                    $scope.func.simpleSearchRequest(true);
                }
            };
            $scope.func.getTree = function () {
                try {
                    var query = "domain=3&limit=" + $scope.data.searchOBJ.range + "&offset=" + $scope.data.searchOBJ.offset;
                    if (_.includes(['name', 'content', 'keyword', 'notes'], $scope.data.treefrequency.currentNode.name)) {
                        query += "&" + $scope.data.treefrequency.currentNode.name + "=" + $scope.data.searchOBJ.mainSearch;
                    } else {
                        $scope.data.searchType.table = true;
                        query += "&propertyGroup=" + $scope.data.treefrequency.currentNode.name + "=" + $scope.data.searchOBJ.mainSearch;
                    }
                    simpleService.search.findPaginatedWithCreatedQuery(query).then(function (res) {
                        try {
                            if ($scope.data.searchType.table) $scope.func.generateTable(res.data);else {
                                $scope.func.generateResult(res.data);
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    }, function (error) {
                        return toaster.pop('error', '', 'مشکل در دریافت اطلاعات از سرور.');
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.generateTable = function () {
                var _ref16 = _asyncToGenerator(regeneratorRuntime.mark(function _callee16(res) {
                    return regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                            switch (_context16.prev = _context16.next) {
                                case 0:
                                    _context16.prev = 0;

                                    $scope.func.simpleGenerateTable(res);
                                    _context16.next = 22;
                                    break;

                                case 4:
                                    _context16.prev = 4;
                                    _context16.t0 = _context16["catch"](0);

                                    console.error(_context16.t0);
                                    _context16.prev = 7;
                                    _context16.next = 10;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/insideController/functions/simpleGenerateTable.js?dev=" + randomVersionName);

                                case 10:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/insideController/functions/simpleGenerateTable.js?dev=" + randomVersionName] = "simpleGenerateTableSimpleCtrl";
                                    _context16.next = 13;
                                    return simpleGenerateTableSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate);

                                case 13:
                                    $scope.func.simpleGenerateTable(res);
                                    _context16.next = 19;
                                    break;

                                case 16:
                                    _context16.prev = 16;
                                    _context16.t1 = _context16["catch"](7);

                                    console.error(_context16.t1);

                                case 19:
                                    _context16.prev = 19;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context16.finish(19);

                                case 22:
                                case "end":
                                    return _context16.stop();
                            }
                        }
                    }, _callee16, _this, [[0, 4], [7, 16, 19, 22]]);
                }));

                return function (_x13) {
                    return _ref16.apply(this, arguments);
                };
            }();
            $scope.func.orderBy = function (headerKey) {
                try {
                    $scope.data.sort.type = headerKey;
                    $scope.data.sort.ascDesc = !$scope.data.sort.ascDesc;
                    var ascOrDesc = $scope.data.sort.ascDesc ? 'asc' : 'desc';
                    $scope.data.list = _.orderBy($scope.data.list, function (i) {
                        return i.list[headerKey].value;
                    }, ascOrDesc);
                } catch (e) {
                    console.error(e);
                } finally {
                    _.defer(function () {
                        return $scope.$apply();
                    });
                }
            };

            /**TODO ------------------------- CSV ----------------------------------------------------------- **/
            $scope.func.showCSV = _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
                var query, link;
                return regeneratorRuntime.wrap(function _callee17$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                _context17.prev = 0;

                                if (!(isCookieFunction('Authorization') != null)) {
                                    _context17.next = 17;
                                    break;
                                }

                                query = "domain=3&limit=" + $scope.data.searchOBJ.range + "&offset=" + $scope.data.searchOBJ.offset;

                                if (_.includes(['name', 'content', 'keyword', 'notes'], $scope.data.treefrequency.currentNode.name)) {
                                    query += "&" + $scope.data.treefrequency.currentNode.name + "=" + $scope.data.searchOBJ.mainSearch;
                                } else {
                                    query += "&propertyGroup=" + $scope.data.treefrequency.currentNode.name + "=" + $scope.data.searchOBJ.mainSearch;
                                }

                                query += "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', ''));
                                if (query.endsWith("&")) query = query.slice(0, query.length - 1);

                                console.log(query);

                                link = document.createElement("a");

                                link.download = 'result.csv';
                                link.href = "/KeydocPro/services/rest/search/findAndGetCsv?" + query;
                                link.style = "visibility:hidden";
                                link.name = 'key_downloadLink_result.csv';
                                window.document.body.appendChild(link);
                                link.click();
                                window.document.body.removeChild(link);
                                _context17.next = 18;
                                break;

                            case 17:
                                throw "لطفا ابتدا وارد سیستم شوید.";

                            case 18:
                                _context17.next = 23;
                                break;

                            case 20:
                                _context17.prev = 20;
                                _context17.t0 = _context17["catch"](0);

                                toaster.pop('error', '', 'لطفا حداقل یک فیلتر درج کنید.');

                            case 23:
                            case "end":
                                return _context17.stop();
                        }
                    }
                }, _callee17, _this, [[0, 20]]);
            }));

            //-------------------------------------------------  Create Circle    -----------------------------------------
            $scope.func.createCircle = _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
                return regeneratorRuntime.wrap(function _callee18$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                _context18.prev = 0;

                                $scope.func.simpleCreateCircle();
                                _context18.next = 22;
                                break;

                            case 4:
                                _context18.prev = 4;
                                _context18.t0 = _context18["catch"](0);

                                console.error(_context18.t0);
                                _context18.prev = 7;
                                _context18.next = 10;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Search/insideController/functions/simpleCreateCircle.js?dev=" + randomVersionName);

                            case 10:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/insideController/functions/simpleCreateCircle.js?dev=" + randomVersionName] = "simpleCreateCircleSimpleCtrl";
                                _context18.next = 13;
                                return simpleCreateCircleSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate);

                            case 13:
                                $scope.func.simpleCreateCircle();
                                _context18.next = 19;
                                break;

                            case 16:
                                _context18.prev = 16;
                                _context18.t1 = _context18["catch"](7);

                                console.error(_context18.t1);

                            case 19:
                                _context18.prev = 19;

                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                return _context18.finish(19);

                            case 22:
                            case "end":
                                return _context18.stop();
                        }
                    }
                }, _callee18, _this, [[0, 4], [7, 16, 19, 22]]);
            }));
            //-------------------------------------------------- Create Foam Tree -----------------------------------------
            $scope.func.createFoamtree = _asyncToGenerator(regeneratorRuntime.mark(function _callee19() {
                return regeneratorRuntime.wrap(function _callee19$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                _context19.prev = 0;

                                $scope.func.simpleCreateFoamtree();
                                _context19.next = 22;
                                break;

                            case 4:
                                _context19.prev = 4;
                                _context19.t0 = _context19["catch"](0);

                                console.error(_context19.t0);
                                _context19.prev = 7;
                                _context19.next = 10;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Search/insideController/functions/simpleCreateFoamtree.js?dev=" + randomVersionName);

                            case 10:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/insideController/functions/simpleCreateFoamtree.js?dev=" + randomVersionName] = "simpleCreateFoamtreeSimpleCtrl";
                                _context19.next = 13;
                                return simpleCreateFoamtreeSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate);

                            case 13:
                                $scope.func.simpleCreateFoamtree();
                                _context19.next = 19;
                                break;

                            case 16:
                                _context19.prev = 16;
                                _context19.t1 = _context19["catch"](7);

                                console.error(_context19.t1);

                            case 19:
                                _context19.prev = 19;

                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                return _context19.finish(19);

                            case 22:
                            case "end":
                                return _context19.stop();
                        }
                    }
                }, _callee19, _this, [[0, 4], [7, 16, 19, 22]]);
            }));
            $scope.func.getCarrot = function () {
                try {
                    simpleService.search.findPaginatedWithCreatedQuery("domain=3&limit=" + $scope.data.searchOBJ.range + "&" + $scope.data.searchType.key + "=" + $scope.data.searchOBJ.mainSearch + "&offset=" + $scope.data.searchOBJ.offset).then(function (res) {
                        try {
                            $scope.func.generateResult(res.data);
                        } catch (e) {
                            console.error(e);
                        }
                    }, function (error) {
                        return toaster.pop('error', '', 'مشکل در دریافت اطلاعات از سرور.');
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.carrot = {
                proxy_groupClicked: function () {
                    var _ref20 = _asyncToGenerator(regeneratorRuntime.mark(function _callee20(groupItem) {
                        var queryType;
                        return regeneratorRuntime.wrap(function _callee20$(_context20) {
                            while (1) {
                                switch (_context20.prev = _context20.next) {
                                    case 0:
                                        if (groupItem.groups && _.isArray(groupItem.groups) && groupItem.groups.length > 0 && groupItem.groups[0].key) {
                                            $scope.data.searchItem = {
                                                func: 'getCarrot',
                                                key: groupItem.groups[0].key
                                            };
                                            $scope.data.searchOBJ.offset = 0;
                                            $scope.data.itemsPagination.currentPage = 1;
                                            queryType = groupItem.groups[0].key + "=" + $scope.data.searchOBJ.mainSearch;

                                            $scope.data.searchType.table = false;
                                            if (_.has(groupItem.groups[0], 'type') && groupItem.groups[0].type == 'propertyGroup') {
                                                $scope.data.searchType.table = true;
                                                queryType = "propertyGroup=" + queryType;
                                            }
                                            simpleService.search.findPaginatedWithCreatedQuery("domain=3&limit=" + $scope.data.searchOBJ.range + "&" + queryType + "&offset=" + $scope.data.searchOBJ.offset).then(function (res) {
                                                try {
                                                    if ($scope.data.searchType.table) $scope.func.generateTable(res.data);else $scope.func.generateResult(res.data);
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                            }, function (error) {
                                                return toaster.pop('error', '', 'مشکل در دریافت اطلاعات از سرور.');
                                            });
                                        }

                                    case 1:
                                    case "end":
                                        return _context20.stop();
                                }
                            }
                        }, _callee20, _this);
                    }));

                    function proxy_groupClicked(_x14) {
                        return _ref20.apply(this, arguments);
                    }

                    return proxy_groupClicked;
                }(),
                proxy_documentClicked: function proxy_documentClicked() {},
                proxy_onModelChanged: function proxy_onModelChanged() {}
            };
            $scope.func.zone = {
                searchVisible: function searchVisible() {},
                foamTreeVisible: function foamTreeVisible() {
                    return $scope.func.createFoamtree();
                },
                circlesVisible: function circlesVisible() {
                    return $scope.func.createCircle();
                }
            };
            $scope.func.viewFile = function () {
                var _ref21 = _asyncToGenerator(regeneratorRuntime.mark(function _callee21(doc) {
                    return regeneratorRuntime.wrap(function _callee21$(_context21) {
                        while (1) {
                            switch (_context21.prev = _context21.next) {
                                case 0:
                                    _context21.prev = 0;

                                    $scope.func.simpleviewFile(doc);
                                    _context21.next = 22;
                                    break;

                                case 4:
                                    _context21.prev = 4;
                                    _context21.t0 = _context21["catch"](0);

                                    console.error(_context21.t0);
                                    _context21.prev = 7;
                                    _context21.next = 10;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/insideController/functions/simpleviewFile.js?dev=" + randomVersionName);

                                case 10:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/insideController/functions/simpleviewFile.js?dev=" + randomVersionName] = "simpleviewFileSimpleCtrl";
                                    _context21.next = 13;
                                    return simpleviewFileSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate);

                                case 13:
                                    $scope.func.simpleviewFile(doc);
                                    _context21.next = 19;
                                    break;

                                case 16:
                                    _context21.prev = 16;
                                    _context21.t1 = _context21["catch"](7);

                                    console.error(_context21.t1);

                                case 19:
                                    _context21.prev = 19;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context21.finish(19);

                                case 22:
                                case "end":
                                    return _context21.stop();
                            }
                        }
                    }, _callee21, _this, [[0, 4], [7, 16, 19, 22]]);
                }));

                return function (_x15) {
                    return _ref21.apply(this, arguments);
                };
            }();
            $scope.func.gotoDesktop = function () {
                var _ref22 = _asyncToGenerator(regeneratorRuntime.mark(function _callee22(item, isMetaData) {
                    return regeneratorRuntime.wrap(function _callee22$(_context22) {
                        while (1) {
                            switch (_context22.prev = _context22.next) {
                                case 0:
                                    _context22.prev = 0;

                                    if ($scope.data.profile.prfStack.taxonomyVisible) {
                                        _context22.next = 3;
                                        break;
                                    }

                                    throw new Error("امکان ورود به این صفحه وجود ندارد .");

                                case 3:
                                    if (!(typeof isMetaData !== "undefined")) {
                                        _context22.next = 7;
                                        break;
                                    }

                                    window.location.hash = "#/page/desktop/" + item.value.uuid + "_type=" + item.value.type;
                                    //$state.go('main.page.desktop', {uid:item.value.uuid,type:item.value.type}, {reload: false});
                                    _context22.next = 12;
                                    break;

                                case 7:
                                    _context22.next = 9;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/saveChangeStateVar.js?dev=" + randomVersionName);

                                case 9:
                                    _context22.next = 11;
                                    return setStateVarFunction(item);

                                case 11:
									localStorage.setItem("mainSearch", $('#mainSearch').val());
                                    $state.go('main.page.desktop', {}, { reload: false });

                                case 12:
                                    _context22.next = 18;
                                    break;

                                case 14:
                                    _context22.prev = 14;
                                    _context22.t0 = _context22["catch"](0);

                                    toaster.pop("error", "", _context22.t0.message);
                                    console.error(_context22.t0);

                                case 18:
                                case "end":
                                    return _context22.stop();
                            }
                        }
                    }, _callee22, _this, [[0, 14]]);
                }));

                return function (_x16, _x17) {
                    return _ref22.apply(this, arguments);
                };
            }();
            $scope.func.getImage = function () {
                var _ref23 = _asyncToGenerator(regeneratorRuntime.mark(function _callee23(item) {
                    return regeneratorRuntime.wrap(function _callee23$(_context23) {
                        while (1) {
                            switch (_context23.prev = _context23.next) {
                                case 0:
                                    _context23.next = 2;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName);

                                case 2:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=" + randomVersionName] = 'getSrcFromType';
                                    try {
                                        simpleService.document.thumbnail(item, 0, 75).then(function (result) {
                                            item.thumbnailSrc = "data:image/png;base64," + result.data;
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        }, function (error) {
                                            item.thumbnailSrc = getSrcFromType(item.mimeType);
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        });
                                    } catch (e) {
                                        console.error(e);
                                    }

                                case 4:
                                case "end":
                                    return _context23.stop();
                            }
                        }
                    }, _callee23, _this);
                }));

                return function (_x18) {
                    return _ref23.apply(this, arguments);
                };
            }();
            $scope.func.generateResult = function () {
                var _ref24 = _asyncToGenerator(regeneratorRuntime.mark(function _callee24(data) {
                    return regeneratorRuntime.wrap(function _callee24$(_context24) {
                        while (1) {
                            switch (_context24.prev = _context24.next) {
                                case 0:
                                    _context24.prev = 0;

                                    $scope.func.simpleGenerateResult(data);
                                    _context24.next = 22;
                                    break;

                                case 4:
                                    _context24.prev = 4;
                                    _context24.t0 = _context24["catch"](0);

                                    console.error(_context24.t0);
                                    _context24.prev = 7;
                                    _context24.next = 10;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/insideController/functions/simpleGenerateResult.js?dev=" + randomVersionName);

                                case 10:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/insideController/functions/simpleGenerateResult.js?dev=" + randomVersionName] = "simpleGenerateResultSimpleCtrl";
                                    _context24.next = 13;
                                    return simpleGenerateResultSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate);

                                case 13:
                                    $scope.func.simpleGenerateResult(data);
                                    _context24.next = 19;
                                    break;

                                case 16:
                                    _context24.prev = 16;
                                    _context24.t1 = _context24["catch"](7);

                                    console.error(_context24.t1);

                                case 19:
                                    _context24.prev = 19;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context24.finish(19);

                                case 22:
                                case "end":
                                    return _context24.stop();
                            }
                        }
                    }, _callee24, _this, [[0, 4], [7, 16, 19, 22]]);
                }));

                return function (_x19) {
                    return _ref24.apply(this, arguments);
                };
            }();
            //--------------------------------------------------- Relation ------------------------------------------------
            $scope.func.getImageLocal = function (item) {
                return new Promise(function (resolve, reject) {
                    try {
                        simpleService.document.thumbnail(item, 0, 75).then(function (result) {
                            return resolve("data:image/png;base64," + result.data);
                        }, function (error) {
                            return resolve(getSrcFromType(item.mimeType));
                        });
                    } catch (e) {
                        console.error(e);
                    }
                });
            };
            $scope.func.addToRelations = function () {
                var _ref25 = _asyncToGenerator(regeneratorRuntime.mark(function _callee25(sendItem) {
                    return regeneratorRuntime.wrap(function _callee25$(_context25) {
                        while (1) {
                            switch (_context25.prev = _context25.next) {
                                case 0:
                                    _context25.prev = 0;

                                    $scope.func.simpleAddToRelations(sendItem);
                                    _context25.next = 22;
                                    break;

                                case 4:
                                    _context25.prev = 4;
                                    _context25.t0 = _context25["catch"](0);

                                    console.error(_context25.t0);
                                    _context25.prev = 7;
                                    _context25.next = 10;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/insideController/functions/simpleAddToRelations.js?dev=" + randomVersionName);

                                case 10:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/insideController/functions/simpleAddToRelations.js?dev=" + randomVersionName] = "simpleAddToRelationsSimpleCtrl";
                                    _context25.next = 13;
                                    return simpleAddToRelationsSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate);

                                case 13:
                                    $scope.func.simpleAddToRelations(sendItem);
                                    _context25.next = 19;
                                    break;

                                case 16:
                                    _context25.prev = 16;
                                    _context25.t1 = _context25["catch"](7);

                                    console.error(_context25.t1);

                                case 19:
                                    _context25.prev = 19;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context25.finish(19);

                                case 22:
                                case "end":
                                    return _context25.stop();
                            }
                        }
                    }, _callee25, _this, [[0, 4], [7, 16, 19, 22]]);
                }));

                return function (_x20) {
                    return _ref25.apply(this, arguments);
                };
            }();
            $scope.func.removeRelationItem = function () {
                var _ref26 = _asyncToGenerator(regeneratorRuntime.mark(function _callee26(id) {
                    return regeneratorRuntime.wrap(function _callee26$(_context26) {
                        while (1) {
                            switch (_context26.prev = _context26.next) {
                                case 0:
                                    _context26.prev = 0;

                                    if (!($scope.data.relationStorage != null)) {
                                        _context26.next = 24;
                                        break;
                                    }

                                    _context26.prev = 2;

                                    if (!_.has($scope.data.relationStorage.footers, id)) {
                                        _context26.next = 19;
                                        break;
                                    }

                                    $scope.data.relationStorage.footers[id] = undefined;
                                    delete $scope.data.relationStorage.footers[id];

                                    if (!(_.isEqual($scope.data.relationStorage.footers, {}) && $scope.data.relationStorage.header == null)) {
                                        _context26.next = 11;
                                        break;
                                    }

                                    $scope.data.relationStorage = null;
                                    $scope.func.hiddenRelationsList();
                                    _context26.next = 19;
                                    break;

                                case 11:
                                    _context26.prev = 11;
                                    _context26.next = 14;
                                    return setSelectedLocalStorage(_.clone($scope.data.relationStorage), 'relations');

                                case 14:
                                    _context26.next = 19;
                                    break;

                                case 16:
                                    _context26.prev = 16;
                                    _context26.t0 = _context26["catch"](11);

                                    console.error(_context26.t0);

                                case 19:
                                    _context26.next = 24;
                                    break;

                                case 21:
                                    _context26.prev = 21;
                                    _context26.t1 = _context26["catch"](2);

                                    console.error(_context26.t1);

                                case 24:
                                    _context26.next = 29;
                                    break;

                                case 26:
                                    _context26.prev = 26;
                                    _context26.t2 = _context26["catch"](0);

                                    console.error(_context26.t2);

                                case 29:
                                case "end":
                                    return _context26.stop();
                            }
                        }
                    }, _callee26, _this, [[0, 26], [2, 21], [11, 16]]);
                }));

                return function (_x21) {
                    return _ref26.apply(this, arguments);
                };
            }();
            $scope.func.removeHeaderRelationItem = _asyncToGenerator(regeneratorRuntime.mark(function _callee27() {
                return regeneratorRuntime.wrap(function _callee27$(_context27) {
                    while (1) {
                        switch (_context27.prev = _context27.next) {
                            case 0:
                                if (!($scope.data.relationStorage != null)) {
                                    _context27.next = 15;
                                    break;
                                }

                                $scope.data.relationStorage.header = null;

                                if (!_.isEqual($scope.data.relationStorage.footers, {})) {
                                    _context27.next = 7;
                                    break;
                                }

                                $scope.data.relationStorage = null;
                                $scope.func.hiddenRelationsList();
                                _context27.next = 15;
                                break;

                            case 7:
                                _context27.prev = 7;
                                _context27.next = 10;
                                return setSelectedLocalStorage(_.clone($scope.data.relationStorage), 'relations');

                            case 10:
                                _context27.next = 15;
                                break;

                            case 12:
                                _context27.prev = 12;
                                _context27.t0 = _context27["catch"](7);

                                console.error(_context27.t0);

                            case 15:
                            case "end":
                                return _context27.stop();
                        }
                    }
                }, _callee27, _this, [[7, 12]]);
            }));
            $scope.func.showRelationsList = _asyncToGenerator(regeneratorRuntime.mark(function _callee28() {
                return regeneratorRuntime.wrap(function _callee28$(_context28) {
                    while (1) {
                        switch (_context28.prev = _context28.next) {
                            case 0:
                                if (!($scope.data.relationStorage == null)) {
                                    _context28.next = 12;
                                    break;
                                }

                                _context28.prev = 1;
                                _context28.next = 4;
                                return getSelectedLocalStorage('relations');

                            case 4:
                                $scope.data.relationStorage = _context28.sent;

                                if ($scope.data.relationStorage == null) $scope.data.relationStorage = {
                                    header: null,
                                    footers: {}
                                };
                                _context28.next = 12;
                                break;

                            case 8:
                                _context28.prev = 8;
                                _context28.t0 = _context28["catch"](1);

                                console.error(_context28.t0);
                                return _context28.abrupt("return");

                            case 12:
                                $scope.data.showRelations = true;
                                try {
                                    $("#relationsViewer").draggable({ "axis": "x", "containment": "body" });
                                } catch (e) {
                                    console.error(e);
                                }
                                _.defer(function () {
                                    return $scope.$apply();
                                });

                            case 15:
                            case "end":
                                return _context28.stop();
                        }
                    }
                }, _callee28, _this, [[1, 8]]);
            }));
            $scope.func.hiddenRelationsList = _asyncToGenerator(regeneratorRuntime.mark(function _callee29() {
                return regeneratorRuntime.wrap(function _callee29$(_context29) {
                    while (1) {
                        switch (_context29.prev = _context29.next) {
                            case 0:
                                $scope.data.showRelations = false;

                                if (!($scope.data.relationStorage == null)) {
                                    _context29.next = 12;
                                    break;
                                }

                                _context29.prev = 2;
                                _context29.next = 5;
                                return removeSelectedLocalStorage('relations');

                            case 5:
                                _context29.next = 10;
                                break;

                            case 7:
                                _context29.prev = 7;
                                _context29.t0 = _context29["catch"](2);

                                console.error(_context29.t0);

                            case 10:
                                _context29.next = 20;
                                break;

                            case 12:
                                _context29.prev = 12;
                                _context29.next = 15;
                                return setSelectedLocalStorage(_.clone($scope.data.relationStorage), 'relations');

                            case 15:
                                _context29.next = 20;
                                break;

                            case 17:
                                _context29.prev = 17;
                                _context29.t1 = _context29["catch"](12);

                                console.error(_context29.t1);

                            case 20:
                                _.defer(function () {
                                    return $scope.$apply();
                                });

                            case 21:
                            case "end":
                                return _context29.stop();
                        }
                    }
                }, _callee29, _this, [[2, 7], [12, 17]]);
            }));
            $scope.func.pinToLocationRelation = function () {
                try {
                    $scope.data.relationsPushed = !$scope.data.relationsPushed;
                    try {
                        $("#relationsViewer").draggable($scope.data.relationsPushed ? 'disable' : 'enable');
                    } catch (e) {
                        console.error(e);
                    }
                    _.defer(function () {
                        return $scope.$apply();
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.addRelationsToserver = function () {
                if ($scope.data.relationStorage != null) {
                    if ($scope.data.relationStorage.header != null) {
                        if (!_.isEqual($scope.data.relationStorage.footers, {})) {
                            if (_.filter($scope.data.relationStorage.footers, function (v, k) {
                                return !_.has(v, 'relation') || _.includes(["", null], v.relation);
                            }).length == 0) {
                                var query = "";
                                _.forEach($scope.data.relationStorage.footers, function (v, k) {
                                    return query += "relation=" + $scope.data.relationStorage.header.uuid + "=" + k + "=" + v.relation.id + "&";
                                });
                                if (query.endsWith("&")) query = query.slice(0, query.length - 1);
                                simpleService.relation.createRelations(query).then(function (res) {
                                    toaster.pop('success', '', 'رابطه با موفقیت ایجاد شد.');
                                }, function (error) {
                                    return toaster.pop('error', '', 'مشکلی در ایجاد رابطه به وجود آمده است.');
                                });
                            } else {
                                toaster.pop('error', '', 'لطفا نوع رابطه تمام زیر شاخه ها را مشخص کنید.');
                            }
                        } else {
                            toaster.pop('error', '', 'لطفا حداقل یک زیر شاخه انتخاب کنید.');
                        }
                    } else {
                        toaster.pop('error', '', 'لطفا ابتدا یک سرشاخه انتخاب کنید.');
                    }
                } else {
                    toaster.pop('error', '', 'لطفا ابتدا روابط را انتخاب کنید.');
                }
            };
            $scope.func.getRelationsList = function () {
                return new Promise(function (resolve, reject) {
                    try {
                        if ($scope.data.relations != null) resolve($scope.data.relations);else {
                            simpleService.relation.listDefinition().then(function (pgres) {
                                if (pgres.data != null) {
                                    $scope.data.relations = _.clone(pgres.data);
                                    resolve($scope.data.relations);
                                } else reject(null);
                            }, function (error) {
                                return reject(error);
                            });
                        }
                    } catch (e) {
                        console.error(e);
                        reject(null);
                    }
                });
            };
            $scope.func.removeRelation = _asyncToGenerator(regeneratorRuntime.mark(function _callee30() {
                var response;
                return regeneratorRuntime.wrap(function _callee30$(_context30) {
                    while (1) {
                        switch (_context30.prev = _context30.next) {
                            case 0:
                                _context30.prev = 0;

                                if (!($scope.data.relationStorage != null && (_.has($scope.data.relationStorage, 'header') && $scope.data.relationStorage.header != null || _.has($scope.data.relationStorage, 'footers') && !_.isEqual($scope.data.relationStorage.footers, {})))) {
                                    _context30.next = 14;
                                    break;
                                }

                                _context30.next = 4;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Search/deleteRelationSearchCtrl.js?dev=" + randomVersionName);

                            case 4:
                                _context30.next = 6;
                                return deleteRelationSearchCtrl($uibModal);

                            case 6:
                                response = _context30.sent;

                                if (!response) {
                                    _context30.next = 12;
                                    break;
                                }

                                $scope.data.relationStorage = null;
                                _context30.next = 11;
                                return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/deleteRelation.js?dev=" + randomVersionName, 'deleteRelationDesktopCtrl');

                            case 11:
                                $scope.func.hiddenRelationsList();

                            case 12:
                                _context30.next = 15;
                                break;

                            case 14:
                                toaster.pop('error', '', 'شما رابطه ای برای حذف کردن ندارید.');

                            case 15:
                                _context30.next = 22;
                                break;

                            case 17:
                                _context30.prev = 17;
                                _context30.t0 = _context30["catch"](0);

                                console.error(_context30.t0);
                                _context30.next = 22;
                                return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/deleteRelation.js?dev=" + randomVersionName, 'deleteRelationDesktopCtrl');

                            case 22:
                            case "end":
                                return _context30.stop();
                        }
                    }
                }, _callee30, _this, [[0, 17]]);
            }));
            //--------------------------------------------------- SelectedResult  ------------------------------------------
            $scope.func.addToSelectedResults = function () {
                var _ref31 = _asyncToGenerator(regeneratorRuntime.mark(function _callee31(item) {
                    var selectedResults;
                    return regeneratorRuntime.wrap(function _callee31$(_context31) {
                        while (1) {
                            switch (_context31.prev = _context31.next) {
                                case 0:
                                    _context31.prev = 0;
                                    _context31.prev = 1;
                                    _context31.next = 4;
                                    return getSelectedLocalStorage('selectedResults');

                                case 4:
                                    selectedResults = _context31.sent;

                                    if (selectedResults == null) selectedResults = {};

                                    if (!_.has(selectedResults, item.uuid)) {
                                        _context31.next = 10;
                                        break;
                                    }

                                    toaster.pop('info', '', 'این آیتم قبلا به لیست انتخابی اضافه شده است.');
                                    _context31.next = 21;
                                    break;

                                case 10:
                                    selectedResults[item.uuid] = _.clone(item);
                                    _context31.prev = 11;
                                    _context31.next = 14;
                                    return setSelectedLocalStorage(_.clone(selectedResults), 'selectedResults');

                                case 14:
                                    _context31.next = 19;
                                    break;

                                case 16:
                                    _context31.prev = 16;
                                    _context31.t0 = _context31["catch"](11);

                                    console.error(_context31.t0);

                                case 19:
                                    $scope.data.selectedResultStorage = _.clone(selectedResults);
                                    toaster.pop('success', '', 'آیتم با موفقیت به لیست انتخابی افزوده شد.');

                                case 21:
                                    selectedResults = undefined;
                                    _context31.next = 27;
                                    break;

                                case 24:
                                    _context31.prev = 24;
                                    _context31.t1 = _context31["catch"](1);

                                    console.error(_context31.t1);

                                case 27:
                                    _context31.next = 32;
                                    break;

                                case 29:
                                    _context31.prev = 29;
                                    _context31.t2 = _context31["catch"](0);

                                    console.error(_context31.t2);

                                case 32:
                                case "end":
                                    return _context31.stop();
                            }
                        }
                    }, _callee31, _this, [[0, 29], [1, 24], [11, 16]]);
                }));

                return function (_x22) {
                    return _ref31.apply(this, arguments);
                };
            }();
            $scope.func.removeSelectedResultItem = function () {
                var _ref32 = _asyncToGenerator(regeneratorRuntime.mark(function _callee32(id) {
                    return regeneratorRuntime.wrap(function _callee32$(_context32) {
                        while (1) {
                            switch (_context32.prev = _context32.next) {
                                case 0:
                                    _context32.prev = 0;

                                    if (!($scope.data.selectedResultStorage != null)) {
                                        _context32.next = 24;
                                        break;
                                    }

                                    _context32.prev = 2;

                                    if (!_.has($scope.data.selectedResultStorage, id)) {
                                        _context32.next = 19;
                                        break;
                                    }

                                    $scope.data.selectedResultStorage[id] = undefined;
                                    delete $scope.data.selectedResultStorage[id];

                                    if (!_.isEqual($scope.data.selectedResultStorage, {})) {
                                        _context32.next = 11;
                                        break;
                                    }

                                    $scope.data.selectedResultStorage = null;
                                    $scope.func.hiddenSelectedResultList();
                                    _context32.next = 19;
                                    break;

                                case 11:
                                    _context32.prev = 11;
                                    _context32.next = 14;
                                    return setSelectedLocalStorage(_.clone($scope.data.selectedResultStorage), 'selectedResults');

                                case 14:
                                    _context32.next = 19;
                                    break;

                                case 16:
                                    _context32.prev = 16;
                                    _context32.t0 = _context32["catch"](11);

                                    console.error(_context32.t0);

                                case 19:
                                    _context32.next = 24;
                                    break;

                                case 21:
                                    _context32.prev = 21;
                                    _context32.t1 = _context32["catch"](2);

                                    console.error(_context32.t1);

                                case 24:
                                    _context32.next = 29;
                                    break;

                                case 26:
                                    _context32.prev = 26;
                                    _context32.t2 = _context32["catch"](0);

                                    console.error(_context32.t2);

                                case 29:
                                case "end":
                                    return _context32.stop();
                            }
                        }
                    }, _callee32, _this, [[0, 26], [2, 21], [11, 16]]);
                }));

                return function (_x23) {
                    return _ref32.apply(this, arguments);
                };
            }();
            $scope.func.hiddenSelectedResultList = _asyncToGenerator(regeneratorRuntime.mark(function _callee33() {
                return regeneratorRuntime.wrap(function _callee33$(_context33) {
                    while (1) {
                        switch (_context33.prev = _context33.next) {
                            case 0:
                                $scope.data.showSelectedResult = false;

                                if (!($scope.data.selectedResultStorage == null)) {
                                    _context33.next = 12;
                                    break;
                                }

                                _context33.prev = 2;
                                _context33.next = 5;
                                return removeSelectedLocalStorage('selectedResults');

                            case 5:
                                _context33.next = 10;
                                break;

                            case 7:
                                _context33.prev = 7;
                                _context33.t0 = _context33["catch"](2);

                                console.error(_context33.t0);

                            case 10:
                                _context33.next = 20;
                                break;

                            case 12:
                                _context33.prev = 12;
                                _context33.next = 15;
                                return setSelectedLocalStorage(_.clone($scope.data.selectedResultStorage), 'selectedResults');

                            case 15:
                                _context33.next = 20;
                                break;

                            case 17:
                                _context33.prev = 17;
                                _context33.t1 = _context33["catch"](12);

                                console.error(_context33.t1);

                            case 20:
                                _.defer(function () {
                                    return $scope.$apply();
                                });

                            case 21:
                            case "end":
                                return _context33.stop();
                        }
                    }
                }, _callee33, _this, [[2, 7], [12, 17]]);
            }));
            $scope.func.pinToSelectedResult = function () {
                try {
                    $scope.data.selectedResultPushed = !$scope.data.selectedResultPushed;
                    try {
                        $("#selectedResultViewer").draggable($scope.data.selectedResultPushed ? 'disable' : 'enable');
                    } catch (e) {
                        console.error(e);
                    }
                    _.defer(function () {
                        return $scope.$apply();
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.removeSelectedResult = _asyncToGenerator(regeneratorRuntime.mark(function _callee34() {
                return regeneratorRuntime.wrap(function _callee34$(_context34) {
                    while (1) {
                        switch (_context34.prev = _context34.next) {
                            case 0:
                                _context34.prev = 0;

                                if ($scope.data.selectedResultStorage != null && !_.isEqual($scope.data.selectedResultStorage, {})) {
                                    $scope.data.selectedResultStorage = null;
                                    $scope.func.hiddenSelectedResultList();
                                } else toaster.pop('error', '', 'شما رابطه ای برای حذف کردن ندارید.');
                                _context34.next = 9;
                                break;

                            case 4:
                                _context34.prev = 4;
                                _context34.t0 = _context34["catch"](0);

                                console.error(_context34.t0);
                                _context34.next = 9;
                                return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/deleteRelation.js?dev=" + randomVersionName, 'deleteRelationDesktopCtrl');

                            case 9:
                            case "end":
                                return _context34.stop();
                        }
                    }
                }, _callee34, _this, [[0, 4]]);
            }));
            $scope.func.showSelectedResultsList = _asyncToGenerator(regeneratorRuntime.mark(function _callee35() {
                return regeneratorRuntime.wrap(function _callee35$(_context35) {
                    while (1) {
                        switch (_context35.prev = _context35.next) {
                            case 0:
                                if (!($scope.data.relationStorage == null)) {
                                    _context35.next = 12;
                                    break;
                                }

                                _context35.prev = 1;
                                _context35.next = 4;
                                return getSelectedLocalStorage('selectedResults');

                            case 4:
                                $scope.data.selectedResultStorage = _context35.sent;

                                if ($scope.data.selectedResultStorage == null) $scope.data.selectedResultStorage = {};
                                _context35.next = 12;
                                break;

                            case 8:
                                _context35.prev = 8;
                                _context35.t0 = _context35["catch"](1);

                                console.error(_context35.t0);
                                return _context35.abrupt("return");

                            case 12:
                                $scope.data.showSelectedResult = true;
                                try {
                                    $("#selectedResultViewer").draggable({ "axis": "x", "containment": "body" });
                                } catch (e) {
                                    console.error(e);
                                }
                                _.defer(function () {
                                    return $scope.$apply();
                                });

                            case 15:
                            case "end":
                                return _context35.stop();
                        }
                    }
                }, _callee35, _this, [[1, 8]]);
            }));
            $scope.func.fillSate = _asyncToGenerator(regeneratorRuntime.mark(function _callee36() {
                var stateVars;
                return regeneratorRuntime.wrap(function _callee36$(_context36) {
                    while (1) {
                        switch (_context36.prev = _context36.next) {
                            case 0:
                                _context36.prev = 0;
                                _context36.next = 3;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/saveStateVariablesFunction.js?dev=" + randomVersionName);

                            case 3:
                                _context36.next = 5;
                                return getStateVariablesFunction('simple');

                            case 5:
                                stateVars = _context36.sent;

                                if (stateVars !== undefined) {
                                    $scope.data.sort = _.clone(stateVars.data.sort);
                                    $scope.data.foamtree = _.clone(stateVars.data.foamtree);
                                    $scope.data.foam = _.clone(stateVars.data.foam);
                                    $scope.data.circle = _.clone(stateVars.data.circle);
                                    $scope.data.crrotObject = _.clone(stateVars.data.crrotObject);
                                    $scope.data.state = _.clone(stateVars.data.state);
                                    $scope.data.profile = _.clone(stateVars.data.profile);
                                    $scope.data.list = _.clone(stateVars.data.list);
                                    $scope.data.total = _.clone(stateVars.data.total);
                                    $scope.data.highlightFilter = _.clone(stateVars.data.highlightFilter);
                                    $scope.data.searchOBJ = _.clone(stateVars.data.searchOBJ);
                                    $scope.data.itemsPagination.totalItems = _.clone(stateVars.data.itemsPagination.totalItems);
                                    $scope.data.itemsPagination.currentPage = _.clone(stateVars.data.itemsPagination.currentPage);
                                    $scope.data.itemsPagination.show = _.clone(stateVars.data.itemsPagination.show);
                                    $scope.data.searchType = _.clone(stateVars.data.searchType);
                                    $scope.data.treefrequency = _.clone(stateVars.data.treefrequency);
                                    $scope.data.roleListFrequecy = _.clone(stateVars.data.roleListFrequecy);
                                    $scope.data.headers = _.clone(stateVars.data.headers);
                                    if (!_.isEqual($scope.data.list, [])) {
                                        try {
                                            window.document.querySelector(".simple  .CR   .body-search .just-header").classList.add("show-body");
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                }
                                stateVars = undefined;
                                _context36.next = 10;
                                return setStateVariablesFunction(undefined, 'simple');

                            case 10:
                                _context36.prev = 10;
                                _context36.next = 13;
                                return getSelectedLocalStorage('clipBoardResults');

                            case 13:
                                $scope.data.selectedClipBoardStorage = _context36.sent;

                                if ($scope.data.selectedClipBoardStorage == null) $scope.data.selectedClipBoardStorage = {};
                                _context36.next = 20;
                                break;

                            case 17:
                                _context36.prev = 17;
                                _context36.t0 = _context36["catch"](10);

                                console.error(_context36.t0);

                            case 20:
                                $scope.data.isItemInClipboard = !_.isEqual($scope.data.selectedClipBoardStorage, {}) && $scope.data.selectedClipBoardStorage != null;
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                _context36.next = 27;
                                break;

                            case 24:
                                _context36.prev = 24;
                                _context36.t1 = _context36["catch"](0);

                                console.error(_context36.t1);

                            case 27:
                            case "end":
                                return _context36.stop();
                        }
                    }
                }, _callee36, _this, [[0, 24], [10, 17]]);
            }));
            $scope.func.run = _asyncToGenerator(regeneratorRuntime.mark(function _callee37() {
                return regeneratorRuntime.wrap(function _callee37$(_context37) {
                    while (1) {
                        switch (_context37.prev = _context37.next) {
                            case 0:
                                _context37.prev = 0;
                                _context37.next = 3;
                                return FeaturesManagement.getFeatures(simpleService.auth);

                            case 3:
                                $scope.data.profile = _context37.sent;

                                $scope.func.fillSate();
                                _context37.next = 10;
                                break;

                            case 7:
                                _context37.prev = 7;
                                _context37.t0 = _context37["catch"](0);

                                toaster.pop('error', '', 'عدم دریافت اطلاعات کاربری لطفا ابتدا وارد سیستم شوید');

                            case 10:
                            case "end":
                                return _context37.stop();
                        }
                    }
                }, _callee37, _this, [[0, 7]]);
            }));
            $scope.$on('changeFeature', function () {
                var _ref38 = _asyncToGenerator(regeneratorRuntime.mark(function _callee38(event, args) {
                    return regeneratorRuntime.wrap(function _callee38$(_context38) {
                        while (1) {
                            switch (_context38.prev = _context38.next) {
                                case 0:
                                    if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                        _context38.next = 5;
                                        break;
                                    }

                                    _context38.next = 3;
                                    return FeaturesManagement.getFeatures(simpleService.auth);

                                case 3:
                                    $scope.data.profile = _context38.sent;

                                    $scope.func.fillSate();

                                case 5:
                                case "end":
                                    return _context38.stop();
                            }
                        }
                    }, _callee38, _this);
                }));

                return function (_x24, _x25) {
                    return _ref38.apply(this, arguments);
                };
            }());
            $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee41() {
                return regeneratorRuntime.wrap(function _callee41$(_context41) {
                    while (1) {
                        switch (_context41.prev = _context41.next) {
                            case 0:
                                _context41.prev = 0;

                                /*TODO  remove noceScroll element */
                                $(".simple  .CR   .body-search .show-body ~ .result-view  .list-view").getNiceScroll().remove();
                                window.clearAllIntervals();
                                _context41.next = 5;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Public/saveStateVariablesFunction.js?dev=" + randomVersionName);

                            case 5:
                                _context41.next = 7;
                                return setStateVariablesFunction({
                                    data: _.clone($scope.data)
                                }, 'simple');

                            case 7:
                                _.forEach(_.clone($scope.data.removeExternalCSS), function () {
                                    var _ref40 = _asyncToGenerator(regeneratorRuntime.mark(function _callee39(value, src) {
                                        return regeneratorRuntime.wrap(function _callee39$(_context39) {
                                            while (1) {
                                                switch (_context39.prev = _context39.next) {
                                                    case 0:
                                                        _context39.prev = 0;
                                                        _context39.next = 3;
                                                        return CSSManagement.removeCSS(src);

                                                    case 3:
                                                        _context39.next = 8;
                                                        break;

                                                    case 5:
                                                        _context39.prev = 5;
                                                        _context39.t0 = _context39["catch"](0);

                                                        console.error(_context39.t0);

                                                    case 8:
                                                    case "end":
                                                        return _context39.stop();
                                                }
                                            }
                                        }, _callee39, _this, [[0, 5]]);
                                    }));

                                    return function (_x26, _x27) {
                                        return _ref40.apply(this, arguments);
                                    };
                                }());
                                _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                    var _ref41 = _asyncToGenerator(regeneratorRuntime.mark(function _callee40(funcName, src) {
                                        return regeneratorRuntime.wrap(function _callee40$(_context40) {
                                            while (1) {
                                                switch (_context40.prev = _context40.next) {
                                                    case 0:
                                                        _context40.prev = 0;
                                                        _context40.next = 3;
                                                        return JSManagement.removeJS(src, funcName);

                                                    case 3:
                                                        _context40.next = 8;
                                                        break;

                                                    case 5:
                                                        _context40.prev = 5;
                                                        _context40.t0 = _context40["catch"](0);

                                                        console.error(_context40.t0);

                                                    case 8:
                                                    case "end":
                                                        return _context40.stop();
                                                }
                                            }
                                        }, _callee40, _this, [[0, 5]]);
                                    }));

                                    return function (_x28, _x29) {
                                        return _ref41.apply(this, arguments);
                                    };
                                }());
                                // clear all data and functions
                                $scope.func = undefined;
                                $scope.data = undefined;
                                _context41.next = 16;
                                break;

                            case 13:
                                _context41.prev = 13;
                                _context41.t0 = _context41["catch"](0);

                                console.error(_context41.t0);

                            case 16:
                            case "end":
                                return _context41.stop();
                        }
                    }
                }, _callee41, _this, [[0, 13]]);
            })));
            resolve(true);
        } catch (e) {
            reject("مشکلی در ساخت State ایجاد شده است.");
        }
    });
};