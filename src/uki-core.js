var env        = require('./uki-core/env'),
    utils      = require('./uki-core/utils'),
    fun        = require('./uki-core/function'),
    dom        = require('./uki-core/dom'),
    evt        = require('./uki-core/event'),
    gesture    = require('./uki-core/gesture'),
    builder    = require('./uki-core/builder'),
    selector   = require('./uki-core/selector'),
    after      = require('./uki-core/after'),
    observable = require('./uki-core/observable'),
    binding    = require('./uki-core/binding'),
    attachment = require('./uki-core/attachment'),
    collection = require('./uki-core/collection'),
    mustache   = require('./uki-core/mustache');

/**
 * Shortcut access to builder, selector and
 * Collection constructor
 * uki('#id') is also a shortcut for search view.byId
 *
 * @param {String|view.Base|Object|Array.<view.Base>} val
 * @param {Array.<view.Base>=} optional context for selector
 * @class
 * @namespace
 * @name uki
 * @return {Collection}
 */
function uki(val, context) {
    if (typeof val === "string") {

        var m = val.match(/^#((?:[\w\u00c0-\uFFFF_-]|\\.)+)$/),
            e = m && view.byId(m[1]);
        if (m && !context) {
            return new collection.Collection(e ? [e] : []);
        }
        return selector.find(val, context);

    }
    if (val.length === undefined) { val = [val]; }
    if (val.length > 0 && utils.isFunction(val[0].typeName)) {
        return new collection.Collection(val);
    }

    return builder.build(val);
}

uki.version = '0.4.0-css';

// push everything into core namespace
utils.forEach([
    env, utils, fun, dom, evt, gesture, builder, selector,
    after, observable, binding, attachment, collection,
    mustache
], function(mod) {
    utils.extend(uki, mod);
});



var view      = require('./uki-core/view'),
    base      = require('./uki-core/view/base'),
    container = require('./uki-core/view/container');

// add view as uki.view namespace
uki.view = view;

// register view as default search path for views
builder.viewNamespaces.unshift(view);

// copy views from default view namespaces into view
utils.forEach([base, container], function(mod) {
    utils.extend(view, mod);
});

// export uki
module.exports = uki;
