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
        if (this.model && this.view) {
            this.view.removeListener(this.viewEvent,
                fun.bindOnce(this.updateModel, this));
            this.model.removeListener(this.modelEvent,
                fun.bindOnce(this.updateView, this));
        }
    },

    viewValue: function(value) {
        return arguments.length ? 
            utils.prop(this.view, this.viewProp, value) :
            utils.prop(this.view, this.viewProp);
    },

    modelValue: function(value) {
        return arguments.length ? 
            utils.prop(this.model, this.modelProp, value) :
            utils.prop(this.model, this.modelProp);
    },

    updateModel: function(e) {
        this._lockUpdate(function() {
            this.modelValue(this.viewValue());
        });
    },

    updateView: function(e) {
        this._lockUpdate(function() {
            this.viewValue(this.modelValue());
        });
    },

    _lockUpdate: function(callback) {
        if (!this._updating && this.viewValue() != this.modelValue()) {
            this._updating = true;
            try {
                callback.call(this);
            } catch (e) {
                this._updating = false;
                throw e;
            }
            this._updating = false;
        }
    }
});


exports.Binding = Binding;
