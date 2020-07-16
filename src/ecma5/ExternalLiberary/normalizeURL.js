"use strict";

var normalize = function normalize(input) {
    try {

        // i → case not sensitive

        /*todo tutorial webSites*/
        /*
            https://en.wikipedia.org/wiki/URL_normalization
            https://tools.ietf.org/html/rfc3986#section-3.3
        */

        /*todo Converting the scheme and host to lower case*/
        /*
            The scheme and host components of the URL are case-insensitive. Most normalizers will convert them to lowercase.
            Example:  HTTP://www.Example.com/ → http://www.example.com/
        */
        input = _.toLower(input);

        //add http://www.  if not exist in url
        //if(! /^(?:(http|HTTP))(?:(s|S))?:\/\/.+/.test(input)){
        if (!/^https?:\/\/.+/.test(input)) input = /^www.+/.test(input) ? "http://" + input : "http://www." + input;

        /*todo Limiting protocols*/
        /*
             Limiting different application layer protocols. For example, the “https” scheme could be replaced with “http”.
             Example: https://www.example.com/ → http://www.example.com/
        */
        input = input.replace("https://", "http://");

        /*todo Removing duplicate or more slashes Paths which include two adjacent slashes could be converted to one.*/
        /*
            Examplee http://www.example.com/foo//bar.html → http://www.example.com/foo/bar.html
         */
        input = input.replace(/([^:]\/)\/+/g, "$1");

        /*Removing or adding “www” as the first domain label*/
        // http://www.example.com/ → http://example.com/
        input = input.replace("www.", "");

        /*todo Sorting the query parameters */
        /*
            Some web pages use more than one query parameter in the URL. A normalizer can sort the parameters into alphabetical
            order (with their values), and reassemble the URL.
            Example: http://www.example.com/display?lang=en&article=fred → http://www.example.com/display?article=fred&lang=en
             Example:
                var input = "http://www.example.com/display?c=en&a=fred&b=1234#saddasd/sadsad";
                var res = /[^?]+\?([^#/]*)/gi.exec(input);
                if(res != null && res.length == 2)
                    input = input.replace(res[1],_.join(_.sortBy(_.split(res[1],"&")),"&"));
                input == "http://www.example.com/display?a=fred&b=1234&c=en#saddasd/sadsad"
        */
        var sortQueryParams = /[^?]+\?([^#/]*)/gi.exec(input);
        if (sortQueryParams != null && sortQueryParams.length == 2) input = input.replace(sortQueryParams[1], _.join(_.sortBy(_.split(sortQueryParams[1], "&")), "&"));

        //OR

        /*todo Removing default query parameters.*/
        /*
            A default value in the query string may render identically whether it is there or not.
            Example: http://www.example.com/display?id=&sort=ascending → http://www.example.com/display
             Example:
                var input = "http://www.example.com/display?c=en&a=fred&b=1234#saddasd/sadsad";
                var res = /[^?]+\?([^#/]*)/gi.exec(input);
                if(res != null && res.length == 2){
                    input = input.replace(res[1],"");
                    input = input.replace("?","");
                }
                "http://www.example.com/display#saddasd/sadsad"
        */
        var removeQueryParams = /[^?]+\?([^#/]*)/gi.exec(input);
        if (removeQueryParams != null && removeQueryParams.length == 2) {
            input = input.replace(removeQueryParams[1], "");
            input = input.replace("?", "");
        }

        /*todo Removing the "?" when the query is empty.*/
        /*
            When the query is empty, there may be no need for the "?".
            Example: http://www.example.com/display? → http://www.example.com/display
             Example:
                 var input = "http://www.example.com/display";
                 var res = /[^?]+\?([^#/]+)/gi.exec(input);
                 if(res == null){
                    input = input.replace("?","");
                 }
                 //"http://www.example.com/display?"
         */
        var removeEmptyQuery = /[^?]+\?([^#/]+)/gi.exec(input);
        if (removeEmptyQuery == null) input = input.replace("?", "");

        /*todo Removing dot-segments.*/
        /*
            "algorithm" :
                 A.  If the input buffer begins with a prefix of "../" or "./",
                 then remove that prefix from the input buffer; otherwise,
                  B.  if the input buffer begins with a prefix of "/./" or "/.",
                 where "." is a complete path segment, then replace that
                 prefix with "/" in the input buffer; otherwise,
                  C.  if the input buffer begins with a prefix of "/../" or "/..",
                 where ".." is a complete path segment, then replace that
                 prefix with "/" in the input buffer and remove the last
                 segment and its preceding "/" (if any) from the output
                 buffer; otherwise,
                  D.  if the input buffer consists only of "." or "..", then remove
                 that from the input buffer; otherwise,
                  E.  move the first path segment in the input buffer to the end of
                 the output buffer, including the initial "/" character (if
                 any) and any subsequent characters up to, but not including,
                 the next "/" character or the end of the input buffer.
                  https://tools.ietf.org/html/rfc3986#section-3.3
                  Note that dot-segments are intended for use in URI references to
                 express an identifier relative to the hierarchy of names in the base
                 URI.  The remove_dot_segments algorithm respects that hierarchy by
                 removing extra dot-segments rather than treat them as an error or
                 leaving them to be misinterpreted by dereference implementations.
                  The following illustrates how the above steps are applied for two
                 examples of merged paths, showing the state of the two buffers after
                 each step.
                  STEP   OUTPUT BUFFER         INPUT BUFFER
                  1 :                         /a/b/c/./../../g
                 2E:   /a                    /b/c/./../../g
                 2E:   /a/b                  /c/./../../g
                 2E:   /a/b/c                /./../../g
                 2B:   /a/b/c                /../../g
                 2C:   /a/b                  /../g
                 2C:   /a                    /g
                 2E:   /a/g
                  STEP   OUTPUT BUFFER         INPUT BUFFER
                  1 :                         mid/content=5/../6
                 2E:   mid                   /content=5/../6
                 2E:   mid/content=5         /../6
                 2C:   mid                   /6
                 2E:   mid/6
                  Some applications may find it more efficient to implement the
                 remove_dot_segments algorithm by using two segment stacks rather than
                 strings.
                  Note: Beware that some older, erroneous implementations will fail
                 to separate a reference's query component from its path component
                 prior to merging the base and reference paths, resulting in an
                 interoperability failure if the query component contains the
                 strings "/../" or "/./".
                  Example :
                     var input = "https://en.wikipedia.org:234/wiki/../URL_normalization/./as/../ssalam#wewrwr?sadsadsa=324234&sdfs=23123/a/../v/c/../sdfsdfsd/";
                    var urlSplit = input.split(/(https?\:\/\/[^\/]+)([\w|\W]+)/gi);
                    _.remove(urlSplit,s=>s=="");
                    if(urlSplit.length == 2){
                         var parameterDomain = urlSplit[1];
                         var s = parameterDomain.split("/");
                         var res = [];
                         while(s.length > 0){
                            var w = s.shift();
                            if(w == ".")
                                continue;
                            if(w == ".."){
                                 res.pop();
                                 continue;
                             }
                            res.push(w);
                         }
                        input = `${urlSplit[0]}${res.join("/")}`;
                    }
         */
        var urlSplit = input.split(/(https?\:\/\/[^\/]+)([\w|\W]+)/gi);
        _.remove(urlSplit, function (s) {
            return s == "";
        });
        if (urlSplit.length == 2) {
            var parameterDomain = urlSplit[1];
            var slashSplitArray = parameterDomain.split("/");
            var dotSegments = [];
            while (slashSplitArray.length > 0) {
                var slashSplit = slashSplitArray.shift();
                if (slashSplit == ".") continue;
                if (slashSplit == "..") {
                    dotSegments.pop();
                    continue;
                }
                dotSegments.push(slashSplit);
            }
            input = "" + urlSplit[0] + dotSegments.join("/");
        }

        /*todo Capitalizing letters in escape sequences */
        /*
            All letters within a percent-encoding triplet (e.g., "%3A") are case-insensitive, and should be capitalized.
            Example:   http://www.example.com/a%c2%b1b → http://www.example.com/a%C2%B1b
         */
        input = _.replace(input, /%[0-9a-zA-Z][0-9a-zA-Z]/gi, function (escLetter) {
            return _.toUpper(escLetter);
        }); //input = input.replace(/%[^%]{2}/gi,x=>x.toUpperCase())


        /* todo Decoding percent-encoded octets of unreserved characters*/
        /*
            Common characters after percent-encoding (ASCII or UTF-8 based)
            newline 	            space 	" 	    % 	    - 	    . 	    < 	    > 	    \ 	    ^ 	    _ 	    ` 	    { 	    | 	    } 	    ~
            %0A or %0D or %0D%0A 	%20 	%22 	%25 	%2D 	%2E 	%3C 	%3E 	%5C 	%5E 	%5F 	%60 	%7B 	%7C 	%7D 	%7E
         */
        input = _.replace(input, /%0A|%0D|%0D%0A|%20|%22|%25|%2D|%2E|%3C|%3E|%5C|%5E|%5F|%60|%7B|%7C|%7D|%7E/gi, function (percentEncoding) {
            return decodeURIComponent(percentEncoding);
        });

        /*todo Removing directory index*/
        /*
            Example :
                "http://www.example.com/a/index.html".replace(/\/[^\/]+\.(?:(asp|php|html|htm))/,"/"); → "http://www.example.com/a/
                "http://www.example.com/a/index.html?d=2".replace(/\/[^\/]+\.(?:(asp|php|html|htm))/,"/"); → "http://www.example.com/a/?d=2"
        */
        input = input.replace(/\/[^\/]+\.(?:(asp|php|html|htm))/, "/");

        /*todo convert /? to ? */
        input = input.replace("/?", "?");

        //Removing the fragment #
        //    http://www.example.com/bar.html#section1 → http://www.example.com/bar.html
        input = input.split("#");

        var input = "http://localhost:80/www.facebook.com";
        input = input.replace(":80", "");
        /*var port = /(?:\:[0-9]{1,})/gi.exec(input);
        if(port != null){
           var port =  Number(port[0].replace(":",""));
           if(port == 80)
         }*/

        /*todo remove hash and contents*/
        /*
            Example : "sindresorhus.com/about.html#contact".replace(/(#.*)/,"") == "sindresorhus.com/about.html"
         */
        input = input.replace(/(#.*)/, "");

        ///todo in nodejs
        //Replacing IP with domain name. Check if the IP address maps to a domain name. Example:
        //http://208.77.188.166/dsdf/sdsf/ → http://www.example.com/
        /*const dns = require('dns');
        dns.lookupService(ipv4[0], 22, (err, hostname, service) => {
            console.log(hostname, service);
            // Prints: localhost ssh
        });*/
        var ipv4 = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.exec("http://208.77.188.166/dsdf/sdsf/");
        if (ipv4 != null) {
            var regexpIPV4 = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/gi;
            var validV4 = regexpIPV4.test(ipv4[0]);
            if (validV4) {
                console.log(ipv4[0]);
            }
        }
        var url = "0000:0000:0000:0000:0000:0000:0000:0001/dsdf/sdsf/";
        var v6IPRegexp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;

        var ipv6 = /[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}/.exec(url);
        if (ipv6 != null) {
            var validV6 = v6IPRegexp.exec(ipv6[0]);
            if (validV6) {
                console.log(ipv6[0]);
            }
        }

        /* todo Adding trailing*/
        /*
            are indicated with a trailing slash and should be included in URLs.
            Example:  http://www.example.com/alice → http://www.example.com/alice/
         */
        input = input.endsWith("\/") ? input : input + "/";

        return input;
    } catch (e) {
        console.error(e);
        return input;
    }
};