'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var createNewUserInformations = function createNewUserInformations(uibModal, _JS, _service, _users) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Administration/createNewUserInformations.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, toaster, $uibModal, JS, service, Roles, users, profiles) {
                $scope.formUserInfoEditName = {};

                $scope.data = {

                    txtPassword: null,
                    txtRePassword: null,
                    txtUsername: null,
                    txtEmailname: null,
                    txtActive: false,
                    txtName: null,

                    txtProfile: "",
                    profiles: _.clone(profiles),

                    removeExternalFuncs: {},

                    roles: [],
                    src: '../../../../resource/img/user.png',
                    file: null
                };

                _.forEach(Roles, function (role) {
                    $scope.data.roles.push({
                        name: role.id,
                        selectRole: false
                    });
                });

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
                        templateUrl: 'ecma5/ExternalLiberary/Administration/instanceCropper.html?dev=' + randomVersionName,
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
                                                z;
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
                $scope.func.editUserName = function (form) {
                    if (_.has($scope.formUserInfoEditName.txtName, '$setTouched')) $scope.formUserInfoEditName.txtName.$setTouched();
                };

                $scope.func.edit = function (form) {
                    $scope.func.editPassword();
                    $scope.func.editRePassword();
                    $scope.func.editName();
                    $scope.func.editEmail();
                    $scope.func.editUserName();
                    try {
                        if ((!_.includes([null, ""], $scope.data.txtPassword) || !_.includes([null, ""], $scope.data.txtRePassword)) && $scope.data.txtRePassword != $scope.data.txtPassword) throw new Error("کلمه عبور و تکرار کلمه عبور یکی نیستند");
                        if (_.isString($scope.data.txtName)) if (_.includes(users, $scope.data.txtName.toLowerCase())) throw new Error("این نام کاربری در لیست وجود دارد");
                        if ($scope.formUserInfoEditName.$valid == false) throw new Error("مشکلات فرم را اصلاح کنید");
                        if (_.includes([null, ""], $scope.data.txtProfile)) throw new Error("لطفا یک پروفایل انتخاب کنید");
                        $uibModalInstance.close({
                            username: $scope.data.txtName,
                            name: $scope.data.txtUsername,
                            email: $scope.data.txtEmailname,
                            pass: $scope.data.txtPassword,
                            roles: _.map(_.filter($scope.data.roles, function (role) {
                                return role.selectRole;
                            }), 'name'),
                            content: $scope.data.file,
                            active: $scope.data.txtActive,
                            profile: $scope.data.txtProfile
                        });
                    } catch (e) {
                        toaster.pop('error', '', e.message || e);
                    }
                };
                $scope.func.cancel = function () {
                    return $uibModalInstance.close(false);
                };

                $scope.$on("$destroy", function () {
                    try {

                        /*try{
                            $(".modal-body form[name=formUserInfoEditName]").getNiceScroll().remove();
                        }catch(error){
                            console.error(error);
                        }*/

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

                $scope.func.run = function () {

                    try {
                        /*_.defer(()=>{
                            $(".modal-body form[name=formUserInfoEditName]").niceScroll({
                                cursorcolor:"#ed4356",
                                cursorwidth: "4px",
                                cursorborderradius: "0px",
                                rtlmode: false
                            });
                        },2000);*/
                        _.defer(function () {
                            return $scope.$apply();
                        });
                    } catch (e) {
                        console.error(e);
                    }
                };

                //run
                {
                    $scope.func.run();
                }
            },
            size: 'sm',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                JS: function JS() {
                    return _JS;
                },
                service: function service() {
                    return _service;
                },
                Roles: function Roles() {
                    return _service.auth.getRoles().then(function (res) {
                        return res.data;
                    });
                },
                users: function users() {
                    return _users;
                },
                profiles: function profiles() {
                    return _service.auth.getProfilesName().then(function (res) {
                        return _.has(res.data, 'originalElement') ? res.data.originalElement : res.data;
                    });
                }
            }
        });

        modalInstance.result.then(function (response) {
            if (response) {
                resolve(response);
            } else reject('عدم افزودن کاربر جدید');
        }, function (error) {
            return reject('عدم افزودن کاربر جدید');
        });
    });
};