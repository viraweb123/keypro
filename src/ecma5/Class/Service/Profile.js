"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Profile = function () {
    function Profile() {
        _classCallCheck(this, Profile);
    }

    _createClass(Profile, null, [{
        key: "getProfile",
        value: function getProfile(service, getNew) {
            return new Promise(function (resolve, reject) {
                if (Profile.profile == null || getNew) {
                    service.getFeatures().then(function (featureResult) {
                        Profile.profile = angular.copy(featureResult.data.originalElement || featureResult.data);
                        resolve(Profile.profile);
                    }, function (error) {
                        reject(Profile.profile);
                    });
                } else {
                    resolve(Profile.profile);
                }
            });
        }
    }, {
        key: "profile",
        get: function get() {
            Profile._profile = typeof Profile._profile === "undefined" ? null : Profile._profile;
            return Profile._profile;
        },
        set: function set(profile) {
            Profile._profile = profile;
        }
    }]);

    return Profile;
}();

exports.default = Profile;