'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var json2CSVConvertorFunction = function json2CSVConvertorFunction(data, fileName) {
    return new Promise(function (resolve, reject) {
        try {
            data = _.isArray(data) ? data : [data];
            var headers = [];
            if (!_.has(Array, 'union')) {
                try {
                    Array.prototype.union = function (otherArray) {
                        return [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(this), _toConsumableArray(otherArray)))));
                    };
                } catch (e) {
                    reject("مشکلی در ساخت تابع جدید برای آرایه به وجود آمده است.");
                }
            }
            for (var i = 0; i < data.length; i++) {
                headers = headers.union(Object.keys(data[i]));
            }headers.sort();
            if (!_.has(Array, 'fill')) {
                try {
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
                } catch (e) {
                    reject("مشکلی در ساخت تابع جدید برای آرایه به وجود آمده است.");
                }
            }
            if (!_.has(Array, 'difference')) {
                try {
                    Array.prototype.difference = function (otherArray) {
                        return this.filter(function (item) {
                            return otherArray.indexOf(item) < 0;
                        });
                    };
                } catch (e) {
                    reject("مشکلی در ساخت تابع جدید برای آرایه به وجود آمده است.");
                }
            }
            var items = [];

            var _loop = function _loop(_i) {
                items[_i] = new Array(headers.length);
                items[_i].fill('');
                var keys = Object.keys(data[_i]);

                var _loop2 = function _loop2(j) {
                    items[_i][headers.findIndex(function (value) {
                        return value == keys[j];
                    })] = ' ' + data[_i][keys[j]] + ' ';
                };

                for (var j = 0; j < keys.length; j++) {
                    _loop2(j);
                }
            };

            for (var _i = 0; _i < data.length; _i++) {
                _loop(_i);
            }
            var body = "";
            for (var _i2 = 0; _i2 < items.length; _i2++) {
                body = '' + body + items[_i2].toString().split(',').join('\t') + '\r\n';
            }var CSV = headers.toString().split(',').join('\t') + '\r\n' + body;
            //let textEncoder = new TextEncoder('utf-16le');

            /*let csvContentEncoded = new TextEncoder('utf-16le').encode([CSV]);*/

            var csvContentEncoded = new TextEncoder('utf-8').encode([CSV]);

            var bom = new Uint8Array([0xFF, 0xFE]);
            var out = new Uint8Array(bom.byteLength + csvContentEncoded.byteLength);
            out.set(bom, 0);
            out.set(csvContentEncoded, bom.byteLength);
            var blob = new Blob([out], { type: "text/csv;charset=utf-8;" });

            var d = URL.createObjectURL(blob);
            console.log(d);

            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, fileName + '.csv');
                _.defer(function () {
                    return resolve("فایل csv ساخته شد.");
                });
            } else {

                var url = URL.createObjectURL(blob);
                var link = document.createElement("a");
                _.defer(function () {
                    link.download = fileName + '.csv';
                    link.href = url;
                    link.style = "visibility:hidden";
                    link.name = 'key_downloadLink' + fileName;
                    window.document.body.appendChild(link);
                    link.click();
                    window.document.body.removeChild(link);
                    _.defer(function () {
                        return resolve("فایل csv ساخته شد.");
                    });
                }, 1000);
            }
        } catch (e) {
            reject("مشکلی در ایجاد فایل csv رخ داده است.");
        }
    });
};