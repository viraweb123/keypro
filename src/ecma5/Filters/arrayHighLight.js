"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//arrayHighLight
exports.default = function ($sce) {
    'ngInject';

    return function (text, phrases) {
        try {
            if (!_.includes([null, "", undefined], text) && !_.includes([null, "", undefined], phrases)) {
                for (p in phrases) {
                    var phrase = angular.copy(p);
                    text = persianJs(text).arabicChar().arabicNumber().englishNumber().toString();
                    phrase = persianJs(phrase).arabicChar().arabicNumber().englishNumber().toString();
                    if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<mark>$1</mark>');
                    phrase = undefined;
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            return $sce.trustAsHtml(text) || text;
        }
    };
};