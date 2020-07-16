"use strict";

var fileSizeDashboardCtrl = function fileSizeDashboardCtrl(size) {
  return size / 8192 < 1024 ? Number((size / 8192).toFixed(1)) + " KB" : Number((size / 8388608).toFixed(1)) + " MB";
};