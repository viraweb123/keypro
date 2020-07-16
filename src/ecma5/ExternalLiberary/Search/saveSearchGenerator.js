"use strict";

var saveSearchGeneratorFunction = function saveSearchGeneratorFunction(filters, name) {
    return new Promise(function (resolve, reject) {
        try {

            var json = {
                "queryParams": {
                    "dashboard": false,
                    "keywords": _.map(_.filter(filters, function (value, key) {
                        return value.type == 'keyWord';
                    }), function (keyword) {
                        return { 'term': keyword.value, 'fuzzySearch': "yes" };
                    }),
                    "categories": _.map(_.filter(filters, function (value, key) {
                        return value.type == 'category';
                    }), function (category) {
                        return { 'term': category.value, 'fuzzySearch': "yes" }; //, title : category.title
                    }),
                    "queryName": name,
                    "content": {
                        "fuzzySearch": "yes",
                        "term": _.has(filters, 'content-filter') ? filters['content-filter'].value : ""
                    },
                    "name": {
                        "fuzzySearch": "yes",
                        "term": _.has(filters, 'docName-filter') ? filters['docName-filter'].value : ""
                    },
                    "mailSubject": {
                        "fuzzySearch": "yes",
                        "term": ""
                    },

                    "lastModifiedFrom": _.has(filters, 'system-data-from') ? filters['system-data-from'].value : "",
                    "lastModifiedTo": _.has(filters, 'system-data-to') ? filters['system-data-to'].value : "",

                    "mailFrom": "",
                    "mailTo": "",
                    "path": _.has(filters, 'path-filter') ? filters['path-filter'].value : "",
                    "author": _.has(filters, 'author-filter') ? filters['author-filter'].value : "",
                    "domain": (_.has(filters, 'systematic-domain-file-filter') ? filters['systematic-domain-file-filter'].value : 0) + (_.has(filters, 'systematic-domain-folder-filter') ? filters['systematic-domain-folder-filter'].value : 0) + (_.has(filters, 'systematic-domain-email-filter') ? filters['systematic-domain-email-filter'].value : 0),
                    "mimeType": _.has(filters, 'documentType-filter') ? filters['documentType-filter'].value : "",
                    "properties": {
                        entry: _.filter(filters, function (value, key) {
                            return value.type == 'smetadata';
                        }).length > 0 ? _.map(_.filter(filters, function (value, key) {
                            return value.type == 'smetadata';
                        }), function (metadata) {
                            return {
                                "key": metadata.key,
                                "value": {
                                    "term": metadata.value,
                                    "fuzzySearch": "yes"
                                }
                            };
                        }) : ""

                    }

                }
            };

            if (_.has(filters, 'propertyGroups')) json.queryParams.propertyGroups = {
                key: filters.propertyGroups.key,
                title: filters.propertyGroups.title,
                type: filters.propertyGroups.type,
                value: filters.propertyGroups.value
            };

            resolve(json);
        } catch (e) {
            reject(e);
        }
    });
};