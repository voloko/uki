uki.view.declare('uki.view.TextField', uki.view.Base, uki.view.Focusable, function(Base, Focusable) {
    var emptyInputHeight = {};

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

    this._setup = function() {
        Base._setup.apply(this, arguments);
        uki.extend(this, {
            _value: '',
            _multiline: false,
            _placeholder: '',
            _backgroundPrefix: '',
            _tagName: 'input',
            _type: 'text'
        });
        this.defaultCss += "margin:0;border:none;outline:none;padding:0;left:2px;top:0;z-index:100;resize:none;background: url(" + uki.theme.imageSrc('x') + ");" + uki.theme.style('input');
    };
    
    this._updateBg = function() {
        this._input.style.color = this._disabled ? '#999' : '#000';
    };
    
    this.value = function(value) {
        if (value === undefined) return this._input.value;

        this._input.value = value;
        this._updatePlaceholderVis();
        return this;
    };
    
    this.placeholder = uki.newProp('_placeholder', function(v) {
        this._placeholder = v;
        if (!this._multiline && nativePlaceholder(this._input)) {
            this._input.placeholder = v;
        } else {
            if (!this._placeholderDom) {
                this._placeholderDom = uki.createElement('div', this.defaultCss + 'z-input:103;color:#999;cursor:text;-moz-user-select:none;', v);
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

    this._style = function(name, value) {
        if (value === undefined) return this._input.style[name];
        this._input.style[name] = value;
        if (this._placeholderDom) this._placeholderDom.style[name] = value;
        return this;
    };

    uki.addProps(this, ['backgroundPrefix']);
    
    this.defaultBackground = function() {
        return uki.theme.background(this._backgroundPrefix + 'input');
    };
    
    this._createDom = function() {
        this._dom = uki.createElement('div', Base.defaultCss + ';cursor:text;overflow:visible');
        this._input = uki.createElement(this._tagName, this.defaultCss + (this._multiline ? '' : ';overflow:hidden;'));
        
        this._input.value = this._value;
        if (this._type) this._input.type = this._type;
        this._dom.appendChild(this._input);
        
        this._input.value = this.value();
        
        this._initFocusable(this._input);
        this.bind('mousedown', function(e) {
            if (e.target == this._input) return;
            this.focus(); 
        });
    };
    
    this._layoutDom = function(rect) {
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
    };
    
    this._updatePlaceholderVis = function() {
        if (this._placeholderDom) this._placeholderDom.style.display = this.value() ? 'none' : 'block';
    };

    this._focus = function(e) {
        this._focusBackground = this._focusBackground || uki.theme.background(this._backgroundPrefix + 'input-focus');
        this._focusBackground.attachTo(this);
        if (this._placeholderDom) this._placeholderDom.style.display = 'none';
        Focusable._focus.call(this, e);
    };
    
    this._blur = function(e) {
        this._focusBackground.detach();
        this._updatePlaceholderVis();
        Focusable._blur.call(this, e);
    };

    this._bindToDom = function(name) {
        return Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    };
});

uki.view.declare('uki.view.MultilineTextField', uki.view.TextField, function(Base) {
    this._setup = function() {
        Base._setup.call(this);
        this._tagName = 'textarea';
        this._type = '';
        this._multiline = true;
    };
});

uki.view.declare('uki.view.PasswordTextField', uki.view.TextField, function(Base) {
    this._setup = function() {
        Base._setup.call(this);
        this._type = 'password';
    };
});

