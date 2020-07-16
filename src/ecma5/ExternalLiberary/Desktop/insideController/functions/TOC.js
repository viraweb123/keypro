'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var TOCDesktopCtrl = function TOCDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.TOC = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(e) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    e.preventDefault();

                                    if (!(_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length == 1 && $scope.data.selectedItems[0].type == 'FOLDER')) {
                                        _context.next = 49;
                                        break;
                                    }

                                    if (!($scope.data.selectedItems[0].group == "trash")) {
                                        _context.next = 6;
                                        break;
                                    }

                                    toaster.pop('warning', "", "امکان نمایش فهرست در آیتم های داخل سطل زباله وجود ندارد");
                                    _context.next = 47;
                                    break;

                                case 6:
                                    _context.prev = 6;
                                    _context.prev = 7;
                                    _context.next = 10;
                                    return CSSManagement.addCSS('ecma5/Modules/Map/map.css?dev=' + randomVersionName);

                                case 10:
                                    _context.next = 12;
                                    return CSSManagement.addCSS('resource/styleSheet/ol.css?dev=' + randomVersionName);

                                case 12:
                                    _context.next = 14;
                                    return JSManagement.addJS('resource/javaScript/ol.js?dev=' + randomVersionName);

                                case 14:
                                    _context.next = 16;
                                    return JSManagement.addJS('static/js/ol3-ext_interaction_transforminteraction.js?dev=' + randomVersionName);

                                case 16:
                                    _context.next = 21;
                                    break;

                                case 18:
                                    _context.prev = 18;
                                    _context.t0 = _context['catch'](7);

                                    console.error(_context.t0);

                                case 21:
                                    _context.next = 23;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/viewTOCCtrl.js?dev=' + randomVersionName);

                                case 23:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/viewTOCCtrl.js?dev=' + randomVersionName] = 'viewTOCCtrl';
                                    _context.next = 26;
                                    return viewTOCCtrl($uibModal, JSManagement, CSSManagement, desktopService, $scope.data.selectedItems[0], Authentication);

                                case 26:
                                    _context.next = 31;
                                    break;

                                case 28:
                                    _context.prev = 28;
                                    _context.t1 = _context['catch'](6);

                                    console.error(_context.t1);

                                case 31:
                                    _context.prev = 31;
                                    _context.prev = 32;
                                    _context.next = 35;
                                    return CSSManagement.removeCSS('ecma5/Modules/Map/map.css?dev=' + randomVersionName);

                                case 35:
                                    _context.next = 37;
                                    return CSSManagement.removeCSS('resource/styleSheet/ol.css?dev=' + randomVersionName);

                                case 37:
                                    _context.next = 39;
                                    return JSManagement.removeJS('static/js/ol3-ext_interaction_transforminteraction.js?dev=' + randomVersionName, '');

                                case 39:
                                    _context.next = 41;
                                    return JSManagement.removeJS('resource/javaScript/ol.js?dev=' + randomVersionName, 'ol');

                                case 41:
                                    _context.next = 46;
                                    break;

                                case 43:
                                    _context.prev = 43;
                                    _context.t2 = _context['catch'](32);

                                    console.error(_context.t2);

                                case 46:
                                    return _context.finish(31);

                                case 47:
                                    _context.next = 50;
                                    break;

                                case 49:
                                    toaster.pop("warning", "", "لطفا یک پوشه انتخاب کنید");

                                case 50:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[6, 28, 31, 47], [7, 18], [32, 43]]);
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