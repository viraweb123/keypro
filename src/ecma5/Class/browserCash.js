"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CookieSrvc = function () {
    function CookieSrvc() {
        _classCallCheck(this, CookieSrvc);
    }

    _createClass(CookieSrvc, [{
        key: "getCookie",
        value: function getCookie(name) {
            var regexp = new RegExp("(?:^" + name + "|;s* " + name + ")=(.*?)(?:;|$)", "g");
            var result = regexp.exec(document.cookie);
            return result === null ? null : result[1];
        }
    }, {
        key: "deleteCookie",
        value: function deleteCookie(name, path, domain) {
            if (this.getCookie(name)) this.createCookie(name, "", -1, path, domain);
        }
    }], [{
        key: "createCookie",
        value: function createCookie(name, value, expires, path, domain) {
            var cookie = name + "=" + escape(value) + ";";
            if (typeof expires !== "undefined") {
                if (_.has(expires, 'isExpires')) {
                    cookie = "" + cookie + expires.expires;
                } else if (webAppTypingFormat.type == "standard") {
                    expires = expires instanceof Date && isNaN(expires.getTime()) ? new Date() : new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
                    cookie = cookie + "expires= " + expires.toGMTString() + " ;";
                }
            }
            if (typeof path !== "undefined") cookie = cookie + "path=\" " + path + " ;";
            if (typeof domain !== "undefined") cookie = cookie + "domain=\" " + domain + " ;";
            document.cookie = cookie;
        }
    }, {
        key: "clearCash",
        value: function clearCash() {
            return new Promise(function (resolve, reject) {
                try {
                    localStorage.removeItem('keydocAuth');
                    this.deleteCookie("Authorization");
                    this.deleteCookie("TOKEN");
                    resolve('delete cookie Successfully');
                } catch (e) {
                    reject(e);
                }
            });
        }
    }]);

    return CookieSrvc;
}();

exports.default = CookieSrvc;