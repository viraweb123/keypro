"use strict";

var getUserImage = function getUserImage(url, selector, errorUrl, header) {
    return new Promise(function (resolve, reject) {
        try {
            $.ajax({
                processData: false,
                contentType: false,
                method: "GET",
                headers: typeof header !== "undefined" ? header : {},
                url: url
            }).done(function (res) {
                resolve(url);
            }).fail(function (err) {
                var path = err.status == 200 && err.readyState == 4 ? url : errorUrl;
                if (window.document.querySelector(selector)) window.document.querySelector(selector).src = path;
                resolve(path);
            });
        } catch (e) {
            reject('عدم دریافت موفقیت آمیز تصویر');
        }
    });
};