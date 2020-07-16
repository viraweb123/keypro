'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var simpleaddTemplatesSearchSimpleCtrl = function simpleaddTemplatesSearchSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.simpleaddTemplatesSearch = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(item) {
                    var isTemplates, result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    if (!(item.type == "folder")) {
                                        _context.next = 20;
                                        break;
                                    }

                                    _context.next = 4;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                                case 4:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';

                                    isTemplates = getPermisionArray(item.permissions);

                                    if (!isTemplates[2]) {
                                        _context.next = 17;
                                        break;
                                    }

                                    _context.next = 9;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/selectTemplateCtrl.js?dev=' + randomVersionName);

                                case 9:
                                    _context.next = 11;
                                    return selectTemplateCtrl($uibModal, JSManagement, simpleService, 'getTemplatesFolder', item.path);

                                case 11:
                                    result = _context.sent;
                                    _context.next = 14;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Desktop/selectTemplateCtrl.js?dev=' + randomVersionName, 'selectTemplateCtrl');

                                case 14:

                                    simpleService.document.createFromTemplate(result).then(function (res) {
                                        toaster.pop("success", "", "الگو با موفقیت ایجاد گردید.");
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    }, function (err) {
                                        console.error(e);
                                        toaster.pop("error", "", "مشکلی در ایجاد الگو به وجود آمده است.");
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    });

                                    _context.next = 18;
                                    break;

                                case 17:
                                    toaster.pop('warning', "", ' امکان افزودن الگو به پوشه ' + item.name + ' وجود ندارد ');

                                case 18:
                                    _context.next = 21;
                                    break;

                                case 20:
                                    toaster.pop('error', "", "لطفا یک پوشه انتخاب کنید");

                                case 21:
                                    _context.next = 27;
                                    break;

                                case 23:
                                    _context.prev = 23;
                                    _context.t0 = _context['catch'](0);

                                    toaster.pop("error", "", "مشکلی در ایجاد الگو به وجود آمده است.");
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 27:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 23]]);
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