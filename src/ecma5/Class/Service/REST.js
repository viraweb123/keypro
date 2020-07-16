"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var REST = new WeakMap();

var RESTService = exports.RESTService = function() {
    function RESTService(PATH) {
        _classCallCheck(this, RESTService);

        REST.set(this, new XMLHttpRequest());
        this.Path = RESTService.mainPath + "/" + PATH;
    }

    // config main path in rest services


    _createClass(RESTService, [{
        key: "_post",
        value: function _post() {}
    }, {
        key: "_get",
        value: function _get() {
            "use strict";

            var specialPathWithQuery = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            var json = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var _this = this;

            var callback = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
            var specialHeader = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
            REST.get(this).addEventListener("progress", function(e) {
                if (e.lengthComputable && document.getElementById("serverRequestMeter")) document.getElementById("serverRequestMeter").value = String(e.loaded / e.total * 100);
            });

            if (document.getElementById("serverRequestMeter")) {
                (function() {
                    var progressBar = document.getElementById("serverRequestMeter");
                    REST.get(_this).upload.onprogress = function(e) {
                        if (e.lengthComputable) {
                            progressBar.max = e.total;
                            progressBar.value = e.loaded;
                        }
                    };
                    REST.get(_this).upload.onloadstart = function(e) {
                        return progressBar.value = 0;
                    };
                    REST.get(_this).upload.onloadend = function(e) {
                        return progressBar.value = e.loaded;
                    };
                })();
            }

            REST.get(this).open('get', "" + this.Path + specialPathWithQuery, false);
            REST.get(this).onreadystatechange = function() {
                if (REST.get(_this).readyState == 4) {
                    if (REST.get(_this).status == 200 || REST.get(_this).status == 204)
                        if (typeof callback === 'function') callback(REST.get(_this).responseJSON());
                        else throw "error occure to get service " + _this.Path + specialPathWithQuery;
                }
            };
            // add headers Bearer
            for (var header in RESTService.BearerHeaders) {
                REST.get(this).setRequestHeader(header, RESTService.BearerHeaders[header]);
            } // add special headers
            for (var header in specialHeader) {
                REST.get(this).setRequestHeader(header, specialHeader[header]);
            }
            REST.get(this).send(json);
        }
    }, {
        key: "Path",


        // this rest service path
        set: function set(Path) {
            this._Path = Path;
        },
        get: function get() {
            return this._Path;
        }

        // Bearer headers

    }], [{
        key: "removeHeader",
        value: function removeHeader(header) {
            if (RESTService._BearerHeaders[header]) delete RESTService._BearerHeaders[header];
        }
    }, {
        key: "clearHeaders",
        value: function clearHeaders() {
            RESTService._BearerHeaders = {};
        }
    }, {
        key: "mainPath",
        set: function set(mainPath) {
            RESTService._mainPath = mainPath;
        },
        get: function get() {
            return RESTService._mainPath || null;
        }
    }, {
        key: "BearerHeaders",
        set: function set(BearerHeaders) {
            RESTService._BearerHeaders = {};
            for (var header in BearerHeaders) {
                RESTService._BearerHeaders[header] = BearerHeaders[header];
            }
        },
        get: function get() {
            return RESTService._BearerHeaders || {};
        }
    }]);

    return RESTService;
}();