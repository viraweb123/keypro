'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Base = require('./../../Class/Base64');

var _Base2 = _interopRequireDefault(_Base);

var _isLoginManagement = require('./../../Class/Service/isLoginManagement');

var _isLoginManagement2 = _interopRequireDefault(_isLoginManagement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdministrationController = function AdministrationController($scope, $rootScope, administrationService, toaster, $state) {
    var _this = this;

    _classCallCheck(this, AdministrationController);

    /** TODO ------------------------- Datas ------------------------------------------------------ **/
    $scope.data = {
        state: 'administration',
        profile: null,
        showLogins: null,
        lookupTable: {
            'Automation': 'AutomationVisible',
            'DatabaseQuery': 'DatabaseQueryVisible',
            'dictionary': 'settingVisible', //'dictionaryVisible',
            'language': 'languageVisible',
            'OMR': 'OMRVisible',
            'Report': 'ReportVisible',
            'repositoryExport': 'repositoryVisible',
            'repositoryImport': 'repositoryVisible',
            'scripting': 'scriptingVisible',
            'generalSetting': 'settingVisible',
            'metadata': 'settingVisible',
            'addMetadata': 'settingVisible',
            'createSelectRelation': 'settingVisible',
            'categoriManagement': 'settingVisible',
            'relation': 'settingVisible',
            'MimeType': 'settingVisible',
            'loggedUsers': 'settingVisible',
            'messageList': 'settingVisible',
            'stats': 'statsVisible',
            'pendingTaskQueue': 'statsVisible',
            'textExtractionQueue': 'statsVisible',
            'timer': 'timerVisible',
            'users': 'usersVisible',
            'roles': 'usersVisible',
            'Profile': 'usersVisible',
            'access': 'usersVisible',
            'ActivityLog': 'usersVisible',
            'checkEmail': 'utilitiesVisible',
            'checkTextExtraction': 'utilitiesVisible',
            'css': 'utilitiesVisible',
            'dbRepositoryView': 'utilitiesVisible',
            'listIndexes': 'utilitiesVisible',
            'logCat': 'utilitiesVisible',
            'rebuildIndexes': 'utilitiesVisible',
            'repositoryChecker': 'utilitiesVisible',
            'systemProperties': 'utilitiesVisible',
            'Workflow': 'WorkflowVisible',
            'assignDigitalSign': 'digitalSignVisible',
            'defineDigitalSign': 'digitalSignVisible'
        },
        nav: {
            right: {
                selectedSide: null,
                isOpened: false,
                select: function select(selectedSide) {
                    if ($scope.data.nav.right.selectedSide != null && $scope.data.nav.right.selectedSide != selectedSide) {
                        try {

                            var element = window.document.querySelector('.D div.' + $scope.data.nav.right.selectedSide);
                            element.classList.remove("show");
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    try {
                        window.document.querySelector('.D div.' + selectedSide).classList.add("show");
                    } catch (e) {
                        console.error(e);
                    }

                    $scope.data.nav.right.selectedSide = selectedSide;
                    $scope.data.nav.right.isOpened = $scope.data.nav.right.isOpened || true;
                    $scope.func.zone[selectedSide]();
                    _.defer(function () {
                        return $scope.$apply();
                    });
                }
            }
        },
        acriveNav: null
    };
    $scope.func = {};
    /** TODO ------------------------- Functions -------------------------------------------------- **/
    $scope.func.closeOrOpenRight = function () {
        try {
            $scope.data.nav.right.isOpened = !$scope.data.nav.right.isOpened;
            if (!$scope.data.nav.right.isOpened && $scope.data.nav.right.selectedSide != null) {
                window.document.querySelector('.D div.' + $scope.data.nav.right.selectedSide).classList.remove("show");
            } else {
                window.document.querySelector('.D div.' + $scope.data.nav.right.selectedSide).classList.add("show");
            }
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.zone = {
        settingVisible: function settingVisible() {},
        usersVisible: function usersVisible() {},
        languageVisible: function languageVisible() {},
        utilitiesVisible: function utilitiesVisible() {},
        repositoryVisible: function repositoryVisible() {},
        dictionaryVisible: function dictionaryVisible() {},
        OMRVisible: function OMRVisible() {},
        timerVisible: function timerVisible() {},
        AutomationVisible: function AutomationVisible() {},
        WorkflowVisible: function WorkflowVisible() {},
        ReportVisible: function ReportVisible() {},
        DatabaseQueryVisible: function DatabaseQueryVisible() {},
        scriptingVisible: function scriptingVisible() {},
        statsVisible: function statsVisible() {},
        digitalSignVisible: function digitalSignVisible() {}
    };
    $scope.func.selectNav = function (name) {
        try {
            $scope.data.acriveNav = name;
            $state.go('main.page.administration.' + name, {}, { reload: false });
        } catch (e) {
            toaster.pop("error", "", "مشکلی در ورود به قسمت انتخابی به وجود آمده است.");
        }
    };
    $scope.func.run = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return FeaturesManagement.getFeatures(administrationService.auth);

                    case 3:
                        $scope.data.profile = _context.sent;

                        $scope.func.gotoState($state.$current.name.split('.').pop());
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        console.error(_context.t0);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this, [[0, 7]]);
    }));
    $scope.func.gotoState = function (state) {
        if (typeof state !== "undefined" && state != 'administration') {
            try {
                $scope.data.nav.right.select($scope.data.lookupTable[state]);
                $rootScope.$broadcast("featureReady", { changeInfo: true });
            } catch (e) {
                console.error(e);
            } finally {
                $scope.func.selectNav(state);
                _.defer(function () {
                    return $scope.$apply();
                });
            }
        }
    };
    $scope.$on("$destroy", function () {
        try {
            window.clearAllIntervals();
            // clear all data and functions
            $scope.func = undefined;
            $scope.data = undefined;
        } catch (e) {
            console.error(e);
        }
    });
    $scope.$on('$stateChangeSuccess', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return FeaturesManagement.getFeatures(administrationService.auth);

                    case 3:
                        $scope.data.profile = _context2.sent;

                        if (!$scope.data.profile.prfTab.administrationVisible) {
                            _context2.next = 15;
                            break;
                        }

                        _context2.next = 7;
                        return $scope.func.login2OldSite();

                    case 7:
                        _context2.next = 9;
                        return _isLoginManagement2.default.isLogin;

                    case 9:
                        $scope.data.showLogins = _context2.sent;

                        $scope.data.showLogins = _.keyBy($scope.data.showLogins);
                        _.defer(function () {
                            return $scope.$apply();
                        });
                        // do something
                        $scope.func.run();
                        _context2.next = 16;
                        break;

                    case 15:
                        $state.go('main.page.desktop', {}, { reload: false });

                    case 16:
                        _context2.next = 21;
                        break;

                    case 18:
                        _context2.prev = 18;
                        _context2.t0 = _context2['catch'](0);

                        console.error(_context2.t0);

                    case 21:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this, [[0, 18]]);
    })));
    $scope.func.login2OldSite = function () {
        return new Promise(function (resolve, reject) {
            try {
                if (_isLoginManagement2.default.isLogin == null) {
                    //var [username,password] = _.split(base64.decode(_.trim(_.replace(decodeURIComponent(isCookieFunction('Authorization')), /Bearer/g, ""))), ":");
                    //تغییر
					let xmlhttp = new window.XMLHttpRequest();
                    xmlhttp.open("POST", `KeydocPro/j_spring_security_check?j_language=fa-IR&j_password=admin&j_username=admin`);
                    xmlhttp.onreadystatechange = () => {
                      if (xmlhttp.readyState == 4) {
                    try {
                        if ((xmlhttp.status == 200) || (xmlhttp.status == 204)) {
                        var xmlhttpGet = new window.XMLHttpRequest();
                        xmlhttpGet.open("GET", 'KeydocPro/admin/index.jsp?lang=fa-IR');
                        xmlhttpGet.onreadystatechange = function () {
                            if (xmlhttpGet.readyState == 4) {
                                if (xmlhttpGet.status == 200 || xmlhttp.status == 204) {
                                    var list = [];
                                    try {
                                        _.forEach($($.parseHTML(xmlhttpGet.responseText)).find("li>a"), function (a) {
                                            return list.push(_.clone(a.pathname));
                                        });
                                    } catch (ee) {
                                        console.error(ee);
                                    }
                                    _isLoginManagement2.default.isLogin = list;
                                    resolve(true);
                                } else {
                                    resolve(true);
                                }
                            }
                        };
                        xmlhttpGet.send();
                        }
                        else
                        reject("عدم دریافت اطلاعات از سرور");
                    } catch (error) {
                        reject(error);
                    }
                    }
                    }
                    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
                    xmlhttp.send(null);
                } else {
                    resolve(true);
                }
            } catch (e) {
                reject(e);
            }
        });
    };
    $scope.$on('changeFeature', function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(event, args) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context3.next = 15;
                                break;
                            }

                            _context3.next = 3;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 3:
                            $scope.data.profile = _context3.sent;

                            if (!$scope.data.profile.prfTab.administrationVisible) {
                                _context3.next = 14;
                                break;
                            }

                            _context3.next = 7;
                            return $scope.func.login2OldSite();

                        case 7:
                            _context3.next = 9;
                            return _isLoginManagement2.default.isLogin;

                        case 9:
                            $scope.data.showLogins = _context3.sent;

                            $scope.data.showLogins = _.keyBy($scope.data.showLogins);
                            $scope.func.run();
                            _context3.next = 15;
                            break;

                        case 14:
                            $state.go('main.page.desktop', {}, { reload: false });

                        case 15:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function (_x, _x2) {
            return _ref3.apply(this, arguments);
        };
    }());
};

exports.default = AdministrationController;

AdministrationController.$inject = ['$scope', '$rootScope', 'administrationService', 'toaster', '$state'];