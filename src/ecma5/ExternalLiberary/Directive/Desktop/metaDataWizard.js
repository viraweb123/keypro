"use strict";

var metaDataWizard = function metaDataWizard($scope, $translate, $element, $sce, toaster, parameters) {
    return new Promise(function (resolve, reject) {
        try {

            _.defer(function () {
                resolve("ok");
            }, 120000);
        } catch (e) {}
    });
};