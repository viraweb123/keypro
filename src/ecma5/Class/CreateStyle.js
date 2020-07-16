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
		key: "addedCSS",
		value: function addedCSS(url) {
			return typeof CreateStyle._CSS !== "undefined" && CreateStyle._CSS[url];
		}
	}, {
		key: "removeCSS",
		value: function removeCSS(url) {
			return new Promise(function (resolve, reject) {

				if (CreateStyle.addedCSS(url)) try {
					window.document.querySelector("link[rel=stylesheet][href=\"" + url + "\"]").remove();
					CreateStyle._CSS[url] = undefined;
					delete CreateStyle._CSS[url];
					resolve(true);
				} catch (e) {
					reject(e);
				} else resolve(true);
			});
		}
	}, {
		key: "addCSS",
		value: function addCSS(url) {
			return new Promise(function (resolve, reject) {
				if (CreateStyle.addedCSS(url)) resolve(true);else {
					try {
						(function () {
							var link = document.createElement("link");
							link.type = "text/css";
							link.rel = "stylesheet";
							link.onload = function () {
								resolve(true);
							};
							if (link.addEventListener) {
								link.addEventListener('load', function () {
									resolve(true);
								}, false);
							}
							link.onreadystatechange = function () {
								if (_.includes(['loaded', 'complete'], link.readyState)) {
									link.onreadystatechange = null;
									resolve(true);
								}
							};
							CreateStyle.CSS = url;
							link.href = url;
							window.document.getElementsByTagName("head")[0].appendChild(link);
						})();
					} catch (e) {
						reject(e);
					}
				}
			});
		}
	}, {
		key: "CSS",
		get: function get() {
			return CreateStyle._CSS || undefined;
		},
		set: function set(url) {
			CreateStyle._CSS = CreateStyle._CSS || {};
			CreateStyle._CSS[url] = true;
		}
	}]);

	return CreateStyle;
}();

exports.default = CreateStyle;
;