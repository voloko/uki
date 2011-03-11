var fun   = require('./function'),
    utils = require('./utils');


var Binding = fun.newClass({
    view: null,
    model: null,
    modelProp: 'value',
    viewProp: 'value',
    modelEvent: '',
    viewEvent: 'blur',

    init: function(options) {
        utils.extend(this, options);
        if (!this.modelEvent) {
            this.modelEvent = 'change.' + this.modelProp;
        }

        if (this.model && this.view) {
            this.view.on(this.viewEvent,
                fun.bindOnce(this.updateModel, this));
            this.model.on(this.modelEvent,
                fun.bindOnce(this.updateView, this));
            if (this.sync !== false) {
                this.updateView();
            }
        }
    },

    destruct: function() {
        this.view.removeListener(this.viewEvent,
            fun.bindOnce(this.updateModel, this));
        this.model.removeListener(this.modelEvent,
            fun.bindOnce(this.updateView, this));
    },

    viewValue: function(value) {
        return utils.prop(this.view, this.viewProp, value);
    },

    modelValue: function(value) {
        return utils.prop(this.model, this.modelProp, value, this);
    },

    updateModel: function(e) {
        if (this.viewValue() != this.modelValue()) {
            this.modelValue(this.viewValue());
        }
    },

    updateView: function(e) {
        if ((!e || e.source !== this) &&
            this.viewValue() !== this.modelValue()) {

            this.viewValue(this.modelValue());
        }
    }
});


exports.Binding  = Binding;
