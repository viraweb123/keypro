'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WorkFlow = exports.Search = exports.Stamp = exports.Property = exports.Relation = exports.Repository = exports.News = exports.Note = exports.Notification = exports.Map = exports.Login = exports.PropertyGroup = exports.Folder = exports.Document = exports.Dashboard = exports.Constants = exports.Convertor = exports.Bookmark = exports.Auth = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../Base64');
//var _Md5 = require('./../md5');

var _Base2 = _interopRequireDefault(_Base);
//var _Md52 = _interopRequireDefault(_Md5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REST = new WeakMap();
var Q = new WeakMap();

var RestService = function () {
    function RestService(Restangular, $q) {
        _classCallCheck(this, RestService);

        REST.set(this, Restangular);
        Q.set(this, $q);
        RestService.rest = Restangular;
    }

    _createClass(RestService, [{
        key: 'restRestAngular',
        value: function restRestAngular(item) {
            REST.get(this).setDefaultHeaders({
                Authorization: item,
                'Content-Type': 'application/json',
                Accept: 'application/json, text/plain, */*'
            });
        }
    }, {
        key: 'one',
        value: function one(path, uid) {

            return REST.get(this).one(path, uid).get().then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'allPost',
        value: function allPost(path, text, json) {
            return REST.get(this).all(path).post(text || undefined || '', json || undefined).then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'list',
        value: function list(path, id, parent, child) {
            return REST.get(this).all(path).customGET().then(function (response) {
                return {
                    data: response.data[parent] && response.data[parent][child] ? Array.isArray(response.data[parent][child]) ? response.data[parent][child] : [response.data[parent][child]] : null
                };
            });
        }
    }, {
        key: 'postJson',
        value: function postJson(path, json) {
            return REST.get(this).all(path).post(json).then(function (response) {
                return { data: response };
            });
        }
    }, {
        key: 'getAllCustomGet',
        value: function getAllCustomGet(path) {
            return REST.get(this).all(path).customGET().then(function (response) {
                return {
                    data: response.data || response
                };
            });
        }
    }, {
        key: 'getStreamFileWithHeader',
        value: function getStreamFileWithHeader(path, query) {
            return REST.get(this).all(path).customGET('', query, {
                'Content-Type': 'application/octet-stream',
                "Accept": "application/octet-stream"
            }).then(function (response) {
                return response.data;
            });
        }
    }, {
        key: 'put',
        value: function put(path, json) {
            //return REST.get(this).one(path).put(json).then(response => {
            //'Content-Type':'text/plain'
            //return REST.get(this).all(path).customPUT(json,'','',{'Content-Type' : 'application/json'  , 'Accept' : 'application/json' }).then((response) => {
            return REST.get(this).all(path).customPUT(json, '', '').then(function (response) {
                return {
                    data: response
                };
            });
        }
    }, {
        key: 'putQuery',
        value: function putQuery(path, json) {
            //return REST.get(this).one(path).put(json).then(response => {
            //'Content-Type':'text/plain'
            //return REST.get(this).all(path).customPUT(json,'','',{'Content-Type' : 'application/json'  , 'Accept' : 'application/json' }).then((response) => {
            return REST.get(this).one(path).put(json).then(function (response) {
                return {
                    data: response
                };
            });
        }
    }, {
        key: 'allCustomPut',
        value: function allCustomPut(path, text, json) {
            return REST.get(this).all(path).customPUT(text, '', json).then(function (response) {
                return {
                    data: response || true
                };
            });
        }
    }, {
        key: 'allCustomQueryPut',
        value: function allCustomQueryPut(path, text, json) {
            return REST.get(this).all(path).customPUT(text, '', json).then(function (response) {
                return {
                    data: response || true
                };
            });
        }
    }, {
        key: 'remove',
        value: function remove(path, json) {
            return REST.get(this).all(path).remove(undefined || json, {}).then(function (response) {
                return {
                    data: response
                };
            });
        }
    }, {
        key: 'post',
        value: function post(path) {
            return REST.get(this).all(path).post().then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'jsonPost',
        value: function jsonPost(path, json) {
            return REST.get(this).all(path, json).post().then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'getOne',
        value: function getOne(path, json) {
            return RestService.rest.one(path).get(json || undefined).then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'getOneWithHeader',
        value: function getOneWithHeader(path, json, header) {
            return REST.get(this).one(path).get(json || undefined, header).then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'jsonList',
        value: function jsonList(path, json, parent, child) {
            return REST.get(this).all(path).get('', json).then(function (response) {
                return {
                    data: response.data[parent] && response.data[parent][child] ? Array.isArray(response.data[parent][child]) ? response.data[parent][child] : [response.data[parent][child]] : null
                };
            });
        }
    }, {
        key: 'jsonListNotParent',
        value: function jsonListNotParent(path, json) {
            return REST.get(this).all(path).get('', json).then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'oneCustomPut',
        value: function oneCustomPut(path, text, json) {
            return REST.get(this).one(path).customPUT(text, '', json).then(function (response) {
                return {
                    data: response
                };
            });
        }
    }, {
        key: 'oneCustomPutWithHeader',
        value: function oneCustomPutWithHeader(path, text, header) {
            return REST.get(this).one(path).customPUT(text, '', '', header).then(function (response) {
                return {
                    data: response
                };
            });
        }
    }, {
        key: 'oneCustomPostWithHeader',
        value: function oneCustomPostWithHeader(path, text, header) {
            return REST.get(this).one(path).customPOST(text, '', '', header).then(function (response) {
                return {
                    data: response
                };
            });
        }
    }, {
        key: 'allGet',
        value: function allGet(path) {
            return REST.get(this).all(path).get('').then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'jsonLists',
        value: function jsonLists(path, parent, childs) {
            return REST.get(this).all(path).get('').then(function (response) {
                return {
                    data: {
                        list: response.data[parent] && response.data[parent][childs] ? Array.isArray(response.data[parent][childs]) ? response.data[parent][childs] : [response.data[parent][childs]] : null,
                        total: response.data[parent] && response.data[parent].total ? angular.isArray(response.data[parent].total) ? response.data[parent].total[0] : response.data[parent].total : -1
                    }
                };
            });
        }
    }, {
        key: 'jsonListsWithParams',
        value: function jsonListsWithParams(path, json, parent, child) {
            return REST.get(this).all(path).get('', json).then(function (response) {
                return {
                    data: {
                        list: response.data[parent] && response.data[parent][child] ? Array.isArray(response.data[parent][child]) ? response.data[parent][child] : [response.data[parent][child]] : null,
                        total: response.data[parent] && response.data[parent].total ? angular.isArray(response.data[parent].total) ? response.data[parent].total[0] : response.data[parent].total : -1
                    }
                };
            }, function (error) {
                return console.error("error ocure");
            }, function (progress) {});
        }
    }, {
        key: 'jsonListNotParentAndChilds',
        value: function jsonListNotParentAndChilds(path, json) {
            return REST.get(this).all(path).get('', json).then(function (response) {
                return {
                    data: response.data ? Array.isArray(response.data) ? response.data : [response.data] : null
                };
            });
        }
    }, {
        key: 'allCustomGET',
        value: function allCustomGET(path, parent, child) {
            return REST.get(this).all(path).customGET().then(function (response) {
                return {
                    data: response.data[parent] && response.data[parent][child] ? Array.isArray(response.data[parent][child]) ? response.data[parent][child] : [response.data[parent][child]] : Array.isArray(response.data) ? response.data : [response.data]
                };
            });
        }
    }, {
        key: 'allCustomQueryPut',
        value: function allCustomQueryPut(path) {
            return REST.get(this).all(path).customPUT().then(function (response) {
                return {
                    data: response || true
                };
            });
        }
    }, {
        key: 'allGetWithJson',
        value: function allGetWithJson(path, json) {
            return REST.get(this).all(path).get('', json).then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'oneGetWithParentChild',
        value: function oneGetWithParentChild(path, parent, child) {
            return REST.get(this).all(path).get('').then(function (response) {
                return {
                    data: response.data[parent] && response.data[parent][child] ? Array.isArray(response.data[parent][child]) ? response.data[parent][child] : [response.data[parent][child]] : null
                };
            });
        }
    }, {
        key: 'oneRemove',
        value: function oneRemove(path, id, json) {
            return REST.get(this).one(path, id).remove(json, { 'Content-Type': 'application/json' }).then(function (response) {
                return {
                    data: response
                };
            });
        }
    }, {
        key: 'allGetWithParent',
        value: function allGetWithParent(path, parent, child) {
            return REST.get(this).all(path).get('').then(function (response) {
                return {
                    data: response.data[parent] && response.data[parent][child] ? Array.isArray(response.data[parent][child]) ? response.data[parent][child] : [response.data[parent][child]] : null
                };
            });
        }
    }, {
        key: 'oneGetWithParent',
        value: function oneGetWithParent(path, json, parent, child) {
            return REST.get(this).one(path).get(json || '').then(function (response) {
                return {
                    data: response.data[parent] && response.data[parent][child] ? Array.isArray(response.data[parent][child]) ? response.data[parent][child] : [response.data[parent][child]] : null
                };
            });
        }
    }, {
        key: 'allCustomPostWithHeader',
        value: function allCustomPostWithHeader(path, text, header) {
            return REST.get(this).all(path).customPOST(text, '', '', header).then(function (response) {
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'allCustomGetWithHeader',
        value: function allCustomGetWithHeader(path, text, header) {
            return REST.get(this).all(path).customGET(text, '', '', header).then(function (response) {
                return response;
            });
        }
    }, {
        key: 'onePut',
        value: function onePut(path, json) {
            return REST.get(this).one(path).put(json).then(function (response) {
                return {
                    data: response.data || response
                };
            });
        }
    }], [{
        key: 'rest',
        set: function set(rest) {
            this._rest = rest;
        },
        get: function get() {
            return this._rest || null;
        }
    }]);

    return RestService;
}();

var Auth = exports.Auth = function (_RestService) {
    _inherits(Auth, _RestService);

    function Auth(Restangular, $q) {
        _classCallCheck(this, Auth);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Auth).call(this, Restangular, $q));

        _this.path = 'auth';
        return _this;
    }

    _createClass(Auth, [{
        key: 'changeRestangularItems',
        value: function changeRestangularItems(item) {
            _get(Object.getPrototypeOf(Auth.prototype), 'restRestAngular', this).call(this, item);
        }
    }, {
        key: 'listRole',
        value: function listRole(id) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'jsonList', this).call(this, 'auth/getGrantedRoles', { nodeId: id }, 'grantedRoles', 'grantedRole');
        }
    }, {
        key: 'listUser',
        value: function listUser(id) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'jsonList', this).call(this, 'auth/getGrantedUsers', { nodeId: id }, 'grantedUsers', 'grantedUser');
        }
    }, {
        key: 'currentUser',
        value: function currentUser() {
            return _get(Object.getPrototypeOf(Auth.prototype), 'getOne', this).call(this, 'auth/getCurrentUser');
        }
    }, {
        key: 'getUsers',
        value: function getUsers() {
            return _get(Object.getPrototypeOf(Auth.prototype), 'jsonLists', this).call(this, 'auth/getUsers', 'users', 'user');
            //return super.getOne(`${this.path}/getUsers`);
        }
    }, {
        key: 'grantRevokeUser',
        value: function grantRevokeUser(id, user, per, rec) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'oneCustomPutWithHeader', this).call(this, 'auth/grantRevokeUser', 'nodeId=' + id + '&user=' + user + '&permissions=' + per + '&recursive=' + rec, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'getRolesByUser',
        value: function getRolesByUser(user) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'jsonLists', this).call(this, 'auth/getRolesByUser/' + user, 'roles', 'role');
        }
    }, {
        key: 'getRoles',
        value: function getRoles() {
            return _get(Object.getPrototypeOf(Auth.prototype), 'getOne', this).call(this, 'auth/getRoles');
        }
    }, {
        key: 'grantRevokeRole',
        value: function grantRevokeRole(id, role, per, rec) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'oneCustomPutWithHeader', this).call(this, 'auth/grantRevokeRole', 'nodeId=' + id + '&role=' + role + '&permissions=' + per + '&recursive=' + rec, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'getUserWithRole',
        value: function getUserWithRole() {
            return _get(Object.getPrototypeOf(Auth.prototype), 'getOne', this).call(this, 'auth/getUsersWithRole');
        }
    }, {
        key: 'updateUser',
        value: function updateUser(query) {
            //`users=${users.username}&password=${users.pass}&email=${users.email}&name=${users.name}&active=${users.active}`

            return _get(Object.getPrototypeOf(Auth.prototype), 'oneCustomPutWithHeader', this).call(this, 'auth/updateUser', query, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'assignRole',
        value: function assignRole(user, role) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'oneCustomPutWithHeader', this).call(this, 'auth/assignRole', 'user=' + user + '&role=' + role, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'removeRole',
        value: function removeRole(user, role) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'oneCustomPutWithHeader', this).call(this, 'auth/removeRole', 'user=' + user + '&role=' + role, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'deleteUser',
        value: function deleteUser(user) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'remove', this).call(this, 'auth/deleteUser', { user: user });
        }
    }, {
        key: 'createRole',
        value: function createRole(role, active) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'allCustomPostWithHeader', this).call(this, 'auth/createRole', 'role=' + role + '&active=' + active, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'updateRole',
        value: function updateRole(role, active) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'oneCustomPutWithHeader', this).call(this, 'auth/updateRole', 'role=' + role + '&active=' + active, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'deleteRole',
        value: function deleteRole(role) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'remove', this).call(this, 'auth/deleteRole', { role: role });
        }
    }, {
        key: 'login',
        value: function login(name, pass) {
            var encode = _Base2.default.encode(name + ':' + md5(pass));
            return _get(Object.getPrototypeOf(Auth.prototype), 'allPost', this).call(this, 'auth/login', 'authId=' + encode).then(function (response) {
                return {
                    data: response.data.originalElement || response.data
                };
            });
        }
    }, {
        key: 'addGrantRevokeRoleForProps',
        value: function addGrantRevokeRoleForProps(query) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'oneCustomPutWithHeader', this).call(this, this.path + '/addGrantRevokeUserRoleForProps', query, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'getUserProfile',
        value: function getUserProfile() {
            return _get(Object.getPrototypeOf(Auth.prototype), 'getOne', this).call(this, 'auth/getUserProfile');
        }
    }, {
        key: 'getUserImage',
        value: function getUserImage(id) {
            return _get(Object.getPrototypeOf(Auth.prototype), 'getOne', this).call(this, 'auth/getUserImage', { user: id });
        }
    }, {
        key: 'getAllRoleForProps',
        value: function getAllRoleForProps() {
            return _get(Object.getPrototypeOf(Auth.prototype), 'allGet', this).call(this, 'auth/getAllRoleForProps');
        }
    }, {
        key: 'getAllUserRoleForProps',
        value: function getAllUserRoleForProps() {
            return _get(Object.getPrototypeOf(Auth.prototype), 'allGet', this).call(this, 'auth/getAllUserRoleForProps');
        }
    }, {
        key: 'getAllUserRoleForPropsWithFilter',
        value: function getAllUserRoleForPropsWithFilter(query) {
            query = query.replace(/\+/g, '%2B').replace(/\-/g, '%2D').replace(/\'/g, '%27').replace(/\"/g, '%22').replace(/\*/g, '%2A').replace(/\?/g, '%3F').replace(/\//g, '%2F').replace(/\:/g, '%3A').replace(/\$/g, '%24');
            return _get(Object.getPrototypeOf(Auth.prototype), 'allGet', this).call(this, 'auth/getAllUserRoleForPropsWithFilter?' + query);
        }
    }, {
        key: 'deleteUserRoleForProps',
        value: function deleteUserRoleForProps(id, permanent) {

            return _get(Object.getPrototypeOf(Auth.prototype), 'oneCustomPutWithHeader', this).call(this, 'auth/removeUserRoleForProps', 'id=' + id + '&permanent=' + permanent, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'getProfilesName',
        value: function getProfilesName() {
            return _get(Object.getPrototypeOf(Auth.prototype), 'allGet', this).call(this, this.path + '/getProfilesName');
        }
    }, {
        key: 'path',
        set: function set(path) {
            this._path = path;
        },
        get: function get() {
            return this._path || null;
        }
    }], [{
        key: 'authFactory',
        value: function authFactory(Restangular, $q) {

            return new auth(Restangular, $q);
        }
    }, {
        key: 'rest',
        set: function set(rest) {
            this._rest = rest;
        },
        get: function get() {
            return this._rest || null;
        }
    }]);

    return Auth;
}(RestService);

var Bookmark = exports.Bookmark = function (_RestService2) {
    _inherits(Bookmark, _RestService2);

    function Bookmark(Restangular, $q) {
        _classCallCheck(this, Bookmark);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Bookmark).call(this, Restangular, $q));

        _this2.path = 'bookmark';
        return _this2;
    }

    _createClass(Bookmark, [{
        key: 'editOrCreateBookmark',
        value: function editOrCreateBookmark(query, type) {

            query = query.replace(/\+/g, '%2B').replace(/\-/g, '%2D').replace(/\'/g, '%27').replace(/\"/g, '%22').replace(/\*/g, '%2A').replace(/\?/g, '%3F').replace(/\//g, '%2F').replace(/\:/g, '%3A').replace(/\$/g, '%24');

            return _get(Object.getPrototypeOf(Bookmark.prototype), 'oneCustomPostWithHeader', this).call(this, this.path + '/' + type, query, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'getList',
        value: function getList() {
            return _get(Object.getPrototypeOf(Bookmark.prototype), 'getAllCustomGet', this).call(this, this.path + '/getAll');
        }
    }, {
        key: 'remove',
        value: function remove(bookmarkID) {
            return _get(Object.getPrototypeOf(Bookmark.prototype), 'remove', this).call(this, this.path + '/remove', { bmId: bookmarkID });
        }
    }]);

    return Bookmark;
}(RestService);

var Convertor = exports.Convertor = function (_RestService3) {
    _inherits(Convertor, _RestService3);

    function Convertor(Restangular, $q) {
        _classCallCheck(this, Convertor);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Convertor).call(this, Restangular, $q));

        _this3.path = 'convertor';
        return _this3;
    }

    _createClass(Convertor, [{
        key: 'toPdf',
        value: function toPdf(docId) {
            return _get(Object.getPrototypeOf(Convertor.prototype), 'jsonListNotParentAndChilds', this).call(this, this.path + '/topdf', { uuid: docId });
        }
    }, {
        key: 'toSwf',
        value: function toSwf(docId) {
            return _get(Object.getPrototypeOf(Convertor.prototype), 'jsonListNotParentAndChilds', this).call(this, this.path + '/toswf', { uuid: docId });
        }
    }, {
        key: 'toMedia',
        value: function toMedia(docId) {
            return _get(Object.getPrototypeOf(Convertor.prototype), 'jsonListNotParentAndChilds', this).call(this, '../../frontend/Download', { uuid: docId });
        }
    }]);

    return Convertor;
}(RestService);

var Constants = exports.Constants = function (_RestService4) {
    _inherits(Constants, _RestService4);

    function Constants(Restangular, $q) {
        _classCallCheck(this, Constants);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Constants).call(this, Restangular, $q));

        _this4.path = 'property';
        return _this4;
    }

    _createClass(Constants, [{
        key: 'getConst',
        value: function getConst(type) {
            return _get(Object.getPrototypeOf(Constants.prototype), 'jsonListNotParentAndChilds', this).call(this, this.path + '/getTranslations', { langId: type });
        }
    }]);

    return Constants;
}(RestService);

var Dashboard = exports.Dashboard = function (_RestService5) {
    _inherits(Dashboard, _RestService5);

    function Dashboard(Restangular, $q) {
        _classCallCheck(this, Dashboard);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).call(this, Restangular, $q));

        _this5.path = 'dashboard';
        return _this5;
    }

    _createClass(Dashboard, [{
        key: 'getList',
        value: function getList(path) {
            return _get(Object.getPrototypeOf(Dashboard.prototype), 'getAllCustomGet', this).call(this, this.path + '/' + path);
        }
    }, {
        key: 'getOne',
        value: function getOne(path) {
            return _get(Object.getPrototypeOf(Dashboard.prototype), 'getOne', this).call(this, this.path + '/' + path);
        }
    }, {
        key: 'executeReport',
        value: function executeReport(query) {
            return _get(Object.getPrototypeOf(Dashboard.prototype), 'getOne', this).call(this, this.path + '/executeReport?' + query);
        }
    }]);

    return Dashboard;
}(RestService);

