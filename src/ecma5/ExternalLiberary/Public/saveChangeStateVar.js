"use strict";

var ChangeStateHiddenVar = undefined;
var setStateVarFunction = function setStateVarFunction(value) {
    return new Promise(function (resolve, reject) {
        try {
            ChangeStateHiddenVar = _.clone(value);
            resolve(true);
        } catch (e) {
            reject(false);
        }
    });
};
var getStateVarFunction = function getStateVarFunction() {
    return new Promise(function (resolve, reject) {
        try {
            resolve(ChangeStateHiddenVar);
        } catch (e) {
            reject(false);
        }
    });
};