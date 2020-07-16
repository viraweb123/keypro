"use strict";

var stateVariablesObject = {};

var setStateVariablesFunction = function setStateVariablesFunction(value, state) {
    return new Promise(function (resolve, reject) {
        try {
            stateVariablesObject[state] = _.clone(value);
            resolve(true);
        } catch (e) {
            reject(false);
        }
    });
};

var getStateVariablesFunction = function getStateVariablesFunction(state) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(_.clone(stateVariablesObject[state]));
        } catch (e) {
            reject(false);
        }
    });
};