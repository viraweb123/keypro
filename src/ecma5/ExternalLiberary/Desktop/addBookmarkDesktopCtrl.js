"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var addBookmarkDesktopCtrl = function addBookmarkDesktopCtrl(uibModal, _service, _defaultName, _path, _bookmarks) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            var modalInstance = uibModal.open({
                templateUrl: "ecma5/ExternalLiberary/Desktop/addBookmark.html?dev=" + randomVersionName,
                controller: function controller($scope, $uibModalInstance, $uibModal, toaster, service, defaultName, path, bookmarks) {

                    $scope.data = {
                        bookmarks: angular.copy(bookmarks),
                        bookmark: {
                            name: _.clone(defaultName).replace(/\.[^\.]+$/, "")
                        }
                    };

                    $scope.func = {};

                    $scope.func.cancelBookmark = function () {
                        $scope.data.bookmark = {
                            name: ""
                        };
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    };

                    $scope.func.editBookmark = function () {
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(key) {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            try {
                                                $scope.data.bookmark = angular.copy($scope.data.bookmarks[key]);
                                            } catch (e) {
                                                toaster.pop("error", "", "مشکلی در ویرایش علامت به وجود آمده است.");
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

                        return function (_x) {
                            return _ref.apply(this, arguments);
                        };
                    }();

                    $scope.func.editOrCreateBookMark = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                        var index;
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        try {

                                            if ($scope.bookmarkForm.txtBookmarkName.hasOwnProperty('$setTouched')) $scope.bookmarkForm.txtBookmarkName.$setTouched();
                                            if ($scope.bookmarkForm.txtBookmarkName.$valid == true) {
                                                index = _.findIndex(_.map($scope.data.bookmarks, 'name'), function (name) {
                                                    return name == $scope.data.bookmark.name;
                                                });

                                                if (index < 0) {
                                                    (function () {

                                                        var query = '',
                                                            type = '',
                                                            message = '';
                                                        if (_.has($scope.data.bookmark, 'id')) {
                                                            query = "bmId=" + $scope.data.bookmark.id + "&newName=" + $scope.data.bookmark.name;
                                                            type = 'rename';
                                                            message = 'علامت با موفقیت ویرایش گردید.';
                                                        } else {
                                                            query = "nodePath=" + path + "&name=" + $scope.data.bookmark.name;
                                                            type = 'add';
                                                            message = 'علامت با موفقیت افزوده شد.';
                                                        }

                                                        service.editOrCreateBookmark(query, type).then(function (res) {
                                                            try {
                                                                $scope.data.bookmarks[res.data.data.originalElement.id] = angular.copy(res.data.data.originalElement);
                                                                toaster.pop("success", "", message);
                                                            } catch (e) {
                                                                toaster.pop("error", "", "مشکلی در ایجاد علامت گذاری فایل به وجود آمده است.");
                                                            } finally {
                                                                $scope.func.cancelBookmark();
                                                            }
                                                        }, function (err) {
                                                            toaster.pop("error", "", "مشکلی در ایجاد علامت گذاری فایل به وجود آمده است.");
                                                        });
                                                    })();
                                                } else toaster.pop("error", "", "علامتی با این نام در جدول وجود دارد.");
                                            } else toaster.pop("error", "", "مشکلی در ایجاد علامت گذاری فایل به وجود آمده است.");
                                        } catch (e) {
                                            toaster.pop("error", "", "مشکلی در ویرایش علامت به وجود آمده است.");
                                            $scope.func.cancelBookmark();
                                        }

                                    case 1:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        }, _callee2, _this);
                    }));

                    $scope.func.removeBookmark = function () {
                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(key) {
                            var res;
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.prev = 0;
                                            _context3.next = 3;
                                            return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/removeBookmarkCtrl.js?dev=" + randomVersionName);

                                        case 3:
                                            _context3.next = 5;
                                            return removeBookmarkCtrl($uibModal);

                                        case 5:
                                            res = _context3.sent;

                                            if (!res) {
                                                _context3.next = 12;
                                                break;
                                            }

                                            _context3.next = 9;
                                            return service.remove($scope.data.bookmarks[key].id);

                                        case 9:
                                            //$scope.data.bookmarks.splice(index, 1);
                                            $scope.data.bookmarks[key] = undefined;
                                            delete $scope.data.bookmarks[key];
                                            toaster.pop("success", "", "علامت با موفقیت حذف گردید.");

                                        case 12:
                                            _context3.next = 17;
                                            break;

                                        case 14:
                                            _context3.prev = 14;
                                            _context3.t0 = _context3["catch"](0);

                                            toaster.pop("error", "", "مشکلی در حذف علامت به وجود آمده است.");

                                        case 17:
                                            _context3.prev = 17;
                                            _context3.prev = 18;
                                            _context3.next = 21;
                                            return JSManagement.removeJS("ecma5/ExternalLiberary/Desktop/removeBookmarkCtrl.js?dev=" + randomVersionName, 'removeBookmarkCtrl');

                                        case 21:
                                            _context3.next = 26;
                                            break;

                                        case 23:
                                            _context3.prev = 23;
                                            _context3.t1 = _context3["catch"](18);

                                            console.error(_context3.t1);

                                        case 26:
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            return _context3.finish(17);

                                        case 28:

                                            console.log($scope.data.bookmarks[key]);

                                        case 29:
                                        case "end":
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, _this, [[0, 14, 17, 28], [18, 23]]);
                        }));

                        return function (_x2) {
                            return _ref3.apply(this, arguments);
                        };
                    }();

                    $scope.func.createBookMark = function () {
                        return $uibModalInstance.close(true);
                    };

                    $scope.func.cancel = function () {
                        return $uibModalInstance.close(true);
                    };
                },
                size: 'md',
                backdrop: 'static', // false,
                keyboard: false,
                resolve: {
                    service: function service() {
                        return _service;
                    },
                    defaultName: function defaultName() {
                        return _defaultName;
                    },
                    path: function path() {
                        return _path;
                    },
                    bookmarks: function bookmarks() {
                        return _bookmarks;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                resolve(response);
            }, function (error) {
                return reject('مشکل در ایجاد علامت جدید');
            });
        } catch (e) {
            reject('مشکل در ایجاد علامت جدید');
        }
    });
};