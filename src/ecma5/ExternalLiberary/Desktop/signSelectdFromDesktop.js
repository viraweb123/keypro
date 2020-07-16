"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var signSelectdFromDesktop = function signSelectdFromDesktop(uibModal, _JS, _style, _service, _selectedFile, _userInfos, _profile, _Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: "ecma5/ExternalLiberary/Desktop/signSelectdFromDesktop.html?dev=" + randomVersionName,
            controller: function controller($scope, $compile, $uibModalInstance, toaster, JS, style, service, selectedFile, stampsUser, userInfos, profile, Authentication) {

                $scope.data = {
                    removeExternalFuncs: {},
                    removeExternalCSS: {},
                    stamps: null,
                    validTypes: ['tree'],
                    dbClicked: 0,
                    selectedStamp: null,

                    selectedSign: null,
                    signs: [{
                        label: "مهر ۱",
                        value: "s1"
                    }, {
                        label: "مهر ۲",
                        value: "s2"
                    }, {
                        label: "مهر ۳",
                        value: "s3"
                    }, {
                        label: "مهر ۴",
                        value: "s4"
                    }, {
                        label: "مهر ۵",
                        value: "s5"
                    }, {
                        label: "مهر ۶",
                        value: "s6"
                    }, {
                        label: "مهر ۷",
                        value: "s7"
                    }, {
                        label: "مهر ۸",
                        value: "s8"
                    }, {
                        label: "مهر ۹",
                        value: "s9"
                    }, {
                        label: "مهر ۱۰",
                        value: "s10"
                    }],

                    addedStamps: {},

                    viewer: {
                        type: null,
                        media: {
                            type: ""
                        },
                        pdf: {
                            url: null,
                            changeURL: null,
                            firstSearch: null,
                            isOpenfileShower: false,
                            showIcons: {
                                printer: true
                            }
                        }
                    }
                };

                $scope.func = {};

                $scope.func.send = function () {
                    try {

                        if (_.isEqual($scope.data.addedStamps, {}) || $scope.data.addedStamps == null) throw "لطفا حداقل یک امضای دیجیتال انتخاب کنید";
                        var query = "docId=" + selectedFile.uuid + "&";
                        query += _.join(_.map($scope.data.addedStamps, function (stamp, key) {
                            return "stamp=" + key + "=" + stamp.stamp.id;
                        }), '&');
                        if (query.endsWith("&")) query = query.slice(0, query.length - 1);

                        service.document.stampOnDocument(query).then(function (res) {
                            return $uibModalInstance.close("امضای دیجیتال با موفقیت افزوده شد.");
                        }, function (err) {
                            return toaster.pop("error", "", "مشکلی در افزودن امضای دیجیتال ایجاد گردیده است لطفا مجددا تلاش بفرمایید.");
                        });
                    } catch (e) {
                        toaster.pop("error", "", e.message || e);
                    }
                };

                $scope.func.showFile = function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(doc) {
                        var viewerType;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.prev = 0;

                                        if (!profile.prfTab.prfDocument.previewVisible) {
                                            _context.next = 25;
                                            break;
                                        }

                                        _context.next = 4;
                                        return JS.addJS("ecma5/ExternalLiberary/Public/getViewer.js?dev=" + randomVersionName);

                                    case 4:
                                        $scope.data.removeExternalFuncs["ecma5/ExternalLiberary/Public/getViewer.js?dev=" + randomVersionName] = 'getViewer,fileTypeFromViewerHashTable';
                                        viewerType = getViewer(doc.mimeType);
                                        _context.next = 8;
                                        return style.addCSS("static/pdfDirectiveViewer/web/viewer.css?dev=" + randomVersionName);

                                    case 8:
                                        _context.next = 10;
                                        return JS.addJS("static/pdfDirectiveViewer/web/compatibility.min.js?dev=" + randomVersionName);

                                    case 10:
                                        _context.next = 12;
                                        return JS.addJS("static/pdfDirectiveViewer/web/l10n.min.js?dev=" + randomVersionName);

                                    case 12:
                                        _context.next = 14;
                                        return JS.addJS("static/pdfDirectiveViewer/build/pdf.min.js?dev=" + randomVersionName);

                                    case 14:
                                        _context.next = 16;
                                        return JS.addJS("static/pdfDirectiveViewer/web/debugger.min.js?dev=" + randomVersionName);

                                    case 16:
                                        _context.next = 18;
                                        return JS.addJS("static/pdfDirectiveViewer/web/debugger.js?dev=" + randomVersionName);

                                    case 18:
                                        //$scope.data.removeExternalFuncs['static/pdfDirectiveViewer/web/debugger.js'] = 'FontInspector,StepperManager,Stepper,Stats,PDFBug';
                                        $scope.data.viewer.type = "pdf";
                                        $scope.data.viewer.pdf.isOpenfileShower = true;
                                        if (isCookieFunction("Authorization") == null) Authentication.backToLoign();
                                        $scope.data.viewer['pdf'].url = "/KeydocPro/services/rest/convertor/topdf?uuid=" + doc.uuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + "&" + Date.parse(new Date());
                                        _.defer(function () {
                                            $scope.data.viewer['pdf'].showIcons.printer = _.clone(profile.prfToolbar.printVisible);
                                            if (window.document.querySelector("#desktop-pdf-viewer-parent  #desktop-pdf-viewer-child  #key-doc-pro-pdf-shower-id") == null) angular.element(window.document.querySelector("#modal-pdf-viewer-parent  #modal-pdf-viewer-child")).append($compile("<key-doc-pro-pdf-shower show-icons=\"data.viewer.pdf.showIcons\" id=\"key-doc-pro-pdf-shower-id\" change-url=\"data.viewer.pdf.changeURL\" first-search = \"data.viewer.pdf.firstSearch\" path-url=\"data.viewer.pdf.url\" show-file=\"data.viewer.pdf.isOpenfileShower\" ></key-doc-pro-pdf-shower>")($scope));
                                            _.defer(function () {
                                                $scope.$apply();
                                                if (_.isFunction($scope.data.viewer.pdf.changeURL)) $scope.data.viewer['pdf'].changeURL($scope.data.viewer['pdf'].url, $scope.data.viewer['pdf'].firstSearch, $scope.data.viewer['pdf'].showIcons);
                                            });
                                        }, 100);

                                        _context.next = 26;
                                        break;

                                    case 25:
                                        toaster.pop("error", "", "امکان نمایش سند برای شما نیست.");

                                    case 26:
                                        _context.next = 31;
                                        break;

                                    case 28:
                                        _context.prev = 28;
                                        _context.t0 = _context["catch"](0);

                                        console.error(_context.t0);

                                    case 31:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this, [[0, 28]]);
                    }));

                    return function (_x) {
                        return _ref.apply(this, arguments);
                    };
                }();

                $scope.func.removeStamp = function (key) {
                    try {
                        $scope.data.addedStamps[key] = undefined;
                        delete $scope.data.addedStamps[key];
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.addStamp = function () {
                    try {
                        if ($scope.data.selectedSign == null) toaster.pop("error", "", "لطفا یک نام برای امضای دیجیتال انتخاب کنید");else if ($scope.data.selectedStamp == null) toaster.pop("error", "", "لطفا یک امضای دیجیتال انتخاب کنید");else {
                            $scope.data.addedStamps[$scope.data.selectedSign.value] = {
                                stamp: _.clone($scope.data.selectedStamp),
                                type: _.clone($scope.data.selectedSign)
                            };
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.clickImage = function (e, stamp) {

                    console.log(stamp);
                    $scope.data.selectedStamp = stamp;
                    _.defer(function () {
                        return $scope.$apply();
                    });
                };

                $scope.func.getThumbnailFile = function (file) {
                    return new Promise(function (resolve, reject) {
                        try {
                            service.document.thumbnail({
                                uuid: file.stampId
                            }, 0, 75).then(function (result) {
                                return resolve("data:image/png;base64," + result.data);
                            }, function (error) {
                                return resolve('/static/img/jpg.png');
                            });
                        } catch (e) {
                            console.error(e);
                            resolve('/static/img/jpg.png');
                        }
                    });
                };

                $scope.func.getStampsImage = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                    var i;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    i = 0;

                                case 2:
                                    if (!(i < $scope.data.stamps.length)) {
                                        _context2.next = 16;
                                        break;
                                    }

                                    _context2.prev = 3;
                                    _context2.next = 6;
                                    return $scope.func.getThumbnailFile($scope.data.stamps[i]);

                                case 6:
                                    $scope.data.stamps[i].thumbnailSrc = _context2.sent;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    _context2.next = 13;
                                    break;

                                case 10:
                                    _context2.prev = 10;
                                    _context2.t0 = _context2["catch"](3);

                                    console.error(_context2.t0);

                                case 13:
                                    i++;
                                    _context2.next = 2;
                                    break;

                                case 16:
                                    _context2.next = 21;
                                    break;

                                case 18:
                                    _context2.prev = 18;
                                    _context2.t1 = _context2["catch"](0);

                                    console.error(_context2.t1);

                                case 21:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[0, 18], [3, 10]]);
                }));

                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.$on("$destroy", function () {
                    try {

                        _.forEach(_.clone($scope.data.removeExternalCSS), function () {
                            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(value, src) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.prev = 0;
                                                _context3.next = 3;
                                                return style.removeCSS(src);

                                            case 3:
                                                _context3.next = 8;
                                                break;

                                            case 5:
                                                _context3.prev = 5;
                                                _context3.t0 = _context3["catch"](0);

                                                console.error(_context3.t0);

                                            case 8:
                                            case "end":
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this, [[0, 5]]);
                            }));

                            return function (_x2, _x3) {
                                return _ref3.apply(this, arguments);
                            };
                        }());

                        _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(funcName, src) {
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                _context4.prev = 0;
                                                _context4.next = 3;
                                                return JS.removeJS(src, funcName);

                                            case 3:
                                                _context4.next = 8;
                                                break;

                                            case 5:
                                                _context4.prev = 5;
                                                _context4.t0 = _context4["catch"](0);

                                                console.error(_context4.t0);

                                            case 8:
                                            case "end":
                                                return _context4.stop();
                                        }
                                    }
                                }, _callee4, _this, [[0, 5]]);
                            }));

                            return function (_x4, _x5) {
                                return _ref4.apply(this, arguments);
                            };
                        }());

                        try {
                            //$( "#clipBoardMetaDataSaved" ).draggable().remove();
                            $("#clipBoardMetaDataSaved").draggable("destroy");
                        } catch (e) {
                            console.error(e);
                        }

                        //TODO clear all data and functions
                        $scope.func = undefined;
                        $scope.data = undefined;
                    } catch (e) {
                        console.error(e);
                    }
                });

                $scope.func.run = function () {
                    try {
                        $scope.data.stamps = _.has(stampsUser, 'data') && _.has(stampsUser.data, 'originalElement') && _.has(stampsUser.data.originalElement, 'stampUsers') && stampsUser.data.originalElement.stampUsers != null ? _.isArray(stampsUser.data.originalElement.stampUsers) ? _.clone(stampsUser.data.originalElement.stampUsers) : _.clone([stampsUser.data.originalElement.stampUsers]) : null;
                        if (_.isArray($scope.data.stamps)) {
                            $scope.data.stamps = _.map(_.filter($scope.data.stamps, function (stamp) {
                                return _.includes($scope.data.validTypes, stamp.type) && stamp.active == true;
                            }), function (stampMaped) {
                                stampMaped.thumbnailSrc = '/static/img/jpg.png';
                                return stampMaped;
                            });
                            $scope.func.getStampsImage();
                        } else toaster.pop("error", "", "کاربر فوق فاقد هیچ امضای است.");
                    } catch (e) {
                        console.error(e);
                    }
                    try {
                        $scope.func.showFile(selectedFile);
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.run();
            },
            size: 'lg',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                JS: function JS() {
                    return _JS;
                },
                style: function style() {
                    return _style;
                },
                service: function service() {
                    return _service;
                },
                selectedFile: function selectedFile() {
                    return _selectedFile;
                },
                stampsUser: function stampsUser() {
                    return _service.stamp.getStampsByUser(_userInfos.username).then(function (result) {
                        return result;
                    });
                },
                userInfos: function userInfos() {
                    return _userInfos;
                },
                profile: function profile() {
                    return _profile;
                },
                Authentication: function Authentication() {
                    return _Authentication;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) resolve(response);else reject('انصراف از ایجاد امضای دیجیتال');
        }, function (error) {
            return reject('انصراف از ایجاد امضای دیجیتال');
        });
    });
};