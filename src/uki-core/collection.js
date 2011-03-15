var fun = require('./function'),
    utils = require('./utils'),
    arrayPrototype = Array.prototype;

/**
 * Collection performs group operations on view objects.
 * <p>Behaves much like result jQuery(dom nodes).
 * Most methods are chainable like
 *   .prop('text', 'somevalue').on('click', function() { ... })</p>
 *
 * <p>Its easier to call build([view1, view2]) or find('selector')
 * instead of creating collection directly</p>
 *
 * @author voloko
 * @constructor
 * @class
 */
var Collection = fun.newClass({

    init: function(views) {
        this.length = 0;
        arrayPrototype.push.apply(this, views);
    },

    /**#@+ @memberOf Collection# */
    /**
     * Iterates trough all items within itself
     *
     * @function
     *
     * @param {function(this:view.Base, number, view.Base)} callback
     * @returns {view.Collection} self
     */
    forEach: function(callback, context) {
        return utils.forEach(this, callback, context);
    },

    /**
     * Creates a new Collection populated with found items
     *
     * @function
     *
     * @param {function(view.Base, number):boolean} callback
     * @returns {view.Collection} created collection
     */
    filter: function(callback, context) {
        return new Collection(utils.filter(this, callback, context));
    },

    map: function(callback, context) {
        return utils.map(this, callback, context);
    },

    /**
     * Sets an attribute on all views or gets the value of the attribute
     * on the first view
     *
     * @example
     * c.prop('text', 'my text') // sets text to 'my text' on all
     *                           // collection views
     * c.prop('name') // gets name attribute on the first view
     *
     * @function
     *
     * @param {string} name Name of the attribute
     * @param {object=} value Value to set
     * @returns {view.Collection|Object} Self or attribute value
     */
    prop: function(name, value) {
        if (value !== undefined) {
            for (var i = this.length - 1; i >= 0; i--) {
                utils.prop(this[i], name, value);
            }
            return this;
        } else {
            return this[0] ? utils.prop(this[0], name) : "";
        }
    },

    /**
     * Finds views within collection context
     * @example
     * c.find('Button')
     *
     * @function
     *
     * @param {string} selector
     * @returns {view.Collection} Collection of found items
     */
    find: function(selector) {
        return require('./selector').find(selector, this);
    },

    appendTo: function(target) {
        target = require('./builder').build(target)[0];
        this.forEach(function(view) {
            target.appendChild(view);
        });
        return this;
    },

    attach: function(dom) {
        this.forEach(function(view) {
            require('./attaching').Attaching.attach(dom, view);
            view.resized();
        });
        return this;
    },
    
    remove: function() {
        this.forEach(function(view) {
            if (view.parent()) {
                view.parent().removeChild(view);
            }
        });
    }
});

/**#@-*/

var proto = Collection.prototype;

/** @function
@name Collection#parent */
/** @function
@name Collection#next */
/** @function
@name Collection#prev */
utils.forEach([
    ['parent', 'parent'],
    ['next', 'nextView'],
    ['prev', 'prevView']
], function(desc, i) {
    proto[desc[0]] = function() {
        return new Collection(
            utils.unique(
                utils.filter(
                    utils.pluck(this, desc[1]),
                    function(v) { return !!v; }
                )
            )
        );
    };
});

Collection.addMethods = function(methods) {
    utils.forEach(methods, function(name) {
        if (!proto[name]) {
            proto[name] = function() {
                for (var i = this.length - 1; i >= 0; i--) {
                    this[i][name].apply(this[i], arguments);
                }
                return this;
            };
        }
    });
};

Collection.addProps = function(props) {
    utils.forEach(props, function(name) {
        if (!proto[name]) {
            proto[name] = function(value) {
                return this.prop(name, value);
            };
        }
    });
};


Collection.addMethods([
    'addListener', 'removeListener', 'trigger', 'on',
    'addClass', 'removeClass', 'toggleClass',
    'destruct', 'resized', 'scroll', 'clear'
]);

Collection.addProps([
    'id', 'dom', 'text', 'html', 'pos', 'visible', 'style', 'binding',
    'bindings'
]);


exports.Collection = Collection;
