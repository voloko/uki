var env        = require('./uki-core/env'),
    utils      = require('./uki-core/utils'),
    builder    = require('./uki-core/builder'),
    selector   = require('./uki-core/selector'),
    collection = require('./uki-core/collection');

/**
 * Shortcut access to builder, selector and
 * Collection constructor
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
        return selector.find(val, context);
    }
    if (val.length === undefined) { val = [val]; }
    if (val.length > 0 && utils.isFunction(val[0].typeName)) {
        return new collection.Collection(val);
    }
    return builder.build(val);
}

uki.version = '0.4.0a4';

// push everything into core namespace
utils.extend(uki,
    env, utils, builder, selector, collection,
    require('./uki-core/function'),
    require('./uki-core/dom'),
    require('./uki-core/event'),
    require('./uki-core/gesture'),
    require('./uki-core/observable'),
    require('./uki-core/binding'),
    require('./uki-core/attaching'),
    require('./uki-core/mustache')
);



var view = require('./uki-core/view');

// add view as uki.view namespace
uki.view = view;

// register view as default search path for views
builder.namespaces.unshift(view);

// copy views from default view namespaces into view
utils.extend(view,
    require('./uki-core/view/base'),
    require('./uki-core/view/focusable'),
    require('./uki-core/view/container')
);

// export uki
module.exports = uki;
