"use strict";

var downloadReportFileFromServer = function downloadReportFileFromServer(src, name) {

    var link = document.createElement("a");

    link.download = name;
    link.href = src;
    link.style = "visibility:hidden";
    link.name = "key_downloadLink" + name;

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
};