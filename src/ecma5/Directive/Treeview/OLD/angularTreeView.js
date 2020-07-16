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
            iElement.html('').append($compile('<style>' + '.read_only{color: #e75753 !important;}' + '.sample-show-hide.ng-hide-add, .sample-show-hide.ng-hide-remove {' + '-webkit-transition:all linear 1.0s;' + '-moz-transition:all linear 1.0s;' + '-o-transition:all linear 1.0s;' + 'transition:all linear 1.0s;' + 'display:block !important;' + '}' + '.sample-show-hide.ng-hide-add.ng-hide-add-active,' + '.sample-show-hide.ng-hide-remove {' + '-webkit-transition:all linear 0.2s;' + '-moz-transition:all linear 0.2s;' + '-o-transition:all linear  0.2s;' + 'transition:all linear  0.2s;' + 'opacity:0;' + '}' + '.sample-show-hide.ng-hide-add,' + '.sample-show-hide.ng-hide-remove.ng-hide-remove-active {' + '-webkit-transition:all linear 1.2s;' + '-moz-transition:all linear 1.2s;' + '-o-transition:all linear  1.2s;' + 'transition:all linear  1.2s;' + 'opacity:1;' + '}' + '.animate-if {' + '-webkit-transition: all cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s;' + 'transition: all cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s;' + '}' + '.animate-if.ng-enter, .animate-if.ng-leave {' + '-webkit-transition: all cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s;' + 'transition: all cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s;' + '}' + '.animate-if.ng-enter, .animate-if.ng-leave.ng-leave-active {' + 'opacity: 0;' + '}' + '.animate-if.ng-leave, .animate-if.ng-enter.ng-enter-active {' + 'opacity: 1;' + '}' + '</style>' + '<ul  style="margin-left:60px !important">' + '<li ' + 'node-unique-attrib="{{node.id}}" ' + 'id="{{node.id}}" ' + 'ng-if="node!=null" ' + 'ng-repeat="node in rootFolder" ' + 'class="sample-show-hide" ' + 'style="padding-left:40px; display: block;min-width: 230px;font-size:11px;">' + //width: 140%;
            '<i ' + 'class="rightClickMenu "' + 'ng-class=\'{"fa fa-folder fa-flip-horizontal collapsed" : node.collapsed , "read_only" : node.permissions==1 }\'' + 'ng-show="node.collapsed"' + 'ng-click="select($event,node)">' + '<span class="fa fa-sort-desc fa-rotate-270 direction"></span>' + '</i>' + '<span  ' + 'data-ng-show="node.collapsed" ' + 'class="noteChildren rightClickMenu" ' + 'ng-class=\'{"fa fa-folder fa-flip-horizontal" : node.hasChildrenFolder == true}\' ' + 'ng-click="select($event,node)">' + '</span> ' + '<i  ' + 'class="fa fa-folder-open fa-flip-horizontal expanded rightClickMenu"' + 'ng-class=\'{"read_only": node.permissions==1}\' ' + 'ng-show="!node.collapsed"' + 'ng-click="select($event,node)">' + '<span class="fa fa-sort-desc direction" style="right:36px !important;"></span>' + '</i>' + '<span  ' + 'class="rightClickItem"  ' + 'right-click  ' + 'tree-newnode = "node" ' + 'tree-rightclick-func="treeFunc" ' + 'tree-oldnode ="currentNode.currentNode">' + '</span>' + '<span  ' + 'ng-show="!node.collapsed" ' + 'class="expentChildren rightClickMenu"' + 'ng-class=\'{"fa fa-folder fa-flip-horizontal" : node.hasChildrenFolder == true}\' ng-click="select($event,node)">' + '</span>' + '<span  ' + 'class="rightClickMenu folderitem" ' + 'ng-click="select($event,node)" ' + 'ng-class=\'{ "selected" : (node.id || node.uuid) && (node.id || node.uuid) == (currentNode.currentNode.id || currentNode.currentNode.uuid ) } \'' + 'ng-bind="node[\'label\'].length>30?node[\'label\'].substr(0,20)+\' ...\':node[\'label\']|removeOKM|pNumber">' + '</span> ' + '<div ' + 'tree-func="treeFunc"  class="sample-show-hide" ng-hide="node.collapsed" current-node="currentNode" root-folder="node.children" tree-model>' + '</div>' + '</li>' + '<ul>')(scope));

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
            };
        }
    };
}