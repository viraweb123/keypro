'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var advanceGenerateResultAdvanceCtrl = function advanceGenerateResultAdvanceCtrl($scope, advanceService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.advanceGenerateResult = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
                    var i, newItem, low, j, high;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';
                                    _context.next = 6;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName);

                                case 6:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=' + randomVersionName] = 'getSrcFromType';
                                    $scope.data.showType = "view";
                                    i = 0;

                                case 9:
                                    if (!(i < data.list.length)) {
                                        _context.next = 32;
                                        break;
                                    }

                                    _context.prev = 10;
                                    newItem = {};

                                    if (_.has(data.list[i], 'document')) {
                                        newItem = _.clone(data.list[i].document);
                                        newItem.type = 'document';
                                        newItem.icon = 'fa-file';
                                        newItem.excerpt = data.list[i].excerpt;
                                        newItem.showDoc = 'showDocument';
                                        newItem.thumbnailSrc = '../../../../static/img/none.png';
                                        //newItem.thumbnailSrc = await $scope.func.getImage(newItem, getSrcFromType);
                                        newItem.name = data.list[i].document.path.split("/").pop();
                                        newItem.keywords = _.has(data.list[i].document, 'keywords') ? _.isArray(data.list[i].document.keywords) ? _.map(data.list[i].document.keywords, function (key) {
                                            return { type: 'keyword', value: key };
                                        }) : [{ type: 'keyword', value: data.list[i].document.keywords }] : [];
                                        newItem.keywords = _.has(data.list[i].document, 'notes') ? _.isArray(data.list[i].document.notes) ? _.union(newItem.keywords, _.map(data.list[i].document.notes, function (note) {
                                            return { type: 'note', value: note.text };
                                        })) : _.union(newItem.keywords, [{ type: 'note', value: data.list[i].document.notes.text }]) : newItem.keywords;
                                    } else if (_.has(data.list[i], 'folder')) {
                                        newItem = _.clone(data.list[i].folder);
                                        newItem.type = 'folder';
                                        newItem.icon = 'fa-folder';
                                        newItem.showDoc = 'notShowDocument';
                                        newItem.thumbnailSrc = '../../../../static/image/folder' + (newItem.hasChildrenFolder ? 's' : '') + '.png';
                                        newItem.name = data.list[i].folder.path.split("/").pop();
                                        //newItem.keywords = _.has(data.list[i].folder,'keywords') ? (_.isArray(data.list[i].folder.keywords) ? data.list[i].folder.keywords : [data.list[i].folder.keywords]) : [];
                                        newItem.keywords = _.has(data.list[i].folder, 'keywords') ? _.isArray(data.list[i].folder.keywords) ? _.map(data.list[i].folder.keywords, function (key) {
                                            return { type: 'keyword', value: key };
                                        }) : [{ type: 'keyword', value: data.list[i].folder.keywords }] : [];
                                        newItem.keywords = _.has(data.list[i].folder, 'notes') ? _.isArray(data.list[i].folder.notes) ? _.union(newItem.keywords, _.map(data.list[i].folder.notes, function (note) {
                                            return { type: 'note', value: note.text };
                                        })) : _.union(newItem.keywords, [{ type: 'note', value: data.list[i].folder.notes.text }]) : newItem.keywords;
                                    } else if (_.has(data.list[i], 'mail')) {
                                        newItem = _.clone(data.list[i].mail);
                                        newItem.type = 'mail';
                                        newItem.icon = 'fa-envelope';
                                        newItem.showDoc = 'notShowDocument';
                                    } else if (_.has(data.list[i], 'attachment')) {
                                        newItem = _.clone(data.list[i].attachment);
                                        newItem.type = 'attachment';
                                        newItem.icon = 'fa-paperclip';
                                        newItem.showDoc = 'notShowDocument';
                                    }
                                    newItem.score = _.clone(data.list[i].score);
                                    newItem.starts = ['fa-star-o', 'fa-star-o', 'fa-star-o', 'fa-star-o', 'fa-star-o'];
                                    low = 0;
                                    j = 0;

                                    for (high = 200; high < 1001; high += 200) {
                                        if (low < newItem.score && newItem.score < high) newItem.starts[j] = 'fa-star-half-o';else if (newItem.score >= high) newItem.starts[j] = 'fa-star';
                                        j++;
                                        low = _.clone(high);
                                    }
                                    _context.next = 20;
                                    return miladiToJalaliFunction(_.clone(newItem.created));

                                case 20:
                                    newItem.jalaliCreateDate = _context.sent;

                                    $scope.data.list.push(_.clone(newItem));
                                    if (newItem.type == 'document') $scope.func.getImage($scope.data.list[$scope.data.list.length - 1]);
                                    newItem = undefined;
                                    _context.next = 29;
                                    break;

                                case 26:
                                    _context.prev = 26;
                                    _context.t0 = _context['catch'](10);

                                    console.error(_context.t0);

                                case 29:
                                    i++;
                                    _context.next = 9;
                                    break;

                                case 32:

                                    try {
                                        window.document.querySelector(".simple  .CR   .body-search .just-header").classList.add("show-body");
                                    } catch (e) {
                                        console.error(e);
                                    }
                                    $scope.data.total = data.total;
                                    $scope.data.isSearched = true;
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    _context.next = 41;
                                    break;

                                case 38:
                                    _context.prev = 38;
                                    _context.t1 = _context['catch'](0);

                                    console.error(_context.t1);

                                case 41:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 38], [10, 26]]);
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