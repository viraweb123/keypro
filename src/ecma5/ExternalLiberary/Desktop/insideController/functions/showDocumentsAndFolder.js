'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var showDocumentsAndFolderDesktopCtrl = function showDocumentsAndFolderDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            $scope.func.showDocumentsAndFolder = function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(doc) {
                    var viewerType, browserName, PATH;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/removeAllPlayers.js?dev=' + randomVersionName);

                                case 3:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/removeAllPlayers.js?dev=' + randomVersionName] = 'removeAllPlayers';
                                    try {
                                        removeAllPlayers();
                                    } catch (e) {
                                        console.error(e);
                                    }

                                    if (!$scope.data.profile.prfTab.prfDocument.previewVisible) {
                                        _context.next = 85;
                                        break;
                                    }

                                    _context.next = 8;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getViewer.js?dev=' + randomVersionName);

                                case 8:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getViewer.js?dev=' + randomVersionName] = 'getViewer,fileTypeFromViewerHashTable';

                                    viewerType = getViewer(doc.mimeType);


                                    if ($scope.data.profile.prfMisc.acrobatPluginPreview && viewerType == "image") viewerType = 'pdfjs';

                                    _context.t0 = viewerType;
                                    _context.next = _context.t0 === "image" ? 14 : _context.t0 === "pdfjs" ? 28 : _context.t0 === "flash" ? 53 : _context.t0 === "video" ? 53 : _context.t0 === "audio" ? 53 : _context.t0 === "html" ? 79 : 82;
                                    break;

                                case 14:

                                    $scope.data.viewer.type = "image";

                                    _context.next = 17;
                                    return CSSManagement.addCSS('resource/styleSheet/ol.css?dev=' + randomVersionName);

                                case 17:
                                    $scope.data.removeExternalCSS['resource/styleSheet/ol.css?dev=' + randomVersionName] = true;
                                    _context.next = 20;
                                    return JSManagement.addJS('resource/javaScript/ol.js?dev=' + randomVersionName);

                                case 20:
                                    $scope.data.removeExternalFuncs['resource/javaScript/ol.js?dev=' + randomVersionName] = 'ol';
                                    _context.next = 23;
                                    return JSManagement.addJS('static/js/ol3-ext_interaction_transforminteraction.js?dev=' + randomVersionName);

                                case 23:
                                    $scope.data.removeExternalFuncs['static/js/ol3-ext_interaction_transforminteraction.js?dev=' + randomVersionName] = '';

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                    if (isCookieFunction("Authorization") == null) {
                                        toaster.pop("warning", "", "لطفا ابتدا وارد سیستم شوید .");
                                        Authentication.backToLoign();
                                    }
                                    //if(doc.mimeType == 'image/tiff'){
                                    try {
                                        _.defer(function () {
                                            $scope.data.viewer.image.func({
                                                doc: angular.copy(doc)
                                            });
                                        }, 100);
                                    } catch (e) {
                                        console.error(e);
                                    }

                                    return _context.abrupt('break', 85);

                                case 28:
                                    $scope.data.viewer.type = "pdf";
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    _context.next = 32;
                                    return CSSManagement.addCSS('static/pdfDirectiveViewer/web/viewer.css?dev=' + randomVersionName);

                                case 32:
                                    $scope.data.removeExternalCSS['static/pdfDirectiveViewer/web/viewer.css?dev=' + randomVersionName] = true;
                                    _context.next = 35;
                                    return JSManagement.addJS('static/pdfDirectiveViewer/web/compatibility.min.js?dev=' + randomVersionName);

                                case 35:
                                    $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/web/compatibility.min.js?dev=' + randomVersionName] = 'PDFJS';
                                    _context.next = 38;
                                    return JSManagement.addJS('static/pdfDirectiveViewer/web/l10n.min.js?dev=' + randomVersionName);

                                case 38:
                                    $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/web/l10n.min.js?dev=' + randomVersionName] = 'webL10n';
                                    _context.next = 41;
                                    return JSManagement.addJS('static/pdfDirectiveViewer/build/pdf.min.js?dev=' + randomVersionName);

                                case 41:
                                    $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/build/pdf.min.js?dev=' + randomVersionName] = 'PDFJS';
                                    _context.next = 44;
                                    return JSManagement.addJS('static/pdfDirectiveViewer/web/debugger.min.js?dev=' + randomVersionName);

                                case 44:
                                    $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/web/debugger.min.js?dev=' + randomVersionName] = 'FontInspector,StepperManager,Stepper,Stats,PDFBug';
                                    _context.next = 47;
                                    return JSManagement.addJS('static/pdfDirectiveViewer/web/debugger.js?dev=' + randomVersionName);

                                case 47:
                                    $scope.data.removeExternalFuncs['static/pdfDirectiveViewer/web/debugger.js?dev=' + randomVersionName] = 'FontInspector,StepperManager,Stepper,Stats,PDFBug';
                                    $scope.data.viewer.pdf.isOpenfileShower = true;
                                    if (isCookieFunction("Authorization") == null) Authentication.backToLoign();
                                    $scope.data.viewer['pdf'].url = '/KeydocPro/services/rest/convertor/topdf?uuid=' + doc.uuid + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + '&' + Date.parse(new Date());
                                    _.defer(function () {
                                        $scope.data.viewer['pdf'].showIcons.printer = _.clone($scope.data.profile.prfToolbar.printVisible);
                                        if ($scope.data.viewer.pdf.changeURL == null) {

                                            $scope.data.viewer.pdf.showPDF = true;
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        } else {

                                            _.defer(function () {
                                                $scope.$apply();
                                                if (_.isFunction($scope.data.viewer.pdf.changeURL)) {
                                                    $scope.data.viewer['pdf'].changeURL($scope.data.viewer['pdf'].url, $scope.data.viewer['pdf'].firstSearch, $scope.data.viewer['pdf'].showIcons);
                                                }
                                            });
                                        }
                                    }, 100);
                                    return _context.abrupt('break', 85);

                                case 53:
                                    $scope.data.player = {};

                                    if (!(isCookieFunction("Authorization") != null)) {
                                        _context.next = 77;
                                        break;
                                    }

                                    $scope.data.viewer.type = "media";
                                    $scope.data.viewer.media.type = viewerType;
                                    _context.prev = 57;

                                    if (!(isCookieFunction("Authorization") != null)) {
                                        _context.next = 69;
                                        break;
                                    }

                                    _context.next = 61;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/getBrowserInformations.js?dev=' + randomVersionName);

                                case 61:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getBrowserInformations.js?dev=' + randomVersionName] = 'getCurrentbrowserName,getCurrentbrowserType';
                                    _context.next = 64;
                                    return getCurrentbrowserName();

                                case 64:
                                    browserName = _context.sent;
                                    ///Bearer\W/
                                    PATH = _.includes(["Firefox"], browserName.name) ? '/KeydocPro/services/rest/document/getContent?docId=' + doc.uuid + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + '&' + new Date().getTime() : '/KeydocPro/services/rest/document/getMedia?docId=' + doc.uuid + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + '&browserName=' + _.lowerCase(browserName.name);


                                    $scope.data.viewer['player'].func({
                                        thumbnail: doc.thumbnailSrc,
                                        src: PATH,
                                        type: /(audio)/.test(doc.mimeType) ? 'audio' : 'video',
                                        duration: undefined,
                                        guid: doc.uuid,
                                        service: desktopService.document,
                                        tags: null,
                                        first: true,
                                        browserName: browserName.name
                                    }, $scope.data.profile.MultiMediaTagPermit);
                                    _context.next = 70;
                                    break;

                                case 69:
                                    Authentication.backToLoign();

                                case 70:
                                    _context.next = 75;
                                    break;

                                case 72:
                                    _context.prev = 72;
                                    _context.t1 = _context['catch'](57);

                                    console.error(_context.t1);

                                case 75:
                                    _context.next = 78;
                                    break;

                                case 77:
                                    Authentication.backToLoign();

                                case 78:
                                    return _context.abrupt('break', 85);

                                case 79:
                                    $scope.data.viewer.type = "html";
                                    desktopService.document.getContentWithAuth(doc.uuid).then(function (res) {
                                        try {

                                            $scope.data.viewer['html'].content = res.data;
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }, function (err) {
                                        return toaster.pop("error", "", "مشکلی در دریافت سند به وجود آمده است.");
                                    });
                                    return _context.abrupt('break', 85);

                                case 82:
                                    toaster.pop("warning", "", "سند انتخابی قابلیت نمایش در این سامانه را ندارد .");
                                    toaster.pop("info", "", "لطفا سند انتخابی را دانلود کنید .");
                                    return _context.abrupt('break', 85);

                                case 85:
                                    _context.next = 90;
                                    break;

                                case 87:
                                    _context.prev = 87;
                                    _context.t2 = _context['catch'](0);

                                    console.error(_context.t2);

                                case 90:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 87], [57, 72]]);
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