var Document = exports.Document = function (_RestService6) {
    _inherits(Document, _RestService6);

    function Document(Restangular, $q) {
        _classCallCheck(this, Document);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(Document).call(this, Restangular, $q));

        _this6.path = 'document';
        return _this6;
    }

    _createClass(Document, [{
        key: 'stampOnDocument',
        value: function stampOnDocument(query) {
            return _get(Object.getPrototypeOf(Document.prototype), 'oneCustomPostWithHeader', this).call(this, this.path + '/stampOnDocument', query, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'getSignedDoc',
        value: function getSignedDoc(docID) {
            //return super.getAllCustomGet(`${this.path}/isSignedDocument?docId=${docID}`);
            return _get(Object.getPrototypeOf(Document.prototype), 'allCustomGetWithHeader', this).call(this, this.path + '/isSignedDocument?docId=' + docID, '', { 'Accept': 'text/plain', 'Content-Type': 'text/plain; charset=UTF-8' });
        }
    }, {
        key: 'remove',
        value: function remove(docID) {
            return _get(Object.getPrototypeOf(Document.prototype), 'remove', this).call(this, this.path + '/delete', { docId: docID });
        }
    }, {
        key: 'listChild',
        value: function listChild(id) {
            return _get(Object.getPrototypeOf(Document.prototype), 'jsonList', this).call(this, this.path + '/getChildren', { fldId: id }, 'documents', 'document');
        }
    }, {
        key: 'sectionChild',
        value: function sectionChild(id, offset, limit) {
            return _get(Object.getPrototypeOf(Document.prototype), 'jsonList', this).call(this, this.path + '/getChildren', { fldId: id, offset: offset, limit: limit }, 'documents', 'document');
        }
    }, {
        key: 'cut',
        value: function cut(sourceID, destID) {
            return _get(Object.getPrototypeOf(Document.prototype), 'putQuery', this).call(this, this.path + '/move', { docId: sourceID, dstId: destID });
        }
    }, {
        key: 'copy',
        value: function copy(sourceID, destID) {
            return _get(Object.getPrototypeOf(Document.prototype), 'putQuery', this).call(this, this.path + '/copy', { docId: sourceID, dstId: destID });
        }
    }, {
        key: 'getProperties',
        value: function getProperties(id) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allGetWithJson', this).call(this, this.path + '/getProperties', { docId: id });
        }
    }, {
        key: 'thumbnail',
        value: function thumbnail(obj, width, height) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allGetWithJson', this).call(this, this.path + '/getThumbnail', { docId: obj.uuid, height: height, width: width });
        }
    }, {
        key: 'checkin',
        value: function checkin($frmData) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allPost', this).call(this, this.path + '/checkin', { data: $frmData });
        }
    }, {
        key: 'checkout',
        value: function checkout(docID) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allGetWithJson', this).call(this, this.path + '/checkout', { docId: docID });
        }
    }, {
        key: 'cancelEdit',
        value: function cancelEdit(docID) {
            return _get(Object.getPrototypeOf(Document.prototype), 'putQuery', this).call(this, this.path + '/cancelCheckout?docId=' + docID);
        }
    }, {
        key: 'locked',
        value: function locked(docID) {
            return _get(Object.getPrototypeOf(Document.prototype), 'put', this).call(this, this.path + '/lock?docId=' + docID);
        }
    }, {
        key: 'unLocked',
        value: function unLocked(docID) {
            return _get(Object.getPrototypeOf(Document.prototype), 'put', this).call(this, this.path + '/unlock?docId=' + docID);
        }
    }, {
        key: 'forceUnLocked',
        value: function forceUnLocked(docID) {
            return _get(Object.getPrototypeOf(Document.prototype), 'put', this).call(this, this.path + '/forceUnlock?docId=' + docID);
        }
    }, {
        key: 'rename',
        value: function rename(id, newName) {
            return _get(Object.getPrototypeOf(Document.prototype), 'putQuery', this).call(this, this.path + '/rename', { docId: id, newName: newName });
        }
    }, {
        key: 'getPath',
        value: function getPath(uid) {
            return _get(Object.getPrototypeOf(Document.prototype), 'one', this).call(this, this.path + '/getPath', uid);
        }
    }, {
        key: 'create',
        value: function create(path) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allPost', this).call(this, this.path + '/createSimple', path);
        }
    }, {
        key: 'isCheckedOut',
        value: function isCheckedOut(id) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allGetWithJson', this).call(this, this.path + '/isCheckedOut', { docId: id });
        }
    }, {
        key: 'purgeDoc',
        value: function purgeDoc(id) {
            return _get(Object.getPrototypeOf(Document.prototype), 'putQuery', this).call(this, this.path + '/purge', { docId: id });
        }
    }, {
        key: 'listVersion',
        value: function listVersion(id) {
            return _get(Object.getPrototypeOf(Document.prototype), 'jsonList', this).call(this, this.path + '/getVersionHistory', { docId: id }, 'versions', 'version');
        }
    }, {
        key: 'restoreVersion',
        value: function restoreVersion(id, versionId) {
            return _get(Object.getPrototypeOf(Document.prototype), 'putQuery', this).call(this, this.path + '/restoreVersion', { docId: id, versionId: versionId });
        }
    }, {
        key: 'getContent',
        value: function getContent(docId, fileName) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allGetWithJson', this).call(this, this.path + '/getContent', { docId: docId }).then(function (response) {

                if (!fileName in [null, "", undefined]) {
                    var link = document.createElement("a");
                    link.href = 'data:,' + response.data;
                    link.style = "visibility:hidden";
                    link.name = "key_downloadLink";
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                return {
                    data: response.data
                };
            });
        }
    }, {
        key: 'getContentWithAuth',
        value: function getContentWithAuth(id) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allGetWithJson', this).call(this, this.path + '/getContent?docId=' + id + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')), {}).then(function (response) {
                return {
                    data: 'data:,' + response.data
                };
            });
        }
    }, {
        key: 'getFile',
        value: function getFile(docId) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allGetWithJson', this).call(this, this.path + '/getContent', { docId: docId });
        }
    }, {
        key: 'purgeDocument',
        value: function purgeDocument(docID) {
            return _get(Object.getPrototypeOf(Document.prototype), 'putQuery', this).call(this, this.path + '/purgeVersionHistory', { docId: docID });
        }
        /*
         TODO video tag all services
         */

    }, {
        key: 'removeMediaTag',
        value: function removeMediaTag(id) {
            return _get(Object.getPrototypeOf(Document.prototype), 'remove', this).call(this, this.path + '/removeMediaTag', { id: id, uuid: 0 });
        }
    }, {
        key: 'removeAllMediaTag',
        value: function removeAllMediaTag(id) {
            return _get(Object.getPrototypeOf(Document.prototype), 'remove', this).call(this, this.path + '/removeMediaTag', { id: 0, uuid: id });
        }
    }, {
        key: 'getMediaTags',
        value: function getMediaTags(guid) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allGet', this).call(this, this.path + '/getTagsMedia?uuid=' + guid + '&' + Date.parse(new Date()));
        }
    }, {
        key: 'createMediaTag',
        value: function createMediaTag(query) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allCustomPostWithHeader', this).call(this, this.path + '/createMediaTag', query, { 'Content-Type': 'application/x-www-form-urlencoded' });
            //return super.postJson(`${this.path}/createMediaTag`,json);
            //return super.putQuery(`${this.path}/createMediaTag?${query}`)
        }
    }, {
        key: 'getMediaTagThumbnail',
        value: function getMediaTagThumbnail(id) {
            return _get(Object.getPrototypeOf(Document.prototype), 'allGetWithJson', this).call(this, this.path + '/getTagMediaThumbnail', { id: id });
        }
    }, {
        key: 'createFromTemplate',
        value: function createFromTemplate(query) {
            return _get(Object.getPrototypeOf(Document.prototype), 'oneCustomPostWithHeader', this).call(this, this.path + '/createFromTemplate', query, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }]);

    return Document;
}(RestService);

