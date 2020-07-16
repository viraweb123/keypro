"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

//toPersian
exports.default = function (txt) {
  return !_.includes([null, "", undefined], txt) ? persianJs(txt).arabicChar().arabicNumber().englishNumber().toString() : txt;
};