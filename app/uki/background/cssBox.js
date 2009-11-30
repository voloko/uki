include('../background.js');
include('../image.js');

uki.background.CssBox = uki.newClass(new function() {
    
    this.init = function(options, inset) {
        this._options = options;
        this._inset = inset = uki.geometry.Inset.create(inset) || new uki.geometry.Inset(0, 0, 0, 0);
        this._container = uki.createElement('div', options + ';position:absolute;overflow:hidden;z-index:-1;left:-999em;top:' + inset.top + 'px');
        this._container.style.width = '10px';
        this._container.style.height = '10px';
        document.body.appendChild(this._container);
        this._insetWidth = this._container.offsetWidth - 10 + inset.left + inset.right;
        this._insetHeight = this._container.offsetHeight - 10 + inset.top + inset.bottom;
        document.body.removeChild(this._container);
        this._container.style.left = inset.left + 'px';
        this._attached = false;
    };
    
    this.attachTo = function(comp) {
        var _this = this;
        this._comp = comp;
        
        this._layoutHandler = function(e) {
            _this.layout(e.rect);
        };
        this._comp.bind('layout', this._layoutHandler);
        if (this._comp.rect()) this.layout(this._comp.rect());
    };
    
    this.layout = function(size) {
        if (!this._comp.dom()) return;
        if (!this._attached) {
            this._attached = true;
            this._comp.dom().appendChild(this._container);
        }
        
        uki.dom.layout(this._container.style, {
            width: size.width - this._insetWidth,
            height: size.height - this._insetHeight
        });
    };
    
    this.detach = function() {
        if (this._comp) {
            if (this._attached) this._comp.dom().removeChild(this._container);
            this._comp.unbind('layout', this._layoutHandler);
            this._attached = false;
        }
    };
});