var Folder = exports.Folder = function (_RestService7) {
    _inherits(Folder, _RestService7);

    function Folder(Restangular, $q) {
        _classCallCheck(this, Folder);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Folder).call(this, Restangular, $q));

        _this7.path = 'folder';
        return _this7;
    }

    _createClass(Folder, [{
        key: 'getPath',
        value: function getPath(uid) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'one', this).call(this, this.path + '/getPath', uid);
        }
    }, {
        key: 'create',
        value: function create(path) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'allPost', this).call(this, this.path + '/createSimple', path);
        }
    }, {
        key: 'listChild',
        value: function listChild(id) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'allCustomGET', this).call(this, this.path + '/getChildren?fldId=' + id, 'folders', 'folder');
        }
    }, {
        key: 'sectionChild',
        value: function sectionChild(id, offset, limit) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'allCustomGET', this).call(this, this.path + '/getChildren?fldId=' + id + '&offset=' + offset + '&limit=' + limit, 'folders', 'folder');
        }
    }, {
        key: 'copy',
        value: function copy(sourceID, destID) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'putQuery', this).call(this, this.path + '/copy', { fldId: sourceID, dstId: destID });
        }
    }, {
        key: 'cut',
        value: function cut(sourceID, destID) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'putQuery', this).call(this, this.path + '/move', { fldId: sourceID, dstId: destID });
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'remove', this).call(this, this.path + '/delete', { fldId: id });
        }
    }, {
        key: 'purge',
        value: function purge(id) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'remove', this).call(this, this.path + '/purge', { fldId: id });
        }
    }, {
        key: 'rename',
        value: function rename(id, newName) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'putQuery', this).call(this, this.path + '/rename', { fldId: id, newName: newName });
        }
    }, {
        key: 'getProperties',
        value: function getProperties(id) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'getOne', this).call(this, this.path + '/getProperties', { fldId: id });
        }
        /*addCategoty(nodId,catId){
            return super.allPost(`${this.path}/add?nodeId=${nodId}&catId="${catId}`);
        }*/

    }, {
        key: 'getAbstractPaths',
        value: function getAbstractPaths(path) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'getAllCustomGet', this).call(this, this.path + '/getUuids?fldPath=' + path);
        }
    }, {
        key: 'createWithPropertyGroup',
        value: function createWithPropertyGroup(grpName, text) {
            return _get(Object.getPrototypeOf(Folder.prototype), 'allCustomPut', this).call(this, this.path + '/createWithPropertyGroup', text, { grpName: grpName });
        }
    }]);

    return Folder;
}(RestService);

