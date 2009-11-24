include('../dom.js');

/**
 * Легковесная поддержка событий без баблинга
 */
uki.dom.Observable = {
    dom: function() {
        return null; // should implement
    },
    
    knownEvents: function() {
        return []; // should implement
    },
    
    bind: function(name, callback) {
        var _this = this,
            wrapper;
        uki.each(name.split(' '), function(i, name) {
            if (uki.inArray( name, this.knownEvents() ) == -1) {
                wrapper = wrapper || function() { callback.apply(_this, arguments); };
                uki.dom.bind( this.dom(), name, wrapper );
                callback.huid = wrapper.huid;
            } else {
                this._observersFor(name).push(callback);
            }
        }, this);
    },
    
    unbind: function(name, callback) {
        uki.each(name.split(' '), function(i, name) {
            if (uki.inArray( name, this.knownEvents() ) == -1) {
                uki.dom.unbind( this.dom(), name, callback );
            } else {
                this._observers[name] = uki.grep(this._observersFor(name), function(c) {
                    return c !== callback;
                });
            }
        }, this);
    },
    
    trigger: function(name/*, data1, data2*/) {
        var attrs = Array.prototype.slice.call(arguments, 1);
        uki.each(this._observersFor(name, true), function(i, callback) {
            callback.apply(this, attrs);
        }, this);
    },
    
    _observersFor: function(name, skipCreate) {
        if (skipCreate && (!this._observers || !this._observers[name])) return [];
        if (!this._observers) this._observers = {};
        if (!this._observers[name]) this._observers[name] = [];
        return this._observers[name];
    }
};