'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var metadatasListVariable = undefined;

var addMetadatas2Filters = function addMetadatas2Filters(properties, service, metadatas, convertor) {
    return new Promise(function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
            var _this = this;

            var filters, _loop, group;

            return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            metadatasListVariable = {};
                            filters = {};
                            _loop = regeneratorRuntime.mark(function _loop(group) {
                                var metadata, property, selectProperty, date;
                                return regeneratorRuntime.wrap(function _loop$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                metadata = _.split(group, '.')[0];
                                                property = _.split(group, '.')[1];
                                                _context.next = 4;
                                                return createMetaDataObject(metadata, service, metadatas);

                                            case 4:
                                                selectProperty = _.clone(_.find(metadatasListVariable[metadata].properties, function (p) {
                                                    return p.name == group;
                                                }));

                                                if (!(selectProperty != undefined)) {
                                                    _context.next = 14;
                                                    break;
                                                }

                                                if (!(_.has(selectProperty, 'type') && selectProperty.type == "date")) {
                                                    _context.next = 13;
                                                    break;
                                                }

                                                _context.next = 9;
                                                return convertor(properties[group].term);

                                            case 9:
                                                date = _context.sent;

                                                filters['metadata-' + group + '-filter'] = {
                                                    title: metadatasListVariable[metadata].value.label + '-' + selectProperty.label + ' : ' + date,
                                                    value: _.clone(properties[group].term),
                                                    type: 'smetadata',
                                                    bind: 'value',
                                                    removeValue: null,
                                                    key: selectProperty.name
                                                };
                                                _context.next = 14;
                                                break;

                                            case 13:
                                                filters['metadata-' + group + '-filter'] = {
                                                    title: metadatasListVariable[metadata].value.label + '-' + selectProperty.label + ' : ' + properties[group].term,
                                                    value: _.clone(properties[group].term),
                                                    type: "smetadata",
                                                    bind: 'value',
                                                    removeValue: null,
                                                    key: selectProperty.name
                                                };

                                            case 14:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _loop, _this);
                            });
                            _context2.t0 = regeneratorRuntime.keys(properties);

                        case 5:
                            if ((_context2.t1 = _context2.t0()).done) {
                                _context2.next = 10;
                                break;
                            }

                            group = _context2.t1.value;
                            return _context2.delegateYield(_loop(group), 't2', 8);

                        case 8:
                            _context2.next = 5;
                            break;

                        case 10:
                            metadatasListVariable = undefined;
                            resolve(filters);
                            _context2.next = 17;
                            break;

                        case 14:
                            _context2.prev = 14;
                            _context2.t3 = _context2['catch'](0);

                            reject(_context2.t3);

                        case 17:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee, this, [[0, 14]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
};

var createMetaDataObject = function createMetaDataObject(name, service, metadatas) {
    return new Promise(function (resolve, reject) {
        try {
            if (!_.has(metadatasListVariable, name)) service.form({ name: name }).then(function (res) {
                metadatasListVariable[name] = {
                    properties: _.clone(res.data.properties),
                    value: _.clone(_.find(metadatas, function (m) {
                        return m.name == name;
                    }))
                };
                resolve(true);
            }, function (error) {
                return reject(error);
            });else resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};