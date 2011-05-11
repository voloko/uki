var utils = require('./utils'),
    fun = require('./function');

var Observable = {
    addListener: function(names, callback) {
        utils.forEach(names.split(' '), function(name) {
            if (!this._listeners) { this._listeners = {}; }
            if (!this._listeners[name]) { this._listeners[name] = []; }
            this._listeners[name].push(callback);
        }, this);
        return this;
    },

    removeListener: function(names, callback) {
        if (!names) {
            delete this._listeners;
        } else {
            var listeners = this._listeners;
            if (listeners) {
                utils.forEach(names.split(' '), function(name) {
                    if (listeners[name]) {
                        listeners[name] = callback ?
                            utils.without(listeners[name], callback) : [];
                    }
                }, this);
            }
        }
        return this;
    },

    trigger: function(e) {
        var type = e.type,
            listeners = this._listeners;
        if (listeners && listeners[type]) {
            utils.forEach(listeners[type], function(callback) {
                callback.call(this, e);
            }, this);
        }
        return this;
    },

    destruct: function() {
        delete this._listeners;
    },

    triggerChanges: function(name) {
        this.trigger({
            type: 'change.' + name,
            model: this
        });
        this.trigger({
            type: 'change',
            name: name,
            model: this
        });
        return this;
    },

    muteEvents: function(value) {
        if (value === undefined) {
            return this._originalTrigger &&
                this.trigger !== this._originalTrigger;
        }
        if (!this._originalTrigger) {
            this._originalTrigger = this.trigger;
        }
        this.trigger = value ? fun.FS : this._originalTrigger;
        return this;
    }
};

Observable.on = Observable.addListener;

function newProp(prop, setter) {
    var propName = '_' + prop;
    return function(value) {
        if (value === undefined) { return this[propName]; }

        var oldValue = this[prop](),
            newValue;
        if (setter) {
            setter.call(this, value);
        } else {
            this[propName] = value;
        }
        newValue = this[prop]();
        if (oldValue !== newValue) {
            this.triggerChanges(prop);
        }
        return this;
    };
}

Observable.newProp = newProp;

Observable.addProps = Observable.addProp =
    function(proto, prop, setter) {

    if (utils.isArray(prop)) {
        for (var i = 0, len = prop.length; i < len; i++) {
            proto[prop[i]] = newProp(prop[i], setter && setter[i]);
        }
    } else {
        proto[prop] = newProp(prop, setter);
    }
};

exports.Observable = Observable;
