var utils = require('./utils'),
    uki = require('./uki'),
    fun = require('./function');

var Observable = {
    addListener: function(names, callback) {
        utils.forEach(names.split(' '), function(name) {
            this._listenersFor(name).push(callback);
        }, this);
        return this;
    },

    removeListener: function(names, callback) {
        if (names) {
            names = utils.keys(this._listeners || {}).join(' ');
        }
        utils.forEach(names.split(' '), function(name) {
            var listeners = this._listenersFor(name, true);
            if (listeners) {
                this._listeners[name] = utils.without(listeners, callback);
            }
        }, this);
        return this;
    },

    trigger: function(e) {
        var type = e.type;
        utils.forEach(this._listenersFor(type, true), function(callback) {
            callback.call(this, e);
        }, this);
        return this;
    },

    _listenersFor: function(name, skipCreate) {
        if (skipCreate && (!this._listeners || !this._listeners[name])) {
            return [];
        }
        if (!this._listeners) {
            this._listeners = {};
        }
        if (!this._listeners[name]) {
            this._listeners[name] = [];
        }
        return this._listeners[name];
    },

    destruct: function() {
        this._listeners = null;
    },

    triggerChanges: function(name, source) {
        this.trigger({ type: 'change.' + name, model: this, source: source });
        this.trigger({ type: 'change', name: name, model: this, source: source });
        return this;
    },

    muteEvents: function(value) {
        if (value === undefined) {
            return this._originalTrigger && this.trigger !== this._originalTrigger;
        }
        if (!this._originalTrigger) {
            this._originalTrigger = this.trigger;
        }
        this.trigger = value ? uki.FS : this._originalTrigger;
        return this;
    }
};

Observable.on = Observable.addListener;
Observable.emit = Observable.trigger;

function addProp (proto, prop, setter) {
    var propName = '_' + prop;
    proto[prop] = function(value, source) {
        if (value === undefined) return this[propName];

        var oldValue = this[prop](),
            newValue;
        if (setter) {
            setter.call(this, value);
        } else {
            this[propName] = value;
        }
        newValue = this[prop]();
        if (oldValue !== newValue) {
            this.triggerChanges(prop, source);
        }
        return this;
    };
}

uki.addOProps = Observable.addProps =
    uki.addOProp = Observable.addProp = function(proto, prop, setter) {
    if (utils.isArray(prop)) {
        for (var i =0, len = prop.length; i < len; i++) {
            addProp(proto, prop[i], setter && setter[i]);
        }
    } else {
        addProp(proto, prop, setter);
    }
};

uki.Observable = exports.Observable = Observable;
