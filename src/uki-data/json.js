(function() { 
    
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    
    var meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };
        
    function quoteString(string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') return c;
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    
    uki.extend(uki, {
        error: function( msg ) {
            throw msg;
        },

        parseJSON: function( data ) {
            if ( typeof data !== "string" || !data ) {
                return null;
            }

            // Make sure leading/trailing whitespace is removed (IE can't handle it)
            data = uki.trim( data );

            // Make sure the incoming data is actual JSON
            // Logic borrowed from http://json.org/json2.js
            if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {

                // Try to use the native JSON parser first
                return window.JSON && window.JSON.parse ?
                    window.JSON.parse( data ) :
                    (new Function("return " + data))();

            } else {
                uki.error( "Invalid JSON: " + data );
            }
        },

        /**
         * based on http://code.google.com/p/jquery-json/source/browse/trunk/jquery.json.js
         *
         * Converts the given argument into a JSON respresentation.
         *
         * If an object has a "toJSON" function, that will be used to get the representation.
         * Non-integer/string keys are skipped in the object, as are keys that point to a function. 
         *
         * Copyright 2009, Brantley Harris
         * Dual licensed under the MIT or GPL Version 2 licenses.
         * http://uki.org/license
         */
        toJSON: function(o) {
            if (typeof(JSON) == 'object' && JSON.stringify)
                return JSON.stringify(o);

            var type = typeof(o);

            if (o === null)
                return "null";

            if (type == "undefined")
                return undefined;

            if (type == "number" || type == "boolean")
                return o + "";

            if (type == "string")
                return quoteString(o);

            if (type == 'object')
            {
                if (typeof o.toJSON == "function") 
                    return uki.toJSON( o.toJSON() );

                if (o.constructor === Date)
                {
                    var month = o.getUTCMonth() + 1;
                    if (month < 10) month = '0' + month;

                    var day = o.getUTCDate();
                    if (day < 10) day = '0' + day;

                    var year = o.getUTCFullYear();

                    var hours = o.getUTCHours();
                    if (hours < 10) hours = '0' + hours;

                    var minutes = o.getUTCMinutes();
                    if (minutes < 10) minutes = '0' + minutes;

                    var seconds = o.getUTCSeconds();
                    if (seconds < 10) seconds = '0' + seconds;

                    var milli = o.getUTCMilliseconds();
                    if (milli < 100) milli = '0' + milli;
                    if (milli < 10) milli = '0' + milli;

                    return '"' + year + '-' + month + '-' + day + 'T' +
                                 hours + ':' + minutes + ':' + seconds + 
                                 '.' + milli + 'Z"'; 
                }

                if (o.constructor === Array) 
                {
                    var ret = [];
                    for (var i = 0; i < o.length; i++)
                        ret.push( uki.toJSON(o[i]) || "null" );

                    return "[" + ret.join(",") + "]";
                }

                var pairs = [];
                for (var k in o) {
                    var name;
                    var type = typeof k;

                    if (type == "number")
                        name = '"' + k + '"';
                    else if (type == "string")
                        name = quoteString(k);
                    else
                        continue;  //skip non-string or number keys

                    if (typeof o[k] == "function") 
                        continue;  //skip pairs where the value is a function.

                    var val = uki.toJSON(o[k]);

                    pairs.push(name + ":" + val);
                }

                return "{" + pairs.join(", ") + "}";
            }
        }
    });
})(); 