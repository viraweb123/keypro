'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advanceSearchAdvanceCtrl = function advanceSearchAdvanceCtrl($scope, advanceService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.advanceSearch = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(offset) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if (_.isEqual($scope.data.filters, {})) {
                                        _context2.next = 4;
                                        break;
                                    }

                                    return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
                                        var filters, query;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        $scope.data.isSearche = false;

                                                        $scope.data.list = [];
                                                        $scope.data.advanceOBJ.offset = offset;

                                                        _context.next = 5;
                                                        return JSManagement.addJS('ecma5/ExternalLiberary/Search/createQueryFromFilters.js?dev=' + randomVersionName);

                                                    case 5:
                                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/createQueryFromFilters.js?dev=' + randomVersionName] = 'createQueryFromFilters,dateFormatInternalCreateQuery';
                                                        _context.next = 8;
                                                        return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliWidthStandardDate.js?dev=' + randomVersionName);

                                                    case 8:
                                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliWidthStandardDate.js?dev=' + randomVersionName] = 'miladiToJalaliWidthStandardDate';
                                                        filters = {};

                                                        _.forEach(_.filter($scope.data.filters, function (filter) {
                                                            return _.includes(["smetadata", "propertyGroups"], filter.type);
                                                        }), function (f) {
                                                            var key = _.first(_.split(f.key, '.'));
                                                            filters[key] = key;
                                                        });

                                                        _context.next = 13;
                                                        return createQueryFromFilters(_.clone($scope.data.filters), // query objects
                                                        $scope.data.advanceOBJ.offset, // offset
                                                        $scope.data.advanceOBJ.range // range
                                                        );

                                                    case 13:
                                                        query = _context.sent;

                                                        if ($scope.data.selectOneKeywordAndMetaData) query += "&metaAndKeywordSet=" + $scope.data.metaAndKeywordSet;

                                                        $scope.data.showType = null;
                                                        $scope.data.isSearched = false;

                                                        advanceService.search.findPaginatedWithCreatedQuery(query).then(function (res) {
                                                            if (res.data.list != null && res.data.total > 0) {
                                                                $scope.data.itemsPagination.totalItems = _.clone(res.data.total);
                                                                $scope.data.total = res.data.total;
                                                                if (_.keys(filters).length == 1 && $scope.data.showTable) $scope.func.generateTable(res.data, _.first(_.keys(filters)));else $scope.func.generateResult(res.data);
                                                            } else {
                                                                $scope.data.isSearched = true;
                                                                $scope.data.itemsPagination.totalItems = -1;
                                                                $scope.data.total = -1;
                                                                $scope.data.itemsPagination.currentPage = 1;
                                                                toaster.pop('info', '', 'موردی جهت نمایش وجود ندارد');
                                                            }
                                                        }, function (error) {
                                                            $scope.data.isSearched = true;
                                                            toaster.pop('info', '', 'در برقراری ارتباط با سرور مشکلی پیش آمده است');
                                                        });

                                                    case 18:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    })(), 't0', 2);

                                case 2:
                                    _context2.next = 5;
                                    break;

                                case 4:
                                    toaster.pop('error', '', 'لطفا حداقل یک فیلتر درج کنید.');

                                case 5:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this);
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