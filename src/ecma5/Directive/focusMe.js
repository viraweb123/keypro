'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = focusMe;
function focusMe($timeout) {
    'ngInject';

    return {
        link: function link(scope, element, attr) {
            attr.$observe('focusMe', function (value) {
                if (value === "true") {
                    $timeout(function () {
                        element[0].focus();
                        element[0].select();
                    });
                }
            });
        }
    };
}