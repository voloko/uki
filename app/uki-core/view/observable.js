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
            this._observers[name] = uki.grep(this._observers[name], function(observer) {
                return observer != callback;
            });
            if (this._observers[name].length == 0) {
                this._unbindFromDom(name);
            }
        }, this);
    },
    
    trigger: function(name/*, data1, data2*/) {
        var attrs = Array[PROTOTYPE].slice.call(arguments, 1);
        uki.each(this._observersFor(name, true), function(i, callback) {
            callback.apply(this, attrs);
        }, this);
    },
    
    _unbindFromDom: function(name, target) {
        if (!this._domHander || !this._eventTargets[name]) return;
        uki.dom.unbind(this._eventTargets[name], name, this._domHander);
    },
    
    _bindToDom: function(name, target) {
        var _this = this;
        this._domHander = this._domHander || function(e) {
            _this.trigger(e.type, {domEvent: e, source: _this});
        };
        this._eventTargets = this._eventTargets || {};
        this._eventTargets[name] = target || this.dom();
        uki.dom.bind(this._eventTargets[name], name, this._domHander);
        return true;
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