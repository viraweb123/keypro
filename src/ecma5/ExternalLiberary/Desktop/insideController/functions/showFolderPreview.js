'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var showFolderPreviewDesktopCtrl = function showFolderPreviewDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.showFolderPreview = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(e) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    e.preventDefault();
                                    if (_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length == 1 && $scope.data.selectedItems[0].type == 'FOLDER') {

                                        if ($scope.data.selectedItems[0].group == "trash") toaster.pop('warning', "", "امکان نمایش فهرست در آیتم های داخل سطل زباله وجود ندارد");else {
                                            try {
                                                window.open('/third-party/flip/'+ $scope.data.selectedItems[0].uuid +'/'+ decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')), '_blank');
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }
                                    } else {
                                        toaster.pop("warning", "", "لطفا یک پوشه انتخاب کنید");
                                    }

                                case 2:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
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