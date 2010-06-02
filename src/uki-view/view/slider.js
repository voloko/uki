/**
* Horizontal Slider. 
*
* @author voloko
* @name uki.view.Slider
* @class
* @extends uki.view.Base
* @implements uki.view.Focusable
*/
uki.view.declare('uki.view.Slider', uki.view.Base, uki.view.Focusable, function(Base, Focusable) {
    
    this._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _min: 0,
            _max: 1,
            _value: 0,
            _values: null,
            _keyStep: 0.01
        });
    };
    
    /**
    * @function
    * @name uki.view.Slider#min
    */
    /**
    * @function
    * @name uki.view.Slider#max
    */
    /**
    * @function
    * @name uki.view.Slider#values
    */
    /**
    * @function
    * @name uki.view.Slider#keyStep
    */
    uki.addProps(this, ['min', 'max', 'values', 'keyStep']);
    
    this.values = uki.newProp('_values', function(val) {
        this._values = val;
        this._min = val[0];
        this._max = val[val.length - 1];
    });
    
    /**
    * @function
    * @fires event:change
    * @name uki.view.Slider#value
    */
    this.value = uki.newProp('_value', function(val) {
        this._value = MAX(this._min, MIN(this._max, val));
        this._position = this._val2pos(this._value);
        this._moveHandle();
        this.trigger('change', {source: this, value: this._value});
    });
    
    this._pos2val = function(pos, cacheIndex) {
        if (this._values) {
            var index = Math.round(1.0 * pos / this._rect.width * (this._values.length - 1));
            if (cacheIndex) this._cachedIndex = index;
            return this._values[index];
        }
        return pos / this._rect.width * (this._max - this._min);
    };
    
    this._val2pos = function(val) {
        if (this._values) {
            var index = this._cachedIndex !== undefined ? this._cachedIndex : uki.binarySearch(val, this._values);
            return index / (this._values.length - 1) * this._rect.width;
        }
        return val / (this._max - this._min) * this._rect.width;
    };
    
    this._createDom = function() {
        this._dom = uki.createElement('div', this.defaultCss + 'height:18px;-moz-user-select:none;-webkit-user-select:none;overflow:visible;');
        this._handle = uki.createElement('div', this.defaultCss + 'overflow:hidden;cursor:default;background:url(' + uki.theme.image('x').src + ')');
        this._bg = uki.theme.image('slider-handle');
        this._focusBg = uki.theme.image('slider-focus');
        this._focusBg.style.cssText += this._bg.style.cssText += this.defaultCss + 'top:0;left:0;z-index:-1;position:absolute;'; 
        this._handle.appendChild(this._bg);
        
        
        uki.theme.background('slider-bar').attachTo(this);
        this._initFocusable();
        
        uki.image.load([this._bg, this._focusBg], uki.proxy(this._afterHandleLoad, this) );
    };
    
    this._afterHandleLoad = function() {
        this._focusBg.style.cssText += ';z-index:10;margin-left:-' + (this._focusBg.width) / 2 + 'px;margin-top:-' + (this._focusBg.height-(this._bg.height/2)+1)/2 + 'px;';
        this._handle.style.cssText += ';margin-left:-' + (this._bg.width / 2) + 'px;width:' +this._bg.width + 'px;height:' + (this._bg.height / 2) + 'px;';
        this._dom.appendChild(this._handle);
        
        uki.each(['mouseenter', 'mouseleave', 'draggesturestart', 'draggesture', 'draggestureend'], function(i, name) {
            uki.dom.bind(this._handle, name, uki.proxy(this['_' + name], this));
        }, this);
        
        this.bind('click', this._click);
        this.bind(uki.view.List.prototype.keyPressEvent(), this._keypress);
    };
    
    this._mouseenter = function() {
        this._over = true;
        this._bg.style.top = - this._bg.height / 2 + 'px';
    };
    
    this._mouseleave = function() {
        this._over = false;
        this._bg.style.top = this._dragging ? (- this._bg.height / 2 + 'px') : 0;
    };
    
    this._click = function(e) {
        var x = e.pageX - uki.dom.offset(this._dom).x;
        this.value(this._pos2val(x, true));
        this._cachedIndex = undefined;
    };
    
    this._keypress = function(e) {
        if (e.which == 39 || e.keyCode == 39) {
            this.value(this.value() + this._keyStep * (this._max - this._min));
        } else if (e.which == 37 || e.keyCode == 37) {
            this.value(this.value() - this._keyStep * (this._max - this._min));
        }
    };
    
    this._moveHandle = function() {
        // this._focusBg.style.left = this._handle.style.left = 100.0*this._position/this._rect.width + '%';
        this._focusBg.style.left = this._handle.style.left = this._position + 'px';
    };
    
    this._draggesturestart = function(e) {
        this._dragging = true;
        this._initialPosition = new Point(parseInt(this._handle.style.left, 10), parseInt(this._handle.style.top, 10));
        return true;
    };
    
    /**
     * @fires event:change
     */
    this._draggesture = function(e) {
        var position = MAX(0, MIN(this._rect.width, this._initialPosition.x + e.dragOffset.x));
        this.value(this._pos2val(position, true));
        this._cachedIndex = undefined;
    };
    
    this._draggestureend = function(e) {
        this._dragging = false;
        this._initialPosition = null;
        if (!this._over) this._bg.style.top = 0;
        this.value(this._pos2val(this._position, true));
        this._cachedIndex = undefined;
    };
    
    this._focus = function(e) {
        this._dom.appendChild(this._focusBg);
        this._focusBg.style.left = this._handle.style.left;
        Focusable._focus.call(this, e);
    };
    
    this._blur = function(e) {
        this._dom.removeChild(this._focusBg);
        Focusable._blur.call(this, e);
    };
    
    this._layoutDom = function(rect) {
        var fixedRect = rect.clone();
        fixedRect.height = 18;
        Base._layoutDom.call(this, fixedRect);
        this._position = this._val2pos(this._value);
        this._moveHandle();
        return true;
    };

    this._bindToDom = function(name) {
        if (name == 'change') return true;
        return uki.view.Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    };
    
});
