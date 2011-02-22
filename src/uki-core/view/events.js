var evt = require('../dom/event'),
    fun = require('../function'),
    utils = require('../utils');

/* Events mixin */
var Events = {};

Events.domForEvent = function(type) {
    return this.dom();
};

/**
 * @param {String} name Event name
 * @param {function()} callback
 */
Events.addListener = function(names, callback) {
    var wrapper = fun.bindOnce(callback, this);
    names.split(' ').forEach(function(name) {
        evt.addListener(this.domForEvent(name), name, wrapper);
    }, this);
    return this;
};

Events.removeListener = function(names, callback) {
    var wrapper = fun.bindOnce(callback, this);
    names.split(' ').forEach(function(name) {
        evt.removeListener(this.domForEvent(name), name, wrapper);
    }, this);
    return this;
};

Events.trigger = function(e) {
    var wrapped = evt.createEvent(e, { target: this.domForEvent(e.type) });
    return evt.trigger.call(this, e);
};

Events.destruct = function() {
    evt.removeListener();
};

Events.on = Events.addListener;
Events.emit = Events.trigger;


require('../view').Events = exports.Events = Events;