'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./../Class/Service/Service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DirectiveService = function () {
    function DirectiveService(Restangular, $q) {
        _classCallCheck(this, DirectiveService);

        this.document = new _Service.Document(Restangular, $q);
    }

    _createClass(DirectiveService, [{
        key: 'document',
        get: function get() {
            return this._document;
        },
        set: function set(document) {
            this._document = document;
        }
    }], [{
        key: 'DirectiveServiceFactory',
        value: function DirectiveServiceFactory(Restangular, $q) {
            'ngInject';

            return new DirectiveService(Restangular, $q);
        }
    }]);

    return DirectiveService;
}();

exports.default = DirectiveService.DirectiveServiceFactory;