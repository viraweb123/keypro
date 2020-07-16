"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainCtrl = exports.MainCtrl = function MainCtrl($scope) {
    _classCallCheck(this, MainCtrl);

    $scope.data = MainCtrl.data || {
        welcome: "start controller Main"
    };
};