"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//Todo minifyText
/*
    from decrease long texts
*/
exports.default = function () {
    'ngInject';

    return function (text, lowerLeng, first, last) {
        if (_.isString(text) && typeof first !== "undefined" && typeof last !== "undefined") text = text.length > lowerLeng ? text.substr(0, first) + "..." + text.substr(-last) : text;
        return text;
    };
};