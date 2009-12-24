uki.view.TextField = uki.newClass(uki.view.Base, uki.view.Focusable, new function() {
    var Base = uki.view.Base[PROTOTYPE],
        emptyInputHeight = {},
        proto = this;

    function getEmptyInputHeight (fontSize) {
        if (!emptyInputHeight[fontSize]) {
            var node = uki.createElement('input', Base.defaultCss + "border:none;padding:0;overflow:hidden;font-size:11px;left:-999em;top:0");
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

    
    proto.init = function() {
        this._value = '';
        this._multiline = false;
        this._placeholder = '';
        this._backgroundPrefix = '';
        this._fontSize = '11px';
        this.defaultCss = Base.defaultCss + "margin:0;border:none;outline:none;padding:0;left:2px;top:0;z-index:100;resize:none;background: url(" + uki.theme.image('x').src + ")";
        Base.init.apply(this, arguments);
    };
    
    proto.value = function(value) {
        if (value === undefined) return this._dom ? this._input.value : this._value;
        this._value = value;
        if (this._dom) this._input.value = value;
        this._updatePlaceholderVis();
        return this;
    };
    
    proto.placeholder = uki.newProp('_placeholder', function(v) {
        if (this._dom) {
            this._input.placeholder = v;
            if (this._placeholderDom) this._placeholderDom.innerHTML = v;
        }
    });
    
    var cssProps = ['fontSize', 'textAlign', 'color', 'fontFamily', 'fontWeight'];
    uki.each(cssProps, function(i, name) {
        uki.delegateProp(proto, name, '_inputStyle');
    });
    
    uki.addProps(proto, ['backgroundPrefix', 'multiline']);
    
    proto.defaultBackground = function() {
        return uki.theme.background(this._backgroundPrefix + 'input');
    };
    
    proto.typeName = function() {
        return 'uki.component.TextField';
    };
    
    proto._createDom = function() {
        var tagName = this.multiline() ? 'textarea' : 'input';
        this._dom = uki.createElement('div', Base.defaultCss + ';cursor:text;overflow:visible;');
        this._input = uki.createElement(tagName, this.defaultCss + (this.multiline() ? '' : ';overflow:hidden;'));
        this._inputStyle = this._input.style;
        
        this._input.value = this._value;
        this._dom.appendChild(this._input);
        
        this._input.value = this.value();
        if (this.placeholder()) {
            if (!this.multiline() && nativePlaceholder(this._input)) {
                this._input.placeholder = this.placeholder();
            } else {
                this._placeholderDom = uki.createElement('div', this.defaultCss + 'z-input:101;color:#999;cursor:text', this.placeholder());
                this._dom.appendChild(this._placeholderDom);
                this._updatePlaceholderVis();
                var _this = this;
                uki.dom.bind(this._placeholderDom, 'mousedown', function() { _this.focus() });
            }
        }
        uki.each(cssProps, function(i, name) {
            if (this['_' + name]) {
                this._inputStyle[name] = this['_' + name];
                if (this._placeholderDom) this._placeholderDom.style[name] = this['_' + name];
            }
        }, this)
        
        
        this._initCommonAttrs();
        
        this._initFocusable(this._input);
    };
    
    proto._layoutDom = function() {
        Base._layoutDom.apply(this, arguments);
        uki.dom.layout(this._input.style, {
            width: this._rect.width - 4
        });
        var padding;
        if (this.multiline()) {
            this._input.style.height = this._rect.height - 4 + 'px';
            this._input.style.top = 2 + 'px'
            padding = '2px 0';
        } else {
            var o = (this._rect.height - getEmptyInputHeight(this._fontSize)) / 2;
            
            padding = Math.floor(o) + 'px 0 ' + Math.ceil(o) + 'px 0';
            this._input.style.padding = padding;
        }
        if (this._placeholderDom) this._placeholderDom.style.padding = padding;
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