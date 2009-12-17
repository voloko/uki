uki.view.ScrollPane = uki.newClass(uki.view.Container, new function() {
    /**
     * Scroll pane. Pane with scrollbars with content overflowing the borders.
     * Works consisently across all supported browsers.
     */
    
    // Opera >= 9.5 fails to produce scrollbars if inner absolutly position div is set as l:0,r:0,t:0,b:0
    // it needs explict height and width for the div. Hence requirePaneResize and less smooth animation
    // Opera < 9.5 does not support separate overflowX and overflowY. Thus we have to set overflow to auto
    // and inflict scrollbars with inner pane
    
    // Ie 6 lives happily with w:100%,h:100% and overflowed content
    var Base = uki.view.Container.prototype,
        proto = this,
        scrollWidth,
        requirePaneResize = !!window.opera, 
        hasSeparateOverflows;
        
    function initScrollWidth () {
        if (!scrollWidth) {
            uki.dom.probe(
                uki.createElement(
                    'div', 
                    'position:absolute;left:-99em;width:100px;height:100px;overflow:scroll;'
                ),
                function( probe ) {
                    hasSeparateOverflows = typeof probe.style.overflowX == 'string';
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
    
    this.childResized = function(child) {
        this._updateInnerRect();
    };
    
    this.scroll = function(dx, dy) {
        if (dx) this.scrollTop(this.scrollLeft() + dy);
        if (dy) this.scrollTop(this.scrollTop() + dy);
    };
    
    this.scrollTop = function(val) {
        if (val === undefined) return this._dom && this._dom.scrollTop || 0;
        
        this._dom.scrollTop = val;
        return this;
    };
    
    this.scrollLeft = function(val) {
        if (val === undefined) return this._dom && this._dom.scrollLeft || 0;
        
        this._dom.scrollLeft = val;
        return this;
    };
    
    this.visibleRect = function() {
        return new Rect(this.scrollLeft(), this.scrollTop(), this._innerRect.width, this._innerRect.height);
    };
    
    proto._createDom = function() {
        Base._createDom.call(this);
        this._pane = uki.createElement('div', 'position:absolute;left:0;top:0;' + (uki.supportNativeLayout && !requirePaneResize ? 'right:0;bottom:0' : 'width:100%;height:100%'));
        if (requirePaneResize) {
            this._pane.style.overflow = 'hidden';
            if (!hasSeparateOverflows) this._dom.style.overflow = 'auto';
        }
        this._dom.appendChild(this._pane);
    };
    
    proto.domForChild = function() {
        return this._pane;
    };
    
    proto.contentsSize = function() {
        return new Rect(this.maxProp(this, 'maxX'), this.maxProp(this, 'maxY'));
    };
    
    proto.visibleRect = function() {
        this._updateInnerRect();
        var tmpRect = this._innerRect.clone();
        tmpRect.x = this.rect().x + this.scrollLeft();
        tmpRect.y = this.rect().y + this.scrollTop();
        return tmpRect;
    };
    
    // (rect - scroll bars) if needed
    proto._updateInnerRect = function() {
        initScrollWidth();
        
        var oldRect = this._innerRect;
        this._innerRect = new Rect(0, 0, this.rect().width - (this._scrollV ? scrollWidth : 0), this.rect().height - (this._scrollH ? scrollWidth : 0) );
        
        if (oldRect) {
            if (!oldRect.eq(this._innerRect)) this._resizeChildViews(oldRect);

            var max, scroll, dx = 0, dy = 0;
            if (this._scrollableV) {
                this._maxY = max = this.contentsHeight();
                scroll = max > this._innerRect.height;
                if (scroll != this._scrollV) dx = (scroll ? -1 : 1) * scrollWidth;
                this._scrollV = scroll;
            }
            if (this._scrollableH) {
                this._maxX = max = this.contentsWidth();
                scroll = max > this._innerRect.width;
                if (scroll != this._scrollH) dy = (scroll ? -1 : 1) * scrollWidth;
                this._scrollH = scroll;
            }
            
            if (dx || dy) {
                oldRect = this._innerRect.clone();
                this._innerRect.width += dx;
                this._innerRect.height += dy;
                this._needsLayout = true;
                
                this._resizeChildViews(oldRect);
            }
        } else {
            this._needsLayout = true;
        }
        this._clientRect = requirePaneResize ? new Rect(0, 0, this._scrollH ? this._maxX : this._innerRect.width, this._scrollV ? this._maxY : this._innerRect.height) : this._innerRect;
        
        // this._calcMaxRect();
        this.trigger('resize', {oldRect: oldRect, newRect: this._rect, source: this});
    };
    
    proto.clientRect = function() {
        return this._clientRect;
    };
    
    proto.rect = function(newRect) {
        if (newRect === undefined) return this._rect;
        newRect = Rect.create(newRect);
        
        var oldRect = this._rect;
        if (!this._resizeSelf(newRect)) return this;
        this._updateInnerRect();
        this._needsLayout = true;
        return this;
    };
    
    proto._resizeChildViews = function(oldRect) {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            childViews[i].parentResized(oldRect, this._innerRect);
        };
    };
    
    proto._layoutChildViews = function() {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            if (childViews[i]._needsLayout && childViews[i].visible()) {
                childViews[i].layout();
            }
        };
    };
    
    proto._layoutDom = function(rect) {
        if (requirePaneResize) {
            var clientRect = this.clientRect();
            this._pane.style.height = clientRect.height + 'px';
            this._pane.style.width = clientRect.width + 'px';
        } 
        if (hasSeparateOverflows) {
            if (this._scrollableH && this._layoutScrollH !== this._scrollH) {
                this._dom.style.overflowX = this._scrollH ? 'scroll' : 'hidden';
                this._layoutScrollH = this._scrollH;
            }

            if (this._scrollableV && this._layoutScrollV !== this._scrollV) {
                this._dom.style.overflowY = this._scrollV ? 'scroll' : 'hidden';
                this._layoutScrollV = this._scrollV;
            }
        }
        
        Base._layoutDom.call(this, rect);
        this._layoutChildViews(rect);
    };
    
    // if (useOuterRect && uki.supportNativeLayout) this._pane.style.bottom = this._scrollH ? scrollWidth + 'px' : 0;
});