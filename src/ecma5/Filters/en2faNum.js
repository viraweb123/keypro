'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

//en2faNum
exports.default = function () {
    return function (input) {
        try {
            var ret = input.toString().replace(new RegExp(/(\d)/, 'gi'), function (d) {
                return String.fromCharCode(d.charCodeAt() + 1728);
            });
            return ret;
        } catch (e) {
            return input;
        }
    };
};