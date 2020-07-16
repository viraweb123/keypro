"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//list filter
exports.default = function () {
    'ngInject';

    return function (items, key, value, keyBy) {
        if (key == null || _.includes([null, ""], value)) return items;

        /*todo
            sample
            var item = {
                a : 1,
                b : {
                    c : 4
                }
            }
            _.has(item,'b.c') // true
            _.get(item,'b.c') // 4
            _.set(item,'b.c',14)
        **/
        if (_.isArray(items)) return _.filter(items, function (item) {
            if (_.has(item, key)) {
                var v = _.toString(_.get(item, key));
                return _.toLower(v).match(value) != null;
            } else return false;
        });else if (_.isObject(items) && typeof keyBy !== "undefined") return _.keyBy(_.filter(items, function (item, k) {
            if (_.has(item, key)) {
                var v = _.toString(_.get(item, key));
                return _.toLower(v).match(value) != null;
            } else return false;
        }), keyBy);else return items;
    };
};