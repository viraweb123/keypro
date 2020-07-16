'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var simpleAddToRelationsSimpleCtrl = function simpleAddToRelationsSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.simpleAddToRelations = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(sendItem) {
                    var item, result, relations;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    item = _.clone(sendItem);
                                    _context.prev = 1;
                                    _context.next = 4;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/selectNewRelationCtrl.js?dev=' + randomVersionName);

                                case 4:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/selectNewRelationCtrl.js?dev=' + randomVersionName] = 'selectNewRelationCtrl';
                                    _context.next = 7;
                                    return selectNewRelationCtrl($uibModal);

                                case 7:
                                    result = _context.sent;
                                    _context.prev = 8;
                                    _context.next = 11;
                                    return getSelectedLocalStorage('relations');

                                case 11:
                                    relations = _context.sent;

                                    if (relations == null) relations = {
                                        header: null,
                                        footers: {}
                                    };

                                    if (_.has(item, 'thumbnailSrc')) {
                                        _context.next = 29;
                                        break;
                                    }

                                    if (!_.has(item, 'type')) {
                                        _context.next = 29;
                                        break;
                                    }

                                    _context.t0 = item.type;
                                    _context.next = _context.t0 === 'document' ? 18 : _context.t0 === 'folder' ? 26 : 29;
                                    break;

                                case 18:
                                    _context.next = 20;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                case 20:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType';
                                    _context.next = 23;
                                    return $scope.func.getImageLocal(item);

                                case 23:
                                    item.thumbnailSrc = _context.sent;

                                    item.name = item.path.split("/").pop();
                                    return _context.abrupt('break', 29);

                                case 26:
                                    item.thumbnailSrc = '../../../../static/image/folder' + (item.hasChildren ? 's' : '') + '.png';
                                    item.name = item.path.split("/").pop();
                                    return _context.abrupt('break', 29);

                                case 29:

                                    if (result.isHeader) relations.header = _.clone(item);else relations.footers[item.uuid] = _.clone(item);
                                    _context.prev = 30;
                                    _context.next = 33;
                                    return setSelectedLocalStorage(_.clone(relations), 'relations');

                                case 33:
                                    _context.next = 38;
                                    break;

                                case 35:
                                    _context.prev = 35;
                                    _context.t1 = _context['catch'](30);

                                    console.error(_context.t1);

                                case 38:
                                    $scope.data.relationStorage = _.clone(relations);
                                    relations = undefined;
                                    item = undefined;
                                    _context.next = 46;
                                    break;

                                case 43:
                                    _context.prev = 43;
                                    _context.t2 = _context['catch'](8);

                                    console.error(_context.t2);

                                case 46:
                                    _context.next = 51;
                                    break;

                                case 48:
                                    _context.prev = 48;
                                    _context.t3 = _context['catch'](1);

                                    console.error(_context.t3);

                                case 51:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[1, 48], [8, 43], [30, 35]]);
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