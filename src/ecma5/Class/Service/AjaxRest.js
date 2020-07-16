"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(XMLHttpRequest.prototype, 'responseJSON', {
    value: function value() {
        var res = null;
        try {
            res = eval("(" + JSON.parse(this.response) + ")");
        } catch (e) {
            res = JSON.parse(this.response);
        } finally {
            return res;
        }
    },
    writable: false,
    enumerable: false
});

var RESTService = exports.RESTService = function () {
    function RESTService(PATH) {
        _classCallCheck(this, RESTService);

        try {
            this.rest = new XMLHttpRequest();
            this.Path = RESTService.mainPath + "/" + PATH;
        } catch (e) {
            console.error(e);
        }
    }

    // config main path in rest services


    _createClass(RESTService, [{
        key: "_post",


        //post method
        value: function _post() {
            var subPath = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            var query = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var _this = this;

            var json = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var subHeader = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            return new Promise(function (resolve, reject) {
                try {
                    var q = query != null ? "?" + _.map(query, function (value, key) {
                        return key + "=" + value;
                    }).join('&') : '';
                    _this.rest.open('post', (_this.Path + "/" + subPath + q).trim(), true);
                    _this.rest.onreadystatechange = function () {
                        if (_this.rest.readyState == 4) {
                            if (_this.rest.status == 200 || _this.rest.status == 204) {
                                resolve(_this.rest.responseJSON());
                            } else reject('error occure');
                        }
                    };
                    // add headers Bearer
                    for (var header in RESTService.BearerHeaders) {
                        _this.rest.setRequestHeader(header, RESTService.BearerHeaders[header]);
                    }
                    //_.forEach(REST.BearerHeaders, (value, header) => this.rest.setRequestHeader(header, value));
                    // add special headers
                    for (var _header in subHeader) {
                        _this.rest.setRequestHeader(_header, subHeader[_header]);
                    }
                    //_.forEach(subHeader, (value, header) => this.rest.setRequestHeader(header, value));
                    //console.log(JSON.stringify(json));
                    _this.rest.send(JSON.stringify(json));
                } catch (e) {
                    reject(e);
                }
            });
        }

        // get method

    }, {
        key: "_get",
        value: function _get() {
            var subPath = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            var query = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var _this2 = this;

            var json = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var subHeader = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            return new Promise(function (resolve, reject) {
                try {
                    var q = query != null ? "?" + _.map(query, function (value, key) {
                        return key + "=" + value;
                    }).join('&') : '';
                    _this2.rest.open('get', (_this2.Path + "/" + subPath + q).trim(), true);
                    _this2.rest.onreadystatechange = function () {
                        if (_this2.rest.readyState == 4) {
                            if (_this2.rest.status == 200 || _this2.rest.status == 204) resolve(_this2.rest.responseJSON());else reject('error occure');
                        }
                    };
                    // add headers Bearer
                    _.forEach(RESTService.BearerHeaders, function (value, header) {
                        return _this2.rest.setRequestHeader(header, value);
                    });
                    // add special headers
                    _.forEach(subHeader, function (value, header) {
                        return _this2.rest.setRequestHeader(header, value);
                    });
                    _this2.rest.send(json);
                } catch (e) {
                    reject(e);
                }
            });
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

        // this rest Object

    }, {
        key: "rest",
        set: function set(rest) {
            try {
                this._Rest = new XMLHttpRequest();
            } catch (e) {
                try {
                    this._Rest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    console.error(e);
                }
            }
        },
        get: function get() {
            return this._Rest;
        }

        // Bearer headers

    }], [{
        key: "removeHeader",
        value: function removeHeader(header) {
            if (_.has(RESTService._BearerHeaders, header)) {
                RESTService._BearerHeaders[header] = undefined;
                delete RESTService._BearerHeaders[header];
            }
        }
    }, {
        key: "clearHeaders",
        value: function clearHeaders() {
            RESTService._BearerHeaders = undefined;
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
            try {
                RESTService._BearerHeaders = {};
                _.forEach(BearerHeaders, function (value, header) {
                    return RESTService._BearerHeaders[header] = BearerHeaders[header];
                });
            } catch (e) {
                console.error(e);
            }
        },
        get: function get() {
            return typeof RESTService._BearerHeaders !== "undefined" ? RESTService._BearerHeaders : {};
        }
    }]);

    return RESTService;
}();