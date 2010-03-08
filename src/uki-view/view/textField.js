uki.view.TextField = uki.newClass(uki.view.Base, uki.view.Focusable, new function() {
    var Base = uki.view.Base.prototype,
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
    
    proto._updateBg = function() {
        this._input.style.color = this._disabled ? '#999' : '#000';
    };
    
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
                this._placeholderDom = uki.createElement('div', this.defaultCss + 'z-input:103;color:#999;cursor:text', v);
                this._dom.appendChild(this._placeholderDom);
                this._updatePlaceholderVis();
                uki.each(['fontSize', 'fontFamily', 'fontWeight'], function(i, name) {
                    this._placeholderDom.style[name] = this.style(name);
                }, this);
                
                uki.dom.bind(this._placeholderDom, 'mousedown', uki.proxy(function(e) { 
                    this.focus(); 
                    e.preventDefault(); 
                }, this));
            } else {
                this._placeholderDom.innerHTML = v;
            }
        }
    });
    

    proto._style = function(name, value) {
        if (value === undefined) return this._input.style[name];
        this._input.style[name] = value;
        if (this._placeholderDom) this._placeholderDom.style[name] = value;
        return this;
    };

    uki.addProps(proto, ['backgroundPrefix']);
    
    proto.defaultBackground = function() {
        return uki.theme.background(this._backgroundPrefix + 'input');
    };
    
    proto.typeName = function() {
        return 'uki.view.TextField';
    };
    
    proto._createDom = function() {
        var tagName = this._multiline ? 'textarea' : 'input';
        this._dom = uki.createElement('div', Base.defaultCss + ';cursor:text;overflow:visible');
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
        var margin;
        if (this._multiline) {
            this._input.style.height = this._rect.height - 4 + PX;
            this._input.style.top = 2 + PX;
            margin = '2px 0';
        } else {
            var o = (this._rect.height - getEmptyInputHeight(this.style('fontSize'))) / 2;
            margin = CEIL(o) + 'px 0 ' + FLOOR(o) + 'px 0';
            this._input.style.margin = margin;
        }
        if (this._placeholderDom) this._placeholderDom.style.margin = margin;
        if (this._firstLayout) this._initFocusable(this._input);
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
    typeName: function() { return 'uki.view.MultilineTextField'; },
    
    _setup: function() {
        uki.view.TextField.prototype._setup.call(this);
        this._multiline = true;
    }
});