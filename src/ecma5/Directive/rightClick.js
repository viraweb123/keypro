"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rightClick;
function rightClick($parse, $compile) {
    'ngInject';

    return {
        restrict: "A",
        scope: {
            treeNewnode: "=",
            treeRightclickFunc: "=",
            treeOldnode: "="
        },
        link: function link(scope, iElement, iAttrs) {
            var subcomponent = $compile("<ul \n                    id=\"contextMenu\" \n                    class=\"dropdown-menu\" \n                    role=\"menu\" \n                    style=\"display:none;border-radius:0px !important;\"> \n                    <li \n                        ng-hide=\"(treeNewnode.permissions==1 && item.readOnly==true) ||\n                                 (treeNewnode.root &&  item.rootAccess==true)\n                               \"\n                        class=\"itemClick row form-group col-sm-12 ng-scope\" \n                        ng-repeat=\"(key,item) in treeRightclickFunc.list \" \n                        style=\"padding: 2px; margin: 2px ! important;\"\n                        >\n                        <div style=\"text-align: center; padding:4px 8px 4px 8px; margin: 0px;\" \n                             class=\"col-sm-2 pull-right\">\n                            <span \n                                class=\"col-sm-12 fa-fw {{item.icon}}\" \n                                style=\"font-size:15px;margin-right: 0px;\"><!--top: 8px;-->\n                            </span>\n                        </div>\n                        <div style=\"text-align: right; padding: 4px 8px 4px 8px; margin: 0px;\" \n                             class=\"col-sm-10 pull-left\">\n                            <a  \n                                class=\"itemMenu\" \n                                tabindex=\"-1\" \n                                ng-click=\"item.func(treeNewnode)\" \n                                style=\"padding: 0px;margin: 0px;\" >\n                                <span ng-bind=\"item.title\"  \n                                        style=\"word-wrap: break-word;word-break: break-all;float:right;max-width:100%;font-size: 12px;\">\n                                </span>\n                            </a>\n                        </div>\n\n                    </li>\n                </ul>\n                <style>\n                    .dropdown-menu {}\n                    .dropdown-menu .itemMenu {\n                        color: #000000;\n                        cursor: pointer;\n                        margin-right:5px;\n                    }\n                    #contextMenu li{\n                        transition-duration: 0.5s;\n                        transition-property: background-color;\n                        transition-timing-function: ease-in;\n                    }\n                    #contextMenu li:hover {\n                        background-color:#aaddff;\n                        color:white;\n                    }\n                    #contextMenu li:hover > span {\n                        color:white;\n                    }\n                    #contextMenu li:hover a{\n                        color:white;\n                        background-color: transparent !important;\n                    }\n                </style>")(scope);
            iElement.html('').append(subcomponent);
            $.fn.rightClick = function (settings) {
                function getMenuPosition(mouse, direction, scrollDir) {
                    var win = $(window)[direction](),
                        scroll = $(window)[scrollDir](),
                        menu = $(settings.menuSelector)[direction](),
                        position = mouse + scroll;
                    // opening menu would pass the side of the page
                    if (mouse + menu > win && menu < mouse) position -= menu;
                    return position;
                }
                $(document).bind("contextmenu", function (e) {
                    return false;
                });
                return this.each(function () {
                    $(this).on("contextmenu", function (e) {
                        $(document).click(function () {
                            $(settings.menuSelector).hide();
                        });
                        $(document).click();
                        scope.treeOldnode = scope.treeNewnode;
                        var $menu = $(settings.menuSelector).data("invokedOn", $(e.target)).show().css({
                            position: "absolute",
                            right: "auto",
                            left: "auto"
                        }).off('click').on('click', 'a', function (e) {
                            $menu.hide();
                            var $invokedOn = $menu.data("invokedOn");
                            var $selectedMenu = $(e.target);
                            settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                        });

                        if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) $menu.css({ width: "40%", top: $(".parent").scrollTop() + e.clientY - (e.clientY < 300 ? 95 : 330) });else $menu.css({ top: getMenuPosition(e.clientY, 'height', 'scrollTop') - 50 });
                        return;
                    });
                });
            };
            if ($(iElement).find("ul").length) {
                $(iElement).siblings(".rightClickMenu").rightClick({
                    menuSelector: $(iElement).find("ul"),
                    menuSelected: function menuSelected(invokedOn, selectedMenu) {}
                });
            }
        }
    };
}