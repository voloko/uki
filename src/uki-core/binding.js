importScripts('uki.js');

uki.Binding = uki.newClass(function() {
    this.view = null;
    this.model = null;
    this.modelProp = 'value';
    this.viewProp = 'value';
    this.modelEvent = '';
    this.viewEvent = 'change';
    this.commitChangesViewEvent = 'blur';

    this.init = function(view, model, options) {
        uki.extend(this, options);

        this.view = view;
        this.model = model;
        if (!this.modelEvent) this.modelEvent = 'change.' + this.modelProp;

        if (this.model && this.view) {
            this.view.addListener(this.viewEvent,
                uki.bindOnce(this.updateModel, this));
            this.model.addListener(this.modelEvent,
                uki.bindOnce(this.updateView, this));
            if (this.sync !== false) this.updateView();
        }
    };

    this.destruct = function() {
        this.view.removeListener(this.viewEvent,
            uki.bindOnce(this.updateModel, this));
        this.model.removeListener(this.modelEvent,
            uki.bindOnce(this.updateView, this));
    };

    this.viewValue = function(value) {
        return uki.prop(this.view, this.viewProp, value);
    };

    this.modelValue = function(value) {
        return uki.prop(this.model, this.modelProp, value, this);
    };

    this.updateModel = function(e) {
        if (this.viewValue() != this.modelValue()) {
            this.modelValue(this.viewValue());
        }

        if (e && e.type == this.commitChangesViewEvent && this.model.commitChanges)
            this.model.commitChanges(this.modelProp);
    };

    this.updateView = function(e) {
        if ((!e || e.source !== this) && this.viewValue() !== this.modelValue()) {
            this.viewValue(this.modelValue());
        }
    };
});
