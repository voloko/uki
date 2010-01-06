(function() {

var Base = uki.view.Base[PROTOTYPE],
self = uki.view.Checkbox = uki.newClass(uki.view.Base, uki.view.Focusable, {
    
    _bindToDom: function(name) {
        if (' change'.indexOf(name) > -1) return;
        Base._bindToDom.apply(this, arguments);
    },
    
    _imageSize: 18,
    
    _setup: function() {
        Base._setup.call(this);
        uki.extend(this, {
            _checked: false,
            _selectable: false,
            _disabled: false
        });
    },
    
    disabled: uki.newProp('_disabled', function(d) {
        this._disabled = d;
        if (d) this.blur();
        this._focusableInput.disabled = d; 
        this._updateBg();
    }),
    
    checked: function(state) {
        if (state === undefined) return this._checked;
        this._checked = !!state;
        this._updateBg();
        return this;
    },
    
    _updateBg: function() {
        var position = this._checked ? 0 : this._imageSize;
        position += this._disabled ? this._imageSize*4 : this._over ? this._imageSize*2 : 0; 
        this._image.style.top = - position + PX;
    },

    _createDom: function() {
        var w = this._imageSize + PX,
            hw = this._imageSize / 2 + PX;
            
        this._image = uki.theme.image('checkbox');
        this._dom = uki.createElement('div', Base.defaultCss + 'overflow:visible');
        this._box = uki.createElement('div', Base.defaultCss + 'overflow:hidden;left:50%;top:50%;margin-left:-9px;margin-top:-9px;width:' + w + ';height:' + w);
        this._image.style.position = 'absolute';
        this._image.style.WebkitUserDrag = 'none';
        this._focusImage = uki.theme.image('checkbox-focus');
        this._focusImage.style.cssText += 'display:block;-webkit-user-drag:none;position:absolute;z-index:-1;left:-50%;top:-50%;margin-left:' + hw + ';margin-top:' + hw;
        
        this._dom.appendChild(this._box);
        this._box.appendChild(this._image);

        var _this = this;
        this._click = function() {
            if (_this._disabled) return;
            _this.checked(!_this._checked);
            _this.trigger('change', {checked: _this._checked, source: _this});
        };
        
        uki.dom.bind(this._box, 'click', this._click);
        uki.dom.bind(this._box, 'mouseover', function() {
            _this._over = true;
            _this._updateBg();
        });
        uki.dom.bind(this._box, 'mouseout', function() {
            _this._over = false;
            _this._updateBg();
        });
        this._initFocusable();
        this.disabled(this.disabled());
    },
    
    _focus: function() {
        this._dom.appendChild(this._focusImage);
        if (this._firstFocus) {
            var _this = this;
            uki.dom.bind(this._focusableInput, 'keyup', function(e) {
                if (e.which == 32 || e.which == 13) {
                    _this._click();
                    _this.trigger('click', {domEvent: e, source: _this});
                }
            });
        }
    },
    
    _blur: function() {
        this._dom.removeChild(this._focusImage);
    },
    
    typeName: function() {
        return 'uki.view.Checkbox';
    },
    
    _bindToDom: function(name) {
        return uki.view.Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    }
    
});

})();