'use strict';

var getPermisionArray = function getPermisionArray(permision) {
    try {
        var newPermision = [0, 0, 0, 0];
        permision = Number(permision);
        var per = _.map(permision.toString(2).split(''), function (i) {
            return parseInt(i);
        });
        newPermision.splice(0, per.length);
        return newPermision.concat(per);
    } catch (e) {
        return [0, 0, 0, 0];
    }
};