include('uki.js');

(function() {

var toString = Object[PROTOTYPE].toString;
	
var utils = {
    
    attr: function(comp, attr, value) {
        if (value !== undefined) {
            if (utils.isFunction(comp[attr])) {
                comp[attr](value);
            } else {
                comp[attr] = value;
            }
            return comp;
        } else {
            if (utils.isFunction(comp[attr])) {
                return comp[attr]();
            } else {
                return comp[attr];
            }
        }
    },
    
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
                     function(e) { return utils.attr(e, callback); };

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
            if ( (options = arguments[i]) != null ) {
                
                for ( var name in options ) {
                    var copy = options[ name ];

                    if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }

                }
            }
        }

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
            utils.extend(klass[PROTOTYPE], arguments[i]);
        };
        return klass;
    },
    
    newProp: function(field, setter) {
        return function(value) {
            if (value === undefined) return this[field];
            if (setter) { setter.call(this, value); } else { this[field] = value; };
            return this;
        };
    },
    
    addProps: function(proto, fields) {
        utils.each(fields, function() { proto[this] = utils.newProp('_' + this); });
    },
    
    delegateProp: function(proto, name, target) {
        var propName = '_' + name;
        proto[name] = function(value) {
            if (this[target]) return utils.attr(this[target], name, value);
            if (value === undefined) return this[propName];
            this[propName] = value;
            return this;
        };
    }
    
};

uki.utils = utils;
utils.extend(uki, utils);

})();
