"use strict";

var JSManagement = {};

JSManagement._JS = {};

JSManagement.isAddedJS = function (url) {
    return typeof JSManagement._JS !== "undefined" && _.has(JSManagement._JS, url);
};

JSManagement.removeJS = function (url, funcName) {
    return new Promise(function (resolve, reject) {
        if (JSManagement.isAddedJS(url)) {
            try {
                try {
                    window.document.querySelector("script[type=\"text/javascript\"][src=\"" + url + "\"]").remove();
                } catch (err) {
                    console.error(err);
                }
                _.forEach(_.split(funcName, ","), function (fName) {
                    try {
                        var splited = fName.split(':');
                        if (splited.length == 1) {
                            try {
                                window[fName] = undefined;
                                delete window[fName];
                            } catch (err) {
                                console.error(err);
                            }
                        } else {
                            switch (splited[0]) {
                                case 'jQuery':
                                    try {
                                        jQuery.prototype[splited[1]] = undefined;
                                        delete jQuery.prototype[splited[1]];
                                    } catch (err) {
                                        console.error(err);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    } catch (e) {
                        try {
                            document[fName] = undefined;
                            delete document[fName];
                        } catch (e) {
                            console.error(e);
                        }
                    }
                });
                try {
                    JSManagement._JS[url] = undefined;
                    delete JSManagement._JS[url];
                } catch (e) {
                    console.error(e);
                }
                resolve(true);
            } catch (e) {
                console.error(e);
                reject(e);
            }
        } else {
            resolve(true);
        }
    });
};

JSManagement.addJS = function (url) {
    return new Promise(function (resolve, reject) {
        if (JSManagement.isAddedJS(url)) resolve(true);else {
            try {
                var head = window.document.getElementsByTagName("head")[0];
                var script = window.document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                script.onload = function () {
                    JSManagement._JS[url] = 1;
                    resolve(true);
                };
                script.onreadystatechange = function () {
                    if (undefined.readyState == 'complete') {
                        JSManagement._JS[url] = 1;
                        resolve(true);
                    }
                };
                script.onerror = function (err) {
                    return reject(err);
                };
                head.appendChild(script);
            } catch (e) {
                reject(e);
            }
        }
    });
};