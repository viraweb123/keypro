'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var changeCurrentNodeMetaDataDesktopCtrl = function changeCurrentNodeMetaDataDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {

            $scope.func.changeCurrentNodeMetaData = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(node, collapsed) {
                    var querys;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName] = 'getNameFromPath';
                                    _context2.next = 6;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                case 6:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType,srcMimeType';
                                    $scope.data.trees.metadataTree.currentNode = node;
                                    $scope.data.selectedFileOrFolder = node;

                                    if ($scope.data.trees.metadataTree.currentNode.hasChildrenFolder || $scope.data.trees.metadataTree.currentNode.isLast) {
                                        if (!$scope.data.trees.metadataTree.currentNode.isLast) {
                                            desktopService.propertyGroup[node.request]((node.queryList.length > 1 ? node.queryList.slice(1).map(function (query) {
                                                return query.replace('property', 'property=' + node.queryList[0].replace('id=', ''));
                                            }) : node.queryList).join('&')).then(function (req) {
                                                switch (node.request) {
                                                    case 'getTreeAllRoot':
                                                        _.forEach(req.data.originalElement, function (value, key) {

                                                            var id = $scope.data.trees.metadataTree.currentNode.id + '_TreeRoot' + key;
                                                            if (typeof $scope.data.pointers["metadataVisible"][id] === "undefined") {

                                                                var title = "";
                                                                try {
                                                                    var milDate = _.clone(String(value));
                                                                    if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\d{1,3}[\+|\-]\d{1,2}\:\d{1,2}$/i.test(milDate)) {
                                                                        milDate = milDate.substring(0, milDate.lastIndexOf("."));
                                                                        title = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
                                                                    } else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}[\-|\+]\d{1,2}\:\d{1,2}$/i.test(milDate)) {
                                                                        title = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
                                                                    } else if (/^\d{14}$/i.test(milDate)) {
                                                                        title = moment(milDate, 'YYYYMMDDHHmmss').format('jYYYY/jM/jD');
                                                                    } else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\d{1,3}[Zz]$/i.test(milDate)) {
                                                                        title = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
                                                                    }
                                                                    if (title != "") {
                                                                        title = persianJs(title).englishNumber().arabicNumber().toString();
                                                                        title += ' : (' + (n.count > 0 ? n.count : '') + ')';
                                                                    } else {
                                                                        title = value;
                                                                    }
                                                                } catch (e) {
                                                                    title = value;
                                                                }

                                                                $scope.data.trees.metadataTree.currentNode.children.push({
                                                                    label: title,
                                                                    hasChildrenFolder: Number(key) > 0,
                                                                    children: [],
                                                                    collapsed: true,
                                                                    key: key,
                                                                    id: id,
                                                                    uuid: id,
                                                                    request: 'getTreeRoot',
                                                                    queryList: ['id=' + key],
                                                                    group: 'metadata',
                                                                    subscribed: false
                                                                });
                                                                $scope.data.pointers["metadataVisible"][id] = $scope.data.trees.metadataTree.currentNode.children.slice(-1)[0];
                                                            }
                                                        });
                                                        $scope.data.trees.metadataTree.currentNode.children = _.sortBy($scope.data.trees.metadataTree.currentNode.children, 'label');
                                                        break;
                                                    case 'getTreeRoot':
                                                    case 'getTree':
                                                        req = req.data || req;
                                                        if (_.isArray(req)) {

                                                            $scope.data.trees.metadata.currentNodeCount = req.length;
                                                            _.forEach(req, function () {
                                                                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(n) {
                                                                    var id, title, milDate, newNode;
                                                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                                                        while (1) {
                                                                            switch (_context.prev = _context.next) {
                                                                                case 0:
                                                                                    id = $scope.data.trees.metadataTree.currentNode.id + '_' + String(n.value);

                                                                                    if (typeof $scope.data.pointers["metadataVisible"][id] === "undefined") {
                                                                                        title = "";

                                                                                        try {
                                                                                            milDate = _.clone(String(n.value));

                                                                                            if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\d{1,3}[\+|\-]\d{1,2}\:\d{1,2}$/i.test(milDate)) {
                                                                                                milDate = milDate.substring(0, milDate.lastIndexOf("."));
                                                                                                title = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
                                                                                            } else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}[\-|\+]\d{1,2}\:\d{1,2}$/i.test(milDate)) {
                                                                                                title = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
                                                                                            } else if (/^\d{14}$/i.test(milDate)) {
                                                                                                title = moment(milDate, 'YYYYMMDDHHmmss').format('jYYYY/jM/jD');
                                                                                            } else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\d{1,3}[Zz]$/i.test(milDate)) {
                                                                                                title = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
                                                                                            }
                                                                                            if (title != "") {
                                                                                                title = persianJs(title).englishNumber().arabicNumber().toString();
                                                                                                title += ' : (' + (n.count > 0 ? n.count : '') + ')';
                                                                                            } else {
                                                                                                title = n.title + ' : (' + (n.count > 0 ? n.count : '') + ')';
                                                                                            }
                                                                                        } catch (e) {
                                                                                            title = n.title + ' : (' + (n.count > 0 ? n.count : '') + ')';
                                                                                        }

                                                                                        newNode = n;

                                                                                        newNode.label = title;
                                                                                        newNode.hasChildrenFolder = n.count > 0;
                                                                                        newNode.children = [];
                                                                                        newNode.collapsed = true;
                                                                                        newNode.id = id;
                                                                                        newNode.uuid = id;
                                                                                        newNode.request = 'getTree';
                                                                                        newNode.group = 'metadata';
                                                                                        newNode.subscribed = false;

                                                                                        newNode.queryList = $scope.data.trees.metadataTree.currentNode.queryList.concat('property=' + n.prop + '=' + String(n.value));
                                                                                        newNode.hasChildrenFolder = newNode.isLast ? false : newNode.hasChildrenFolder;
                                                                                        $scope.data.trees.metadataTree.currentNode.children.push(_.clone(n));
                                                                                        newNode = undefined;
                                                                                        $scope.data.pointers["metadataVisible"][id] = $scope.data.trees.metadataTree.currentNode.children.slice(-1)[0];
                                                                                    }

                                                                                case 2:
                                                                                case 'end':
                                                                                    return _context.stop();
                                                                            }
                                                                        }
                                                                    }, _callee, _this);
                                                                }));

                                                                return function (_x3) {
                                                                    return _ref2.apply(this, arguments);
                                                                };
                                                            }());
                                                            $scope.data.trees.metadataTree.currentNode.children = _.sortBy($scope.data.trees.metadataTree.currentNode.children, 'label');
                                                        }
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }, function (error) {
                                                return toaster.pop('error', '', 'مشکلی در دریافت اطلاعات از سرور به وجود آمده است.');
                                            });
                                        } else {
                                            //TODO open center navigation
                                            $scope.data.nav.center.isOpened = true;
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            querys = _.map($scope.data.trees.metadataTree.currentNode.queryList, function (query) {
                                                if (_.startsWith(query, "property=")) {
                                                    if (_.endsWith(query, "=")) query += encodeURIComponent(" ");else if (_.endsWith(query, "[]")) query = _.replace(query, "[]", encodeURIComponent(" "));else if (_.endsWith(query, "]")) query = query.replace(/\[/g, '').replace(/\]/g, '').trim();else query = _.replace(query, /\=([^\=]{1,})$/, "=\"$1\"");
                                                }

                                                return query;
                                            });
                                            //encodeURIComponent(" ")

                                            desktopService.search.findPaginated({
                                                property: querys.join('&'),
                                                domain: 3,
                                                offset: 0,
                                                limit: 20
                                            }).then(function (res) {
                                                if (typeof res.data !== "undefined" && typeof res.data.list !== "undefined" && _.isArray(res.data.list)) {
                                                    $scope.data.list = [];
                                                    for (var i = 0; i < res.data.list.length; i++) {
                                                        var newItem = {};
                                                        if (_.has(res.data.list[i], 'document')) {
                                                            newItem = _.clone(res.data.list[i].document);
                                                            newItem.name = getNameFromPath(res.data.list[i].document.path);
                                                            newItem.type = 'FILE';
                                                            newItem.mimeType = newItem.mimeType == 'application/octet-stream' ? getNameFromPath(newItem.name.split('.').pop()) : newItem.mimeType;
                                                            newItem.selected = false;
                                                            group: 'taxonomy';
                                                            newItem.thumbnailSrc = getSrcFromType(newItem.mimeType);
                                                            desktopService.document.thumbnail(newItem, 0, 75).then(function (result) {
                                                                return newItem.thumbnailSrc = "data:image/png;base64," + result.data;
                                                            }, function (error) {
                                                                newItem.thumbnailSrc = getSrcFromType(newItem.mimeType);
                                                                newItem.notShowFile = true;
                                                            });
                                                        } else if (_.has(res.data.list[i], 'folder')) {
                                                            var _newItem;

                                                            var label = getNameFromPath(res.data.list[i].folder.path);
                                                            newItem = (_newItem = {
                                                                thumbnailSrc: '../../../../static/image/' + (res.data.list[i].folder.permissions == 1 ? 'red-' : '') + 'folder' + (res.data.list[i].folder.hasChildren ? 's' : '') + '.png',
                                                                selected: false,
                                                                uuid: res.data.list[i].folder.uuid || res.data.list[i].folder.id,
                                                                id: res.data.list[i].folder.uuid || res.data.list[i].folder.id,
                                                                name: label,
                                                                label: label,
                                                                path: res.data.list[i].folder.path,
                                                                hasChildrenFolder: res.data.list[i].folder.hasChildren,
                                                                permissions: res.data.list[i].folder.permissions,
                                                                collapsed: true
                                                            }, _defineProperty(_newItem, 'selected', false), _defineProperty(_newItem, 'type', 'FOLDER'), _defineProperty(_newItem, 'notTaxonomy', true), _defineProperty(_newItem, 'group', 'taxonomy'), _defineProperty(_newItem, 'subscribed', _.has(res.data.list[i].folder, 'subscribed') ? res.data.list[i].folder.subscribed : false), _newItem);
                                                        }
                                                        $scope.data.list.push(_.clone(newItem));
                                                        newItem = undefined;
                                                    }
                                                }
                                            }, function (error) {
                                                toaster.pop('error', '', 'مشکلی در دریافت اطلاعات از سرور به وجود آمده است.');
                                                $scope.data.list = [];
                                            });
                                        }
                                    }
                                    _context2.next = 15;
                                    break;

                                case 12:
                                    _context2.prev = 12;
                                    _context2.t0 = _context2['catch'](0);

                                    console.error(_context2.t0);

                                case 15:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[0, 12]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();
            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};