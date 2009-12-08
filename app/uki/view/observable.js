include('../view.js');

uki.view.Observable = {
    // dom: function() {
    //     return null; // should implement
    // },
    
    bind: function(name, callback) {
        uki.each(name.split(' '), function(i, name) {
            if (!this._bound(name) && this._boundToDom) {
                this._bindToDom(name);
            }
            this._observersFor(name).push(callback);
        }, this);
    },
    
    unbind: function(name, callback) {
        uki.each(name.split(' '), function(i, name) {
            uki.dom.unbind( this.dom(), name, callback );
        }, this);
    },
    
    trigger: function(name/*, data1, data2*/) {
        var attrs = Array.prototype.slice.call(arguments, 1);
        uki.each(this._observersFor(name, true), function(i, callback) {
            callback.apply(this, attrs);
        }, this);
    },
    
    _bindToDom: function(name) {
        var _this = this;
        uki.dom.bind(this.dom(), name, function(e) {
            _this.trigger(name, {domEvent: e, source: _this});
        });
    },
    
    _bound: function(name) {
        return this._observers && this._observers[name];
    },
    
    _bindPendingEventsToDom: function() {
        if (this._boundToDom) return;
        this._boundToDom = true;
        if (!this._observers) return;
        uki.each(this._observers, function(name) {
            this._bindToDom(name);
        }, this);
    },
    
    _observersFor: function(name, skipCreate) {
        if (skipCreate && (!this._observers || !this._observers[name])) return [];
        if (!this._observers) this._observers = {};
        if (!this._observers[name]) this._observers[name] = [];
        return this._observers[name];
    }
};