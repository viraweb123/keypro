'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Features = function () {
    function Features() {
        _classCallCheck(this, Features);
    }

    _createClass(Features, null, [{
        key: 'setFeatures',
        value: function setFeatures(f) {alert('dfg');
            return new Promise(function (resolve, reject) {
                try {
                    try {
                        f.data.Profile.prfTab.mapVisible = angular.copy(eval(f.data.NewUI.mapPermit));
                    } catch (e) {
                        f.data.Profile.prfTab.mapVisible = false;
                        console.error(e);
                    }
                    try {
                        f.data.Profile.prfTab.reportVisible = angular.copy(eval(f.data.NewUI.reportPermit));
                    } catch (e) {
                        f.data.Profile.prfTab.reportVisible = false;
                        console.error(e);
                    }
                    try {
                        f.data.Profile.prfDigitalSignPermit = angular.copy(eval(f.data.NewUI.digitalSignPermit));
                    } catch (e) {
                        f.data.Profile.prfDigitalSignPermit = false;
                        console.error(e);
                    }

                    try {
                        f.data.Profile.MultiMediaTagPermit = angular.copy(eval(f.data.NewUI.MultiMediaTagPermit));
                    } catch (e) {
                        f.data.Profile.MultiMediaTagPermit = false;
                        console.error(e);
                    }

                    try {
                        if (_.has(f.data, 'Roles') && _.has(f.data.Roles, 'Roles')) {
                            var roles = _.keyBy(_.split(f.data.Roles.Roles, ","), function (n) {
                                return n;
                            });
                            f.data.Profile.prfTab.administrationVisible = f.data.Profile.prfTab.administrationVisible && _.has(roles, 'ROLE_ADMIN');
                        }
                    } catch (e) {
                        f.data.Profile.prfTab.administrationVisible = false;
                    }
                    try {
                        f.data.Profile.prfTab.cloudVisible = angular.copy(eval(f.data.Profile.prfDashboard.keywordsVisible));
                    } catch (e) {
                        f.data.Profile.prfTab.cloudVisible = false;
                    }
                    Features.features = angular.copy(f.data.Profile);

                    _.defer(function () {
                        return resolve(Features.features);
                    });
                } catch (e) {
                    console.error(e);
                    reject('can not add feature');
                }
            });
        }
    }, {
        key: 'getFeatures',
        value: function getFeatures(service) {
            return new Promise(function (resolve, reject) {

                if (Features.features != null && isCookieFunction("Authorization") != null) resolve(Features.features);else if (service.getUserProfile) service.getUserProfile().then(function (res) {

                    try {
                        res.data.Profile.prfTab.mapVisible = angular.copy(eval(res.data.NewUI.mapPermit));
                    } catch (e) {
                        res.data.Profile.prfTab.mapVisible = false;
                        console.error(e);
                    }
                    try {
                        res.data.Profile.prfTab.reportVisible = angular.copy(eval(res.data.NewUI.reportPermit));
                    } catch (e) {
                        f.data.Profile.prfTab.reportVisible = false;
                        console.error(e);
                    }
                    try {
                        res.data.Profile.prfDigitalSignPermit = angular.copy(eval(res.data.NewUI.digitalSignPermit));
                    } catch (e) {
                        res.data.Profile.prfDigitalSignPermit = false;
                        console.error(e);
                    }

                    try {
                        res.data.Profile.MultiMediaTagPermit = angular.copy(eval(res.data.NewUI.MultiMediaTagPermit));
                    } catch (e) {
                        res.data.Profile.MultiMediaTagPermit = false;
                        console.error(e);
                    }

                    try {
                        if (_.has(res.data, 'Roles') && _.has(res.data.Roles, 'Roles')) {
                            var roles = _.keyBy(_.split(res.data.Roles.Roles, ","), function (n) {
                                return n;
                            });
                            res.data.Profile.prfTab.administrationVisible = res.data.Profile.prfTab.administrationVisible && _.has(roles, 'ROLE_ADMIN');
                        }
                    } catch (e) {
                        res.data.Profile.prfTab.administrationVisible = false;
                    }

                    try {
                        res.data.Profile.prfTab.cloudVisible = angular.copy(eval(res.data.Profile.prfDashboard.keywordsVisible));
                    } catch (e) {
                        res.data.Profile.prfTab.cloudVisible = false;
                    }

                    try {
                        res.data.Profile.PropertyGroupOnlyForFolders = angular.copy(eval(res.data.NewUI.PropertyGroupOnlyForFolders));
                    } catch (e) {
                        res.data.Profile.PropertyGroupOnlyForFolders = false;
                    }

                    Features.features = angular.copy(res.data.Profile);
                    _.defer(function () {
                        return resolve(Features.features);
                    });
                }, function (error) {
                    return reject('can not get features');
                });else reject('can not get features');
            });
        }
    }, {
        key: 'removeFeatures',
        value: function removeFeatures() {
            Features.features = null;
        }
    }, {
        key: 'features',
        get: function get() {
            return Features._features || null;
        },
        set: function set(features) {
            Features._features = features;
        }
    }]);

    return Features;
}();

exports.default = Features;