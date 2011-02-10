importScripts('../view.js');
importScripts('../observable.js');

/**
 * @class
 */
uki.view.Observable = (function() {
    var Base = uki.Observable;
    uki.extend(this, Base);

    this.specialEvents = [];

    this.isSpecial = function(name) {
        return name.match(/[\.:]/) || this.specialEvents.indexOf(name) > -1;
    };

    this.domForEvent = function(type) {
        return this.dom();
    };

    /**
     * @param {String} name Event name
     * @param {function()} callback
     */
    this.addListener = function(names, callback) {
        names.split(' ').forEach(function(name) {
            this.isSpecial(name) ?
                Base.addListener.call(this, name, callback) :
                this._addDomListener(name, callback);
        }, this);
        return this;
    };

    this.removeListener = function(names, callback) {
        if (!this._listeners) return this;
        names.split(' ').forEach(function(name) {
            this.isSpecial(name) ?
                Base.removeListener.call(this, name, callback) :
                this._removeDomListener(name, callback);
        }, this);
        return this;
    };

    this.trigger = function(e) {
        return Base.trigger.call(this, e);
    };

    this._addDomListener = function(name, callback) {
        var wrapper = uki.bindOnce(callback, this);
        wrapper.huid = callback.huid;
        Base.addListener.call(this, name, wrapper);
        uki.dom.addListener(this.domForEvent(name), name, wrapper);
    };

    this._removeDomListener = function(name, callback) {
        var wrapper = uki.bindOnce(callback, this);

        Base.removeListener.call(this, name, wrapper);
        uki.dom.removeListener(this.domForEvent(name), name, wrapper);
    };

    this.triggerDom = function(e) {
        uki.dom.trigger(this.domForEvent(e.type), e);
        return this;
    };

    this.destruct = function() {
        // clean up all dom listeners, so we do not have backreferences
        // in some closures, within uki.dom.event
        uki.forEach(this._listeners || [], function(listeners, type) {
            if (!this.isSpecial(type)) listeners.forEach(function(l) {
                this._removeDomListener(type, l);
            }, this);
        }, this);
        Base.destruct.call(this);
    };

    return this;
}).call({});
