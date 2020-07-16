"use strict";

var makeResulting = function makeResulting(array, len, func) {

    for (var i = 0; i < len; i++) {
        array[i] = func(array[i]);
        /*array[i].document.created = funcs["toDateDashboardCtrl"](array[i].document.created);
        array[i].document.lastModified = funcs["toDateDashboardCtrl"](array[i].document.lastModified);
        array[i].document.title = array[i].document.path.split("/").pop();
        array[i].mimeType = funcs["getSrcFromType"](array[i].document.mimeType);
        array[i].document.actualVersion.newSize = funcs["fileSizeDashboardCtrl"](array[i].document.actualVersion.size);
        try {
            funcs.dashboardService.document.thumbnail(array[i].document, 0, 75).then(
                function(resThumnail){item.src = 'data:image/png;base64,'+resThumnail.data;},
                function(error){item.src = funcs["getSrcFromType"](array[i].document.mimeType)}
            );
        } catch (e) {
            array[i].src = funcs["getSrcFromType"](array[i].document.mimeType);
        }*/
    }
    postMessage(array);
};

self.addEventListener("message", function (e) {
    try {

        // new Function("a","b","var c = a*b;return c;")

        self.makeResulting(e.data.list, e.data.len, e.data.func);
    } catch (e) {
        postMessage("error");
    }
}, false);