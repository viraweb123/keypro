"use strict";

var miladiToJalali = function miladiToJalali(milDate) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof milDate != 'string') milDate = String(milDate);
            var jalaliDate = "";
            if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\d{1,3}[\+|\-]\d{1,2}\:\d{1,2}$/i.test(milDate)) {
                milDate = milDate.substring(0, milDate.lastIndexOf("."));
                jalaliDate = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
            } else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}[\-|\+]\d{1,2}\:\d{1,2}$/i.test(milDate)) {
                jalaliDate = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
            } else if (/^\d{14}$/i.test(milDate)) {
                jalaliDate = moment(milDate, 'YYYYMMDDHHmmss').format('jYYYY/jM/jD');
            } else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\d{1,3}[Zz]$/i.test(milDate)) {
                jalaliDate = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
            }
            if (jalaliDate != "") jalaliDate = persianJs(jalaliDate).englishNumber().arabicNumber().toString();
            /*else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\+\d{1,2}\:\d{1,2}$/i.test(milDate))
                jalaliDate = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');
            else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\-\d{1,2}\:\d{1,2}$/i.test(milDate))
                jalaliDate = moment(milDate, 'YYYY-M-DTHH:mm:ss').format('jYYYY/jM/jD');*/
            resolve(jalaliDate);
        } catch (e) {
            reject(e);
        }
    });
};