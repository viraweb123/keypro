"use strict";

var toDateDashboardCtrl = function toDateDashboardCtrl(date) {
  return Date.parse(new Date(date.year, date.month, date.dayOfMonth, date.hourOfDay, date.minute, date.second));
};