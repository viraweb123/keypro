'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var viewClockFunction = function viewClockFunction(uibModal) {
    return new Promise(function (resolve, reject) {
        try {

            var modalInstance = uibModal.open({
                templateUrl: 'ecma5/ExternalLiberary/Public/viewClock.html?dev=' + randomVersionName,
                controller: function controller($scope, $uibModalInstance) {

                    $scope.data = {
                        canvas: null,
                        lookupTable: {
                            '1': '۱',
                            '2': '۲',
                            '3': '۳',
                            '4': '۴',
                            '5': '۵',
                            '6': '۶',
                            '7': '۷',
                            '8': '۸',
                            '9': '۹',
                            '10': '۱۰',
                            '11': '۱۱',
                            '12': '۱۲'
                        },
                        ctx: null,
                        radius: null,
                        clockInterval: null,
                        color: '#5d9ce9'

                    };

                    $scope.func = {};

                    $scope.func.cancel = function () {
                        $uibModalInstance.close(true);
                    };

                    $scope.func.drawClock = function () {
                        $scope.func.drawFace($scope.data.ctx, $scope.data.radius);
                        $scope.func.drawNumbers($scope.data.ctx, $scope.data.radius);
                        $scope.func.drawTime($scope.data.ctx, $scope.data.radius);
                    };
                    $scope.func.drawFace = function (ctx, radius) {
                        var grad;
                        ctx.beginPath();
                        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                        ctx.fillStyle = '#FFF';
                        ctx.fill();
                        grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
                        grad.addColorStop(0, $scope.data.color);
                        grad.addColorStop(1, $scope.data.color);
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = radius * 0.1;
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
                        ctx.fillStyle = 'black';
                        ctx.fill();
                    };
                    $scope.func.drawNumbers = function (ctx, radius) {
                        var ang;
                        var num;
                        ctx.font = radius * 0.15 + "px arial";
                        ctx.textBaseline = "middle";
                        ctx.textAlign = "center";
                        for (num = 1; num < 13; num++) {
                            ang = num * Math.PI / 6;
                            ctx.rotate(ang);
                            ctx.translate(0, -radius * 0.85);
                            ctx.rotate(-ang);
                            ctx.fillText($scope.data.lookupTable[num.toString()], 0, 0);
                            ctx.rotate(ang);
                            ctx.translate(0, radius * 0.85);
                            ctx.rotate(-ang);
                        }
                    };
                    $scope.func.drawTime = function (ctx, radius) {
                        var now = new Date();
                        var hour = now.getHours();
                        var minute = now.getMinutes();
                        var second = now.getSeconds();
                        //hour
                        hour = hour % 12;
                        hour = hour * Math.PI / 6 + minute * Math.PI / (6 * 60) + second * Math.PI / (360 * 60);
                        $scope.func.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
                        //minute
                        minute = minute * Math.PI / 30 + second * Math.PI / (30 * 60);
                        $scope.func.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
                        // second
                        second = second * Math.PI / 30;
                        $scope.func.drawHand(ctx, second, radius * 0.9, radius * 0.02);
                    };
                    $scope.func.drawHand = function (ctx, pos, length, width) {
                        ctx.beginPath();
                        ctx.lineWidth = width;
                        ctx.lineCap = "round";
                        ctx.moveTo(0, 0);
                        ctx.rotate(pos);
                        ctx.lineTo(0, -length);
                        ctx.stroke();
                        ctx.rotate(-pos);
                    };

                    $scope.func.run = function () {
                        try {

                            try {
                                clearInterval($scope.data.clockInterval);
                                $scope.data.clockInterval = null;
                            } catch (err) {
                                console.error(err);
                            }

                            if ($scope.data.canvas != null) {
                                try {
                                    // Store the current transformation matrix
                                    $scope.data.ctx.save();
                                    // Use the identity matrix while clearing the canvas
                                    $scope.data.ctx.setTransform(1, 0, 0, 1, 0, 0);
                                    $scope.data.ctx.clearRect(0, 0, $scope.data.canvas.width, $scope.data.canvas.height);
                                    // Restore the transform
                                    $scope.data.ctx.restore();
                                } catch (e) {
                                    console.error(e);
                                }
                            } else {
                                $scope.data.canvas = window.document.querySelector("canvas#canvasClockViewer");
                                $scope.data.ctx = $scope.data.canvas.getContext("2d");
                            }
                            _.defer(function () {
                                $scope.data.radius = $scope.data.canvas.height / 2;
                                $scope.data.ctx.translate($scope.data.radius, $scope.data.radius);
                                $scope.data.radius = $scope.data.radius * 0.90;
                                $scope.data.clockInterval = setInterval($scope.func.drawClock, 1000);
                            }, 100);
                        } catch (e) {
                            $scope.func.cancel();
                        }
                    };

                    $scope.func.changeColorUpdate = function () {
                        try {
                            //$scope.data.color = '#' + jscolor;
                            _.defer(function () {
                                return $scope.$apply();
                            });
                            $scope.func.run();
                        } catch (e) {}
                    };

                    _.defer(function () {
                        $scope.func.run();
                        $(".modal-body input.select-color").bind("change", function () {
                            //$scope.func.changeColorUpdate();
                        });
                    }, 1500);

                    $scope.$on("$destroy", _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        try {

                                            try {
                                                clearInterval($scope.data.clockInterval);
                                            } catch (err) {
                                                console.error(err);
                                            }
                                            try {
                                                $(".modal-body input.select-color").unbind("change");
                                            } catch (err) {
                                                console.error(err);
                                            }
                                            $scope.func = undefined;
                                            $scope.data = undefined;
                                        } catch (e) {
                                            console.error(e);
                                        }

                                    case 1:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, _callee, undefined);
                    })));
                },
                size: 'md',
                backdrop: 'static', // false,
                keyboard: false,
                resolve: {}
            });
            modalInstance.result.then(function (response) {
                return resolve(true);
            }, function (error) {
                return resolve(true);
            });
        } catch (e) {
            resolve(true);
        }
    });
};