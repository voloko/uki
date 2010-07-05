include('label.js');

/**
 * Button view
 *
 *
 * @author voloko
 * @name uki.view.Button
 * @class
 * @extends uki.view.Label
 * @implements uki.view.Focusable
 */
uki.view.declare('uki.view.Button', uki.view.Label, uki.view.Focusable, function(Base, Focusable) {
    /** @lends uki.view.Button.prototype */
    
    this._backgroundPrefix = 'button-';
    
    this._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _inset: new Inset(0, 4)
        });
        this.defaultCss += "cursor:default;-moz-user-select:none;-webkit-user-select:none;" + uki.theme.style('button');
    };
    
    /**
     * @function
     * @name uki.view.Button#backgroundPrefix
     */
    uki.addProps(this, ['backgroundPrefix']);
    
    /**
     * @function
     * @name uki.view.Button#"normal-background"
     */
    /**
     * @function
     * @name uki.view.Button#"hover-background"
     */
    /**
     * @function
     * @name uki.view.Button#"down-background"
     */
    /**
     * @function
     * @name uki.view.Button#"focus-background"
     */
     /**
      * @function
      * @name uki.view.Button#"disabled-background"
      */
    uki.each(['normal', 'hover', 'down', 'focus', 'disabled'], function(i, name) {
        var property = name + '-background';
        this[property] = function(bg) {
            if (bg) this['_' + property] = bg;
            return this['_' + property] = this['_' + property] || 
                uki.theme.background(this._backgroundPrefix + name, {height: this.rect().height, view: this});
        };
    }, this);
    
    this._createLabelClone = function(autosize) {
        var clone = Base._createLabelClone.call(this, autosize);
        // clone.style.fontWeight = this.style('fontWeight');
        return clone;
    };
    
    this._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        if (this._firstLayout) {
            this['hover-background']();
            this['down-background']();

            this._backgroundByName(this._backgroundName || 'normal');
        }
    };
    
    this._updateBg = function() {
        var name = this._disabled ? 'disabled' : this._down ? 'down' : this._over ? 'hover' : 'normal';
        this._backgroundByName(name);
    };
        
    this._createDom = function() {
        // dom
        this._dom = uki.createElement('div', this.defaultCss);
        this._initClassName();
        this._label = uki.createElement('div', this.defaultCss); // text-shadow:0 1px 0px rgba(255,255,255,0.8);
        this._dom.appendChild(this._label);
        
        this._dom.appendChild(uki.createElement('div', 'left:0;top:0;width:100%;height:100%;position:absolute;background:url(' + uki.theme.imageSrc('x') + ');'));
        
        this.textSelectable(this.textSelectable());
        this._initFocusable();
        
        uki.dom.bind(document, 'mouseup', uki.proxy(this._mouseup, this));
        this.bind('mousedown', this._mousedown);
        this.bind('mouseenter', this._mouseenter);
        this.bind('mouseleave', this._mouseleave);
        this.bind('keyup', this._keyup);
        this.bind('keydown', this._keydown);
    };
    
    this._mouseup = function(e) {
        if (!this._down) return;
        this._down = false;
        this._updateBg();
    };
    
    this._mousedown = function(e) {
        this._down = true;
        this._updateBg();
    };
    
    this._mouseenter = function(e) {
        this._over = true;
        this._updateBg();
    };
    
    this._mouseleave = function(e) {
        this._over = false;
        this._updateBg();
    };
    
    this._focus = function(e) {
        this['focus-background']().attachTo(this);
        Focusable._focus.call(this, e);
    };
    
    this._keydown = function(e) {
        if ((e.which == 32 || e.which == 13) && !this._down) this._mousedown();
    };
    
    this._keyup = function(e) {
        if ((e.which == 32 || e.which == 13) && this._down) {
            this._mouseup();
            this.trigger('click', {domEvent: e, source: this});
        }
        if (e.which == 27 && this._down) {
            this._mouseup();
        }
    };
    
    this._blur = function(e) {
       this['focus-background']().detach();
       Focusable._blur.call(this, e);
    };
    
    this._backgroundByName = function(name) {
        var bg = this[name + '-background']();
        if (this._background == bg) return;
        if (this._background) this._background.detach();
        bg.attachTo(this);
        this._background = bg;
        this._backgroundName = name;
    };

    this._bindToDom = function(name) {
        return uki.view.Focusable._bindToDom.call(this, name) || uki.view.Label.prototype._bindToDom.call(this, name);
    };
});