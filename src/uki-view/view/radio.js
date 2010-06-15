include('checkbox.js');

(function() {
    /**
     * Radio button
     *
     * @author voloko
     * @name uki.view.Radio
     * @class
     * @extends uki.view.Checkbox
     */
    var manager = uki.view.declare('uki.view.Radio', uki.view.Checkbox, function(base) {
        
        this._backgroundPrefix = 'radio-';
        
        /**
        * @function
        * @param {String} group
        * @name uki.view.Popup#hide
        */
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
                this.trigger('change', { checked: this._checked, source: this });
            }
        }
    });
    
    
    manager.groups = {};

    manager.registerGroup = function(radio) {
        var group = radio.group();
        if (!manager.groups[group]) {
            manager.groups[group] = [radio];
        } else {
            manager.groups[group].push(radio);
        }
    };

    manager.unregisterGroup = function(radio) {
        var group = radio.group();
        if (manager.groups[group]) manager.groups[group] = uki.grep(manager.groups[group], function(registered) {
            return registered != radio;
        });
    };

    manager.clearGroup = function(radio) {
        uki.each(manager.groups[radio.group()] || [], function(i, registered) {
            if (registered == radio) return;
            if (registered.checked()) {
                registered.checked(false);
                this.trigger('change', { checked: false, source: registered });
            }
        });
    };    
    
})();