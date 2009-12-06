include('../view.js');

uki.view.Focusable = {
    // dom: function() {
    //     return null; // should implement
    // },
    
    _initFocusable: function(preCreatedInput) {
        var input = preCreatedInput;
        if (!input) {
            input = uki.createElement(
                'input', 
                uki.view.Base.prototype.defaultCss + "border:none;padding:0;overflow:hidden;width:1px;height:1px;padding:1px;" + 
                "font-size:1px;left:-9999em;top:0;background:transparent;outline:none;opacity:0;"
            );
            this.dom().appendChild(input);
        }
        this._focusableInput = input;
        this._hasFocus = false;
        this._firstFocus = true;
        var _this = this;
            
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
            if (!_this.hasFocus(e)) {
                _this._focusableInput.focus();
            }
            e.domEvent.preventDefault ? e.domEvent.preventDefault() : e.domEvent.returnValue = false;
        });
    },
    
    _focus: function(e) {
    },
    
    _blur: function(e) {
    },
    
    focus: function() {
        this._focusableInput.focus();
    },
    
    hasFocus: function() {
        return this._hasFocus;
    }

};