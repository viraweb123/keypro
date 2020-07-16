'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addNoteSection2DesktopCtrl = function addNoteSection2DesktopCtrl($scope, desktopService, JSManagement, toaster, $uibModal) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.data.note = {
                text: null,
                action: 'create',
                isActive: -1
            };
            $scope.data.notes = [];

            $scope.func.editNote = function (note) {
                try {
                    $scope.data.note = {
                        text: _.clone(note.text),
                        action: 'edit',
                        isActive: _.clone(note.path)
                    };
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.noteCancel = function () {
                try {
                    $scope.data.note = {
                        text: null,
                        isActive: -1
                    };
                    _.defer(function () {
                        return $scope.$apply();
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.editOrCreateNote = function () {
                try {
                    if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash") {
                        if (!_.includes([null, ''], $scope.data.note.text)) {
                            if ($scope.data.note.isActive == -1) desktopService.note.create($scope.data.selectedFileOrFolder.uuid, $scope.data.note.text).then(function () {
                                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(res) {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.next = 2;
                                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                                                case 2:
                                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';
                                                    _context.next = 5;
                                                    return miladiToJalaliFunction(res.data.note.date);

                                                case 5:
                                                    res.data.note.jalalidate = _context.sent;

                                                    $scope.data.notes.push(res.data.note);
                                                    $scope.data.note.isActive = res.data.note.path;
                                                    toaster.pop('success', '', 'یادداشت با موفقیت اضافه گردید');
                                                    _.defer(function () {
                                                        return $scope.$apply();
                                                    });

                                                case 10:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                }));

                                return function (_x) {
                                    return _ref.apply(this, arguments);
                                };
                            }(), function (error) {
                                return toaster.pop('error', '', 'امکان افزودن یادداشت جدید نیست');
                            });else desktopService.note.edit($scope.data.note.isActive, $scope.data.note.text).then(function (res) {
                                var index = _.findIndex($scope.data.notes, function (noteItem) {
                                    return $scope.data.note.isActive == noteItem.path;
                                });
                                if (index >= 0) $scope.data.notes[index].text = _.clone(res.data.config.data);
                                toaster.pop('success', '', 'یادداشت با موفقیت اضافه گردید');
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            }, function (error) {
                                return toaster.pop('error', '', 'امکان ویرایش یادداشت جدید نیست');
                            });
                        } else toaster.pop('error', '', 'لطفا یک عبارت وارد کنید');
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            $scope.func.removeNote = function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(note) {
                    var response;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;

                                    if (!($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash")) {
                                        _context2.next = 10;
                                        break;
                                    }

                                    _context2.next = 4;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/deleteSelectedNote.js?dev=' + randomVersionName);

                                case 4:
                                    _context2.next = 6;
                                    return deleteSelectedNoteCtrl($uibModal);

                                case 6:
                                    response = _context2.sent;


                                    if (response) {
                                        desktopService.note.delete(note.path).then(function (res) {
                                            _.remove($scope.data.notes, function (n) {
                                                return n.path == note.path;
                                            });

                                            if (note.path == $scope.data.note.isActive) $scope.data.note = {
                                                text: null,
                                                action: 'create',
                                                isActive: -1
                                            };
                                            toaster.pop('success', '', 'یادداشت با موفقیت حذف گردید');
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        }, function (error) {
                                            return toaster.pop('error', '', 'امکان حذف این یادداشت نیست');
                                        });
                                    }
                                    _context2.next = 10;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Public/deleteSelectedNote.js?dev=' + randomVersionName, 'deleteSelectedNoteCtrl');

                                case 10:
                                    _context2.next = 15;
                                    break;

                                case 12:
                                    _context2.prev = 12;
                                    _context2.t0 = _context2['catch'](0);

                                    console.error(_context2.t0);

                                case 15:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[0, 12]]);
                }));

                return function (_x2) {
                    return _ref2.apply(this, arguments);
                };
            }();

            $scope.func.runNote = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                try {
                                    if ($scope.data.selectedFileOrFolder != null && $scope.data.selectedFileOrFolder.group != "trash") {
                                        desktopService.note.list($scope.data.selectedFileOrFolder.uuid).then(function (res) {
                                            if (res.data.list != null) _.forEach(res.data.list, function () {
                                                var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(note) {
                                                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                                        while (1) {
                                                            switch (_context3.prev = _context3.next) {
                                                                case 0:
                                                                    _context3.next = 2;
                                                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                                                                case 2:
                                                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';
                                                                    _context3.next = 5;
                                                                    return miladiToJalaliFunction(note.date);

                                                                case 5:
                                                                    note.jalalidate = _context3.sent;

                                                                case 6:
                                                                case 'end':
                                                                    return _context3.stop();
                                                            }
                                                        }
                                                    }, _callee3, _this);
                                                }));

                                                return function (_x3) {
                                                    return _ref4.apply(this, arguments);
                                                };
                                            }());
                                            $scope.data.notes = res.data.list || [];
                                            $scope.data.note = {
                                                text: null,
                                                action: 'create',
                                                isActive: -1
                                            };
                                        }, function (error) {
                                            $scope.data.notes = undefined;
                                            $scope.data.notes = [];
                                            $scope.data.note = undefined;
                                            $scope.data.note = {
                                                text: null,
                                                action: 'create',
                                                isActive: -1
                                            };
                                            toaster.pop('error', '', 'امکان دریافت لیست نکات وجود ندارد');
                                        });
                                    } else {
                                        $scope.data.notes = undefined;
                                        $scope.data.notes = [];
                                        $scope.data.note = undefined;
                                        $scope.data.note = {
                                            text: null,
                                            action: 'create',
                                            isActive: -1
                                        };
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