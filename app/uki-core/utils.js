include('uki.js');

(function() {

var toString = Object[PROTOTYPE].toString;
	
var utils = {
    
	isFunction: function( obj ) {
		return toString.call(obj) === "[object Function]";
	},

    isArray: function( obj ) {
        return toString.call(obj) === "[object Array]";
    },
    
    trim: function( text ) {
        return (text || "").replace( /^\s+|\s+$/g, "" );
    },
    
    escapeHTML: function( html ) {
        var trans = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        return html.replace(/[&<>\"\']/g, function(c) { return trans[c]; });
    },
    
    each: function( object, callback, context ) {
        var name, i = 0, length = object.length;

        if ( length === undefined ) {
            for ( name in object ) {
                if ( !name || object[ name ] === undefined || !object.hasOwnProperty(name) ) continue;
                if ( callback.call( context || object[ name ], name, object[ name ] ) === false ) { break; }
            }
        } else {
            for ( var value = object[0]; i < length && callback.call( context || value, i, value ) !== false; value = object[++i] ){}
        }
        return object;
    },
    
    inArray: function( elem, array ) {
        for ( var i = 0, length = array.length; i < length; i++ ) {
            if ( array[ i ] === elem ) { return i; }
        }

        return -1;
    },

    unique: function( array ) {
        var ret = [], done = {};

        try {

            for ( var i = 0, length = array.length; i < length; i++ ) {
                var id = array[ i ];

                if ( !done[ id ] ) {
                    done[ id ] = true;
                    ret.push( array[ i ] );
                }
            }

        } catch( e ) {
            ret = array;
        }

        return ret;
    },

    grep: function( elems, callback ) {
        var ret = [];

        for ( var i = 0, length = elems.length; i < length; i++ ) {
            if ( callback( elems[ i ], i ) ) { ret.push( elems[ i ] ); }
        }

        return ret;
    },
    
    map: function( elems, callback, context ) {
        var ret = [],
            mapper = utils.isFunction(callback) ? callback : 
                     function(e) { return utils.isFunction(e[callback]) ? e[callback]() : e[callback]; };

        for ( var i = 0, length = elems.length; i < length; i++ ) {
            var value = mapper.call( context || elems[ i ], elems[ i ], i );

            if ( value != null ) { ret[ ret.length ] = value; }
        }

        return ret;
    },
    
    reduce: function( initial, elems, callback, context ) {
        for ( var i = 0, length = elems.length; i < length; i++ ) {
            initial = callback.call( context || elems[ i ], initial, elems[ i ], i );
        }
        return initial;
    },

    extend: function() {
        var target = arguments[0] || {}, i = 1, length = arguments.length, options;

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                
                for ( var name in options ) {
                    var copy = options[ name ];

                    if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }

                }
            }
        }

        // Return the modified object
        return target;      
    },
    
    newClass: function(/* [[superClass], mixin1, mixin2, ..] */ methods) {
        var klass = function() {
                this.init.apply(this, arguments);
            }, 
            inheritance, i, startFrom = 0;
            
        if (arguments.length > 1) {
            if (arguments[0][PROTOTYPE]) { // real inheritance
                inheritance = function() {};
                inheritance[PROTOTYPE] = arguments[0][PROTOTYPE];
                klass[PROTOTYPE] = new inheritance();
                startFrom = 1;
            }
        }
        for (i=startFrom; i < arguments.length; i++) {
            uki.extend(klass[PROTOTYPE], arguments[i]);
        };
        return klass;
    },
    
    newProperty: function(field, setter) {
        return function(value) {
            if (value === undefined) return this[field];
            this[field] = value;
            setter && setter.call(this, value);
            return this;
        };
    },
    
    addProperties: function(proto, fields) {
        uki.each(fields, function() { proto[this] = uki.newProperty('_' + this); });
    },
    
    delegateProperty: function(proto, name, target) {
        var propName = '_' + name;
        proto[name] = function(value) {
            if (this[target]) return this[target][propName](value);
            if (value === undefined) return this[propName];
            this[propName] = value;
            return this;
        };
    }
    
};

uki.utils = utils;
utils.extend(uki, utils);

})();
