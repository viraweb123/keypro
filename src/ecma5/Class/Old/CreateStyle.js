"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateStyle = function () {
	function CreateStyle() {
		_classCallCheck(this, CreateStyle);
	}

	_createClass(CreateStyle, null, [{
		key: "addCSS",
		value: function addCSS(url) {
			CreateStyle.CSS = url;
		}
	}, {
		key: "CSS",
		get: function get() {
			return CreateStyle._CSS;
		},
		set: function set(url) {
			CreateStyle._CSS = CreateStyle._CSS || [];
			if (!CreateStyle._CSS[url]) {
				var head = document.getElementsByTagName("head")[0];
				var link = document.createElement("link");
				link.type = "text/css";
				link.rel = "stylesheet";
				link.href = url;
				CreateStyle._CSS[url] = head.appendChild(link);
			}
		}
	}]);

	return CreateStyle;
}();

;

exports.default = CreateStyle.addCSS;