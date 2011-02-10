importScripts('data.js');
/**
 *
 * @example
 * myModel = uki.newClass(uki.data.Model, function() {
 *     this.name = uki.data.model.newProp('name');
 *     this.sex = uki.data.model.newProp('sex');
 * })
 *
 * var m = new myModel({ age: 22, name: 'Jonh Smith', sex: 'm' })
 * m.addListener('change.sex', function() {
 *     alert('omg! wtf!');
 * });
 *
 * m.addListener('change', function(e) {
 *     console.log(e.props); // used
 * });
 *
 * m.name('Joe Black') // triggers 'change' and 'change.name'
 * m.sex('w') // triggers'change' and 'change.sex'
 */
uki.data.Model = uki.newClass(uki.Observable, function(STATIC, Observable) {
    this.triggerChanges = function(name, source) {
        this.trigger({ type: 'change.' + name, model: this, source: source });
        this.trigger({ type: 'change', name: name, model: this, source: source });
        return this;
    };

    this.muteChanges = function(value) {
        if (value === undefined) return this._originalTriggerChanges && this.triggerChanges === this._originalTriggerChanges;
        if (!this._originalTriggerChanges) this._originalTriggerChanges = this.triggerChanges;
        this.triggerChanges = value ? uki.FS : this._originalTriggerChanges;
        return this;
    };
});

uki.data.model = {
    newProp: function(name, setter) {
        var propName = '_' + name;
        return uki.newProp(propName, function(v, source) {
            var oldValue = this[name](),
                newValue;
            if (setter) {
                setter.call(this, v);
            } else {
                this[propName] = v;
            }
            newValue = this[name]();
            if (oldValue !== newValue) {
                this.triggerChanges(name, source);
            }
        });
    }
};
