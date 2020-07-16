System.config({
    /*baseURL: './',

    */
   /* meta: {
        'ecma5/!*.js': { format: 'global' }
    },*/
    transpiler: false,
    defaultJSExtensions: true,
    /*packages: {
        format: 'register',
        defaultExtension: 'js'
    }*/

    packages: {
        './ecma5': {
            defaultExtension: 'js?dev=' + randomVersionName
        },
        './ecma5/**': {
            defaultExtension: 'js?dev=' + randomVersionName
        }
    }

});
