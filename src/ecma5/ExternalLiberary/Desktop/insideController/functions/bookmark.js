"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var bookmarkDesktopCtrl = function bookmarkDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.bookmark = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var bookmarks;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!_.isArray($scope.data.selectedItems)) {
                                    _context.next = 25;
                                    break;
                                }

                                if (!($scope.data.selectedItems.length == 1)) {
                                    _context.next = 24;
                                    break;
                                }

                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context.next = 7;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان ایجاد علامت گذاری در آیتم های داخل سطل زباله وجود ندارد.");
                                _context.next = 22;
                                break;

                            case 7:
                                _context.next = 9;
                                return desktopService.bookmark.getList();

                            case 9:
                                bookmarks = _context.sent;

                                if (!(bookmarks != null && _.has(bookmarks, 'data') && bookmarks.data != null && _.has(bookmarks.data, 'originalElement'))) {
                                    _context.next = 21;
                                    break;
                                }

                                bookmarks = _.isArray(bookmarks.data.originalElement) ? bookmarks.data.originalElement : [bookmarks.data.originalElement];
                                _.remove(bookmarks, function (bookmark) {
                                    return bookmark.node != $scope.data.selectedItems[0].uuid;
                                });
                                bookmarks = _.keyBy(bookmarks, 'id');
                                _context.next = 16;
                                return JSManagement.addJS("ecma5/ExternalLiberary/Desktop/addBookmarkDesktopCtrl.js?dev=" + randomVersionName);

                            case 16:
                                $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Desktop/addBookmarkDesktopCtrl.js?dev=" + randomVersionName] = 'addBookmarkDesktopCtrl';
                                _context.next = 19;
                                return addBookmarkDesktopCtrl($uibModal, desktopService.bookmark, _.clone($scope.data.selectedItems[0].name), $scope.data.selectedItems[0].path, bookmarks);

                            case 19:
                                _context.next = 22;
                                break;

                            case 21:
                                toaster.pop('error', "", "مشکلی در ایجاد علامت جدید به وجود آمده است.");

                            case 22:
                                _context.next = 25;
                                break;

                            case 24:
                                toaster.pop('error', "", "لطفا فقط یک سند یا پوشه انتخاب کنید.");

                            case 25:
                                _context.next = 30;
                                break;

                            case 27:
                                _context.prev = 27;
                                _context.t0 = _context["catch"](0);

                                console.error(_context.t0);

                            case 30:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 27]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};