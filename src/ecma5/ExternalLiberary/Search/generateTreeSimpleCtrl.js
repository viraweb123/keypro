'use strict';

var generateTreeSimpleCtrl = function generateTreeSimpleCtrl(result, $translate) {
    return new Promise(function (resolve, reject) {
        try {
            (function () {

                var prop_Count = 0;
                var prop_List = [];
                var total_count = 0;
                _.forEach(result.metadata, function (metaData, key) {
                    return _.forEach(metaData, function (data, dataKey) {
                        prop_Count += data.total;
                        //label: `${key}-${dataKey}-${data.total}`,
                        if (data.total > 0) prop_List.push({
                            label: dataKey + ' (' + data.total + ')',
                            name: key,
                            collapsed: true,
                            root: false,
                            children: [],
                            id: key
                        });
                    });
                });
                total_count = result.system.name.name.total + result.system.content.content.total + result.system.keywords.keywords.total + result.system.notes.notes.total + prop_Count;
                var tree = [{
                    label: $translate.instant('search.zm.search') + '  (' + total_count + ')',
                    name: 'all',
                    collapsed: false,
                    root: true,
                    children: [],
                    id: 'a'
                }];
                if (prop_Count > 0) tree[0].children.push({
                    label: $translate.instant('search.zm.tree_frequency_metadata') + '  (' + prop_Count + ')',
                    name: 'metadataAll',
                    collapsed: false,
                    root: false,
                    children: prop_List,
                    id: 'mt'
                });
                if (result.system.name.name.total > 0) tree[0].children.push({
                    label: $translate.instant('search.zm.tree_frequency_name') + '  (' + result.system.name.name.total + ')',
                    name: 'name',
                    collapsed: true,
                    root: false,
                    children: [],
                    id: 'n'
                });
                if (result.system.content.content.total > 0) tree[0].children.push({
                    label: $translate.instant('search.zm.tree_frequency_content') + '  (' + result.system.content.content.total + ')',
                    name: 'content',
                    collapsed: true,
                    root: false,
                    children: [],
                    id: 'c'
                });
                if (result.system.keywords.keywords.total > 0) tree[0].children.push({
                    label: $translate.instant('search.zm.tree_frequency_keyword') + '  (' + result.system.keywords.keywords.total + ')',
                    name: 'keyword',
                    collapsed: true,
                    root: false,
                    children: [],
                    id: 'k'
                });
                if (result.system.notes.notes.total > 0) tree[0].children.push({
                    label: $translate.instant('search.zm.tree_frequency_note') + '  (' + result.system.notes.notes.total + ')',
                    name: 'notes',
                    collapsed: true,
                    root: false,
                    children: [],
                    id: 'no'
                });
                resolve(tree);
            })();
        } catch (e) {
            resolve(e);
        }
    });
};