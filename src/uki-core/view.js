var utils = require('./utils'),
    env   = require('./env');

var registry = {},
    ids = {};

/** @namespace */
module.exports = {
    register: function(view) {
        registry[view.dom()[env.expando]] = view;
    },

    unregister: function(view) {
        delete registry[view.dom()[env.expando]];
    },

    registerId: function(view) {
        ids[utils.prop(view, 'id')] = view;
    },
    
    unregisterId: function(view) {
        delete ids[utils.prop(view, 'id')];
    },
    
    byId: function(id) {
        return ids[id];
    },

    closest: function(dom) {
        while (dom) {
            var e = dom[env.expando];
            if (registry[e]) { return registry[e]; }
            dom = dom.parentNode;
        }
        return null;
    },

    contains: function(parent, child) {
        while (child) {
            if (child == parent) { return true; }
            child = child.parent();
        }
        return false;
    },

    newToggleClassProp: function(className) {
        return function(state) {
            if (state === undefined) { return this.hasClass(className); }
            return this.toggleClass(className, state);
        };
    },


    /**
     * @example
     *   newClass({...
     *      this.border = view.newClassMapProp({
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
                utils.forEach(classMap, function(clasName, enumName) {
                    if (this.hasClass(clasName)) {
                        res = enumName;
                        return false;
                    }
                }, this);
                return res;
            }

            utils.forEach(classMap, function(className, enumName) {
                this.toggleClass(className, state === enumName);
            }, this);
            return this;
        };
    }
};
