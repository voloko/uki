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
        if (this._focusableInput) {
            this._focusableInput.style.display = v ? '' : 'none';
        } else if (v) {
            this._initFocusable();
        }
    }),
    
    disabled: uki.newProp('_disabled', function(d) {
        this._disabled = d;
        if (d) this.blur();
        if (this._focusableInput) this._focusableInput.disabled = d;
        if (this._updateBg) this._updateBg();
    }),    
    
    _initFocusable: function(preCreatedInput) {
        this._focusableInput = preCreatedInput;
        if (!this._focusable) return;
        
        var input = preCreatedInput;
        if (!input) {
            input = uki.createElement(
                'input', 
                uki.view.Base.prototype.defaultCss + "border:none;padding:0;overflow:hidden;width:1px;height:1px;padding:1px;" + 
                "font-size:1px;left:-9999em;top:50%;background:transparent;outline:none;opacity:0;"
            );
            this.dom().appendChild(input);
        }
        this._focusableInput = input;
        this._hasFocus = false;
        this._firstFocus = true;
        var needsRefocus = doc.attachEvent;
            
        uki.dom.bind(input, 'focus', uki.proxy(function(e) {
            if (this._hasFocus) return;
            this._hasFocus = true;
            this._focus(e);
            this._firstFocus = false;
            this.trigger('focus', {domEvent: e, source: this});
        }, this));
        
        uki.dom.bind(input, 'blur', uki.proxy(function(e) {
            if (!this._hasFocus) return;
            this._hasFocus = false;
            this._blur(e);
            this.trigger('blur', {domEvent: e, source: this});
        }, this));
        
        if (!preCreatedInput) this.bind('mousedown', function(e) {
            setTimeout(uki.proxy(function() {
                try { this._hasFocus || this._focusableInput.focus(); } catch (e) {};
            }, this), 1);
        });
    },
    
    _focus: function(e) {
    },
    
    _blur: function(e) {
    },
    
    focus: function() {
        try {
            this._focusableInput.focus();
        } catch(e) {}
        return this;
    },
    
    blur: function() {
        try {
            this._focusableInput.blur();
        } catch(e) {}
        return this;
    },
    
    hasFocus: function() {
        return this._hasFocus;
    },
    
    _bindToDom: function(name) {
        if (!this._focusableInput || 'keyup keydown keypress focus blur'.indexOf(name) == -1) return false;
        
        return uki.view.Observable._bindToDom.call(this, name, this._focusableInput);
    }
    

};