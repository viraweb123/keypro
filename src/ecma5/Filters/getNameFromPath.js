"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//getNameFromPath
exports.default = function () {
    return function ($path) {
        return typeof $path === "string" && $path.length > 0 ? $path.substring($path.lastIndexOf("/") + 1) : $path;
    };
};