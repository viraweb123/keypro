"use strict";

var downloadFile = function downloadFile(doc) {
    return new Promise(function (resolve, reject) {
        try {
            if (isCookieFunction('Authorization') != null) {
                var link = window.document.createElement("a");
                link.href = "/KeydocPro/services/rest/document/getContent?docId=" + doc.uuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', ''));
                // link.target = "_blank";
                link.style = "visibility:hidden";
                link.name = "key_downloadLink";
                link.download = doc.name;
                window.document.body.appendChild(link);
                link.click();
                window.document.body.removeChild(link);
                resolve(true);
            } else throw "لطفا ابتدا وارد سیستم شوید.";
        } catch (e) {
            reject(e);
        }
    });
};