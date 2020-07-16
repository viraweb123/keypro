"use strict";

var dateFormatInternal = function dateFormatInternal(date) {
    return new Promise(function (resolve, reject) {
        try {
            if (_.isDate(date)) resolve("" + String(date.getFullYear()) + (String(date.getMonth() + 1).length == 1 ? "0" + String(date.getMonth() + 1) : String(date.getMonth() + 1)) + (String(date.getDate()).length == 1 ? "0" + String(date.getDate()) : String(date.getDate())) + (String(date.getHours()).length == 1 ? "0" + String(date.getHours()) : String(date.getHours())) + (String(date.getMinutes()).length == 1 ? "0" + String(date.getMinutes()) : String(date.getMinutes())) + (String(date.getSeconds()).length == 1 ? "0" + String(date.getSeconds()) : String(date.getSeconds())));else reject('فرمت سند تاریخ نیست');
        } catch (e) {
            reject(e);
        }
    });
};