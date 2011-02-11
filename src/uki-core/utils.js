var toString = Object.prototype.toString,
    arrayPrototype = Array.prototype,
    slice = arrayPrototype.slice;
var marked = '__uki_marked';
// dummy subclass
/** @ignore */
function inheritance () {}

/**
 * Sets or retrieves attribute on an object.
 * <p>If target has function with attr it will be called target[attr](value=)
 * If no function present attribute will be set/get directly: target[attr] = value or return target[attr]</p>
 *
 * @example
 *   uki.prop(view, 'name', 'funny') // sets name to funny on view
 *   uki.prop(view, 'id') // gets id attribute of view
 *
 * @param {object} target
 * @param {string} attr Attribute name
 * @param {object=} value Value to set
 * @returns {object} target if value is being set, retrieved value otherwise
 */
this.prop = function(target, attr, value, extra) {
    if (value !== undefined) {
        if (target[attr] && target[attr].apply) {
        // if (uki.isFunction(target[attr])) {
            target[attr](value, extra);
        } else {
            target[attr] = value;
        }
        return target;
    } else {
        if (target[attr] && target[attr].apply) {
        // if (uki.isFunction(target[attr])) {
            return target[attr]();
        } else {
            return target[attr];
        }
    }
};

/**
 * Checks if obj is a function
 *
 * @param {object} object Object to check
 * @returns {boolean}
 */
this.isFunction = function( obj ) {
    return toString.call(obj) === "[object Function]";
};

/**
 * Checks if obj is an Array
 *
 * @param {object} object Object to check
 * @returns {boolean}
 */
this.isArray = function( obj ) {
    return toString.call(obj) === "[object Array]";
};

this.toArray = function(arr) {
    return slice.call(arr, 0);
};

/**
 * Converts unsafe symbols to entities
 *
 * @param {string} html
 * @returns {string} escaped html
 */
this.escapeHTML = function( html ) {
    var trans = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
    };
    return (html + '').replace(/[&<>\"\']/g, function(c) { return trans[c]; });
};

this.pluck = function( array, attr ) {
    return array.map(function(v) {
        return uki.prop(v, attr);
    });
};

this.without = function( array, value ) {
    return array.filter(function(v) {
        return v !== value;
    });
};

/**
 * Iterates through all non empty values of object or an Array
 *
 * @param {object|Array} object Object to iterate through
 * @param {function(object, number):boolean} callback Called for every item, may return false to stop iteration
 * @param {object} context Context in which callback should called. If not specified context will be set to
 *                         current item
 * @returns {object}
 */
this.forEach = function( object, callback, context ) {
    var name, i = 0, length = object.length;

    if ( length === undefined ) {
        for ( name in object ) {
            if ( !name || object[ name ] === undefined || !object.hasOwnProperty(name) ) continue;
            if ( callback.call( context || object[ name ], object[ name ], name ) === false ) { break; }
        }
    } else {
        arrayPrototype.forEach.call(object, callback, context);
    }
    return object;
};

/**
 * Returns unique elements in array
 *
 * @param {Array} array
 * @returns {Array}
 */
this.unique = function( array ) {
    var result = [],
        i;

    if (array.length && (typeof array[0] == 'object' || typeof array[0] == 'function')) {

        for (i = 0; i < array.length; i++) {
            if (!array[i][marked]) { result[result.length] = array[i]; }
            array[i][marked] = true;
        };
        for (i = 0; i < result.length; i++) {
            delete result[i][marked];
        };
        return result;

    } else {

        var done = {};
        for ( i = 0, length = array.length; i < length; i++ ) {
            var id = array[ i ];
            if ( !done[ id ] ) {
                done[ id ] = true;
                result.push( array[ i ] );
            }
        }

        return result;
    }
};

/**
 * Copies properties from one object to another
 * @example
 *   uki.extend(x, { width: 13, height: 14 }) // sets x.width = 13, x.height = 14
 *   options = uki.extend({}, defaultOptions, options)
 *
 * @param {object} target Object to copy properties into
 * @param {...object} sources Objects to take properties from
 * @returns Describe what it returns
 */
this.extend = function() {
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
};

/**
 * Search closest value in a sorted array
 * @param {nubmer} value to search
 * @param {array} array sorted array
 * @returns {number} index of closest value
 */
this.binarySearch = function (value, array) {
    var low = 0, high = array.length, mid;

    while (low < high) {
        mid = (low + high) >> 1;
        array[mid] < value ? low = mid + 1 : high = mid;
    }

    return low;
};


this.firstToLower = function(string) {
    return string.substr(0, 1).toLowerCase() + string.substr(1);
};

this.camalize = function(string) {
    return string.replace(/[-_]\S/g, function(v) {
        return v.substr(1).toUpperCase();
    });
};

this.dasherize = function(string) {
    return string.replace(/[A-Z]/g, function(v) {
        return '-' + v.toLowerCase();
    });
};

this.path2obj = function(path, context) {
    var parts = path.split('.');

    context = context || root;

    for (var i=0, l = parts.length; context && i < l; i++) {
        context = context[parts[i]];
    };
    return context;
};