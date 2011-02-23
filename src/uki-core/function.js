var uki = require('./uki'),
    utils = require('./utils'),
    arrayPrototype = Array.prototype;


/**
 * Class and function utility functions.
 */
 
// dummy subclass
/** @ignore */
function inheritance () {}

var fun = exports;

fun.bind = function( fn, context ) {
    var args = arrayPrototype.slice.call(arguments, 2),
        result = args.length ?
            function() {
                return fn.apply(context || this, args.concat(utils.toArray(arguments)));
            } :
            function() {
                return fn.apply(context || this, arguments);
            };
    return result;
};

fun.bindOnce = function( fn, context ) {
    fn.huid = fn.huid || uki.guid++;
    var bindingName = '__binding_' + fn.huid;
    context[bindingName] = context[bindingName] || fun.bind( fn, context );
    return context[bindingName];
};

/**
 * Creates a new class inherited from base classes. Init function is used as constructor
 * @example
 *   baseClass = uki.newClass({
 *      init: function() { this.x = 3 }
 *   });
 *
 *   childClass = uki.newClass(baseClass, {
 *      getSqrt: function() { return this.x*this.x }
 *   });
 * 
 *   someMixin = {
 *      happines: function() {
 *          return 'happines';
 *      }
 *   }
 * 
 *   childNinja = uki.newClass(baseClass, someMixin, function(STATIC, Base, Mixin) {
 *      this.init = function() {
 *          Base.init.call(this);
 *      };
 * 
 *      this.happines = function() {
 *          return 'Ninja ' + Mixin.happines.call(this);
 *      }
 * 
 *      this.publicMethod = function() {
 *          // do some public work
 *          privateMethod.call(this);
 *          return this.happines();
 *      };
 * 
 *      function privateMethod() {
 *          // do some private stuff
 *      }
 *   });
 *
 * @param {object=} superClass If superClass has prototype "real" prototype base inheritance is used,
 *                             otherwise superClass properties are simply copied to newClass prototype
 * @param {Array.<object>=} mixins
 * @param {object} methods
 * @returns Describe what it returns
 */
fun.newClass = function(/* [[superClass], mixin1, mixin2, ..], methods */) {
    var klass = function() {
            this.init.apply(this, arguments);
        },
        i, definition, definitionArgs = [klass], base, length = arguments.length;

    for (i = 0; i < length; i++) {
        base = arguments[i];
        if (i === 0 && length > 1 && base.prototype) {
            // real inheritance for the first superclass
            inheritance.prototype = base.prototype;
            klass.prototype = new inheritance();
            definitionArgs.push(inheritance.prototype);
        } else if (utils.isFunction(base)) {
            // if function provided instead of {}
            definition = {};
            base.apply(definition, definitionArgs);
            utils.extend(klass.prototype, definition);
            definitionArgs.push(definition);
        } else {
            // just a plain simple mixin
            utils.extend(klass.prototype, base);
            definitionArgs.push(base);
        }

    };
    if (!klass.prototype.init) klass.prototype.init = function() {};
    return klass;
};


function addProp (proto, prop, setter) {
    var propName = '_' + prop;
    if (setter) {
        proto[prop] = function(value) {
            if (value === undefined) return this[propName];
            setter.apply(this, arguments);
            return this;
        };
    } else {
        proto[prop] = function(value) {
            if (value === undefined) return this[propName];
            this[propName] = value;
            return this;
        };
    }
}
/**
 * Creates default uki property function
 * <p>If value is given to this function it sets property to value
 * If no arguments given than function returns current property value</p>
 *
 * <p>Optional setter can be given. In this case setter will be called instead
 * of simple this[prop] = value</p>
 *
 * <p>If used as setter function returns self</p>
 *
 * @example
 *   uki.addProp(x, 'width');
 *   x.width(12); // x._width = 12
 *   x.width();   // return 12
 *   uki.addProp(x, ['width', 'height'])
 *
 * @param {Object} proto Prototype of the object to add property to
 * @param {string} prop Prop name
 * @param {function(object)=} setter
 * @returns {function(object=):object}
 */
fun.addProp = fun.addProps = function(proto, prop, setter) {
    if (utils.isArray(prop)) {
        for (var i =0, len = prop.length; i < len; i++) {
            addProp(proto, prop[i], setter && setter[i]);
        }
    } else {
        addProp(proto, prop, setter);
    }
};

fun.delegateProp = function(proto, name, target, targetName) {
    if (utils.isArray(name)) {
        utils.forEach(name, function(n, i) {
            fun.delegateProp(proto, n, target, targetName && targetName[i]);
        });
    } else {
        targetName = targetName || name;
        var propName = '_' + name;

        proto[name] = function(value) {
            if (value === undefined) {
                if (utils.prop(this, target))
                    return utils.prop(utils.prop(this, target), targetName);
                return this[propName];
            }
            if (utils.prop(this, target)) {
                utils.prop(utils.prop(this, target), targetName, value);
            } else {
                this[propName] = value;
            }
            return this;
        };
    }
};

fun.delegateCall = function(proto, name, target, targetName) {
    if (utils.isArray(name)) {
        utils.forEach(name, function(n, i) {
            fun.delegateCall(proto, n, target, targetName && targetName[i]);
        });
        return;
    } else {
        targetName = targetName || name;
        proto[name] = function() {
            var obj = utils.prop(this, target);
            return obj[targetName].apply(obj, arguments);
        };
    }
};

function timer ( fn, timeout, debounce ) {
    var running;

    return function() {
        // last call params
        var context = this,
            args = arguments;

        if (debounce && running) running = clearTimeout(running);
        running = running || setTimeout(function() {
            running = null;
            fn.apply(context, args);
        }, timeout);

    };
}

fun.trottle = function( fn, timeout ) {
    return timer(fn, timeout);
};

fun.debounce = function( fn, timeout ) {
    return timer(fn, timeout, true);
};

fun.defer = function( fn, timeout ) {
    timeout = timeout || 0;
    setTimeout(fn, timeout);
};

utils.extend(uki, fun);