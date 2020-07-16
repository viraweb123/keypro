'use strict';

var maxRegex = function maxRegex(number) {
    var minarray = [];
    var len = number.length;
    if (len == 1) {
        try {
            minarray.push('(?=(^[1-9][0-9]+$))');
            minarray.push('(?=(^[' + number[0] + '-9]$))');
        } catch (e) {
            console.error(e);
        }
    } else if (len > 1) {
        minarray.push('(?=(^[1-9][0-9]{' + len + ',}$))');
        for (var n = 0; n < len; n++) {
            try {
                var num = Number(number[n]);
                if (num < 9) {
                    if (n == len - 1) minarray.push('(?=(^' + number.substr(0, n) + '[' + num + '-9][0-9]*$))');else minarray.push('(?=(^' + number.substr(0, n) + '[' + (num + 1) + '-9][0-9]{' + (len - n - 1) + ',}$))');
                } else {
                    minarray.push('(?=(^' + number + '[0-9]*$))');
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
    return minarray;
};
var minRegex = function minRegex(number) {
    var minarray = [];
    var len = number.length;
    if (len == 1) {
        try {
            if (Number(number[0]) != 0) minarray.push('(?=(^[1-' + number[0] + ']$))');else minarray.push('(?=(^0$))');
        } catch (e) {
            console.error(e);
        }
    } else if (len > 1) {
        minarray.push('(?=(^[1-9][0-9]{0,' + (len - 2) + '}$))');
        for (var n = 0; n < len; n++) {
            try {
                var num = Number(number[n]);
                if (n == 0 && (num == 1 || num == 0)) continue;
                if (num > 1) {
                    if (n == len - 1) minarray.push('(?=(^' + number.substr(0, n) + '[0-' + num + ']$))');else minarray.push('(?=(^' + number.substr(0, n) + '[0-' + (num - 1) + '][0-9]{1,' + (len - n - 1) + '}$))');
                } else minarray.push('(?=(^' + number + '$))');
            } catch (e) {
                console.error(e);
            }
        }
    }
    return minarray;
};

var patterns = [];
//todo digit
patterns.push('(?:(?=(^[1-9][0-9]*$))|(?=(^0$)))'); //just digit
//todo grath equal than 290
var listMax = maxRegex("290");
patterns.push('(?:' + listMax.join('|') + ')');
//todo lower equal than 2459
var listMax = minRegex("2459");
patterns.push('(?:' + listMax.join('|') + ')');

//todo make regex
var reg = new RegExp('(?:' + patterns.join('') + ')', 'g');

/* todo result  reg
/(?:
    (?:
       (?=
           (^[1-9][0-9]*$)
       )|
       (?=(^0$))
    )
    (?:
        (?=
            (^[1-9][0-9]{3,}$)
        )|
        (?=
            (^[3-9][0-9]{2,}$)
        )|
        (?=
            (^290[0-9]*$)
        )|
        (?=
            (^29[0-9][0-9]*$)
        )
    )
    (?:
        (?=
            (^[1-9][0-9]{0,2}$)
        )|
        (?=
            (^[0-1][0-9]{1,3}$)
        )|
        (?=
            (^2[0-3][0-9]{1,2}$)
        )|
        (?=
            (^24[0-4][0-9]{1,1}$)
        )|
        (?=
            (^245[0-9]$)
        )
    )
)/g
*/

reg.test("290"); //T
reg.test("291"); //T
reg.test("289"); //T
reg.test("2460"); //F
reg.test("2450"); //T
reg.test("2459"); //T
reg.test("1005"); //T
reg.test("10050"); //F


290 <= reg <= 2459;