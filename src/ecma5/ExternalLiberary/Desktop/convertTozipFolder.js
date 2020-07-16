"use strict";

var convertTozipFolderDesktopCtrl = function convertTozipFolderDesktopCtrl(folder) {
    return new Promise(function (resolve, reject) {
        try {
            if (isCookieFunction('Authorization') != null) {
                var link = window.document.createElement("a");
                link.href = "/KeydocPro/services/rest/convertor/tozip?fldId=" + (folder.id || folder.uuid) + "&authId=" + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', ''));
                // link.target = "_blank";
                link.style = "visibility:hidden";
                link.name = "key_downloadLink";
                link.download = folder.label + ".zip";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                resolve(true);
            } else throw "لطفا ابتدا وارد سیستم شوید.";
        } catch (e) {
            reject(e);
        }
    });
};