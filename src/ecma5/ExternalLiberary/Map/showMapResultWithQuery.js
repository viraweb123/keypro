'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var showMapResultWithQueryCtrl = function showMapResultWithQueryCtrl(uibModal, _profile, _service, _query, _miladiToJalali) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: '/ecma5/ExternalLiberary/Map/showMapResultWithQuery.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, $uibModal, profile, service, query, miladiToJalali) {

                $scope.data = {
                    isSearched: true,
                    removeExternalFuncs: {},
                    removeExternalCSS: {},
                    view: false,
                    list: [],
                    sort: {
                        type: null,
                        ascDesc: true
                    },
                    metaDataList: [],
                    req: undefined,
                    itemsPagination: {
                        totalItems: -1,
                        range: 10,
                        currentPage: 1,
                        maxSize: 10,
                        perPage: 10,
                        offset: 0,
                        show: false,
                        pageChanged: function pageChanged() {
                            $scope.data.itemsPagination.offset = (parseInt($scope.data.itemsPagination.currentPage) - 1) * $scope.data.itemsPagination.perPage;
                            try {
                                $scope.func.startSearch();
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                };

                $scope.func = {};

                $scope.func.startSearch = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    try {

                                        $scope.data.isSearched = true;
                                        $scope.data.list = [];
                                        $scope.data.metaDataList = [];
                                        service.search.findPaginated({
                                            isFuzzy: 'no',
                                            limit: $scope.data.limit,
                                            total: 0,
                                            offset: $scope.data.offset,
                                            property: query
                                        }).then(function () {
                                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(res) {
                                                var i, newItem, metadata;
                                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                    while (1) {
                                                        switch (_context2.prev = _context2.next) {
                                                            case 0:
                                                                if (!(res.data.total > 0)) {
                                                                    _context2.next = 49;
                                                                    break;
                                                                }

                                                                _context2.next = 3;
                                                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/miladiToJalali.js?dev=' + randomVersionName);

                                                            case 3:
                                                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/miladiToJalali.js?dev=' + randomVersionName] = 'miladiToJalali';

                                                                i = 0;

                                                            case 5:
                                                                if (!(i < res.data.list.length)) {
                                                                    _context2.next = 48;
                                                                    break;
                                                                }

                                                                _context2.prev = 6;
                                                                newItem = {};

                                                                if (!_.has(res.data.list[i], 'document')) {
                                                                    _context2.next = 21;
                                                                    break;
                                                                }

                                                                newItem = _.clone(res.data.list[i].document);
                                                                newItem.type = 'document';
                                                                newItem.icon = 'file';
                                                                newItem.css = 'fa-file-o', newItem.icon = 'fa-file';
                                                                newItem.name = res.data.list[i].document.path.split("/").pop();
                                                                newItem.excerpt = res.data.list[i].excerpt;
                                                                newItem.showDoc = 'showDocument';
                                                                _context2.next = 18;
                                                                return miladiToJalali(res.data.list[i].document.created);

                                                            case 18:
                                                                newItem.created = _context2.sent;
                                                                _context2.next = 34;
                                                                break;

                                                            case 21:
                                                                if (!_.has(res.data.list[i], 'folder')) {
                                                                    _context2.next = 33;
                                                                    break;
                                                                }

                                                                newItem = _.clone(res.data.list[i].folder);
                                                                newItem.type = 'folder';
                                                                newItem.icon = 'fa-folder';
                                                                newItem.css = 'fa-folder-o';
                                                                newItem.name = res.data.list[i].folder.path.split("/").pop();
                                                                newItem.showDoc = 'notShowDocument';
                                                                _context2.next = 30;
                                                                return miladiToJalali(res.data.list[i].folder.created);

                                                            case 30:
                                                                newItem.created = _context2.sent;
                                                                _context2.next = 34;
                                                                break;

                                                            case 33:
                                                                if (_.has(res.data.list[i], 'mail')) {
                                                                    newItem = _.clone(res.data.list[i].mail);
                                                                    newItem.type = 'mail';
                                                                    newItem.icon = 'fa-envelope';
                                                                    newItem.css = 'envelope';
                                                                    newItem.showDoc = 'notShowDocument';
                                                                } else if (_.has(res.data.list[i], 'attachment')) {
                                                                    newItem = _.clone(res.data.list[i].attachment);
                                                                    newItem.type = 'attachment';
                                                                    newItem.css = 'paperclip';
                                                                    newItem.icon = 'fa-paperclip';
                                                                    newItem.showDoc = 'notShowDocument';
                                                                }

                                                            case 34:
                                                                newItem.score = _.clone(res.data.list[i].score);
                                                                _context2.next = 37;
                                                                return miladiToJalali(_.clone(newItem.created));

                                                            case 37:
                                                                newItem.jalaliCreateDate = _context2.sent;

                                                                $scope.data.list.push(_.clone(newItem));
                                                                newItem = undefined;
                                                                _context2.next = 45;
                                                                break;

                                                            case 42:
                                                                _context2.prev = 42;
                                                                _context2.t0 = _context2['catch'](6);

                                                                console.error(_context2.t0);

                                                            case 45:
                                                                i++;
                                                                _context2.next = 5;
                                                                break;

                                                            case 48:

                                                                try {
                                                                    if (/property=/gi.test(query)) {
                                                                        metadata = query.split(/(?=property=[^&]*)/).pop().replace("property=", "");

                                                                        metadata = metadata.split(".")[0];

                                                                        service.propertyGroup.forId(metadata, _.map($scope.data.list, function (item) {
                                                                            return item.uuid;
                                                                        })).then(function (result) {
                                                                            try {
                                                                                //let  r = _.keyBy ( _.map( $scope.data.list , i => {  let k = _.first(Object.keys(i)); let v = i[k];  v['type'] = k;  return v; } )  , 'uuid' );
                                                                                var r = _.keyBy($scope.data.list, 'uuid');
                                                                                var array = [];
                                                                                var headers = {};
                                                                                _.forEach(r, function (value, key) {
                                                                                    var item = {};
                                                                                    _.forEach(result.data[0].originalElement[key], function () {
                                                                                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(v) {
                                                                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                                                                while (1) {
                                                                                                    switch (_context.prev = _context.next) {
                                                                                                        case 0:
                                                                                                            _context.t0 = v.objClass;
                                                                                                            _context.next = _context.t0 === 'com.openkm.bean.form.Input' ? 3 : _context.t0 === 'com.openkm.bean.form.Select' ? 5 : _context.t0 === 'com.openkm.bean.form.TextArea' ? 7 : _context.t0 === 'com.openkm.bean.form.CheckBox' ? 9 : 11;
                                                                                                            break;

                                                                                                        case 3:
                                                                                                            if (v.type == "date") {
                                                                                                                item[v.name] = {};
                                                                                                                miladiToJalaliFunction(v.value).then(function (res) {
                                                                                                                    return item[v.name].value = res;
                                                                                                                }, function (error) {
                                                                                                                    return item[v.name].value = v.value;
                                                                                                                });
                                                                                                            } else item[v.name] = {
                                                                                                                value: v.value
                                                                                                            };
                                                                                                            return _context.abrupt('break', 11);

                                                                                                        case 5:
                                                                                                            if (_.has(v, 'options')) {

                                                                                                                if (!_.isArray(v.options)) {
                                                                                                                    if (v.options != null) v.options = [v.options];else v.options = [];
                                                                                                                }

                                                                                                                if (v.options.length > 0) {
                                                                                                                    try {
                                                                                                                        item[v.name] = {
                                                                                                                            value: _.join(_.map(_.filter(v.options, function (option) {
                                                                                                                                return option.selected;
                                                                                                                            }), 'label'), ',')
                                                                                                                        };
                                                                                                                    } catch (e) {
                                                                                                                        item[v.name] = {
                                                                                                                            value: v.value
                                                                                                                        };
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                            return _context.abrupt('break', 11);

                                                                                                        case 7:
                                                                                                            item[v.name] = {
                                                                                                                value: v.value
                                                                                                            };
                                                                                                            return _context.abrupt('break', 11);

                                                                                                        case 9:
                                                                                                            if (_.includes([true, "true", 1, false, "false", 0], v.value)) item[v.name] = {
                                                                                                                icon: _.includes([true, "true", 1], v.value) ? 'fa-check' : 'fa-remove'
                                                                                                            };
                                                                                                            return _context.abrupt('break', 11);

                                                                                                        case 11:
                                                                                                            headers[v.name] = v.label;

                                                                                                        case 12:
                                                                                                        case 'end':
                                                                                                            return _context.stop();
                                                                                                    }
                                                                                                }
                                                                                            }, _callee, _this);
                                                                                        }));

                                                                                        return function (_x2) {
                                                                                            return _ref3.apply(this, arguments);
                                                                                        };
                                                                                    }());
                                                                                    array.push({
                                                                                        list: item,
                                                                                        value: _.clone(value),
                                                                                        type: value.mimeType ? 'fa-file' : 'fa-folder'
                                                                                    });
                                                                                });
                                                                                $scope.data.metaDataList = _.clone(array);
                                                                                array = undefined;
                                                                                $scope.data.headers = _.clone(headers);
                                                                                headers = undefined;
                                                                                r = undefined;
                                                                            } catch (e) {
                                                                                console.error(e);
                                                                            }
                                                                        }, function (error) {
                                                                            console.error(error);
                                                                            $scope.data.isSearched = true;
                                                                        });
                                                                    }
                                                                } catch (e) {
                                                                    console.error(e);
                                                                }

                                                            case 49:
                                                                $scope.data.isSearched = false;
                                                                $scope.data.total = res.data.total;
                                                                $scope.data.itemsPagination.totalItems = res.data.total;

                                                                _.defer(function () {
                                                                    return $scope.$apply();
                                                                });

                                                            case 53:
                                                            case 'end':
                                                                return _context2.stop();
                                                        }
                                                    }
                                                }, _callee2, _this, [[6, 42]]);
                                            }));

                                            return function (_x) {
                                                return _ref2.apply(this, arguments);
                                            };
                                        }(), function (error) {
                                            $scope.data.isSearched = false;
                                        });
                                    } catch (e) {
                                        $scope.data.isSearched = false;
                                        console.error(e);
                                    }

                                case 1:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this);
                }));

                $scope.func.goToResult = function () {
                    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(callback) {
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        $scope.data.view = false;
                                        _context4.next = 3;
                                        return JS.addJS('ecma5/ExternalLiberary/Public/removeAllPlayers.js?dev=' + randomVersionName);

                                    case 3:
                                        if (_.isFunction(removeAllPlayers)) removeAllPlayers();
                                        if (typeof callback !== "undefined" && _.isFunction(callback)) callback();

                                    case 5:
                                    case 'end':
                                        return _context4.stop();
                                }
                            }
                        }, _callee4, _this);
                    }));

                    return function (_x3) {
                        return _ref4.apply(this, arguments);
                    };
                }();

                $scope.func.gotoDesktop = function () {
                    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(item) {
                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                                switch (_context5.prev = _context5.next) {
                                    case 0:
                                        _context5.prev = 0;

                                        if (profile.prfStack.taxonomyVisible) {
                                            _context5.next = 3;
                                            break;
                                        }

                                        throw new Error("امکان ورود به این صفحه وجود ندارد .");

                                    case 3:
                                        console.log(item);
                                        try {
                                            $scope.func.exit();
                                        } catch (e) {
                                            console.error(e);
                                        } finally {
                                            window.location.hash = '#/page/desktop/' + item.uuid + '_type=' + item.type;
                                        }
                                        _context5.next = 10;
                                        break;

                                    case 7:
                                        _context5.prev = 7;
                                        _context5.t0 = _context5['catch'](0);

                                        toaster.pop("error", "", _context5.t0.message);

                                    case 10:
                                    case 'end':
                                        return _context5.stop();
                                }
                            }
                        }, _callee5, _this, [[0, 7]]);
                    }));

                    return function (_x4) {
                        return _ref5.apply(this, arguments);
                    };
                }();

                $scope.func.showFile = function () {
                    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(doc) {
                        return regeneratorRuntime.wrap(function _callee6$(_context6) {
                            while (1) {
                                switch (_context6.prev = _context6.next) {
                                    case 0:
                                        _context6.prev = 0;
                                        _context6.t0 = doc.type;
                                        _context6.next = _context6.t0 === 'document' ? 4 : _context6.t0 === 'folder' ? 17 : 30;
                                        break;

                                    case 4:
                                        _context6.next = 6;
                                        return JSManagement.addJS('ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName);

                                    case 6:
                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName] = 'viewerFolderFunction';

                                        _context6.prev = 7;
                                        _context6.next = 10;
                                        return viewerFolderFunction($uibModal, JSManagement, CSSManagement, service, { uuid: doc.uuid, type: 'document' }, profile);

                                    case 10:
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        _context6.next = 16;
                                        break;

                                    case 13:
                                        _context6.prev = 13;
                                        _context6.t1 = _context6['catch'](7);

                                        console.error(_context6.t1);

                                    case 16:
                                        return _context6.abrupt('break', 32);

                                    case 17:
                                        _context6.next = 19;
                                        return JSManagement.addJS('ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName);

                                    case 19:
                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/viewerFolderFunction.js?dev=' + randomVersionName] = 'viewerFolderFunction';

                                        _context6.prev = 20;
                                        _context6.next = 23;
                                        return viewerFolderFunction($uibModal, JSManagement, CSSManagement, service, { uuid: doc.uuid, type: 'folder' }, profile);

                                    case 23:
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        _context6.next = 29;
                                        break;

                                    case 26:
                                        _context6.prev = 26;
                                        _context6.t2 = _context6['catch'](20);

                                        console.error(_context6.t2);

                                    case 29:
                                        return _context6.abrupt('break', 32);

                                    case 30:
                                        toaster.pop("error", "", "امکان نمایش محتوای آیتم انتخابی وجود ندارد.");
                                        return _context6.abrupt('break', 32);

                                    case 32:
                                        _context6.next = 38;
                                        break;

                                    case 34:
                                        _context6.prev = 34;
                                        _context6.t3 = _context6['catch'](0);

                                        toaster.pop("error", "", "امکان نمایش محتوای آیتم انتخابی وجود ندارد.");
                                        console.error(_context6.t3);

                                    case 38:
                                    case 'end':
                                        return _context6.stop();
                                }
                            }
                        }, _callee6, _this, [[0, 34], [7, 13], [20, 26]]);
                    }));

                    return function (_x5) {
                        return _ref6.apply(this, arguments);
                    };
                }();

                $scope.func.clearModal = function () {
                    return new Promise(function (resolve, reject) {
                        try {} catch (e) {
                            console.error(e);
                        } finally {
                            resolve(true);
                        }
                    });
                };

                $scope.func.exit = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    _context7.next = 2;
                                    return $scope.func.clearModal();

                                case 2:
                                    $uibModalInstance.close(true);

                                case 3:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, _this);
                }));

                $scope.func.orderBy = function (headerKey) {
                    try {
                        (function () {
                            $scope.data.sort.type = headerKey;
                            $scope.data.sort.ascDesc = !$scope.data.sort.ascDesc;
                            var ascOrDesc = $scope.data.sort.ascDesc ? 1 : -1;
                            $scope.data.list = _.orderBy($scope.data.list, function (i) {
                                return i.list[headerKey].value * ascOrDesc;
                            });
                        })();
                    } catch (e) {
                        console.error(e);
                    } finally {
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    }
                };

                //run block
                {
                    $scope.data.itemsPagination.pageChanged();
                }
            },
            size: 'lg',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                profile: function profile() {
                    return _profile;
                },
                service: function service() {
                    return _service;
                },
                query: function query() {
                    return _query;
                },
                miladiToJalali: function miladiToJalali() {
                    return _miladiToJalali;
                }
            }
        });
        modalInstance.result.then(function (response) {}, function (error) {
            return reject('انصراف از حذف نقشه انتخابی');
        });
    });
};