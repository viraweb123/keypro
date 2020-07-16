'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addKeywordSection2DesktopCtrl = function addKeywordSection2DesktopCtrl($scope, desktopService, JSManagement, toaster, $uibModal) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.data.NewKeyword = null;
            $scope.data.keywords = [];
            $scope.data.sortKeyword = {
                type: null,
                ascDesc: true
            };

            $scope.func.deleteKeyword = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(index) {
                    var response;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!($scope.data.selectedFileOrFolder != null && _.isArray($scope.data.keywords) && $scope.data.selectedFileOrFolder.group != "trash")) {
                                        _context.next = 10;
                                        break;
                                    }

                                    _context.next = 4;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/deleteSelectedKeyword.js?dev=' + randomVersionName);

                                case 4:
                                    _context.next = 6;
                                    return deleteSelectedKeywordCtrl($uibModal);

                                case 6:
                                    response = _context.sent;


                                    if (response == true) {

                                        desktopService.property.removeKeyword($scope.data.selectedFileOrFolder.uuid, $scope.data.keywords[index]).then(function (res) {
                                            $scope.data.keywords.splice(index, 1);
                                            $scope.data.selectedFileOrFolder.keywords = _.clone($scope.data.keywords);
                                            toaster.pop('success', '', 'کلید واژه با موفقیت حذف شد');
                                        }, function (error) {
                                            return toaster.pop('error', '', 'امکان حذف این کلید واژه نیست');
                                        });
                                    }
                                    _context.next = 10;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/deleteSelectedKeyword.js?dev=' + randomVersionName, 'deleteSelectedKeywordCtrl');

                                case 10:
                                    _context.next = 15;
                                    break;

                                case 12:
                                    _context.prev = 12;
                                    _context.t0 = _context['catch'](0);

                                    console.error(_context.t0);

                                case 15:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 12]]);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }();
            $scope.func.addKeyword = function (form) {
                try {
                    if (_.has(form['keyword'], '$setTouched')) form['keyword'].$setTouched();
                    if (form['keyword'].$valid == true) {
                        if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash") {

                            var index = _.findIndex($scope.data.keywords, function (Keyword) {
                                return Keyword == $scope.data.NewKeyword;
                            });

                            //if (!_.includes($scope.data.keywords, $scope.data.NewKeyword)) {
                            if (index < 0) {
                                desktopService.property.addKeyword($scope.data.selectedFileOrFolder.uuid, $scope.data.NewKeyword).then(function (res) {
                                    $scope.data.keywords.push($scope.data.NewKeyword);
                                    $scope.data.selectedFileOrFolder.keywords = _.clone($scope.data.keywords);
                                    $scope.data.NewKeyword = null;
                                    toaster.pop('success', '', 'کلید واژه جدید افزوده شد');
                                }, function (error) {
                                    return toaster.pop('error', '', 'امکان افزودن کلید واژه جدید وجود ندارد');
                                });
                            } else {
                                toaster.pop('error', '', 'این کلید واژه قبلا ثبت شده است');
                                $scope.func.animate('#KeyWordsDoc-' + index);
                            }
                        } else {
                            toaster.pop("error", "", "لطفا یک سند یا پوشه از درخت انتخاب کنید.");
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.showThesaurusTree = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
                                    var response, index;
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _context2.next = 2;
                                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js?dev=' + randomVersionName);

                                                case 2:
                                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/selectThesaurusChild.js?dev=' + randomVersionName] = 'selectThesaurusChild';

                                                    _context2.next = 5;
                                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                                case 5:
                                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';

                                                    _context2.next = 8;
                                                    return selectThesaurusChild($uibModal, //modal func
                                                    desktopService.repository, //repository service
                                                    'getThesaurusFolder', // rootPath
                                                    desktopService.folder, // folder service
                                                    "thesaurus", getNameFromPath);

                                                case 8:
                                                    response = _context2.sent;


                                                    if (_.has(response, 'addNode') && !_.isEmpty(response.addNode)) if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash") {
                                                        index = _.findIndex($scope.data.keywords, function (Keyword) {
                                                            return Keyword == response.addNode.label;
                                                        });

                                                        //if (!_.includes($scope.data.keywords, $scope.data.NewKeyword)) {

                                                        if (index < 0) {
                                                            desktopService.property.addKeyword($scope.data.selectedFileOrFolder.uuid, response.addNode.label).then(function (res) {
                                                                $scope.data.keywords.push(response.addNode.label);
                                                                $scope.data.selectedFileOrFolder.keywords = _.clone($scope.data.keywords);
                                                                toaster.pop('success', '', 'کلید واژه جدید افزوده شد');
                                                            }, function (error) {
                                                                return toaster.pop('error', '', 'امکان افزودن کلید واژه جدید وجود ندارد');
                                                            });
                                                        } else {
                                                            toaster.pop('error', '', 'این کلید واژه قبلا ثبت شده است');
                                                            $scope.func.animate('#KeyWordsDoc-' + index);
                                                        }
                                                    }

                                                case 10:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, _this);
                                })(), 't0', 2);

                            case 2:
                                _context3.next = 7;
                                break;

                            case 4:
                                _context3.prev = 4;
                                _context3.t1 = _context3['catch'](0);

                                console.error(_context3.t1);

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this, [[0, 4]]);
            }));

            $scope.func.runKeyword = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                try {
                                    if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash") {
                                        desktopService[$scope.data.lookupTableType[$scope.data.selectedFileOrFolder.type]].getProperties($scope.data.selectedFileOrFolder.uuid).then(function (res) {
                                            var result = _.clone(res.data.originalElement[$scope.data.lookupTableType[$scope.data.selectedFileOrFolder.type]]);
                                            $scope.data.keywords = undefined;
                                            $scope.data.keywords = $scope.func.convertArray(result.keywords || undefined);
                                        }, function (error) {
                                            $scope.data.keywords = undefined;
                                            $scope.data.keywords = [];
                                            toaster.pop('error', '', 'امکان دریافت لیست کلید واژه ها وجود ندارد');
                                        });
                                    }
                                } catch (e) {
                                    console.error(e);
                                }

                            case 1:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};