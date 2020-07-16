"use strict";

var intToFloatConvertor = function intToFloatConvertor(n) {
  return Number(n) === n && n % 1 !== 0 ? n : n.toFixed(1);
};