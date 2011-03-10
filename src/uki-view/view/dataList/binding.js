
var fun = require('uki-core/function'),
    BaseBinding = require('uki-core/binding').Binding;
    
    
var Binding = fun.newClass(BaseBinding, {
    modelEvent: 'change.item',
    
    updateView: function() {
        if ((!e || e.source !== this) &&
            this.viewValue() !== this.modelValue()) {

            this.viewValue(this.modelValue());
        }
    }
});

exports.Binding = Binding;
