"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurrentUserInfo = function () {
    function CurrentUserInfo() {
        _classCallCheck(this, CurrentUserInfo);
    }

    _createClass(CurrentUserInfo, null, [{
        key: "getUser",
        value: function getUser(getUserInfo, getFromServer) {
            return new Promise(function (resolve, reject) {
                if (CurrentUserInfo.User == null || typeof getFromServer !== "undefined") {
                    getUserInfo().then(function (response) {
                        CurrentUserInfo.User = response.data;
                        resolve(response.data);
                    }, function (error) {
                        return reject('عدم  دریافت اطلاعات کاربر');
                    });
                } else resolve(CurrentUserInfo.User);
            });
        }
    }, {
        key: "removeUser",
        value: function removeUser() {
            return new Promise(function (resolve, reject) {
                CurrentUserInfo.User = null;
                resolve(true);
            });
        }
    }, {
        key: "User",
        set: function set(User) {
            CurrentUserInfo._USER = User;
        },
        get: function get() {
            CurrentUserInfo._USER = CurrentUserInfo._USER || null;
            return CurrentUserInfo._USER;
        }
    }]);

    return CurrentUserInfo;
}();

exports.default = CurrentUserInfo;