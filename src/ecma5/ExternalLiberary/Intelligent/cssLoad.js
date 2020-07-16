"use strict";

var CSSManagement = {};

CSSManagement._CSS = {};

CSSManagement.isAddedCSS = function (url) {
    return typeof CSSManagement._CSS !== "undefined" && _.has(CSSManagement._CSS, url);
};

CSSManagement.removeCSS = function (url) {
    return new Promise(function (resolve, reject) {
        if (CSSManagement.isAddedCSS(url)) {
            try {
                window.document.querySelector("link[rel=stylesheet][href=\"" + url + "\"]").remove();
                CSSManagement._CSS[url] = undefined;
                delete CSSManagement._CSS[url];
                resolve(true);
            } catch (e) {
                reject(e);
            }
        } else {
            resolve(true);
        }
    });
};

CSSManagement.addCSS = function (url) {
    return new Promise(function (resolve, reject) {
        if (CSSManagement.isAddedCSS(url)) resolve(true);else {
            try {
                (function () {
                    var link = document.createElement("link");
                    link.type = "text/css";
                    link.rel = "stylesheet";
                    link.onload = function () {
                        resolve(true);
                    };
                    if (link.addEventListener) {
                        link.addEventListener('load', function () {
                            resolve(true);
                        }, false);
                    }
                    link.onreadystatechange = function () {
                        if (_.includes(['loaded', 'complete'], link.readyState)) {
                            link.onreadystatechange = null;
                            resolve(true);
                        }
                    };
                    CSSManagement._CSS[url] = 1;
                    link.href = url;
                    window.document.getElementsByTagName("head")[0].appendChild(link);
                })();
            } catch (e) {
                reject(e);
            }
        }
    });
};