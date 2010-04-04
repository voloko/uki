include('data.js');
/**
 * Легковесная поддержка событий без баблинга
 */
uki.data.Observable = {
    bind: function(name, callback) {
        var _this = this;
        callback.huid = callback.huid || uki.guid++;
        uki.each(name.split(' '), function(i, name) {
            _this._observersFor(name).push(callback);
        });
    },
    
    unbind: function(name, callback) {
        var _this = this;
        uki.each(name.split(' '), function(i, name) {
            _this._observers[name] = !callback ? [] : uki.grep(_this._observersFor(name), function(c) {
                return c != callback && c.huid != callback.huid;
            });
            if (_this._observers[name]) delete _this._observers[name];
        });
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