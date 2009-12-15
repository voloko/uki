(function() {

var Base = uki.view.Base.prototype;

var ANCHOR_TOP      = 1,
    ANCHOR_RIGHT    = 2,
    ANCHOR_BOTTOM   = 4,
    ANCHOR_LEFT     = 8;

uki.view.Label = uki.newClass(uki.view.Base, {
    init: function() {
        Base.init.apply(this, arguments);
        this._scrollable = false;
        this._selectable = false;
        this._inset = new uki.geometry.Inset(0, 0, 0, 0);
        this._label = uki.createElement('div', Base.defaultCss + 
            "font-family:Helvetica-Neue,Helvetica,Arial,sans-serif;font-size:12px;line-height:12px;white-space:nowrap;"); // text-shadow:0 1px 0px rgba(255,255,255,0.8);
    },
    
    typeName: function() {
        return 'uki.view.Label';
    },
    
    selectable: function(state) {
        if (state !== undefined) {
            this._label.unselectable = state ? '' : 'on';
        }
        return Base.selectable.call(this, state);
    },
    
    contentsSize: function() {
        return this.rect();
    },
    
    
    _createDom: function() {
        Base._createDom.call(this);
        this._dom.appendChild(this._label);
    },
    
    _layoutDom: function() {
        Base._layoutDom.apply(this, arguments);
        var inset = this._inset;
        // if (!this.multiline()) this._label.style.lineHeight = (this._rect.height - inset.top - inset.bottom) + 'px';
        if (!this.multiline()) this._label.style.paddingTop = (this._rect.height/2 - 6) + 'px';
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
                width: this._rect.width - inset.left - inset.right,
                height: this._rect.height - inset.top - inset.bottom
            };
        }
        this._lastLabelLayout = uki.dom.layout(this._label.style, l, this._lastLabelLayout);
    },
    
    text: function(text) {
        return text === undefined ? this.html() : this.html(uki.escapeHTML(text));
    },
    
    html: function(html) {
        if (html === undefined) {
            return this._label.innerHTML;
        } else {
            this._label.innerHTML = html;
        }
    },
    
    align: function(align) {
        if (align === undefined) {
            return this._label.style.textAlign;
        } else {
            this._label.style.textAlign = align;
        }
    },
    
    inset: function(inset) {
        if (inset === undefined) {
            return this._inset;
        } else {
            this._inset = uki.geometry.Inset.create(inset);
        }
    },

    scrollable: function(state) {
        if (state === undefined) {
            return this._scrollable;
        } else {
            this._scrollable = state;
            this._label.style.overflow = state ? 'auto' : 'hidden';
        }
    },
    
    multiline: function(state) {
        if (state === undefined) return this._label.style.whiteSpace != 'nowrap';
        this._label.style.whiteSpace = state ? '' : 'nowrap';
        // if (this._rect) this._label.style.lineHeight = state ? '' : this._rect.height + 'px';
    }
});
    
})();