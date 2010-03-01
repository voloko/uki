uki.view.declare('uki.more.view.ToggleButton', uki.view.Button, function(Base) {
    
    this._setup = function() {
        Base._setup.call(this);
        this._focusable = false;
    };
    
    this.value = this.checked = uki.newProp('_checked', function(state) {
        this._checked = !!state;
        this._updateBg();
    });
    
    this._updateBg = function() {
        var name = this._disabled ? 'disabled' : this._down || this._checked ? 'down' : this._over ? 'hover' : 'normal';
        this._backgroundByName(name);
    };
    
    this._mouseup = function(e) {
        if (!this._down) return;
        this._down = false;
        if (!this._disabled) this.checked(!this.checked())
    };
    
});