var PropertyGroup = exports.PropertyGroup = function (_RestService8) {
    _inherits(PropertyGroup, _RestService8);

    function PropertyGroup(Restangular, $q) {
        _classCallCheck(this, PropertyGroup);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(PropertyGroup).call(this, Restangular, $q));

        _this8.path = 'propertyGroup';
        return _this8;
    }

    _createClass(PropertyGroup, [{
        key: 'getTreeAllRoot',
        value: function getTreeAllRoot() {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'getAllCustomGet', this).call(this, this.path + '/getPropertyTreeAllRoot');
        }
    }, {
        key: 'getAllRelationSelect',
        value: function getAllRelationSelect(grpName) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'allGetWithJson', this).call(this, this.path + '/getAllRelationSelect', { grpName: grpName });
        }
    }, {
        key: 'deleteRelationSelect',
        value: function deleteRelationSelect(relationId) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'remove', this).call(this, this.path + '/deleteRelationSelect', { relationId: relationId });
        }
    }, {
        key: 'manageRelationSelect',
        value: function manageRelationSelect(query) {
            /*{
             relationId ,
             grpName ,
             parentSelect ,
             childSelect
             }*/

            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'oneCustomPutWithHeader', this).call(this, this.path + '/manageRelationSelect', query, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'getTreeRoot',
        value: function getTreeRoot(query) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'getAllCustomGet', this).call(this, this.path + '/getPropertyTreeRoot?' + query);
        }
    }, {
        key: 'getTree',
        value: function getTree(propertyQuery) {

            /* TODO
             use this to convert list parents to query in desktop controller
             var queryPath = [{prop1 : 'روزنامه رسمی'},{prop2 : '2'}]
             var propertyQuery = queryPath.map(path => `property = ${Object.keys(path)[0]} = ${path[Object.keys(path)[0]]}` ).join('&')
             "property = a = 1&property = b = 2&property = c = 3"
             */
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'getAllCustomGet', this).call(this, this.path + '/getPropertyTree?' + propertyQuery);
        }
    }, {
        key: 'forId',
        value: function forId(gName, id) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'jsonListNotParentAndChilds', this).call(this, this.path + '/getPropertiesForIds', { nodeId: id, grpName: gName });
        }
    }, {
        key: 'listGroup',
        value: function listGroup(id) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'jsonListsWithParams', this).call(this, this.path + '/getGroups', { nodeId: id }, 'propertyGroups', 'propertyGroup');
        }
    }, {
        key: 'create',
        value: function create(id, gName) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'allGetWithJson', this).call(this, this.path + '/setProperties', { nodeId: id, grpName: gName });
        }
    }, {
        key: 'form',
        value: function form(pg) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'allGetWithJson', this).call(this, this.path + '/getPropertyGroupForm', { grpName: pg.name }).then(function (response) {
                return {
                    data: {
                        name: pg.name || null,
                        label: pg.label || null,
                        properties: response.data.formElementsComplex && response.data.formElementsComplex.formElementComplex ? angular.isArray(response.data.formElementsComplex.formElementComplex) ? response.data.formElementsComplex.formElementComplex : [response.data.formElementsComplex.formElementComplex] : null
                    }
                };
            });
        }
    }, {
        key: 'createDefinition',
        value: function createDefinition(json) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'put', this).call(this, this.path + '/setDefinition', json);
        }
    }, {
        key: 'formElement',
        value: function formElement(id, pg, text) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'allCustomPut', this).call(this, this.path + '/setProperties', text, { nodeId: id, grpName: pg });
        }
    }, {
        key: 'listDefinition',
        value: function listDefinition() {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'allGet', this).call(this, this.path + '/getDefinition');
        }
    }, {
        key: 'list',
        value: function list() {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'allGetWithParent', this).call(this, this.path + '/getAllGroups', 'propertyGroups', 'propertyGroup');
        }
    }, {
        key: 'getGroups',
        value: function getGroups(nodeId, pgName) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'allGetWithJson', this).call(this, this.path + '/getProperties', { nodeId: nodeId, grpName: pgName.name }).then(function (response) {
                var result = {};
                result.name = pgName.name;
                result.label = pgName.label;
                result.properties = response.data.formElementsComplex && response.data.formElementsComplex.formElementComplex ? angular.isArray(response.data.formElementsComplex.formElementComplex) ? response.data.formElementsComplex.formElementComplex : [response.data.formElementsComplex.formElementComplex] : null;
                return { data: result };
            });
        }
    }, {
        key: 'remove',
        value: function remove(path, gName) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'remove', this).call(this, this.path + '/removeGroup', { nodeId: path, grpName: gName });
        }
    }, {
        key: 'manageGetAllPropertyTree',
        value: function manageGetAllPropertyTree() {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'getAllCustomGet', this).call(this, this.path + '/manageGetAllPropertyTree');
        }
    }, {
        key: 'manageSetPropertyTree',
        value: function manageSetPropertyTree(query) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'oneCustomPutWithHeader', this).call(this, this.path + '/manageSetPropertyTree', query, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'manageRemovePropertyTree',
        value: function manageRemovePropertyTree(treeId) {
            return _get(Object.getPrototypeOf(PropertyGroup.prototype), 'remove', this).call(this, this.path + '/manageRemovePropertyTree', { treeId: treeId });
        }
    }]);

    return PropertyGroup;
}(RestService);

