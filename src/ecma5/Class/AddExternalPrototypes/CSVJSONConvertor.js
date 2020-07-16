"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CSVJSONConvertor = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object = require("./Object");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CSVJSONConvertor = exports.CSVJSONConvertor = function () {
    function CSVJSONConvertor() {
        _classCallCheck(this, CSVJSONConvertor);

        (0, _Object.fill)();
        (0, _Object.union)();
    }

    _createClass(CSVJSONConvertor, [{
        key: "createObj",
        value: function createObj(keys, values) {
            for (var i = 0; i < keys.length; i++) {
                this[keys[i]] = values[i];
            }
        }
    }, {
        key: "isNumber",
        value: function isNumber(item) {
            return (/^(\-|\+)?[0-9]+(\.[0-9]+)?$/.test(String(item).trim())
            );
        }
    }, {
        key: "isDate",
        value: function isDate(item) {
            return (/^\d{1,2}\/\d{1,2}\/\d{1,4}$/.test(String(item).trim())
            );
        }
    }, {
        key: "CSV2JSON",
        value: function CSV2JSON(array, callback) {
            var _this = this;

            array = array.map(function (item) {
                return item = item.endsWith("\r") ? item.slice(-1) : item;
            }).filter(function (item) {
                return item != "";
            }).map(function (item) {
                return item.split(',');
            });
            var len = array[0].length;
            var keys = array[0];
            array.shift();
            array = array.map(function (value) {
                var arr = new Array(len);
                var j = 0;
                for (var i = 0; i < value.length; i++) {
                    if (value[i].startsWith('\"')) {
                        var item = [];
                        item.push(value[i++].substr(1));
                        while (!value[i].endsWith('\"')) {
                            item.push(value[i++]);
                        }item.push(value[i].substr(0, value[i].length - 1));
                        arr[j++] = item;
                    } else arr[j++] = value[i];
                }
                return arr;
            }).map(function (data) {
                var value = data;
                for (var i = 0; i < value.length; i++) {
                    switch (_typeof(value[i])) {
                        case "undefined":
                            value[i] = null;
                            break;
                        case "object":
                            var tempArr = value[i];
                            value[i] = [];
                            for (var j = 0; j < tempArr.length; j++) {
                                if (_this.isNumber(tempArr[j])) value[i].push(parseFloat(tempArr[j]));else if (tempArr[j].toLowerCase() == 'false' || tempArr[j].toLowerCase() == 'true') value[i].push(eval(String(value[i]).toLowerCase()));else if (_this.isDate(tempArr[j])) value[i].push(Date.parse(new Date(tempArr[j])));else value[i].push(tempArr[j]);
                            }
                            break;
                        case "string":
                            if (_this.isNumber(value[i])) value[i] = parseFloat(value[i]);else if (value[i].toLowerCase() == 'false' || value[i].toLowerCase() == 'true') value[i] = eval(String(value[i]).toLowerCase());else if (_this.isDate(value[i])) value[i] = Date.parse(new Date(value[i]));else if (value[i] == '') value[i] = null;
                            break;
                        default:
                            break;
                    }
                }
                return value;
            });
            var jsonResult = [];
            for (var i = 0; i < array.length; i++) {
                jsonResult[i] = this.createObj(keys, array[i]);
            }callback(JSON.stringify(jsonResult));
        }
    }, {
        key: "JSON2CSV",
        value: function JSON2CSV(data, fileName) {
            data = Array.isArray(data) ? data : [data];
            var headers = [];
            for (var i = 0; i < data.length; i++) {
                headers = headers.union(Object.keys(data[i]));
            }headers.sort();
            var items = [];

            var _loop = function _loop(_i) {
                items[_i] = new Array(headers.length);
                items[_i].fill('');
                var keys = Object.keys(data[_i]);

                var _loop2 = function _loop2(j) {
                    items[_i][headers.findIndex(function (value) {
                        return value == keys[j];
                    })] = " " + data[_i][keys[j]] + " ";
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
                body = "" + body + items[_i2].toString().split(',').join('\t') + "\r\n";
            }var CSV = headers.toString().split(',').join('\t') + "\r\n" + body;

            var textEncoder = new TextEncoder('utf-16le');
            var csvContentEncoded = textEncoder.encode([CSV]);
            var bom = new Uint8Array([0xFF, 0xFE]);
            var out = new Uint8Array(bom.byteLength + csvContentEncoded.byteLength);
            out.set(bom, 0);
            out.set(csvContentEncoded, bom.byteLength);
            var blob = new Blob([out], { type: "text/csv;charset=utf-8;" });
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, fileName + ".csv");
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) {
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", fileName + ".csv");
                    //link.style = "visibility:hidden";
                    link.style.visibility = "hidden";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    }]);

    return CSVJSONConvertor;
}();