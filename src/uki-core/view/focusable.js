include('../view.js');
include('observable.js');

/**
 * @interface
 */
uki.view.Focusable = new function() {/** @lends uki.view.Focusable.prototype */ 
    
    // dom: function() {
    //     return null; // should implement
    // },
    this._focusable = true; // default value
    this._focusOnClick = true;
    
    this.focusOnClick = uki.newProp('_focusOnClick');
    
    this.focusable = uki.newProp('_focusable', function(v) {
        this._focusable = v;
        if (v) this._initFocusable();
        this._updateFocusable();
    }),
    
    this.disabled = uki.newProp('_disabled', function(d) {
        var changed = d !== !!this._disabled;
        this._disabled = d;
        if (d) this.blur();
        this._updateFocusable();
        if (changed && this._updateBg) this._updateBg();
    }),
    
    this._updateFocusable = function() {
        if (this._preCreatedFocusTarget || !this._focusTarget) return;
        
        if (this._focusable && !this._disabled) {
            this._focusTarget.style.display = 'block';
        } else {
            this._focusTarget.style.display = 'none';
        }
    }, 
    
    this._initFocusable = function(preCreatedFocusTarget) {
        if ((!preCreatedFocusTarget && !this._focusable) || this._focusTarget) return;
        this._focusTarget = preCreatedFocusTarget;
        this._preCreatedFocusTarget = preCreatedFocusTarget;
        
        if (!preCreatedFocusTarget) {
            this._focusTarget = uki.createElement('input', 'position:absolute;left:-9999px;top:0;width:1px;height:1px;');
            this._focusTarget.className = 'uki-view-Focusable';
            this.dom().appendChild(this._focusTarget);
        }
        this._hasFocus = false;
        this._firstFocus = true;
            
        uki.dom.bind(this._focusTarget, 'focus', uki.proxy(function(e) {
            this._stopWatingForBlur();
            if (!this._hasFocus) this._focus(e);
        }, this));
        
        uki.dom.bind(this._focusTarget, 'blur', uki.proxy(function(e) {
            if (this._hasFocus) {
                this._hasFocus = false;
                this._waitingForBlur = 
                    setTimeout(uki.proxy(function() { // wait for mousedown refocusing
                        this._waitingForBlur = false;
                        if (!this._hasFocus) this._blur();
                    }, this), 1);
            }
        }, this));
        
        if (!preCreatedFocusTarget) this.bind('mousedown', function(e) {
            if (this._focusOnClick) this.focus();
        });
        this._updateFocusable();
    }
    
    this._focus = function(e) {
        this._hasFocus = true;
        this._firstFocus = false;
    }
    
    this._blur = function(e) {
        this._hasFocus = false;
    }
    
    this._stopWatingForBlur = function() {
        if (this._waitingForBlur) {
            clearTimeout(this._waitingForBlur);
            this._waitingForBlur = false;
            this._hasFocus = true;
        }
    };
    
    this.focus = function() {
        if (this._focusable && !this._disabled) {
            this._stopWatingForBlur();
            if (!this._hasFocus) this._focus();
            var target = this._focusTarget;
            setTimeout(function() {
                try {
                    target.focus();
                } catch(e) { }
                target = null;
            }, 1);
        }
        return this;
    },
    
    this.blur = function() {
        try {
            this._focusTarget.blur();
        } catch(e) {}
        return this;
    }
    
    this.hasFocus = function() {
        return this._hasFocus;
    }
    
    this._bindToDom = function(name) {
        if (!this._focusTarget || 'keyup keydown keypress focus blur'.indexOf(name) == -1) return false;

        return uki.view.Observable._bindToDom.call(this, name, this._focusTarget);
    }
    

};