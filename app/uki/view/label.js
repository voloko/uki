include('base.js');

(function() {

var Base = uki.view.Base.prototype,
    self = uki.view.Label = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
    init: function() {
        Base.init.apply(this, arguments);
        this._dom = uki.createElement('div', Base.defaultCss + 
            "font-family:Helvetica-Neue,Helvetica,Arial,sans-serif;font-size:12px;line-height:15px;white-space:nowrap;"); // text-shadow:0 1px 0px rgba(255,255,255,0.8);
    },
    
    typeName: function() {
        return 'uki.view.Label';
    },
    
    _domCreate: function() {
        this._selectable = true;
    },
    
    _domLayout: function() {
        Base._domLayout.apply(this, arguments);
        if (!this.multiline()) this._dom.style.lineHeight = this._rect.height + 'px';
    },
    
    text: function(text) {
        return arguments.length == 0 ? this.html() : this.html(uki.escapeHTML(text));
    },
    
    html: function(html) {
        if (arguments.length == 0) {
            return this._dom.innerHTML;
        } else {
            this._dom.innerHTML = html;
        }
    },
    
    align: function(align) {
        if (arguments.length == 0) {
            return this.dom().style.textAlign;
        } else {
            this.dom().style.textAlign = align;
        }
    },

    selectable: function(state) {
        if (arguments.length == 0) {
            return this._selectable;
        } else {
            this._dom.style.MozUserSelect = state ? '' : 'none';
            this._dom.style.WebkitUserSelect = state ? '' : 'none';
            this._dom.style.userSelect = state ? '' : 'none';
            this._dom.style.cursor = state ? 'text' : 'default';
        }
    },
    
    multiline: function(state) {
        if (arguments.length == 0) return this._dom.style.whiteSpace != 'nowrap';
        this._dom.style.whiteSpace = state ? '' : 'nowrap';
        if (this._rect) this._dom.style.lineHeight = state ? '' : this._rect.height + 'px';
    }
});
    
})();