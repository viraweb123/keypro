"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//toArray
exports.default = function () {
    return function (obj) {
        var result = [];
        angular.forEach(obj, function (val, key) {
            result.push(val);
        });
        return result;
    };
};