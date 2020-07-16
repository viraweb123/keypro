'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advanceFillSateAdvanceCtrl = function advanceFillSateAdvanceCtrl($scope, advanceService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.advanceFillSate = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var result, item, id, advanceState;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.prev = 1;
                                _context.prev = 2;
                                _context.next = 5;
                                return getSelectedLocalStorage('selectedMetadataState');

                            case 5:
                                result = _context.sent;

                                $scope.data.clipboardFolder = angular.copy(result);
                                result = undefined;
                                _context.next = 13;
                                break;

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](2);

                                console.error(_context.t0);

                            case 13:
                                _context.next = 15;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/saveChangeStateVar.js?dev=' + randomVersionName);

                            case 15:
                                _context.next = 17;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/saveStateVariablesFunction.js?dev=' + randomVersionName);

                            case 17:
                                _context.next = 19;
                                return getStateVarFunction();

                            case 19:
                                item = _context.sent;

                                if (!(item != undefined && _.has(item, 'advance'))) {
                                    _context.next = 29;
                                    break;
                                }

                                id = _.clone(item.advance.id);
                                _context.next = 24;
                                return setStateVarFunction(undefined);

                            case 24:
                                $scope.data.nav.right.select('newsVisible', id);
                                _context.next = 27;
                                return setStateVariablesFunction(undefined, 'advance');

                            case 27:
                                _context.next = 41;
                                break;

                            case 29:
                                _context.next = 31;
                                return getSelectedLocalStorage('state.advance');

                            case 31:
                                advanceState = _context.sent;

                                if (!(advanceState == null)) {
                                    _context.next = 34;
                                    break;
                                }

                                throw "error";

                            case 34:

                                $scope.data.advanceOBJ.offset = _.clone(advanceState.offset);
                                $scope.data.advanceOBJ.range = _.clone(advanceState.range);

                                _context.next = 38;
                                return $scope.func.fillItems(_.clone(advanceState.filters));

                            case 38:
                                try {
                                    $scope.data.metaAndKeywordSet = _.clone(advanceState.filters.metaAndKeywordSet);
                                    $scope.data.selectOneKeywordAndMetaData = _.clone($scope.data.metaAndKeywordSet);
                                } catch (e) {
                                    $scope.data.selectOneKeywordAndMetaData = false;
                                    $scope.data.selectOneKeywordAndMetaData = false;
                                    console.error(e);
                                }
                                $scope.data.itemsPagination.currentPage = Math.ceil(($scope.data.advanceOBJ.offset + 1) / $scope.data.advanceOBJ.range);
                                $scope.func.search($scope.data.advanceOBJ.offset);

                            case 41:
                                _context.next = 46;
                                break;

                            case 43:
                                _context.prev = 43;
                                _context.t1 = _context['catch'](1);

                                console.error(_context.t1.message || _context.t1);

                            case 46:
                                _context.prev = 46;
                                _context.prev = 47;
                                _context.next = 50;
                                return removeSelectedLocalStorage('state.advance');

                            case 50:
                                _context.next = 55;
                                break;

                            case 52:
                                _context.prev = 52;
                                _context.t2 = _context['catch'](47);

                                console.error(_context.t2);

                            case 55:
                                _context.prev = 55;
                                _context.next = 58;
                                return getSelectedLocalStorage('clipBoardResults');

                            case 58:
                                $scope.data.selectedClipBoardStorage = _context.sent;

                                if ($scope.data.selectedClipBoardStorage == null) $scope.data.selectedClipBoardStorage = {};
                                _context.next = 65;
                                break;

                            case 62:
                                _context.prev = 62;
                                _context.t3 = _context['catch'](55);

                                console.error(_context.t3);

                            case 65:
                                $scope.data.isItemInClipboard = !_.isEqual($scope.data.selectedClipBoardStorage, {}) && $scope.data.selectedClipBoardStorage != null;
                                return _context.finish(46);

                            case 67:
                                _context.next = 72;
                                break;

                            case 69:
                                _context.prev = 69;
                                _context.t4 = _context['catch'](0);

                                console.error(_context.t4);

                            case 72:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 69], [1, 43, 46, 67], [2, 10], [47, 52], [55, 62]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};