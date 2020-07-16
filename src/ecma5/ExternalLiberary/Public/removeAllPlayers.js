"use strict";

var removeAllPlayers = function removeAllPlayers() {
    _.forEach(_.concat($("AUDIO"), $("VIDEO")), function (player) {

        if (typeof player !== "undefined" && typeof player[0] !== "undefined") {
            if (_.isFunction(player[0].pause)) player[0].pause();
            try {
                player[0].src = "";
                player[0].poster = "";
            } catch (e) {
                console.error(e);
            }
        }
    });
};