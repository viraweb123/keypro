'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ngRightClick;
function ngRightClick($parse) {
    'ngInject';

    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
}