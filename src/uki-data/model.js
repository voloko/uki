include('observable.js');

uki.data.Model = uki.newClass(uki.data.Observable, function(Observable) {
    
    this.change = this.update = function(values, arg2) {
        var changes = {}, fields = [];
        if (arg2 !== undefined) {
            var tmp = {};
            tmp[values] = arg2;
            values = tmp;
        }
        uki.each(values, function(i) {
            if (this[i] != values[i]) {
                changes[i] = true
                fields.push(i);
                this[i] = values[i];
            }
        }, this);
        
        this._triggerChange({changes: changes, fields: fields, model: this});
        return this;
    };
    
    this._triggerChange = function(e) {
        this.trigger('change', e);
    };
    
});