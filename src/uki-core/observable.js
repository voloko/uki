importScripts('uki.js');


uki.Observable = {
    addListener: function(names, callback) {
        names.split(' ').forEach(function(name) {
            this._listenersFor(name).push(callback);
        }, this);
        return this;
    },

    removeListener: function(names, callback) {
        names.split(' ').forEach(function(name) {
            var listeners = this._listenersFor(name, true);
            if (listeners) {
                this._listeners[name] = uki.without(listeners, callback);
            }
        }, this);
        return this;
    },

    trigger: function(e) {
        var name = e.type;
        this._listenersFor(name, true).forEach(function(callback) {
            callback.call(this, e);
        }, this);
        return this;
    },

    _listenersFor: function(name, skipCreate) {
        if (skipCreate && (!this._listeners || !this._listeners[name])) return [];
        if (!this._listeners) this._listeners = {};
        if (!this._listeners[name]) this._listeners[name] = [];
        return this._listeners[name];
    },

    destruct: function() {
        this._listeners = null;
    }
};
