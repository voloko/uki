var fun = require('./function'),
    utils = require('./utils');


exports.Binding = fun.newClass({
    view: null,
    model: null,
    modelProp: 'value',
    viewProp: 'value',
    modelEvent: '',
    viewEvent: 'change',
    commitChangesViewEvent: 'blur',

    init: function(view, model, options) {
        utils.extend(this, options);

        this.view = view;
        this.model = model;
        if (!this.modelEvent) this.modelEvent = 'change.' + this.modelProp;

        if (this.model && this.view) {
            this.view.addListener(this.viewEvent,
                fun.bindOnce(this.updateModel, this));
            this.model.addListener(this.modelEvent,
                fun.bindOnce(this.updateView, this));
            if (this.sync !== false) this.updateView();
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

        if (e && e.type == this.commitChangesViewEvent && this.model.commitChanges)
            this.model.commitChanges(this.modelProp);
    },

    updateView: function(e) {
        if ((!e || e.source !== this) && this.viewValue() !== this.modelValue()) {
            this.viewValue(this.modelValue());
        }
    }
});
