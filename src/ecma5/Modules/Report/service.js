'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./../../Class/Service/Service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReportService = function () {
    function ReportService(Restangular, $q) {
        _classCallCheck(this, ReportService);

        this.auth = new _Service.Auth(Restangular, $q);
        this.repository = new _Service.Repository(Restangular, $q);
        this.folder = new _Service.Folder(Restangular, $q);
        this.propertyGroup = new _Service.PropertyGroup(Restangular, $q);
        this.search = new _Service.Search(Restangular, $q);
        this.document = new _Service.Document(Restangular, $q);
        this.dashboard = new _Service.Dashboard(Restangular, $q);
    }

    _createClass(ReportService, [{
        key: 'auth',
        get: function get() {
            return this._auth;
        },
        set: function set(auth) {
            this._auth = auth;
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
        key: 'propertyGroup',
        get: function get() {
            return this._propertyGroup;
        },
        set: function set(propertyGroup) {
            this._propertyGroup = propertyGroup;
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
        key: 'document',
        get: function get() {
            return this._document;
        },
        set: function set(document) {
            this._document = document;
        }
    }, {
        key: 'dashboard',
        get: function get() {
            return this._dashboard;
        },
        set: function set(dashboard) {
            this._dashboard = dashboard;
        }
    }], [{
        key: 'ReportServiceFactory',
        value: function ReportServiceFactory(Restangular, $q) {
            'ngInject';

            return new ReportService(Restangular, $q);
        }
    }]);

    return ReportService;
}();

exports.default = ReportService.ReportServiceFactory;