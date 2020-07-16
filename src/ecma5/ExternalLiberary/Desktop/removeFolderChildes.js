"use strict";

var removeFolderChildes = function removeFolderChildes(pointer, id) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof pointer != "undefined" && _.has(pointer, id)) {
                var item;

                (function () {
                    var deleteArray = [id];
                    while (deleteArray.length > 0) {
                        item = deleteArray.pop();

                        if (pointer[item].hasChildrenFolder && _.has(pointer[item], 'children') && _.isArray(pointer[item].children)) _.forEach(pointer[item].children, function (child) {
                            return deleteArray.push(child.id);
                        });
                        pointer[item] = null;
                        delete pointer[item];
                    }
                    resolve();
                })();
            } else resolve();
        } catch (e) {
            resolve();
        }
    });
};