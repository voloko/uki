var evt = require('../dom/event'),
    fun = require('../function'),
    utils = require('../utils');


var Observable = {};

Observable.domForEvent = function(type) {
    return this.dom();
};

/**
 * @param {String} name Event name
 * @param {function()} callback
 */
Observable.addListener = function(names, callback) {
    var wrapper = fun.bindOnce(callback, this);
    names.split(' ').forEach(function(name) {
        evt.addListener(this.domForEvent(name), name, wrapper);
    }, this);
    return this;
};

Observable.removeListener = function(names, callback) {
    var wrapper = fun.bindOnce(callback, this);
    names.split(' ').forEach(function(name) {
        evt.removeListener(this.domForEvent(name), name, wrapper);
    }, this);
    return this;
};

Observable.trigger = function(e) {
    var wrapped = evt.createEvent(e, { target: this.domForEvent(e.type) });
    return evt.trigger.call(this, e);
};

Observable.destruct = function() {
    evt.removeListener();
};

Observable.on = Observable.addListener;
Observable.emit = Observable.trigger;


require('../view').Observable = exports.Observable = Observable;