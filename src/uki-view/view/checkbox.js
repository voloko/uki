uki.view.declare('uki.view.Checkbox', uki.view.Base, uki.view.Focusable, function(Base, Focusable) {
    
    this._bindToDom = function(name) {
        if (' change'.indexOf(name) > -1) return;
        Base._bindToDom.apply(this, arguments);
    };
    
    this._imageSize = 18;
    
    this._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _checked: false,
            _textSelectable: false,
            _disabled: false
        });
    };
    
    this.value = this.checked = uki.newProp('_checked', function(state) {
        this._checked = !!state;
        this._updateBg();
    });
    
    this._click = function() {
        if (this._disabled) return;
        this.checked(!this._checked);
        this.trigger('change', {checked: this._checked, source: this});
    };
    
    this._updateBg = function() {
        var position = this._checked ? 0 : this._imageSize;
        position += this._disabled ? this._imageSize*4 : this._over ? this._imageSize*2 : 0; 
        this._image.style.top = - position + PX;
    };
    
    this._createImages = function() {
        this._image = uki.theme.image('checkbox');
        this._focusImage = uki.theme.image('checkbox-focus');
    };
    
    this._createDom = function() {
        this._createImages();
        
        var w = this._imageSize + PX,
            hw = this._imageSize / 2 + PX;
            
        this._dom = uki.createElement('div', Base.defaultCss + 'overflow:visible');
        this._box = uki.createElement('div', Base.defaultCss + 'overflow:hidden;left:50%;top:50%;margin-left:-' + hw + ';margin-top:-' + hw + ';width:' + w + ';height:' + w);
        this._image.style.cssText += ';position:absolute;-webkit-user-drag:none;';
        this._image.ondragstart = uki.F; // prevent drag in FF
        this._focusImage.style.cssText += 'display:block;-webkit-user-drag:none;position:absolute;z-index:-1;left:50%;top:50%;';
        
        this._dom.appendChild(this._box);
        this._box.appendChild(this._image);
        
        this._initFocusable();
        this.textSelectable(this.textSelectable());
        this.checked(this.checked());
        
        uki.dom.bind(this._box, 'click', uki.proxy(this._click, this));
        uki.dom.bind(this._box, 'mouseover', uki.proxy(this._mousover, this));
        uki.dom.bind(this._box, 'mouseout', uki.proxy(this._mouseout, this));
        
        uki.image.load([this._focusImage], uki.proxy(function() {
            this._focusImage.style.cssText += ';margin-left:-' + this._focusImage.width/2 + PX + ';margin-top:-' + this._focusImage.height/2 + PX;
        }, this));
        
        this.bind('keyup', this._keyup);
    };
    
    this._keyup = function(e) {
        if (e.which == 32 || e.which == 13) {
            this._click();
            this.trigger('click', {domEvent: e, source: this});
        }
    };
    
    this._mousover = function(e) {
        this._over = true;
        this._updateBg();
    };
    
    this._mouseout = function(e) {
        this._over = false;
        this._updateBg();
    };
    
    this._focus = function() {
        this._dom.appendChild(this._focusImage);
    };
    
    this._blur = function() {
        this._dom.removeChild(this._focusImage);
    };
    
    this._bindToDom = function(name) {
        return uki.view.Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    };
});
