'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require('./../../Class/Service/Service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardService = function () {
    function DashboardService(Restangular, $q) {
        _classCallCheck(this, DashboardService);

        this.auth = new _Service.Auth(Restangular, $q);
        this.dashboard = new _Service.Dashboard(Restangular, $q);
        this.document = new _Service.Document(Restangular, $q);
        this.workflow = new _Service.WorkFlow(Restangular, $q);
        this.bookmark = new _Service.Bookmark(Restangular, $q);
        this.folder = new _Service.Folder(Restangular, $q);
    }

    _createClass(DashboardService, [{
        key: 'auth',
        get: function get() {
            return this._auth;
        },
        set: function set(auth) {
            this._auth = auth;
        }
    }, {
        key: 'dashboard',
        get: function get() {
            return this._dashboard;
        },
        set: function set(dashboard) {
            this._dashboard = dashboard;
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
        key: 'workflow',
        get: function get() {
            return this._workflow;
        },
        set: function set(workflow) {
            this._workflow = workflow;
        }
    }, {
        key: 'bookmark',
        get: function get() {
            return this._bookmark;
        },
        set: function set(bookmark) {
            this._bookmark = bookmark;
        }
    }, {
        key: 'folder',
        get: function get() {
            return this._folder;
        },
        set: function set(folder) {
            this._folder = folder;
        }
    }], [{
        key: 'DashboardServiceFactory',
        value: function DashboardServiceFactory(Restangular, $q) {
            'ngInject';

            return new DashboardService(Restangular, $q);
        }
    }]);

    return DashboardService;
}();

exports.default = DashboardService.DashboardServiceFactory;