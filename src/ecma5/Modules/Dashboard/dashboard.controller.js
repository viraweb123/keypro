'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardController = function DashboardController($scope, $rootScope, dashboardService, toaster, $state) {
    var _this = this;

    _classCallCheck(this, DashboardController);

    $scope.data = {
        state: 'dashboard',
        profile: null,
        lookupTable: {
            'generallastModifiedDocuments': 'generalVisible',
            'generallastMonthTopModifiedDocuments': 'generalVisible',
            'generallastMonthTopViewedDocuments': 'generalVisible',
            'generallastUploadedDocuments': 'generalVisible',
            'generallastWeekTopModifiedDocuments': 'generalVisible',
            'generallastWeekTopViewedDocuments': 'generalVisible',
            'userlockedDocuments': 'userVisible',
            'usereditedDocuments': 'userVisible',
            'userlastDownloadedDocuments': 'userVisible',
            'usersubscribedDocuments': 'userVisible',
            'usersubscribedFolders': 'userVisible',
            'userlastModifiedDocuments': 'userVisible',
            'userlastUploadedDocuments': 'userVisible',
            'bookmarks': 'userVisible',
            'news': 'newsVisible',
            'emailelEctronicMails': 'emailVisible',
            'emailAttachments': 'emailVisible',
            //'workflowComments'                    : 'workflowVisible',
            //'workflowData'                        : 'workflowVisible',
            //'workflowForm'                        : 'workflowVisible',
            'workflowPendingTasks': 'workflowVisible',
            //'workflowProcessDefinition'           : 'workflowVisible',
            //'workflowProcessInstance'             : 'workflowVisible',
            //'workflowTask'                        : 'workflowVisible',
            'workflowUnassignedPendingTasks': 'workflowVisible'
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
                }
            }
        },
        acriveNav: null
    };

    $scope.func = {};

    $scope.func.zone = {
        userVisible: function userVisible() {},
        emailVisible: function emailVisible() {},
        generalVisible: function generalVisible() {},
        newsVisible: function newsVisible() {},
        workflowVisible: function workflowVisible() {},
        bookmarkVisible: function bookmarkVisible() {}
    };

    $scope.func.selectNav = function (name) {
        $scope.data.acriveNav = name;
        $state.go('main.page.dashboard.' + name, {}, { reload: false });
    };

    $scope.func.gotoState = function (state) {
        if (state != 'dashboard') {
            var name = $scope.data.lookupTable[state];
            try {
                if (_.has($scope.data.profile.prfDashboard, name) && $scope.data.profile.prfDashboard[name]) {
                    $scope.data.nav.right.select(name);
                    $rootScope.$broadcast("featureReady", { changeInfo: true });
                } else {
                    try {
                        window.document.querySelector('.D div.' + $scope.data.nav.right.selectedSide).classList.remove("show");
                    } catch (e) {
                        console.error(e);
                    }
                    $scope.data.nav.right.selectedSide = null;
                    $scope.data.acriveNav = null;
                    toaster.pop('error', '', 'امکان ورود به این قسمت برای شما وجود ندارد.');
                    _.defer(function () {
                        $scope.$apply($state.go('^', {}, { reload: false }));
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                if (_.has($scope.data.profile.prfDashboard, name) && $scope.data.profile.prfDashboard[name]) $scope.func.selectNav(state);
            }
        }
    };

    /** TODO ------------------------- Close or Open -------------------------------------------------- **/
    $scope.func.closeOrOpenRight = function () {
        $scope.data.nav.right.isOpened = !$scope.data.nav.right.isOpened;
        /*if($scope.data.nav.right.selectedSide != null){
            window.document.querySelector(`.D div.${$scope.data.nav.right.selectedSide}`).classList.remove("show");
            $scope.data.nav.right.selectedSide = null;
        }*/

        if (!$scope.data.nav.right.isOpened && $scope.data.nav.right.selectedSide != null) {
            window.document.querySelector('.D div.' + $scope.data.nav.right.selectedSide).classList.remove("show");
        } else {
            window.document.querySelector('.D div.' + $scope.data.nav.right.selectedSide).classList.add("show");
        }
    };

    $scope.$on('changeFeature', function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event, args) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context.next = 5;
                                break;
                            }

                            _context.next = 3;
                            return FeaturesManagement.getFeatures(dashboardService.auth);

                        case 3:
                            $scope.data.profile = _context.sent;

                            $scope.func.gotoState($state.$current.name.split('.').pop());

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
    $scope.$on('$stateChangeSuccess', function () {
        // do something
        $scope.func.run();
    });

    $scope.func.run = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return FeaturesManagement.getFeatures(dashboardService.auth);

                    case 3:
                        $scope.data.profile = _context2.sent;

                        $scope.func.gotoState($state.$current.name.split('.').pop());
                        _context2.next = 10;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](0);

                        console.error(_context2.t0);

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this, [[0, 7]]);
    }));

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
};

exports.default = DashboardController;

DashboardController.$inject = ['$scope', '$rootScope', 'dashboardService', 'toaster', '$state'];