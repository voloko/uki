(function() {

var Base = uki.view.Base.prototype,
self = uki.view.Slider = uki.newClass(uki.view.Base, uki.view.Focusable, {
    
    _setup: function() {
        Base._setup.call(this);
        uki.extend(this, {
            _min: 0,
            _max: 1,
            _value: 0,
            _values: null,
            _keyStep: 0.01
        });
    },
    
    min: uki.newProp('_min'),
    max: uki.newProp('_max'),
    values: uki.newProp('_values'),
    keyStep: uki.newProp('_keyStep'),
    
    /**
     * @fires event:change
     */
    value: function(val) {
        if (val === undefined) return this._value;
        this._value = MAX(this._min, MIN(this._max, val));
        this._position = this._val2pos(this._value);
        this._moveHandle();
        this.trigger('change', {source: this, value: this._value});
        return this;
    },
    
    _pos2val: function(pos) {
        return pos / this._rect.width * (this._max - this._min);
    },
    
    _val2pos: function(val) {
        return val / (this._max - this._min) * this._rect.width;
    },
    
    _createDom: function() {
        this._dom = uki.createElement('div', Base.defaultCss + 'height:18px;-moz-user-select:none;-webkit-user-select:none;overflow:visible;');
        this._handle = uki.createElement('div', Base.defaultCss + 'overflow:hidden;cursor:default;background:url(' + uki.theme.image('x').src + ')');
        this._bg = uki.theme.image('slider-handle');
        this._focusBg = uki.theme.image('slider-focus');
        this._focusBg.style.cssText += this._bg.style.cssText += Base.defaultCss + 'top:0;left:0;z-index:-1;position:absolute;'; 
        this._handle.appendChild(this._bg);
        
        
        uki.theme.background('slider-bar').attachTo(this);
        this._initFocusable();
        
        uki.image.load([this._bg, this._focusBg], uki.proxy(this._afterHandleLoad, this) );
    },
    
    _afterHandleLoad: function() {
        this._focusBg.style.cssText += ';z-index:10;margin-left:-' + (this._focusBg.width) / 2 + 'px;margin-top:-' + (this._focusBg.height-(this._bg.height/2)+1)/2 + 'px;';
        this._handle.style.cssText += ';margin-left:-' + (this._bg.width / 2) + 'px;width:' +this._bg.width + 'px;height:' + (this._bg.height / 2) + 'px;';
        this._dom.appendChild(this._handle);
        
        uki.dom.drag.watch(this._handle, this);
        
        uki.dom.bind(this._handle, 'mouseover', uki.proxy(this._mouseover, this));
        uki.dom.bind(this._handle, 'mouseout', uki.proxy(this._mouseout, this));
        
        this.bind('click', this._click);
        this.bind('keydown', this._keydown);
    },
    
    _mouseover: function() {
        this._over = true;
        this._bg.style.top = - this._bg.height / 2 + 'px';
    },
    
    _mouseout: function() {
        this._over = false;
        this._bg.style.top = this._dragging ? (- this._bg.height / 2 + 'px') : 0;
    },
    
    _click: function(e) {
        e = e.domEvent;
        var x = e.pageX - uki.dom.offset(this._dom).x;
        this.value(this._pos2val(x));
    },
    
    _keydown: function(e) {
        e = e.domEvent;
        if (e.which == 39) {
            this.value(this.value() + this._keyStep * (this._max - this._min));
        } else if (e.which == 37) {
            this.value(this.value() - this._keyStep * (this._max - this._min));
        }
    },
    
    _moveHandle: function() {
        // this._focusBg.style.left = this._handle.style.left = 100.0*this._position/this._rect.width + '%';
        this._focusBg.style.left = this._handle.style.left = this._position + 'px';
    },
    
    _acceptDrag: function() {
        this._dragging = true;
        this._initialPosition = new Point(parseInt(this._handle.style.left, 10), parseInt(this._handle.style.top, 10));
        return true;
    },
    
    /**
     * @fires event:change
     */
    _drag: function(e, offset) {
        this._position = MAX(0, MIN(this._rect.width, this._initialPosition.x - offset.x));
        this._value = this._pos2val(this._position);
        this._moveHandle();
        this.trigger('change', {source: this, value: this._value});
    },
    
    _drop: function(e, offset) {
        this._dragging = false;
        this._initialPosition = null;
        if (!this._over) this._bg.style.top = 0;
        this._value = this._pos2val(this._position);
    },
    
    _focus: function() {
        this._dom.appendChild(this._focusBg);
        this._focusBg.style.left = this._handle.style.left;
    },
    
    _blur: function() {
        this._dom.removeChild(this._focusBg);
    },
    
    _layoutDom: function(rect) {
        var fixedRect = rect.clone();
        fixedRect.height = 18;
        Base._layoutDom.call(this, fixedRect);
        this._position = this._val2pos(this._value);
        this._moveHandle();
        return true;
    },

    typeName: function() {
        return 'uki.view.Slider';
    },
    
    _bindToDom: function(name) {
        if (name == 'change') return true;
        return uki.view.Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    }
    
});

})();