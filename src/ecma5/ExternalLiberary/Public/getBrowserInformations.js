'use strict';

//TODO get browser just name
var getCurrentbrowserName = function getCurrentbrowserName() {
    return new Promise(function (resolve, reject) {
        try {
            var ua = navigator.userAgent,
                tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                resolve({ name: 'IE' });
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null) resolve({ name: tem.slice(1).join(' ').replace('OPR', 'Opera') });
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
            resolve({ name: M[0] });
        } catch (e) {
            reject(e);
        }
    });
};
//TODO get browser name and version complate
var getCurrentbrowserType = function getCurrentbrowserType() {
    return new Promise(function (resolve, reject) {
        try {
            var ua = navigator.userAgent,
                tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) tem = /\brv[ :]+(\d+)/g.exec(ua) || [];return 'IE ' + (tem[1] || '');
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null) resolve({ type: tem.slice(1).join(' ').replace('OPR', 'Opera') });
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
            resolve({ type: M.join(' ') });
        } catch (e) {
            reject(e);
        }
    });
};