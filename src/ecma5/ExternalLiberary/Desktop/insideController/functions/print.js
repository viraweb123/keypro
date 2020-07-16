'use strict';

var printDesktopCtrl = function printDesktopCtrl($scope, desktopService, JSManagement, CSSManagement, toaster, $uibModal, userInfoService, Authentication) {
    return new Promise(function (resolve, reject) {
        try {

            $scope.func.print = function (e) {
                e.preventDefault();

                if (_.isArray($scope.data.selectedItems) && $scope.data.selectedItems.length >= 1) {

                    if (_.has($scope.data.selectedItems[0], 'group') && $scope.data.selectedItems[0].group != "trash") {

                        if ($scope.data.selectedItems.length == 1) {

                            if ($scope.data.selectedItems[0].type == 'FILE') {

                                if (isCookieFunction("Authorization") != null) {

                                    if ($scope.data.printPreviewWindow != null) {
                                        try {
                                            $scope.data.printPreviewWindow.close();
                                            $scope.data.printPreviewWindow = null;
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }
                                    $scope.data.printPreviewWindow = window.open('', "_blank", 'menubar=0,resizable=0,toolbar=0,location=0,height=360,width=720,');

                                    $scope.data.printPreviewWindow.document.write('\n                                            <html  style="width: 100%; height: 100%;">\n                                                <head>\n                                                    <meta charset="utf-8" />\n                                                    <meta http-equiv="Access-Control-Allow-Origin" content="*"/>\n                                                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n                                                    <header name = "Access-Control-Allow-Origin" value = "*" />\n                                                    <title>KeydocPro</title>\n                                                </head>\n                                                <body style="margin:0px;">\n                                                    <iframe\n                                                        style="width:100%;height:100%"\n                                                        id="printPreview"\n                                                        src = "/KeydocPro/services/rest/convertor/topdf?uuid=' + $scope.data.selectedItems[0].uuid + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + '&' + Date.parse(new Date()) + '"                                                onload="printPreview()"\n                                                    >\n                                                    </iframe>\n                                                    \n                                                    <script type="text/javascript">\n                                                        function printPreview(){\n                                                            //window.document.getElementById("printPreview").addEventListener("message", listener, true);\n                                                            //var iframeWin = document.getElementById("printPreview").contentWindow;\n                                                            //iframeWin.postMessage("start print", "*");   \n                                                        }\n                                                        \n                                                        //src = "http://deeplearning.net/tutorial/deeplearning.pdf" \n                    \n                                                        \n                                                    </script>\n                                                </body>    \n                                            </html>\n                                        ');
                                } else {
                                    toaster.pop('error', "", 'لطفا ابتدا وارد سیستم شوید.');
                                }
                            } else {
                                toaster.pop('warning', "", 'لطفا جهت گرفتن پرینت فقط از سند استفاده کنید .');
                            }
                        } else {

                            console.log("------------------------------------------------------");
                            console.log($scope.data.selectedItems);

                            var index = _.findIndex($scope.data.selectedItems, function (item) {
                                return item.type != 'FILE' || item.mimeType != 'application/pdf';
                            });
                            if (index < 0) {

                                if (isCookieFunction("Authorization") != null) {

                                    if ($scope.data.printPreviewWindow != null) {
                                        try {
                                            $scope.data.printPreviewWindow.close();
                                            $scope.data.printPreviewWindow = null;
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }

                                    var query = _.join(_.map($scope.data.selectedItems, function (item) {
                                        return 'docId=' + item.uuid;
                                    }), '&');
                                    console.log(query);

                                    $scope.data.printPreviewWindow = window.open('', "_blank", 'menubar=0,resizable=0,toolbar=0,location=0,height=360,width=720,');

                                    //src = "/KeydocPro/services/rest/convertor/topdf?uuid=${$scope.data.selectedItems[0].uuid}&authId=${decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', ''))}&${Date.parse(new Date())}"                                    style="width: 100%; height: 100%;"


                                    $scope.data.printPreviewWindow.document.write('\n                                    <html  style="width: 100%; height: 100%;">\n                                        <head>\n                                            <meta charset="utf-8" />\n                                            <meta http-equiv="Access-Control-Allow-Origin" content="*"/>\n                                            <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n                                            <header name = "Access-Control-Allow-Origin" value = "*" />\n                                            <title>KeydocPro</title>\n                                        </head>\n                                        <body style="margin:0px;">\n                                            <iframe\n                                                id="printPreview"\n                                                src = "/KeydocPro/services/rest/convertor/toMergePdfs?' + query + '&authId=' + decodeURIComponent(isCookieFunction("Authorization").replace('Bearer', '')) + '&' + Date.parse(new Date()) + '"                                    style="width: 100%; height: 100%;"\n                                                onload="printPreview()"\n                                            >\n                                            </iframe>\n                                            \n                                            <script type="text/javascript">\n                                                function printPreview(){\n                                                    //window.document.getElementById("printPreview").addEventListener("message", listener, true);\n                                                    //var iframeWin = document.getElementById("printPreview").contentWindow;\n                                                    //iframeWin.postMessage("start print", "*");   \n                                                }\n                                                \n                                                //src = "http://deeplearning.net/tutorial/deeplearning.pdf" \n            \n                                                \n                                            </script>\n                                        </body>    \n                                    </html>\n                                ');
                                } else {
                                    toaster.pop('error', "", 'لطفا ابتدا وارد سیستم شوید.');
                                }
                            } else {
                                toaster.pop('warning', "", 'لطفا جهت گرفتن پرینت فقط از سند PDF استفاده کنید .');
                            }
                        }
                    } else {
                        toaster.pop('warning', "", 'امکان پرینت آیتم های داخل سطل زباله وجود ندارد.');
                    }
                } else {
                    toaster.pop('warning', "", "لطفا حداقل یک سند انتخاب کنید .");
                }
            };

            resolve(true);
        } catch (e) {

            reject("امکان ایجاد صفحه نکته وجود ندارد.");
        }
    });
};