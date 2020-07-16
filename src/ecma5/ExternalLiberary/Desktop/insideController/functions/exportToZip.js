'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var exportToZipDesktopCtrl = function exportToZipDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.exportToZip = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(currentNode) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!$scope.data.profile.prfMenu.prfFile.exportVisible) {
                                        _context.next = 17;
                                        break;
                                    }

                                    _context.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/convertTozipFolder.js?dev=' + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/convertTozipFolder.js?dev=' + randomVersionName] = 'convertTozipFolderDesktopCtrl';
                                    _context.prev = 4;

                                    $("#show-waiting-get-rest-from-server-id").addClass('show-waiting');
                                    _context.next = 8;
                                    return convertTozipFolderDesktopCtrl(currentNode);

                                case 8:
                                    $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                    _context.next = 15;
                                    break;

                                case 11:
                                    _context.prev = 11;
                                    _context.t0 = _context['catch'](4);

                                    $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                    toaster.pop('error', '', _context.t0);

                                case 15:
                                    _context.next = 19;
                                    break;

                                case 17:
                                    toaster.pop("error", "", "شما مجوز لازم جهت دریافت فایل فشرده را ندارید .");
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 19:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[4, 11]]);
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