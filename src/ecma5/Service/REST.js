'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REST = exports.REST = function () {
    function REST(PATH) {
        _classCallCheck(this, REST);

        this.rest = new XMLHttpRequest();
        this.Path = REST.mainPath + '/' + PATH;
    }

    // config main path in rest services


    _createClass(REST, [{
        key: '_post',


        //post method
        value: function _post() {
            var subPath = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            var query = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var _this = this;

            var json = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var subHeader = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            return new Promise(function (resolve, reject) {
                if (REST.progressBar) {
                    REST.showProgressBar();
                    _this.rest.upload.onprogress = function (e) {
                        if (e.lengthComputable) {
                            REST.progressBar.max = e.total;
                            REST.progressBar.value = e.loaded;
                        }
                        //REST.progressBar.value = Math.floor((e.loaded / e.total) * 100);
                    };
                    _this.rest.upload.onprogress = function (e) {
                        if (e.lengthComputable) {
                            REST.progressBar.max = e.total;
                            REST.progressBar.value = e.loaded;
                        }
                        //REST.progressBar.value = Math.floor((e.loaded / e.total) * 100);
                    };
                    _this.rest.addEventListener("progress", function (e) {
                        if (e.lengthComputable) {
                            REST.progressBar.max = e.total;
                            REST.progressBar.value = e.loaded;
                        }
                    }, false);
                    _this.rest.upload.onloadend = function (e) {
                        return REST.progressBar.value = e.loaded;
                    };
                    _this.rest.upload.onloadstart = function (e) {
                        return REST.progressBar.value = 0;
                    };
                }
                var q = query != null ? '?' + _.map(query, function (value, key) {
                    return key + '=' + value;
                }).join('&') : '';
                _this.rest.open('post', (_this.Path + '/' + subPath + q).trim(), true);
                _this.rest.onreadystatechange = function () {
                    if (_this.rest.readyState == 4) {
                        REST.progressBar.style.width = '0%';
                        REST.hideProgressBar();
                        if (_this.rest.status == 200 || _this.rest.status == 204) {
                            resolve(_this.rest.responseJSON());
                        } else reject('error occure');
                    }
                };
                // add headers Bearer
                for (var header in REST.BearerHeaders) {
                    _this.rest.setRequestHeader(header, REST.BearerHeaders[header]);
                } // add special headers
                for (var header in subHeader) {
                    _this.rest.setRequestHeader(header, subHeader[header]);
                }_this.rest.send(json);
            });
        }

        //get method

    }, {
        key: '_get',
        value: function _get() {
            var subPath = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            var query = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var _this2 = this;

            var json = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var subHeader = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            return new Promise(function (resolve, reject) {
                if (REST.progressBar) {
                    REST.showProgressBar();
                    _this2.rest.upload.onprogress = function (e) {
                        if (e.lengthComputable) {
                            REST.progressBar.max = e.total;
                            REST.progressBar.value = e.loaded;
                        }
                        //REST.progressBar.value = Math.floor((e.loaded / e.total) * 100);
                    };
                    _this2.rest.upload.onprogress = function (e) {
                        if (e.lengthComputable) {
                            REST.progressBar.max = e.total;
                            REST.progressBar.value = e.loaded;
                        }
                        //REST.progressBar.value = Math.floor((e.loaded / e.total) * 100);
                    };
                    _this2.rest.addEventListener("progress", function (e) {
                        if (e.lengthComputable) {
                            REST.progressBar.max = e.total;
                            REST.progressBar.value = e.loaded;
                        }
                    }, false);
                    _this2.rest.upload.onloadend = function (e) {
                        return REST.progressBar.value = e.loaded;
                    };
                    _this2.rest.upload.onloadstart = function (e) {
                        return REST.progressBar.value = 0;
                    };
                }
                var q = query != null ? '?' + _.map(query, function (value, key) {
                    return key + '=' + value;
                }).join('&') : '';
                _this2.rest.open('get', (_this2.Path + '/' + subPath + q).trim(), true);
                _this2.rest.onreadystatechange = function () {
                    if (_this2.rest.readyState == 4) {
                        REST.progressBar.style.width = '0%';
                        REST.hideProgressBar();
                        if (_this2.rest.status == 200 || _this2.rest.status == 204) resolve(_this2.rest.responseJSON());else reject('error occure');
                    }
                };
                // add headers Bearer
                for (var header in REST.BearerHeaders) {
                    _this2.rest.setRequestHeader(header, REST.BearerHeaders[header]);
                } // add special headers
                for (var header in subHeader) {
                    _this2.rest.setRequestHeader(header, subHeader[header]);
                }_this2.rest.send(json);
            });
        }
    }, {
        key: 'Path',


        // this rest service path
        set: function set(Path) {
            this._Path = Path;
        },
        get: function get() {
            return this._Path;
        }

        // this rest Object

    }, {
        key: 'rest',
        set: function set(rest) {
            this._Rest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        },
        get: function get() {
            return this._Rest;
        }

        // Bearer headers

    }], [{
        key: 'removeHeader',
        value: function removeHeader(header) {
            if (REST._BearerHeaders[header]) delete REST._BearerHeaders[header];
        }
    }, {
        key: 'clearHeaders',
        value: function clearHeaders() {
            REST._BearerHeaders = {};
        }
    }, {
        key: 'hideProgressBar',
        value: function hideProgressBar() {
            REST.progressBar.classList.remove('rest-progressbar-show');
        }
    }, {
        key: 'showProgressBar',
        value: function showProgressBar() {
            REST.progressBar.classList.add('rest-progressbar-show');
        }
    }, {
        key: 'mainPath',
        set: function set(mainPath) {
            REST._mainPath = mainPath;
        },
        get: function get() {
            return REST._mainPath || null;
        }
    }, {
        key: 'progressBar',
        get: function get() {
            return window.document.getElementById('start-request-2-server-progressbar-id') || false;
        }
    }, {
        key: 'BearerHeaders',
        set: function set(BearerHeaders) {
            REST._BearerHeaders = {};
            for (var header in BearerHeaders) {
                REST._BearerHeaders[header] = BearerHeaders[header];
            }
        },
        get: function get() {
            return REST._BearerHeaders || {};
        }
    }]);

    return REST;
}();