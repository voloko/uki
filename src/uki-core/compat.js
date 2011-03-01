var arrayPrototype = Array.prototype;

var arrayFunctions = ['indexOf', 'lastIndexOf', 'forEach', 'map',
    'filter', 'reduce'];

exports.arrayFunctions = arrayFunctions;

exports.applyCompat = function() {
    exports.forEach.call(arrayFunctions, function(name) {
        if (!arrayPrototype[name]) {
            arrayPrototype[name] = exports[name];
        }
    });

    if (!Object.keys) {
        Object.keys = exports.keys;
    }
};

exports.indexOf = arrayPrototype.indexOf || function(find, i) {
    if (i === undefined) { i = 0; }
    if (i < 0) { i += this.length; }
    if (i < 0) { i = 0; }
    for (var n = this.length; i < n; i++) {
        if (i in this && this[i] === find) {
            return i;
        }
    }
    return -1;
};

exports.lastIndexOf = arrayPrototype.lastIndexOf || function(find, i) {
    if (i === undefined) { i = this.length - 1; }
    if (i < 0) { i += this.length; }
    if (i > this.length - 1) { i = this.length - 1; }
    i++; /* i++ because from-argument is sadly inclusive */
    while (i-- > 0) {
        if (i in this && this[i] === find) {
            return i;
        }
    }
    return -1;
};

exports.forEach = arrayPrototype.forEach || function(action, context) {
    for (var i = 0, n = this.length; i < n; i++) {
        if (i in this) {
            action.call(context, this[i], i, this);
        }
    }
};

exports.map = arrayPrototype.map || function(mapper, context) {
    var other = new Array(this.length);
    for (var i = 0, n = this.length; i < n; i++) {
        if (i in this) {
            other[i] = mapper.call(context, this[i], i, this);
        }
    }
    return other;
};

exports.filter = arrayPrototype.filter || function(filter, context) {
    var other = [], v;
    for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && filter.call(context, v = this[i], i, this)) {
            other.push(v);
        }
    }
    return other;
};

exports.reduce = arrayPrototype.reduce || function(fun, accumulator) {
    if (accumulator === undefined) {
        accumulator = this[0];
    }
    for (var i = 0, n = this.length; i < n; i++) {
        accumulator = fun.call(undefined, accumulator, this[i], i, this);
    }
    return accumulator;
};

exports.keys = Object.keys || function(o) {
    var ret = [], p;
    for (p in o) {
        if (o.hasOwnProperty.call(p)) {
            ret.push(p);
        }
    }
    return ret;
};

exports.trim = String.prototype.trim || function(s) {
    return s.replace(/^\s*|\s*$/g, "");
};
