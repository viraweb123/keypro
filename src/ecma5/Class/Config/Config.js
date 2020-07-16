'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.servicePATH = servicePATH;

var _REST = require('./../Service/REST');

function servicePATH(path) {
    _REST.RESTService.mainPath = path;
}