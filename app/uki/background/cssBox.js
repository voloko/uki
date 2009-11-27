include('../background.js');
include('../image.js');

uki.background.CssBox = uki.newClass(new function() {
    
    this.init = function(inset, options) {
        this._options = options;
        this._inset = inset = (typeof inset == 'string') ? uki.geometry.Inset.fromString(inset) : inset;
        this._container = uki.createElement('div', options + ';position:absolute;overflow:hidden;z-index:-1;left:-999em;top:' + inset.top + 'px');
        this._container.style.width = '10px';
        this._container.style.height = '10px';
        document.body.appendChild(this._container);
        this._insetWidth = this._container.offsetWidth - 10 + inset.left + inset.right;
        this._insetHeight = this._container.offsetHeight - 10 + inset.top + inset.bottom;
        document.body.removeChild(this._container);
        this._container.style.left = inset.left + 'px';
    };
    
    this.attachTo = function(comp) {
        var _this = this;
        this._comp = comp;
        comp.dom().appendChild(this._container);
        
        this._resizeHandler = function(e) {
            _this._resize(e.newRect.size);
        };
        this._comp.bind('resize', this._resizeHandler);
        if (this._comp.rect()) this._resize(this._comp.rect().size);
    };
    
    this._resize = function(size) {
        uki.dom.layout(this._container.style, {
            width: size.width - this._insetWidth,
            height: size.height - this._insetHeight
        });
    };
    
    this.detach = function() {
        if (this._comp) {
            this._comp.removeChild(this._container);
            this._comp.unbind('resize', this._resizeHandler);
        }
    };
});