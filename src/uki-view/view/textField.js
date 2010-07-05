/**
* Editable Text Field
*
* @author voloko
* @name uki.view.TextField
* @class
* @extends uki.view.Base
* @implements uki.view.Focusable
*/
uki.view.declare('uki.view.TextField', uki.view.Base, uki.view.Focusable, function(Base, Focusable) {
    var emptyInputHeight = {};

    function getEmptyInputHeight (css) {
        if (!emptyInputHeight[css]) {
            var node = uki.createElement('input', Base.defaultCss + "border:none;padding:0;border:0;margin:0;overflow:hidden;left:-999em;top:0;line-height:1;" + css);
            uki.dom.probe(
                node,
                function(probe) {
                    emptyInputHeight[css] = probe.offsetHeight;
                }
            );
        }
        return emptyInputHeight[css];
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
        this.defaultCss += "margin:0;border:none;outline:none;padding:0;left:2px;top:0;z-index:100;-moz-resize:none;resize:none;background: url(" + uki.theme.imageSrc('x') + ");" + uki.theme.style('input');
    };
    
    this._updateBg = function() {
        this._input.style.color = this._disabled ? '#999' : '#000';
    };
    
    /**
    * @function
    * @name uki.view.TextField#name
    */
    uki.delegateProp(this, 'name', '_input');
    
    /**
    * @function
    * @name uki.view.TextField#value
    */
    this.value = function(value) {
        if (value === undefined) return this._input.value;

        this._input.value = value;
        this._updatePlaceholderVis();
        return this;
    };
    
    /**
    * Cross browser placeholder implementation
    * @function
    * @name uki.view.TextField#placeholder
    */
    this.placeholder = uki.newProp('_placeholder', function(v) {
        this._placeholder = v;
        if (!this._multiline && nativePlaceholder(this._input)) {
            this._input.placeholder = v;
        } else {
            if (!this._placeholderDom) {
                this._placeholderDom = uki.createElement('div', this.defaultCss + 'z-input:103;color:#999;cursor:text;-moz-user-select:none;', v);
                if (!this._multiline) this._placeholderDom.style.whiteSpace = 'nowrap';
                this._dom.appendChild(this._placeholderDom);
                this._updatePlaceholderVis();
                uki.each(['fontSize', 'fontFamily', 'fontWeight'], function(i, name) {
                    this._placeholderDom.style[name] = this._input.style[name];
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
        if (uki.inArray(name, uki.browser.textStyles) != -1) {
            if (value === undefined) return this._input.style[name];
            this._input.style[name] = value;
            if (this._placeholderDom) this._placeholderDom.style[name] = value;
        }
        return Base._style.call(this, name, value);
    };

    /**
    * @function
    * @name uki.view.TextField#backgroundPrefix
    */
    uki.addProps(this, ['backgroundPrefix']);
    
    /**
    * @function
    * @name uki.view.TextField#defaultBackground
    */
    this.defaultBackground = function() {
        return uki.theme.background(this._backgroundPrefix + 'input');
    };
    
    this._createDom = function() {
        this._dom = uki.createElement('div', Base.defaultCss + ';cursor:text;overflow:visible;');
        this._initClassName();
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
            var o = (this._rect.height - getEmptyInputHeight( 'font-size:' + this.style('fontSize') + ';font-family:' + this.style('fontFamily') )) / 2;
            margin = CEIL(o) + 'px 0 ' + FLOOR(o) + 'px 0';
            this._input.style.padding = margin;
        }
        if (this._placeholderDom) this._placeholderDom.style.padding = margin;
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

/**
* Multiline Editable Text Field (textarea)
*
* @author voloko
* @name uki.view.MultilineTextField
* @class
* @extends uki.view.TextField
*/
uki.view.declare('uki.view.MultilineTextField', uki.view.TextField, function(Base) {
    this._setup = function() {
        Base._setup.call(this);
        this._tagName = 'textarea';
        this._type = '';
        this._multiline = true;
    };
});

/**
* Password Field
*
* @author voloko
* @name uki.view.PasswordTextField
* @class
* @extends uki.view.TextField
*/
uki.view.declare('uki.view.PasswordTextField', uki.view.TextField, function(Base) {
    this._setup = function() {
        Base._setup.call(this);
        this._type = 'password';
    };
});

uki.Collection.addAttrs(['placeholder']);