'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var cretaeFilesDesktopCtrl = function cretaeFilesDesktopCtrl(uibModal, _currentNode, _service, _isDigitalSignPermit, _JS) {
    return new Promise(function (resolve, reject) {
        var _this = this;

        var modalInstance = uibModal.open({
            templateUrl: 'ecma5/ExternalLiberary/Desktop/cretaeFilesDesktop.html?dev=' + randomVersionName,
            controller: function controller($scope, $uibModalInstance, $upload, toaster, currentNode, service, childrenList, isDigitalSignPermit, JS) {

                $scope.data = {
                    fileData: null,
                    path: null,
                    uploads: {},
                    files: {},
                    startUpload: false,
                    childsNames: {},
                    filesList: {},
                    isDigitalSignPermit: isDigitalSignPermit
                };

                if (childrenList != null) $scope.data.childsNames = _.keyBy(_.map(childrenList, function (children) {
                    return children.path.split("/").pop();
                }));else $scope.data.childsNames = {};

                $scope.func = {};

                $scope.func.addFiles = function (files) {

                    _.forEach(files, function () {
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(file) {
                            var imageItem, reader;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:

                                            console.log(file);

                                            if (!$scope.data.childsNames[file.name]) {
                                                _context.next = 5;
                                                break;
                                            }

                                            toaster.pop('error', '', 'سند ' + file.name + ' در این پوشه وجود دارد');
                                            _context.next = 47;
                                            break;

                                        case 5:
                                            if (!_.has($scope.data.filesList, file.name)) {
                                                _context.next = 9;
                                                break;
                                            }

                                            toaster.pop('error', '', 'این سند در لیست ارسال قراردارد');
                                            _context.next = 47;
                                            break;

                                        case 9:
                                            if (!file.type.match('image.*')) {
                                                _context.next = 41;
                                                break;
                                            }

                                            if (!(file.type == "image/tiff")) {
                                                _context.next = 19;
                                                break;
                                            }

                                            imageItem = {
                                                file: file,
                                                status: 'New',
                                                Upload: null,
                                                isSelect: false,
                                                color: '#000'
                                            };
                                            _context.next = 14;
                                            return $scope.func.createCanvas(file.name.split(".").pop());

                                        case 14:
                                            imageItem.url = _context.sent;

                                            $scope.data.filesList[file.name] = _.clone(imageItem);
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });
                                            /*todo convert tiff format to jpeg (web stndard)
                                            try {
                                                await JS.addJS('resource/javaScript/tiff.min.js');
                                                let result = await  $scope.func.convertTIFF2JPEG(file);
                                                await JS.removeJS('resource/javaScript/tiff.min.js', 'Tiff,TiffTag');
                                                $scope.data.filesList[file.name] = {
                                                    file : file,
                                                    status : 'New',
                                                    Upload : null,
                                                    isSelect : false,
                                                    color : '#fff',
                                                    url : result
                                                };
                                                _.defer(()=>$scope.$apply());
                                            } catch (e) {
                                                console.error(e);
                                                await JS.removeJS('resource/javaScript/tiff.min.js', 'Tiff,TiffTag');
                                                $scope.data.filesList[file.name] = {
                                                    file : file,
                                                    status : 'New',
                                                    Upload : null,
                                                    isSelect : false,
                                                    color : '#fff',
                                                    url : "./../../../static/backgrounds/1.jpg"
                                                };
                                                _.defer(()=>$scope.$apply());
                                            }*/
                                            _context.next = 39;
                                            break;

                                        case 19:
                                            _context.prev = 19;

                                            if (!(file.size <= 1500000)) {
                                                _context.next = 26;
                                                break;
                                            }

                                            reader = new FileReader();

                                            reader.onload = function (img) {
                                                $scope.data.filesList[file.name] = {
                                                    file: file,
                                                    status: 'New',
                                                    Upload: null,
                                                    isSelect: false,
                                                    color: '#fff',
                                                    url: img.target.result
                                                };
                                                _.defer(function () {
                                                    return $scope.$apply();
                                                });
                                            };
                                            reader.readAsDataURL(file);
                                            _context.next = 32;
                                            break;

                                        case 26:
                                            imageItem = {
                                                file: file,
                                                status: 'New',
                                                Upload: null,
                                                isSelect: false,
                                                color: '#000'
                                            };
                                            _context.next = 29;
                                            return $scope.func.createCanvas(file.name.split(".").pop());

                                        case 29:
                                            imageItem.url = _context.sent;

                                            $scope.data.filesList[file.name] = _.clone(imageItem);
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });

                                        case 32:
                                            _context.next = 39;
                                            break;

                                        case 34:
                                            _context.prev = 34;
                                            _context.t0 = _context['catch'](19);

                                            console.error(_context.t0);
                                            $scope.data.filesList[file.name] = {
                                                file: file,
                                                status: 'New',
                                                Upload: null,
                                                isSelect: false,
                                                color: '#fff',
                                                url: "./../../../static/backgrounds/1.jpg"
                                            };
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });

                                        case 39:
                                            _context.next = 47;
                                            break;

                                        case 41:
                                            imageItem = {
                                                file: file,
                                                status: 'New',
                                                Upload: null,
                                                isSelect: false,
                                                color: '#000'
                                            };
                                            _context.next = 44;
                                            return $scope.func.createCanvas(file.name.split(".").pop());

                                        case 44:
                                            imageItem.url = _context.sent;

                                            $scope.data.filesList[file.name] = _.clone(imageItem);
                                            _.defer(function () {
                                                return $scope.$apply();
                                            });

                                        case 47:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, _this, [[19, 34]]);
                        }));

                        return function (_x) {
                            return _ref.apply(this, arguments);
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

                $scope.func.sendingFile2Server = function (name) {
                    return new Promise(function (resolve, reject) {
                        try {
                            $scope.data.filesList[name].status = "Sending";
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            $scope.data.filesList[name].Upload = {
                                percent: 0,
                                filename: name,
                                path: currentNode.path + '/' + name,
                                upload: $upload.upload({
                                    url: '/KeydocPro/services/rest/document/createSimple',
                                    data: {
                                        docPath: currentNode.path + '/' + name,
                                        isSigned: $scope.data.filesList[name].isSelect,
                                        content: $scope.data.filesList[name].file,
                                        sizeOfFile: $scope.data.filesList[name].file.size
                                    },
                                    headers: { 'Authorization': decodeURIComponent(_.replace(isCookieFunction("Authorization"), "Bearer", "Bearer ")) }
                                }).progress(function (evt) {
                                    _.defer(function () {
                                        return $scope.$apply($scope.data.filesList[name].Upload.percent = parseInt(100.0 * evt.loaded / evt.total));
                                    });
                                }).success(function (data, status, headers, config) {
                                    $scope.data.filesList[name].status = "Success";
                                    resolve("سند " + name + " با موفقیت ارسال شد.");
                                }).error(function (error) {
                                    $scope.data.filesList[name].status = "Error";
                                    reject("مشکلی در ارسال سند  " + name + " به سرور رخ داده است.");
                                })
                            };
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        } catch (e) {
                            reject("مشکلی در ارسال سند  " + name + " به سرور رخ داده است.");
                        } finally {
                            _.defer(function () {
                                return $scope.$apply();
                            });
                        }
                    });
                };

                $scope.func.startUpload = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                    var keys, i, name, result;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if (!(_.filter($scope.data.filesList, function (file) {
                                        return file.status == 'Sending';
                                    }).length > 0)) {
                                        _context2.next = 4;
                                        break;
                                    }

                                    toaster.pop("error", "", "تا اتمام ارسال سند ها لطفا منتظر بمانید");
                                    _context2.next = 34;
                                    break;

                                case 4:
                                    if (!(_.filter($scope.data.filesList, function (file) {
                                        return _.includes(["New", "Error"], file.status);
                                    }).length == 0)) {
                                        _context2.next = 8;
                                        break;
                                    }

                                    toaster.pop('error', '', 'لطفا حداقل یک سند جدید برای ارسال انتخاب کنید');
                                    _context2.next = 34;
                                    break;

                                case 8:
                                    if (!(isCookieFunction('Authorization') != null)) {
                                        _context2.next = 32;
                                        break;
                                    }

                                    keys = _.keys($scope.data.filesList);
                                    i = 0;

                                case 11:
                                    if (!(i < keys.length)) {
                                        _context2.next = 30;
                                        break;
                                    }

                                    name = keys[i];

                                    if (!(_.has($scope.data.filesList, name) && _.includes(["New", "Error"], $scope.data.filesList[name].status))) {
                                        _context2.next = 27;
                                        break;
                                    }

                                    _context2.prev = 14;
                                    _context2.next = 17;
                                    return $scope.func.sendingFile2Server(name);

                                case 17:
                                    result = _context2.sent;

                                    toaster.pop("success", "", result);
                                    _context2.next = 24;
                                    break;

                                case 21:
                                    _context2.prev = 21;
                                    _context2.t0 = _context2['catch'](14);

                                    toaster.pop("error", "", _context2.t0 || _context2.t0.message);

                                case 24:
                                    _context2.prev = 24;

                                    _.defer(function () {
                                        return $scope.$apply();
                                    });
                                    return _context2.finish(24);

                                case 27:
                                    i++;
                                    _context2.next = 11;
                                    break;

                                case 30:
                                    _context2.next = 34;
                                    break;

                                case 32:
                                    toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                                    $scope.func.cancelUpload();

                                case 34:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this, [[14, 21, 24, 27]]);
                }));

                $scope.func.onDeleteItemClick = function (key) {
                    if ($scope.data.filesList[key]) $scope.func.onCancelFileClick(key);
                };
                $scope.func.onCancelFileClick = function () {
                    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(key) {
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        try {
                                            if (_.has($scope.data.filesList[key], 'Upload') && $scope.data.filesList[key].Upload != null && $scope.data.filesList[key].status == "Sending") $scope.data.filesList[key].Upload.upload.abort();
                                            $scope.data.filesList[key] = undefined;
                                            delete $scope.data.filesList[key];
                                        } catch (e) {
                                            console.error(e);
                                        }

                                    case 1:
                                    case 'end':
                                        return _context3.stop();
                                }
                            }
                        }, _callee3, _this);
                    }));

                    return function (_x2) {
                        return _ref3.apply(this, arguments);
                    };
                }();
                $scope.func.uploadAgain = function () {
                    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(key) {
                        var result;
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        if (!(isCookieFunction('Authorization') != null)) {
                                            _context4.next = 26;
                                            break;
                                        }

                                        _context4.prev = 1;

                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        $scope.data.filesList[key].Upload = undefined;
                                        delete $scope.data.filesList[key].Upload;
                                        _context4.prev = 5;
                                        _context4.next = 8;
                                        return $scope.func.sendingFile2Server(key);

                                    case 8:
                                        result = _context4.sent;

                                        toaster.pop("success", "", result);
                                        _context4.next = 15;
                                        break;

                                    case 12:
                                        _context4.prev = 12;
                                        _context4.t0 = _context4['catch'](5);

                                        toaster.pop("error", "", _context4.t0 || _context4.t0.message);

                                    case 15:
                                        _context4.prev = 15;

                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        return _context4.finish(15);

                                    case 18:
                                        _.defer(function () {
                                            return $scope.$apply();
                                        });
                                        _context4.next = 24;
                                        break;

                                    case 21:
                                        _context4.prev = 21;
                                        _context4.t1 = _context4['catch'](1);

                                        console.error(_context4.t1);

                                    case 24:
                                        _context4.next = 28;
                                        break;

                                    case 26:
                                        toaster.pop("error", "", "لطفا ابتدا وارد سیستم شوید.");
                                        $scope.func.cancel();

                                    case 28:
                                    case 'end':
                                        return _context4.stop();
                                }
                            }
                        }, _callee4, _this, [[1, 21], [5, 12, 15, 18]]);
                    }));

                    return function (_x3) {
                        return _ref4.apply(this, arguments);
                    };
                }();

                $scope.func.createCanvas = function (name) {
                    return new Promise(function (resolveTIFF, rejectTIFF) {
                        try {

                            var c = document.createElement("canvas");
                            c.width = 120;
                            c.height = 80;
                            var ctx = c.getContext("2d");
                            ctx.clearRect(-500, -500, c.width + 500, c.height + 500);

                            ctx.rect(0, 0, c.width, c.height);
                            // add linear gradient
                            var grd = ctx.createLinearGradient(0, 0, c.width, c.height);
                            // light blue
                            grd.addColorStop(1, '#8ED6FF');
                            // dark blue
                            grd.addColorStop(0, '#004CB3');
                            ctx.fillStyle = grd;
                            ctx.fill();

                            ctx.globalAlpha = 1;
                            ctx.fillStyle = '#fff';
                            ctx.font = '30px arial,sans-serif';
                            ctx.setTransform(1, 0, 0, 1, 25, 10);
                            ctx.fillText(name, 10, 40);
                            resolveTIFF(c.toDataURL());
                        } catch (e) {
                            resolveTIFF("./../../../static/backgrounds/1.jpg");
                        }
                    });
                };

                $scope.func.cancelUpload = function () {
                    return $scope.func.close();
                };
                $scope.func.onCancelFileUpload = function (key) {
                    try {
                        if (_.has($scope.data.filesList[key], 'Upload') && $scope.data.filesList[key].Upload != null && $scope.data.filesList[key].status == "Sending") {
                            $scope.data.filesList[key].Upload.upload.abort();
                            $scope.data.filesList[key].status = "Error";
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };
                $scope.func.back = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                    var key;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    if (!(_.filter($scope.data.filesList, function (upload) {
                                        return upload.status == "Sending";
                                    }).length > 0)) {
                                        _context5.next = 3;
                                        break;
                                    }

                                    toaster.pop("warning", "", "لطفا تا ارسال کامل سند ها منتظر بمانید.");
                                    return _context5.abrupt('return');

                                case 3:
                                    _context5.t0 = regeneratorRuntime.keys($scope.data.filesList);

                                case 4:
                                    if ((_context5.t1 = _context5.t0()).done) {
                                        _context5.next = 17;
                                        break;
                                    }

                                    key = _context5.t1.value;

                                    if (!($scope.data.filesList[key].status == "Error")) {
                                        _context5.next = 15;
                                        break;
                                    }

                                    _context5.prev = 7;
                                    _context5.next = 10;
                                    return service.document.remove($scope.data.filesList[key].Upload.path);

                                case 10:
                                    _context5.next = 15;
                                    break;

                                case 12:
                                    _context5.prev = 12;
                                    _context5.t2 = _context5['catch'](7);

                                    console.error(_context5.t2);

                                case 15:
                                    _context5.next = 4;
                                    break;

                                case 17:

                                    /*_.forEach($scope.data.filesList , (file, name) => {
                                        if(file.status == "Sending")
                                            file.Upload.upload.abort();
                                    });*/

                                    $uibModalInstance.close(true);

                                case 18:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, _this, [[7, 12]]);
                }));

                $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    try {
                                        // clear all data and functions
                                        $scope.func = undefined;
                                        $scope.data = undefined;
                                    } catch (e) {
                                        console.error(e);
                                    }

                                case 1:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, _this);
                })));
            },

            size: 'md',
            backdrop: 'static', // false,
            keyboard: false,
            resolve: {
                currentNode: function currentNode() {
                    return _currentNode;
                },
                service: function service() {
                    return _service;
                },
                childrenList: function childrenList() {
                    return _service.document.listChild(_currentNode.uuid).then(function (res) {
                        return res.data;
                    }, function (error) {
                        return [];
                    });
                },
                isDigitalSignPermit: function isDigitalSignPermit() {
                    return _isDigitalSignPermit;
                },
                JS: function JS() {
                    return _JS;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response) resolve(response);else reject('مشکل');
        }, function (error) {
            return reject('مشکل');
        });

        //---------------------------------------------------------------------------------------------------------------
    });
};