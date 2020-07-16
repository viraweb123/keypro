'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CloudController = function CloudController($scope, cloudService, toaster, $state, $uibModal, Authentication) {
    var _this = this;

    _classCallCheck(this, CloudController);

    //https://github.com/mrdoob/three.js/blob/master/examples/css3d_periodictable.html
    //https://threejs.org/examples/#css3d_periodictable

    $scope.data = {
        showComplate: true,
        statusResullt: "notSearch",
        removeExternalFuncs: {},
        removeExternalCSS: {},
        state: 'cloud',
        profile: null,
        list: null,
        clouds: [],
        filters: {},
        rangs: [5, 10, 25],
        results: null,
        offset: 0,
        range: 5,
        limit: 5,
        total: -1,
        itemsPagination: {
            totalItems: -1,
            currentPage: 1,
            maxSize: 5,
            perPage: 5,
            show: false,
            pageChanged: function pageChanged() {
                $scope.data.offset = (parseInt($scope.data.itemsPagination.currentPage) - 1) * $scope.data.itemsPagination.perPage;
                $scope.data.limit = $scope.data.itemsPagination.perPage;
                try {
                    $scope.func.searchResult();
                } catch (e) {
                    console.error(e);
                }
            }
        },
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
        showCloud: false,
        isUpdate: false,

        jQCloudColors: ['#980ce0', '#5e28e0', '#6d87e0', '#5be0dc', '#1de0b0', '#5ae078', '#68e025', '#d0e04d', '#e08c3b', '#e02c16']
    };

    $scope.func = {};

    $scope.func.showCloud = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if ($scope.data.showCloud) {
                            $scope.data.showCloud = false;
                        } else {
                            $scope.data.showCloud = true;
                            $scope.func.keyWordsCloud();
                        }
                        _.defer(function () {
                            return $scope.$apply();
                        });

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    $scope.func.runAfterClickToCloude = function (value) {
        /* $scope.data.searchType = "findPaginated";
         $scope.data.itemsPagination.currentPage = 1;
         $scope.data.searchObject.offset = 0;
         $scope.data.searchObject.path = '/okm:root';
         //$scope.func.getData();
         $scope.func.addKeyToFilter(value);*/
        console.log(value);
    };
    $scope.func.runInClouds = function (value) {
        $scope.func.runAfterClickToCloude(value);
    };
    $scope.func.clickInCloud = function () {
        return '{$scope.func.runInClouds(value);}';
    };
    $scope.func.selectCloudItem = function (item) {
        /*$scope.data.searchType = "findPaginated";
        $scope.data.itemsPagination.currentPage = 1;
        $scope.data.searchObject.offset = 0;
        //$scope.func.getData();
        $scope.func.addKeyToFilter(item);*/
        console.info(1);
        console.log(item);
    };

    $scope.func.colors = function (rank) {
        var color = null;
        try {
            color = $scope.data.jQCloudColors[rank - 1];
        } catch (e) {
            color = "#000";
        }
        return color;
    };

    $scope.func.keyWordsCloud = function () {

        //todo toturial http://mistic100.github.io/jQCloud/

        try {
            $('.cloud  div#viewCloud #clouds-Keyword').jQCloud('destroy');
        } catch (e) {
            console.error(e);
        }
        _.defer(function () {
            try {
                var words = [];

                var _loop = function _loop(i) {
                    words.push({
                        text: $scope.data.list[i].keyword,
                        weight: $scope.data.list[i].occurs,
                        handlers: {
                            click: function click() {
                                $scope.func.addToFilters($scope.data.list[i]);
                            }
                        }
                    });
                };

                for (var i = 0; i < $scope.data.list.length; i++) {
                    _loop(i);
                }
                var style = {
                    width: 550,
                    height: 550,
                    colors: $scope.func.colors,
                    textColour: '#094C90',
                    textFont: 'bnassim,arial',
                    outlineColour: '#3fba2b',
                    outlineThickness: 1,
                    reverse: true,
                    depth: 1.0,
                    maxSpeed: 0.05,
                    freezeDecel: true,
                    frontSelect: true,
                    center: {
                        x: 0.5,
                        y: 0.4
                    },
                    afterCloudRender: function afterCloudRender() {
                        $(this).fadeIn();
                    }
                };
                $('.cloud  div#viewCloud #clouds-Keyword').jQCloud(angular.copy(words), style);
                words = undefined;
            } catch (e) {
                console.error(e);
            }
        }, 500);
    };

    $scope.func.changeSize = function () {
        try {
            if (_.isEqual($scope.data.filters, {})) {
                toaster.pop("error", "", "لطفا حداقل یک کلید واژه انتخاب کنید.");
            } else {
                $scope.data.offset = 0;
                $scope.data.itemsPagination.currentPage = 1;
                _.defer(function () {
                    return $scope.$apply();
                });
                //$scope.func.searchResult();
                $scope.data.itemsPagination.pageChanged();
            }
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.getImage = function (item, getSrcFromType) {
        return new Promise(function (resolve, reject) {
            try {
                cloudService.document.thumbnail(item, 0, 75).then(function (result) {
                    resolve("data:image/png;base64," + result.data);
                }, function (error) {
                    resolve(getSrcFromType(item.mimeType));
                });
            } catch (e) {
                reject(e);
            }
        });
    };
    $scope.func.searchResult = function () {

        try {
            if ($scope.func.isNotEmptyFilter()) {
                //let query = `domain=7&offset=${$scope.data.offset}&limit=${$scope.data.limit}&${_.join(_.map(_.keys($scope.data.filters) , filter =>    `keyword=${encodeURIComponent("\""+filter+"\"")}`    ) , "&")}`;
                var _query = 'domain=7&offset=' + $scope.data.offset + '&limit=' + $scope.data.limit + '&' + _.join(_.map(_.keys($scope.data.filters), function (filter) {
                    return 'keyword=' + filter;
                }), "&");

                cloudService.search.findPaginatedWithCreatedQuery(_query).then(function (res) {
                    try {

                        if (res.data.list != null && res.data.total > 0) {
                            $scope.data.itemsPagination.totalItems = _.clone(res.data.total);
                            $scope.data.total = res.data.total;
                            $scope.func.generateResult(res.data);
                            $scope.data.statusResullt = "result";
                        } else {
                            $scope.data.itemsPagination.totalItems = -1;
                            $scope.data.total = -1;
                            $scope.data.itemsPagination.currentPage = 1;
                            $scope.data.results = null;
                            $scope.data.clouds = [];
                            toaster.pop('info', '', 'موردی جهت نمایش وجود ندارد');
                            $scope.data.statusResullt = "empty";
                        }
                    } catch (e) {
                        console.error(e);
                    }
                    try {
                        //var query =  _.join(_.map( _.keys($scope.data.filters) , filter => `filter=${encodeURIComponent("\""+filter+"\"")}` ),'&');
                        var query = _.join(_.map(_.keys($scope.data.filters), function (filter) {
                            return 'filter=' + filter;
                        }), '&');

                        cloudService.search.listKeywordsWithFilters(query).then(function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(res) {
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                try {

                                                    console.log(res);

                                                    $scope.data.list = _.has(res, 'data') && _.isArray(res.data) && res.data.length == 1 && _.has(res.data[0], 'originalElement') && _.has(res.data[0].originalElement, 'keywordMaps') && res.data[0].originalElement.keywordMaps == "" ? [] : _.clone(res.data);

                                                    if ($scope.data.showCloud) $scope.func.keyWordsCloud();
                                                } catch (e) {
                                                    console.error(e);
                                                } finally {
                                                    _.defer(function () {
                                                        return $scope.$apply();
                                                    });
                                                }

                                            case 1:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this);
                            }));

                            return function (_x) {
                                return _ref2.apply(this, arguments);
                            };
                        }(), function (error) {
                            return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }, function (error) {
                    $scope.data.statusResullt = "empty";
                    toaster.pop('info', '', 'در برقراری ارتباط با سرور مشکلی پیش آمده است');
                });
            } else {
                try {
                    //var query =  _.join(_.map( _.keys($scope.data.filters) , filter => `filter=${encodeURIComponent("\""+filter+"\"")}` ),'&');
                    var query = _.join(_.map(_.keys($scope.data.filters), function (filter) {
                        return 'filter=' + filter;
                    }), '&');
                    cloudService.search.listKeywordsWithFilters(query).then(function () {
                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(res) {
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            try {
                                                $scope.data.list = _.has(res, 'data') && _.isArray(res.data) && res.data.length == 1 && _.has(res.data[0], 'originalElement') && _.has(res.data[0].originalElement, 'keywordMaps') && res.data[0].originalElement.keywordMaps == "" ? [] : _.clone(res.data);

                                                if ($scope.data.showCloud) $scope.func.keyWordsCloud();
                                            } catch (e) {
                                                console.error(e);
                                            } finally {
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });
                                            }

                                        case 1:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, _this);
                        }));

                        return function (_x2) {
                            return _ref3.apply(this, arguments);
                        };
                    }(), function (error) {
                        return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.addKeyFromTags = function (key) {
        return $scope.func.addToFilters({ keyword: key, occurs: 0 });
    };
    $scope.func.generateResult = function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(data) {
            var i, newItem, low, j, high;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                        case 2:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';
                            _context4.next = 5;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                        case 5:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType';

                            $scope.data.clouds = [];

                            i = 0;

                        case 8:
                            if (!(i < data.list.length)) {
                                _context4.next = 43;
                                break;
                            }

                            _context4.prev = 9;
                            newItem = {};

                            if (!_.has(data.list[i], 'document')) {
                                _context4.next = 24;
                                break;
                            }

                            newItem = _.clone(data.list[i].document);
                            newItem.type = 'document';
                            newItem.icon = 'fa-file';
                            newItem.excerpt = data.list[i].excerpt;
                            newItem.showDoc = 'showDocument';
                            _context4.next = 19;
                            return $scope.func.getImage(newItem, getSrcFromType);

                        case 19:
                            newItem.thumbnailSrc = _context4.sent;

                            newItem.name = data.list[i].document.path.split("/").pop();
                            newItem.keywords = _.has(data.list[i].document, 'keywords') ? _.isArray(data.list[i].document.keywords) ? data.list[i].document.keywords : [data.list[i].document.keywords] : [];
                            _context4.next = 25;
                            break;

                        case 24:
                            if (_.has(data.list[i], 'folder')) {
                                newItem = _.clone(data.list[i].folder);
                                newItem.type = 'folder';
                                newItem.icon = 'fa-folder';
                                newItem.showDoc = 'notShowDocument';
                                newItem.thumbnailSrc = '../../../../static/image/folder' + (newItem.hasChildrenFolder ? 's' : '') + '.png';
                                newItem.name = data.list[i].folder.path.split("/").pop();
                                newItem.keywords = _.has(data.list[i].folder, 'keywords') ? _.isArray(data.list[i].folder.keywords) ? data.list[i].folder.keywords : [data.list[i].folder.keywords] : [];
                            } else if (_.has(data.list[i], 'mail')) {
                                newItem = _.clone(data.list[i].mail);
                                newItem.type = 'mail';
                                newItem.icon = 'fa-envelope';
                                newItem.showDoc = 'notShowDocument';
                            } else if (_.has(data.list[i], 'attachment')) {
                                newItem = _.clone(data.list[i].attachment);
                                newItem.type = 'attachment';
                                newItem.icon = 'fa-paperclip';
                                newItem.showDoc = 'notShowDocument';
                            }

                        case 25:
                            newItem.score = _.clone(data.list[i].score);

                            newItem.starts = ['fa-star-o', 'fa-star-o', 'fa-star-o', 'fa-star-o', 'fa-star-o'];

                            low = 0;
                            j = 0;

                            for (high = 200; high < 1001; high += 200) {
                                if (low < newItem.score && newItem.score < high) newItem.starts[j] = 'fa-star-half-o';else if (newItem.score >= high) newItem.starts[j] = 'fa-star';
                                j++;
                                low = _.clone(high);
                            }

                            _context4.next = 32;
                            return miladiToJalaliFunction(_.clone(newItem.created));

                        case 32:
                            newItem.jalaliCreateDate = _context4.sent;

                            $scope.data.clouds.push(_.clone(newItem));
                            newItem = undefined;

                            _context4.next = 40;
                            break;

                        case 37:
                            _context4.prev = 37;
                            _context4.t0 = _context4['catch'](9);

                            console.error(_context4.t0);

                        case 40:
                            i++;
                            _context4.next = 8;
                            break;

                        case 43:

                            /*console.info("___________________________________");
                            console.log($scope.data.clouds);
                             console.log( $scope.data.filters);
                            for (var p in  $scope.data.filters) {
                                console.log(p);
                            }*/

                            try {
                                window.document.querySelector(".simple  .CR   .body-search .just-header").classList.add("show-body");
                            } catch (e) {}
                            $scope.data.total = data.total;
                            _.defer(function () {
                                return $scope.$apply();
                            });

                        case 46:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[9, 37]]);
        }));

        return function (_x3) {
            return _ref4.apply(this, arguments);
        };
    }();
    $scope.func.downloadSearch = function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(item) {
            var isDownload;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;
                            _context5.next = 3;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                        case 3:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';
                            isDownload = getPermisionArray(item.permissions);

                            if (!(item.type == "folder")) {
                                _context5.next = 19;
                                break;
                            }

                            if (!isDownload[2]) {
                                _context5.next = 16;
                                break;
                            }

                            _context5.next = 9;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/convertTozipFolderFunction.js?dev=' + randomVersionName);

                        case 9:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/convertTozipFolderFunction.js?dev=' + randomVersionName] = 'convertTozipFolderFunction';
                            $("#show-waiting-get-rest-from-server-id").addClass('show-waiting');
                            _context5.next = 13;
                            return convertTozipFolderFunction(item);

                        case 13:
                            $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                            _context5.next = 17;
                            break;

                        case 16:
                            toaster.pop('warning', "", ' امکان دریافت پوشه ' + item.name + ' وجود ندارد. ');

                        case 17:
                            _context5.next = 27;
                            break;

                        case 19:
                            if (!isDownload[2]) {
                                _context5.next = 26;
                                break;
                            }

                            _context5.next = 22;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/downloadFileFunction.js?dev=' + randomVersionName);

                        case 22:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/downloadFileFunction.js?dev=' + randomVersionName] = 'downloadFileFunction';
                            downloadFileFunction(item);
                            _context5.next = 27;
                            break;

                        case 26:
                            toaster.pop('warning', "", ' امکان دریافت سند' + item.name + ' وجود ندارد. ');

                        case 27:
                            _context5.next = 34;
                            break;

                        case 29:
                            _context5.prev = 29;
                            _context5.t0 = _context5['catch'](0);

                            console.error(_context5.t0);
                            $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                            toaster.pop('warning', "", 'مشکلی در دریافت به وجود آمده است.');

                        case 34:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this, [[0, 29]]);
        }));

        return function (_x4) {
            return _ref5.apply(this, arguments);
        };
    }();
    $scope.func.showThesaurusTree = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        var response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js?dev=' + randomVersionName);

                    case 3:
                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/selectThesaurusChild.js?dev=' + randomVersionName] = 'selectThesaurusChild';

                        _context6.next = 6;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                    case 6:
                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';

                        _context6.next = 9;
                        return selectThesaurusChild($uibModal, //modal func
                        cloudService.repository, //repository service
                        'getThesaurusFolder', // rootPath
                        cloudService.folder, // folder service
                        "thesaurus", getNameFromPath);

                    case 9:
                        response = _context6.sent;


                        if (_.has(response, 'addNode') && !_.isEmpty(response.addNode)) {
                            if (_.has($scope.data.filters, response.addNode.label)) toaster.pop('error', '', 'این کلید قبلا به لیست اضافه شده است');else {
                                $scope.data.filters[response.addNode.label] = 0;
                                $scope.data.offset = 0;
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                $scope.func.searchResult();
                            }
                        }

                        _context6.next = 16;
                        break;

                    case 13:
                        _context6.prev = 13;
                        _context6.t0 = _context6['catch'](0);

                        console.error(_context6.t0);

                    case 16:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, _this, [[0, 13]]);
    }));
    $scope.func.addToFilters = function (keyword) {
        try {
            if (_.has($scope.data.filters, keyword.keyword)) toaster.pop('error', '', 'این کلید قبلا به لیست اضافه شده است');else {
                $scope.data.filters[keyword.keyword] = keyword.occurs;
                $scope.data.offset = 0;
                $scope.data.itemsPagination.currentPage = 1;
                _.defer(function () {
                    return $scope.$apply();
                });
                //$scope.func.searchResult();

                //$scope.data.showCloud = false;


                $scope.data.itemsPagination.pageChanged();
            }
        } catch (e) {
            console.error(e);
        }
    };

    $scope.func.removeFilter = function (key) {
        try {

            if (_.has($scope.data.filters, key)) {
                try {

                    $scope.data.filters[key] = undefined;
                    delete $scope.data.filters[key];

                    //$scope.data.showCloud = false;


                    if (_.isEmpty($scope.data.filters)) $scope.data.clouds = [];else $scope.data.offset = 0;
                    $scope.func.searchResult();
                } catch (err) {
                    console.error(err);
                } finally {
                    _.defer(function () {
                        return $scope.$apply();
                    });
                }
            }
        } catch (e) {
            console.error(e);
            toaster.pop('error', '', 'عدم حذف فیلتر انتخابی');
        }
    };
    $scope.func.isNotEmptyFilter = function () {
        return !_.isEmpty($scope.data.filters);
    };
    $scope.func.todo = function () {
        try {
            cloudService.search.listKeywords().then(function () {
                var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(res) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    try {
                                        $scope.data.list = _.clone(res.data);
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    } catch (e) {
                                        console.error(e);
                                    }

                                case 1:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, _this);
                }));

                return function (_x5) {
                    return _ref7.apply(this, arguments);
                };
            }(), function (error) {
                return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
            });
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.run = _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.prev = 0;
                        _context8.next = 3;
                        return FeaturesManagement.getFeatures(cloudService.auth);

                    case 3:
                        $scope.data.profile = _context8.sent;

                        $scope.func.todo();
                        _context8.next = 10;
                        break;

                    case 7:
                        _context8.prev = 7;
                        _context8.t0 = _context8['catch'](0);

                        console.error(_context8.t0);

                    case 10:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, _this, [[0, 7]]);
    }));
    $scope.func.gotoDesktop = function () {
        var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(item) {
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.prev = 0;

                            if ($scope.data.profile.prfStack.taxonomyVisible) {
                                _context9.next = 3;
                                break;
                            }

                            throw new Error("امکان ورود به این صفحه وجود ندارد .");

                        case 3:
                            _context9.next = 5;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/saveChangeStateVar.js?dev=' + randomVersionName);

                        case 5:
                            _context9.next = 7;
                            return setStateVarFunction(item);

                        case 7:
                            $state.go('main.page.desktop', {}, { reload: false });
                            _context9.next = 14;
                            break;

                        case 10:
                            _context9.prev = 10;
                            _context9.t0 = _context9['catch'](0);

                            console.error(_context9.t0);
                            toaster.pop("error", "", _context9.t0.message);

                        case 14:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this, [[0, 10]]);
        }));

        return function (_x6) {
            return _ref9.apply(this, arguments);
        };
    }();
    $scope.func.viewFile = function () {
        var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(doc) {
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.prev = 0;
                            _context10.t0 = doc.type;
                            _context10.next = _context10.t0 === 'document' ? 4 : _context10.t0 === 'folder' ? 17 : 41;
                            break;

                        case 4:
                            _context10.next = 6;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName);

                        case 6:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName] = 'viewerFolderFunction';
                            _context10.prev = 7;
                            _context10.next = 10;
                            return viewerFolderFunction($uibModal, JSManagement, CSSManagement, cloudService, { uuid: doc.uuid, type: 'document' }, $scope.data.profile);

                        case 10:
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            _context10.next = 16;
                            break;

                        case 13:
                            _context10.prev = 13;
                            _context10.t1 = _context10['catch'](7);

                            console.error(_context10.t1);

                        case 16:
                            return _context10.abrupt('break', 43);

                        case 17:
                            _context10.next = 19;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName);

                        case 19:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName] = 'viewerFolderFunction';
                            _context10.prev = 20;
                            _context10.next = 23;
                            return viewerFolderFunction($uibModal, JSManagement, CSSManagement, cloudService, doc, $scope.data.profile);

                        case 23:
                            _context10.prev = 23;
                            _context10.next = 26;
                            return getSelectedLocalStorage('clipBoardResults');

                        case 26:
                            $scope.data.selectedClipBoardStorage = _context10.sent;

                            if ($scope.data.selectedClipBoardStorage == null) $scope.data.selectedClipBoardStorage = {};
                            _context10.next = 33;
                            break;

                        case 30:
                            _context10.prev = 30;
                            _context10.t2 = _context10['catch'](23);

                            console.error(_context10.t2);

                        case 33:
                            $scope.data.isItemInClipboard = !_.isEqual($scope.data.selectedClipBoardStorage, {}) && $scope.data.selectedClipBoardStorage != null;
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            _context10.next = 40;
                            break;

                        case 37:
                            _context10.prev = 37;
                            _context10.t3 = _context10['catch'](20);

                            console.error(_context10.t3);

                        case 40:
                            return _context10.abrupt('break', 43);

                        case 41:
                            toaster.pop("error", "", "امکان نمایش محتوای آیتم انتخابی وجود ندارد.");
                            return _context10.abrupt('break', 43);

                        case 43:
                            _context10.next = 49;
                            break;

                        case 45:
                            _context10.prev = 45;
                            _context10.t4 = _context10['catch'](0);

                            toaster.pop("error", "", "امکان نمایش محتوای آیتم انتخابی وجود ندارد.");
                            console.error(_context10.t4);

                        case 49:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, _this, [[0, 45], [7, 13], [20, 37], [23, 30]]);
        }));

        return function (_x7) {
            return _ref10.apply(this, arguments);
        };
    }();
    $scope.func.viewFile2 = function () {
        var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(file) {
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, _this);
        }));

        return function (_x8) {
            return _ref11.apply(this, arguments);
        };
    }();
    $scope.$on('$stateChangeSuccess', function () {
        $scope.func.run();
    });
    $scope.$on('changeFeature', function () {
        var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(event, args) {
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            _context12.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context12.next = 6;
                                break;
                            }

                            _context12.next = 4;
                            return FeaturesManagement.getFeatures(cloudService.auth);

                        case 4:
                            $scope.data.profile = _context12.sent;

                            $scope.func.todo();

                        case 6:
                            _context12.next = 11;
                            break;

                        case 8:
                            _context12.prev = 8;
                            _context12.t0 = _context12['catch'](0);

                            console.error(_context12.t0);

                        case 11:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, _this, [[0, 8]]);
        }));

        return function (_x9, _x10) {
            return _ref12.apply(this, arguments);
        };
    }());
    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        try {
                            $(".dashboard .CR div.tabel-body  div.body-view table").getNiceScroll().remove();
                            //TODO clear all interval and timeouts
                            /*window.clearAllTimeouts();*/
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalCSS), function () {
                                var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(value, src) {
                                    return regeneratorRuntime.wrap(function _callee13$(_context13) {
                                        while (1) {
                                            switch (_context13.prev = _context13.next) {
                                                case 0:
                                                    _context13.prev = 0;
                                                    _context13.next = 3;
                                                    return CSSManagement.removeCSS(src);

                                                case 3:
                                                    _context13.next = 8;
                                                    break;

                                                case 5:
                                                    _context13.prev = 5;
                                                    _context13.t0 = _context13['catch'](0);

                                                    console.error(_context13.t0);

                                                case 8:
                                                case 'end':
                                                    return _context13.stop();
                                            }
                                        }
                                    }, _callee13, _this, [[0, 5]]);
                                }));

                                return function (_x11, _x12) {
                                    return _ref14.apply(this, arguments);
                                };
                            }());

                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee14$(_context14) {
                                        while (1) {
                                            switch (_context14.prev = _context14.next) {
                                                case 0:
                                                    _context14.prev = 0;

                                                    console.info(src);
                                                    _context14.next = 4;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 4:
                                                    _context14.next = 9;
                                                    break;

                                                case 6:
                                                    _context14.prev = 6;
                                                    _context14.t0 = _context14['catch'](0);

                                                    console.error(_context14.t0);

                                                case 9:
                                                case 'end':
                                                    return _context14.stop();
                                            }
                                        }
                                    }, _callee14, _this, [[0, 6]]);
                                }));

                                return function (_x13, _x14) {
                                    return _ref15.apply(this, arguments);
                                };
                            }());
                            //TODO  clear all data and functions inside scope
                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case 'end':
                        return _context15.stop();
                }
            }
        }, _callee15, _this);
    })));
};

exports.default = CloudController;

CloudController.$inject = ['$scope', 'cloudService', 'toaster', '$state', '$uibModal', 'Authentication'];