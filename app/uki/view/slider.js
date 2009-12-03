include('../view.js');
include('focusable.js');
include('../dom/offset.js');

include('base.js');

(function() {

var Base = uki.view.Base.prototype,
self = uki.view.Slider = uki.newClass(uki.view.Base, uki.view.Focusable, {
    
    init: function() {
        this._min = 0;
        this._max = 1;
        this._value = 0;
        this._values = null;
        this._keyStep = 0.01;
        Base.init.call(this);
    },
    
    min: uki.newProperty('_min'),
    max: uki.newProperty('_max'),
    values: uki.newProperty('_values'),
    keyStep: uki.newProperty('_keyStep'),
    
    value: function(val) {
        if (val === undefined) return this._value;
        this._value = Math.max(this._min, Math.min(this._max, val));
        this._position = this._val2pos(this._value);
        this._moveHandle();
    },
    
    _pos2val: function(pos) {
        return pos / this._rect.width * (this._max - this._min);
    },
    
    _val2pos: function(val) {
        return val / (this._max - this._min) * this._rect.width;
    },
    
    _domCreate: function() {
        this._dom = uki.createElement('div', Base.defaultCss + 'height:18px;-moz-user-select:none;-webkit-user-select:none;overflow:visible;');
        this._handle = uki.createElement('div', Base.defaultCss + 'cursor:default;background:url(' + uki.theme.image('x').src + ')');
        this._bg = uki.theme.image('slider-handle');
        this._focusBg = uki.theme.image('slider-focus');
        this._focusBg.style.cssText += this._bg.style.cssText += Base.defaultCss + 'top:0;left:0;z-index:-1;position:absolute;'; 
        this._handle.appendChild(this._bg);
        
        var _this = this;
        uki.image.load([this._bg, this._focusBg], function() { _this._afterHandleLoad(); });
        
        uki.theme.background('slider-bar').attachTo(this);
    },
    
    _afterHandleLoad: function() {
        this._focusBg.style.cssText += ';z-index:10;height:25px;width:18px;margin-left:-' + (this._focusBg.width) / 2 + 'px;margin-top:-' + (this._focusBg.height-(this._bg.height/2)+1)/2 + 'px;';
        this._handle.style.cssText += ';margin-left:-' + (this._bg.width / 2) + 'px;width:' +this._bg.width + 'px;height:' + (this._bg.height / 2) + 'px;'
        this._dom.appendChild(this._handle);
        var _this = this;
        uki.dom.bind(this._handle, 'dragstart', function(e) { e.returnValue = false });
        
        uki.dom.bind(this._handle, 'mousedown', function(e) {
            _this._dragging = true;
            _this._initialPosition = new uki.geometry.Point(parseInt(_this._handle.style.left, 10), parseInt(_this._handle.style.top, 10));
            uki.dom.drag.start(_this, e);
        });
        
        uki.dom.bind(this._handle, 'mouseover', function() {
            _this._over = true;
            _this._bg.style.top = - _this._bg.height / 2 + 'px';
        });
        
        uki.dom.bind(this._handle, 'mouseout', function() {
            _this._over = false;
            _this._bg.style.top = _this._dragging ? (- _this._bg.height / 2 + 'px') : 0;
        });
        
        uki.dom.bind(this._dom, 'click', function(e) {
            var x = e.pageX - uki.dom.offset(_this._dom).x;
            _this.value(_this._pos2val(x));
        });
        
        this._initFocusable();
    },
    
    _moveHandle: function() {
        this._focusBg.style.left = this._handle.style.left = this._position + 'px';
    },
    
    _drag: function(e, offset) {
        this._position = Math.max(0, Math.min(this._rect.width, this._initialPosition.x - offset.x));
        this._moveHandle();
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
        if (this._firstFocus) {
            var _this = this;
            uki.dom.bind(this._focusableInput, 'keydown', function(e) {
                if (e.which == 39) {
                    _this.value(_this.value() + _this._keyStep * (_this._max - _this._min));
                } else if (e.which == 37) {
                    _this.value(_this.value() - _this._keyStep * (_this._max - _this._min));
                }
            });
        }
    },
    
    _blur: function() {
        this._dom.removeChild(this._focusBg);
    },
    
    _domLayout: function() {
        uki.dom.layout(this._dom.style, {
            left: this._rect.x, 
            top: (this._rect.height - 18) / 2 + this._rect.y, 
            width: this._rect.width
        });
        this.value(this.value());
    },

    typeName: function() {
        return 'uki.view.Slider';
    }
});

})();