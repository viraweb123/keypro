"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isLoginManagement = function () {
    function isLoginManagement() {
        _classCallCheck(this, isLoginManagement);
    }

    _createClass(isLoginManagement, null, [{
        key: "isLogin",
        get: function get() {
            if (typeof isLoginManagement._isLogin === "undefined" || isCookieFunction("Authorization") == null) isLoginManagement._isLogin = null;
            return isLoginManagement._isLogin;
        },
        set: function set(isLogin) {
            isLoginManagement._isLogin = isLogin;
        }
    }]);

    return isLoginManagement;
}();

exports.default = isLoginManagement;