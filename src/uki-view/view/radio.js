include('checkbox.js');



(function() {
    var self = uki.view.Radio = uki.newClass(uki.view.Checkbox, new function() {
        var proto = this;

        proto._createImages = function() {
            this._image = uki.theme.image('radio');
            this._focusImage = uki.theme.image('radio-focus');
        }
    
        proto.group = uki.newProp('_group', function(g) {
            self.unregisterGroup(this);
            this._group = g;
            self.registerGroup(this);
            self.clearGroup(this);
        });
        
        proto.checked = uki.newProp('_checked', function(state) {
            this._checked = !!state;
            if (state) self.clearGroup(this);
            this._updateBg();
        });
        
        proto._click = function() {
            if (this._disabled || this.checked()) return;
            this.checked(!this._checked);
            this.trigger('change', {checked: this._checked, source: this});
        }
        
    });
    
    self.groups = {};

    self.registerGroup = function(radio) {
        var group = radio.group();
        if (!self.groups[group]) {
            self.groups[group] = [radio];
        } else {
            self.groups[group].push(radio);
        }
    };

    self.unregisterGroup = function(radio) {
        var group = radio.group();
        if (self.groups[group]) self.groups[group] = uki.grep(self.groups[group], function(registered) {
            return registered != radio;
        });
    };

    self.clearGroup = function(radio) {
        uki.each(self.groups[radio.group()] || [], function(i, registered) {
            if (registered == radio) return;
            if (registered.checked()) registered.checked(false);
        });
    };    
})();
