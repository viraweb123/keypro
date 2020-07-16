"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var expiresTimeLefy = 30;

//TODO sample ['Authorization','TOKEN']
var clearSelectedCashFunction = function clearSelectedCashFunction(list) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        try {
            if (_.isArray(list)) _.forEach(list, function () {
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(cookie) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.prev = 0;
                                    _context.next = 3;
                                    return deleteCookieWithNameFunction(cookie);

                                case 3:
                                    _context.next = 8;
                                    break;

                                case 5:
                                    _context.prev = 5;
                                    _context.t0 = _context["catch"](0);

                                    console.error(_context.t0);

                                case 8:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[0, 5]]);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }());
            resolve('لیست انتخابی با موفقیت حذف گردید.');
        } catch (e) {
            reject(e);
        }
    });
};

var deleteCookieWithNameFunction = function deleteCookieWithNameFunction(name, path, domain) {
    return new Promise(function (resolve, reject) {
        try {
            if (isCookieFunction(name) != null) {
                try {
                    document.cookie = name + "=; expires=" + new Date().toUTCString();
                    resolve("کوکی با موفقیت حذف گردید.");
                } catch (e) {
                    reject("امکان حذف کوکی فوق نیست.");
                }
            } else resolve("کوکی با این نام وجود ندارد.");
            /*   createCookiesWithNameFunction(name, "", undefined , path, domain).then(
                   res => resolve("کوکی با موفقیت حذف گردید."),
                   err => reject("امکان حذف کوکی فوق نیست.")
               );*/
        } catch (e) {
            reject("امکان حذف کوکی فوق نیست.");
        }
    });
};

var isCookieFunction = function isCookieFunction(name) {
    var result = null;
    try {
        var regexp = new RegExp("(?:^" + name + "|;s* " + name + ")=(.*?)(?:;|$)", "g");
        result = regexp.exec(document.cookie);
    } catch (e) {
        console.error(e);
    } finally {
        return result === null ? null : result[1];
    }
};

var creatNewExpiresCookieFunction = function creatNewExpiresCookieFunction(name, time) {
    try {
        if (isCookieFunction(name) != null) {
            var cookie = name + "=" + isCookieFunction(name) + ";";
            if (typeof time !== "undefined") {
                var expiresTime = new Date();
                expiresTime.setUTCMinutes(expiresTime.getUTCMinutes() + time);
                expiresTime = " expires=" + expiresTime.toUTCString();
                cookie += expiresTime;
            }
            document.cookie = _.clone(cookie);
            cookie = undefined;
        }
    } catch (e) {
        console.error(e);
    }
};

var createCookiesWithNameFunction = function createCookiesWithNameFunction(name, value, expires, path, domain) {
    return new Promise(function (resolve, reject) {
        try {
            var cookie = name + "=" + escape(value) + ";";
            if (typeof expires !== "undefined") cookie += expires;
            document.cookie = _.clone(cookie);
            cookie = undefined;
            resolve("کوکی با موفقیت ایجاد گردید.");
        } catch (e) {
            console.error(e);
            reject("مشکلی در ایجاد کوکی به وجود آمده است.");
        }
    });
};