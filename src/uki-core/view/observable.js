include('../view.js');

/**
 * @class
 */
uki.view.Observable = /** @lends uki.view.Observable.prototype */ {
    // dom: function() {
    //     return null; // should implement
    // },
    
    /**
     * @param {String} name Event name
     * @param {function()}
     */
    bind: function(name, callback) {
        callback.huid = callback.huid || uki.guid++;
        uki.each(name.split(' '), function(i, name) {
            if (!this._bound(name)) this._bindToDom(name);
            this._observersFor(name).push(callback);
        }, this);
        return this;
    },
    
    unbind: function(name, callback) {
        if (!this._observers) return;
        uki.each(name.split(' '), function(i, name) {
            this._observers[name] = !callback ? [] : uki.grep(this._observersFor(name, true), function(observer) {
                return observer != callback && observer.huid != callback.huid;
            });
            if (this._observers[name].length == 0) {
                this._unbindFromDom(name);
            }
        }, this);
        return this;
    },
    
    trigger: function(name/*, data1, data2*/) {
        var attrs = Array.prototype.slice.call(arguments, 1);
        uki.each(this._observersFor(name, true), function(i, callback) {
            callback.apply(this, attrs);
        }, this);
        return this;
    },
    
    _unbindFromDom: function(name) {
        if (!this._domHander || !this._eventTargets[name]) return;
        uki.dom.unbind(this._eventTargets[name], name, this._domHander);
    },
    
    _bindToDom: function(name, target) {
        if (!target && !this.dom) return false;
        this._domHander = this._domHander || uki.proxy(function(e) {
            e.source = this;
            this.trigger(e.type, e);
        }, this);
        this._eventTargets = this._eventTargets || {};
        this._eventTargets[name] = target || this.dom();
        uki.dom.bind(this._eventTargets[name], name, this._domHander);
        return true;
    },
    
    _bound: function(name) {
        return this._observers && this._observers[name];
    },
    
    _observersFor: function(name, skipCreate) {
        if (skipCreate && (!this._observers || !this._observers[name])) return [];
        if (!this._observers) this._observers = {};
        if (!this._observers[name]) this._observers[name] = [];
        return this._observers[name];
    }
};