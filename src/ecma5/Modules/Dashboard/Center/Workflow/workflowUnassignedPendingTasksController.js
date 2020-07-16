'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var workflowUnassignedPendingTasksController = function workflowUnassignedPendingTasksController($scope, $state, dashboardService, toaster, $q) {
    var _this = this;

    _classCallCheck(this, workflowUnassignedPendingTasksController);

    $scope.data = _defineProperty({
        removeExternalFuncs: {},
        profile: null,
        list: [],
        isDownload: true,
        sort: {
            type: null,
            ascDesc: true
        },

        isDisabled: false,
        noCache: true,
        selectedItem: null,
        searchText: null

    }, 'list', [{
        label: 'tehran',
        id: 1
    }, {
        label: 'esphehan',
        id: 2
    }, {
        label: 'sary',
        id: 3
    }, {
        label: 'tabriz',
        id: 4
    }, {
        label: 'yazd',
        id: 5
    }, {
        label: 'mashhad',
        id: 6
    }, {
        label: 'mashhed',
        id: 7
    }, {
        label: 'tehransar',
        id: 8
    }, {
        label: 'yorisad',
        id: 9
    }, {
        label: 'chazvin',
        id: 10
    }]);

    $scope.func = {};

    $scope.func.todo = function () {
        try {
            /*window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.remove('display');
            window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.remove('display');
            $scope.data.isDownload = true;
            dashboardService.dashboard.getList("getUserLastImportedMailAttachments").then(
                async res=> {
                    await JS.addJS(`ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=${randomVersionName}`);
                    $scope.data.removeExternalFuncs[`ecma5/ExternalLiberary/Dashboard/toDateDashboardCtrl.js?dev=${randomVersionName}`] = 'toDateDashboardCtrl';
                    await JS.addJS(`ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=${randomVersionName}`);
                    $scope.data.removeExternalFuncs[`ecma5/ExternalLiberary/Public/getSrcFromType.js?dev=${randomVersionName}`] = 'getSrcFromType,srcMimeType';
                    await JS.addJS(`ecma5/ExternalLiberary/Dashboard/fileSizeDashboardCtrl.js?dev=${randomVersionName}`);
                    $scope.data.removeExternalFuncs[`ecma5/ExternalLiberary/Dashboard/fileSizeDashboardCtrl.js?dev=${randomVersionName}`] = 'fileSizeDashboardCtrl';
                     if(_.isArray(res.data.originalElement) && res.data.originalElement.length > 0){
                        _.map(res.data.originalElement,item => {
                            item.document.created =  toDateDashboardCtrl(item.document.created);
                            item.document.lastModified =  toDateDashboardCtrl(item.document.lastModified);
                            item.document.title = item.document.path.split("/").pop();
                            item.mimeType = getSrcFromType(item.document.mimeType);
                            item.document.actualVersion.newSize = fileSizeDashboardCtrl(item.document.actualVersion.size);
                            dashboardService.document.thumbnail(item.document, 0, 75).then(
                                resThumnail => item.src = `data:image/png;base64,${resThumnail.data}`,
                                error => item.src = getSrcFromType(item.document.mimeType)
                            );
                        });
                        $scope.data.list = _.clone(res.data.originalElement);
                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view table').classList.add('display');
                        _.defer(()=>{
                            $(".dashboard .CR div.tabel-body  div.body-view table").niceScroll({
                                cursorcolor:"#fbbb3d",
                                cursorwidth: "8px",
                                cursorborderradius: "0px",
                                rtlmode: false
                            });
                        },100);
                    }else{
                        window.document.querySelector('.dashboard .CR div.tabel-body  div.body-view div.not-result').classList.add('display');
                    }
                    $scope.data.isDownload = false;
                 },
                error => console.error('عدم دریافت موفقیت آمیز لیست')
            );*/
        } catch (e) {
            console.error(e);
        }
    };

    $scope.func.querySearch = function (query) {

        return new Promise(function (resolve, reject) {
            try {

                var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

                allStates = _.map(allStates.split(/,+/g), function (state) {
                    return {
                        value: _.trim(_.toLower(state)),
                        display: _.trim(_.toLower(state))
                    };
                });

                resolve(_.filter(allStates, function (state) {
                    return _.startsWith(state.value, _.trim(_.toLower(query)));
                }));
            } catch (e) {
                reject(null);
            }
        });

        /*var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
          Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
          Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
          Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
          North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
          South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
          Wisconsin, Wyoming';
         allStates = _.map(allStates.split(/,+/g) , state => {
            return {
                value:  _.trim(_.toLower(state)),
                display: _.trim(_.toLower(state))
            };
        });
         console.log(allStates);
         var deferred;
        var results = _.filter(allStates , state => _.startsWith(state.value,_.trim(_.toLower(query))));
        deferred = $q.defer();
        _.defer(() => deferred.resolve( results ) , Math.random() * 1000);
        return deferred.promise;*/
    };

    $scope.func.searchTextChange = function (text) {
        console.info('Text changed to ' + text);
    };

    $scope.func.selectedItemChange = function (item) {
        console.info('Item changed to ' + JSON.stringify(item));
    };

    $scope.func.loadAll = function () {};

    $scope.func.createFilterFor = function (query) {
        var lowercaseQuery = _.lowerCase(query);
        return function filterFn(state) {
            return state.value.indexOf(lowercaseQuery) === 0;
        };
    };

    /*$scope.func.querySearch  = (query,filterItem) => {
        return new Promise(
            (resolve, reject) =>  {
                try{
                    console.info(query);
                    resolve(_.filter($scope.data.list,item => _.startsWith(item[filterItem],query)));
                }catch(e){
                    reject(null);
                }
            }
        );
    };*/

    $scope.$on('featureReady', function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event, args) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context.next = 6;
                                break;
                            }

                            _context.next = 4;
                            return FeaturesManagement.getFeatures(dashboardService.auth);

                        case 4:
                            $scope.data.profile = _context.sent;

                            $scope.func.todo();

                        case 6:
                            _context.next = 11;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](0);

                            console.error(_context.t0);

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 8]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());

    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        try {
                            $(".dashboard .CR div.tabel-body  div.body-view table").getNiceScroll().remove();
                            //TODO clear all interval and timeouts
                            /*window.clearAllTimeouts();*/
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _context2.prev = 0;
                                                    _context2.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context2.next = 8;
                                                    break;

                                                case 5:
                                                    _context2.prev = 5;
                                                    _context2.t0 = _context2['catch'](0);

                                                    console.error(_context2.t0);

                                                case 8:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, _this, [[0, 5]]);
                                }));

                                return function (_x3, _x4) {
                                    return _ref3.apply(this, arguments);
                                };
                            }());
                            //TODO  clear all data and functions inside scope
                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this);
    })));
};

exports.default = workflowUnassignedPendingTasksController;


workflowUnassignedPendingTasksController.$inject = ['$scope', '$state', 'dashboardService', 'toaster', '$q'];