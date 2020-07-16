'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}];