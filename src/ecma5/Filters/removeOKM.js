"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//removeOKM
exports.default = function () {
    'ngInject';

    return function (text) {
        return !_.includes([null, "", undefined], text) && _.isString(text) && _.startsWith(text, "/okm:") ? text.substr(5) : text;
    };
};