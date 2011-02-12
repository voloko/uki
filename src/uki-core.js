require('./uki-core/compat');


var uki = require('./uki-core/uki').uki,
    utils = require('./uki-core/utils'),
    dom = require('./uki-core/dom');
    
utils.extend(uki, utils);

uki.dom = dom;
utils.extend(uki, dom);
utils.extend(dom, require('./uki-core/dom/event'));
utils.extend(dom, require('./uki-core/dom/gesture'));

utils.extend(uki, require('./uki-core/function'));
uki.build = require('./uki-core/builder').build;
uki.find = require('./uki-core/selector').find;
uki.after = require('./uki-core/after').after;

uki.Observable = require('./uki-core/observable').Observable;
uki.Stylesheet = require('./uki-core/stylesheet').Stylesheet;

uki.view = require('./uki-core/view');
uki.view.Observable = require('./uki-core/view/observable').Observable;
uki.view.Focusable = require('./uki-core/view/focusable').Focusable;
uki.view.Base = require('./uki-core/view/base').Base;
uki.view.Container = require('./uki-core/view/container').Base;

uki.Binding = require('./uki-core/binding').Binding;
uki.Attachement = require('./uki-core/attachment').Attachement;
uki.Mustache = require('uki-core/mustache').Mustache;


global.uki = uki;