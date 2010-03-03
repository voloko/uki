include('label.js');

uki.view.Button = uki.newClass(uki.view.Label, uki.view.Focusable, new function() {
    var proto = this,
        Base = uki.view.Label.prototype;
    
    proto._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _inset: new Inset(0, 4),
            _backgroundPrefix: 'button-',
            defaultCss: Base.defaultCss + "cursor:default;-moz-user-select:none;-webkit-user-select:none;" //text-shadow:0 1px 0px rgba(255,255,255,0.8)
        });
    };
    
    proto.typeName = function() {
        return 'uki.view.Button';
    };
    
    uki.addProps(proto, ['backgroundPrefix']);
    
    uki.each(['normal', 'hover', 'down', 'focus', 'disabled'], function(i, name) {
        var property = name + '-background';
        proto[property] = function(bg) {
            if (bg) this['_' + property] = bg;
            return this['_' + property] = this['_' + property] || 
                uki.theme.background(this._backgroundPrefix + name, {height: this.rect().height, view: this});
        };
    });
    
    proto._createLabelClone = function(autosize) {
        var clone = Base._createLabelClone.call(this, autosize);
        clone.style.fontWeight = this.style('fontWeight');
        return clone;
    };
    
    proto._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        if (this._firstLayout) {
            this['hover-background']();
            this['down-background']();

            this._backgroundByName(this._backgroundName || 'normal');
        }
    };
    
    proto._updateBg = function() {
        var name = this._disabled ? 'disabled' : this._down ? 'down' : this._over ? 'hover' : 'normal';
        this._dom.style.color = this._disabled ? '#999' : '#333'; // do not redefine explict style
        this._backgroundByName(name);
    };
        
    var supportMouseEnter = root.attachEvent && !root.opera;
    
    proto._createDom = function() {
        // dom
        this._dom = uki.createElement('div', this.defaultCss + 'color:#333;text-align:center;font-weight:bold;');
        this._label = uki.createElement('div', Base.defaultCss + 
            "font-size:12px;line-height:12px;white-space:nowrap;"); // text-shadow:0 1px 0px rgba(255,255,255,0.8);
        this._dom.appendChild(this._label);
        if (this._dom.attachEvent) {
            // click handler for ie
            this._dom.appendChild(uki.createElement('div', 'left:0;top:0;width:100%;height:100%;position:absolute;background:url(' + uki.theme.imageSrc('x') + ');'));
        }
        
        this.textSelectable(this.textSelectable());
        this._initFocusable();
        
        uki.dom.bind(document, 'mouseup', uki.proxy(this._mouseup, this));
        this.bind('mousedown', this._mousedown);
        this.bind(supportMouseEnter ? 'mouseenter' : 'mouseover', this._mouseover);
        this.bind(supportMouseEnter ? 'mouseleave' : 'mouseout', this._mouseout);
        this.bind('keyup', this._keyup);
        this.bind('keydown', this._keydown);
    };
    
    proto._mouseup = function(e) {
        if (!this._down) return;
        this._down = false;
        this._updateBg();
    };
    
    proto._mousedown = function(e) {
        this._down = true;
        this._updateBg();
    };
    
    proto._mouseover = function(e) {
        if (!supportMouseEnter && uki.dom.contains(this._dom, e.relatedTarget) || this._over) return;
        this._over = true;
        this._updateBg();
    };
    
    proto._mouseout = function(e) {
        if (!supportMouseEnter && uki.dom.contains(this._dom, e.relatedTarget) || !this._over) return;
        this._over = false;
        this._updateBg();
    };
    
    proto._focus = function() {
        this['focus-background']().attachTo(this);
    };
    
    proto._keydown = function(e) {
        e = e.domEvent;
        if ((e.which == 32 || e.which == 13) && !this._down) this._mousedown();
    };
    
    proto._keyup = function(e) {
        e = e.domEvent;
        if ((e.which == 32 || e.which == 13) && this._down) {
            this._mouseup();
            this.trigger('click', {domEvent: e, source: this});
        }
        if (e.which == 27 && this._down) {
            this._mouseup();
        }
    };
    
    proto._blur = function() {
       this['focus-background']().detach();
    };
    
    proto._backgroundByName = function(name) {
        var bg = this[name + '-background']();
        if (this._background == bg) return;
        if (this._background) this._background.detach();
        bg.attachTo(this);
        this._background = bg;
        this._backgroundName = name;
    };

    proto._bindToDom = function(name) {
        return uki.view.Focusable._bindToDom.call(this, name) || uki.view.Label.prototype._bindToDom.call(this, name);
    };
});