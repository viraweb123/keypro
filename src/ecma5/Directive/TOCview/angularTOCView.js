"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = tocModel;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function tocModel($compile, $http, $parse) {
    var _this = this;

    return {
        restrict: "A",
        scope: {
            tocList: "=",
            changeToc: "=",
            currentToc: "="
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $element.on('$destroy', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                try {
                                    $scope.$destroy();
                                } catch (e) {
                                    console.error(e);
                                }

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            })));
        }],
        link: function link(scope, iElement, iAttrs) {
            iElement.html('').append($compile("<style>\n                    .read_only{color: #e75753 !important;}\n                </style>\n                <ul  class=\"col-sm-12 row form-group\"  style=\"padding-right: 0px !important;padding-left:2px !important; margin-bottom: 0px ! important; margin-top: 0px ! important;\">\n                    <li \n                        class=\"col-sm-12 row form-group\"\n                        ng-repeat=\"toc in tocList\" \n                        style=\"padding-left: 20px !important; display: block;padding-right:0px !important; margin-top: 1px ! important; margin-bottom: 1px ! important;\">\n                        \n                        \n                        <ul class=\"leadersTOC\" ng-click=\"select($event,toc)\" >\n                            <li ng-click=\"select($event,toc)\" ng-class=\"{'activatedTOC':currentToc.name==toc.name}\">\n                                <span  ng-bind=\"toc['label']\"></span>\n                                <span ng-bind=\"toc.start|pNumber\"></span>\n                             </li>\n                        </ul>        \n                        \n                        \n                        <!--\n                           <div \n                                ng-click=\"select($event,toc)\" \n                                class=\"col-sm-12  TOCContents\" \n                                ng-class=\"{'activatedTOC':currentToc.name==toc.name}\"\n                            >\n                                <div class='fillWithDot'></div>\n                                <span class='pull-right labelTOC'  ng-bind=\"toc.start|pNumber\"></span>\n                                <span class='pull-left textTOC'    ng-bind=\"toc['label']\"></span>\n                            </div>    \n                        -->\n                        \n                        <!--<span \n                            class=\"col-sm-12  TOCContents\" \n                            ng-class=\"{'activatedTOC':currentToc.name==toc.name}\"\n                        >\n                            <span\n                                class=\"pull-left\"\n                                style=\"direction: ltr !important;\"\n                                ng-click=\"select($event,toc)\" \n                                ng-bind=\"toc['label']\">\n                            </span>\n                             <span class=\"filWithDot\"></span>\n                            <span  class=\"pull-right\" ng-bind=\"toc.start|pNumber\"></span>\n                        </span>-->\n                        <div \n                            style=\"margin:0px !important;padding:0px !important;\"\n                            change-toc=\"changeToc\" \n                            toc-list=\"toc.childs\" \n                            current-toc = \"currentToc\"\n                            toc-model>\n                        </div>\n                    </li>\n                <ul>")(scope));

            scope.dbClicked = 0;

            scope.select = function ($event, node) {

                $event.preventDefault();
                $event.stopPropagation();
                scope.dbClicked = $event.detail || $event.originalEvent.detail;
                switch (scope.dbClicked) {
                    case 1:
                        /* TODO click in image */
                        setTimeout(function () {
                            if (scope.dbClicked == 1) {
                                scope.dbClicked = 0;
                                //node.collapsed = (typeof  node.collapsed !== "undefined")? !node.collapsed : true;
                                scope.changeToc.change(node);
                            }
                        }, 500);
                        break;
                    case 2:
                        /* TODO double click in image */
                        break;
                    default:
                        break;
                }
            };
        }
    };
}