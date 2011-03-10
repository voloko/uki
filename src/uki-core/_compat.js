var arrayPrototype = Array.prototype;

var arrayFunctions = ['indexOf', 'lastIndexOf', 'forEach', 'map',
    'filter', 'reduce', 'reduceRight', 'every', 'some'];

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

exports.indexOf = function(searchElement, i) {
    var len = this.length;
    if (i === undefined) { i = 0; }
    if (i < 0) { i += len; }
    if (i < 0) { i = 0; }
    for (; i < len; i++) {
        if (i in this && this[i] === searchElement) {
            return i;
        }
    }
    return -1;
};

exports.lastIndexOf = function(searchElement, i) {
    var len = this.length;
    if (i === undefined) { i = len - 1; }
    if (i < 0) { i += len; }
    if (i >= len) { i = len - 1; }
    while (i >= 0) {
        if (i in this && this[i--] === searchElement) {
            return i;
        }
    }
    return -1;
};

exports.forEach = function(fun, context) {
    for (var i = 0, n = this.length; i < n; i++) {
        if (i in this) {
            fun.call(context, this[i], i, this);
        }
    }
};

exports.every = function(fun, context) {
    for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && !fun.call(context, this[i], i, this)) {
            return false;
        }
    }
    return true;
};

exports.some = function(fun, context) {
    for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && fun.call(context, this[i], i, this)) {
            return true;
        }
    }
    return false;
};

exports.map = function(mapper, context) {
    var other = new Array(this.length);
    for (var i = 0, n = this.length; i < n; i++) {
        if (i in this) {
            other[i] = mapper.call(context, this[i], i, this);
        }
    }
    return other;
};

exports.filter = function(filter, context) {
    var other = [], v;
    for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && filter.call(context, v = this[i], i, this)) {
            other.push(v);
        }
    }
    return other;
};

exports.reduce = function(fun, accumulator) {
    if (accumulator === undefined) {
        accumulator = this[0];
    }
    for (var i = 0, n = this.length; i < n; i++) {
        accumulator = fun.call(undefined, accumulator, this[i], i, this);
    }
    return accumulator;
};

exports.reduceRight = function(fun, accumulator) {
    var len = this.length;
    if (accumulator === undefined) {
        accumulator = this[len - 1];
    }
    for (var i = len-1; i >= 0; i--) {
        accumulator = fun.call(undefined, accumulator, this[i], i, this);
    }
    return accumulator;
};

exports.keys = function(o) {
    var ret = [], p;
    for (p in o) {
        if (o.hasOwnProperty.call(p)) {
            ret.push(p);
        }
    }
    return ret;
};

exports.trim = function(s) {
    return s.replace(/^\s*|\s*$/g, "");
};
