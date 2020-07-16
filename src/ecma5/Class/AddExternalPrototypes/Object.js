'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createJson = createJson;
exports.difference = difference;
exports.union = union;
exports.fill = fill;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createJson() {
    Object.defineProperty(XMLHttpRequest.prototype, 'responseJSON', {
        value: function value() {
            var res = null;
            try {
                res = eval('(' + JSON.parse(this.response) + ')');
            } catch (e) {
                res = JSON.parse(this.response);
            } finally {
                return res;
            }
        },
        writable: false,
        enumerable: false
    });
};

function difference() {
    Array.prototype.difference = function (otherArray) {
        return this.filter(function (item) {
            return otherArray.indexOf(item) < 0;
        });
    };
};

function union() {
    Array.prototype.union = function (otherArray) {
        return [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(this), _toConsumableArray(otherArray)))));
    };

    //var a = [34, 35, 45, 48, 49];
    //var b = [48, 55];
    //var union = [...new Set([...a, ...b])];
    //[34, 35, 45, 48, 49, 55]
    //var union = [...new Set([...b, ...a])];
    //[48, 55, 34, 35, 45, 49]
};

/*todo
    Array.prototype.union = function(a)
    {
        var r = this.slice(0);
        a.forEach(function(i) { if (r.indexOf(i) < 0) r.push(i); });
        return r;
    };
*/

//todo Array.prototype.union = function(a) {return [...this.diff(a), ...a]}

function fill() {
    if (!Array.prototype.fill) {
        Array.prototype.fill = function (value) {

            if (this == null) throw new TypeError('this is null or not defined');
            var O = Object(this);
            var len = O.length >>> 0;
            var start = arguments[1];
            var relativeStart = start >> 0;
            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
            var end = arguments[2];
            var relativeEnd = end === undefined ? len : end >> 0;
            var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
            while (k < final) {
                O[k] = value;
                k++;
            }
            return O;
        };
    }
};