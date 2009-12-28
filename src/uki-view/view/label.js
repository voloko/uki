include('../../uki-core/const.js');

uki.view.Label = uki.newClass(uki.view.Base, new function() {
    var Base = uki.view.Base[PROTOTYPE],
        proto = this;
    
    
    proto._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _scrollable: false,
            _selectable: false,
            _inset: new Inset()
        });
    };
    
    proto.typeName = function() {
        return 'uki.view.Label';
    };
    
    proto.selectable = function(state) {
        if (state !== undefined) {
            this._label.unselectable = state ? '' : 'on';
        }
        return Base.selectable.call(this, state);
    };
    
    proto.fontSize = function(size) {
        if (size === undefined) return this._label.style.fontSize;
        
        this._label.style.fontSize = this._label.style.lineHeight = size + 'px';
        return this;
    };
    
    /**
     * Warning! this operation is expensive
     */
    proto.contentsSize = function(autosize) {
        var clone = this._createLabelClone(autosize), inset = this.inset(), size;
        
        uki.dom.probe(clone, function() {
            size = new Size(clone.offsetWidth + inset.width(), clone.offsetHeight + inset.height());
        });
        
        return size;
    };
    
    proto.text = function(text) {
        return text === undefined ? this.html() : this.html(uki.escapeHTML(text));
    };
    
    proto.html = function(html) {
        if (html === undefined) return this._label.innerHTML;
        this._label.innerHTML = html;
        return this;
    };
    
    proto._css = function(name, value) {
        if (value === undefined) return this._label.style[name];
        this._label.style[name] = value;
        return this;
    };
    
    uki.each(['fontSize', 'textAlign', 'color', 'fontFamily', 'fontWeight', 'lineHeight'], function(i, name) {
        proto[name] = function(value) {
            return this._css(name, value);
        };
    });
    
    proto.inset = function(inset) {
        if (inset === undefined) return this._inset;
        this._inset = Inset.create(inset);
        return this;
    };

    proto.scrollable = function(state) {
        if (state === undefined) return this._scrollable;
        this._scrollable = state;
        this._label.style.overflow = state ? 'auto' : 'hidden';
        return this;
    };
    
    proto.multiline = function(state) {
        if (state === undefined) return this._label.style.whiteSpace != 'nowrap';
        this._label.style.whiteSpace = state ? '' : 'nowrap';
        // this._label.style.lineHeight = state ? '' : this._rect.height + 'px';
        return this;
    };
    
    proto._createLabelClone = function(autosize) {
        var clone = this._label.cloneNode(true),
            inset = this.inset(), rect = this.rect();
            
        if (autosize & AUTOSIZE_WIDTH) {
            clone.style.width = clone.style.right = '';
        } else if (uki.supportNativeLayout) {
            clone.style.right = '';
            clone.style.width = rect.width - inset.width() + 'px';
        }
        if (autosize & AUTOSIZE_HEIGHT) {
            clone.style.height = clone.style.bottom = '';
        } else if (uki.supportNativeLayout) {
            clone.style.bottom = '';
            clone.style.height = rect.height - inset.height() + 'px';
        }
        clone.style.paddingTop = 0;
        clone.style.visibility = 'hidden';
        return clone;
    };
    
    proto._createDom = function() {
        Base._createDom.call(this);
        this._label = uki.createElement('div', Base.defaultCss + 
            "font-size:12px;line-height:12px;white-space:nowrap;"); // text-shadow:0 1px 0px rgba(255,255,255,0.8);
        this._dom.appendChild(this._label);
    };
    
    proto._layoutDom = function() {
        Base._layoutDom.apply(this, arguments);
        
        var inset = this._inset;
        if (!this.multiline()) {
            var fz = parseInt(this._css('fontSize')) || 12;
            this._label.style.lineHeight = (this._rect.height - inset.top - inset.bottom) + 'px';
            // this._label.style.paddingTop = MAX(0, this._rect.height/2 - fz/2) + 'px';
        }
        var l;
        
        if (uki.supportNativeLayout) {
            l = {
                left: inset.left, 
                top: inset.top, 
                right: inset.right,
                bottom: inset.bottom
            };
        } else {
            l = {
                left: inset.left, 
                top: inset.top, 
                width: this._rect.width - inset.width(),
                height: this._rect.height - inset.height()
            };
        }
        this._lastLabelLayout = uki.dom.layout(this._label.style, l, this._lastLabelLayout);
    };
});
