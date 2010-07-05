/**
* Horizontal Slider. 
*
* @author voloko
* @name uki.view.Slider
* @class
* @extends uki.view.Base
* @implements uki.view.Focusable
*/
uki.view.declare('uki.view.Slider', uki.view.Container, uki.view.Focusable, function(Base, Focusable) {
    
    this._handleSize = new Size(10,18);
    
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
    });
    
    this._pos2val = function(pos, cacheIndex) {
        if (this._values) {
            var index = Math.round(1.0 * pos / (this._rect.width - this._handleSize.width) * (this._values.length - 1));
            if (cacheIndex) this._cachedIndex = index;
            return this._values[index];
        }
        return pos / (this._rect.width - this._handleSize.width) * (this._max - this._min) + this._min;
    };
    
    this._val2pos = function(val) {
        if (this._values) {
            var index = this._cachedIndex !== undefined ? this._cachedIndex : uki.binarySearch(val, this._values);
            return index / (this._values.length - 1) * (this._rect.width - this._handleSize.width);
        }
        return (val - this._min) / (this._max - this._min) * (this._rect.width - this._handleSize.width);
    };
    
    this._createDom = function() {
        this._dom = uki.createElement('div', this.defaultCss + 'height:18px;-moz-user-select:none;-webkit-user-select:none;overflow:visible;');
        this._initClassName();
        this._handle = uki({ 
            view: 'SliderHandle', 
            rect: new Rect(0, (this._rect.height-this._handleSize.height)/2, this._handleSize.width, this._handleSize.height),
            anchors: 'left top'
        })[0];
        this.appendChild(this._handle);
        
        uki.theme.background('slider-bar').attachTo(this);
        uki.each(['draggesturestart', 'draggesture', 'draggestureend'], function(i, name) {
            this._handle.bind(name, uki.proxy(this['_' + name], this));
        }, this);
        
        this.bind(uki.view.List.prototype.keyPressEvent(), this._keypress);
        this.bind('click', this._click);
        
        this._initFocusable();
    };
    
    this._focus = function(e) {
        this._handle._focus();
        Focusable._focus.call(this, e);
    };

    this._blur = function(e) {
        this._handle._blur();
        Focusable._blur.call(this, e);
    };
    
    this._click = function(e) {
        var x = e.pageX - uki.dom.offset(this._dom).x - this._handleSize.width/2;
        this.value(this._pos2val(x, true));
        this._cachedIndex = undefined;
        this.trigger('change', {source: this, value: this._value});
    };
    
    this._keypress = function(e) {
        if (e.which == 39 || e.keyCode == 39) {
            this.value(this.value() + this._keyStep * (this._max - this._min));
        } else if (e.which == 37 || e.keyCode == 37) {
            this.value(this.value() - this._keyStep * (this._max - this._min));
        }
    };
    
    this._moveHandle = function() {
        var rect = this._handle.rect().clone();
        rect.x = this._position;
        rect.y = (this._rect.height - this._handleSize.height) / 2;
        this._handle.rect(rect).layout();
    };
    
    this._draggesturestart = function(e) {
        this._dragging = true;
        this._initialPosition = this._handle.rect().clone();
        return true;
    };
    
    /**
     * @fires event:change
     */
    this._draggesture = function(e) {
        var position = MAX(0, MIN(this._rect.width - this._handleSize.width, this._initialPosition.x + e.dragOffset.x));
        this.value(this._pos2val(position, true));
        this._cachedIndex = undefined;
    };
    
    this._draggestureend = function(e) {
        this._dragging = false;
        this._initialPosition = null;
        this.value(this._pos2val(this._position, true));
        this._cachedIndex = undefined;
        this.trigger('change', {source: this, value: this._value});
    };
    
    this._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        this._position = this._val2pos(this._value);
        this._moveHandle();
        return true;
    };

    this._bindToDom = function(name) {
        if (name == 'change') return true;
        return uki.view.Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    };
    
});

uki.view.declare('uki.view.SliderHandle', uki.view.Button, { _backgroundPrefix: 'slider-handle-', _focusable: false });
