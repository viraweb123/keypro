'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var simpleGenerateResultSimpleCtrl = function simpleGenerateResultSimpleCtrl($scope, simpleService, JSManagement, CSSManagement, toaster, $uibModal, $translate) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.simpleGenerateResult = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
                    var i, newItem, low, j, high, freqRes;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;

                                    $scope.data.list = [];
                                    _context.next = 4;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                                case 4:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';

                                    i = 0;

                                case 6:
                                    if (!(i < data.list.length)) {
                                        _context.next = 30;
                                        break;
                                    }

                                    _context.prev = 7;
                                    newItem = {};

                                    if (_.has(data.list[i], 'document')) {
                                        newItem = _.clone(data.list[i].document);
                                        newItem.type = 'document';
                                        newItem.icon = 'fa-file';
                                        newItem.excerpt = data.list[i].excerpt;
                                        newItem.showDoc = 'showDocument';
                                        newItem.thumbnailSrc = '../../../../static/img/none.png';
                                        //TODO old solv newItem.thumbnailSrc = await $scope.func.getImage(newItem,getSrcFromType);
                                        newItem.name = data.list[i].document.path.split("/").pop();
                                        // newItem.keywords = _.has(data.list[i].document,'keywords') ? (_.isArray(data.list[i].document.keywords) ? data.list[i].document.keywords : [data.list[i].document.keywords]) : [];
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
                                    _context.next = 17;
                                    return miladiToJalaliFunction(_.clone(newItem.created));

                                case 17:
                                    newItem.jalaliCreateDate = _context.sent;

                                    $scope.data.list.push(_.clone(newItem));
                                    if (newItem.type == 'document') $scope.func.getImage($scope.data.list[$scope.data.list.length - 1]);

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    newItem = undefined;
                                    _context.next = 27;
                                    break;

                                case 24:
                                    _context.prev = 24;
                                    _context.t0 = _context['catch'](7);

                                    console.error(_context.t0);

                                case 27:
                                    i++;
                                    _context.next = 6;
                                    break;

                                case 30:

                                    $scope.data.itemsPagination.totalItems = _.clone(data.total);
                                    $scope.data.isSearched = true;
                                    _context.prev = 32;
                                    _context.next = 35;
                                    return simpleService.search.frequencyData({
                                        statement: $scope.data.searchOBJ.mainSearch,
                                        isFuzzy: $scope.data.searchOBJ.isFuzzy
                                    });

                                case 35:
                                    freqRes = _context.sent;
                                    _context.next = 38;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/generateTreeSimpleCtrl.js?dev=' + randomVersionName);

                                case 38:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/generateTreeSimpleCtrl.js?dev=' + randomVersionName] = 'generateTreeSimpleCtrl';

                                    _context.next = 41;
                                    return generateTreeSimpleCtrl(_.clone(freqRes.data.originalElement), $translate);

                                case 41:
                                    $scope.data.roleListFrequecy = _context.sent;

                                    $scope.data.crrotObject = _.clone(freqRes);
                                    freqRes = undefined;
                                    window.document.querySelector(".simple  .CR   .body-search .just-header").classList.add("show-body");
                                    _.defer(function () {
                                        $(".simple  .CR   .body-search .show-body ~ .result-view  .list-view").niceScroll({
                                            cursorcolor: "#135afe",
                                            cursorwidth: "8px",
                                            cursorborderradius: "0px",
                                            rtlmode: false,
                                            horizrailenabled: true,
                                            railvalign: bottom
                                        });
                                    }, 100);
                                    _context.next = 51;
                                    break;

                                case 48:
                                    _context.prev = 48;
                                    _context.t1 = _context['catch'](32);

                                    console.error(_context.t1);

                                case 51:
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    $scope.data.total = data.total;
                                    _context.next = 58;
                                    break;

                                case 55:
                                    _context.prev = 55;
                                    _context.t2 = _context['catch'](0);

                                    console.error(_context.t2);

                                case 58:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 55], [7, 24], [32, 48]]);
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