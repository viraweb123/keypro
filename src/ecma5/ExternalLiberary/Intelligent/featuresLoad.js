"use strict";

var FeaturesManagement = {};

FeaturesManagement._features = null;

FeaturesManagement.removeFeatures = function () {
    return FeaturesManagement._features = null;
};

FeaturesManagement.getFeatures = function (service) {
    return new Promise(function (resolve, reject) {
        if (FeaturesManagement._features != null && isCookieFunction("Authorization") != null) resolve(FeaturesManagement._features);else if (service.getUserProfile) service.getUserProfile().then(function (res) {
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
                res.data.Profile.PropertyGroupOnlyForFolders = res.data.NewUI.PropertyGroupOnlyForFolders === "true";
            } catch (e) {
                res.data.Profile.PropertyGroupOnlyForFolders = false;
            }
            /*todo view or hide video player tag */
            try {
                res.data.Profile.MultiMediaTagPermit = res.data.NewUI.MultiMediaTagPermit === "true";
            } catch (e) {
                res.data.Profile.MultiMediaTagPermit = false;
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

            FeaturesManagement._features = angular.copy(res.data.Profile);
            _.defer(function () {
                return resolve(_.clone(FeaturesManagement._features));
            });
        }, function (error) {
            return reject('can not get features');
        });else reject('can not get features');
    });
};

FeaturesManagement.setFeatures = function (f) {
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
            try {
                f.data.Profile.PropertyGroupOnlyForFolders = f.data.NewUI.PropertyGroupOnlyForFolders === "true";
            } catch (e) {
                f.data.Profile.PropertyGroupOnlyForFolders = false;
            }
            /*todo view or hide video player tag */
            try {
                f.data.Profile.MultiMediaTagPermit = f.data.NewUI.MultiMediaTagPermit === "true";
            } catch (e) {
                f.data.Profile.MultiMediaTagPermit = false;
            }
			//by lava 
			f.data.Profile.lastLogin="Last Login:"+f.data.Tokens.LastLogin;
			
            FeaturesManagement._features = angular.copy(f.data.Profile);
            
			_.defer(function () {
                return resolve(_.clone(FeaturesManagement._features));
            });
        } catch (e) {
            console.error(e);
            reject('can not add feature');
        }
    });
};