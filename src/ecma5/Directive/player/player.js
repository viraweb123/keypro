'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($compile, toaster, directiveService) {
    'ngInject';

    var _this2 = this;

    return {
        scope: {
            runing: '='
        },
        restrict: 'E',
        templateUrl: '../../../ecma5/Directive/player/player.html?dev=' + randomVersionName,
        controller: ['$scope', '$element', '$sce', '$filter', 'toaster', function ($scope, $element, $sce, $filter, toaster) {

            $scope.data = {
                getTages: false,
                item: null,
                audio: null,
                video: null,
                mainDiv: $element[0].querySelector('div.keydocpro-directive-player-id'),
                player: null,
                left: -1,
                showTag: false,
                tagButtom: false,
                time: {
                    duration: 0,
                    current: 0
                },
                tag: {
                    start: -1,
                    end: -1,
                    label: "",
                    thumnail: null,
                    addTag: null
                },
                icons: {
                    play: 'play',
                    tag: 'stop',
                    zoom: 'notFullScreen',
                    volume: 1
                },
                lookUpTable: {
                    play: {
                        play: 'pause',
                        pause: 'play'
                    },
                    zoom: {
                        notFullScreen: 'fullScreen',
                        fullScreen: 'notFullScreen'
                    },
                    tag: {
                        start: 'stop',
                        stop: 'start'
                    }
                },
                duration: Infinity,
                sort: {
                    ascDesc: false,
                    type: 'timeStart'
                },
                tags: []
            };

            //  TODO----------------------------------------------------  FUNCTIONS ----------------------------------------------

            $scope.func = {};

            $scope.func.isCanvasTransparent = function () {
                return new Promise(function (resolve, reject) {
                    try {
                        // true if all pixels Alpha equals to zero
                        var ctx = $scope.data.canvas.getContext('2d');

                        var imageData = ctx.getImageData(0, 0, $scope.data.canvas.offsetWidth, $scope.data.canvas.offsetHeight);
                        for (var i = 0; i < imageData.data.length; i += 4) {
                            if (imageData.data[i + 3] !== 0) resolve(true);
                        }resolve(false);
                    } catch (e) {
                        resolve(false);
                    }
                });
            };

            $scope.func.convertTime = function (time) {
                var h = Math.floor(parseInt(time) / 3600);
                var m = Math.floor((parseInt(time) - h * 3600) / 60);
                var s = Math.floor(parseInt(time) - h * 3600 - m * 60);
                return h != 0 ? h + " : " + m + " : " + s : m != 0 ? m + " : " + s : s;
            };

            $scope.func.changeTag = function (time, endTime) {
                try {

                    $scope.data.player.currentTime = time / 1000;
                    $scope.data.player.stopTime = endTime / 1000;
                    $scope.data.time.current = $scope.func.convertTime(time / 1000);
                    $scope.data.mainDiv.querySelector("span.currentTime").textContent = $filter('pNumber')($scope.data.time.current);
                    $scope.func.timeUpdate();
                    $scope.data.showTag = false;
                    if ($scope.data.icons.play == 'pause') _.defer(function () {
                        return $scope.func.icons.play();
                    }, 500);
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.grayScale = function () {
                var player = window.document.getElementById('directive-player-id');
                var w = player.videoWidth;
                var h = player.videoHeight;

                var canv = window.document.getElementById("player-thumnail-show-id");
                var ctx = canv.getContext('2d');
                ctx.clearRect(0, 0, canv.width, canv.height);
                var idata = ctx.getImageData(0, 0, w, h);
                var data = idata.data;
                // Loop through the pixels, turning them grayscale
                for (var i = 0; i < data.length; i += 4) {
                    var r = data[i];
                    var g = data[i + 1];
                    var b = data[i + 2];
                    var brightness = 3 * r + 4 * g + b >>> 3;
                    data[i] = brightness;
                    data[i + 1] = brightness;
                    data[i + 2] = brightness;
                }
                idata.data = data;
                // Draw the pixels onto the visible canvas
                ctx.putImageData(idata, 0, 0);
            };

            /*$scope.func.generateThumbnail = () => {
                     try {
                        var player = null;
                        if ($scope.data.item.type == "video") {
                            //player = window.document.querySelector('.keydocpro-directive-player-id video#directive-player-id');
                            player = window.document.getElementById('directive-player-id');
                         }else {
                            player = window.document.createElement("img");
                            player.src = 'static/img/mp3.png';
                        }
                        var [w,h]  =  [player.videoWidth,player.videoHeight];
                        $scope.data.ctx.drawImage(player, 0, 0, w, h, 0, 0, $scope.data.canvas.width, $scope.data.canvas.height);
                        $scope.data.tag.thumnail = $scope.data.canvas.toDataURL("image/jpeg");
                        _.defer(()=>$scope.$apply());
                    } catch (e) {
                        console.error(e);
                    }
                 //}, 1000);
                 /!*switch($scope.data.item.browserName){
                 case "Firefox":
                 var canvas = window.document.createElement('canvas');
                 canvas.width = "70";
                 canvas.height = "70";
                 var context = canvas.getContext('2d');
                 context.drawImage(player, 0, 0, w, h, 0, 0, 70, 70);
                 try{
                 var file = canvas.toDataURL("image/jpeg");
                 window.document.querySelector(".video-form-element .tag-iamge img#player-thumnail-show-id").setAttribute('Access-Control-Allow-Origin','*');//Accept
                 _.defer(()=>{
                 window.document.querySelector(".video-form-element .tag-iamge img#player-thumnail-show-id").src =  file;
                 //file.replace(/data:image\/(png|jpeg|jpg);base64,/, "");
                 $scope.data.tag.thumnail = file;
                 _.defer(()=>$scope.$apply());
                 },100);
                 }catch(e){
                 console.error(e);
                 }
                 break;
                 case "Chrome":
                 try{
                 let canvas = window.document.querySelector(".video-form-element .tag-iamge canvas#player-thumnail-show-id");
                 console.log(canvas);
                 canvas.getContext('2d').drawImage(player, 0, 0, w, h, 0, 0, 70, 70);
                 try{
                 $scope.data.tag.thumnail = canvas.toDataURL("image/jpeg");
                 _.defer(()=>$scope.$apply());
                 }catch(err){
                 console.error(err);
                 }
                 }catch(e){
                 console.error(e);
                 }
                 break;
                 }*!/
            };*/

            $scope.func.getUrl = function (url) {
                return $sce.trustAsResourceUrl(url);
            };

            $scope.func.icons = {

                play: function play() {
                    if ($scope.data.player != null) {
                        $scope.data.icons.play = $scope.data.lookUpTable.play[$scope.data.icons.play];
                        $scope.data.player[$scope.data.icons.play]();
                    }
                },
                stop: function stop() {

                    if ($scope.data.player != null) {
                        $scope.data.player.pause();
                        $scope.data.player.currentTime = 0;
                        $scope.data.icons.play = 'pause';
                    }
                },
                resize: function resize() {
                    if ($scope.data.player != null) {
                        $scope.data.icons.zoom = $scope.data.lookUpTable.zoom[$scope.data.icons.zoom];
                        $scope.func.icons[$scope.data.icons.zoom]();
                    }
                },
                tag: function tag() {
                    if ($scope.data.player != null) {
                        $scope.data.tag = {
                            start: -1,
                            end: -1,
                            label: "",
                            thumnail: null,
                            addTag: null
                        };
                        $scope.data.icons.tag = $scope.data.lookUpTable.tag[$scope.data.icons.tag];
                        $scope.func.tag[$scope.data.icons.tag]();
                    }
                },
                sound: function sound() {
                    if ($scope.data.player != null) {
                        if ($scope.data.player.volume > 0) {
                            $scope.data.player.volume = 0;
                            $scope.data.icons.volume = 0;
                        } else {
                            $scope.data.player.volume = 1;
                            $scope.data.icons.volume = 1;
                        }
                    }
                },
                changeVolume: function changeVolume() {
                    if ($scope.data.player != null) {
                        $scope.data.player.volume = $scope.data.icons.volume;
                    }
                },
                fullScreen: function fullScreen() {
                    var request = $scope.data.mainDiv.requestFullscreen || $scope.data.mainDiv.webkitRequestFullscreen || $scope.data.mainDiv.mozRequestFullScreen || $scope.data.mainDiv.msRequestFullscreen;
                    if (typeof request !== "undefined" && request) request.call($scope.data.mainDiv);else if (typeof window.ActiveXObject !== "undefined") {
                        /* for Internet Explorer */
                        var wscript = new ActiveXObject("WScript.Shell");
                        if (wscript != null) wscript.SendKeys("{F11}");
                    }
                    setTimeout(function () {
                        document.addEventListener('webkitfullscreenchange', $scope.func.notFullScreen, false);
                        document.addEventListener('mozfullscreenchange', $scope.func.notFullScreen, false);
                        document.addEventListener('fullscreenchange', $scope.func.notFullScreen, false);
                        document.addEventListener('MSFullscreenChange', $scope.func.notFullScreen, false);
                    }, 1000);
                },
                notFullScreen: function notFullScreen() {
                    var request = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
                    if (typeof request !== "undefined" && request) request.call(document);
                    $scope.data.icons.zoom = 'notFullScreen';
                    document.removeEventListener('webkitfullscreenchange', $scope.func.notFullScreen, false);
                    document.removeEventListener('mozfullscreenchange', $scope.func.notFullScreen, false);
                    document.removeEventListener('fullscreenchange', $scope.func.notFullScreen, false);
                    document.removeEventListener('MSFullscreenChange', $scope.func.notFullScreen, false);
                }

            };

            $scope.func.tag = {
                getTags: function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                        var _loop, i, src;

                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            var _this = this;

                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        $scope.data.getTages = true;
                                        _context.prev = 1;

                                        $scope.data.item.tags = [];
                                        _context.next = 5;
                                        return $scope.func.tag.getTagsList($scope.data.item.guid);

                                    case 5:
                                        $scope.data.item.tags = _context.sent;

                                        if (!(Array.isArray($scope.data.item.tags) && $scope.data.item.tags.length > 0)) {
                                            _context.next = 14;
                                            break;
                                        }

                                        _loop = regeneratorRuntime.mark(function _loop(i) {
                                            return regeneratorRuntime.wrap(function _loop$(_context2) {
                                                while (1) {
                                                    switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                            _context2.prev = 0;
                                                            _context2.next = 3;
                                                            return $scope.func.tag.getThumnail($scope.data.item.tags[i].id);

                                                        case 3:
                                                            src = _context2.sent;


                                                            src = src.replace(/\"/g, '');
                                                            src = src.replace(/\u003d/g, '');
                                                            ////src = base64.decode(src);

                                                            //if($scope.data.item.browserName =="Firefox"){
                                                            src = src.replace(new RegExp(/\"/, 'g'), '');
                                                            src = src.replace(new RegExp(/\\u003d/, 'g'), '');

                                                            //}

                                                            //src = "data:image/png;charset=utf-8;base64," + src;

                                                            _.defer(function () {
                                                                $scope.$apply($scope.data.item.tags[i].thumbnail = src);
                                                            });
                                                            _context2.next = 14;
                                                            break;

                                                        case 11:
                                                            _context2.prev = 11;
                                                            _context2.t0 = _context2['catch'](0);

                                                            $scope.data.item.tags[i].thumbnail = _context2.t0;

                                                        case 14:
                                                        case 'end':
                                                            return _context2.stop();
                                                    }
                                                }
                                            }, _loop, _this, [[0, 11]]);
                                        });
                                        i = 0;

                                    case 9:
                                        if (!(i < $scope.data.item.tags.length)) {
                                            _context.next = 14;
                                            break;
                                        }

                                        return _context.delegateYield(_loop(i), 't0', 11);

                                    case 11:
                                        i++;
                                        _context.next = 9;
                                        break;

                                    case 14:
                                        _context.next = 19;
                                        break;

                                    case 16:
                                        _context.prev = 16;
                                        _context.t1 = _context['catch'](1);

                                        //toaster.pop(e);
                                        console.error(_context.t1);

                                    case 19:
                                        _context.prev = 19;

                                        $scope.data.getTages = false;
                                        return _context.finish(19);

                                    case 22:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this2, [[1, 16, 19, 22]]);
                    }));

                    function getTags() {
                        return _ref.apply(this, arguments);
                    }

                    return getTags;
                }(),
                json2URL: function json2URL(json) {
                    return Object.keys(json).map(function (k) {
                        return encodeURIComponent(k) + '=' + encodeURIComponent(json[k]);
                    }).join('&');
                },
                getTagsList: function getTagsList(guid) {
                    return new Promise(function (resolve, reject) {
                        //$scope.data.item.service.getMediaTags(guid).then(
                        directiveService.document.getMediaTags(guid).then(function (res) {
                            return resolve(res.data.originalElement);
                        }, function (error) {
                            return reject('عدم دریافت تگ های مدیا از سرور');
                        });
                    });
                },
                getThumnail: function getThumnail(uuid) {
                    return new Promise(function (resolve, reject) {
                        //$scope.data.item.service.getMediaTagThumbnail(uuid).then(
                        directiveService.document.getMediaTagThumbnail(uuid).then(function (resThumnail) {
                            return resolve(resThumnail.data);
                        }, function (error) {
                            return reject('/resource/img/tiff.png');
                        });
                    });
                },
                createMediaTag: function createMediaTag(json) {
                    return new Promise(function (resolve, reject) {
                        //$scope.data.item.service.document.createMediaTag($scope.func.tag.json2URL(json)).then(
                        directiveService.document.createMediaTag($scope.func.tag.json2URL(json)).then(function (res) {
                            json.uuid = res.data;
                            resolve(json);
                        }, function (error) {
                            return reject('عدم افزودن تگ جدید');
                        });
                    });
                },
                removeSelectedTag: function () {
                    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(tag) {
                        return regeneratorRuntime.wrap(function _callee3$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        _context4.prev = 0;
                                        return _context4.delegateYield(regeneratorRuntime.mark(function _callee2() {
                                            var index;
                                            return regeneratorRuntime.wrap(function _callee2$(_context3) {
                                                while (1) {
                                                    switch (_context3.prev = _context3.next) {
                                                        case 0:
                                                            _context3.next = 2;
                                                            return $scope.func.tag.removeMediaTag(tag.id);

                                                        case 2:
                                                            index = _.findIndex($scope.data.item.tags, function (t) {
                                                                return t.id == tag.id;
                                                            });

                                                            if (index > -1) {
                                                                _.defer(function () {
                                                                    $scope.$apply($scope.data.item.tags.splice(index, 1));
                                                                });
                                                                toaster.pop('success', "", 'تگ با موفقیت حذف گردید .');
                                                            }

                                                        case 4:
                                                        case 'end':
                                                            return _context3.stop();
                                                    }
                                                }
                                            }, _callee2, _this2);
                                        })(), 't0', 2);

                                    case 2:
                                        _context4.next = 7;
                                        break;

                                    case 4:
                                        _context4.prev = 4;
                                        _context4.t1 = _context4['catch'](0);

                                        toaster.pop("error", "", "مشکلی در حذف تگ انتخابی به وجود آمده است .");

                                    case 7:
                                    case 'end':
                                        return _context4.stop();
                                }
                            }
                        }, _callee3, _this2, [[0, 4]]);
                    }));

                    function removeSelectedTag(_x) {
                        return _ref2.apply(this, arguments);
                    }

                    return removeSelectedTag;
                }(),
                removeMediaTag: function removeMediaTag(uuid) {
                    return new Promise(function (resolve, reject) {
                        //$scope.data.item.service.removeMediaTag(uuid).then(
                        directiveService.document.removeMediaTag(uuid).then(function (res) {
                            return resolve(true);
                        }, function (error) {
                            return reject('عدم حذف تگ .');
                        });
                    });
                },
                removeAllMediaTag: function removeAllMediaTag(guid) {
                    return new Promise(function (resolve, reject) {
                        //$scope.data.item.service.removeAllMediaTag(guid).then(
                        directiveService.document.removeAllMediaTag(guid).then(function (res) {
                            return resolve(true);
                        }, function (error) {
                            return reject('عدم حذف تمام تگ ها .');
                        });
                    });
                },
                addNewTag: function () {
                    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                        var isCanvasImage, newTag, res;
                        return regeneratorRuntime.wrap(function _callee4$(_context5) {
                            while (1) {
                                switch (_context5.prev = _context5.next) {
                                    case 0:
                                        _context5.prev = 0;
                                        _context5.next = 3;
                                        return $scope.func.isCanvasTransparent();

                                    case 3:
                                        isCanvasImage = _context5.sent;

                                        if (!isCanvasImage) {
                                            _context5.next = 14;
                                            break;
                                        }

                                        newTag = {
                                            title: $scope.data.tag.label,
                                            timeStart: $scope.data.tag.start * 1000,
                                            timeEnd: $scope.data.tag.end * 1000,
                                            thumbnail: $scope.data.canvas.toDataURL("image/jpeg"), //$scope.data.tag.thumnail.replace('data:image/png;base64,','') ,
                                            uuid: $scope.data.item.guid
                                        };
                                        _context5.next = 8;
                                        return $scope.func.tag.createMediaTag(newTag);

                                    case 8:
                                        res = _context5.sent;

                                        $scope.data.item.tags = $scope.data.item.tags != null ? $scope.data.item.tags : [];
                                        $scope.data.item.tags.push({
                                            title: newTag.title,
                                            timeStart: newTag.timeStart,
                                            timeEnd: newTag.timeEnd,
                                            thumbnail: $scope.data.canvas.toDataURL("image/jpeg"), //'data:image/png;base64,'+ newTag.thumbnail,
                                            uuid: $scope.data.item.guid,
                                            id: res.uuid
                                        });
                                        $scope.func.tag.stop();
                                        _context5.next = 15;
                                        break;

                                    case 14:
                                        toaster.pop("error", "", "لطفا یک تصویر پیش فرض انتخاب کنید.");

                                    case 15:

                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        _context5.next = 21;
                                        break;

                                    case 18:
                                        _context5.prev = 18;
                                        _context5.t0 = _context5['catch'](0);

                                        console.error(_context5.t0);

                                    case 21:
                                    case 'end':
                                        return _context5.stop();
                                }
                            }
                        }, _callee4, _this2, [[0, 18]]);
                    }));

                    function addNewTag() {
                        return _ref3.apply(this, arguments);
                    }

                    return addNewTag;
                }(),
                start: function start() {
                    $scope.data.icons.play = 'play';
                    $scope.func.icons.play();
                    $scope.data.tag.addTag = 0;
                    _.defer(function () {
                        return $scope.$apply();
                    });
                },
                stop: function stop() {
                    $scope.data.mainDiv.querySelector(".progress > span#lastBind").style.opacity = 0;
                    $scope.data.mainDiv.querySelector(".progress > span#firstBind").style.opacity = 0;
                    $scope.data.tag = {
                        start: -1,
                        end: -1,
                        label: "",
                        thumnail: null,
                        addTag: null
                    };
                    $scope.data.icons.tag = 'stop';
                    _.defer(function () {
                        return $scope.$apply();
                    });
                },
                getLabel: function getLabel() {
                    $scope.data.mainDiv.querySelector(".progress > span#lastBind").style.opacity = 0;
                    $scope.data.mainDiv.querySelector(".progress > span#firstBind").style.opacity = 0;
                    $scope.func.icons.tag();
                    _.defer(function () {
                        return $scope.$apply();
                    });
                }
            };

            $scope.func.timeUpdate = function () {
                try {
                    var buffered = $scope.data.player.buffered;
                    if ($scope.data.mainDiv.querySelector('.progress-bar')) {
                        $scope.data.mainDiv.querySelector('.progress-bar').style.width = parseFloat($scope.data.player.currentTime) / parseFloat($scope.data.duration) * 100 + '%';
                        $scope.data.time.current = $scope.func.convertTime($scope.data.player.currentTime);

                        $scope.data.mainDiv.querySelector("span.currentTime").textContent = $filter('pNumber')($scope.data.time.current);
                        if ($scope.data.player.currentTime > 0 && $scope.data.player.ended == false) $scope.func.buffered();
                        if (_.has($scope.data.player, 'stopTime') && $scope.data.player.stopTime != null && $scope.data.player.stopTime <= $scope.data.time.current) {
                            $scope.data.player.stopTime = null;
                            $scope.data.tag.addTag == null;
                            $scope.func.icons.play();
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            };

            $scope.func.buffered = function () {
                var buffered = $scope.data.player.buffered;
                $($scope.data.mainDiv.querySelector('.progress')).find('[class^=buffered]').remove();
                // If buffered regions exist
                if (buffered.length > 0) {
                    var i = buffered.length;
                    while (i--) {
                        var maxBuffer = buffered.end(i);
                        var minBuffer = buffered.start(i);
                        var bufferOffset = minBuffer / $scope.data.duration * 100;
                        var bufferWidth = (maxBuffer - minBuffer) / $scope.data.duration * 100;
                        $('<div class="buffered"></div>').css("left", bufferOffset + '%').css('width', bufferWidth + '%').appendTo($scope.data.mainDiv.querySelector('.progress'));
                    }
                }
            };

            $scope.func.mouseDownEvent = function (e) {
                e.preventDefault();
                $scope.data.player.currentTime = (e.pageX - $('.keydocpro-directive-player-id .progress').offset().left) / $('.keydocpro-directive-player-id .progress').width() * $scope.data.duration;
                $scope.data.time.current = $scope.func.convertTime($scope.data.player.currentTime);
                if ($scope.data.tag.addTag != null) {
                    switch ($scope.data.tag.addTag) {
                        case 0:
                            var first = $scope.data.mainDiv.querySelector(".progress > span#firstBind");
                            $scope.data.left = e.pageX;
                            first.style.left = e.pageX - $('.keydocpro-directive-player-id .progress').offset().left + 'px';
                            first.style.opacity = 1;
                            $scope.data.tag.addTag++;
                            $scope.data.tag.start = $scope.data.player.currentTime;
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            //$scope.data.tag.start = $scope.data.player.currentTime;
                            break;
                        case 1:
                            if ($scope.data.player.currentTime > $scope.data.tag.start) {
                                var last = $scope.data.mainDiv.querySelector(".progress > span#lastBind");
                                last.style.left = e.pageX - $('.keydocpro-directive-player-id .progress').offset().left + 'px';
                                last.style.opacity = 1;
                                $scope.data.tag.addTag++;
                                //window.document.getElementById("show-width-progressbar-id").style.width = (e.pageX - $scope.data.left) + "px";
                                $scope.data.left = -1;
                                $scope.data.tag.end = $scope.data.player.currentTime;
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                                //$scope.data.tag.end = $scope.data.player.currentTime;
                            } else {
                                toaster.pop("error", "", "زمان پایان مقدار بیشتری از زمان شروع می خواهد.");
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            }
                            break;
                        case 2:

                            var player = null;
                            if ($scope.data.item.type == "video") {
                                player = window.document.getElementById('directive-player-id');
                            } else {
                                player = window.document.createElement("img");
                                player.src = 'static/img/mp3.png';
                            }
                            if ($scope.data.player.currentTime >= $scope.data.tag.start && $scope.data.player.currentTime <= $scope.data.tag.end) {

                                if (player.nodeName == "VIDEO") {
                                    if ($scope.data.item.browserName == "Firefox") player.pause();else {
                                        player.autoplay = false;
                                        var p = player.play();
                                        if (p && p instanceof Promise) p.then(function (r) {
                                            return player.pause();
                                        });
                                    }
                                } else if (player.nodeName == "IMG") {
                                    var w = player.width;
                                    var h = player.height;

                                    $scope.data.ctx = $scope.data.canvas.getContext('2d');
                                    $scope.data.ctx.drawImage(player, 0, 0, w, h, 0, 0, $scope.data.canvas.width, $scope.data.canvas.height);
                                }
                            } else {
                                try {
                                    var w = player.videoWidth;
                                    var h = player.videoHeight;

                                    $scope.data.ctx = $scope.data.canvas.getContext('2d');
                                    $scope.data.ctx.clearRect(0, 0, $scope.data.canvas.width, $scope.data.canvas.height);
                                } catch (e) {
                                    console.error(e);
                                } finally {
                                    toaster.pop("error", "", "لطفا تصویر را بین ناحیه انتخابی انتخاب کنید.");
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    _.defer(function () {
                        return $scope.$apply();
                    });
                }
            };

            $scope.func.initiallize = function () {
                if (!$scope.data.getTages) {
                    $scope.data.tag.addTag = 0;
                    $scope.data.tag = {
                        start: -1,
                        end: -1,
                        label: "",
                        thumnail: null,
                        addTag: null
                    };
                    try {
                        $scope.data.mainDiv.querySelector(".progress > span#lastBind").style.opacity = 0;
                        $scope.data.mainDiv.querySelector(".progress > span#firstBind").style.opacity = 0;
                    } catch (e) {
                        console.error(e);
                    }
                    $scope.data.duration = $scope.data.player.duration !== Infinity ? $scope.data.player.duration : $scope.data.item.duration;
                    $scope.data.time.duration = $scope.func.convertTime($scope.data.duration);
                    $scope.data.time.current = $scope.func.convertTime(0);

                    $scope.func.tag.getTags();
                    $scope.data.mainDiv.querySelector("span.currentTime").textContent = $filter('pNumber')($scope.data.time.current);
                    $scope.data.mainDiv.querySelector("span.durationTime").textContent = $filter('pNumber')($scope.data.time.duration);
                    $scope.data.player.addEventListener('timeupdate', $scope.func.timeUpdate, false);

                    $scope.data.canvas = window.document.getElementById("player-thumnail-show-id");

                    $scope.data.player.addEventListener('seeking', function () {

                        _.defer(function () {
                            if ($scope.data.tag.addTag != null) {
                                if ($scope.data.tag.addTag == 2 && $scope.data.player.currentTime >= $scope.data.tag.start && $scope.data.player.currentTime <= $scope.data.tag.end) {
                                    try {
                                        var player = null;
                                        if ($scope.data.item.type == "video") {
                                            //player = window.document.querySelector('.keydocpro-directive-player-id video#directive-player-id');
                                            player = window.document.getElementById('directive-player-id');
                                        } else {
                                            player = window.document.createElement("img");
                                            player.src = 'static/img/mp3.png';
                                        }
                                        var w = 0;
                                        var h = 0;

                                        if (player.nodeName == "VIDEO") {
                                            w = player.videoWidth;
                                            h = player.videoHeight;
                                        } else if (player.nodeName == "IMG") {
                                            w = player.width;
                                            h = player.height;
                                        }

                                        $scope.data.ctx.clearRect(0, 0, $scope.data.canvas.width, $scope.data.canvas.height);
                                        $scope.data.ctx.drawImage(player, 0, 0, w, h, 0, 0, $scope.data.canvas.width, $scope.data.canvas.height);
                                        //document.querySelector(".video-form-element .tag-iamge").appendChild(canv);
                                        $scope.data.tag.thumnail = $scope.data.canvas.toDataURL("image/jpeg");
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }
                            }
                        }, 500);
                    }, false);

                    $scope.data.player.addEventListener("pause", function () {

                        var player = null;
                        if ($scope.data.item.type == "video") {
                            player = window.document.getElementById('directive-player-id');
                        } else {
                            player = window.document.createElement("img");
                            player.src = 'static/img/mp3.png';
                        }
                        var w = 0;
                        var h = 0;

                        if (player.nodeName == "VIDEO") {
                            w = player.videoWidth;
                            h = player.videoHeight;
                        } else if (player.nodeName == "IMG") {
                            w = player.width;
                            h = player.height;
                        }
                        $scope.data.ctx = $scope.data.canvas.getContext('2d');
                        $scope.data.canvas.getContext('2d').drawImage(player, 0, 0, w, h, 0, 0, 70, 70);
                        $scope.data.ctx.drawImage(player, 0, 0, w, h, 0, 0, $scope.data.canvas.width, $scope.data.canvas.height);
                    }, false);

                    $scope.data.player.play();
                    $scope.func.buffered();

                    _.defer(function () {
                        return $scope.$apply();
                    });
                }
            };

            $scope.InitAndRun = function (data, tagButtom) {
                $scope.data.getTages = false;

                try {
                    if (typeof tagButtom !== "undefined" && _.isBoolean(tagButtom)) $scope.data.tagButtom = tagButtom;
                    $scope.data.tag = {
                        start: -1,
                        end: -1,
                        label: "",
                        thumnail: null,
                        addTag: null
                    };

                    _.defer(function () {
                        return $scope.$apply();
                    });
                    try {
                        $scope.data.mainDiv.querySelector(".progress > span#lastBind").style.opacity = 0;
                        $scope.data.mainDiv.querySelector(".progress > span#firstBind").style.opacity = 0;
                    } catch (e) {
                        console.error(e);
                    }
                    $scope.data.item = data;

                    // ["Chrome","Firefox"]
                    $scope.data.item.browserName = _.has(data, 'browserName') ? data.browserName : "Firefox";

                    if ($scope.data.player != null) {
                        $scope.data.player.pause();
                        try {
                            $scope.data.player.src = "";
                            $scope.data.player.poster = "";
                            $scope.data.player = null;
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    $scope.data.player = $scope.data.mainDiv.querySelector(data.type + '#directive-player-id');
                    $scope.data.video = $scope.data.audio = null;
                    $scope.data[data.type] = _.clone(data.src);
                    $scope.data.player.poster = $scope.data.item.thumbnail;
                    $scope.data.player.addEventListener('loadedmetadata', function () {
                        return $scope.func.initiallize();
                    });
                    //$scope.data.player.src = _.clone($scope.data.item.src + '|trustUrl');
                    $scope.data.player.src = _.clone(data.src); //  + '|trustUrl'
                    _.defer(function () {
                        return $scope.$apply();
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            if ($scope.runing == null) {
                $scope.runing = $scope.InitAndRun;
            }
            $element.on('$destroy', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                try {
                                    if ($scope.data.player != null) {
                                        $scope.data.player.removeEventListener('timeupdate', $scope.func.timeUpdate);
                                        $('.keydocpro-directive-player-id .progress').unbind('mousedown', $scope.func.mouseDownEvent);
                                        //$('.keydocpro-directive-player-id .progress').unbind('click' , $scope.func.mouseDownEvent);
                                        $scope.func.icons.stop();
                                        $scope.data.player = null;
                                    }
                                    $scope.func = undefined;
                                    $scope.data = undefined;
                                    $scope.$destroy();
                                } catch (e) {
                                    console.error(e);
                                }

                            case 1:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee5, _this2);
            })));
        }]

    };
};

var _Base = require('./../../Class/Base64');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

;