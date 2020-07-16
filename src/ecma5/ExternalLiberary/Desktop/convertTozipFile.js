"use strict";

var convertTozipFile = function convertTozipFile(docs) {
    return new Promise(function (resolve, reject) {
        try {
            if (isCookieFunction('Authorization') != null) {
                var link = window.document.createElement("a");
                link.href = "/KeydocPro/services/rest/convertor/tozip?docIds=" + docs + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', ''));
                // link.target = "_blank";
                link.style = "visibility:hidden";
                link.name = "key_downloadLink";
                link.download = 'files.zip';
                window.document.body.appendChild(link);
                link.click();
                window.document.body.removeChild(link);
                resolve(true);
            } else throw "لطفا ابتدا وارد سیستم شوید.";
        } catch (e) {
            reject(e.message || e);
        }
    });
};