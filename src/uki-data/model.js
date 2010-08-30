include('observable.js');

/**
 *
 * @example
 * myModel = uki.newClass(uki.data.Model, function() {
 *     uki.data.model.addFields(this, ['name', 'age', 'sex']);
 * })
 *
 * var m = new myModel({ age: 22, name: 'Jonh Smith', sex: 'm' })
 * m.bind('change.sex', function() {
 *     alert('omg! wtf!');
 * });
 *
 * m.bind('change', function(e) {
 *     console.log(e.fields);
 * });
 *
 * m.name('Joe Black') // triggers 'change' and 'change.name'
 * m.sex('w') // triggers'change' and 'change.sex'
 */
uki.data.Model = uki.newClass(uki.data.Observable, function(Observable) {
    
    this._fields = [];
    
    this.init = function(values) {
        this.update(values || {});
    };
    
    this.fields = function() {
        return this._fields;
    };
    
    this.update = function(values) {
        var fields = [], changes = {};
        
        uki.each(values, function(name, value) {
            var field = uki.isFunction(this[name]) ? '_' + name : name;
            if (this[field] != value) {
                changes[name] = true;
                fields.push(name);
                this[field] = value;
                this.trigger('change.' + name, { model: this });
            }
        }, this);
        
        if (fields.length) this.trigger('change', {changes: changes, fields: fields, model: this});
        return this;
    };
    
});

uki.data.model = {
    _newProp: function(name) {
        return uki.newProp('_' + name, function(v) {
            var changes = {};
            changes[name] = v;
            this.update(changes);
        });
    },
    
    addFields: function(target, names) {
        for (var i=0; i < names.length; i++) {
            target[names[i]] = uki.data.model._newProp(names[i]);
        }
        // do not break prototypes
        target._fields = names.concat(target._fields || []);
    },
    
    newLoader: function(name, options) {
        return function(callback) {
            callback = callback || uki.F;
            if (this['loaded.' + name]) {
                callback.call(this, this[name]());
            } else {
                this.bind('load.' + name, callback);
                if (!this['loading.' + name]) {
                    this['loading.' + name] = true;
                    uki.ajax(uki.extend({
                        url: uki.isFunction(options.url) ? options.url.call(this) : options.url,
                        data: uki.isFunction(options.data) ? options.data.call(this) : options.data ? options.data : { id: this.id() },
                        success: uki.proxy(function(val) {
                            this['loading.' + name] = false;
                            this['loaded.' + name] = true;
                            options.setter ? options.setter.call(this, val) : this['_' + name] = val;
                            this.trigger('load.' + name, val);
                            this.unbind('load.' + name);
                        }, this)
                    }, options.ajaxOptions || {}));
                }
            }
        };
    }
};
