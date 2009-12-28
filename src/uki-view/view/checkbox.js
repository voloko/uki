(function() {

var Base = uki.view.Base[PROTOTYPE],
self = uki.view.Checkbox = uki.newClass(uki.view.Base, uki.view.Focusable, {
    
    _bindToDom: function(name) {
        if (' change'.indexOf(name) > -1) return;
        Base._bindToDom.apply(this, arguments);
    },
    
    _setup: function() {
        Base._setup.call(this);
        uki.extend(this, {
            _checked: false,
            _selectable: false
        });
    },
    
    checked: function(state) {
        if (state === undefined) return this._checked;
        this._checked = !!state;
        this._image.style.top = this._checked ? '0' : '-18px';
        return this;
    },

    _createDom: function() {
        this._image = uki.theme.image('checkbox');
        this._dom = uki.createElement('div', Base.defaultCss + 'overflow:visible');
        this._box = uki.createElement('div', Base.defaultCss + 'overflow:hidden;left:50%;top:50%;margin-left:-9px;margin-top:-9px;width:18px;height:18px');
        this._image.style.position = 'absolute';
        this._image.style.top = this._checked ? '0' : '-18px';
        this._image.style.WebkitUserDrag = 'none';
        this._focusImage = uki.theme.image('checkbox-focus');
        this._focusImage.style.cssText += 'display:block;-webkit-user-drag:none;position:absolute;left:50%;top:50%;margin-left:-12px;margin-top:-12px;z-index:-1;width:23px;height:23px';
        
        this._dom.appendChild(this._box);
        this._box.appendChild(this._image);

        var _this = this;
        this._click = function() {
            _this.checked(!_this._checked);
            _this.trigger('change', {checked: _this._checked, source: _this});
        };
        
        uki.dom.bind(this._box, 'click', this._click);
        uki.dom.bind(this._box, 'mouseover', function() {
            _this._image.style.top = _this._checked ? '-54px' : '-36px';
        });
        uki.dom.bind(this._box, 'mouseout', function() {
            _this.checked(_this._checked);
        });
    },
    
    _layoutDom: function(rect) {
        Base._layoutDom.call(this, rect);
        if (this._firstLayout) this._initFocusable();
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