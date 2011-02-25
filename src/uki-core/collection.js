var fun = require('./function'),
    utils = require('./utils'),
    arrayPrototype = Array.prototype;

/**
 * Collection performs group operations on uki.view objects.
 * <p>Behaves much like result jQuery(dom nodes).
 * Most methods are chainable like
 *   .prop('text', 'somevalue').on('click', function() { ... })</p>
 *
 * <p>Its easier to call uki([view1, view2]) or uki('selector')
 * instead of creating collection directly</p>
 *
 * @author voloko
 * @constructor
 * @class
 */
var Collection = fun.newClass({

    init: function(elems) {
        this.length = 0;
        arrayPrototype.push.apply(this, elems);
    },

    /**#@+ @memberOf uki.Collection# */
    /**
     * Iterates trough all items within itself
     *
     * @function
     *
     * @param {function(this:uki.view.Base, number, uki.view.Base)} callback
     * @returns {uki.view.Collection} self
     */
    forEach: function(callback, context) {
        return utils.forEach(this, callback, context);
    },

    /**
     * Creates a new uki.Collection populated with found items
     *
     * @function
     *
     * @param {function(uki.view.Base, number):boolean} callback
     * @returns {uki.view.Collection} created collection
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
     * @returns {uki.view.Collection|Object} Self or attribute value
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
     * @returns {uki.view.Collection} Collection of found items
     */
    find: function(selector) {
        return require('./selector').find(selector, this);
    },

    /**
     * Appends views to the first item in collection
     *
     * @function
     *
     * @param {Array.<uki.view.Base>} views Views to append
     * @returns {uki.view.Collection} self
     */
    append: function(views) {
        var target = this[0];
        if (!target) { return this; }

        views = views.length !== undefined ? views : [views];

        for (var i = views.length - 1; i >= 0; i--) {
            target.appendChild(views[i]);
        }

        return this;
    },

    appendTo: function(target) {
        target = require('./builder').build(target)[0];
        this.forEach(function(view) {
            target.appendChild(view);
        });
        return this;
    },

    attach: function(target) {
        this.forEach(function(view) {
            require('./attachment').Attachment.attach(target, view);
            view.resized();
        });
        return this;
    }
});

/**#@-*/

var proto = Collection.prototype;

/** @function
@name uki.Collection#parent */
/** @function
@name uki.Collection#next */
/** @function
@name uki.Collection#prev */
utils.forEach([
    ['parent', 'parent'],
    ['next', 'nextView'],
    ['prev', 'prevView']
], function(i, desc) {
    proto[desc[0]] = function() {
        return new Collection(
            utils.unique(
                this.map(this, function(view) {
                    return utils.prop(view, desc[1]);
                })
            )
        );
    };
});


/** @function
@name uki.Collection#addListener */
/** @function
@name uki.Collection#unload */
/** @function
@name uki.Collection#trigger */
/** @function
@name uki.Collection#layout */
/** @function
@name uki.Collection#appendChild */
/** @function
@name uki.Collection#removeChild */
/** @function
@name uki.Collection#insertBefore */
/** @function
@name uki.Collection#toggle */
utils.forEach([
    'addListener', 'removeListener', 'trigger', 'on', 'emit',
    'appendChild', 'removeChild', 'insertBefore', 'toggle'
], function(name) {
    proto[name] = function() {
        for (var i = this.length - 1; i >= 0; i--) {
            this[i][name].apply(this[i], arguments);
        }
        return this;
    };
});


exports.Collection = Collection;
