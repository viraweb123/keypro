"use strict";

var systematicPaths = function systematicPaths() {
    return new Promise(function (resolve, reject) {
        resolve([{ label: "اختار درختی پوشه ها", value: "/okm:root" }, { label: "الگوها", value: "/okm:templates" }, { label: "اسناد من", value: "/okm:personal" }, { label: "ایمیل", value: "/okm:mail" }, { label: "سطل زباله", value: "/okm:trash" }, { label: "اصلاح نامه", value: "/okm:thesaurus" }]);
    });
};