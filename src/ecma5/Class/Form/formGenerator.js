'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formGenerator = formGenerator;
function formGenerator(elements) {
    return new Promise(function (resolve, reject) {

        for (var element in elements) {

            var div = window.document.createElement("div");
            div.classList.add('col-sm-12', 'form-group');
            div.style.margin = "3px 0px 3px 0px";
            div.style.padding = "0px";

            var labelDiv = window.document.createElement("div");
            labelDiv.classList.add('col-sm-4', 'pull-right');
            labelDiv.style.padding = "5px";

            var label = window.document.createElement("label");
            label.classList.add('pull-left');
            label.textContent = element.label;

            labelDiv.appendChild(label);

            div.appendChild(labelDiv);

            var contentDiv = window.document.createElement("div");
            contentDiv.classList.add('col-sm-8', 'pull-left');
            contentDiv.style.padding = "0px 5px 0px 0px ";

            switch (element.type) {
                case "input":
                    var inputTag = window.document.createElement("input");
                    inputTag.classList.add('form-control');
                    inputTag.setAttribute("name", element.name);
                    contentDiv.appendChild(inputTag);
                    if (element.validators && !_.isEqual(element.validators, {})) {
                        var validators = Array.isArray(element.validators) ? element.validators : [element.validators];
                        element.validates = {};
                        _.forEach(element.validators, function (validator, key) {
                            return element.validators[key].validation = validatorLookUpTable[key];
                        });
                    }
                    break;
                case "select":
                    var selectTag = window.document.createElement("select");
                    element.options.classList.add('form-control');
                    _.forEach(element.options, function (option) {
                        var optionTag = window.document.createElement("option");
                        optionTag.value = option.value;
                        optionTag.text = option.label;
                        select.appendChild(optionTag);
                    });
                    selectTag.selectedIndex = _.findIndex(element.options, function (option) {
                        return option.selected;
                    });
                    selectTag.setAttribute("name", element.name);
                    contentDiv.appendChild(selectTag);
                    break;
                case "textarea":
                    var textAreaTag = window.document.createElement("textarea");
                    textAreaTag.classList.add('form-control');
                    textAreaTag.setAttribute("name", element.name);
                    textAreaTag.value = element.value;
                    contentDiv.appendChild(textAreaTag);
                    break;
                case "checkbox":
                    var checkboxTag = window.document.createElement("input");
                    checkboxTag.classList.add('form-control');
                    checkboxTag.setAttribute("type", 'checkbox');
                    checkboxTag.setAttribute("name", element.name);
                    checkboxTag.checked = element.checked;
                    break;
                case "radio":
                    var radioTag = window.document.createElement("input");
                    radioTag.classList.add('form-control');
                    radioTag.setAttribute("type", 'radio');
                    radioTag.setAttribute("name", element.name);
                    radioTag.checked = element.checked;
                    break;
            }

            div.appendChild(contentDiv);
        }
    });
}

var validatorLookUpTable = {
    "number": {
        "validFunc": function validFunc(val, param) {
            return parseInt(val) == val;
        },
        "message": "rfm3.formGenerator.validator.number"
    },
    "minLength": {
        "validFunc": function validFunc(val, param) {
            return String(val).length <= param;
        },
        "message": "rfm3.formGenerator.validator.minLength"
    },
    "maxLength": {
        "validFunc": function validFunc(val, param) {
            return String(val).length >= param;
        },
        "message": "rfm3.formGenerator.validator.maxLength"
    },
    "email": {
        "validFunc": function validFunc(val, param) {
            return (/^(?:\w+\.)*\w+@(?:\w+\.)*\w+\.(?:\w+\.)*\w{2,}$/.test(val)
            );
        },
        "message": "rfm3.formGenerator.validator.email"
    },
    "url": {
        "validFunc": function validFunc(val, param) {
            return (/^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}(?:[0-9A-Za-z-\.@:%_\+~#=](\/(.)*)?)+$/.test(val)
            );
        },
        "message": "rfm3.formGenerator.validator.url"
    },
    "lt": {
        "validFunc": function validFunc(val, param) {
            return (parseInt(val) == val || parseFloat(val) == val) && parseFloat(val) < param;
        },
        "message": "rfm3.formGenerator.validator.lt"
    },
    "let": {
        "validFunc": function validFunc(val, param) {
            return (parseInt(val) == val || parseFloat(val) == val) && parseFloat(val) <= param;
        },
        "message": "rfm3.formGenerator.validator.let"
    },
    "gt": {
        "validFunc": function validFunc(val, param) {
            return (parseInt(val) == val || parseFloat(val) == val) && parseFloat(val) > param;
        },
        "message": "rfm3.formGenerator.validator.gt"
    },
    "get": {
        "validFunc": function validFunc(val, param) {
            return (parseInt(val) == val || parseFloat(val) == val) && parseFloat(val) >= param;
        },
        "message": "rfm3.formGenerator.validator.get"
    },
    "alpha": {
        "validFunc": function validFunc(val, param) {
            return (/^[0-9A-Za-z]+$/.test(val)
            );
        },
        "message": "rfm3.formGenerator.validator.alpha"
    },
    "regexp": {
        /*
           var reg = "/^\\d$/"
           reg = eval(reg)
         */
        "validFunc": function validFunc(val, param) {
            return _.isRegExp(eval(param)) && eval(param).test(val);
        },
        "message": "rfm3.formGenerator.validator.regexp"
    }
};