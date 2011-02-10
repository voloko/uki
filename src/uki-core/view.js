importScripts('uki.js');

/** @namespace */
uki.view = {
    _registry: {},

    register: function(view) {
        this._registry[view.dom()[expando]] = view;
    },

    unregister: function(view) {
        delete this._registry[view.dom()[expando]];
    },

    closest: function(dom) {
        while (dom) {
            var e = dom[expando];
            if (this._registry[e]) return this._registry[e];
            dom = dom.parentNode;
        }
        return null;
    },

    contains: function(parent, child) {
        while (child) {
            if (child == parent) return true;
            child = child.parent();
        }
        return false;
    },

    /**
    * The only reason this exists, is because
    * I do not want to write typeName function manually.
    */
    declare: function(/*name, baseClasses, implementation*/) {
        var args  = uki.toArray(arguments),
            name  = args.shift(),
            klass = uki.newClass.apply(uki, args),
            parts = name.split('.'),
            obj   = root,
            i, part, l = parts.length - 1;

        klass.prototype.typeName = function() { return name; };

        for ( i= 0; i < l; i++ ) {
            part = parts[i];
            if (!obj[part]) obj[part] = {};
            obj = obj[part];
        };

        obj[ parts[l] ] = klass;
        return klass;
    },

    newToggleClassProp: function(className) {
        return function(state) {
            if (state === undefined) return this.hasClass(className);
            return this.toggleClass(className, state);
        };
    },


    /**
     * @example
     *   newClass({...
     *      this.border = uki.view.newClassMapProp({
     *          wide: 'my-border-wide'
     *          none: 'my-border-none'
     *          thin: 'my-border-thin'
     *      })
     *   ...})
     *
     *  x = new X()
     *  x.border('wide') // className = 'my-border-wide'
     *  x.border() // => wide
     *  x.border('none') // className = 'my-border-none'
     *  x.border() // => none
     */
    newClassMapProp: function(classMap) {
        return function(state) {
            if (state === undefined) {
                var res;
                uki.forEach(classMap, function(clasName, enumName) {
                    if (this.hasClass(clasName)) {
                        res = enumName;
                        return false;
                    }
                }, this);
                return res;
            }

            uki.forEach(classMap, function(className, enumName) {
                this.toggleClass(className, state === enumName);
            }, this);
            return this;
        };
    }
};
