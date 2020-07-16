"use strict";

Object.defineProperty(Object.prototype, "watch", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: function value(prop, handler) {
        var oldval = this[prop],
            newval = oldval,
            getter = function getter() {
            return newval;
        },
            setter = function setter(val) {
            oldval = newval;
            return newval = handler.call(this, prop, oldval, val);
        };
        if (delete this[prop]) {
            Object.defineProperty(this, prop, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
});

Object.defineProperty(Object.prototype, "unwatch", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: function value(prop) {
        var val = this[prop];
        delete this[prop];
        this[prop] = val;
    }
});

/*
if (!Object.prototype.watch) {
if (!Object.prototype.unwatch) {
*/