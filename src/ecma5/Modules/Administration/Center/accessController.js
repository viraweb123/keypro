'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var accessController = function accessController($scope, $state, $compile, $uibModal, administrationService, toaster) {
    var _this = this;

    _classCallCheck(this, accessController);

    $scope.data = {

        removeExternalFuncs: {},
        profile: null,
        state: "ACCESS",
        accesses: null,
        selectAccess: -1,
        metadatas: null,
        isShowFilter: false,

        usersList: null,
        rolesList: null,
        metadataList: null,
        propertyList: {},
        allpropertyList: [],
        editedPropertiesList: {},

        selectedProperty: null,

        filter: {
            selectedUsers: [],
            selectedRoles: [],
            selectedMetadata: null,
            selectedProperty: null
        },

        isOpen: {},
        open: function open($event, type) {
            angular.forEach($scope.data.isOpen, function (value, key) {
                this[key] = false;
            }, $scope.data.isOpen);
            $event.preventDefault();
            $event.stopPropagation();
            if (typeof $scope.data.isOpen[type] !== 'undifined') {
                $scope.data.isOpen[type] = true;
            }
        }
    };

    $scope.func = {};
    $scope.func.showAll = function () {};
    $scope.func.showFilter = function () {

        $scope.data.isShowFilter = $scope.data.isShowFilter != true;
        _.defer(function () {
            return $scope.$apply();
        });
    };
    /**TODO roles filter */
    $scope.func.changeRoles = function () {};
    $scope.func.getRolesList = function () {
        return new Promise(function (resolve, reject) {
            if ($scope.data.rolesList != null) resolve($scope.data.rolesList);else {
                administrationService.auth.getRoles().then(function (pgres) {
                    $scope.data.rolesList = pgres.data != null && _.has(pgres.data, 'originalElement') && _.isArray(pgres.data.originalElement) ? _.clone(pgres.data.originalElement) : [];
                    resolve($scope.data.rolesList);
                }, function (error) {
                    return reject(error);
                });
            }
        });
    };
    /**TODO user filter */
    $scope.func.changeUsers = function () {};
    $scope.func.getUsersList = function () {
        return new Promise(function (resolve, reject) {
            if ($scope.data.usersList != null) resolve($scope.data.usersList);else {
                administrationService.auth.getUsers().then(function (pgres) {
                    if (pgres.data != null) $scope.data.usersList = _.has(pgres.data, 'list') ? _.clone(pgres.data.list) : [];
                    resolve($scope.data.usersList);
                }, function (error) {
                    return reject(error);
                });
            }
        });
    };
    /**TODO metadata filter */
    $scope.func.changeMetadata = function () {
        try {
            $scope.data.propertyList = {};
            $scope.data.editedPropertiesList = {};
            $scope.data.allpropertyList = [];
            if ($scope.data.filter.selectedMetadata != null) {
                administrationService.propertyGroup.form($scope.data.filter.selectedMetadata).then(function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(properties) {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        if (!(_.has(properties, 'data') && properties.data != null && _.has(properties.data, 'properties') && _.isArray(properties.data.properties))) {
                                            _context.next = 8;
                                            break;
                                        }

                                        _context.next = 3;
                                        return JSManagement.addJS('ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName);

                                    case 3:
                                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Search/miladiToJalaliFunction.js?dev=' + randomVersionName] = 'miladiToJalaliFunction';
                                        $scope.data.allpropertyList = _.clone(properties.data.properties);
                                        _context.next = 7;
                                        return $scope.func.InitializationForm(_.clone(properties.data.properties));

                                    case 7:
                                        $scope.data.propertyList = _context.sent;

                                    case 8:
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });

                                    case 9:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this);
                    }));

                    return function (_x) {
                        return _ref.apply(this, arguments);
                    };
                }(), function (error) {
                    return toaster.pop('error', '', 'عدم دریافت اطلاعات');
                });
            }
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.getMetadataLists = function () {
        return new Promise(function (resolve, reject) {
            if ($scope.data.metadataList != null) resolve($scope.data.metadataList);else {
                administrationService.propertyGroup.list().then(function (pgres) {
                    $scope.data.metadataList = pgres.data != null ? _.clone(pgres.data) : [];
                    resolve($scope.data.metadataList);
                }, function (error) {
                    return reject(error);
                });
            }
        });
    };
    /**TODO property filters */
    $scope.func.changeProperty = function () {
        try {
            if ($scope.data.filter.selectedProperty != null) {
                if (!_.has($scope.data.editedPropertiesList, $scope.data.filter.selectedProperty.name)) $scope.data.editedPropertiesList[$scope.data.filter.selectedProperty.name] = angular.copy($scope.data.propertyList[$scope.data.filter.selectedProperty.name]);else toaster.pop("warning", "", "این ویژگی قبلا به لیست اضافه شده است.");
                _.defer(function () {
                    return $scope.$apply();
                });
            }
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.removeProperty = function (key) {
        try {
            $scope.data.editedPropertiesList[key] = undefined;
            delete $scope.data.editedPropertiesList[key];
        } catch (e) {
            console.error(e);
        } finally {
            _.defer(function () {
                return $scope.$apply();
            });
        }
    };
    $scope.func.maxRegex = function (number) {
        var minarray = [];
        var len = number.length;
        if (len == 1) {
            try {
                minarray.push('(?=(^[1-9][0-9]+$))');
                minarray.push('(?=(^[' + number[0] + '-9]$))');
            } catch (e) {
                console.error(e);
            }
        } else if (len > 1) {
            minarray.push('(?=(^[1-9][0-9]{' + len + ',}$))');
            for (var n = 0; n < len; n++) {
                try {
                    var num = Number(number[n]);
                    if (num < 9) {
                        if (n == len - 1) minarray.push('(?=(^' + number.substr(0, n) + '[' + num + '-9][0-9]*$))');else minarray.push('(?=(^' + number.substr(0, n) + '[' + (num + 1) + '-9][0-9]{' + (len - n - 1) + ',}$))');
                    } else {
                        minarray.push('(?=(^' + number + '[0-9]*$))');
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return minarray;
    };
    $scope.func.minRegex = function (number) {
        var minarray = [];
        var len = number.length;
        if (len == 1) {
            try {
                if (Number(number[0]) != 0) minarray.push('(?=(^[1-' + number[0] + ']$))');else minarray.push('(?=(^0$))');
            } catch (e) {
                console.error(e);
            }
        } else if (len > 1) {
            minarray.push('(?=(^[1-9][0-9]{0,' + (len - 2) + '}$))');
            for (var n = 0; n < len; n++) {
                try {
                    var num = Number(number[n]);
                    if (n == 0 && (num == 1 || num == 0)) continue;
                    if (num > 1) {
                        if (n == len - 1) minarray.push('(?=(^' + number.substr(0, n) + '[0-' + num + ']$))');else minarray.push('(?=(^' + number.substr(0, n) + '[0-' + (num - 1) + '][0-9]{1,' + (len - n - 1) + '}$))');
                    } else minarray.push('(?=(^' + number + '$))');
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return minarray;
    };
    $scope.func.InitializationForm = function (propertyGroup, items) {
        return new Promise(function (resolve, reject) {
            try {
                if (propertyGroup != null && _.isArray(propertyGroup)) {
                    var properties = {};
                    for (var i = 0; i < propertyGroup.length; i++) {
                        var property = angular.copy(propertyGroup[i]);
                        property.validators = _.has(property, 'validators') ? _.isArray(property.validators) ? property.validators : [property.validators] : [];
                        property.require = false;
                        property.index = i;
                        var patterns = [];
                        switch (property.objClass) {
                            case 'com.openkm.bean.form.Input':
                                if (_.has(property, 'type')) switch (property.type) {
                                    case 'date':
                                        $scope.data.isOpen[property.name] = false;
                                        if (!_.includes[(null, "")], property.value) {
                                            try {
                                                miladiToJalaliFunction(property.value).then(function (res) {
                                                    return property.value = res;
                                                }, function (error) {
                                                    return console.error(error);
                                                });
                                            } catch (e) {
                                                console.error(e);
                                            }
                                        }
                                        break;
                                    case 'text':
                                        property.isThesaurus = false;
                                        break;
                                    case 'number':
                                        property.isThesaurus = false;
                                        patterns.push('(?=(^[1-9][0-9]*$))');
                                        break;
                                    case 'email':
                                        property.isThesaurus = false;
                                        patterns.push('(?=(^[a-z]+[a-z0-9._]+@([a-zA-Z_0-9]+\\.)*[a-zA-Z]{1,}$))');
                                        break;
                                    case 'link':
                                        property.isThesaurus = false;
                                        patterns.push('(?=(^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$))');
                                        break;
                                }
                                break;
                            case 'com.openkm.bean.form.Select':

                                if (_.has(property, 'type')) {
                                    if (!_.isArray(property.options)) {
                                        if (property.options != null) property.options = [property.options];else property.options = [];
                                    }
                                    switch (property.type) {
                                        case 'simple':
                                            if (_.has(property, 'parentName')) {
                                                (function () {
                                                    property.allOptions = _.clone(property.options);
                                                    var index = _.findIndex(propertyGroup, function (p) {
                                                        return _.has(p, 'childName') && p.childName == property.name;
                                                    });
                                                    if (index >= 0) {
                                                        (function () {
                                                            var optionIndex = _.findIndex(propertyGroup[index].options, function (option) {
                                                                return option.selected;
                                                            });
                                                            if (optionIndex >= 0) {
                                                                _.remove(property.options, function (option) {
                                                                    return !option.value.startsWith(propertyGroup[index].options[optionIndex].value);
                                                                });
                                                            } else {
                                                                property.options = [];
                                                            }
                                                        })();
                                                    }
                                                })();
                                            }
                                            var index = _.findIndex(property.options, function (option) {
                                                return option.selected;
                                            });
                                            property.selected = null;
                                            if (index >= 0) property.selected = property.options[index];
                                            break;
                                        case 'multiple':

                                            property.selected = _.filter(property.options, function (option) {
                                                return option.selected;
                                            });
                                            break;

                                    }
                                }
                                break;
                            case 'com.openkm.bean.form.TextArea':
                                break;
                            case 'com.openkm.bean.form.CheckBox':
                                break;
                        }
                        property.require = true;
                        for (var j = 0; j < property.validators.length; j++) {
                            try {
                                switch (property.validators[j].type) {
                                    case 'regexp':
                                        switch (property.validators[j].parameter) {
                                            case 'thesaurus':
                                                property.isThesaurus = true;
                                                break;
                                            case 'ltr':
                                                property.isLTR = true;
                                                break;
                                        }
                                        break;
                                    case 'maxlen':
                                        if (Number(property.validators[j].parameter) == property.validators[j].parameter) patterns.push('(?=(^.{0,' + Number(property.validators[j].parameter) + '}$))');
                                        break;
                                    case 'minlen':
                                        if (Number(property.validators[j].parameter) == property.validators[j].parameter) patterns.push('(?=(^.{' + Number(property.validators[j].parameter) + ',}$))');
                                        break;
                                    case 'alpha':
                                        patterns.push('(?=(^[؀-ۿa-zA-Z][؀-ۿsa-zA-Z][؀-ۿa-zA-Z][؀-ۿsa-zA-Z\\W]*$))');
                                        break;
                                    case 'min':
                                        //TODO 148 or top
                                        //'(?:(?=(^[2-9][0-9]{2,}$))|(?=(^1[5-9][0-9]{1,}$))|(?=(^14[8-9][0-9]*$)))'
                                        if (Number(property.validators[j].parameter) == property.validators[j].parameter) {
                                            var listMax = $scope.func.maxRegex(String(property.validators[j].parameter));
                                            patterns.push('(?:' + listMax.join('|') + ')');
                                        }
                                        break;
                                    case 'max':
                                        //TODO 148 or top
                                        //'(?:(?=(^[2-9][0-9]{2,}$))|(?=(^1[5-9][0-9]{1,}$))|(?=(^14[8-9][0-9]*$)))'
                                        if (Number(property.validators[j].parameter) == property.validators[j].parameter) {
                                            var _listMax = $scope.func.minRegex(String(property.validators[j].parameter));
                                            patterns.push('(?:' + _listMax.join('|') + ')');
                                        }
                                        break;
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }

                        if (patterns.length > 0) property.patterns = new RegExp('(?:' + patterns.join('') + ')', 'g'); //'|'
                        else property.patterns = /[\w|\W]*/;

                        properties[property.name] = angular.copy(property);
                        //property = undefined;
                    }
                    resolve(angular.copy(properties));
                } else {
                    resolve(propertyGroup);
                }
            } catch (e) {
                console.error(e);
                resolve(propertyGroup);
            }
        });
    };
    $scope.func.selectTreeThezarus = function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(property) {
            var response;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.prev = 1;
                            _context2.next = 4;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js?dev=' + randomVersionName);

                        case 4:
                            _context2.next = 6;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName);

                        case 6:
                            _context2.next = 8;
                            return selectThesaurusChild($uibModal, //modal func
                            administrationService.repository, //repository service
                            'getThesaurusFolder', // rootPath
                            administrationService.folder, // folder service
                            "thesaurus", getNameFromPath);

                        case 8:
                            response = _context2.sent;

                            if (_.has(response, 'addNode') && !_.isEmpty(response.addNode)) property.value = response.addNode.label;
                            _context2.next = 12;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName, 'getNameFromPath');

                        case 12:
                            _context2.next = 14;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js?dev=' + randomVersionName, 'selectThesaurusChild');

                        case 14:
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            _context2.next = 25;
                            break;

                        case 17:
                            _context2.prev = 17;
                            _context2.t0 = _context2['catch'](1);

                            property.value = "";
                            _context2.next = 22;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Public/getNameFromPath.js?dev=' + randomVersionName, 'getNameFromPath');

                        case 22:
                            _context2.next = 24;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Public/selectThesaurusChild.js?dev=' + randomVersionName, 'selectThesaurusChild');

                        case 24:
                            console.error(_context2.t0);

                        case 25:
                            _context2.next = 30;
                            break;

                        case 27:
                            _context2.prev = 27;
                            _context2.t1 = _context2['catch'](0);

                            console.error(_context2.t1);

                        case 30:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[0, 27], [1, 17]]);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }();
    $scope.func.changeDate = function (property) {};
    $scope.func.selectSingle = function (property) {
        try {
            if (_.has(property, 'selected') && property.selected != null) _.map(property.options, function (option) {
                return option.selected = property.selected.label == option.label;
            });else _.map(property.options, function (option) {
                return option.selected = false;
            });

            if (_.has(property, 'childName')) {
                if (_.has($scope.data.properties, property.childName)) {
                    try {
                        $scope.data.propertyList[property.childName].options = [];
                        $scope.data.propertyList[property.childName].selected = null;
                        _.map($scope.data.propertyList[property.childName].allOptions, function (option) {
                            return option.selected = false;
                        });
                        $scope.data.propertyList[property.childName].options = _.filter($scope.data.propertyList[property.childName].allOptions, function (option) {
                            return option.value.startsWith(property.selected.value);
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.selectMultiSelected = function (property) {
        var i = _.findIndex(property.selected, function (s) {
            return s.selected != true;
        });
        if (i >= 0) {
            // TODO element added
            var optionIndex = _.findIndex(property.options, function (option) {
                return option.label == property.selected[i].label;
            });
            try {
                property.options[optionIndex].selected = true;
            } catch (e) {
                console.error(e);
            }
        } else {
            // TODO element removed
            var _optionIndex = _.findIndex(property.options, function (option) {
                return option.selected == true && !_.includes(_.map(property.selected, 'label'), option.label);
            });
            try {
                property.options[_optionIndex].selected = false;
            } catch (e) {
                console.error(e);
            }
        }
    };
    $scope.func.runFilter = function () {
        try {

            $scope.data.accesses = null;

            var query = "";
            query += _.join(_.map($scope.data.filter.selectedUsers, function (user) {
                return 'user=' + user;
            }), '&');
            query = query.trim() != "" ? query + "&" : query;
            query += _.join(_.map($scope.data.filter.selectedRoles, function (role) {
                return 'role=' + role.id;
            }), '&');
            query = query.trim() != "" ? query + "&" : query;

            if ($scope.data.filter.selectedMetadata != null) {
                query += 'propertyGroup=' + $scope.data.filter.selectedMetadata.name + '&';
                var selectedProperties = [];
                for (var k in $scope.data.editedPropertiesList) {
                    switch ($scope.data.editedPropertiesList[k].objClass) {
                        case 'com.openkm.bean.form.Input':
                            if (_.includes([null, "", undefined], $scope.data.editedPropertiesList[k].value)) {
                                toaster.pop("error", "", "لطفا ویژگی های خالی را پر کنید");
                                return;
                            }
                            if (_.has($scope.data.editedPropertiesList[k], 'type')) switch ($scope.data.editedPropertiesList[k].type) {
                                case 'date':
                                    selectedProperties.push('property=' + $scope.data.editedPropertiesList[k].name + '=' + (_.isDate($scope.data.editedPropertiesList[k].value) ? $scope.data.editedPropertiesList[k].value.toISOString() : $scope.data.editedPropertiesList[k].value));
                                    break;
                                case 'text':
                                case 'number':
                                case 'email':
                                case 'link':
                                    try {
                                        if (!$scope.data.editedPropertiesList[k].patterns.test($scope.data.editedPropertiesList[k].value)) throw ' الگوی ورودی ' + $scope.data.editedPropertiesList[k].label + ' صحیح نمی باشد. ';
                                        selectedProperties.push('property=' + $scope.data.editedPropertiesList[k].name + '=' + $scope.data.editedPropertiesList[k].value);
                                    } catch (er) {
                                        toaster.pop("error", "", er.message || er);
                                        return;
                                    }
                                    break;
                                default:
                                    selectedProperties.push('property=' + $scope.data.editedPropertiesList[k].name + '=' + $scope.data.editedPropertiesList[k].value);
                                    break;
                            }
                            break;
                        case 'com.openkm.bean.form.Select':

                            if (_.has($scope.data.editedPropertiesList[k], 'type')) {

                                switch ($scope.data.editedPropertiesList[k].type) {
                                    case 'simple':
                                        if ($scope.data.editedPropertiesList[k].selected != null) {
                                            selectedProperties.push('property=' + $scope.data.editedPropertiesList[k].name + '=' + $scope.data.editedPropertiesList[k].selected.value);
                                        } else {
                                            toaster.pop("error", "", "لطفا ویژگی های خالی را پر کنید");
                                            return;
                                        }
                                        break;
                                    case 'multiple':
                                        if ($scope.data.editedPropertiesList[k].selected != null || _.isArray($scope.data.editedPropertiesList[k].selected) && $scope.data.editedPropertiesList[k].selected.length > 0) {
                                            selectedProperties.push('property=' + $scope.data.editedPropertiesList[k].name + '=' + _.join(_.map($scope.data.editedPropertiesList[k].selected, 'value'), ','));
                                        } else {
                                            toaster.pop("error", "", "لطفا ویژگی های خالی را پر کنید");
                                            return;
                                        }
                                        break;
                                }
                            }
                            break;
                        case 'com.openkm.bean.form.TextArea':
                        case 'com.openkm.bean.form.CheckBox':
                            if (_.includes([null, ""], $scope.data.editedPropertiesList[k].value)) {
                                toaster.pop("error", "", "لطفا ویژگی های خالی را پر کنید");
                                return;
                            }
                            selectedProperties.push('property=' + $scope.data.editedPropertiesList[k].name + '=' + $scope.data.editedPropertiesList[k].value);
                            break;
                    }
                }
                query += _.join(_.clone(selectedProperties), '&');
                selectedProperties = undefined;
            } else if (query.trim() != "") {
                query += 'propertyGroup=-1';
            } else {
                toaster.pop("error", "", "فیلتری برای ارسال انتخاب نشده است.");
                return;
            }
            if (query.endsWith("&")) query = query.slice(0, query.length - 1);
            administrationService.auth.getAllUserRoleForPropsWithFilter(query).then(function () {
                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(res) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    _context3.next = 3;
                                    return $scope.func.getMetadataList();

                                case 3:
                                    $scope.data.accesses = null;

                                    if (!(_.has(res.data, 'originalElement') && _.isArray(res.data.originalElement) && res.data.originalElement.length > 0)) {
                                        _context3.next = 9;
                                        break;
                                    }

                                    _context3.next = 7;
                                    return $scope.func.generateAccessTable(res.data.originalElement);

                                case 7:
                                    $scope.data.accesses = _context3.sent;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 9:
                                    _context3.next = 15;
                                    break;

                                case 11:
                                    _context3.prev = 11;
                                    _context3.t0 = _context3['catch'](0);

                                    $scope.data.accesses = {};
                                    console.error(_context3.t0);

                                case 15:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this, [[0, 11]]);
                }));

                return function (_x3) {
                    return _ref3.apply(this, arguments);
                };
            }(), function (error) {
                return console.error(error);
            });
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.remove = function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(accessKey) {
            var result;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;

                            if (!($scope.data.accesses != null && _.has($scope.data.accesses, accessKey))) {
                                _context4.next = 12;
                                break;
                            }

                            _context4.next = 4;
                            return JSManagement.addJS('ecma5/ExternalLiberary/Administration/removeAccess.js?dev=' + randomVersionName);

                        case 4:
                            _context4.next = 6;
                            return removeAccess($uibModal, $scope.data.accesses[accessKey].groupName);

                        case 6:
                            result = _context4.sent;
                            _context4.next = 9;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeAccess.js?dev=' + randomVersionName, 'removeAccess');

                        case 9:

                            if (result) administrationService.auth.deleteUserRoleForProps(accessKey, result.permanent).then(function (res) {
                                try {
                                    // $scope.data.accesses.splice(_.findIndex($scope.data.accesses, a=>a.id == access.id), 1);
                                    $scope.data.accesses[accessKey] = undefined;
                                    delete $scope.data.accesses[accessKey];
                                } catch (e) {
                                    console.error(e);
                                } finally {
                                    toaster.pop('successs', '', 'اطلاعات با موفقیت حذف گردید');
                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                }
                            }, function (error) {
                                return toaster.pop('error', '', 'مشکلی در حذف به وجود آمده است');
                            });
                            _context4.next = 13;
                            break;

                        case 12:
                            (function (error) {
                                return toaster.pop('error', '', 'امکان حذف آیتم انتخابی نیست.');
                            });

                        case 13:
                            _context4.next = 20;
                            break;

                        case 15:
                            _context4.prev = 15;
                            _context4.t0 = _context4['catch'](0);

                            console.error(_context4.t0);
                            _context4.next = 20;
                            return JSManagement.removeJS('ecma5/ExternalLiberary/Administration/removeAccess.js?dev=' + randomVersionName, 'removeAccess');

                        case 20:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[0, 15]]);
        }));

        return function (_x4) {
            return _ref4.apply(this, arguments);
        };
    }();
    $scope.func.permision = function (digit) {
        var per = _.map(digit.toString(2).split(''), function (i) {
            return parseInt(i);
        });
        while (per.length < 4) {
            per.unshift(0);
        }return per;
    };
    $scope.func.generateAccessTable = function (list) {
        return new Promise(function (resolve, reject) {
            try {
                var result = {};
                for (var i = 0; i < list.length; i++) {
                    var row = {};
                    row.groupName = _.has($scope.data.metadatas, list[i].col00) ? $scope.data.metadatas[list[i].col00].label : list[i].col00;
                    row.Roles = _.map(_.map(_.filter(_.split(list[i].col01, ","), function (r) {
                        return r != "";
                    }), function (r) {
                        return r.split("=");
                    }), function (r) {
                        var per = _.map(parseInt(r[1]).toString(2).split(''), function (i) {
                            return parseInt(i);
                        });
                        while (per.length < 4) {
                            per.unshift(0);
                        }r[1] = per;
                        return r;
                    });
                    row.Users = _.map(_.map(_.filter(_.split(list[i].col02, ","), function (r) {
                        return r != "";
                    }), function (r) {
                        return r.split("=");
                    }), function (r) {
                        var per = _.map(parseInt(r[1]).toString(2).split(''), function (i) {
                            return parseInt(i);
                        });
                        while (per.length < 4) {
                            per.unshift(0);
                        }r[1] = per;
                        return r;
                    });
                    row.property1 = !_.includes(["", "0", null], list[i].col03.trim()) ? _.filter(_.split(list[i].col03, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property2 = !_.includes(["", "0", null], list[i].col04.trim()) ? _.filter(_.split(list[i].col04, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property3 = !_.includes(["", "0", null], list[i].col05.trim()) ? _.filter(_.split(list[i].col05, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property4 = !_.includes(["", "0", null], list[i].col06.trim()) ? _.filter(_.split(list[i].col06, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property5 = !_.includes(["", "0", null], list[i].col07.trim()) ? _.filter(_.split(list[i].col07, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property6 = !_.includes(["", "0", null], list[i].col08.trim()) ? _.filter(_.split(list[i].col08, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property7 = !_.includes(["", "0", null], list[i].col09.trim()) ? _.filter(_.split(list[i].col09, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property8 = !_.includes(["", "0", null], list[i].col10.trim()) ? _.filter(_.split(list[i].col10, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property9 = !_.includes(["", "0", null], list[i].col11.trim()) ? _.filter(_.split(list[i].col11, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property10 = !_.includes(["", "0", null], list[i].col12.trim()) ? _.filter(_.split(list[i].col12, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property11 = !_.includes(["", "0", null], list[i].col13.trim()) ? _.filter(_.split(list[i].col13, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.property12 = !_.includes(["", "0", null], list[i].col14.trim()) ? _.filter(_.split(list[i].col14, "="), function (f) {
                        return f.trim() != "";
                    }) : [];
                    row.id = list[i].id;

                    result[list[i].id] = _.clone(row);
                    row = undefined;
                }
                resolve(result);
            } catch (e) {
                reject('عدم ایجاد جدول');
            }
        });
    };
    $scope.func.getMetadataList = function () {
        return new Promise(function (resolve, reject) {
            if ($scope.data.metadatas != null) resolve($scope.data.metadatas);else {
                administrationService.propertyGroup.list().then(function (pgres) {
                    if (pgres.data != null) {
                        $scope.data.metadatas = _.clone(_.keyBy(pgres.data, function (d) {
                            return d.name;
                        }));
                        resolve($scope.data.metadatas);
                    }
                }, function (error) {
                    return reject(error);
                });
            }
        });
    };
    /** TODO  get Access List From Server **/
    $scope.func.todo = function () {
        try {
            administrationService.auth.getAllUserRoleForProps().then(function () {
                var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(res) {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.prev = 0;
                                    _context5.next = 3;
                                    return $scope.func.getMetadataList();

                                case 3:
                                    $scope.data.accesses = null;

                                    if (!(_.has(res.data, 'originalElement') && _.isArray(res.data.originalElement) && res.data.originalElement.length > 0)) {
                                        _context5.next = 9;
                                        break;
                                    }

                                    _context5.next = 7;
                                    return $scope.func.generateAccessTable(res.data.originalElement);

                                case 7:
                                    $scope.data.accesses = _context5.sent;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });

                                case 9:
                                    _context5.next = 15;
                                    break;

                                case 11:
                                    _context5.prev = 11;
                                    _context5.t0 = _context5['catch'](0);

                                    $scope.data.accesses = {};
                                    console.error(_context5.t0);

                                case 15:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, _this, [[0, 11]]);
                }));

                return function (_x5) {
                    return _ref5.apply(this, arguments);
                };
            }(), function (error) {
                toaster.pop('error', '', 'عدم دریافت لیست فراداده ها');
            });
        } catch (e) {
            console.error(e);
        }
    };
    $scope.func.addAccessMetadata = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return JSManagement.addJS('ecma5/ExternalLiberary/Administration/addAccessMetadata.js?dev=' + randomVersionName);

                    case 3:
                        $scope.data.removeExternalFuncs['ecma5/ExternalLiberary/Administration/addAccessMetadata.js?dev=' + randomVersionName] = 'addAccessMetadata';
                        _context6.next = 6;
                        return addAccessMetadata($uibModal, administrationService, JSManagement);

                    case 6:
                        res = _context6.sent;


                        if ($scope.data.accesses == null) $scope.data.accesses = {};

                        $scope.data.accesses[res.id] = _.clone(res);

                        //$scope.func.todo();
                        _.defer(function () {
                            return $scope.$apply();
                        });

                        _context6.next = 15;
                        break;

                    case 12:
                        _context6.prev = 12;
                        _context6.t0 = _context6['catch'](0);

                        console.error(_context6.t0);

                    case 15:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, _this, [[0, 12]]);
    }));
    $scope.$on('featureReady', function () {
        var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(event, args) {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.prev = 0;

                            if (!(typeof args.changeInfo !== "undefined" && args.changeInfo == true)) {
                                _context7.next = 5;
                                break;
                            }

                            _context7.next = 4;
                            return FeaturesManagement.getFeatures(administrationService.auth);

                        case 4:
                            $scope.data.profile = _context7.sent;

                        case 5:
                            _context7.next = 10;
                            break;

                        case 7:
                            _context7.prev = 7;
                            _context7.t0 = _context7['catch'](0);

                            console.error(_context7.t0);

                        case 10:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this, [[0, 7]]);
        }));

        return function (_x6, _x7) {
            return _ref7.apply(this, arguments);
        };
    }());
    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        try {
                            //TODO clear all interval and timeouts
                            window.clearAllIntervals();
                            //TODO clear all imported  js functions
                            _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                                var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(funcName, src) {
                                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                        while (1) {
                                            switch (_context8.prev = _context8.next) {
                                                case 0:
                                                    _context8.prev = 0;
                                                    _context8.next = 3;
                                                    return JSManagement.removeJS(src, funcName);

                                                case 3:
                                                    _context8.next = 8;
                                                    break;

                                                case 5:
                                                    _context8.prev = 5;
                                                    _context8.t0 = _context8['catch'](0);

                                                    console.error(_context8.t0);

                                                case 8:
                                                case 'end':
                                                    return _context8.stop();
                                            }
                                        }
                                    }, _callee8, _this, [[0, 5]]);
                                }));

                                return function (_x8, _x9) {
                                    return _ref9.apply(this, arguments);
                                };
                            }());
                            //TODO  clear all data and functions inside scope
                            $scope.func = undefined;
                            $scope.data = undefined;
                        } catch (e) {
                            console.error(e);
                        }

                    case 1:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, _this);
    })));
};

exports.default = accessController;


accessController.$inject = ['$scope', '$state', '$compile', '$uibModal', 'administrationService', 'toaster'];