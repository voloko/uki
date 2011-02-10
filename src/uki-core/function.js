importScripts('uki.js');


/**
 * Class and function utility functions.
 */
uki.extend(uki, (function() {

    // dummy subclass
    /** @ignore */
    function inheritance () {}

    this.bind = function( fn, context ) {
        var args = arrayPrototype.slice.call(arguments, 2),
            result = args.length ?
                function() {
                    return fn.apply(context || this, args.concat(uki.toArray(arguments)));
                } :
                function() {
                    return fn.apply(context || this, arguments);
                };
        return result;
    };

    this.bindOnce = function( fn, context ) {
        fn.huid = fn.huid || uki.guid++;
        var bindingName = '__binding_' + fn.huid;
        context[bindingName] = context[bindingName] || uki.bind( fn, context );
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
    this.newClass = function(/* [[superClass], mixin1, mixin2, ..], methods */) {
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
            } else if (uki.isFunction(base)) {
                // if function provided instead of {}
                definition = {};
                base.apply(definition, definitionArgs);
                uki.extend(klass.prototype, definition);
                definitionArgs.push(definition);
            } else {
                // just a plain simple mixin
                uki.extend(klass.prototype, base);
                definitionArgs.push(base);
            }

        };
        if (!klass.prototype.init) klass.prototype.init = function() {};
        return klass;
    };


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
     *   x.width = uki.newProperty('_width');
     *   x.width(12); // x._width = 12
     *   x.width();   // return 12
     *
     * @param {string} prop Prop name
     * @param {function(object)=} setter
     * @returns {function(object=):object}
     */
    this.newProp = function(prop, setter) {
        if (setter) {
            return function(value) {
                if (value === undefined) return this[prop];
                setter.apply(this, arguments);
                return this;
            };
        } else {
            return function(value) {
                if (value === undefined) return this[prop];
                this[prop] = value;
                return this;
            };
        }
    };

    /**
     * Adds several properties (uki.newProp) to a given object.
     * <p>Prop name equals to '_' + property name</p>
     *
     * @example
     *   uki.addProps(x, ['width', 'height'])
     *
     * @param {object} proto Object to add properties to
     * @param {Array.<string>} props Property names
     */
    this.addProps = function(proto, props) {
        for (var i =0, len = props.length; i<len; i++)
            proto[ props[i] ] = uki.newProp('_' + props[i]);
    };

    this.delegateProp = function(proto, name, target, targetName) {
        if (uki.isArray(name)) {
            name.forEach(function(n, i) {
                uki.delegateProp(proto, n, target, targetName && targetName[i]);
            });
        } else {
            targetName = targetName || name;
            var propName = '_' + name;

            proto[name] = function(value) {
                if (value === undefined) {
                    if (uki.prop(this, target))
                        return uki.prop(uki.prop(this, target), targetName);
                    return this[propName];
                }
                if (uki.prop(this, target)) {
                    uki.prop(uki.prop(this, target), targetName, value);
                } else {
                    this[propName] = value;
                }
                return this;
            };
        }
    };

    this.delegateCall = function(proto, name, target, targetName) {
        if (uki.isArray(name)) {
            name.forEach(function(n, i) {
                uki.delegateCall(proto, n, target, targetName && targetName[i]);
            });
            return;
        } else {
            targetName = targetName || name;
            proto[name] = function() {
                var obj = uki.prop(this, target);
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

    this.trottle = function( fn, timeout ) {
        return timer(fn, timeout);
    };

    this.debounce = function( fn, timeout ) {
        return timer(fn, timeout, true);
    };

    this.defer = function( fn, timeout ) {
        timeout = timeout || 0;
        setTimeout(fn, timeout);
    };


    return this;
}).call({}));

