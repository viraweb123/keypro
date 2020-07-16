"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var viewerFileFunction = function viewerFileFunction(uibModal, _doc, _profile, _Authentication, _JS, _sendService, _pdfSearchContent) {
    return new Promise(function (resolve, reject) {
        try {
            var modalInstance = uibModal.open({
                templateUrl: "ecma5/ExternalLiberary/Public/viewerFileFunction.html?dev=" + randomVersionName,
                controller: function controller($scope, $uibModalInstance, $sce, toaster, doc, profile, Authentication, JS, sendService, pdfSearchContent) {

                    $scope.data = {
                        req: undefined,
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
                                    printer: _.clone(profile.prfToolbar.printVisible) || false
                                }
                            },
                            player: {
                                func: null
                            },
                            html: {
                                content: null
                            }
                        }
                    };

                    $scope.func = {};

                    $scope.func.showFile = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                        var viewerType, browserName, PATH;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        if (!(isCookieFunction('Authorization') != null)) {
                                            _context.next = 41;
                                            break;
                                        }

                                        _context.next = 3;
                                        return JS.addJS("ecma5/ExternalLiberary/Public/removeAllPlayers.js?dev=" + randomVersionName);

                                    case 3:
                                        if (_.isFunction(removeAllPlayers)) removeAllPlayers();
                                        $scope.data.viewer.pdf.isOpenfileShower = false;

                                        if (!profile.prfTab.prfDocument.previewVisible) {
                                            _context.next = 39;
                                            break;
                                        }

                                        _context.next = 8;
                                        return JS.addJS("ecma5/ExternalLiberary/Public/getViewer.js?dev=" + randomVersionName);

                                    case 8:
                                        viewerType = getViewer(doc.mimeType);
                                        //if (!profile.prfMisc.acrobatPluginPreview && !_.includes(['video', 'audio', 'flash'], viewerType))
                                        //viewerType = 'flx';

                                        console.log(viewerType);
                                        _context.t0 = viewerType;
                                        _context.next = _context.t0 === "pdfjs" ? 13 : _context.t0 === "flash" ? 18 : _context.t0 === "video" ? 18 : _context.t0 === "audio" ? 18 : 31;
                                        break;

                                    case 13:
                                        $scope.data.viewer.type = "pdf";
                                        $scope.data.viewer.pdf.isOpenfileShower = true;
                                        $scope.data.viewer['pdf'].url = "/KeydocPro/services/rest/convertor/topdf?uuid=" + doc.uuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + "&" + Date.parse(new Date());
                                        if (_.isFunction($scope.data.viewer.pdf.changeURL)) $scope.data.viewer['pdf'].changeURL($scope.data.viewer['pdf'].url, pdfSearchContent, $scope.data.viewer['pdf'].showIcons);
                                        return _context.abrupt("break", 39);

                                    case 18:
                                        _context.next = 20;
                                        return JS.addJS("ecma5/ExternalLiberary/Public/getBrowserInformations.js?dev=" + randomVersionName);

                                    case 20:
                                        _context.next = 22;
                                        return getCurrentbrowserName();

                                    case 22:
                                        browserName = _context.sent;
                                        PATH = _.includes(["Firefox"], browserName.name) ? "/KeydocPro/services/rest/document/getContent?docId=" + doc.uuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + "&" + new Date().getTime() : "/KeydocPro/services/rest/document/getMedia?docId=" + doc.uuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + "&browserName=" + _.lowerCase(browserName.name);
                                        _context.next = 26;
                                        return JS.removeJS("ecma5/ExternalLiberary/Public/getBrowserInformations.js?dev=" + randomVersionName, 'getCurrentbrowserName,getCurrentbrowserType');

                                    case 26:
                                        $scope.data.player = {};
                                        $scope.data.viewer.type = "media";
                                        $scope.data.viewer.media.type = viewerType;
                                        try {
                                            $scope.data.viewer['player'].func({
                                                thumbnail: doc.thumbnailSrc,
                                                src: PATH, //`/KeydocPro/services/rest/document/getContent?docId=${doc.uuid}&authId=${localStorage.getItem('keydocAuth').replace(/Bearer\W/, '')}&${new Date().getTime()}`,
                                                //src :  "https://as7.asset.aparat.com/aparat-video/a_bg755f1g98ij3k7ij04hg006i36j16g9903g36958140-471u__518a6.apt?was=c2VydmVyX3RpbWU9MTEvMTkvMjAxNiA4OjAwOjM0IEFNJmhhc2hfdmFsdWU9UDZyd3pBTFZRaXpXNzhVcTdHeDVFQT09JnZhbGlkbWludXRlcz0xNDQwMCZpZD1leUp6ZVhOZmJtRnRaU0k2SW1Gd1lYSmhkQ0lzSW5ScGJXVWlPakUwTnprMU5ESTBNelFzSW5acFpDSTZOVGcwTnpBek9Td2lkMkYwWTJoZmRIbHdaU0k2SW5OcGRHVWlMQ0oyYVhOcGRGOXpZMjl3WlNJNk5Td2ljbTVrZFhObGNtbGtJam9pTlRnME56QXpPVEUwTnprMU5ESTBNelExTnpJNE9UVWlMQ0oxYzJWeVgybHdJam9pTWk0eE9UQXVNemt1TVRNMUlpd2laSFZ5WVhScGIyNGlPaUl6TURJNElpd2lkWE5sY21sa0lqb2lNVEkxT0RBMk5DSXNJbkIxWW14cGMyaGxjbWxrSWpvd2ZRPT0=",
                                                //src : "http://gamefa.org/user5/Trailer/2016/New_Trailers/PlayStation%204%20Pro%20Teardown%20_%20PS4%20Pro.mp4?_=1",
                                                type: /(audio)/.test(doc.mimeType) ? 'audio' : 'video',
                                                duration: undefined,
                                                guid: doc.uuid,
                                                service: sendService.document,
                                                tags: null,
                                                first: true
                                            }, profile.MultiMediaTagPermit);
                                        } catch (e) {
                                            console.error(e);
                                        }
                                        return _context.abrupt("break", 39);

                                    case 31:
                                        _context.t1 = doc.mimeType;
                                        _context.next = _context.t1 === "text/html" ? 34 : 37;
                                        break;

                                    case 34:
                                        $scope.data.viewer.type = "html";
                                        sendService.document.getContentWithAuth(doc.uuid).then(function (res) {
                                            $scope.data.viewer['html'].content = res.data;
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                        }, function (err) {
                                            toaster.pop("error", "", "مشکلی در دریافت سند به وجود آمده است.");
                                        });
                                        return _context.abrupt("break", 38);

                                    case 37:
                                        return _context.abrupt("break", 38);

                                    case 38:
                                        return _context.abrupt("break", 39);

                                    case 39:
                                        _context.next = 43;
                                        break;

                                    case 41:
                                        toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                                        Authentication.backToLoign();

                                    case 43:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee, undefined);
                    }));

                    $scope.func.loadMusic = function (url, ctx, type, doc) {

                        if (isCookieFunction('Authorization') != null) {

                            if (typeof $scope.data.req !== "undefined") $scope.data.req.abort();
                            try {
                                $scope.data.req = new XMLHttpRequest();
                                $scope.data.req.open('GET', url, true);
                                $scope.data.req.responseType = 'arraybuffer';

                                $scope.data.req.onload = function () {
                                    var response = $scope.data.req.response;
                                    ctx.decodeAudioData(response, function (buffer) {
                                        $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                        var duration = angular.copy(buffer.duration);
                                        buffer = undefined;
                                        $scope.data.req = undefined;

                                        ctx.close().then(function (res) {
                                            if (_.isFunction($scope.data.viewer['player'].func)) $scope.data.viewer['player'].func({
                                                thumbnail: doc.thumbnailSrc,
                                                src: "/KeydocPro/services/rest/document/getContent?docId=" + doc.uuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + "&" + new Date().getTime(),
                                                duration: duration,
                                                guid: doc.uuid,
                                                service: sendService.document,
                                                tags: null,
                                                first: true
                                            }, profile.MultiMediaTagPermit);
                                        }, function (error) {
                                            console.error("error");
                                        });
                                    }, function (error) {
                                        return $("#show-waiting-get-rest-from-server-id").removeClass('show-waiting');
                                    });
                                };
                                $scope.data.req.send();
                            } catch (e) {
                                console.error(e);
                            }
                        } else {
                            toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                            Authentication.backToLoign();
                        }
                    };

                    $scope.func.cancel = function () {
                        removeAllPlayers();
                        $uibModalInstance.close(true);
                    };
                    _.defer(function () {
                        return $scope.func.showFile();
                    }, 500);
                },
                size: 'lg',
                backdrop: 'static', // false,
                keyboard: false,
                resolve: {
                    doc: function doc() {
                        return _doc;
                    },
                    profile: function profile() {
                        return _profile;
                    },
                    Authentication: function Authentication() {
                        return _Authentication;
                    },
                    JS: function JS() {
                        return _JS;
                    },
                    sendService: function sendService() {
                        return _sendService;
                    },
                    pdfSearchContent: function pdfSearchContent() {
                        return typeof _pdfSearchContent === "undefined" ? null : _pdfSearchContent;
                    }
                }
            });
            modalInstance.result.then(function (response) {
                return resolve(response);
            }, function (error) {
                return reject(error);
            });
        } catch (e) {
            reject(e);
        }
    });
};