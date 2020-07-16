'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./../../Class/Service/Service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginService = function () {
    function LoginService(Restangular, $q) {
        _classCallCheck(this, LoginService);

        this.auth = new _Service.Auth(Restangular, $q);
    }

    _createClass(LoginService, [{
        key: 'auth',
        get: function get() {
            return this._auth;
        },
        set: function set(auth) {
            this._auth = auth;
        }
    }], [{
        key: 'LoginServiceFactory',
        value: function LoginServiceFactory(Restangular, $q) {
            'ngInject';

            return new LoginService(Restangular, $q);
        }
    }]);

    return LoginService;
}();

exports.default = LoginService.LoginServiceFactory;