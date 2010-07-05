include('../background.js');
include('../geometry.js');

/**
 * Adds a div with given cssText to dom()
 *
 * @class
 */
uki.background.CssBox = uki.newClass(new function() {
    
    var cache = {};
    /** @ignore */
    function getInsets(options) {
        if (!cache[options]) {
            uki.dom.probe(
                uki.createElement('div', options + ';position:absolute;overflow:hidden;left:-999em;width:10px;height:10px;'), 
                function(c) {
                    cache[options] = new Inset(
                        c.offsetHeight - 10,
                        c.offsetWidth - 10
                    );
                }
            );
        }
        return cache[options];
    }
    
    /**#@+ @memberOf uki.background.CssBox.prototype */
    
    this.init = function(options, ext) {
        this._options = options;
        ext = ext || {};
        this._inset = inset = Inset.create(ext.inset) || new Inset();
        this._insetWidth  = getInsets(options).left + inset.left + inset.right;
        this._insetHeight = getInsets(options).top + inset.top + inset.bottom;

        this._container = uki.createElement(
            'div', 
            'position:absolute;overflow:hidden;z-index:' + (ext.zIndex || '-1') + ';' + 
            'left:' + inset.left + 'px;top:' + inset.top + 'px;right:' + inset.right + 'px;bottom:' + inset.bottom + 'px;' +
            uki.browser.css(options),
            ext.innerHTML
        );
        this._container.className = 'uki-background-CssBox';
        this._attached = false;
    };
    
    this.attachTo = function(comp) {
        this._comp = comp;
        this._comp.dom().insertBefore(this._container, this._comp.dom().firstChild);

        if (uki.supportNativeLayout) return;
        
        this._layoutHandler = this._layoutHandler || uki.proxy(function(e) { this.layout(e.rect); }, this);
        this._comp.bind('layout', this._layoutHandler);
        this.layout(this._comp.rect());
    };
    
    this.layout = function(size) {
        this._prevLayout = uki.dom.layout(this._container.style, {
            width: size.width - this._insetWidth,
            height: size.height - this._insetHeight
        }, this._prevLayout);
    };
    
    this.detach = function() {
        if (this._comp) {
            this._comp.dom().removeChild(this._container);
            if (!uki.supportNativeLayout) this._comp.unbind('layout', this._layoutHandler);
            this._attached = false;
        }
    };
    
    /**#@-*/
});