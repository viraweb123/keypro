"use strict";

var miladiToJalaliFunction = function miladiToJalaliFunction(milDate) {
    return new Promise(function (resolve, reject) {
        try {
            milDate = typeof milDate != 'string' ? String(milDate) : milDate;
            var jalaliDate = "";
            if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\d{1,3}[\+|\-]\d{1,2}\:\d{1,2}$/i.test(milDate) || /^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\d{1,3}\w$/i.test(milDate)) {
                milDate = milDate.substring(0, milDate.lastIndexOf("."));
                jalaliDate = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
            } else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}[\+|\-]\d{1,2}\:\d{1,2}$/i.test(milDate)) jalaliDate = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');else if (/^\d{14}$/i.test(milDate)) jalaliDate = moment(milDate, 'YYYYMMDDHHmmss').format('jYYYY/jM/jD');
            if (jalaliDate != "") jalaliDate = persianJs(jalaliDate).englishNumber().arabicNumber().toString();
            resolve(jalaliDate);
        } catch (e) {
            reject(e);
        }
    });
};