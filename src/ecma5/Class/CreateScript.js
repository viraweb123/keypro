"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateScript = function () {
    function CreateScript() {
        _classCallCheck(this, CreateScript);
    }

    _createClass(CreateScript, null, [{
        key: "removeJS",
        value: function removeJS(url, funcName) {
            return new Promise(function (resolve, reject) {
                if (CreateScript.addedJS(url)) try {
                    window.document.querySelector("script[type=\"text/javascript\"][src=\"" + url + "\"]").remove();
                    /*if(_.isFunction(window[fun(cName]))
                        window[funcName] = undefined;*/

                    _.forEach(_.split(funcName, ","), function (fName) {
                        try {
                            window[fName] = undefined;
                            delete window[fName];
                        } catch (e) {
                            try {
                                document[fName] = undefined;
                                delete document[fName];
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    });

                    CreateScript._JS[url] = undefined;
                    delete CreateScript._JS[url];
                    resolve(true);
                } catch (e) {
                    console.error(e);
                    reject(e);
                } else resolve(true);
            });
        }
    }, {
        key: "addJS",
        value: function addJS(url) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (CreateScript.addedJS(url)) resolve(true);else {
                    try {
                        var head = window.document.getElementsByTagName("head")[0];
                        var script = window.document.createElement("script");
                        script.type = "text/javascript";
                        script.src = url;
                        script.onload = function () {
                            CreateScript.JS = url;
                            resolve(true);
                        };
                        script.onreadystatechange = function () {
                            if (_this.readyState == 'complete') {
                                CreateScript.JS = url;
                                resolve(true);
                            }
                        };
                        script.onerror = function () {
                            return reject(e);
                        };
                        head.appendChild(script);
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        }
    }, {
        key: "addedJS",
        value: function addedJS(url) {
            return typeof CreateScript._JS !== "undefined" && CreateScript._JS[url];
        }
    }, {
        key: "JS",
        get: function get() {
            return CreateScript._JS;
        },
        set: function set(url) {
            CreateScript._JS = CreateScript._JS || {};
            CreateScript._JS[url] = url;
        }
    }]);

    return CreateScript;
}();

exports.default = CreateScript;
;