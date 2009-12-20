uki.view.Flow = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container.prototype,
        proto = this;

    
    proto.init = function() {
        Base.init.call(this);
        this._containers = [];
        this._containerHeights = [];
        this._autosizeToContents = AUTOSIZE_HEIGHT;
    };
    
    proto.typeName = function() {
        return 'uki.view.Flow';
    };
    
    proto.appendChild = function(view) {
        Base.appendChild.call(this, view);
        this._containers[view._viewIndex] = this._createContainer(view);
        this._containerHeights[view._viewIndex] = view.rect().height;
        if (this._dom) this._dom.appendChild(this._containers[view._viewIndex]);
    };
    
    proto.removeChild = function(view) {
        var container = this._containers[view._viewIndex];
        Base.removeChild.call(this, view);
        if (this._dom) this._dom.removeChild(container);
        this._containers = uki.grep(this._containers, function(c) { return c != container; });
    };
    
    proto.domForChild = function(child) {
        return this._containers[child._viewIndex];
    };
    
    proto.contentsSize = function() {
        var height = uki.reduce(0, this._childViews, function(sum, e) { return sum + e.rect().height } );
        return new Size(this.contentsWidth(), height );
    };
    
    proto.childResized = function(child) {
        var rect = this.rect(),
            childRect = child.rect(),
            index = child._viewIndex,
            container = this._containers[index],
            height = this._containerHeights[index],
            dh = childRect.height - height,
            width = this._autosizeToContents & AUTOSIZE_WIDTH && rect.width != childRect.width ? this.contentsWidth() : rect.width;
            
        if (!dh && width == rect.width) return;
        
        this.rect( new Rect(rect.x, rect.y, width, rect.height + dh) );
        this.parent().childResized( this );
    };
    
    proto._createDom = function() {
        Base._createDom.call(this);
        for (var i=0; i < this._containers.length; i++) {
            this._dom.appendChild(this._containers[i]);
        };
    };
    
    proto._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        var i, l, c, h;
        for (i=0, l = this._containers.length; i < l; i++) {
            c = this._containers[i];
            h = this._childViews[i].rect().height;
            if (h != this._containerHeights[i]) {
                c.style.height = h + 'px';
                this._containerHeights[i] = h;
            }
        };
    };
    
    proto._createContainer = function(view) {
        return uki.createElement('div', 'position:relative;top:0;left:0;width:100%;padding:0;height:' + view.rect().height + 'px');
    };
});