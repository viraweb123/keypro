"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advanceFillItemsAdvanceCtrl = function advanceFillItemsAdvanceCtrl($scope, advanceService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.advanceFillItems = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(search, rejection, resolvtion) {
                    var date, _date, res, mimeIndex, filters, filter;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;


                                    //TODO Keywords
                                    if (typeof search.keywords !== "undefined" && _.isArray(search.keywords)) {
                                        _.forEach(search.keywords, function (keyword) {
                                            if (!$scope.data.filters["keywords-" + keyword.term]) {
                                                $scope.data.filters["keywords-" + keyword.term] = {
                                                    title: "کلید واژه : " + keyword.term,
                                                    value: _.clone(keyword.term),
                                                    type: "keyWord"
                                                };
                                            }
                                        });
                                    }

                                    //TODO start and finish time

                                    if (!_.has(search, 'lastModifiedFrom')) {
                                        _context.next = 12;
                                        break;
                                    }

                                    _context.next = 5;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/miladiToJalaliWidthStandardDate.js?dev=" + randomVersionName);

                                case 5:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/miladiToJalaliWidthStandardDate.js?dev=" + randomVersionName] = 'miladiToJalaliWidthStandardDate';

                                    if (!_.isString(search.lastModifiedFrom)) {
                                        try {
                                            $scope.data.advanceOBJ.date['from'] = new Date(search.lastModifiedFrom.year, search.lastModifiedFrom.month, search.lastModifiedFrom.dayOfMonth, search.lastModifiedFrom.hourOfDay, search.lastModifiedFrom.minute, search.lastModifiedFrom.second);
                                        } catch (e) {}
                                    } else if (search.lastModifiedFrom != "") {
                                        try {
                                            $scope.data.advanceOBJ.date['from'] = new Date(Date.parse(search.lastModifiedFrom));
                                        } catch (e) {}
                                    }

                                    if (!($scope.data.advanceOBJ.date['from'] != null)) {
                                        _context.next = 12;
                                        break;
                                    }

                                    _context.next = 10;
                                    return miladiToJalaliWidthStandardDate($scope.data.advanceOBJ.date['from']);

                                case 10:
                                    date = _context.sent;

                                    $scope.data.filters['system-data-from'] = {
                                        title: ('from' == 'from' ? 'شروع' : 'پایان') + " زمان ویرایش : " + date,
                                        value: _.clone($scope.data.advanceOBJ.date['from']),
                                        pointer: $scope.data.advanceOBJ.date,
                                        type: "date",
                                        bind: 'from',
                                        removeValue: null
                                    };

                                case 12:
                                    if (!_.has(search, 'lastModifiedTo')) {
                                        _context.next = 22;
                                        break;
                                    }

                                    _context.next = 15;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/miladiToJalaliWidthStandardDate.js?dev=" + randomVersionName);

                                case 15:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/miladiToJalaliWidthStandardDate.js?dev=" + randomVersionName] = 'miladiToJalaliWidthStandardDate';

                                    if (!_.isString(search.lastModifiedTo)) {
                                        try {
                                            $scope.data.advanceOBJ.date['to'] = new Date(search.lastModifiedTo.year, search.lastModifiedTo.month, search.lastModifiedTo.dayOfMonth, search.lastModifiedTo.hourOfDay, search.lastModifiedTo.minute, search.lastModifiedTo.second);
                                        } catch (e) {}
                                    } else if (search.lastModifiedTo != "") {
                                        try {
                                            $scope.data.advanceOBJ.date['to'] = new Date(Date.parse(search.lastModifiedTo));
                                        } catch (e) {}
                                    }

                                    if (!($scope.data.advanceOBJ.date['to'] != null)) {
                                        _context.next = 22;
                                        break;
                                    }

                                    _context.next = 20;
                                    return miladiToJalaliWidthStandardDate($scope.data.advanceOBJ.date['to']);

                                case 20:
                                    _date = _context.sent;

                                    $scope.data.filters['system-data-to'] = {
                                        title: ('from' == 'to' ? 'شروع' : 'پایان') + " زمان ویرایش : " + _date,
                                        value: _.clone($scope.data.advanceOBJ.date['to']),
                                        pointer: $scope.data.advanceOBJ.date,
                                        type: "date",
                                        bind: 'to',
                                        removeValue: null
                                    };

                                case 22:

                                    //TODO Categories
                                    if (typeof search.categories !== "undefined" && _.isArray(search.categories)) {
                                        _.forEach(search.categories, function (category) {
                                            if (!_.has($scope.data.filters, "category-filter-" + category.term)) {
                                                $scope.data.filters["category-filter-" + category.term] = {
                                                    title: category.title,
                                                    value: _.clone(category.term),
                                                    type: "category"
                                                };
                                            }
                                        });
                                    }

                                    //TODO Notes
                                    if (typeof search.notes !== "undefined" && _.isArray(search.notes)) {
                                        _.forEach(search.notes, function (note) {
                                            if (!$scope.data.filters["notes-" + note.term]) {
                                                $scope.data.filters["notes-" + note.term] = {
                                                    title: "یادداشت :   " + note.term,
                                                    value: _.clone(note.term),
                                                    type: "note"
                                                };
                                            }
                                        });
                                    }

                                    //TODO Systematic
                                    $scope.data.advanceOBJ.path = _.clone(search.path);
                                    if (!_.includes([null, ""], $scope.data.advanceOBJ.path)) $scope.data.filters['path-filter'] = {
                                        title: "مسیر : " + search.path,
                                        value: _.clone(search.path),
                                        pointer: $scope.data.advanceOBJ,
                                        type: "path",
                                        bind: 'path',
                                        removeValue: null
                                    };
                                    _context.next = 28;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName);

                                case 28:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=" + randomVersionName] = 'getPermisionArray';

                                    res = getPermisionArray(angular.copy(search.domain));

                                    //TODO domain

                                    if (res[1] == 1) {
                                        $scope.data.advanceOBJ['email'] = 4;
                                        $scope.data.filters["systematic-domain-email-filter"] = {
                                            title: "" + $scope.data.domainLookUp['email'],
                                            value: _.clone(parseInt($scope.data.advanceOBJ['email'])),
                                            type: "domain",
                                            pointer: $scope.data.advanceOBJ,
                                            bind: 'email',
                                            removeValue: 0
                                        };
                                    }
                                    if (res[2] == 1) {

                                        $scope.data.advanceOBJ.folder = 2;
                                        $scope.data.filters["systematic-domain-folder-filter"] = {
                                            title: "" + $scope.data.domainLookUp['folder'],
                                            value: _.clone(parseInt($scope.data.advanceOBJ['folder'])),
                                            type: "domain",
                                            pointer: $scope.data.advanceOBJ,
                                            bind: 'folder',
                                            removeValue: 0
                                        };
                                    }
                                    if (res[3]) {
                                        $scope.data.advanceOBJ.file = 1;
                                        $scope.data.filters["systematic-domain-file-filter"] = {
                                            title: "" + $scope.data.domainLookUp['file'],
                                            value: _.clone(parseInt($scope.data.advanceOBJ['file'])),
                                            type: "domain",
                                            pointer: $scope.data.advanceOBJ,
                                            bind: 'file',
                                            removeValue: 0
                                        };
                                    }

                                    //TODO author
                                    if (!_.includes([null, ""], search.author)) {
                                        $scope.data.advanceOBJ.author = _.clone(search.author);
                                        $scope.data.filters["author-filter"] = {
                                            title: "نویسنده : " + $scope.data.advanceOBJ.author,
                                            value: _.clone($scope.data.advanceOBJ.author),
                                            pointer: $scope.data.advanceOBJ,
                                            type: "author",
                                            bind: 'author',
                                            removeValue: null
                                        };
                                    }

                                    //TODO mimeType

                                    if (_.includes([null, ""], search.mimeType)) {
                                        _context.next = 43;
                                        break;
                                    }

                                    _context.next = 37;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Public/documentTypesArray.js?dev=" + randomVersionName);

                                case 37:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/documentTypesArray.js?dev=" + randomVersionName] = 'documentTypesArray';
                                    _context.next = 40;
                                    return documentTypesArray();

                                case 40:
                                    $scope.data.documentTypes = _context.sent;
                                    mimeIndex = _.findIndex($scope.data.documentTypes, function (documentType) {
                                        return documentType.value == search.mimeType;
                                    });


                                    if (mimeIndex >= 0) {
                                        $scope.data.advanceOBJ.documentType = $scope.data.documentTypes[mimeIndex];
                                        $scope.data.filters["documentType-filter"] = {
                                            title: "نوع سند  : " + $scope.data.advanceOBJ.documentType.value,
                                            value: _.clone($scope.data.advanceOBJ.documentType.value),
                                            type: "documentType",
                                            pointer: $scope.data.advanceOBJ,
                                            bind: 'documentType',
                                            removeValue: null
                                        };
                                    }

                                case 43:

                                    //TODO content
                                    if (!_.includes([null, ""], search.content.term)) {
                                        $scope.data.filters["content-filter"] = {
                                            title: "محتوا : " + search.content.term,
                                            value: _.clone(search.content.term),
                                            type: "content"
                                        };
                                    }

                                    //TODO properties

                                    if (_.isEqual(search.properties, {})) {
                                        _context.next = 59;
                                        break;
                                    }

                                    _context.next = 47;
                                    return $scope.func.getMetadataList();

                                case 47:
                                    _context.next = 49;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/addMetadatas2Filters.js?dev=" + randomVersionName);

                                case 49:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/addMetadatas2Filters.js?dev=" + randomVersionName] = 'addMetadatas2Filters,createMetaDataObject,metadataAdvanceList';
                                    _context.next = 52;
                                    return JSManagement.addJS("ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=" + randomVersionName);

                                case 52:
                                    $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=" + randomVersionName] = 'miladiToJalaliFunction';
                                    _context.next = 55;
                                    return addMetadatas2Filters(search.properties, advanceService.PropertyGroup, $scope.data.metadatas, miladiToJalaliFunction);

                                case 55:
                                    filters = _context.sent;

                                    for (filter in filters) {
                                        $scope.data.filters[filter] = _.clone(filters[filter]);
                                    }filters = undefined;
                                    _.defer(function () {
                                        $scope.$apply();
                                        resolve(true);
                                    });

                                case 59:
                                    if (_.has(search, 'propertyGroups')) {
                                        $scope.data.filters['propertyGroups'] = {
                                            title: _.clone(search.propertyGroups.title),
                                            value: _.clone(search.propertyGroups.value),
                                            type: "propertyGroups",
                                            key: _.clone(search.propertyGroups.key)
                                        };
                                    }

                                    _.defer(function () {
                                        $scope.$apply();
                                        resolvtion(true);
                                    });
                                    _context.next = 66;
                                    break;

                                case 63:
                                    _context.prev = 63;
                                    _context.t0 = _context["catch"](0);

                                    rejection();

                                case 66:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 63]]);
                }));

                return function (_x, _x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            }();
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};