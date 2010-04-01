include('../view.js');
include('observable.js');

/**
 * @class
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
        this._disabled = d;
        if (d) this.blur();
        this._updateFocusable();
        if (this._updateBg) this._updateBg();
    }),
    
    this._updateFocusable = function() {
        if (this._preCreatedFocusTarget) return;
        
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
            this.dom().appendChild(this._focusTarget);
        }
        this._hasFocus = false;
        this._firstFocus = true;
            
        uki.dom.bind(this._focusTarget, 'focus', uki.proxy(function(e) {
            if (!this._hasFocus) this._focus(e);
        }, this));
        uki.dom.bind(this._focusTarget, 'blur', uki.proxy(function(e) {
            if (this._hasFocus) this._blur(e);
        }, this));
        
        if (!preCreatedFocusTarget) this.bind('mousedown', function(e) {
            if (this._focusOnClick) setTimeout(uki.proxy(this.focus, this), 1);
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
    
    this.focus = function() {
        try {
            if (this._focusable && !this._disabled) {
                this._focusTarget.focus();
            }
        } catch(e) {}
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