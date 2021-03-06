"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = treeModel;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function treeModel($compile, $http, $parse) {
    var _this = this;

    return {
        restrict: "A",
        scope: {
            rootFolder: "=",
            treeFunc: "=",
            currentNode: "="
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
            iElement.html('').append($compile("<style> \n                    .read_only{color: #e75753 !important;} \n\n                    .sample-show-hide.ng-hide-add, .sample-show-hide.ng-hide-remove { \n                        -webkit-transition:all linear 1.0s; \n                        -moz-transition:all linear 1.0s; \n                        -o-transition:all linear 1.0s; \n                        transition:all linear 1.0s; \n                        display:block !important; \n                    } \n                    .sample-show-hide.ng-hide-add.ng-hide-add-active, \n                    .sample-show-hide.ng-hide-remove { \n                        -webkit-transition:all linear 0.2s; \n                        -moz-transition:all linear 0.2s; \n                        -o-transition:all linear  0.2s; \n                        transition:all linear  0.2s; \n                        opacity:0; \n                    } \n                    .sample-show-hide.ng-hide-add, \n                    .sample-show-hide.ng-hide-remove.ng-hide-remove-active { \n                        -webkit-transition:all linear 1.2s; \n                        -moz-transition:all linear 1.2s; \n                        -o-transition:all linear  1.2s; \n                        transition:all linear  1.2s; \n                        opacity:1; \n                    } \n                    .animate-if { \n                        -webkit-transition: all cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s; \n                        transition: all cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s; \n                    } \n                    .animate-if.ng-enter, .animate-if.ng-leave { \n                        -webkit-transition: all cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s; \n                        transition: all cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s; \n                    } \n                    .animate-if.ng-enter, .animate-if.ng-leave.ng-leave-active { \n                        opacity: 0; \n                    } \n                    .animate-if.ng-leave, .animate-if.ng-enter.ng-enter-active { \n                        opacity: 1; \n                    } \n\n                </style> \n                <ul  style=\"margin-left:60px !important\"> \n                    <li  \n                        node-unique-attrib=\"{{node.id}}\"  \n                        id=\"{{node.id}}\"  \n                        ng-if=\"node!=null\"   \n                        ng-repeat=\"node in rootFolder\"   \n                        class=\"sample-show-hide\"   \n                        style=\"padding-left:40px; display: block;min-width: 230px;font-size:11px;\"> \n                        <i   \n                            class=\"rightClickMenu \"  \n                            ng-class='{\"fa fa-folder fa-flip-horizontal collapsed\" : node.collapsed , \"read_only\" : node.permissions==1 }'  \n                            ng-show=\"node.collapsed\"  \n                            ng-click=\"select($event,node)\">  \n                            <span class=\"fa fa-sort-desc fa-rotate-270 direction\"></span>  \n                        </i>  \n                        <span    \n                            data-ng-show=\"node.collapsed\"   \n                            class=\"noteChildren rightClickMenu\"   \n                            ng-class='{\"fa fa-folder fa-flip-horizontal\" : node.hasChildrenFolder == true}'   \n                            ng-click=\"select($event,node)\">  \n                        </span>   \n                        <i    \n                            class=\"fa fa-folder-open fa-flip-horizontal expanded rightClickMenu\"  \n                            ng-class='{\"read_only\": node.permissions==1}'   \n                            ng-show=\"!node.collapsed\"  \n                            ng-click=\"select($event,node)\">  \n                            <span class=\"fa fa-sort-desc direction\" style=\"right:36px !important;\"></span>  \n                        </i>  \n                        <span    \n                            class=\"rightClickItem\"    \n                            right-click    \n                            tree-newnode = \"node\"   \n                            tree-rightclick-func=\"treeFunc\"   \n                            tree-oldnode =\"currentNode.currentNode\">  \n                        </span>  \n                        <span    \n                            ng-show=\"!node.collapsed\"   \n                            class=\"expentChildren rightClickMenu\"  \n                            ng-class='{\"fa fa-folder fa-flip-horizontal\" : node.hasChildrenFolder == true}' ng-click=\"select($event,node)\">  \n                        </span>  \n                        <span    \n                            class=\"rightClickMenu folderitem\"   \n                            ng-click=\"select($event,node)\"   \n                            ng-class='{ \"selected\" : (node.id || node.uuid) && (node.id || node.uuid) == (currentNode.currentNode.id || currentNode.currentNode.uuid ) } '  \n                            ng-bind=\"node['label'].length>30?node['label'].substr(0,20)+' ...':node['label']|removeOKM|pNumber\">  \n                        </span>   \n                        <div   \n                            tree-func=\"treeFunc\"  class=\"sample-show-hide\" ng-hide=\"node.collapsed\" current-node=\"currentNode\" root-folder=\"node.children\" tree-model>  \n                        </div>  \n                    </li>  \n                </ul>")(scope));

            scope.dbClicked = 0;

            scope.select = function ($event, node) {
                try {
                    $event.preventDefault();
                    $event.stopPropagation();
                    scope.dbClicked = $event.detail || $event.originalEvent.detail;
                    switch (scope.dbClicked) {
                        case 1:
                            /* TODO click in image */
                            setTimeout(function () {
                                if (scope.dbClicked == 1) {
                                    scope.dbClicked = 0;
                                    node.collapsed = typeof node.collapsed !== "undefined" ? !node.collapsed : true;
                                    scope.treeFunc.changeCurrentNode(node);
                                }
                            }, 500);
                            break;
                        case 2:
                            /* TODO double click in image */
                            break;
                        default:
                            break;
                    }
                } catch (e) {
                    console.error(e);
                }
            };
        }
    };
}