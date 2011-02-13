var dom = require('../dom'),
    fun = require('../function'),
    utils = require('../utils'),
    Base = require('../observable').Observable;


var Observable = utils.extend({}, Base);

Observable.specialEvents = [];

Observable.isSpecial = function(name) {
    return name.match(/[\.:]/) || this.specialEvents.indexOf(name) > -1;
};

Observable.domForEvent = function(type) {
    return this.dom();
};

/**
 * @param {String} name Event name
 * @param {function()} callback
 */
Observable.addListener = function(names, callback) {
    names.split(' ').forEach(function(name) {
        this.isSpecial(name) ?
            Base.addListener.call(this, name, callback) :
            this._addDomListener(name, callback);
    }, this);
    return this;
};

Observable.removeListener = function(names, callback) {
    if (!this._listeners) return this;
    names.split(' ').forEach(function(name) {
        this.isSpecial(name) ?
            Base.removeListener.call(this, name, callback) :
            this._removeDomListener(name, callback);
    }, this);
    return this;
};

Observable.trigger = function(e) {
    return Base.trigger.call(this, e);
};

Observable._addDomListener = function(name, callback) {
    var wrapper = fun.bindOnce(callback, this);
    wrapper.huid = callback.huid;
    Base.addListener.call(this, name, wrapper);
    dom.addListener(this.domForEvent(name), name, wrapper);
};

Observable._removeDomListener = function(name, callback) {
    var wrapper = fun.bindOnce(callback, this);

    Base.removeListener.call(this, name, wrapper);
    dom.removeListener(this.domForEvent(name), name, wrapper);
};

Observable.triggerDom = function(e) {
    dom.trigger(this.domForEvent(e.type), e);
    return this;
};

Observable.destruct = function() {
    // clean up all dom listeners, so we do not have backreferences
    // in some closures, within uki.dom.event
    utils.forEach(this._listeners || [], function(listeners, type) {
        if (!this.isSpecial(type)) listeners.forEach(function(l) {
            this._removeDomListener(type, l);
        }, this);
    }, this);
    Base.destruct.call(this);
};

Observable.on = Observable.addListener;
Observable.emit = Observable.trigger;



require('../view').Observable = exports.Observable = Observable;