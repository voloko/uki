include('../view.js');
include('observable.js');

/**
 * @class
 */
uki.view.Focusable = {
    // dom: function() {
    //     return null; // should implement
    // },
    
    _focusable: true, // default value
    
    focusable: uki.newProp('_focusable', function(v) {
        this._focusable = v;
        if (this._focusableInput) this._focusableInput.style.display = v ? '' : 'none';
    }),
    
    disabled: uki.newProp('_disabled', function(d) {
        this._disabled = d;
        if (d) this.blur();
        this._focusableInput.disabled = d;
        if (this._updateBg) this._updateBg();
    }),    
    
    _initFocusable: function(preCreatedInput) {
        if (!this._focusable) return;
        
        var input = preCreatedInput;
        if (!input) {
            input = uki.createElement(
                'input', 
                uki.view.Base[PROTOTYPE].defaultCss + "border:none;padding:0;overflow:hidden;width:1px;height:1px;padding:1px;" + 
                "font-size:1px;left:-9999em;top:50%;background:transparent;outline:none;opacity:0;"
            );
            this.dom().appendChild(input);
        }
        this._focusableInput = input;
        this._hasFocus = false;
        this._firstFocus = true;
        var _this = this,
            needsRefocus = doc.attachEvent;
            
        uki.dom.bind(input, 'focus', function(e) {
            if (_this._hasFocus) return;
            _this._hasFocus = true;
            _this._focus(e);
            _this._firstFocus = false;
            _this.trigger('focus', {domEvent: e, source: _this});
        });
        
        uki.dom.bind(input, 'blur', function(e) {
            if (!_this._hasFocus) return;
            _this._hasFocus = false;
            _this._blur(e);
            _this.trigger('blur', {domEvent: e, source: this});
        });
        
        if (!preCreatedInput) this.bind('mousedown', function(e) {
            setTimeout(function() {_this._focusableInput.disabled || _this._focusableInput.focus();}, 1);
        });
    },
    
    _focus: function(e) {
    },
    
    _blur: function(e) {
    },
    
    focus: function() {
        this._focusableInput.focus();
    },
    
    blur: function() {
        this._focusableInput.blur()
    },
    
    hasFocus: function() {
        return this._hasFocus;
    },
    
    _bindToDom: function(name) {
        if (!this._focusableInput || 'keyup keydown keypress focus blur'.indexOf(name) == -1) return false;
        
        return uki.view.Observable._bindToDom.call(this, name, this._focusableInput);
    }
    

};