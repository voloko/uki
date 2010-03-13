uki.view.declare('uki.view.Checkbox', uki.view.Button, function(Base) {
    
    this._backgroundPrefix = 'checkbox-';
    
    uki.each(['checked-normal', 'checked-hover', 'checked-disabled'], function(i, name) {
        var property = name + '-background';
        this[property] = function(bg) {
            if (bg) this['_' + property] = bg;
            return this['_' + property] = this['_' + property] || 
                uki.theme.background(this._backgroundPrefix + name, {height: this.rect().height, view: this});
        };
    }, this);
    
    this._setup = function() {
        Base._setup.call(this);
        this._focusable = false;
    };
    
    this._updateBg = function() {
        var name = this._disabled ? 'disabled' : this._over ? 'hover' : 'normal';
        if (this._checked) name = 'checked-' + name;
        this._backgroundByName(name);
    };
    
    this.value = this.checked = uki.newProp('_checked', function(state) {
        this._checked = !!state;
        this._updateBg();
    });
    
    this._mouseup = function(e) {
        if (!this._down) return;
        this._down = false;
        if (!this._disabled) this.checked(!this.checked())
    };
    
});
