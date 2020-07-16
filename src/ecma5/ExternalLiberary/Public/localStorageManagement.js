"use strict";

//name = selectedMetadataState
var setSelectedLocalStorage = function setSelectedLocalStorage(value, name) {
    return new Promise(function (resolve, reject) {
        try {
            localStorage.setItem(name, JSON.stringify(value));
            resolve(true);
        } catch (e) {
            reject("عدم ذخیره موفق در حافظه");
        }
    });
};

var getSelectedLocalStorage = function getSelectedLocalStorage(name) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(JSON.parse(localStorage.getItem(name))); //null if not exist
        } catch (e) {
            reject(false);
        }
    });
};

var removeSelectedLocalStorage = function removeSelectedLocalStorage(name) {
    return new Promise(function (resolve, reject) {
        try {
            window.localStorage.removeItem(name);
            resolve("اطلاعات با موفقیت از حافظه موقت حذف گردید"); //null if not exist
        } catch (e) {
            reject("امکان حذف داده وجود ندارد");
        }
    });
};