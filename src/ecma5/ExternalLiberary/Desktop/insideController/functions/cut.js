'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var cutDesktopCtrl = function cutDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.cut = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var response, parentID, i, isCopy;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                if (!($scope.data.selectedItems.length <= 0)) {
                                    _context2.next = 5;
                                    break;
                                }

                                toaster.pop('error', '', 'لطفا حداقل یک سند یا پوشه انتخاب کنید.');
                                _context2.next = 49;
                                break;

                            case 5:
                                if (!($scope.data.selectedItems[0].group == "trash")) {
                                    _context2.next = 9;
                                    break;
                                }

                                toaster.pop('warning', "", "امکان انتقال سند های داخل سطل زباله وجود ندارد.");
                                _context2.next = 49;
                                break;

                            case 9:
                                _context2.next = 11;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/multiCut2DesktopCtrl.js?dev=' + randomVersionName);

                            case 11:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/multiCut2DesktopCtrl.js?dev=' + randomVersionName] = 'multiCut2DesktopCtrl';
                                _context2.next = 14;
                                return multiCut2DesktopCtrl($uibModal, //modal func
                                desktopService.repository, //repository service
                                'getRootFolder', // rootPath
                                desktopService.folder, // folder service
                                $scope.data.selectedItems[0].group);

                            case 14:
                                response = _context2.sent;
                                _context2.next = 17;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/getHiddenTreeDesktopCtrl.js?dev=' + randomVersionName);

                            case 17:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/getHiddenTreeDesktopCtrl.js?dev=' + randomVersionName] = 'getHiddenTreeDesktopCtrl';
                                _context2.next = 20;
                                return getHiddenTreeDesktopCtrl($scope.data.pointers["taxonomyVisible"], response, $scope.data.selectedItems[0].group);

                            case 20:
                                _context2.next = 22;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName);

                            case 22:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Desktop/removeFolderChildes.js?dev=' + randomVersionName] = 'removeFolderChildes';
                                parentID = $scope.data.trees.taxonomyTree.currentNode.uuid;
                                _context2.next = 26;
                                return JSManagement.addJS('ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName);

                            case 26:
                                $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getPermisionArray.js?dev=' + randomVersionName] = 'getPermisionArray';

                                //send all cut to server
                                i = 0;

                            case 28:
                                if (!(i < $scope.data.selectedItems.length)) {
                                    _context2.next = 47;
                                    break;
                                }

                                isCopy = getPermisionArray($scope.data.selectedItems[i].permissions);

                                if (!($scope.data.selectedItems[i].type == 'FOLDER')) {
                                    _context2.next = 38;
                                    break;
                                }

                                if (!isCopy[2]) {
                                    _context2.next = 35;
                                    break;
                                }

                                return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
                                    var childID, index;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    childID = $scope.data.selectedItems[i].uuid;
                                                    _context.next = 3;
                                                    return desktopService.folder.cut(childID, response.addNode.uuid);

                                                case 3:
                                                    _.defer(function () {
                                                        return $scope.$apply($('li#' + childID).remove());
                                                    });
                                                    _context.next = 6;
                                                    return removeFolderChildes($scope.data.pointers['taxonomyVisible'], childID);

                                                case 6:
                                                    if (_.has($scope.data.pointers['taxonomyVisible'][parentID], 'children') && _.isArray($scope.data.pointers['taxonomyVisible'][parentID].children)) {
                                                        index = _.findIndex($scope.data.pointers['taxonomyVisible'][parentID].children, function (child) {
                                                            return child.uuid == childID;
                                                        });

                                                        if (index >= 0) $scope.data.pointers['taxonomyVisible'][parentID].children.splice(index, 1);
                                                        if ($scope.data.pointers['taxonomyVisible'][parentID].children.length == 0) $scope.data.pointers['taxonomyVisible'][parentID].hasChildrenFolder = false;
                                                    }
                                                    $scope.data.pointers['taxonomyVisible'][childID] = null;
                                                    delete $scope.data.pointers['taxonomyVisible'][childID];

                                                case 9:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                })(), 't0', 33);

                            case 33:
                                _context2.next = 36;
                                break;

                            case 35:
                                toaster.pop('warning', "", ' امکان انتقال پوشه ' + $scope.data.selectedItems[i].name + ' وجود ندارد. ');

                            case 36:
                                _context2.next = 44;
                                break;

                            case 38:
                                if (!isCopy[2]) {
                                    _context2.next = 43;
                                    break;
                                }

                                _context2.next = 41;
                                return desktopService.document.cut($scope.data.selectedItems[i].uuid, response.addNode.uuid);

                            case 41:
                                _context2.next = 44;
                                break;

                            case 43:
                                toaster.pop('warning', "", ' امکان انتقال سند ' + $scope.data.selectedItems[i].name + ' وجود ندارد. ');

                            case 44:
                                i++;
                                _context2.next = 28;
                                break;

                            case 47:
                                $scope.data.pointers["taxonomyVisible"][response.addNode.id].hasChildrenFolder = true;
                                $scope.data.trees.taxonomy.changeCurrentNode($scope.data.pointers["taxonomyVisible"][response.addNode.id], false);

                            case 49:
                                _context2.next = 53;
                                break;

                            case 51:
                                _context2.prev = 51;
                                _context2.t1 = _context2['catch'](0);

                            case 53:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[0, 51]]);
            }));

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};