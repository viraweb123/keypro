"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scrollTheme;
function scrollTheme() {
    'ngInject';

    return {
        restrict: "A",
        scope: {
            scrollOptions: "="
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            try {
                _.defer(function () {
                    $($element).niceScroll($scope.scrollOptions);
                    $scope.$apply();
                }, 100);
            } catch (e) {
                console.error(e);
            }

            $element.on('$destroy', function () {
                try {
                    $($element).getNiceScroll().hide();
                    $($element).getNiceScroll().remove();
                    $scope.$destroy();
                } catch (e) {
                    console.error(e);
                }
            });
        }]
    };
};