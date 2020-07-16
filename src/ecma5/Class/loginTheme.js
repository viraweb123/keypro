'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginTheme = function () {
    function LoginTheme(className, path, node, vibration, period, length) {
        _classCallCheck(this, LoginTheme);

        var m = window.document.querySelector(className);
        var style = document.createElement('style');
        style.type = 'text/css';
        style.rel = "stylesheet";
        for (var i = 0; i < node; i++) {
            for (var j = 0; j < path; j++) {
                var span = document.createElement('span');
                var color = LoginTheme.generateRGBRandom();
                span.style["boxShadow"] = "0 0 6px rgba(" + color.R + "," + color.G + "," + color.B + ",1)";
                span.style["background-color"] = "rgba(" + color.R + "," + color.G + "," + color.B + ",1)";
                var len = _.random(length.min, length.max, 0.5);
                span.style['width'] = len + "px";
                span.style['height'] = len + "px";
                span.style['borderRadius'] = len / 2 + "px";
                span.style['position'] = 'absolute';
                LoginTheme.createKeyFrame(_.random(vibration.min, vibration.max, 0.5), "dot_" + i + "_" + j, span, j, style);
                var time = _.random(period.min, period.max, 0.5);
                span.style['MozAnimation'] = "dot_" + i + "_" + j + " " + time + "s infinite linear";
                span.style['webkitAnimation'] = "dot_" + i + "_" + j + " " + time + "s infinite linear";
                span.style['animation'] = "dot_" + i + "_" + j + " " + time + "s infinite linear";
                span.style['oAnimation'] = "dot_" + i + "_" + j + " " + time + "s infinite linear";
                m.appendChild(span);
            }
        }window.document.getElementsByTagName('head')[0].appendChild(style);
    }

    _createClass(LoginTheme, null, [{
        key: 'generateRGBRandom',
        value: function generateRGBRandom() {
            return {
                R: _.random(0, 255),
                G: _.random(0, 255),
                B: _.random(0, 255)
            };
        }
    }, {
        key: 'createKeyFrame',
        value: function createKeyFrame(rand, name, span, index, style) {
            span.style["top"] = LoginTheme.paths[index][0].t + rand + "%";
            span.style["left"] = LoginTheme.paths[index][0].l + rand + "%";
            var k;
            var keys = "";
            for (k = 0; k < 21; k++) {
                var left = LoginTheme.paths[index][k].l + rand;
                left = left < 1 ? 1 : left;
                left = left > 99 ? 99 : left;
                keys += k * 5 + "% {top:" + (LoginTheme.paths[index][k].t + rand) + "%; left:" + left + "%; }";
            }
            style.innerHTML += "@-webkit-keyframes " + name + "{ " + keys + "} @keyframes " + name + "{ " + keys + "}";
        }
    }, {
        key: 'paths',
        get: function get() {
            return [[{ t: 31, l: 1 }, { t: 31.4, l: 5 }, { t: 32.2, l: 10 }, { t: 33.4, l: 15 }, { t: 35.8, l: 20 }, { t: 38.4, l: 25 }, { t: 43.2, l: 30 }, { t: 46.2, l: 35 }, { t: 47.4, l: 40 }, { t: 47.8, l: 45 }, { t: 47.9, l: 50 }, { t: 47.8, l: 55 }, { t: 47.4, l: 60 }, { t: 43.2, l: 65 }, { t: 38.4, l: 70 }, { t: 35.8, l: 75 }, { t: 32.8, l: 80 }, { t: 31.5, l: 85 }, { t: 30.7, l: 90 }, { t: 30, l: 95 }, { t: 29.8, l: 99 }], [{ t: 29.8, l: 99 }, { t: 30, l: 95 }, { t: 30.7, l: 90 }, { t: 31.5, l: 85 }, { t: 32.8, l: 80 }, { t: 35.8, l: 75 }, { t: 38.4, l: 70 }, { t: 43.2, l: 65 }, { t: 47.4, l: 60 }, { t: 47.8, l: 55 }, { t: 47.9, l: 50 }, { t: 47.8, l: 45 }, { t: 47.4, l: 40 }, { t: 46.2, l: 35 }, { t: 43.2, l: 30 }, { t: 38.4, l: 25 }, { t: 35.8, l: 20 }, { t: 33.4, l: 15 }, { t: 32.2, l: 10 }, { t: 31.4, l: 5 }, { t: 31, l: 1 }], [{ t: 31, l: 1 }, { t: 31.4, l: 5 }, { t: 32.2, l: 10 }, { t: 33.4, l: 15 }, { t: 35.8, l: 20 }, { t: 38.4, l: 25 }, { t: 43.2, l: 30 }, { t: 46.2, l: 35 }, { t: 47.4, l: 40 }, { t: 47.8, l: 45 }, { t: 47.9, l: 50 }, { t: 47.8, l: 45 }, { t: 47.4, l: 40 }, { t: 46.2, l: 35 }, { t: 43.2, l: 30 }, { t: 38.4, l: 25 }, { t: 35.8, l: 20 }, { t: 33.4, l: 15 }, { t: 32.2, l: 10 }, { t: 31.4, l: 5 }, { t: 31, l: 1 }], [{ t: 47.9, l: 50 }, { t: 47.8, l: 45 }, { t: 47.4, l: 40 }, { t: 46.2, l: 35 }, { t: 43.2, l: 30 }, { t: 38.4, l: 25 }, { t: 35.8, l: 20 }, { t: 33.4, l: 15 }, { t: 32.2, l: 10 }, { t: 31.4, l: 5 }, { t: 31, l: 1 }, { t: 31.4, l: 5 }, { t: 32.2, l: 10 }, { t: 33.4, l: 15 }, { t: 35.8, l: 20 }, { t: 38.4, l: 25 }, { t: 43.2, l: 30 }, { t: 46.2, l: 35 }, { t: 47.4, l: 40 }, { t: 47.8, l: 45 }, { t: 47.9, l: 50 }], [{ t: 29.8, l: 99 }, { t: 30, l: 95 }, { t: 30.7, l: 90 }, { t: 31.5, l: 85 }, { t: 32.8, l: 80 }, { t: 35.8, l: 75 }, { t: 38.4, l: 70 }, { t: 43.2, l: 65 }, { t: 47.4, l: 60 }, { t: 47.8, l: 55 }, { t: 47.9, l: 50 }, { t: 47.8, l: 55 }, { t: 47.4, l: 60 }, { t: 43.2, l: 65 }, { t: 38.4, l: 70 }, { t: 35.8, l: 75 }, { t: 32.8, l: 80 }, { t: 31.5, l: 85 }, { t: 30.7, l: 90 }, { t: 30, l: 95 }, { t: 29.8, l: 99 }], [{ t: 47.9, l: 50 }, { t: 47.8, l: 55 }, { t: 47.4, l: 60 }, { t: 43.2, l: 65 }, { t: 38.4, l: 70 }, { t: 35.8, l: 75 }, { t: 32.8, l: 80 }, { t: 31.5, l: 85 }, { t: 30.7, l: 90 }, { t: 30, l: 95 }, { t: 29.8, l: 99 }, { t: 30, l: 95 }, { t: 30.7, l: 90 }, { t: 31.5, l: 85 }, { t: 32.8, l: 80 }, { t: 35.8, l: 75 }, { t: 38.4, l: 70 }, { t: 43.2, l: 65 }, { t: 47.4, l: 60 }, { t: 47.8, l: 55 }, { t: 47.9, l: 50 }], [{ t: 38.4, l: 25 }, { t: 43.2, l: 30 }, { t: 46.2, l: 35 }, { t: 47.4, l: 40 }, { t: 47.8, l: 45 }, { t: 47.9, l: 50 }, { t: 47.8, l: 55 }, { t: 47.4, l: 60 }, { t: 43.2, l: 65 }, { t: 38.4, l: 70 }, { t: 35.8, l: 75 }, { t: 38.4, l: 70 }, { t: 43.2, l: 65 }, { t: 47.4, l: 60 }, { t: 47.8, l: 55 }, { t: 47.9, l: 50 }, { t: 47.8, l: 45 }, { t: 47.4, l: 40 }, { t: 46.2, l: 35 }, { t: 43.2, l: 30 }, { t: 38.4, l: 25 }], [{ t: 35.8, l: 75 }, { t: 38.4, l: 70 }, { t: 43.2, l: 65 }, { t: 47.4, l: 60 }, { t: 47.8, l: 55 }, { t: 47.9, l: 50 }, { t: 47.8, l: 45 }, { t: 47.4, l: 40 }, { t: 46.2, l: 35 }, { t: 43.2, l: 30 }, { t: 38.4, l: 25 }, { t: 43.2, l: 30 }, { t: 46.2, l: 35 }, { t: 47.4, l: 40 }, { t: 47.8, l: 45 }, { t: 47.9, l: 50 }, { t: 47.8, l: 55 }, { t: 47.4, l: 60 }, { t: 43.2, l: 65 }, { t: 38.4, l: 70 }, { t: 35.8, l: 75 }]];
        }
    }]);

    return LoginTheme;
}();

exports.default = LoginTheme;