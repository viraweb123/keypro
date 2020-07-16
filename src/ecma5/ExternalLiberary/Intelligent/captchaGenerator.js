'use strict';

var captchaGenerator = function captchaGenerator(canvasSelector, number, backgroundImagePath) {
    return new Promise(function (resolve, reject) {
        try {
            var canvas;
            var ctx;
            var alphanum;
            var randomGeneratorFuncStyle;

            (function () {
                canvas = window.document.querySelector(canvasSelector);
                ctx = canvas.getContext('2d');

                ctx.clearRect(-500, -500, canvas.width + 1000, canvas.height + 1000);
                //ctx.clearRect(-100,-100,200,200)
                alphanum = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'); //ctx.drawImage(player, 0, 0, w, h, 0, 0, 70, 70);

                var digit = "";
                var value = "";

                randomGeneratorFuncStyle = [function (ctx, text) {
                    ctx.setTransform(1, -0.2, 0, 1, 0, 0);
                    ctx.fillText(text, 15, 40);
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.save();
                }, function (ctx, text) {
                    ctx.setTransform(1, -0.2, 0.5, 1, 0, 0);
                    ctx.fillText(text, 0, 40);
                    ctx.setTransform(0, -0.6, 1, 0, 1, 0);
                    ctx.save();
                }, function (ctx, text) {
                    ctx.setTransform(1, 0.32, 0, 1, 0, 0);
                    ctx.fillText(text, 20, 12);
                    ctx.setTransform(1, 0.05, 0, 1, 0, 0);
                    ctx.save();
                }, function (ctx, text) {
                    ctx.setTransform(1, 0.2, 1, 1, 0, 0);
                    ctx.fillText(text, 0, 25);
                    ctx.setTransform(1, -0.3, 1, 1, 0, 0);
                    ctx.save();
                }, function (ctx, text) {
                    ctx.setTransform(1, -0.44, 0, 0.5, 0, 0);
                    ctx.fillText(text, 10, 98);
                    ctx.setTransform(1, 0.27, 1, 0.5, -0.5, 0);
                    ctx.save();
                }, function (ctx, text) {
                    ctx.setTransform(1, 0.3, 1, 1, 0, 0);
                    ctx.fillText(text, 0, 20);
                    ctx.setTransform(1, -0.40, 0, 1, 0, 0);
                    ctx.save();
                }, function (ctx, text) {
                    ctx.setTransform(1, -0.1, 1, 1, 0, 0);
                    ctx.fillText(text, 0, 31);
                    ctx.setTransform(1, 0.2, 0, 1, 0, 0);
                    ctx.save();
                }, function (ctx, text) {
                    ctx.setTransform(1, 0.3, 1, 1, 0, 0);
                    ctx.fillText(text, 10, 15);
                    ctx.setTransform(1, 0.2, 0, 1, 0, 0);
                    ctx.save();
                }, function (ctx, text) {
                    ctx.setTransform(1, 0.34, 1, 1, 1, 1);
                    ctx.fillText(text, 10, 13);
                    ctx.setTransform(1, 0.4, 1, 1, 1, 1);
                    ctx.save();
                }];


                for (var i = 0; i < number; i++) {
                    var val = alphanum[_.random(0, 61)];
                    digit += val + " ";
                    value += val;
                }

                digit = _.trim(digit);

                var fontName = ['IRANSans-web', 'IRANSans-web-bold', 'IRANSans-web-medium', 'arial', 'sans-serif', 'IRANSans-web-ultraLight', 'IRANSans-web-light'];
                var fontSize = _.random(15, 18);

                ctx.font = fontSize + 'px ' + fontName[_.random(fontName.length - 1)];

                ctx.fillStyle = 'black';
                randomGeneratorFuncStyle[_.random(0, randomGeneratorFuncStyle.length - 1)](ctx, digit);
                _.defer(function () {
                    return resolve(value);
                }, 250);
            })();
        } catch (e) {
            reject("عدم ایجاد captcha.");
        }
    });
};