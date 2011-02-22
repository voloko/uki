var utils = require('./utils'),
    uki = require('./uki'),
    fun = require('./function');

var Observable = {
    addListener: function(names, callback) {
        names.split(' ').forEach(function(name) {
            this._listenersFor(name).push(callback);
        }, this);
        return this;
    },

    removeListener: function(names, callback) {
        if (names) {
            names = Object.keys(this._listeners || {}).join(' ');
        }
        names.split(' ').forEach(function(name) {
            var listeners = this._listenersFor(name, true);
            if (listeners) {
                this._listeners[name] = utils.without(listeners, callback);
            }
        }, this);
        return this;
    },

    trigger: function(e) {
        var type = e.type;
        this._listenersFor(type, true).forEach(function(callback) {
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

uki.newOProp = Observable.newProp = function(name, setter) {
    var propName = '_' + name;
    return function(value, source) {
        if (value === undefined) return this[propName];
        
        var oldValue = this[name](),
            newValue;
        if (setter) {
            setter.call(this, value);
        } else {
            this[propName] = value;
        }
        newValue = this[name]();
        if (oldValue !== newValue) {
            this.triggerChanges(name, source);
        }
        return this;
    };
};

uki.Observable = exports.Observable = Observable;