var Login = exports.Login = function (_RestService9) {
    _inherits(Login, _RestService9);

    function Login(Restangular, $q) {
        _classCallCheck(this, Login);

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, Restangular, $q));

        _this9.path = 'auth';
        return _this9;
    }

    _createClass(Login, [{
        key: 'isLogin',
        value: function isLogin() {
            return _get(Object.getPrototypeOf(Login.prototype), 'allPost', this).call(this, this.path + '/isLogin', {}, {});
        }
    }, {
        key: 'save',
        value: function save(params) {
            return _get(Object.getPrototypeOf(Login.prototype), 'allPost', this).call(this, this.path + '/saveSearch', params);
        }
    }, {
        key: 'getToken',
        value: function getToken(user, password) {
            return _get(Object.getPrototypeOf(Login.prototype), 'jsonListNotParentAndChilds', this).call(this, '../OKMAuth/login', { user: user, password: password });
        }
    }]);

    return Login;
}(RestService);

var Map = exports.Map = function (_RestService10) {
    _inherits(Map, _RestService10);

    function Map(Restangular, $q) {
        _classCallCheck(this, Map);

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(Map).call(this, Restangular, $q));

        _this10.path = 'map';
        return _this10;
    }

    _createClass(Map, [{
        key: 'setMapSection',
        value: function setMapSection(query) {
            return _get(Object.getPrototypeOf(Map.prototype), 'allCustomPostWithHeader', this).call(this, this.path + '/setMapSection', query, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'getMapSections',
        value: function getMapSections(mapId) {
            return _get(Object.getPrototypeOf(Map.prototype), 'getAllCustomGet', this).call(this, this.path + '/getMapSections?mapId=' + mapId);
        }
    }, {
        key: 'getMaps',
        value: function getMaps() {
            return _get(Object.getPrototypeOf(Map.prototype), 'getAllCustomGet', this).call(this, this.path + '/getMaps');
        }
    }, {
        key: 'getMap',
        value: function getMap(id) {
            return _get(Object.getPrototypeOf(Map.prototype), 'getAllCustomGet', this).call(this, this.path + '/getSection?sectionId=' + id);
        }
    }, {
        key: 'removeMap',
        value: function removeMap(id) {
            return _get(Object.getPrototypeOf(Map.prototype), 'allCustomPut', this).call(this, this.path + '/removeMapSection?mapId=' + id, null, null);
        }
    }]);

    return Map;
}(RestService);

var Notification = exports.Notification = function (_RestService11) {
    _inherits(Notification, _RestService11);

    function Notification(Restangular, $q) {
        _classCallCheck(this, Notification);

        var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(Notification).call(this, Restangular, $q));

        _this11.path = 'notification';

        return _this11;
    }

    _createClass(Notification, [{
        key: 'subscribe',
        value: function subscribe(nodePath) {
            return _get(Object.getPrototypeOf(Notification.prototype), 'oneCustomPostWithHeader', this).call(this, this.path + '/subscribe', 'nodePath=' + nodePath, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }, {
        key: 'unSubscribe',
        value: function unSubscribe(nodePath) {
            return _get(Object.getPrototypeOf(Notification.prototype), 'oneCustomPostWithHeader', this).call(this, this.path + '/unsubscribe', 'nodePath=' + nodePath, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }]);

    return Notification;
}(RestService);

var Note = exports.Note = function (_RestService12) {
    _inherits(Note, _RestService12);

    function Note(Restangular, $q) {
        _classCallCheck(this, Note);

        var _this12 = _possibleConstructorReturn(this, Object.getPrototypeOf(Note).call(this, Restangular, $q));

        _this12.path = 'note';

        return _this12;
    }

    _createClass(Note, [{
        key: 'list',
        value: function list(id) {
            return _get(Object.getPrototypeOf(Note.prototype), 'jsonListsWithParams', this).call(this, this.path + '/list', { nodeId: id }, 'noteList', 'note');
        }
    }, {
        key: 'create',
        value: function create(id, text) {
            return _get(Object.getPrototypeOf(Note.prototype), 'allPost', this).call(this, this.path + '/add?nodeId=' + id, text);
        }
    }, {
        key: 'edit',
        value: function edit(path, text) {
            return _get(Object.getPrototypeOf(Note.prototype), 'oneCustomPut', this).call(this, this.path + '/set', text, { noteId: path });
        }
    }, {
        key: 'delete',
        value: function _delete(path) {
            return _get(Object.getPrototypeOf(Note.prototype), 'remove', this).call(this, this.path + '/delete', { noteId: path });
        }
    }]);

    return Note;
}(RestService);

var News = exports.News = function (_RestService13) {
    _inherits(News, _RestService13);

    function News(Restangular, $q) {
        _classCallCheck(this, News);

        var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(News).call(this, Restangular, $q));

        _this13.path = 'news';
        return _this13;
    }

    _createClass(News, [{
        key: 'list',
        value: function list(id) {
            return _get(Object.getPrototypeOf(News.prototype), 'allGet', this).call(this, this.path + '/getAllNews');
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            return _get(Object.getPrototypeOf(News.prototype), 'oneRemove', this).call(this, this.path + '/deleteNews/', {}, id);
        }
    }, {
        key: 'save',
        value: function save(params) {
            return _get(Object.getPrototypeOf(News.prototype), 'allPost', this).call(this, this.path + '/saveSearch', params);
        }
    }]);

    return News;
}(RestService);

var Repository = exports.Repository = function (_RestService14) {
    _inherits(Repository, _RestService14);

    function Repository(Restangular, $q) {
        _classCallCheck(this, Repository);

        var _this14 = _possibleConstructorReturn(this, Object.getPrototypeOf(Repository).call(this, Restangular, $q));

        _this14.path = 'repository';

        return _this14;
    }

    _createClass(Repository, [{
        key: 'getRoot',
        value: function getRoot(root) {
            return _get(Object.getPrototypeOf(Repository.prototype), 'getOne', this).call(this, this.path + '/' + root).then(function (response) {
                return {
                    data: response.data.folder ? [{
                        permissions: response.data.folder.permissions,
                        label: response.data.folder.path,
                        path: response.data.folder.path,
                        hasChildrenFolder: response.data.folder.hasChildren || false,
                        id: response.data.folder.uuid,
                        collapsed: true,
                        root: true,
                        children: []
                    }] : null
                };
            });
        }
    }, {
        key: 'nodePath',
        value: function nodePath(id) {
            return _get(Object.getPrototypeOf(Repository.prototype), 'one', this).call(this, this.path + '/getNodePath', id);
        }
    }, {
        key: 'purgeTrash',
        value: function purgeTrash() {
            return _get(Object.getPrototypeOf(Repository.prototype), 'remove', this).call(this, this.path + '/purgeTrash');
        }
    }, {
        key: 'getCountChildren',
        value: function getCountChildren(id) {
            return _get(Object.getPrototypeOf(Repository.prototype), 'one', this).call(this, this.path + '/getCountChildren?uuid=' + id);
        }
    }, {
        key: 'getUpdateMessage',
        value: function getUpdateMessage() {
            return _get(Object.getPrototypeOf(Repository.prototype), 'one', this).call(this, this.path + '/getUpdateMessage');
        }
    }]);

    return Repository;
}(RestService);

var Relation = exports.Relation = function (_RestService15) {
    _inherits(Relation, _RestService15);

    function Relation(Restangular, $q) {
        _classCallCheck(this, Relation);

        var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(Relation).call(this, Restangular, $q));

        _this15.path = 'documentRelationDefinition';
        return _this15;
    }

    _createClass(Relation, [{
        key: 'listDefinition',
        value: function listDefinition() {
            return _get(Object.getPrototypeOf(Relation.prototype), 'oneGetWithParent', this).call(this, this.path + '/getAllDefinition', '', 'DocRelationDefs', 'DocRelationDef');
        }
    }, {
        key: 'create',
        value: function create(sourceID, destID, relationDefinitionId) {
            return _get(Object.getPrototypeOf(Relation.prototype), 'putQuery', this).call(this, 'documentRelation/createRelation', { sourceUuid: sourceID, destUuid: destID, relationDefinitionId: relationDefinitionId });
        }
    }, {
        key: 'ListRelation',
        value: function ListRelation(uuid, depth) {
            return _get(Object.getPrototypeOf(Relation.prototype), 'oneGetWithParent', this).call(this, 'documentRelation/getAllRelation', { uuid: uuid, depth: depth }, 'DocumentRelations', 'DocumentRelation');
        }
    }, {
        key: 'remove',
        value: function remove($sourceUuid, $destUuid, $relationDefinitionId) {
            return _get(Object.getPrototypeOf(Relation.prototype), 'remove', this).call(this, 'documentRelation/deleteRelation', { sourceUuid: $sourceUuid, destUuid: $destUuid, relationDefinitionId: $relationDefinitionId });
        }
    }, {
        key: 'createRelationDefinition',
        value: function createRelationDefinition(title, titleA2B, titleB2A, description, relationType) {

            return _get(Object.getPrototypeOf(Relation.prototype), 'onePut', this).call(this, this.path + '/createDefinition', { title: title, titleA2B: titleA2B, titleB2A: titleB2A, description: description, relationType: relationType });
        }
    }, {
        key: 'deleteRelationDefinition',
        value: function deleteRelationDefinition(id) {
            return _get(Object.getPrototypeOf(Relation.prototype), 'remove', this).call(this, this.path + '/delete', { id: id });
        }
    }, {
        key: 'updateRelationDefinition',
        value: function updateRelationDefinition(id, title, titleA2B, titleB2A, description) {

            return _get(Object.getPrototypeOf(Relation.prototype), 'onePut', this).call(this, this.path + '/update', { id: id, title: title, titleA2B: titleA2B, titleB2A: titleB2A, description: description });
        }
    }, {
        key: 'createRelations',
        value: function createRelations(query) {
            return _get(Object.getPrototypeOf(Relation.prototype), 'allCustomPostWithHeader', this).call(this, 'documentRelation/createRelations', query, { 'Content-Type': 'application/x-www-form-urlencoded' });
        }
    }]);

    return Relation;
}(RestService);

var Property = exports.Property = function (_RestService16) {
    _inherits(Property, _RestService16);

    function Property(Restangular, $q) {
        _classCallCheck(this, Property);

        var _this16 = _possibleConstructorReturn(this, Object.getPrototypeOf(Property).call(this, Restangular, $q));

        _this16.path = 'property';
        return _this16;
    }

    _createClass(Property, [{
        key: 'addKeyword',
        value: function addKeyword(nodeId, keyword) {
            return _get(Object.getPrototypeOf(Property.prototype), 'allPost', this).call(this, this.path + '/addKeyword', null, { nodeId: nodeId, keyword: keyword });
        }
    }, {
        key: 'removeKeyword',
        value: function removeKeyword(nodeId, keyword) {
            return _get(Object.getPrototypeOf(Property.prototype), 'remove', this).call(this, this.path + '/removeKeyword', { nodeId: nodeId, keyword: keyword });
        }
    }, {
        key: 'addCategory',
        value: function addCategory(nodeId, catId) {
            return _get(Object.getPrototypeOf(Property.prototype), 'post', this).call(this, this.path + '/addCategory?nodeId=' + nodeId + '&catId=' + catId);
        }
    }, {
        key: 'deleteCategory',
        value: function deleteCategory(nodId, catId) {

            return _get(Object.getPrototypeOf(Property.prototype), 'remove', this).call(this, this.path + '/removeCategory', { nodeId: nodId, catId: catId });
        }
    }]);

    return Property;
}(RestService);

var Stamp = exports.Stamp = function (_RestService17) {
    _inherits(Stamp, _RestService17);

    function Stamp(Restangular, $q) {
        _classCallCheck(this, Stamp);

        var _this17 = _possibleConstructorReturn(this, Object.getPrototypeOf(Stamp).call(this, Restangular, $q));

        _this17.path = 'stamp';
        return _this17;
    }

    _createClass(Stamp, [{
        key: 'assignSignToUser',
        value: function assignSignToUser(query) {
            query = query.replace(/\+/g, '%2B').replace(/\-/g, '%2D').replace(/\'/g, '%27').replace(/\"/g, '%22').replace(/\*/g, '%2A').replace(/\?/g, '%3F').replace(/\//g, '%2F').replace(/\:/g, '%3A').replace(/\$/g, '%24');
            return _get(Object.getPrototypeOf(Stamp.prototype), 'allCustomQueryPut', this).call(this, this.path + '/createStampUser?' + query);
        }
    }, {
        key: 'getStampsByUser',
        value: function getStampsByUser(userName) {
            return _get(Object.getPrototypeOf(Stamp.prototype), 'getAllCustomGet', this).call(this, this.path + '/getStampsByUser?userId=' + userName);
        }
    }, {
        key: 'toggleActiveStampUser',
        value: function toggleActiveStampUser(query) {
            query = query.replace(/\+/g, '%2B').replace(/\-/g, '%2D').replace(/\'/g, '%27').replace(/\"/g, '%22').replace(/\*/g, '%2A').replace(/\?/g, '%3F').replace(/\//g, '%2F').replace(/\:/g, '%3A').replace(/\$/g, '%24');
            return _get(Object.getPrototypeOf(Stamp.prototype), 'allCustomQueryPut', this).call(this, this.path + '/toggleActiveStampUser?' + query);
        }
    }, {
        key: 'path',
        set: function set(path) {
            this._path = path;
        },
        get: function get() {
            return this._path || null;
        }
    }], [{
        key: 'rest',
        set: function set(rest) {
            this._rest = rest;
        },
        get: function get() {
            return this._rest || null;
        }
    }]);

    return Stamp;
}(RestService);

var Search = exports.Search = function (_RestService18) {
    _inherits(Search, _RestService18);

    function Search(Restangular, $q) {
        _classCallCheck(this, Search);

        var _this18 = _possibleConstructorReturn(this, Object.getPrototypeOf(Search).call(this, Restangular, $q));

        _this18.path = 'search';
        return _this18;
    }

    _createClass(Search, [{
        key: 'remove',
        value: function remove(id) {
            return _get(Object.getPrototypeOf(Search.prototype), 'oneRemove', this).call(this, this.path + '/deleteSearch', id, {});
        }
    }, {
        key: 'list',
        value: function list() {
            return _get(Object.getPrototypeOf(Search.prototype), 'allCustomGET', this).call(this, this.path + '/getAllSearchs', 'queriesParams', 'queryParams');
        }
    }, {
        key: 'search',
        value: function search(query) {
            var items = {};
            if (query.pagenated) items = {
                path: this.path + '/findPaginated',
                query: {
                    name: query.name,
                    nameIsFuzzy: query.isFuzzy,
                    offset: query.offset,
                    author: query.author,
                    limit: query.limit,
                    path: query.path,
                    domain: query.domain,
                    content: query.content,
                    contentIsFuzzy: query.isFuzzy,
                    keyword: query.keyword,
                    keywordsIsFuzzy: query.isFuzzy,
                    notes: query.notes,
                    notesIsFuzzy: query.isFuzzy,
                    lastModifiedFrom: query.lastModifiedFrom,
                    lastModifiedTo: query.lastModifiedTo,
                    propertyGroup: query.propertyGroup,
                    mailSubject: query.mailSubject,
                    mailSubjectIsFuzzy: query.isFuzzy,
                    mailFrom: query.mailFrom,
                    mailTo: query.mailTo,
                    category: query.category
                },
                parent: 'resultSet',
                child: 'results'
            };else items = {
                path: this.path + '/find',
                query: {
                    name: query.name,
                    author: query.author,
                    path: query.path,
                    content: query.content,
                    keyword: query.keyword,
                    lastModifiedFrom: query.lastModifiedFrom,
                    lastModifiedTo: query.lastModifiedTo,
                    nameIsFuzzy: query.isFuzzy,
                    category: query.category
                },
                parent: 'queryResults',
                child: 'queryResult'
            };

            return _get(Object.getPrototypeOf(Search.prototype), 'jsonListsWithParams', this).call(this, items.path, items.query, items.parent, items.child);
        }
    }, {
        key: 'paginatedbyproperty',
        value: function paginatedbyproperty(params) {
            return _get(Object.getPrototypeOf(Search.prototype), 'allCustomGET', this).call(this, this.path + '/findPaginated?' + params, 'resultSet', 'results');
        }
    }, {
        key: 'paginatedFolderContentsproperty',
        value: function paginatedFolderContentsproperty(params) {
            return _get(Object.getPrototypeOf(Search.prototype), 'allCustomGET', this).call(this, this.path + '/findPaginated?' + params, 'resultSet', 'results');
        }
    }, {
        key: 'changeAllSelectedproperty',
        value: function changeAllSelectedproperty(query) {
            query = query.replace(/\+/g, '%2B').replace(/\-/g, '%2D').replace(/\'/g, '%27').replace(/\"/g, '%22').replace(/\*/g, '%2A').replace(/\?/g, '%3F').replace(/\//g, '%2F').replace(/\:/g, '%3A').replace(/\$/g, '%24');
            return _get(Object.getPrototypeOf(Search.prototype), 'allCustomQueryPut', this).call(this, this.path + '/findPaginatedAndReplace?' + query);
        }
    }, {
        key: 'byNote',
        value: function byNote(params) {
            return _get(Object.getPrototypeOf(Search.prototype), 'jsonList', this).call(this, this.path + '/findByNotes', {
                notes: params.notes,
                isFuzzy: params.isFuzzy
            }, 'queryResults', 'queryResult');
        }
    }, {
        key: 'byKeywords',
        value: function byKeywords(query) {
            return _get(Object.getPrototypeOf(Search.prototype), 'jsonList', this).call(this, this.path + '/findByKeywords', {
                keyword: query.keyword,
                isFuzzy: query.isFuzzy
            }, 'queryResults', 'queryResult');
        }
    }, {
        key: 'byContent',
        value: function byContent(query) {
            return _get(Object.getPrototypeOf(Search.prototype), 'jsonListsWithParams', this).call(this, this.path + '/findByContent', {
                content: query.content,
                isFuzzy: query.isFuzzy
            }, 'resultSet', 'results');
        }
    }, {
        key: 'byName',
        value: function byName(query) {
            return _get(Object.getPrototypeOf(Search.prototype), 'jsonListsWithParams', this).call(this, this.path + '/findByName', {
                name: query.name,
                isFuzzy: query.isFuzzy
            }, 'resultSet', 'results');
        }
    }, {
        key: 'save',
        value: function save(query) {
            return _get(Object.getPrototypeOf(Search.prototype), 'postJson', this).call(this, this.path + '/saveSearch', query);
        }
    }, {
        key: 'update',
        value: function update(query) {
            return _get(Object.getPrototypeOf(Search.prototype), 'put', this).call(this, this.path + '/updateSearch', query);
        }
    }, {
        key: 'getSearch',
        value: function getSearch(id) {
            return _get(Object.getPrototypeOf(Search.prototype), 'one', this).call(this, this.path + '/getSearch', id);
        }
    }, {
        key: 'listKeywords',
        value: function listKeywords() {
            return _get(Object.getPrototypeOf(Search.prototype), 'allCustomGET', this).call(this, this.path + '/getKeywordMap', 'keywordMaps', 'keywordMap');
        }
    }, {
        key: 'listKeywordsWithFilters',
        value: function listKeywordsWithFilters(query) {
            return _get(Object.getPrototypeOf(Search.prototype), 'allCustomGET', this).call(this, this.path + '/getKeywordMap?' + query, 'keywordMaps', 'keywordMap');
        }
    }, {
        key: 'frequencyData',
        value: function frequencyData(query) {
            return _get(Object.getPrototypeOf(Search.prototype), 'jsonListNotParent', this).call(this, this.path + '/findByFrequencyData', { statement: query.statement, isFuzzy: query.isFuzzy });
        }
    }, {
        key: 'findPaginatedWithCreatedQuery',
        value: function findPaginatedWithCreatedQuery(query) {
            query = query.replace(/\+/g, '%2B').replace(/\-/g, '%2D').replace(/\'/g, '%27').replace(/\"/g, '%22').replace(/\*/g, '%2A').replace(/\?/g, '%3F').replace(/\//g, '%2F').replace(/\:/g, '%3A').replace(/\$/g, '%24');
            return _get(Object.getPrototypeOf(Search.prototype), 'jsonLists', this).call(this, this.path + '/findPaginated?' + query, 'resultSet', 'results');
        }
    }, {
        key: 'findPaginated',
        value: function findPaginated(query) {

            var q = '';

            q = !_.includes([null, "", undefined], query.offset) ? q + 'offset=' + query.offset + '&' : q;
            q = !_.includes([null, "", undefined], query.limit) ? q + 'limit=' + query.limit + '&' : q;
            q = !_.includes([null, "", undefined, 0, "0"], query.domain) ? q + 'domain=' + query.domain + '&' : q + 'domain=3&';
            q = !_.includes([null, "", undefined], query.name) ? q + 'name=' + query.name + '&' : q;
            q = !_.includes([null, "", undefined], query.nameIsFuzzy) ? q + 'nameIsFuzzy=' + query.nameIsFuzzy + '&' : q;
            q = !_.includes([null, "", undefined], query.author) ? q + 'author=' + query.author + '&' : q;
            q = !_.includes([null, "", undefined], query.path) ? q + 'path=' + query.path + '&' : q;
            q = !_.includes([null, "", undefined], query.content) ? q + 'content=' + query.content + '&' : q;
            q = !_.includes([null, "", undefined], query.contentIsFuzzy) ? q + 'contentIsFuzzy=' + query.contentIsFuzzy + '&' : q;
            q = !_.includes([null, "", undefined], query.keywordsIsFuzzy) ? q + 'keywordsIsFuzzy=' + query.keywordsIsFuzzy + '&' : q;
            q = !_.includes([null, "", undefined], query.notes) ? '' + q + query.notes + '&' : q; //List
            q = !_.includes([null, "", undefined], query.notesIsFuzzy) ? q + 'notesIsFuzzy=' + query.notesIsFuzzy + '&' : q;
            q = !_.includes([null, "", undefined], query.lastModifiedFrom) ? q + 'lastModifiedFrom=' + query.lastModifiedFrom + '&' : q;
            q = !_.includes([null, "", undefined], query.lastModifiedTo) ? q + 'lastModifiedTo=' + query.lastModifiedTo + '&' : q;
            q = !_.includes([null, "", undefined], query.mailSubject) ? q + 'mailSubject=' + query.mailSubject + '&' : q;
            q = !_.includes([null, "", undefined], query.mailSubjectIsFuzzy) ? q + 'mailSubjectIsFuzzy=' + query.mailSubjectIsFuzzy + '&' : q;
            q = !_.includes([null, "", undefined], query.mailFrom) ? q + 'mailFrom=' + query.mailFrom + '&' : q;
            q = !_.includes([null, "", undefined], query.mailTo) ? q + 'mailTo=' + query.mailTo + '&' : q;
            q = !_.includes([null, "", undefined], query.mimeType) ? q + 'mimeType=' + query.mimeType + '&' : q;
            q = !_.includes([null, "", undefined], query.category) ? q + 'category=' + query.category + '&' : q;

            if (!_.includes([null, "", undefined], query.property)) {
                q = '' + q + query.property + '&';
            } else if (query.propertyGroup != '' && query.propertyGroup != "" && query.propertyGroup != null && query.propertyGroup != undefined && !(query.propertyGroup.length && query.propertyGroup.length == 0)) {
                q = q + 'propertyGroup=' + query.propertyGroup + '&';
            }

            if (query.keyword && angular.isArray(query.keyword)) query.keyword.forEach(function (key) {
                return q = '' + q + key + '&';
            });else if (query.keyword && !_.includes([null, "", undefined], query.keyword)) q = q + 'keyword=' + query.keyword + '&';

            if (q.endsWith("&")) q = q.slice(0, q.length - 1);
            return _get(Object.getPrototypeOf(Search.prototype), 'jsonLists', this).call(this, this.path + '/findPaginated?' + q, 'resultSet', 'results');
        }
    }, {
        key: 'simple',
        value: function simple(query) {
            return _get(Object.getPrototypeOf(Search.prototype), 'jsonListsWithParams', this).call(this, this.path + '/findSimpleQueryPaginated', {
                statement: query.statement,
                offset: query.offset,
                limit: query.limit,
                isFuzzy: query.isFuzzy
            }, 'resultSet', 'results');
        }
    }]);

    return Search;
}(RestService);

var WorkFlow = exports.WorkFlow = function (_RestService19) {
    _inherits(WorkFlow, _RestService19);

    function WorkFlow(Restangular, $q) {
        _classCallCheck(this, WorkFlow);

        var _this19 = _possibleConstructorReturn(this, Object.getPrototypeOf(WorkFlow).call(this, Restangular, $q));

        _this19.path = 'workflow';
        return _this19;
    }

    _createClass(WorkFlow, [{
        key: 'ProcessDefinitionsList',
        value: function ProcessDefinitionsList() {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'getAllCustomGet', this).call(this, this.path + '/findLatestProcessDefinitions');
        }
    }, {
        key: 'ProcessDefinition',
        value: function ProcessDefinition(uuid, pdId, values) {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'put', this).call(this, this.path + '/runProcessDefinitionWithName?uuid=' + uuid + '&pdId=' + pdId + '&values=' + values);
        }
    }, {
        key: 'findUserTaskInstances',
        value: function findUserTaskInstances() {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'getAllCustomGet', this).call(this, this.path + '/findUserTaskInstances');
        }
    }, {
        key: 'findUserTaskInstances',
        value: function findUserTaskInstances() {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'getAllCustomGet', this).call(this, this.path + '/findUserTaskInstances');
        }
    }, {
        key: 'processDefinitionForms',
        value: function processDefinitionForms(name) {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'getAllCustomGet', this).call(this, this.path + '/processDefinitionForms?name=' + name);
        }
    }, {
        key: 'runProcessDefinitionTemp',
        value: function runProcessDefinitionTemp(uuid, pdId, json) {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'allCustomPut', this).call(this, this.path + '/runProcessDefinitionTemp', json, { pdId: pdId, uuid: uuid });
        }
    }, {
        key: 'addTaskInstanceComment',
        value: function addTaskInstanceComment(tiId, message) {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'allCustomPut', this).call(this, this.path + '/addTaskInstanceComment', null, { tiId: tiId, message: message });
        }
    }, {
        key: 'getProcessDefinitionForms',
        value: function getProcessDefinitionForms(pdId) {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'getAllCustomGet', this).call(this, this.path + '/getProcessDefinitionForms?pdId=' + pdId);
        }
    }, {
        key: 'setTaskInstanceValues',
        value: function setTaskInstanceValues(tiId, transName, json) {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'allCustomPut', this).call(this, this.path + '/setTaskInstanceValues', json, { tiId: tiId, transName: transName });
        }
    }, {
        key: 'getProcessDefinitionImage',
        value: function getProcessDefinitionImage(pdId, node) {
            return _get(Object.getPrototypeOf(WorkFlow.prototype), 'getStreamFileWithHeader', this).call(this, this.path + '/getProcessDefinitionImage', { pdId: pdId, node: node });
        }
    }]);

    return WorkFlow;
}(RestService);