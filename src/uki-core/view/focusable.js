include('../view.js');
include('observable.js');

/**
 * @class
 */
uki.view.Focusable = /** @lends uki.view.Focusable.prototype */ {
    // dom: function() {
    //     return null; // should implement
    // },
    _focusable: true, // default value
    
    focusable: uki.newProp('_focusable', function(v) {
        this._focusable = v;
        this._updateTabIndex();
    }),
    
    disabled: uki.newProp('_disabled', function(d) {
        this._disabled = d;
        if (d) this.blur();
        this._updateTabIndex();
        if (this._updateBg) this._updateBg();
    }),
    
    _updateTabIndex: function() {
        if (this._focusTarget) {
            if (this._focusable && !this._disabled) this._focusTarget.setAttribute('tabIndex', 1)
            else this._focusTarget.removeAttribute('tabIndex');
        }
    }, 
    
    _initFocusable: function(preCreatedInput) {
        this._focusTarget = preCreatedInput;

        if (!preCreatedInput) {
            this._focusTarget = root.opera ? uki.createElement('div', 'position:absolute;left:-999px;top:0;width:1px;height:1px;') : this.dom();
            if (root.opera) this.dom().appendChild(this._focusTarget);
            this._updateTabIndex();
            this._focusTarget.style.outline = 'none';
            this._focusTarget.hideFocus = true;
        }
        this._hasFocus = false;
        this._firstFocus = true;
            
        uki.dom.bind(this._focusTarget, 'focus', uki.proxy(function(e) {
            if (!this._hasFocus) this._focus(e);
        }, this));
        uki.dom.bind(this._focusTarget, 'blur', uki.proxy(function(e) {
            if (this._hasFocus) this._blur(e);
        }, this));
        
        if (!preCreatedInput) this.bind('mousedown', function(e) {
            setTimeout(uki.proxy(function() {
                try { this.focus(); } catch (e) {};
            }, this), 1);
        });
    },
    
    _focus: function(e) {
        this._hasFocus = true;
        this._firstFocus = false;
    },
    
    _blur: function(e) {
        this._hasFocus = false;
    },
    
    focus: function() {
        try {
            if (this._focusable && !this._disabled) this._focusTarget.focus();
        } catch(e) {}
        return this;
    },
    
    blur: function() {
        try {
            this._focusTarget.blur();
        } catch(e) {}
        return this;
    },
    
    hasFocus: function() {
        return this._hasFocus;
    },
    
    _bindToDom: function(name) {
        if (!this._focusTarget || 'keyup keydown keypress focus blur'.indexOf(name) == -1) return false;
        
        return uki.view.Observable._bindToDom.call(this, name, this._focusableInput);
    }
    

};