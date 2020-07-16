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
        }

        /*    static removeJS(url,func){
                if(typeof CreateScript._JS !== "undefined" && CreateScript._JS[url]){
                    let head =  window.document.getElementsByTagName("head")[0];
                    if(head.querySelector("[src="+ url +"]") != null){
                        head.removeChild(head.querySelector("[src="+ url +"]"));
        
                    }
                }
            }*/

        //_.findIndex(  head.childNodes  , node => ( node != null && (typeof node.src !== 'undefined') && _.isString(node.src) && node.src.match(/calc.js/gi)!= null ))
        ,
        set: function set(url) {
            CreateScript._JS = CreateScript._JS || {};
            CreateScript._JS[url] = url;
            /*CreateScript._JS = CreateScript._JS || {};
             let head    =  window.document.getElementsByTagName("head")[0];
             let script  =  window.document.createElement("script");
             script.type = "text/javascript";
               script.onload = handleLoad;
             script.onreadystatechange = handleReadyStateChange;
             script.onerror = handleError;
             scr.src = path;
             document.body.appendChild(scr);
                 script.src = url;
             CreateScript._JS[url]=head.appendChild(script);*/
        }
    }]);

    return CreateScript;
}();

;

exports.default = CreateScript.addJS;