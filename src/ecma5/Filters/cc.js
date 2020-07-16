'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function ($compile, toaster) {
    'ngInject';

    return {
        scope: {
            runing: '='
        },
        restrict: 'E',
        templateUrl: '../../../es5/Classes/directives/player.html?dev=' + randomVersionName,
        controller: ['$scope', '$element', '$sce', '$filter', 'toaster', function ($scope, $element, $sce, $filter, toaster) {
            var _this2 = this;

            $scope.data = {
                item: null,
                audio: null,
                video: null,
                mainDiv: $element[0].querySelector('div.keydocpro-directive-player-id'),
                player: null,
                left: -1,
                showTag: false,
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
                    ascDesc: true,
                    type: 'tag.start'
                }
            };

            $scope.func = {

                tag: {

                    getTags: function () {
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                            var _loop, i;

                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                var _this = this;

                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.prev = 0;
                                            _context.next = 3;
                                            return $scope.func.tag.getTagsList($scope.data.item.guid);

                                        case 3:
                                            $scope.data.item.tags = _context.sent;

                                            if (!(Array.isArray($scope.data.item.tags) && $scope.data.item.tags.length > 0)) {
                                                _context.next = 12;
                                                break;
                                            }

                                            _loop = regeneratorRuntime.mark(function _loop(i) {
                                                return regeneratorRuntime.wrap(function _loop$(_context3) {
                                                    while (1) {
                                                        switch (_context3.prev = _context3.next) {
                                                            case 0:
                                                                _context3.prev = 0;
                                                                return _context3.delegateYield(regeneratorRuntime.mark(function _callee2() {
                                                                    var src;
                                                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                                        while (1) {
                                                                            switch (_context2.prev = _context2.next) {
                                                                                case 0:
                                                                                    _context2.next = 2;
                                                                                    return $scope.func.tag.getThumnail($scope.data.item.tags[i].id);

                                                                                case 2:
                                                                                    src = _context2.sent;

                                                                                    src = src.replace(new RegExp(/\"/, 'g'), '');
                                                                                    src = src.replace(new RegExp(/\\u003d/, 'g'), '');
                                                                                    //src = base64.decode(src);
                                                                                    src = "data:image/png;charset=utf-8;base64," + src;
                                                                                    _.defer(function () {
                                                                                        $scope.$apply($scope.data.item.tags[i].thumbnail = src);
                                                                                    });

                                                                                case 7:
                                                                                case 'end':
                                                                                    return _context2.stop();
                                                                            }
                                                                        }
                                                                    }, _callee2, _this);
                                                                })(), 't0', 2);

                                                            case 2:
                                                                _context3.next = 7;
                                                                break;

                                                            case 4:
                                                                _context3.prev = 4;
                                                                _context3.t1 = _context3['catch'](0);

                                                                $scope.data.item.tags[i].thumbnail = _context3.t1;

                                                            case 7:
                                                            case 'end':
                                                                return _context3.stop();
                                                        }
                                                    }
                                                }, _loop, _this, [[0, 4]]);
                                            });
                                            i = 0;

                                        case 7:
                                            if (!(i < $scope.data.item.tags.length)) {
                                                _context.next = 12;
                                                break;
                                            }

                                            return _context.delegateYield(_loop(i), 't0', 9);

                                        case 9:
                                            i++;
                                            _context.next = 7;
                                            break;

                                        case 12:
                                            _context.next = 17;
                                            break;

                                        case 14:
                                            _context.prev = 14;
                                            _context.t1 = _context['catch'](0);

                                            // toaster.pop(e);
                                            console.error(_context.t1);

                                        case 17:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this2, [[0, 14]]);
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
                            try {
                                $scope.data.item.service.getMediaTags(guid).then(function (res) {
                                    return resolve(res.data.originalElement);
                                }, function (error) {
                                    return reject('عدم دریافت تگ های مدیا از سرور');
                                });
                            } catch (e) {
                                reject('عدم دریافت تگ های مدیا از سرور');
                            }
                        });
                    },

                    getThumnail: function getThumnail(uuid) {
                        return new Promise(function (resolve, reject) {
                            $scope.data.item.service.getMediaTagThumbnail(uuid).then(function (resThumnail) {
                                return resolve(resThumnail.data);
                            }, function (error) {
                                return reject('/resource/img/tiff.png');
                            });
                        });
                    },

                    createMediaTag: function createMediaTag(json) {
                        return new Promise(function (resolve, reject) {
                            $scope.data.item.service.createMediaTag($scope.func.tag.json2URL(json)).then(function (res) {
                                json.uuid = res.data;
                                resolve(json);
                            }, function (error) {
                                return reject('عدم افزودن تگ جدید');
                            });
                        });
                    },

                    removeSelectedTag: function () {
                        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(tag) {
                            return regeneratorRuntime.wrap(function _callee4$(_context5) {
                                while (1) {
                                    switch (_context5.prev = _context5.next) {
                                        case 0:
                                            _context5.prev = 0;
                                            return _context5.delegateYield(regeneratorRuntime.mark(function _callee3() {
                                                var index;
                                                return regeneratorRuntime.wrap(function _callee3$(_context4) {
                                                    while (1) {
                                                        switch (_context4.prev = _context4.next) {
                                                            case 0:
                                                                _context4.next = 2;
                                                                return $scope.func.tag.removeMediaTag(tag.id);

                                                            case 2:
                                                                index = _.findIndex($scope.data.item.tags, function (t) {
                                                                    return t.id == tag.id;
                                                                });

                                                                if (index > -1) {
                                                                    _.defer(function () {
                                                                        $scope.$apply($scope.data.item.tags.splice(index, 1));
                                                                    });
                                                                }

                                                            case 4:
                                                            case 'end':
                                                                return _context4.stop();
                                                        }
                                                    }
                                                }, _callee3, _this2);
                                            })(), 't0', 2);

                                        case 2:
                                            _context5.next = 7;
                                            break;

                                        case 4:
                                            _context5.prev = 4;
                                            _context5.t1 = _context5['catch'](0);

                                            console.error(_context5.t1);

                                        case 7:
                                        case 'end':
                                            return _context5.stop();
                                    }
                                }
                            }, _callee4, _this2, [[0, 4]]);
                        }));

                        function removeSelectedTag(_x) {
                            return _ref2.apply(this, arguments);
                        }

                        return removeSelectedTag;
                    }(),

                    removeMediaTag: function removeMediaTag(uuid) {
                        return new Promise(function (resolve, reject) {
                            $scope.data.item.service.removeMediaTag(uuid).then(function (res) {
                                return resolve(true);
                            }, function (error) {
                                return reject('عدم حذف تگ');
                            });
                        });
                    },

                    removeAllMediaTag: function removeAllMediaTag(guid) {
                        return new Promise(function (resolve, reject) {
                            $scope.data.item.service.removeAllMediaTag(guid).then(function (res) {
                                return resolve(true);
                            }, function (error) {
                                return reject('عدم حذف تمام تگ ها');
                            });
                        });
                    },

                    addNewTag: function () {
                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(id) {
                            return regeneratorRuntime.wrap(function _callee6$(_context7) {
                                while (1) {
                                    switch (_context7.prev = _context7.next) {
                                        case 0:
                                            _context7.prev = 0;
                                            return _context7.delegateYield(regeneratorRuntime.mark(function _callee5() {
                                                var newTag, res;
                                                return regeneratorRuntime.wrap(function _callee5$(_context6) {
                                                    while (1) {
                                                        switch (_context6.prev = _context6.next) {
                                                            case 0:
                                                                newTag = {
                                                                    title: $scope.data.tag.label,
                                                                    timeStart: $scope.data.tag.start * 1000,
                                                                    timeEnd: $scope.data.tag.end * 1000,
                                                                    thumbnail: $scope.data.tag.thumnail.replace('data:image/png;base64,', ''),
                                                                    uuid: $scope.data.item.guid
                                                                };
                                                                _context6.next = 3;
                                                                return $scope.func.tag.createMediaTag(newTag);

                                                            case 3:
                                                                res = _context6.sent;

                                                                $scope.data.item.tags = $scope.data.item.tags != null ? $scope.data.item.tags : [];
                                                                _.defer(function () {
                                                                    $scope.$apply($scope.data.item.tags.push({
                                                                        title: newTag.title,
                                                                        timeStart: newTag.timeStart,
                                                                        timeEnd: newTag.timeEnd,
                                                                        thumbnail: 'data:image/png;base64,' + newTag.thumbnail,
                                                                        uuid: $scope.data.item.guid,
                                                                        id: res.uuid
                                                                    }));
                                                                });

                                                            case 6:
                                                            case 'end':
                                                                return _context6.stop();
                                                        }
                                                    }
                                                }, _callee5, _this2);
                                            })(), 't0', 2);

                                        case 2:
                                            _context7.next = 7;
                                            break;

                                        case 4:
                                            _context7.prev = 4;
                                            _context7.t1 = _context7['catch'](0);

                                            //  toaster(e);
                                            console.error(_context7.t1);

                                        case 7:

                                            $scope.func.tag.stop();

                                        case 8:
                                        case 'end':
                                            return _context7.stop();
                                    }
                                }
                            }, _callee6, _this2, [[0, 4]]);
                        }));

                        function addNewTag(_x2) {
                            return _ref3.apply(this, arguments);
                        }

                        return addNewTag;
                    }(),

                    start: function start() {
                        $scope.data.icons.play = 'play';
                        $scope.func.icons.play();
                        $scope.data.tag.addTag = 0;
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
                    },
                    getLabel: function getLabel() {
                        $scope.data.mainDiv.querySelector(".progress > span#lastBind").style.opacity = 0;
                        $scope.data.mainDiv.querySelector(".progress > span#firstBind").style.opacity = 0;
                        $scope.func.icons.tag();
                    }
                },

                generateThumbnail: function generateThumbnail() {

                    var canvas = document.createElement('canvas');
                    canvas.width = "70";
                    canvas.height = "70";
                    var context = canvas.getContext('2d');
                    var player = null;
                    if ($scope.data.item.type == "video") player = $scope.data.mainDiv.querySelector($scope.data.item.type + '#player-id');else {
                        player = window.document.createElement("img");
                        player.src = '../../../resource/img/mp3.png';
                    }

                    context.drawImage(player, 0, 0, player.videoWidth || player.width, player.videoHeight || player.height, 0, 0, 70, 70);
                    window.document.querySelector("img#player-thumnail-show-id").setAttribute('Access-Control-Allow-Origin', '*');
                    window.document.querySelector("img#player-thumnail-show-id").setAttribute('src', canvas.toDataURL());
                    $scope.data.tag.thumnail = canvas.toDataURL();
                },

                changeTag: function changeTag(time) {
                    $scope.data.player.currentTime = time / 1000;

                    /*_.defer(()=> {
                     $scope.$apply($scope.$apply($scope.data.time.current = $scope.func.convertTime(time/1000)))
                     });*/
                    $scope.data.time.current = $scope.func.convertTime(time / 1000);
                    $scope.data.mainDiv.querySelector("span.currentTime").textContent = $filter('pNumber')($scope.data.time.current);
                    $scope.func.timeUpdate();
                },
                convertTime: function convertTime(time) {
                    var h = Math.floor(parseInt(time) / 3600);
                    var m = Math.floor((parseInt(time) - h * 3600) / 60);
                    var s = Math.floor(parseInt(time) - h * 3600 - m * 60);
                    return h != 0 ? h + " : " + m + " : " + s : m != 0 ? m + " : " + s : s;
                },
                getUrl: function getUrl(url) {
                    return $sce.trustAsResourceUrl(url);
                },

                icons: {
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
                },
                initiallize: function initiallize() {

                    $scope.data.duration = $scope.data.player.duration !== Infinity ? $scope.data.player.duration : $scope.data.item.duration;
                    $scope.data.time.duration = $scope.func.convertTime($scope.data.duration);
                    $scope.data.time.current = $scope.func.convertTime(0);

                    $scope.func.tag.getTags();
                    $scope.data.mainDiv.querySelector("span.currentTime").textContent = $filter('pNumber')($scope.data.time.current);
                    $scope.data.mainDiv.querySelector("span.durationTime").textContent = $filter('pNumber')($scope.data.time.duration);

                    $scope.data.player.addEventListener('timeupdate', $scope.func.timeUpdate, false);
                    $scope.data.player.play();
                    $('.keydocpro-directive-player-id .progress').bind('mousedown', $scope.func.mouseDownEvent);
                    $scope.func.buffered();
                },
                timeUpdate: function timeUpdate() {
                    if ($scope.data.player != null) if ($scope.data.mainDiv.querySelector('.progress-bar')) {
                        $scope.data.mainDiv.querySelector('.progress-bar').style.width = parseFloat($scope.data.player.currentTime) / parseFloat($scope.data.duration) * 100 + '%';
                        /* _.defer(()=> {
                         $scope.$apply($scope.data.time.current = $scope.func.convertTime($scope.data.player.currentTime))
                         });*/

                        $scope.data.time.current = $scope.func.convertTime($scope.data.player.currentTime);
                        $scope.data.mainDiv.querySelector("span.currentTime").textContent = $filter('pNumber')($scope.data.time.current);

                        //console.log( (100 * $scope.data.player.buffered.end(0)) / $scope.data.duration );
                        /*  $scope.data.player.paused == false */
                        if ($scope.data.player.currentTime > 0 && $scope.data.player.ended == false) $scope.func.buffered();
                    }
                },
                buffered: function buffered() {
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
                            _.defer(function () {
                                $scope.$apply($scope.data.tag.start = $scope.data.player.currentTime);
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
                                _.defer(function () {
                                    $scope.$apply($scope.data.tag.end = $scope.data.player.currentTime);
                                });
                                //$scope.data.tag.end = $scope.data.player.currentTime;
                            }
                            break;
                        case 2:
                            if ($scope.data.player.currentTime >= $scope.data.tag.start && $scope.data.player.currentTime <= $scope.data.tag.end) {
                                $scope.func.generateThumbnail();
                            }

                            break;
                        default:

                            break;
                    }
                }
            };

            $scope.InitAndRun = function (data) {

                //$scope.func.icons.stop();
                $scope.data.player = null;
                $scope.data.item = angular.copy(data);
                $scope.data.player = $scope.data.mainDiv.querySelector(data.type + '#player-id');
                $scope.data.video = $scope.data.audio = null;
                $scope.data[data.type] = angular.copy(data.src);
                $scope.data.player.poster = $scope.data.item.thumbnail;
                $scope.data.player.src = $scope.data.item.src + '|trustUrl';
                $scope.data.player.addEventListener('loadedmetadata', function () {
                    return $scope.func.initiallize();
                });
            };
            if ($scope.runing == null) $scope.runing = $scope.InitAndRun;
            $element.on('$destroy', function () {
                if ($scope.data.player != null) {
                    $scope.data.player.removeEventListener('timeupdate', $scope.func.timeUpdate);
                    $('.keydocpro-directive-player-id .progress').unbind('mousedown', $scope.func.mouseDownEvent);
                    $scope.func.icons.stop();
                    $scope.data.player = null;
                }
            });
        }]

    };
};

var _Base = require('./../service/Base64');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

;