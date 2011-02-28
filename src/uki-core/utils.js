var toString = Object.prototype.toString,
    arrayPrototype = Array.prototype,
    slice = arrayPrototype.slice,
    utils = exports,
    compat = require('./compat');

var marked = '__uki_marked';
// dummy subclass
/** @ignore */
function inheritance() {}

/**
 * Sets or retrieves attribute on an object.
 *
 * If target has function with attr it will be called target[attr](value=)
 * If no function present attribute will be set/get directly:
 *   target[attr] = value or return target[attr]</p>
 *
 * @example
 *   utils.prop(view, 'name', 'funny') // sets name to funny on view
 *   utils.prop(view, 'id') // gets id attribute of view
 *
 * @param {object} target
 * @param {string} attr Attribute name
 * @param {object=} value Value to set
 * @returns {object} target if value is being set, retrieved value otherwise
 */
utils.prop = function(target, attr, value, extra) {
    if (value !== undefined) {
        if (target[attr] && target[attr].apply) {
            target[attr](value, extra);
        } else {
            target[attr] = value;
        }
        return target;
    } else {
        if (target[attr] && target[attr].apply) {
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
utils.isFunction = function(obj) {
    return toString.call(obj) === "[object Function]";
};

/**
 * Checks if obj is an Array
 *
 * @param {object} object Object to check
 * @returns {boolean}
 */
utils.isArray = function(obj) {
    return toString.call(obj) === "[object Array]";
};

utils.toArray = function(arr) {
    return slice.call(arr, 0);
};

utils.pluck = function(array, attr) {
    function prop() {
        return utils.prop(v, attr);
    };
    return array.map ?
        array.map(prop) :
        utils.map(array, prop);
};

utils.without = function(array, value) {
    function filter(v) {
        return v !== value;
    };

    return array.filter ?
        array.filter(filter) :
        utils.filter(array, filter);
};

/**
 * Iterates through all non empty values of object or an Array
 *
 * @param {object|Array} object Object to iterate through
 * @param {function(object, number):boolean} callback Called for every item,
 *                                           may return false to stop iteration
 * @param {object} context Context in which callback should called.
 *                         If not specified context will be set to current item
 * @returns {object}
 */
utils.forEach = function(object, callback, context) {
    var name, i = 0, length = object.length;

    if (length === undefined) {
        for (name in object) {
            if (!name || object[name] === undefined ||
                !object.hasOwnProperty(name)) {
                continue;
            }
            if (callback.call(context || object[name],
                object[name], name) === false) { break; }
        }
    } else {
        compat.forEach.call(object, callback, context);
    }
    return object;
};

/**
 * Returns unique elements in array
 *
 * @param {Array} array
 * @returns {Array}
 */
utils.unique = function(array) {
    var result = [],
        i, length;

    if (array.length && (typeof array[0] == 'object' ||
        typeof array[0] == 'function')) {

        for (i = 0; i < array.length; i++) {
            if (!array[i][marked]) { result[result.length] = array[i]; }
            array[i][marked] = true;
        }
        for (i = 0; i < result.length; i++) {
            delete result[i][marked];
        }
        return result;

    } else {

        var done = {};
        for (i = 0, length = array.length; i < length; i++) {
            var id = array[i];
            if (!done[id]) {
                done[id] = true;
                result.push(array[i]);
            }
        }

        return result;
    }
};

/**
 * Copies properties from one object to another
 * @example
 *   utils.extend(x, { width: 13, height: 14 }) // sets x.width = 13,
 *                                            // x.height = 14
 *   options = utils.extend({}, defaultOptions, options)
 *
 * @param {object} target Object to copy properties into
 * @param {...object} sources Objects to take properties from
 * @returns Describe what it returns
 */
utils.extend = function() {
    var target = arguments[0] || {}, i = 1, length = arguments.length, options;

    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {

            for (var name in options) {
                var copy = options[name];

                if (copy !== undefined) {
                    target[name] = copy;
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
utils.binarySearch = function(value, array) {
    var low = 0, high = array.length, mid;

    while (low < high) {
        mid = (low + high) >> 1;
        array[mid] < value ? low = mid + 1 : high = mid;
    }

    return low;
};


utils.firstToLower = function(string) {
    return string.substr(0, 1).toLowerCase() + string.substr(1);
};

utils.camalize = function(string) {
    return string.replace(/[_-]\S/g, function(v) {
        return v.substr(1).toUpperCase();
    });
};

utils.dasherize = function(string) {
    return string.replace(/[A-Z]/g, function(v) {
        return '-' + v.toLowerCase();
    });
};

utils.path2obj = function(path, context) {
    var parts = path.split('.');

    context = context || global;

    for (var i = 0, l = parts.length; context && i < l; i++) {
        context = context[parts[i]];
    }
    return context;
};

utils.range = function(from, to) {
    var result = new Array(to - from);
    for (var idx = 0; from <= to; from++, idx++) {
        result[idx] = from;
    }
    return result;
};

utils.applyCompat = compat.applyCompat;

utils.forEach(compat.arrayFunctions, function(name) {
    if (!utils[name]) {
        // using temp argument is faster than slicing
        // arguments object
        utils[name] = function(array, a, b) {
            return compat[name].call(array, a, b);
        };
    }
});

utils.keys = compat.keys;
