'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./../../Class/Service/Service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdministrationService = function () {
    function AdministrationService(Restangular, $q) {
        _classCallCheck(this, AdministrationService);

        this.auth = new _Service.Auth(Restangular, $q);
        this.propertyGroup = new _Service.PropertyGroup(Restangular, $q);
        this.document = new _Service.Document(Restangular, $q);
        this.relation = new _Service.Relation(Restangular, $q);
        this.repository = new _Service.Repository(Restangular, $q);
        this.folder = new _Service.Folder(Restangular, $q);
        this.stamp = new _Service.Stamp(Restangular, $q);
    }

    _createClass(AdministrationService, [{
        key: 'auth',
        get: function get() {
            return this._auth;
        },
        set: function set(auth) {
            this._auth = auth;
        }
    }, {
        key: 'propertyGroup',
        get: function get() {
            return this._propertyGroup;
        },
        set: function set(propertyGroup) {
            this._propertyGroup = propertyGroup;
        }
    }, {
        key: 'document',
        get: function get() {
            return this._document;
        },
        set: function set(document) {
            this._document = document;
        }
    }, {
        key: 'relation',
        get: function get() {
            return this._relation;
        },
        set: function set(relation) {
            this._relation = relation;
        }
    }, {
        key: 'repository',
        get: function get() {
            return this._repository;
        },
        set: function set(repository) {
            this._repository = repository;
        }
    }, {
        key: 'folder',
        get: function get() {
            return this._folder;
        },
        set: function set(folder) {
            this._folder = folder;
        }
    }, {
        key: 'stamp',
        get: function get() {
            return this._stamp;
        },
        set: function set(stamp) {
            this._stamp = stamp;
        }
    }], [{
        key: 'AdministrationServiceFactory',
        value: function AdministrationServiceFactory(Restangular, $q) {
            'ngInject';

            return new AdministrationService(Restangular, $q);
        }
    }]);

    return AdministrationService;
}();

exports.default = AdministrationService.AdministrationServiceFactory;