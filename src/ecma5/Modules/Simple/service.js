'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./../../Class/Service/Service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleService = function () {
    function SimpleService(Restangular, $q) {
        _classCallCheck(this, SimpleService);

        this.auth = new _Service.Auth(Restangular, $q);
        this.search = new _Service.Search(Restangular, $q);
        this.PropertyGroup = new _Service.PropertyGroup(Restangular, $q);
        this.document = new _Service.Document(Restangular, $q);
        this.relation = new _Service.Relation(Restangular, $q);
        this.repository = new _Service.Repository(Restangular, $q);
        this.folder = new _Service.Folder(Restangular, $q);
        this.property = new _Service.Property(Restangular, $q);
        this.workflow = new _Service.WorkFlow(Restangular, $q);
        this.note = new _Service.Note(Restangular, $q);
    }

    _createClass(SimpleService, [{
        key: 'auth',
        get: function get() {
            return this._auth;
        },
        set: function set(auth) {
            this._auth = auth;
        }
    }, {
        key: 'search',
        get: function get() {
            return this._search;
        },
        set: function set(search) {
            this._search = search;
        }
    }, {
        key: 'PropertyGroup',
        get: function get() {
            return this._PropertyGroup;
        },
        set: function set(PropertyGroup) {
            this._PropertyGroup = PropertyGroup;
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
        key: 'property',
        get: function get() {
            return this._property;
        },
        set: function set(property) {
            this._property = property;
        }
    }, {
        key: 'workflow',
        get: function get() {
            return this._workflow;
        },
        set: function set(workflow) {
            this._workflow = workflow;
        }
    }, {
        key: 'note',
        get: function get() {
            return this._note;
        },
        set: function set(note) {
            this._note = note;
        }
    }], [{
        key: 'SimpleServiceFactory',
        value: function SimpleServiceFactory(Restangular, $q) {
            'ngInject';

            return new SimpleService(Restangular, $q);
        }
    }]);

    return SimpleService;
}();

exports.default = SimpleService.SimpleServiceFactory;