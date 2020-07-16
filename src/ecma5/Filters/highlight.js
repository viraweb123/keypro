"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//highlight
exports.default = function ($sce) {
    'ngInject';

    return function (text, phrase) {
        if (!_.includes([null, "", undefined], text) && !_.includes([null, "", undefined], phrase)) {
            text = persianJs(text).arabicChar().arabicNumber().englishNumber().toString();
            phrase = persianJs(phrase).arabicChar().arabicNumber().englishNumber().toString();
            if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<mark>$1</mark>');
            /*'<span class="highlightedText">$1</span>');*/
        }
        return $sce.trustAsHtml(text) || text;
    };
};