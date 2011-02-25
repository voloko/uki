var uki        = require('./uki-core/uki'),
    utils      = require('./uki-core/utils'),
    fun        = require('./uki-core/function'),
    dom        = require('./uki-core/dom'),
    evt        = require('./uki-core/dom/event'),
    gesture    = require('./uki-core/dom/gesture'),
    builder    = require('./uki-core/builder'),
    selector   = require('./uki-core/selector'),
    after      = require('./uki-core/after'),
    observable = require('./uki-core/observable'),
    binding    = require('./uki-core/binding'),
    attachment = require('./uki-core/attachment'),
    collection = require('./uki-core/collection'),
    mustache   = require('./uki-core/mustache');

// push everything into core namespace
utils.forEach([
    utils, fun, dom, evt, gesture, builder, selector, 
    after, observable, binding, attachment, collection,
    mustache
], function(ns) {
    utils.extend(uki, ns);
});

var view      = require('./uki-core/view'),
    focusable = require('./uki-core/view/focusable'),
    base      = require('./uki-core/view/base'),
    container = require('./uki-core/view/container');

// add view as uki.view namespace
uki.view = view;

// register view as default search path for views
builder.viewNamespaces.unshift(view);

// copy views from default view namespaces into view
utils.forEach([focusable, base, container], function(ns) {
    utils.extend(view, ns);
});

// export uki
module.exports = uki;
