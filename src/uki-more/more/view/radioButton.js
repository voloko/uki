include('toggleButton.js');

uki.view.declare('uki.more.view.RadioButton', uki.more.view.ToggleButton, function(base) {
    var manager = uki.view.Radio;
    
    this.group = uki.newProp('_group', function(g) {
        manager.unregisterGroup(this);
        this._group = g;
        manager.registerGroup(this);
        if (this.checked()) manager.clearGroup(this);
    });
    
    this.value = this.checked = uki.newProp('_checked', function(state) {
        this._checked = !!state;
        if (state) manager.clearGroup(this);
        this._updateBg();
    });
    
    this._mouseup = function() {
        if (!this._down) return;
        this._down = false;
        if (!this._checked && !this._disabled) {
            this.checked(!this._checked);
            this.trigger('change', {checked: this._checked, source: this});
        }
    }
});