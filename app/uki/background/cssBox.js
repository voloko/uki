include('../background.js');
include('../geometry.js');

uki.background.CssBox = uki.newClass(new function() {
    
    var cache = {};
    
    function getInsets(options) {
        if (!cache[options]) {
            var _this = this;
            uki.dom.probe(
                uki.createElement('div', options + ';position:absolute;overflow:hidden;left:-999em;width:10px;height:10px;'), 
                function(c) {
                    cache[options] = new uki.geometry.Inset(
                        c.offsetWidth - 10,
                        c.offsetHeight - 10
                    );
                }
            );
        }
        return cache[options];
    }
    
    this.init = function(options, ext) {
        this._options = options;
        ext = ext || {};
        this._inset = inset = uki.geometry.Inset.create(ext.inset) || new uki.geometry.Inset(0, 0, 0, 0);
        this._insetWidth  = getInsets(options).left + inset.left + inset.right;
        this._insetHeight = getInsets(options).top + inset.top + inset.bottom;

        this._container = uki.createElement(
            'div', 
            options + ';position:absolute;overflow:hidden;z-index:' + (ext.zIndex || '-1') + ';' + 
            'left:' + inset.left + ';top:' + inset.top + 'px;right:' + inset.right + 'px;bottom:' + inset.bottom + 'px'
        );
        this._attached = false;
    };
    
    this.attachTo = function(comp) {
        var _this = this;
        this._comp = comp;
        this._comp.dom().appendChild(this._container);
        
        if (uki.supportNativeLayout) return;
        
        this._layoutHandler = function(e) {
            _this.layout(e.rect);
        };
        this._comp.bind('layout', this._layoutHandler);
        if (this._comp.rect()) this.layout(this._comp.rect());
    };
    
    this.layout = function(size) {
        uki.dom.layout(this._container.style, {
            width: size.width - this._insetWidth,
            height: size.height - this._insetHeight
        });
    };
    
    this.detach = function() {
        if (this._comp) {
            this._comp.dom().removeChild(this._container);
            if (!uki.supportNativeLayout) this._comp.unbind('layout', this._layoutHandler);
            this._attached = false;
        }
    };
});