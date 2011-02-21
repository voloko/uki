var arrayPrototype = Array.prototype;

if (!arrayPrototype.indexOf) {
    arrayPrototype.indexOf = function(find, i) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;
        for (var n = this.length; i < n; i++) {
            if (i in this && this[i] === find) return i;
        }
        return -1;
    };
}
if (!arrayPrototype.lastIndexOf) {
    arrayPrototype.lastIndexOf = function(find, i) {
        if (i === undefined) i = this.length - 1;
        if (i < 0) i += this.length;
        if (i > this.length-1) i = this.length - 1;
        for (i++; i-->0;) {/* i++ because from-argument is sadly inclusive */
            if (i in this && this[i] === find) return i;
        }
        return -1;
    };
}
if (!arrayPrototype.forEach) {
    arrayPrototype.forEach = function(action, that) {
        for (var i = 0, n = this.length; i < n; i++) {
            if (i in this) action.call(that, this[i], i, this);
        }
    };
}
if (!arrayPrototype.map) {
    arrayPrototype.map = function(mapper, that) {
        var other = new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++) {
            if (i in this) other[i] = mapper.call(that, this[i], i, this);
        }
        return other;
    };
}
if (!arrayPrototype.filter) {
    arrayPrototype.filter = function(filter, that) {
        var other = [], v;
        for (var i = 0, n = this.length; i < n; i++) {
            if (i in this && filter.call(that, v = this[i], i, this))
                other.push(v);
        }
        return other;
    };
}
if (!arrayPrototype.reduce) {
    arrayPrototype.reduce = function(fun, accumulator) {
        if (accumulator === undefined) accumulator = this[0];
        for (var i = 0, n = this.length; i < n; i++) {
            accumulator = fun.call(undefined, accumulator, this[i], i, this);
        }
        return accumulator;
    };
}

if (!Object.keys) {
    Object.keys = function(o){
        var ret = [], p;
        for (p in o) {
            if (o.hasOwnProperty.call(p)) {
                ret.push(p);
            }
        }
        return ret;
    }
}
