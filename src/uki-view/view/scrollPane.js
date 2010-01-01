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
        widthIncludesScrollBar;
        
    function initScrollWidth () {
        if (!scrollWidth) {
            uki.dom.probe(
                uki.createElement(
                    'div', 
                    'position:absolute;left:-99em;width:100px;height:100px;overflow:scroll;',
                    '<div style="position:absolute;left:0;width:100%;"></div>'
                ),
                function( probe ) {
                    scrollWidth = probe.offsetWidth - probe.clientWidth;
                    widthIncludesScrollBar = probe.firstChild.offsetWidth == 100;
                }
            );
        }
    }
    
    proto.typeName = function() {
        return 'uki.view.ScrollPane';
    };
    
    proto._setup = function() {
        Base._setup.call(this);

        uki.extend(this, {
            _clientRect: this.rect().clone(), // rect with scroll bars excluded
            _rectForChild: this.rect().clone(),
            _clientRectValid: false,
            _scrollableV: true,
            _scrollableH: false,
            _scrollV: false,
            _scrollH: false
        });
    };
    
    uki.addProps(proto, ['scrollableV', 'scrollableH']);
    
    this.rectForChild = function() { return this._rectForChild };
    this.clientRect = function() { return this._clientRect };
    
    this.scroll = function(dx, dy) {
        if (dx) this.scrollTop(this.scrollLeft() + dy);
        if (dy) this.scrollTop(this.scrollTop() + dy);
    };
    
    uki.each(['appendChild', 'removeChild', 'childViews'], function(i, name) {
        proto[name] = function(arg) {
            this._clientRectValid = false;
            return Base[name].call(this, arg);
        };
    });
    
    uki.delegateProp(proto, 'scrollTop', '_dom');
    uki.delegateProp(proto, 'scrollLeft', '_dom');
    
    proto.visibleRect = function() {
        var tmpRect = this._clientRect.clone();
        tmpRect.x = this.rect().x + this.scrollLeft();
        tmpRect.y = this.rect().y + this.scrollTop();
        return tmpRect;
    };
    
    proto.rect = function(newRect) {
        if (newRect === undefined) return this._rect;
        
        newRect = Rect.create(newRect);
        var oldRect = this._rect;
        this._parentRect = newRect;
        if (!this._resizeSelf(newRect)) return this;
        this._clientRectValid = false;
        this._updateClientRects();
        this._needsLayout = true;
        this.trigger('resize', {oldRect: oldRect, newRect: this._rect, source: this});
        return this;
    };
    
    proto._recalcClientRects = function() {
        initScrollWidth();
        this._clientRectValid = true;

        var cw = this.contentsWidth(),
            ch = this.contentsHeight(),
            sh = this._scrollableH ? cw > this._rect.width : false,
            sv = this._scrollableV ? ch > this._rect.height : false;
            
        this._scrollH = sh;
        this._scrollV = sv;
        this._clientRect = new Rect( this._rect.width +  (sv ? -1 : 0) * scrollWidth,
                                     this._rect.height + (sh ? -1 : 0) * scrollWidth );
        this._rectForChild = new Rect( this._rect.width +  (sv && !widthIncludesScrollBar ? -1 : 0) * scrollWidth,
                                       this._rect.height + (sh && !widthIncludesScrollBar ? -1 : 0) * scrollWidth );
    };
    
    proto._updateClientRects = function() {
        if (this._clientRectValid) return;

        var oldClientRect = this._clientRect;
        this._recalcClientRects();

        if (oldClientRect.width != this._clientRect.width || oldClientRect.height != this._clientRect.height) {
            this._resizeChildViews(oldClientRect);
        }
    };
    
    proto._resizeChildViews = function(oldClientRect) {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            childViews[i].parentResized(oldClientRect, this._clientRect);
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
        this._updateClientRects();
        
        if (this._layoutScrollH !== this._scrollH) {
            this._dom.style.overflowX = this._scrollH ? 'scroll' : 'hidden';
            this._layoutScrollH = this._scrollH;
        }

        if (this._layoutScrollV !== this._scrollV) {
            this._dom.style.overflowY = this._scrollV ? 'scroll' : 'hidden';
            this._layoutScrollV = this._scrollV;
        }
        
        Base._layoutDom.call(this, rect);
    };
});