'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CurrentUserInfoSrvc = require('./../../../Class/Service/CurrentUserInfoSrvc');

var _CurrentUserInfoSrvc2 = _interopRequireDefault(_CurrentUserInfoSrvc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userController = function userController($scope, $state, $compile, Authentication, administrationService, toaster, $uibModal, $upload) {
    var _this = this;

    _classCallCheck(this, userController);

    $scope.data = {
        removeExternalFuncs: {},
        selectUser: null,
        users: null,
        sort: {
            type: null,
            ascDesc: true
        },
        Filters: [{
            label: 'ایمیل',
            value: 'Email'
        }, {
            label: 'نام کاربری',
            value: 'Name'
        }, {
            label: 'کاربران',
            value: 'UserId'
        }, {
            label: 'نقش ها',
            value: 'Roles'
        }],
        filterElement: null,
        filterValue: null
    };

    $scope.func = {};

    $scope.func.changeFilter = function () {};

    $scope.func.remove = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
            var activeUser, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return _CurrentUserInfoSrvc2.default.getUser(administrationService.auth.currentUser);

                        case 3:
                            activeUser = _context.sent;

                            if (!(activeUser.name == user.Name)) {
                                _context.next = 8;
                                break;
                            }

                            toaster.pop('error', '', 'امکان حذف کاربر فعال نیست');
                            _context.next = 16;
                            break;

                        case 8:
                            _context.next = 10;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/removeSelectedUser.js?dev=' + randomVersionName);

                        case 10:
                            _context.next = 12;
                            return removeSelectedUser($uibModal, user);

                        case 12:
                            result = _context.sent;


                            if (result) administrationService.auth.deleteUser(user.UserId).then(function (res) {
                                var index = _.findIndex($scope.data.users, function (usr) {
                                    return usr.UserId == user.UserId;
                                });
                                if (index >= 0) {

                                    $scope.data.users.splice(index, 1);
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                }
                            });
                            _context.next = 16;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeSelectedUser.js?dev=' + randomVersionName, 'removeSelectedUser');

                        case 16:
                            _context.next = 23;
                            break;

                        case 18:
                            _context.prev = 18;
                            _context.t0 = _context['catch'](0);

                            console.error(_context.t0);
                            _context.next = 23;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeSelectedUser.js?dev=' + randomVersionName, 'removeSelectedUser');

                        case 23:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 18]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
    $scope.func.getImage = function (user) {

        try {
            $.ajax({
                processData: false,
                contentType: false,
                method: "GET",
                headers: {},
                //contentType: 'multipart/form-data',
                url: '/KeydocPro/services/rest/auth/getUserImage?user=' + user.UserId + '&' + new Date().getTime()
            }).done(function (res) {
                user.thumbnailSrc = '/KeydocPro/services/rest/auth/getUserImage?user=' + user.UserId + '&' + new Date().getTime();
                _.defer(function () {
                    return $scope.$apply();
                });
            }).fail(function (err) {
                user.thumbnailSrc = err.status == 200 && err.readyState == 4 ? '/KeydocPro/services/rest/auth/getUserImage?user=' + user.UserId + '&' + new Date().getTime() : '../../../../static/img/user.png';
                _.defer(function () {
                    return $scope.$apply();
                });
            });
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.addUser = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (!(isCookieFunction("Authorization") != null)) {
                            _context4.next = 12;
                            break;
                        }

                        _context4.prev = 1;
                        return _context4.delegateYield(regeneratorRuntime.mark(function _callee3() {
                            var result;
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.next = 2;
                                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/createNewUserInformations.js?dev=' + randomVersionName);

                                        case 2:
                                            _context3.next = 4;
                                            return createNewUserInformations($uibModal, JSManagement, administrationService, _.map($scope.data.users, "UserId"));

                                        case 4:
                                            result = _context3.sent;
                                            _context3.next = 7;
                                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/createNewUserInformations.js?dev=' + randomVersionName, 'createNewUserInformations');

                                        case 7:

                                            $upload.upload({
                                                url: '/KeydocPro/services/rest/auth/createUser',
                                                headers: { 'Authorization': decodeURIComponent(_.replace(isCookieFunction("Authorization"), "Bearer", "Bearer ")) },
                                                data: {
                                                    user: result.username,
                                                    password: result.pass,
                                                    email: result.email,
                                                    name: result.name,
                                                    active: result.active,
                                                    content: result.content,
                                                    profile: result.profile
                                                }
                                            }).success(_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                                                var index;
                                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                    while (1) {
                                                        switch (_context2.prev = _context2.next) {
                                                            case 0:
                                                                _.forEach(result.roles, function (rol) {
                                                                    return administrationService.auth.assignRole(result.username, rol);
                                                                });
                                                                $scope.data.users.push({
                                                                    UserId: result.username,
                                                                    Name: result.name,
                                                                    Email: result.email,
                                                                    Roles: result.roles,
                                                                    Active: result.active,
                                                                    thumbnailSrc: '../../../../static/img/user.png',
                                                                    Profile: result.profile
                                                                });
                                                                try {
                                                                    index = $scope.data.users.length - 1;
                                                                    //$scope.data.users[index].thumbnailSrc = await $scope.func.getImage($scope.data.users[index]);

                                                                    $scope.func.getImage($scope.data.users[index]);
                                                                    $scope.data.selectUser = $scope.data.users[index].UserId;
                                                                    _.defer(function () {
                                                                        return $scope.$apply();
                                                                    });
                                                                } catch (error) {
                                                                    console.error(error);
                                                                }

                                                            case 3:
                                                            case 'end':
                                                                return _context2.stop();
                                                        }
                                                    }
                                                }, _callee2, _this);
                                            }))).error(function (error) {
                                                return toaster.pop('error', '', 'مشکلی در افزودن کاربر جدید در سرور رخ داده است لطفا مجددا تلاش بفرمایید');
                                            });

                                        case 8:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, _this);
                        })(), 't0', 3);

                    case 3:
                        _context4.next = 10;
                        break;

                    case 5:
                        _context4.prev = 5;
                        _context4.t1 = _context4['catch'](1);

                        console.error(_context4.t1);
                        _context4.next = 10;
                        return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/createNewUserInformations.js?dev=' + randomVersionName, 'createNewUserInformations');

                    case 10:
                        _context4.next = 14;
                        break;

                    case 12:
                        toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                        Authentication.backToLoign();

                    case 14:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, _this, [[1, 5]]);
    }));
    $scope.func.edit = function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(user) {
            var activeUser;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            if (!(isCookieFunction("Authorization") != null)) {
                                _context6.next = 20;
                                break;
                            }

                            _context6.prev = 1;
                            _context6.next = 4;
                            return _CurrentUserInfoSrvc2.default.getUser(administrationService.auth.currentUser);

                        case 4:
                            activeUser = _context6.sent;

                            if (!(activeUser.name == user.Name)) {
                                _context6.next = 10;
                                break;
                            }

                            toaster.pop('info', '', 'جهت ویرایش اطلاعات کاربر فعال به منوی تنظیمات کاربر بروید. ');
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            _context6.next = 11;
                            break;

                        case 10:
                            return _context6.delegateYield(regeneratorRuntime.mark(function _callee5() {
                                var result;
                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                _context5.next = 2;
                                                return JSManagement.addJS('ecma5/ExternalLiberary/Administration/editSelectUserInformations.js?dev=' + randomVersionName);

                                            case 2:
                                                _context5.next = 4;
                                                return editSelectUserInformations($uibModal, user, JSManagement, administrationService);

                                            case 4:
                                                result = _context5.sent;
                                                _context5.next = 7;
                                                return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/editSelectUserInformations.js?dev=' + randomVersionName, 'editSelectUserInformations');

                                            case 7:

                                                if (result.content != null) {
                                                    $upload.upload({
                                                        url: '/KeydocPro/services/rest/auth/updateUserImage',
                                                        headers: { Authorization: decodeURIComponent(_.replace(isCookieFunction("Authorization"), "Bearer", "Bearer ")) },
                                                        data: {
                                                            content: result.content,
                                                            user: result.username
                                                        }
                                                    }).success(function () {
                                                        $scope.func.sendUserInfo(result);
                                                    }).error(function (error) {
                                                        return toaster.pop('error', '', 'مشکلی در ویرایش کاربر در سرور رخ داده است لطفا مجددا تلاش بفرمایید');
                                                    });
                                                } else $scope.func.sendUserInfo(result);

                                            case 8:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, _this);
                            })(), 't0', 11);

                        case 11:
                            _context6.next = 18;
                            break;

                        case 13:
                            _context6.prev = 13;
                            _context6.t1 = _context6['catch'](1);

                            console.error(_context6.t1);
                            _context6.next = 18;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/editSelectUserInformations.js?dev=' + randomVersionName, 'editSelectUserInformations');

                        case 18:
                            _context6.next = 22;
                            break;

                        case 20:
                            toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                            Authentication.backToLoign();

                        case 22:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this, [[1, 13]]);
        }));

        return function (_x2) {
            return _ref4.apply(this, arguments);
        };
    }();
    $scope.func.sendUserInfo = function (response) {

        var index = _.findIndex($scope.data.users, function (user) {
            return user.UserId == response.username;
        });

        var query = 'user=' + response.username + '&email=' + response.email + '&name=' + response.name + '&active=' + response.active + '&profile=' + response.profile;

        if (!_.includes([null, undefined, ""], response.pass)) query = query + '&password=' + response.pass;
        administrationService.auth.updateUser(query).then(function (res) {
            return $scope.func.changeUserItems(response, index);
        });
    };
    $scope.func.changeUserItems = function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(response, index) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.prev = 0;

                            if (!(index >= 0)) {
                                _context7.next = 19;
                                break;
                            }

                            _.forEach(_.difference(response.roles, $scope.data.users[index].Roles), function (rol) {
                                return administrationService.auth.assignRole($scope.data.users[index].UserId, rol);
                            });
                            _.forEach(_.difference($scope.data.users[index].Roles, response.roles), function (rol) {
                                return administrationService.auth.removeRole($scope.data.users[index].UserId, rol);
                            });
                            $scope.data.users[index].Roles = _.clone(response.roles);
                            $scope.data.users[index].Email = _.clone(response.email);
                            $scope.data.users[index].Active = _.clone(response.active);
                            $scope.data.users[index].Name = _.clone(response.name);
                            $scope.data.users[index].Profile = _.clone(response.profile);
                            _context7.prev = 9;
                            _context7.next = 12;
                            return $scope.func.getImage($scope.data.users[index]);

                        case 12:
                            $scope.data.users[index].thumbnailSrc = _context7.sent;

                            _.defer(function () {
                                return $scope.$apply();
                            });
                            _context7.next = 19;
                            break;

                        case 16:
                            _context7.prev = 16;
                            _context7.t0 = _context7['catch'](9);

                            console.error(_context7.t0);

                        case 19:
                            _context7.next = 24;
                            break;

                        case 21:
                            _context7.prev = 21;
                            _context7.t1 = _context7['catch'](0);

                            console.error(_context7.t1);

                        case 24:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this, [[0, 21], [9, 16]]);
        }));

        return function (_x3, _x4) {
            return _ref5.apply(this, arguments);
        };
    }();

    /*$scope.func.filters  = () => {
         var result = _.clone($scope.data.users);
        if(! _.includes([null,""],$scope.data.filters.UserId)){
            try{
                result = _.clone(_.filter(result , user =>  user.UserId.match($scope.data.filters.UserId) != null ));
            }catch(e){
                console.error(e);
            }
        }
        if(! _.includes([null,""],$scope.data.filters.Name)){
            try{
                result = _.filter(result , user =>  user.Name.match($scope.data.filters.Name) != null);
            }catch(e){
                console.error(e);
            }
        }
        if(! _.includes([null,""],$scope.data.filters.Email)){
            try{
                result = _.filter(result , user =>  user.Email.match($scope.data.filters.Email) != null);
            }catch(e){
                console.error(e);
            }
        }
        $scope.data.users = _.clone(result);
        result = undefined;
      };*/
    $scope.func.todo = function () {
        try {
            window.document.querySelector('.administration .CR div.tabel-body  div.body-view table').classList.remove('display');
            window.document.querySelector('.administration .CR div.tabel-body  div.body-view div.not-result').classList.remove('display');
            $scope.data.isDownload = true;
            administrationService.auth.getUserWithRole().then(function () {
                var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(res) {
                    var i;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                            switch (_context8.prev = _context8.next) {
                                case 0:
                                    if (!(res.data != null && _.isArray(res.data))) {
                                        _context8.next = 22;
                                        break;
                                    }

                                    $scope.data.users = [];
                                    i = 0;

                                case 3:
                                    if (!(i < res.data.length)) {
                                        _context8.next = 19;
                                        break;
                                    }

                                    _context8.prev = 4;
                                    _context8.next = 7;
                                    return $scope.func.getImage(res.data[i]);

                                case 7:
                                    res.data[i].thumbnailSrc = _context8.sent;

                                    $scope.data.users.push(res.data[i]);
                                    _context8.next = 16;
                                    break;

                                case 11:
                                    _context8.prev = 11;
                                    _context8.t0 = _context8['catch'](4);

                                    console.error(_context8.t0);
                                    res.data[i].thumbnailSrc = null;
                                    $scope.data.users.push(res.data[i]);

                                case 16:
                                    i++;
                                    _context8.next = 3;
                                    break;

                                case 19:
                                    window.document.querySelector('.administration .CR div.tabel-body  div.body-view table').classList.add('display');
                                    /*_.defer(()=>{
                                        $(".administration .CR div.tabel-body  div.body-view table").niceScroll({
                                            cursorcolor:"#ed4356",
                                            cursorwidth: "8px",
                                            cursorborderradius: "0px",
                                            rtlmode: false
                                        });
                                    },100);*/
                                    _context8.next = 23;
                                    break;

                                case 22:
                                    window.document.querySelector('.administration .CR div.tabel-body  div.body-view div.not-result').classList.add('display');

                                case 23:
                                    $scope.data.isDownload = false;
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 25:
                                case 'end':
                                    return _context8.stop();
                            }
                        }
                    }, _callee8, _this, [[4, 11]]);
                }));

                return function (_x5) {
                    return _ref6.apply(this, arguments);
                };
            }(), function (error) {
                return toaster.pop('error', '', 'عدم دریافت موفقیت آمیز لیست');
            });
        } catch (e) {
            console.error(e);
        }
    };

    $scope.$on('featureReady', function () {
        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(event, args) {
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context9.next = 6;
                                break;
                            }

                            _context9.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context9.sent;


                            //TODO login with server
                            $scope.func.todo();

                        case 6:
                            _context9.next = 11;
                            break;

                        case 8:
                            _context9.prev = 8;
                            _context9.t0 = _context9['catch'](0);

                            console.error(_context9.t0);

                        case 11:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this, [[0, 8]]);
        }));

        return function (_x6, _x7) {
            return _ref7.apply(this, arguments);
        };
    }());
    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        try {

                            /*try{
                                $(".administration .CR div.tabel-body  div.body-view table").getNiceScroll().remove();
                            }catch(error){
                                console.error(error);
                            }*/

                            //TODO clear all interval and timeouts
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(funcName, src) {
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

                                return function (_x8, _x9) {
                                    return _ref9.apply(this, arguments);
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
                        return _context11.stop();
                }
            }
        }, _callee11, _this);
    })));
};

exports.default = userController;


userController.$inject = ['$scope', '$state', '$compile', 'Authentication', 'administrationService', 'toaster', '$uibModal', '$upload'];