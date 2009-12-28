uki.view.Flow = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container[PROTOTYPE],
        proto = this;

    
    proto._setup = function() {
        Base._setup.call(this);
        this._horizontal = false;
        this._dimension = 'height';
        this._containers = [];
        this._containerSizes = [];
        this.defaultCss = this.defaultCss + 'overflow:hidden;'
    };
    
    proto.typeName = function() {
        return 'uki.view.Flow';
    };
    
    proto.horizontal = uki.newProp('_horizontal', function(h) {
        this._dimension = h ? 'width' : 'height';
    });
    
    proto.appendChild = function(view) {
        view.resizeToContents(this._horizontal ? 'width' : 'height');
        var container = this._createContainer(view),
            v = view.rect()[this._dimension];
        this._containers[view._viewIndex] = container;
        this._containerSizes[view._viewIndex] = 0;
        this._initContainer(container);
        container.style[this._dimension] = v + 'px';
        this._dom.appendChild(container);
        this._containerSizes[view._viewIndex] = v;
        
        Base.appendChild.call(this, view);
    };
    
    proto.removeChild = function(view) {
        var container = this._containers[view._viewIndex];
        Base.removeChild.call(this, view);
        
        this._dom.removeChild(container);
        this._containers = uki.grep(this._containers, function(c) { return c != container; });
    };
    
    proto.domForChild = function(child) {
        return this._containers[child._viewIndex];
    };
    
    proto.contentsSize = function() {
        var d = this._dimension,
            value = uki.reduce(0, this._childViews, function(sum, e) { return sum + e.rect()[d]; } );
        if (this._horizontal) {
            return new Size( value, this.contentsHeight() );
        } else {
            return new Size( this.contentsWidth(), value );
        }
    };
    
    // proto._updateSize = function(dv) {
    //     var rect = this.rect(),
    //         width, height;
    //         
    //     if (this._horizontal) {
    //         width = rect.width + dv;
    //         height = rect.height;
    //     } else {
    //         width = rect.width;
    //         height = rect.height + dv;
    //     }
    //     this.rect( new Rect(rect.x, rect.y, width, height) );
    // };
    
    // proto.childResized = function(child) {
    //     var rect = this.rect(),
    //         childRect = child.rect(),
    //         index = child._viewIndex,
    //         container = this._containers[index],
    //         value = this._containerSizes[index],
    //         dv = childRect[this._dimension] - value,
    //         sizeChanged = !!dv;
    //         
    //     if (this._horizontal) sizeChanged = sizeChanged || rect.height == childRect.height;
    //     else sizeChanged = sizeChanged || rect.width == childRect.width;
    //     
    //     if (!sizeChanged) return;
    //     this._updateSize(dv);
    // };
    
    proto._createDom = function() {
        Base._createDom.call(this);
        for (var i=0; i < this._containers.length; i++) {
            this._initContainer(this._containers[i]);
            this._dom.appendChild(this._containers[i]);
        };
    };
    
    proto._initContainer = function(c) {
        if (this._horizontal) {
            c.style.cssText += ';float:left';
            c.style.height = this.rect().height + 'px';
        }
    };
    
    proto._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        var i, l, c, v;
        for (i=0, l = this._containers.length; i < l; i++) {
            c = this._containers[i];
            v = this._childViews[i].rect()[this._dimension];
            if (v != this._containerSizes[i]) {
                c.style[this._dimension] = v + 'px';
                this._containerSizes[i] = v;
            }
        };
    };
    
    proto._createContainer = function(view) {
        return uki.createElement('div', 'position:relative;top:0;left:0;width:100%;padding:0;');
    };
});