"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base64 = function () {
    function Base64() {
        _classCallCheck(this, Base64);
    }

    _createClass(Base64, null, [{
        key: "encode",

        // general method for encoding
        value: function encode(input) {
            var output = "";
            var chr1 = void 0,
                chr2 = void 0,
                chr3 = void 0,
                enc1 = void 0,
                enc2 = void 0,
                enc3 = void 0,
                enc4 = void 0;
            var i = 0;
            input = Base64._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = "" + output + Base64.keyStr.charAt(enc1) + Base64.keyStr.charAt(enc2) + Base64.keyStr.charAt(enc3) + Base64.keyStr.charAt(enc4);
            }
            return output;
        }

        // private method for UTF-8 encoding

    }, {
        key: "_utf8_encode",
        value: function _utf8_encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) utftext = "" + utftext + String.fromCharCode(c);else if (c > 127 && c < 2048) utftext = "" + utftext + String.fromCharCode(c >> 6 | 192) + String.fromCharCode(c & 63 | 128);else utftext = "" + utftext + String.fromCharCode(c >> 12 | 224) + String.fromCharCode(c >> 6 & 63 | 128) + String.fromCharCode(c & 63 | 128);
            }
            return utftext;
        }

        // general method for decoding

    }, {
        key: "decode",
        value: function decode(input) {
            input = input || "";
            var output = "",
                chr1 = void 0,
                chr2 = void 0,
                chr3 = void 0,
                enc1 = void 0,
                enc2 = void 0,
                enc3 = void 0,
                enc4 = void 0,
                i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = Base64.keyStr.indexOf(input.charAt(i++));
                enc2 = Base64.keyStr.indexOf(input.charAt(i++));
                enc3 = Base64.keyStr.indexOf(input.charAt(i++));
                enc4 = Base64.keyStr.indexOf(input.charAt(i++));

                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;

                output = "" + output + String.fromCharCode(chr1);

                if (enc3 != 64) output = "" + output + String.fromCharCode(chr2);
                if (enc4 != 64) output = "" + output + String.fromCharCode(chr3);
            }

            output = Base64._utf8_decode(output);

            return output;
        }
    }, {
        key: "_utf8_decode",
        value: function _utf8_decode(utftext) {
            var string = "",
                i = 0;
            var c = 0;
            var c1 = 0;
            var c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string = "" + string + String.fromCharCode(c);
                    i++;
                } else if (c > 191 && c < 224) {
                    c2 = utftext.charCodeAt(i + 1);
                    string = "" + string + String.fromCharCode((c & 31) << 6 | c2 & 63);
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string = "" + string + String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    i += 3;
                }
            }
            return string;
        }
    }, {
        key: "base64Factory",
        value: function base64Factory() {

            return new Base64();
        }
    }, {
        key: "keyStr",
        get: function get() {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        }
    }]);

    return Base64;
}();

exports.default = Base64;