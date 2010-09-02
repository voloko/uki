(function() {
    var scrollWidth, widthIncludesScrollBar;
    
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
        return scrollWidth;
    }
        
    /**
    * Scroll pane. 
    * Pane with scrollbars with content overflowing the borders.
    * Works consistently across all supported browsers.
    *
    * @author voloko
    * @name uki.view.ScrollPane
    * @class
    * @extends uki.view.Container
    */
    uki.view.declare('uki.view.ScrollPane', uki.view.Container, function(Base) {
        uki.extend(this, {
            _scrollableY: true,
            _scrollableX: false,
            _scrollY: false,
            _scrollX: false,
            _sbY: false,
            _sbX: false
        });
        
        this._setup = function() {
            Base._setup.call(this);

            this._clientRect = this.rect().clone();
            this._rectForChild = this.rect().clone();
        };
    
        /**
        * @function
        * @name uki.view.ScrollPane#scrollableY
        */
        /**
        * @function
        * @name uki.view.ScrollPane#scrollableX
        */
        /**
        * @function
        * @name uki.view.ScrollPane#scrollX
        */
        /**
        * @function
        * @name uki.view.ScrollPane#scrollY
        */
        uki.addProps(this, ['scrollableY', 'scrollableX', 'scrollX', 'scrollY']);
        this.scrollV = this.scrollY;
        this.scrollH = this.scrollX;
        
        this.scrollableV = this.scrollableY;
        this.scrollableH = this.scrollableX;
    
        this.rectForChild = function() { return this._rectForChild; };
        this.clientRect = function() { return this._clientRect; };
    
        /**
        * @function
        * @param {Number} dx
        * @param {Number} dy
        * @name uki.view.ScrollPane#scroll
        */
        this.scroll = function(dx, dy) {
            if (dx) this.scrollLeft(this.scrollLeft() + dx);
            if (dy) this.scrollTop(this.scrollTop() + dy);
        };
    
        /**
        * @function
        * @name uki.view.ScrollPane#scrollTop
        */
        /**
        * @function
        * @name uki.view.ScrollPane#scrollLeft
        */
        uki.each(['scrollTop', 'scrollLeft'], function(i, name) {
            this[name] = function(v) {
                if (v == undefined) return this._dom[name];
                this._dom[name] = v;
                this.trigger('scroll', { source: this });
                return this;
            };
        }, this);
    
        /**
        * @function
        * @return {uki.geometry.Rect}
        * @name uki.view.ScrollPane#visibleRect
        */
        this.visibleRect = function() {
            var tmpRect = this._clientRect.clone();
            tmpRect.x = this.rect().x + this.scrollLeft();
            tmpRect.y = this.rect().y + this.scrollTop();
            return tmpRect;
        };
    
        this.rect = function(newRect) {
            if (newRect === undefined) return this._rect;
        
            newRect = Rect.create(newRect);
            var oldRect = this._rect;
            this._parentRect = newRect;
            if (!this._resizeSelf(newRect)) return this;
            this._updateClientRects();
            this._needsLayout = true;
            this.trigger('resize', {oldRect: oldRect, newRect: this._rect, source: this});
            return this;
        };
        
        this._createDom = function() {
            Base._createDom.call(this);
            if (ua.indexOf('Gecko/') > -1) this._dom.tabIndex = '-1';
        };
    
        this._recalcClientRects = function() {
            initScrollWidth();

            var cw = this.contentsWidth(),
                ch = this.contentsHeight(),
                sx = this._scrollableX ? cw > this._rect.width : false,
                sy = this._scrollableY ? ch > this._rect.height : false;
            
            this._sbX = sx || this._scrollX;
            this._sbY = sy || this._scrollY;
            this._clientRect = new Rect( this._rect.width +  (sy ? -1 : 0) * scrollWidth,
                                         this._rect.height + (sx ? -1 : 0) * scrollWidth );
            this._rectForChild = new Rect( this._rect.width +  ((sy && !widthIncludesScrollBar) ? -1 : 0) * scrollWidth,
                                           this._rect.height + ((sx && !widthIncludesScrollBar) ? -1 : 0) * scrollWidth );
        };
    
        this._updateClientRects = function() {
            var oldClientRect = this._clientRect;
            this._recalcClientRects();

            if (oldClientRect.width != this._clientRect.width || oldClientRect.height != this._clientRect.height) {
                this._resizeChildViews(oldClientRect);
            }
        };
    
        this._resizeChildViews = function(oldClientRect) {
            for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
                childViews[i].parentResized(oldClientRect, this._clientRect);
            };
        };
    
        this._layoutChildViews = function() {
            for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
                if (childViews[i]._needsLayout && childViews[i].visible()) {
                    childViews[i].layout();
                }
            };
        };
        
        this._layoutDom = function(rect) {
            this._updateClientRects();
        
            if (this._layoutScrollX !== this._sbX) {
                this._dom.style.overflowX = this._sbX ? 'scroll' : 'hidden';
                this._layoutScrollX = this._sbX;
            }

            if (this._layoutScrollY !== this._sbY) {
                this._dom.style.overflowY = this._sbY ? 'scroll' : 'hidden';
                this._layoutScrollY = this._sbY;
            }
        
            Base._layoutDom.call(this, rect);
        };
        
        this.childResized = function() {
            this._needsLayout = true;
            uki.after(uki.proxy(this.layoutIfNeeded, this));
        };

        this._contentChanged = this.childResized;
        
    });

    uki.view.ScrollPane.initScrollWidth = initScrollWidth;
})();

uki.Collection.addAttrs(['scrollTop', 'scrollLeft']);
uki.fn.scroll = function(dx, dy) {
    this.each(function() {
        this.scroll(dx, dy);
    });
};