"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//name and mimeType
exports.default = function ($sce) {
    return function (input) {
        if (typeof input !== "undefined" && !_.includes([null, ""], input)) {
            var lastDot = input.lastIndexOf(".");
            if (lastDot > -1) {
                return $sce.trustAsHtml("<span style=\"direction: ltr\">" + input.substr(0, lastDot) + "." + input.substr(lastDot + 1) + "</span>");
            } else return input;
        } else return input;
    };
};