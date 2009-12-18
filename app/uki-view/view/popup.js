
uki.view.Popup = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container.prototype,
        proto = this;
    
    proto.init = function() {
        Base.init.call(this);
    };
    
    proto.background = function(bg) {
        if (bg === undefined && !this._background) this._background = uki.theme.background('popup-normal');
        return Base.background.call(this, bg);
    };
    
    proto.layout = function() {
        if (!this._dom) {
            this._createDom(this._rect);
            // attach to document.body directly
            doc.body.appendChild(this._dom);
            this._bindPendingEventsToDom();
        }
        this._layoutDom(this._rect);
        this._needsLayout = false;
        this.trigger('layout', {rect: this._rect, source: this});
    };
    
    function offset (c) {
        var offsetX = 0,
            offsetY = 0,
            rect;
            
        while(c) {
            rect = c.visibleRect ? c.visibleRect() : c.rect();
            offsetX += c.rect().x;
            offsetX += c.rect().y;
        }
    }
    
    proto.parentResized = function() {
        // do nothing
    };
    
    proto._createDom = function() {
        this._dom = uki.createElement('div', this.defaultCss);
        
        this.selectable(this.selectable());
        this.className(this.className());
        this.background().attachTo(this);
    };
    
    proto._layoutDom = function(rect) {
        
    };
});