"use strict";

var miladiToJalaliWidthStandardDate = function miladiToJalaliWidthStandardDate(date) {
    return new Promise(function (resolve, reject) {
        try {
            if (!_.isDate(date)) reject('عبارت ورودی تاریخ نیست');
            var year = date.getFullYear();
            resolve(moment("" + date.getFullYear() + (String(date.getMonth() + 1).length == 1 ? "0" + String(date.getMonth() + 1) : String(date.getMonth() + 1)) + (String(date.getDate()).length == 1 ? "0" + String(date.getDate()) : String(date.getDate())) + (String(date.getHours()).length == 1 ? "0" + String(date.getHours()) : String(date.getHours())) + (String(date.getMinutes()).length == 1 ? "0" + String(date.getMinutes()) : String(date.getMinutes())) + (String(date.getSeconds()).length == 1 ? "0" + String(date.getSeconds()) : String(date.getSeconds())), 'YYYYMMDDHHmmss').format('jYYYY/jM/jD'));
        } catch (e) {
            reject('عبارت ورودی تاریخ نیست');
        }
    });
};