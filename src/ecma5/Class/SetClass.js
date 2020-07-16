"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SetClass = exports.SetClass = function () {
    function SetClass() {
        _classCallCheck(this, SetClass);

        this.items = {};
    }

    _createClass(SetClass, [{
        key: "add",
        value: function add(item) {
            this.items[item] = item;
            return this;
        }
    }, {
        key: "addList",
        value: function addList() {
            for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
                items[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this.add(item);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "has",
        value: function has(item) {
            return this.items.hasOwnProperty(item);
        }
    }, {
        key: "values",
        value: function values() {
            return Object.values(this.items);
        }
    }, {
        key: "keys",
        value: function keys() {
            return Object.keys(this.items);
        }
    }, {
        key: "size",
        get: function get() {
            return Object.keys(this.items).length;
        }
    }]);

    return SetClass;
}();