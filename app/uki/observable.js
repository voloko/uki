include('../uki.js');

/**
 * Легковесная поддержка событий без баблинга
 */
uki.Observable = {
    bind: function(name, callback) {
        var _this = this;
        $.each(name.split(' '), function(i, name) {
            _this._observersFor(name).push(callback);
        });
    },
    
    unbind: function(name, callback) {
        var _this = this;
        $.each(name.split(' '), function(i, name) {
            _this._observers[name] = $.grep(_this._observersFor(name), function(c) {
                return c != callback;
            });
        });
    },
    
    trigger: function(name/*, data1, data2*/) {
        var attrs = Array.prototype.slice.call(arguments, 1);
        $.each(this._observersFor(name), function(i, callback) {
            callback.apply(this, attrs);
        });
    },
    
    _observersFor: function(name) {
        if (!this._observers) this._observers = {};
        if (!this._observers[name]) this._observers[name] = [];
        return this._observers[name];
    }
};