'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var editUserInformations = function editUserInformations(uibModal, _user, _JS) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Public/editUserInformations.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, user, JS) {

                $scope.formUserInfoEditName = {};

                $scope.data = {

                    txtPassword: null,
                    txtRePassword: null,
                    txtUsername: user.name,
                    txtEmailname: user.mail,
                    name: user.username,

                    removeExternalFuncs: {},

                    file: null
                };

                $scope.func = {};

                $scope.func.uploadFiles = function () {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(file) {
                        var result, reader;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        if (!(file.length > 0 && file[0].type.match('image.*'))) {
                                            _context.next = 23;
                                            break;
                                        }

                                        if (!(file[0].type == "image/tiff")) {
                                            _context.next = 20;
                                            break;
                                        }

                                        _context.prev = 2;
                                        _context.next = 5;
                                        return JS.addJS('resource/javaScript/tiff.min.js?dev=' + randomVersionName);

                                    case 5:
                                        _context.next = 7;
                                        return $scope.func.convertTIFF2JPEG(file[0]);

                                    case 7:
                                        result = _context.sent;
                                        _context.next = 10;
                                        return JS.removeJS('resource/javaScript/tiff.min.js?dev=' + randomVersionName, 'Tiff,TiffTag');

                                    case 10:
                                        $scope.func.cropImage(result);
                                        _context.next = 18;
                                        break;

                                    case 13:
                                        _context.prev = 13;
                                        _context.t0 = _context['catch'](2);

                                        console.error(_context.t0);
                                        _context.next = 18;
                                        return JS.removeJS('resource/javaScript/tiff.min.js?dev=' + randomVersionName, 'Tiff,TiffTag');

                                    case 18:
                                        _context.next = 21;
                                        break;

                                    case 20:
                                        try {
                                            reader = new FileReader();

                                            reader.onload = function (img) {
                                                $scope.func.cropImage(img.target.result);
                                            };
                                            reader.readAsDataURL(file[0]);
                                        } catch (e) {
                                            console.error(e);
                                        }

                                    case 21:
                                        _context.next = 24;
                                        break;

                                    case 23:
                                        toaster.pop('error', "", "لطفا یک تصویر انتخاب کنید");

                                    case 24:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this, [[2, 13]]);
                    }));

                    return function (_x) {
                        return _ref.apply(this, arguments);
                    };
                }();

                $scope.func.cropImage = function (image) {

                    var modalInstanceCropper = $uibModal.open({
                        template: '\n                                     <style>\n                                        .modal-footer #okButon:hover{\n                                            box-shadow  :  0 0 10px rgba(35,173,255,1);\n                                        }\n                                        .modal-footer #cancelButon:hover{\n                                            box-shadow  :  0 0 10px rgba(255,134,29,1);\n                                        }\n                                        .cropArea {\n                                          background: #E4E4E4;\n                                          overflow: hidden;\n                                          width:500px;\n                                          height:350px;\n                                          margin-left: auto;\n                                          margin-right: auto;\n                                        }\n                                        .activeType{\n                                          color : #337ab7\n                                        }\n                                        .croper-tollbar{\n                                            border: 1px solid;\n                                            border-bottom-left-radius: 5px;\n                                            border-bottom-right-radius: 5px;\n                                            height: 30px;\n                                            margin-right: 220px;\n                                            opacity: 0.5;\n                                            padding-right: 5px;\n                                            padding-top: 2px;\n                                            position: absolute;\n                                            width: 60px;\n                                            z-index: 1000;\n                                        }\n                                        .icon-cropper{\n                                            font-size:25px;\n                                            cursor: pointer;\n                                        }\n                                      </style>\n                                    <div  \n                                        class="modal-header fontStyle" \n                                        ng-bind="\'administration.zl.modal.editUser\'|translate" \n                                        style="font-size: 15px">\n                                    </div>\n                                    <div class="modal-body">\n                                        <form role="form" name="editUserForm">\n                                            <div class="panel-default ">\n                                                <div class="row form-group">\n                                                    <div class="croper-tollbar">\n                                                           <span ng-click="data.areaType=\'square\';"  class="fa fa-square-o icon-cropper" ng-class="{\'activeType\':data.areaType==\'square\'}"></span>\n                                                           <span ng-click="data.areaType=\'circle\';"  class="fa fa-circle-o icon-cropper" ng-class="{\'activeType\':data.areaType==\'circle\'}"></span>\n                                                    </div>\n                                                    <div class="cropArea">\n                                                        <img-crop ng-if="data.areaType==\'square\'" area-type="square" image="data.img" result-image="data.CroppedImage"></img-crop>\n                                                        <img-crop ng-if="data.areaType==\'circle\'" area-type="circle" image="data.img" result-image="data.CroppedImage"></img-crop>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </form>\n                                    </div>\n                                    <div class="modal-footer">\n                                        <div class="row">\n                                            <div class="col-sm-4- pull-left">\n                                                <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>\n                                                            <md-button id="okButon"     class="md-raised" ng-click="editUser(user)">\n                                                                <md-icon md-font-icon="fa fa-edit"></md-icon>\n                                                                <span ng-bind="\'administration.zl.modal.add\'|translate"> </span>\n                                                            </md-button>\n                                                            <md-button id="cancelButon"     class="md-raised" ng-click="cancel()">\n                                                                <md-icon md-font-icon="fa fa-remove"></md-icon>\n                                                                <span ng-bind="\'administration.zl.modal.cancel\'|translate"> </span>\n                                                            </md-button>\n                                                </section>\n                                        \n                                            </div>\n                                        </div>\n                                        \n                                       \n                                    </div>\n                                \n                                ',
                        controller: function controller($scope, $uibModalInstance, img) {

                            $scope.data = {
                                img: img || '',
                                CroppedImage: '',
                                areaType: 'circle'
                            };
                            $scope.cancel = function () {
                                $uibModalInstance.close(false);
                            };
                            $scope.editUser = function () {
                                $uibModalInstance.close({ data: $scope.data.CroppedImage });
                            };
                        },
                        size: 'lg',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            img: function img() {
                                return image;
                            }
                        }
                    });
                    modalInstanceCropper.result.then(function () {
                        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(response) {
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            if (response) {

                                                try {
                                                    _.defer(function () {
                                                        $scope.$apply($scope.data.src = response.data);
                                                    });
                                                    $scope.func.resizeFile(response.data);
                                                } catch (e) {
                                                    _.defer(function () {
                                                        return $scope.$apply($scope.data.src = response.data);
                                                    });
                                                }
                                            }

                                        case 1:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, _this);
                        }));

                        return function (_x2) {
                            return _ref2.apply(this, arguments);
                        };
                    }());
                };

                $scope.func.convertTIFF2JPEG = function (img) {
                    return new Promise(function (resolveTIFF, rejectTIFF) {
                        try {
                            var reader = new FileReader();
                            reader.onerror = function () {
                                return rejectTIFF(e);
                            };
                            reader.onload = function (e) {
                                Tiff.initialize({ TOTAL_MEMORY: 16777216 * 10 });
                                var tiff = new Tiff({ buffer: e.target.result });
                                var canvas = tiff.toCanvas();
                                var newfile = $scope.func.dataURItoBlob(canvas.toDataURL("image/jpeg"), "image/jpeg");
                                var readerFileCanvas = new FileReader();
                                readerFileCanvas.onerror = function () {
                                    return rejectTIFF("عدم تبدیل فرمت tiff ");
                                };
                                readerFileCanvas.onload = function (evt) {
                                    return resolveTIFF(evt.target.result);
                                };
                                readerFileCanvas.readAsDataURL(newfile);
                            };
                            reader.readAsArrayBuffer(img);
                        } catch (e) {
                            console.error(e);
                            rejectTIFF(e);
                        }
                    });
                };

                $scope.func.resizeFile = function (src) {
                    var imageObj = new Image();
                    imageObj.onload = function (img) {
                        // Check for empty images
                        if (imageObj.width > 0 && imageObj.height > 0) {

                            var v = 0;
                            var h = 0;
                            if (imageObj.width > imageObj.height) {
                                v = 150;
                                h = imageObj.height / (imageObj.width / v);
                            } else {
                                h = 150;
                                v = imageObj.width / (imageObj.height / h);
                            }
                            var _canvas = document.createElement("canvas");
                            _canvas.style.visibility = "hidden";
                            _canvas.width = v;
                            _canvas.height = h;
                            document.body.appendChild(_canvas);
                            var context = _canvas.getContext("2d");
                            context.clearRect(0, 0, v, h);
                            context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, v, h);
                            $scope.data.file = $scope.func.dataURItoBlob(_canvas.toDataURL("image/jpeg"), "image/jpeg");
                            document.body.removeChild(_canvas);
                        }
                    };
                    imageObj.onabort = function () {
                        window.document.body.removeChild(canvas);
                    };
                    imageObj.onerror = function () {
                        window.document.body.removeChild(canvas);
                    };
                    imageObj.src = src;
                };

                $scope.func.dataURItoBlob = function (dataURI, dataTYPE) {
                    try {
                        var binary = atob(dataURI.split(',')[1]),
                            array = [];
                        for (var i = 0; i < binary.length; i++) {
                            array.push(binary.charCodeAt(i));
                        }return new Blob([new Uint8Array(array)], { type: dataTYPE });
                    } catch (e) {
                        console.error(e);
                    }
                };

                $scope.func.editPassword = function (form) {
                    if (_.has($scope.formUserInfoEditName.txtPassword, '$setTouched')) $scope.formUserInfoEditName.txtPassword.$setTouched();
                };
                $scope.func.editRePassword = function (form) {
                    if (_.has($scope.formUserInfoEditName.txtRePassword, '$setTouched')) $scope.formUserInfoEditName.txtRePassword.$setTouched();
                };
                $scope.func.editName = function (form) {
                    if (_.has($scope.formUserInfoEditName.txtUsername, '$setTouched')) $scope.formUserInfoEditName.txtUsername.$setTouched();
                };
                $scope.func.editEmail = function (form) {
                    if (_.has($scope.formUserInfoEditName.txtEmailname, '$setTouched')) $scope.formUserInfoEditName.txtEmailname.$setTouched();
                };

                $scope.func.edit = function () {
                    if ((!_.includes([null, ""], $scope.data.txtPassword) || !_.includes([null, ""], $scope.data.txtRePassword)) && $scope.data.txtRePassword != $scope.data.txtPassword) {
                        toaster.pop('info', "", "کلمه عبورحداقل8کاراکترو شامل حروف بزرگ،کوچک،اعدادیاکاراکترهای خاص باشد");
						toaster.pop('error', "", "کلمه عبور و تکرار کلمه عبور یکی نیستند");
                        return;
                    }
                    if ($scope.formUserInfoEditName.$valid == false) {
                        toaster.pop('error', "", "مشکلات فرم را اصلاح کنید");
                        return;
                    }

                    $uibModalInstance.close({
                        username: user.UserId,
                        name: $scope.data.txtUsername,
                        email: $scope.data.txtEmailname,
                        pass: !_.includes([null, ""], $scope.data.txtPassword) ? $scope.data.txtPassword : '',
                        content: $scope.data.file
                    });
                };
                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.$on("$destroy", function () {
                    try {
                        _.forEach(_.clone($scope.data.removeExternalFuncs), function () {
                            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(funcName, src) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.prev = 0;
                                                _context3.next = 3;
                                                return JS.removeJS(src, funcName);

                                            case 3:
                                                _context3.next = 8;
                                                break;

                                            case 5:
                                                _context3.prev = 5;
                                                _context3.t0 = _context3['catch'](0);

                                                console.error(_context3.t0);

                                            case 8:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, _this, [[0, 5]]);
                            }));

                            return function (_x3, _x4) {
                                return _ref3.apply(this, arguments);
                            };
                        }());
                        // clear all data and functions
                        $scope.func = undefined;
                        $scope.data = undefined;
                    } catch (e) {
                        console.error(e);
                    }
                });

                $scope.func.run = function (url) {
                    $.ajax({
                        processData: false,
                        contentType: false,
                        method: "GET",
                        headers: {},
                        url: url
                    }).done(function (res) {
                        try {
                            var img = window.document.getElementById("current-user-image");
                            img.src = url;
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    }).fail(function (err) {
                        try {
                            var img = window.document.getElementById("current-user-image");
                            img.src = err.status == 200 && err.readyState == 4 ? url : '../../../../static/image/user.png';
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    });
                };

                //run
                {
                    $scope.func.run('/KeydocPro/services/rest/auth/getUserImage?user=' + user.username + '&' + Date.parse(new Date()));
                }
            },
            size: 'sm',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                user: function user() {
                    return _user;
                },
                JS: function JS() {
                    return _JS;
                }
            }
        });

        modalInstance.result.then(function (response) {
            if (response) {
                resolve(response);
            } else reject('عدم ویرایش اطلاعات کاربر');
        }, function (error) {
            return reject('عدم ویرایش اطلاعات کاربر');
        });
    });
};