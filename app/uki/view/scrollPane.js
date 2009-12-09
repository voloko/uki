include('container.js');

uki.view.ScrollPane = uki.newClass(uki.view.Container, new function() {
    var Base = uki.view.Container.prototype,
        Rect = uki.geometry.Rect,
        proto = this,
        doc = document,
        scrollWidth,
        useOuterRect;
        
    function initScrollWidth () {
        if (!scrollWidth) {
            uki.dom.probe(
                uki.createElement(
                    'div', 
                    'position:absolute;left:-99em;width:100px;height:100px;overflow:scroll;',
                    '<div style="position:absolute;left:0;top:0;width:100%;height:100%;"></div>'
                ),
                function( probe ) {
                    useOuterRect = probe.childNodes[0].offsetWidth == 100;
                    scrollWidth = probe.offsetWidth - probe.clientWidth;
                }
            );
        }
        return scrollWidth;
    }
    
    proto.typeName = function() {
        return 'uki.view.ScrollPane';
    };
    
    proto.init = function() {
        Base.init.call(this);
        this._scrollableV = true;
        this._scrollableH = false;
        this._scrollV = false;
        this._scrollH = false;
    };
    
    this.scrollableV = uki.newProperty('_scrollableV');
    this.scrollableH = uki.newProperty('_scrollableH');
    
    this.scrollTop = function(val) {
        if (val === undefined) return this._dom && this._dom.scrollTop || 0;
        
        this._dom.scrollTop = val;
    };
    
    this.scrollLeft = function(val) {
        if (val === undefined) return this._dom && this._dom.scrollLeft || 0;
        
        this._dom.scrollLeft = val;
    };
    
    this.visibleRect = function() {
        return new Rect(this.scrollLeft(), this.scrollTop(), this.innerRect().width, this.innerRect().height);
    };
    
    proto._domCreate = function() {
        Base._domCreate.call(this);
        this._pane = uki.createElement('div', 'position:absolute;left:0;top:0;' + (uki.supportNativeLayout ? 'right:0;bottom:0' : 'width:100%;height:100%'));
        this._dom.appendChild(this._pane);
    };
    
    proto.domForChild = function() {
        return this._pane;
    };
    
    function maxProp (c, prop) {
        var val = 0, i, l;
        for (i = c._childViews.length - 1; i >= 0; i--){
            val = Math.max(c._childViews[i].rect()[prop]());
        };
        return val;
    }
    
    // proto._calcMaxRect = function() {
    //     this._maxRect = new Rect(0, 0, Math.max(this._innerRect.width, this._maxX || 0), Math.max(this._innerRect.height, this._maxY || 0));
    // };
    
    proto.visibleRect = function() {
        var tmpRect = this.innerRect().clone();
        tmpRect.x = this.scrollLeft();
        tmpRect.y = this.scrollTop();
        return tmpRect;
    };
    
    proto.innerRect = function(newRect) {
        if (newRect === undefined) return this._innerRect;
        
        initScrollWidth();
        var oldRect = this._innerRect;
        if (this._innerRect && newRect.eq(this._innerRect)) return;
        this._innerRect = newRect;
        this._needsLayout = true;
        
        if (oldRect) {
            if (oldRect.width != newRect.width || oldRect.height != newRect.height) {
                this._resizeChildViews(oldRect);

                var max, scroll, dx = 0, dy = 0;
                if (this._scrollableV) {
                    this._maxY = max = maxProp(this, 'maxY');
                    scroll = max > newRect.height;
                    if (scroll != this._scrollV) dx = (scroll ? -1 : 1) * scrollWidth;
                    this._scrollV = scroll;
                }
                if (this._scrollableH) {
                    this._maxX = max = maxProp(this, 'maxX');
                    scroll = max > newRect.width;
                    if (scroll != this._scrollH) dy = (scroll ? -1 : 1) * scrollWidth;
                    this._scrollH = scroll;
                }
                
                if (dx || dy) {
                    this._innerRect.width += dx;
                    this._innerRect.height += dy;
                    
                    this._resizeChildViews(oldRect);
                }
            }
        }
        
        // this._calcMaxRect();
        this.trigger('resize', {oldRect: oldRect, newRect: this._rect, source: this});
    };
    
    proto.rect = function(newRect) {
        if (newRect === undefined) return this._rect;
        newRect = Rect.create(newRect);
        
        var oldRect = this._rect;
        if (!this._resizeSelf(newRect)) return;
        this.innerRect( new Rect(0, 0, newRect.width - (this._scrollV ? scrollWidth : 0), newRect.height - (this._scrollH ? scrollWidth : 0) ) );
    };
    
    proto._resizeChildViews = function(oldRect) {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            childViews[i].parentResized(oldRect, this._innerRect);
        };
    };
    
    proto._layoutChildViews = function() {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            if (childViews[i]._needsLayout && childViews[i].visible()) {
                childViews[i].layout(); // this._rect TODO
            }
        };
    };
    
    proto._domLayout = function(rect) {
        if (this._scrollableH && this._layoutScrollH !== this._scrollH) {
            this._dom.style.overflowX = this._scrollH ? 'scroll' : 'hidden';
            if (useOuterRect && uki.supportNativeLayout) this._pane.style.bottom = this._scrollH ? scrollWidth + 'px' : 0;
            this._layoutScrollH = this._scrollH;
        }
        if (this._scrollableV && this._layoutScrollV !== this._scrollV) {
            this._dom.style.overflowY = this._scrollV ? 'scroll' : 'hidden';
            if (useOuterRect && uki.supportNativeLayout) this._pane.style.right = this._scrollV ? scrollWidth + 'px' : 0;
            this._layoutScrollV = this._scrollV;
        }
        Base._domLayout.call(this, rect);
        this._layoutChildViews(rect);
    };
});