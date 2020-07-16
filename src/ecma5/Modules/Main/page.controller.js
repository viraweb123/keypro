'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PageCtrl = undefined;

var _CurrentUserInfoSrvc = require('./../../Class/Service/CurrentUserInfoSrvc');

var _CurrentUserInfoSrvc2 = _interopRequireDefault(_CurrentUserInfoSrvc);

var _Base = require('./../../Class/Base64');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageCtrl = exports.PageCtrl = function PageCtrl($scope, $rootScope, $state, mainService, $uibModal, $upload, Authentication, $http, toaster, $interval) {
    var _this = this;

    _classCallCheck(this, PageCtrl);

    $scope.$on("changeFeature", function (args) {
        $scope.func.getFeatures();
    });

    $scope.$on('$stateChangeSuccess', function () {
        $scope.data.currentState = _.intersection(_.keys($scope.data.states), _.split($state.$current.name, '.'))[0];
        _.defer(function () {
            return $scope.$apply();
        });
    });

    $scope.data = {
        requestRunning: null,
        isReadyDom: null,
        isShowEasyAccess: false,
        showInfo: false,
        removeExternalFuncs: {},
        isOpenFabSpeed: false,
        currentState: null,
        features: null,
        states: {
            'desktop': {
                icon: 'fa-desktop',
                name: 'میزکار',
                view: 'desktopVisible',
                activeClass: 'desktopActive',
                tooltip: 'میزکار'
            },
            'simple': {
                icon: 'fa-search',
                name: 'جستجو',
                view: 'searchVisible',
                activeClass: 'simpleActive',
                tooltip: 'جستجوی ساده'
            },
            'advance': {
                icon: 'fa-filter',
                name: 'فیلتر',
                view: 'searchVisible',
                activeClass: 'advanceActive',
                tooltip: 'جستجوی پیشرفته'
            },
            'cloud': {
                icon: 'fa-cloud',
                name: 'کلید واژه',
                view: 'cloudVisible',
                activeClass: 'cloudActive',
                tooltip: 'کلید واژه'
            },
            'report': {
                icon: 'fa-newspaper-o',
                name: 'گزارش',
                view: 'reportVisible',
                activeClass: 'reportActive',
                tooltip: 'گزارش'
            },
            'dashboard': {
                icon: 'fa-dashboard',
                name: 'کارتابل',
                view: 'dashboardVisible',
                activeClass: 'dashboardActive',
                tooltip: 'کارتابل'
            },
            'map': {
                icon: 'fa-map-o',
                name: 'نقشه',
                view: 'mapVisible',
                activeClass: 'mapActive',
                tooltip: 'نقشه'
            },
            'administration': {
                icon: 'fa-gear',
                name: 'مدیریت',
                view: 'administrationVisible',
                activeClass: 'administrationActive',
                tooltip: 'مدیریت'
            }
        },
        wizardAccess: {
            'generalSetting': function generalSetting() {
                return $state.go('main.page.administration.generalSetting', {});
            },
            'usersSetting': function usersSetting() {
                return $state.go('main.page.administration.users', {});
            },
            'rolesSetting': function rolesSetting() {
                return $state.go('main.page.administration.roles', {});
            },
            'accessSetting': function accessSetting() {
                return $state.go('main.page.administration.access', {});
            },
            'assignDigitalSign': function assignDigitalSign() {
                return $state.go('main.page.administration.assignDigitalSign', {});
            },
            'userlockedDocuments': function userlockedDocuments() {
                return $state.go('main.page.dashboard.userlockedDocuments', {});
            },
            'usereditedDocuments': function usereditedDocuments() {
                return $state.go('main.page.dashboard.usereditedDocuments', {});
            },
            'pendingTasks': function pendingTasks() {
                return $state.go('main.page.dashboard.workflowPendingTasks', {});
            },
            'createMetaData': function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var response;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Public/createMetaDataFunction.js?dev=' + randomVersionName);

                                case 3:
                                    _context.next = 5;
                                    return JSManagement.addJS('ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName);

                                case 5:
                                    $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/dateFormatInternal.js?dev=' + randomVersionName] = 'dateFormatInternal';
                                    _context.prev = 6;
                                    _context.next = 9;
                                    return createMetaDataFunction($uibModal, mainService, dateFormatInternal, JSManagement, CSSManagement, $scope.data.features);

                                case 9:
                                    response = _context.sent;

                                    toaster.pop('success', '', response);
                                    _context.next = 13;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Public/createMetaData.js?dev=' + randomVersionName, 'createMetaDataFunction');

                                case 13:
                                    _context.next = 20;
                                    break;

                                case 15:
                                    _context.prev = 15;
                                    _context.t0 = _context['catch'](6);

                                    toaster.pop('error', '', _context.t0);
                                    _context.next = 20;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Public/createMetaData.js?dev=' + randomVersionName, 'createMetaDataFunction');

                                case 20:
                                    _context.next = 26;
                                    break;

                                case 22:
                                    _context.prev = 22;
                                    _context.t1 = _context['catch'](0);
                                    _context.next = 26;
                                    return JSManagement.removeJS('ecma5/ExternalLiberary/Public/createMetaData.js?dev=' + randomVersionName, 'createMetaDataFunction');

                                case 26:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 22], [6, 15]]);
                }));

                function createMetaData() {
                    return _ref.apply(this, arguments);
                }

                return createMetaData;
            }()
        },

        canvas: null,
        lookupTable: {
            '1': '۱',
            '2': '۲',
            '3': '۳',
            '4': '۴',
            '5': '۵',
            '6': '۶',
            '7': '۷',
            '8': '۸',
            '9': '۹',
            '10': '۱۰',
            '11': '۱۱',
            '12': '۱۲'
        },
        ctx: null,
        radius: null,
        clockInterval: null,
        color: '#5d9ce9'

    };

    $scope.func = {};

    $scope.func.showWizzard = function () {

        $scope.data.isShowEasyAccess = true;
        _.defer(function () {
            try {
                window.document.querySelector(".Main .main-content .easy-access-buttons").classList.add("easy-access-buttons-show");
            } catch (e) {
                console.error(e);
            }
        }, 50);
    };
    $scope.func.cancelWizzard = function () {
        try {
            window.document.querySelector(".Main .main-content .easy-access-buttons").classList.remove("easy-access-buttons-show");
            $scope.data.isShowEasyAccess = false;
            _.defer(function () {
                return $scope.$apply();
            });
            /* _.defer(()=>{
                 $scope.data.isShowEasyAccess = false;
             },500);*/
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.wizardRunDirection = function (direct) {
        if ($scope.data.isReadyDom != null) {
            clearInterval($scope.data.isReadyDom);
            $scope.data.isReadyDom = null;
        }
        $scope.data.isReadyDom = setInterval(function () {
            try {
                window.document.querySelector(".Main .main-content .easy-access-buttons .view-list-items").scrollLeft += direct * 20;
            } catch (e) {
                console.error(e);
            }
        }, 50);
    };
    $scope.func.wizardRunStop = function () {
        if ($scope.data.isReadyDom != null) {
            clearInterval($scope.data.isReadyDom);
            $scope.data.isReadyDom = null;
        }
    };
    $scope.func.viewMessage = function (message) {
        try {

            try {
                clearTimeout($scope.data.requestRunning);
            } catch (err) {
                console.error(err);
            } finally {
                $scope.data.requestRunning = null;
                protectedUpdateMessage = -1;
            }

            if (message != null) {

                if (_.has(message, 'list') && _.isArray(message.list) && message.list.length > 0) {
                    try {
                        for (var i = 0; i < message.list.length; i++) {
                            switch (message.list[i].key) {
                                case "info":
                                    /*toaster.pop("info","",message.list[i].value);*/
                                    toaster.pop("info", "", message.list[i].value, 50000, 'trustedHtml');
                                    break;
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
                /*todo disable temporary
                if(_.has(message,'time')){
                    try{
                        $scope.data.requestRunning =  setTimeout(() => {$scope.func.getUpdateMessage()},Number(message.time)*1000*60);
                        console.info($scope.data.requestRunning);
                        protectedUpdateMessage =  angular.copy($scope.data.requestRunning);
                    }catch(e){
                        console.error(e);
                    }
                }
                */
                _.defer(function () {
                    return $scope.$apply();
                });
            }
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.getUpdateMessage = function () {
        try {
            mainService.repository.getUpdateMessage().then(function (res) {
                return $scope.func.viewMessage(res.data.originalElement);
            }, function (err) {
                return console.error(err);
            });
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.goToWizardSelect = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(stateName) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            $scope.func.cancelWizzard();
                            try {
                                console.info(stateName);
                                $scope.data.wizardAccess[stateName]();
                            } catch (e) {
                                console.error(e);
                            } finally {
                                _.defer(function () {
                                    return $scope.$apply();
                                });
                            }

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x) {
            return _ref2.apply(this, arguments);
        };
    }();
    $scope.func.gotoState = function (state) {
        $scope.data.currentState = state;
        $state.go('main.page.' + state, {});
    };
    $scope.func.getFeatures = function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(changeUserInfo) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;

                            $scope.data.currentState = _.intersection(_.keys($scope.data.states), _.split($state.$current.name, '.'))[0];

                            if (!(typeof changeUserInfo === "undefined")) {
                                _context3.next = 6;
                                break;
                            }

                            _context3.next = 5;
                            return FeaturesManagement.getFeatures(mainService.auth);

                        case 5:
                            $scope.data.features = _context3.sent;

                        case 6:
                            _context3.next = 8;
                            return _CurrentUserInfoSrvc2.default.getUser(mainService.auth.currentUser, changeUserInfo);

                        case 8:
                            $scope.data.userInfo = _context3.sent;
                            _context3.next = 11;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/getImage.js?dev=' + randomVersionName);

                        case 11:
                            $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Public/getImage.js?dev=' + randomVersionName] = 'getUserImage';
                            _context3.next = 14;
                            return getUserImage('/KeydocPro/services/rest/auth/getUserImage?user=' + $scope.data.userInfo.username + '&' + Date.parse(new Date()), '.Main .main-content .Header  .User  img.userimg', '../../../../static/image/user.png', {
                                Authorization: decodeURIComponent(_.replace(isCookieFunction("Authorization"), "Bearer", "Bearer "))
                            });

                        case 14:
                            $scope.data.userInfo.photoUser = _context3.sent;

                            _.defer(function () {
                                return $scope.func.getUpdateMessage();
                            }, 5000);
                            _context3.next = 21;
                            break;

                        case 18:
                            _context3.prev = 18;
                            _context3.t0 = _context3['catch'](0);

                            console.error(_context3.t0);

                        case 21:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[0, 18]]);
        }));

        return function (_x2) {
            return _ref3.apply(this, arguments);
        };
    }();
    $scope.func.goToDaneshHamaraSite = function () {
        return window.open('http://www.dhamara.com', '_blank');
    };
    $scope.func.menu = {};

    $scope.func.menu.edit = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Public/editUserInformations.js?dev=' + randomVersionName);

                    case 3:
                        _context4.next = 5;
                        return editUserInformations($uibModal, $scope.data.userInfo, JSManagement);

                    case 5:
                        result = _context4.sent;
                        _context4.next = 8;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Public/editUserInformations.js?dev=' + randomVersionName, 'editUserInformations');

                    case 8:
                        $scope.func.changeUserInformations(result);
                        _context4.next = 16;
                        break;

                    case 11:
                        _context4.prev = 11;
                        _context4.t0 = _context4['catch'](0);

                        console.error(_context4.t0);
                        _context4.next = 16;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Public/editUserInformations.js?dev=' + randomVersionName, 'editUserInformations');

                    case 16:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, _this, [[0, 11]]);
    }));

    $scope.func.showHideInfo = function () {
        try {

            $scope.data.showInfo = !$scope.data.showInfo;
            if ($scope.data.showInfo) {
                try {

                    try {
                        clearInterval($scope.data.clockInterval);
                        $scope.data.clockInterval = null;
                    } catch (err) {
                        console.error(err);
                    }

                    /*if($scope.data.canvas != null) {
                        try {
                            $scope.data.ctx = $scope.data.canvas.getContext("2d");
                            // Store the current transformation matrix
                            $scope.data.ctx.save();
                            // Use the identity matrix while clearing the canvas
                            $scope.data.ctx.setTransform(1, 0, 0, 1, 0, 0);
                            //$scope.data.ctx.clearRect(0, 0, $scope.data.canvas.width, $scope.data.canvas.height);
                            $scope.data.ctx.clearRect(-500, -500, $scope.data.canvas.width + 1000, $scope.data.canvas.height + 1000);
                            // Restore the transform
                            $scope.data.ctx.restore();
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    else{
                        $scope.data.canvas = window.document.querySelector(".clockView canvas#canvasClockViewer");
                        $scope.data.ctx = $scope.data.canvas.getContext("2d");
                     }*/
                    if ($scope.data.canvas == null) {
                        try {
                            $scope.data.canvas = window.document.querySelector(".clockView canvas#canvasClockViewer");
                            $scope.data.ctx = $scope.data.canvas.getContext("2d");
                            _.defer(function () {
                                $scope.data.radius = $scope.data.canvas.height / 2;
                                $scope.data.ctx.translate($scope.data.radius, $scope.data.radius);
                                $scope.data.radius = $scope.data.radius * 0.90;
                                $scope.data.clockInterval = setInterval($scope.func.drawClock, 1000);
                            }, 100);
                        } catch (e) {
                            console.error(e);
                        }
                    } else {
                        $scope.func.drawClock();
                        _.defer(function () {
                            $scope.data.clockInterval = setInterval($scope.func.drawClock, 1000);
                        }, 1000);
                    }

                    $(".clockView input.select-color").bind("change", function () {
                        //$scope.func.changeColorUpdate();
                    });
                } catch (e) {}
            } else {
                try {
                    clearInterval($scope.data.clockInterval);
                } catch (err) {
                    console.error(err);
                }
                try {
                    $(".clockView .infoData input.select-color").unbind("change");
                } catch (err) {
                    console.error(err);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            _.defer(function () {
                return $scope.$apply();
            });
        }
    };

    $scope.func.drawClock = function () {
        $scope.func.drawFace($scope.data.ctx, $scope.data.radius);
        $scope.func.drawNumbers($scope.data.ctx, $scope.data.radius);
        $scope.func.drawTime($scope.data.ctx, $scope.data.radius);
        $scope.func.drawSections($scope.data.ctx, $scope.data.radius);
    };
    $scope.func.drawFace = function (ctx, radius) {
        var grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFF';
        ctx.fill();
        grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0, $scope.data.color);
        grad.addColorStop(1, $scope.data.color);
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    };
    $scope.func.drawNumbers = function (ctx, radius) {
        var ang;
        var num;
        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            /*ctx.translate(0, -radius*0.85);*/
            ctx.translate(0, -radius * 0.73);
            ctx.rotate(-ang);
            ctx.fillText($scope.data.lookupTable[num.toString()], 0, 0);
            ctx.rotate(ang);
            /*ctx.translate(0, radius*0.85);*/
            ctx.translate(0, radius * 0.73);
            ctx.rotate(-ang);
        }
    };
    $scope.func.drawTime = function (ctx, radius) {
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        //hour
        hour = hour % 12;
        //todo decrease calculates hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
        hour = hour * 0.5235987755982988 + minute * 0.008726646259971648 + second * 0.0001454441043328608;
        $scope.func.drawHand(ctx, hour, radius * 0.4, radius * 0.09, $scope.data.color);
        //minute
        //todo decrease calculates   minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
        minute = minute * 0.10471975511965977 + second * 0.0017453292519943296;
        $scope.func.drawHand(ctx, minute, radius * 0.62, radius * 0.06, $scope.data.color);
        // second
        //todo decrease calculates  second=(second*Math.PI/30);
        second = second * 0.10471975511965977;
        $scope.func.drawHand(ctx, second, radius * 0.75, radius * 0.02, "#FF0000");
    };
    $scope.func.drawHand = function (ctx, pos, length, width, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    };
    $scope.func.drawSections = function (ctx, radius) {

        var angle, sineAngle, cosAngle, iPointX, iPointY, oPointX, oPointY;

        ctx.strokeStyle = $scope.data.color;

        for (var i = 1; i <= 60; i++) {
            angle = Math.PI / 30 * i;
            sineAngle = Math.sin(angle);
            cosAngle = -Math.cos(angle);

            if (i % 5 == 0) {
                ctx.lineWidth = 2;
                /*iPointX = sineAngle * (radius - 25);
                iPointY = cosAngle * (radius - 25);
                oPointX = sineAngle * (radius - 20);
                oPointY = cosAngle * (radius - 20);*/
                iPointX = sineAngle * (radius - 15);
                iPointY = cosAngle * (radius - 15);
                oPointX = sineAngle * (radius - 10);
                oPointY = cosAngle * (radius - 10);
            } else {
                ctx.lineWidth = 0.8;
                /*iPointX = sineAngle * (radius - 22);
                iPointY = cosAngle * (radius - 22);
                oPointX = sineAngle * (radius - 20);
                oPointY = cosAngle * (radius - 20);*/
                iPointX = sineAngle * (radius - 12);
                iPointY = cosAngle * (radius - 12);
                oPointX = sineAngle * (radius - 10);
                oPointY = cosAngle * (radius - 10);
            }

            ctx.beginPath();
            ctx.moveTo(iPointX, iPointY);
            ctx.lineTo(oPointX, oPointY);
            ctx.stroke();

            try {
                angle = undefined;
                sineAngle = undefined;
                cosAngle = undefined;
                iPointX = undefined;
                iPointY = undefined;
                oPointX = undefined;
                oPointY = undefined;
            } catch (e) {}
        }
    };

    $scope.func.changeColorUpdate = function () {
        try {
            _.defer(function () {
                return $scope.$apply();
            });
            $scope.func.showHideInfo();
        } catch (e) {}
    };
    $scope.func.menu.showClock = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Public/viewClock.js?dev=' + randomVersionName);

                    case 3:
                        _context5.next = 5;
                        return viewClockFunction($uibModal);

                    case 5:
                        _context5.next = 7;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Public/viewClock.js?dev=' + randomVersionName, 'viewClockFunction');

                    case 7:
                        _context5.next = 20;
                        break;

                    case 9:
                        _context5.prev = 9;
                        _context5.t0 = _context5['catch'](0);

                        console.error(_context5.t0);
                        _context5.prev = 12;
                        _context5.next = 15;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Public/viewClock.js?dev=' + randomVersionName, 'viewClockFunction');

                    case 15:
                        _context5.next = 20;
                        break;

                    case 17:
                        _context5.prev = 17;
                        _context5.t1 = _context5['catch'](12);

                        console.error(_context5.t1);

                    case 20:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, _this, [[0, 9], [12, 17]]);
    }));

    $scope.func.menu.logout = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:

                        try {
                            clearTimeout($scope.data.requestRunning);
                        } catch (err) {
                            console.error(err);
                        } finally {
                            $scope.data.requestRunning = null;
                            protectedUpdateMessage = -1;
                        }
                        try {
                            window.localStorage.clear();
                        } catch (e) {
                            console.error(e);
                        }
                        //todo clear all Cashe
                        _context6.prev = 2;
                        _context6.next = 5;
                        return clearSelectedCashFunction(['Authorization', 'TOKEN','JSESSIONID']);

                    case 5:
                        //window.location.hash = "#/login";
                        //window.location.reload(true);
                        $state.go('main.login', {}, { reload: false });
                        _context6.next = 12;
                        break;

                    case 8:
                        _context6.prev = 8;
                        _context6.t0 = _context6['catch'](2);

                        console.error(_context6.t0);
                        toaster.pop("error", "", "مشکلی در خروج از سیستم به وجود آمده است");

                    case 12:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, _this, [[2, 8]]);
    }));
    $scope.func.menu.showVersion = function () {
        return window.open('/version.html', '_blank');
    };
    $scope.func.menu.showHelp = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.prev = 0;

                        if (!($scope.data.features == null)) {
                            _context7.next = 3;
                            break;
                        }

                        throw new Error("error occur");

                    case 3:
                        _context7.next = 5;
                        return removeSelectedLocalStorage('savedProfileFromHelp');

                    case 5:
                        _context7.next = 7;
                        return setSelectedLocalStorage(_.clone($scope.data.features), 'savedProfileFromHelp');

                    case 7:

                        window.open('/help/help.html', '_blank');
                        _context7.next = 13;
                        break;

                    case 10:
                        _context7.prev = 10;
                        _context7.t0 = _context7['catch'](0);

                        toaster.pop("error", "", "امکان نمایش آموزش وجود ندارد.");

                    case 13:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, _this, [[0, 10]]);
    }));
    $scope.func.menu.showViewer = function () {
        return window.open('/shower.html', '_blank');
    };
    $scope.func.menu.refresh = function () {
        // location.reload();
        //clear all cashe and use items
        window.location.reload(true);
    };
    $scope.func.changeUserInformations = function (item) {
        if (isCookieFunction("Authorization") != null) {
            try {
                if (item.content != null) {

                    $upload.upload({
                        url: '/KeydocPro/services/rest/auth/updateUserImage',
                        headers: {
                            Authorization: decodeURIComponent(_.replace(isCookieFunction("Authorization"), "Bearer", "Bearer "))
                        },
                        data: {
                            content: item.content,
                            user: $scope.data.userInfo.username
                        }
                    }).success(function () {
                        $scope.func.changeCurrentUserInfo(item);
                    });
                } else $scope.func.changeCurrentUserInfo(item);
            } catch (e) {
                console.error(e);
            }
        } else {
            toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
            Authentication.backToLoign();
        }
    };
    $scope.func.changeCurrentUserInfo = function (response) {
        if (isCookieFunction("Authorization") != null) {
            try {
                var pass = !_.includes([null, undefined, ""], response.pass) ? response.pass : '';//_.split(_Base2.default.decode(_.trim(_.replace(decodeURIComponent(isCookieFunction("Authorization")), /Bearer/g, ""))), ":")[1];
				var token=_.trim(_.replace(decodeURIComponent(isCookieFunction("Authorization")), /Bearer/g, ""));
                var profileItem = "";
                var query = 'user=' + $scope.data.userInfo.username + '&profile=' + profileItem + '&email=' + response.email + '&name=' + response.name + '&active=true&password=' + pass;
                mainService.auth.updateUser(query).then(function (res) {
                    Authentication.setAuthenticate($scope.data.userInfo.username, token, $http, mainService.auth).then(function (authenticationResult) {
                        
						return $scope.func.getFeatures(true);
                    }, function (authenticationError) {
                        Authentication.clearCash();
                        reject("عدم ذخیره در کش سایت");
                    });
                }, function (error) {
                    return toaster.pop('error', '', 'عدم دریافت اطلاعات کاربری لطفا ابتدا وارد سیستم شوید');
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
            Authentication.backToLoign();
        }
    };
    $scope.func.goLeft = _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
        var navigationItems;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        navigationItems = null;
                        _context8.prev = 1;
                        _context8.next = 4;
                        return getSelectedLocalStorage('navigationItems');

                    case 4:
                        navigationItems = _context8.sent;

                        if (!(navigationItems == null || !_.has(navigationItems, 'List') || !_.isArray(navigationItems.List) || navigationItems.List.length == 0 || !_.has(navigationItems, 'currentLocation') || !_.isNumber(navigationItems.currentLocation))) {
                            _context8.next = 7;
                            break;
                        }

                        throw new Error("عنصر مسیر یابی وجود ندارد");

                    case 7:
                        if (!(navigationItems.currentLocation <= 0)) {
                            _context8.next = 10;
                            break;
                        }

                        navigationItems.currentLocation = 0;
                        throw new Error("شما در ابتدای مسیر قرار دارید.");

                    case 10:
                        navigationItems.direction = -1;
                        _context8.next = 13;
                        return setSelectedLocalStorage(_.clone(navigationItems), 'navigationItems');

                    case 13:
                        $state.go(navigationItems.List[navigationItems.currentLocation - 1], {}, { reload: false });
                        _context8.next = 19;
                        break;

                    case 16:
                        _context8.prev = 16;
                        _context8.t0 = _context8['catch'](1);

                        toaster.pop('error', '', _context8.t0.message || _context8.t0);

                    case 19:
                        _context8.prev = 19;

                        navigationItems = undefined;
                        return _context8.finish(19);

                    case 22:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, _this, [[1, 16, 19, 22]]);
    }));
    $scope.func.goRight = _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
        var navigationItems;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        navigationItems = null;
                        _context9.prev = 1;
                        _context9.next = 4;
                        return getSelectedLocalStorage('navigationItems');

                    case 4:
                        navigationItems = _context9.sent;

                        if (!(navigationItems == null || !_.has(navigationItems, 'List') || !_.isArray(navigationItems.List) || navigationItems.List.length == 0 || !_.has(navigationItems, 'currentLocation') || !_.isNumber(navigationItems.currentLocation))) {
                            _context9.next = 7;
                            break;
                        }

                        throw new Error("عنصر مسیر یابی وجود ندارد");

                    case 7:
                        if (!(navigationItems.currentLocation >= navigationItems.List.length - 1)) {
                            _context9.next = 10;
                            break;
                        }

                        navigationItems.currentLocation = navigationItems.List.length - 1;
                        throw new Error("شما در انتهای مسیر قرار دارید.");

                    case 10:
                        navigationItems.direction = 1;
                        _context9.next = 13;
                        return setSelectedLocalStorage(_.clone(navigationItems), 'navigationItems');

                    case 13:
                        $state.go(navigationItems.List[navigationItems.currentLocation + 1], {}, { reload: false });
                        _context9.next = 19;
                        break;

                    case 16:
                        _context9.prev = 16;
                        _context9.t0 = _context9['catch'](1);

                        toaster.pop("error", '', _context9.t0.message || _context9.t0);

                    case 19:
                        _context9.prev = 19;

                        navigationItems = undefined;
                        return _context9.finish(19);

                    case 22:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, _this, [[1, 16, 19, 22]]);
    }));

    $scope.$on("$destroy", function () {
        try {

            try {
                clearTimeout($scope.data.requestRunning);
            } catch (err) {
                console.error(err);
            } finally {
                $scope.data.requestRunning = null;
                protectedUpdateMessage = -1;
            }

            try {
                $(".Header   .Info    span.infoIcon").unbind("change");
            } catch (err) {
                console.error(err);
            }
            try {
                $(".hiddenInfo .infoData span.removeInfo").unbind("change");
            } catch (err) {
                console.error(err);
            }

            window.clearAllIntervals();
            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(funcName, src) {
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    _context10.prev = 0;
                                    _context10.next = 3;
                                    return JSManagement.removeJS(src, funcName);

                                case 3:
                                    _context10.next = 8;
                                    break;

                                case 5:
                                    _context10.prev = 5;
                                    _context10.t0 = _context10['catch'](0);

                                    console.error(_context10.t0);

                                case 8:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, _this, [[0, 5]]);
                }));

                return function (_x3, _x4) {
                    return _ref10.apply(this, arguments);
                };
            }());
            // clear all data and functions
            $scope.func = undefined;
            $scope.data = undefined;
        } catch (e) {
            console.error(e);
        }
    });

    //config run
    $scope.run = function () {
        try {
            $scope.func.getFeatures();
            $scope.data.currentState = _.intersection(_.keys($scope.data.states), _.split($state.$current.name, '.'))[0];
        } catch (e) {
            console.error(e);
        }
    };

    angular.element(function () {
        //Here your view content is fully loaded !!
        _.defer(function () {
            try {
                $(".Header   .Info    span.infoIcon").bind("click", function () {
                    $scope.func.changeColorUpdate();
                });
            } catch (e) {}

            try {
                $(".hiddenInfo .infoData span.removeInfo").bind("click", function () {
                    $scope.func.changeColorUpdate();
                });
            } catch (e) {}
        }, 3000);
    });

    $scope.run();
};

PageCtrl.$inject = ['$scope', '$rootScope', '$state', 'mainService', '$uibModal', '$upload', 'Authentication', '$http', 'toaster', '$interval'];