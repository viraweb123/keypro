"use strict";

var getNameFromPath = function getNameFromPath(path) {
  return typeof path === "string" ? path.split("/").pop() : "";
};