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
    var Base = uki.view.Container[PROTOTYPE],
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
    
    proto._setup = function() {
        Base._setup.call(this);
        this._innerRect = this.rect().clone();
        this._clientRect = this.rect().clone();
        uki.extend(this, {
            _scrollableV: true,
            _scrollableH: false,
            _scrollV: false,
            _scrollH: false
        });
    };
    
    uki.addProps(proto, ['scrollableV', 'scrollableH']);
    
    this.scroll = function(dx, dy) {
        if (dx) this.scrollTop(this.scrollLeft() + dy);
        if (dy) this.scrollTop(this.scrollTop() + dy);
    };
    
    proto._scrollTop = proto._scrollLeft = 0;
    uki.delegateProp(proto, 'scrollTop', '_dom');
    uki.delegateProp(proto, 'scrollLeft', '_dom');
    
    proto._createDom = function() {
        Base._createDom.call(this);
        this._pane = uki.createElement('div', 'position:absolute;left:0;top:0;' + (uki.supportNativeLayout && !requirePaneResize ? 'right:0;bottom:0' : 'width:100%;height:100%;'));
        if (requirePaneResize) {
            this._pane.style.overflow = 'visible';
            if (!hasSeparateOverflows) this._dom.style.overflow = 'auto';
        }
        this._dom.appendChild(this._pane);
    };
    
    proto.domForChild = function() {
        return this._pane;
    };
    
    proto.visibleRect = function() {
        // this._updateInnerRect();
        var tmpRect = this._innerRect.clone();
        tmpRect.x = this.rect().x + this.scrollLeft();
        tmpRect.y = this.rect().y + this.scrollTop();
        return tmpRect;
    };
    
    proto.rect = function(newRect) {
        if (newRect === undefined) return this._rect;
        
        newRect = Rect.create(newRect);
        
        this._parentRect = newRect;
        if (!this._resizeSelf(newRect)) return this;
        
        this._updateInnerRect();
        this._needsLayout = true;
        return this;
    };
    
    // (rect - scroll bars) if needed
    proto._updateInnerRect = function() {
        initScrollWidth();
        
        var oldRect = this._innerRect;
        this._innerRect = new Rect(this._rect.width + (this._scrollH ? -1 : 0) * scrollWidth,  this._rect.height + (this._scrollV ? -1 : 0) * scrollWidth);
        this._resizeChildViews(oldRect);

        var max, scroll, dx = 0, dy = 0;
        if (this._scrollableV) {
            this._maxY = max = this.contentsHeight();
            scroll = max > this._rect.height;
            if (scroll != this._scrollV) dx = (scroll ? -1 : 1) * scrollWidth;
            this._scrollV = scroll;
        }
        if (this._scrollableH) {
            this._maxX = max = this.contentsWidth();
            scroll = max > this._rect.width;
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
        this._clientRect = 
            requirePaneResize ? 
            new Rect(0, 0, this._scrollH ? this._maxX : this._innerRect.width, this._scrollV ? this._maxY : this._innerRect.height) : 
            this._innerRect;
        this.trigger('resize', {oldRect: oldRect, newRect: this._rect, source: this});
        
        // this._calcMaxRect();
    };
    
    proto.resizeToContents = function() {
        initScrollWidth();
        this._updateInnerRect();
        return this;
    };
    
    proto.rectForChild = function() {
        return this._clientRect;
    };
    
    proto.clientRect = function() {
        return this._clientRect;
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
        
        if (requirePaneResize) {
            var clientRect = this.clientRect();
            this._pane.style.height = clientRect.height + 'px';
            this._pane.style.width = clientRect.width + 'px';
        } 
        Base._layoutDom.call(this, rect);
        this._layoutChildViews(rect);
        var _this = this;
    };
    
    // if (useOuterRect && uki.supportNativeLayout) this._pane.style.bottom = this._scrollH ? scrollWidth + 'px' : 0;
});