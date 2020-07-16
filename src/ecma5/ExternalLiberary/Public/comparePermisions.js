"use strict";

var comparePermisions = function comparePermisions(mainP, newP) {
  return _.map(mainP, function (v, i) {
    return mainP[i] == 0 ? mainP[i] : newP[i];
  });
};