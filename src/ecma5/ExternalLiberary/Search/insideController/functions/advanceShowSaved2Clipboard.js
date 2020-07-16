"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advanceShowSaved2ClipboardAdvanceCtrl = function advanceShowSaved2ClipboardAdvanceCtrl($scope, advanceService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.advanceShowSaved2Clipboard = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;


                                $scope.data.showClipboardFolder = true;

                                try {
                                    $("#clipBoardMetaDataSaved").draggable({ "axis": "x", "containment": "body" });
                                } catch (e) {
                                    console.error(e);
                                }

                                if (!($scope.data.PropertyGroupParent == null)) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.next = 6;
                                return $scope.func.getMetadataList();

                            case 6:
                                if (_.isFunction($scope.externalScopeParent.InitializationForm)) $scope.externalScopeParent.InitializationForm(angular.copy($scope.data.PropertyGroupParent), {});

                                advanceService.PropertyGroup.listGroup($scope.data.clipboardFolder.path).then(function (res) {
                                    if (!_.includes([null, ""], res.data.list)) {
                                        var index = _.findIndex($scope.data.metadatas, function (metadata) {
                                            return metadata.name == res.data.list[0].name;
                                        });
                                        $scope.data.selectMetadataParent = $scope.data.metadatas[index];
                                        advanceService.PropertyGroup.getGroups($scope.data.clipboardFolder.path, $scope.data.selectMetadataParent).then(function (resIn) {

                                            resIn.data.isMetaData = true;
                                            resIn.data.type = 'FOLDER';
                                            $scope.data.PropertyGroupParent = _.clone(resIn.data);
                                            if (_.isFunction($scope.externalScopeParent.InitializationForm)) $scope.externalScopeParent.InitializationForm(angular.copy($scope.data.PropertyGroupParent.properties), { service: advanceService, require: true });
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        }, function (error) {
                                            return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                        });
                                    }
                                }, function (error) {
                                    return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                                });

                            case 8:
                                _context.next = 13;
                                break;

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context["catch"](0);

                                console.error(_context.t0);

                            case 13:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[0, 10]]);
            }));
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};