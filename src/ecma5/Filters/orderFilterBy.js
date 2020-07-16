"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//list filter
exports.default = function () {
    'ngInject';

    return function (items, type, isAsc) {
        if (typeof type === "undefined" || typeof isAsc === "undefined") return items;

        if (_.isObject(items)) return _.orderBy(items, type, isAsc ? 'asc' : 'desc');else return items;
    };
};