"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advanceEraseAdvanceCtrl = function advanceEraseAdvanceCtrl($scope, advanceService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.advanceErase = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                try {
                                    $scope.data.isSearched = false;
                                    $scope.data.sort = {
                                        type: null,
                                        ascDesc: true
                                    };
                                    $scope.data.list = [];
                                    $scope.data.total = -1;
                                    $scope.data.filters = {};
                                    $scope.data.metaAndKeywordSet = false;
                                    $scope.data.selectOneKeywordAndMetaData = false;
                                    $scope.data.advanceOBJ = {
                                        mainAdvance: null,
                                        offset: 0,
                                        range: 5,
                                        categoryPushed: false,
                                        categories: {},
                                        contentPushed: false,
                                        content: null,
                                        keywordPushed: false,
                                        keyword: null,
                                        notePushed: false,
                                        note: null,
                                        path: null,
                                        author: null,
                                        date: {
                                            from: null,
                                            to: null
                                        },
                                        systematicPath: null,
                                        documentType: null,
                                        file: 0,
                                        folder: 0,
                                        email: 0,
                                        docName: null
                                    };
                                    try {
                                        window.document.querySelector(".D div." + $scope.data.nav.right.selectedSide).classList.remove("show");
                                    } catch (e) {
                                        console.error(e);
                                    }
                                    $scope.data.nav.right.selectedSide = null;
                                    $scope.data.nav.right.isOpened = false;
                                    $scope.data.nav.left.selectedSide = null;
                                    $scope.data.nav.left.isOpened = false;
                                    $scope.data.metadatas = null;
                                    $scope.data.selectMetadata = null;
                                    $scope.data.metadata = null;
                                    $scope.data.systematicPaths = [];
                                    $scope.data.documentTypes = [];
                                    $scope.data.itemsPagination.totalItems = -1;
                                    $scope.data.itemsPagination.currentPage = 1;
                                    $scope.data.itemsPagination.show = false;
                                    $scope.data.isSearched = false;
                                    $scope.data.showTable = true;
                                    try {
                                        if (_.isFunction($scope.externalScope.InitializationForm)) $scope.externalScope.InitializationForm(null, {});
                                    } catch (e) {
                                        console.error(e);
                                    }
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                } catch (e) {
                                    console.error(e);
                                } finally {
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                }

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};