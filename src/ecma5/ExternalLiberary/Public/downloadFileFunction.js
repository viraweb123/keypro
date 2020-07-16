"use strict";

var downloadFileFunction = function downloadFileFunction(doc) {
    try {
        if (isCookieFunction('Authorization') != null) {
            var link = document.createElement("a");
            link.download = doc.name;
            link.href = "/KeydocPro/services/rest/document/getContent?docId=" + doc.uuid + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', ''));
            link.style = "visibility:hidden";
            link.name = "key_downloadLink" + doc.name;
            window.document.body.appendChild(link);
            link.click();
            window.document.body.removeChild(link);
        } else throw "لطفا ابتدا وارد سیستم شوید.";
    } catch (e) {
        console.error(e.message || e);
    }
};