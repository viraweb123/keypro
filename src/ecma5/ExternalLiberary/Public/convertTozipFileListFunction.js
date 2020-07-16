'use strict';

var convertTozipFileListFunction = function convertTozipFileListFunction(docs) {
    return new Promise(function (resolve, reject) {
        try {

            if (isCookieFunction('Authorization') != null) {

                var link = document.createElement("a");
                link.href = '/KeydocPro/services/rest/convertor/tozip?docIds=' + _.join(_.map(docs, 'uuid'), ',') + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', ''));
                // link.target = "_blank";
                link.style = "visibility:hidden";
                link.name = "key_downloadLink";
                /*link.download = `files.zip`;*/
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                resolve(true);
            } else throw "لطفا ابتدا وارد سیستم شوید.";
        } catch (e) {
            console.error(e.message || e);
            reject(false);
        }
    });
};