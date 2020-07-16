"use strict";

var dateFormatInternalCreateQuery = function dateFormatInternalCreateQuery(date) {
    return _.isDate(date) ? "" + String(date.getFullYear()) + (String(date.getMonth() + 1).length == 1 ? "0" + String(date.getMonth() + 1) : String(date.getMonth() + 1)) + (String(date.getDate()).length == 1 ? "0" + String(date.getDate()) : String(date.getDate())) + (String(date.getHours()).length == 1 ? "0" + String(date.getHours()) : String(date.getHours())) + (String(date.getMinutes()).length == 1 ? "0" + String(date.getMinutes()) : String(date.getMinutes())) + (String(date.getSeconds()).length == 1 ? "0" + String(date.getSeconds()) : String(date.getSeconds())) : null;
};

var createQueryFromFilters = function createQueryFromFilters(filters, offset, limit) {
    return new Promise(function (resolve, reject) {
        try {

            var query = "offset=" + offset + "&limit=" + limit + "&";

            var domain = 0;
            _.forEach(_.filter(filters, function (filter) {
                return filter.type == 'domain';
            }), function (d) {
                return domain += d.value;
            });
            domain = domain <= 0 ? 3 : domain;
            query += "domain=" + domain;

            if (_.has(filters, "docName-filter") && !_.includes([null, ""], filters["docName-filter"].value)) query += "&name=" + filters["docName-filter"].value;

            if (_.has(filters, "author-filter") && !_.includes([null, ""], filters["author-filter"].value)) query += "&author=" + filters["author-filter"].value;

            if (_.has(filters, "path-filter") && !_.includes([null, ""], filters["path-filter"].value)) query += "&path=" + filters["path-filter"].value;

            if (_.has(filters, "content-filter") && !_.includes([null, ""], filters["content-filter"].value)) query += "&content=" + filters["content-filter"].value;

            var notes = _.map(_.filter(filters, function (filter) {
                return filter.type == 'note';
            }), function (note) {
                return "notes=" + note.value;
            }).join("&");
            if (!_.includes([null, ""], notes)) {
                query += "&" + notes;
                if (query.endsWith("&")) query = query.slice(0, query.length - 1);
            }

            var keywords = _.map(_.filter(filters, function (filter) {
                return filter.type == 'keyWord';
            }), function (keyWord) {
                return "keyword=" + keyWord.value;
            }).join("&");
            if (!_.includes([null, ""], keywords)) {
                query += "&" + keywords;
                if (query.endsWith("&")) query = query.slice(0, query.length - 1);
            }

            var categories = _.map(_.filter(filters, function (filter) {
                return filter.type == 'category';
            }), function (category) {
                return "category=" + category.value;
            }).join("&");
            if (!_.includes([null, ""], categories)) {
                query += "&" + categories;
                if (query.endsWith("&")) query = query.slice(0, query.length - 1);
            }

            if (_.has(filters, "system-data-from") && dateFormatInternalCreateQuery(filters["system-data-from"].value) != null) query += "&lastModifiedFrom=" + dateFormatInternalCreateQuery(filters["system-data-from"].value);

            if (_.has(filters, "system-data-to") && dateFormatInternalCreateQuery(filters["system-data-to"].value) != null) query += "&lastModifiedTo=" + dateFormatInternalCreateQuery(filters["system-data-to"].value);

            if (_.has(filters, "documentType-filter")) query += "&mimeType=" + filters["documentType-filter"].value;

            if (_.has(filters, "systematicPath")) query += "&category=" + filters["systematicPath"].value;

            if (_.has(filters, "propertyGroups")) query += "&propertyGroup=" + filters["propertyGroups"].key + "=" + filters["propertyGroups"].value;

            var properties = _.map(_.filter(filters, function (filter) {
                return filter.type == 'smetadata';
            }), function (smetadata) {
                return "property=" + smetadata.key + "=" + smetadata.value;
            }).join("&");
            if (!_.includes([null, ""], properties)) {
                query += "&" + properties;
                if (query.endsWith("&")) query = query.slice(0, query.length - 1);
            };

            if (query.endsWith("&")) query = query.slice(0, query.length - 1);

            resolve(query);
        } catch (e) {
            reject(e);
        }
    });
};