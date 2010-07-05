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
        this.typeName = function() {
            return 'uki.view.ScrollPane';
        };
    
        this._setup = function() {
            Base._setup.call(this);

            uki.extend(this, {
                _clientRect: this.rect().clone(), // rect with scroll bars excluded
                _rectForChild: this.rect().clone(),
                _scrollableV: true,
                _scrollableH: false,
                _scrollV: false,
                _scrollH: false,
                _sbV: false,
                _sbH: false
            });
        };
    
        /**
        * @function
        * @name uki.view.ScrollPane#scrollableV
        */
        /**
        * @function
        * @name uki.view.ScrollPane#scrollableH
        */
        /**
        * @function
        * @name uki.view.ScrollPane#scrollH
        */
        /**
        * @function
        * @name uki.view.ScrollPane#scrollV
        */
        uki.addProps(this, ['scrollableV', 'scrollableH', 'scrollH', 'scrollV']);
    
        this.rectForChild = function() { return this._rectForChild; };
        this.clientRect = function() { return this._clientRect; };
    
        /**
        * @function
        * @param {Number} dx
        * @param {Number} dy
        * @name uki.view.ScrollPane#scroll
        */
        this.scroll = function(dx, dy) {
            if (dx) this.scrollTop(this.scrollLeft() + dy);
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
                sh = this._scrollableH ? cw > this._rect.width : false,
                sv = this._scrollableV ? ch > this._rect.height : false;
            
            this._sbH = sh || this._scrollH;
            this._sbV = sv || this._scrollV;
            this._clientRect = new Rect( this._rect.width +  (sv ? -1 : 0) * scrollWidth,
                                         this._rect.height + (sh ? -1 : 0) * scrollWidth );
            this._rectForChild = new Rect( this._rect.width +  ((sv && !widthIncludesScrollBar) ? -1 : 0) * scrollWidth,
                                           this._rect.height + ((sh && !widthIncludesScrollBar) ? -1 : 0) * scrollWidth );
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
        
            if (this._layoutScrollH !== this._sbH) {
                this._dom.style.overflowX = this._sbH ? 'scroll' : 'hidden';
                this._layoutScrollH = this._sbH;
            }

            if (this._layoutScrollV !== this._sbV) {
                this._dom.style.overflowY = this._sbV ? 'scroll' : 'hidden';
                this._layoutScrollV = this._sbV;
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
