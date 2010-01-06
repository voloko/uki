uki.view.TextField = uki.newClass(uki.view.Base, uki.view.Focusable, new function() {
    var Base = uki.view.Base[PROTOTYPE],
        emptyInputHeight = {},
        proto = this;

    function getEmptyInputHeight (fontSize) {
        if (!emptyInputHeight[fontSize]) {
            var node = uki.createElement('input', Base.defaultCss + "border:none;padding:0;border:0;overflow:hidden;font-size:"+fontSize+";left:-999em;top:0");
            uki.dom.probe(
                node,
                function(probe) {
                    emptyInputHeight[fontSize] = probe.offsetHeight;
                }
            );
        }
        return emptyInputHeight[fontSize];
    }

    function nativePlaceholder (node) {
        return typeof node.placeholder == 'string';
    }

    
    proto._setup = function() {
        Base._setup.apply(this, arguments);
        uki.extend(this, {
            _value: '',
            _multiline: false,
            _placeholder: '',
            _backgroundPrefix: '',
            defaultCss: Base.defaultCss + "margin:0;border:none;outline:none;padding:0;font-size:11px;left:2px;top:0;z-index:100;resize:none;background: url(" + uki.theme.imageSrc('x') + ")"
        });
    };
    
    proto.disabled = uki.newProp('_disabled', function(d) {
        this._disabled = d;
        if (d) this.blur();
        this._input.disabled = d; 
    });
    
    proto.value = function(value) {
        if (value === undefined) return this._input.value;

        this._input.value = value;
        this._updatePlaceholderVis();
        return this;
    };
    
    proto.placeholder = uki.newProp('_placeholder', function(v) {
        this._placeholder = v;
        if (!this._multiline && nativePlaceholder(this._input)) {
            this._input.placeholder = v;
        } else {
            if (!this._placeholderDom) {
                this._placeholderDom = uki.createElement('div', this.defaultCss + 'z-input:101;color:#999;cursor:text', v);
                this._dom.appendChild(this._placeholderDom);
                this._updatePlaceholderVis();
                uki.each(['fontSize', 'fontFamily', 'fontWeight'], function(i, name) {
                    this._placeholderDom.style[name] = this[name]();
                }, this)
                
                var _this = this;
                uki.dom.bind(this._placeholderDom, 'mousedown', function() { _this.focus() });
            } else {
                this._placeholderDom.innerHTML = v;
            }
        }
    });
    
    var cssProps = ['fontSize', 'textAlign', 'color', 'fontFamily', 'fontWeight'];
    uki.each(cssProps, function(i, name) {
        proto[name] = function(v) {
            if (v === undefined) return this._input.style[name];
            this._input.style[name] = v;
            if (this._placeholderDom) {
                this._placeholderDom.style[name] = v;
            }
            return this;
        };
    });
    
    uki.addProps(proto, ['backgroundPrefix']);
    
    proto.defaultBackground = function() {
        return uki.theme.background(this._backgroundPrefix + 'input');
    };
    
    proto.typeName = function() {
        return 'uki.component.TextField';
    };
    
    proto._createDom = function() {
        var tagName = this._multiline ? 'textarea' : 'input';
        this._dom = uki.createElement('div', Base.defaultCss + ';cursor:text;overflow:visible;');
        this._input = uki.createElement(tagName, this.defaultCss + (this._multiline ? '' : ';overflow:hidden;'));
        this._inputStyle = this._input.style;
        
        this._input.value = this._value;
        this._dom.appendChild(this._input);
        
        this._input.value = this.value();
        
        this._initFocusable(this._input);
    };
    
    proto._layoutDom = function(rect) {
        Base._layoutDom.apply(this, arguments);
        uki.dom.layout(this._input.style, {
            width: this._rect.width - 4
        });
        var padding;
        if (this._multiline) {
            this._input.style.height = this._rect.height - 4 + 'px';
            this._input.style.top = 2 + 'px'
            padding = '2px 0';
        } else {
            var o = (this._rect.height - getEmptyInputHeight(this.fontSize())) / 2;
            padding = FLOOR(o) + 'px 0 ' + CEIL(o) + 'px 0';
            this._input.style.padding = padding;
        }
        if (this._placeholderDom) this._placeholderDom.style.padding = padding;
        if (this._firstLayout) this._initFocusable(this._input);
    };
    
    proto._recalcOffset = function() {
        if (this._multiline) return;
    };
    
    proto._updatePlaceholderVis = function() {
        if (this._placeholderDom) this._placeholderDom.style.display = this.value() ? 'none' : 'block';
    };

    proto._focus = function() {
        this._focusBackground = this._focusBackground || uki.theme.background(this._backgroundPrefix + 'input-focus');
        this._focusBackground.attachTo(this);
        if (this._placeholderDom) this._placeholderDom.style.display = 'none';
    };
    
    proto._blur = function() {
        this._focusBackground.detach();
        this._updatePlaceholderVis();
    };

    proto._bindToDom = function(name) {
        return uki.view.Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    };
});

uki.view.MultilineTextField = uki.newClass(uki.view.TextField, {
    _setup: function() {
        uki.view.TextField[PROTOTYPE]._setup.call(this);
        this._multiline = true;
    }
});