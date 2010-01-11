include('base.js');

uki.view.Container = uki.newClass(uki.view.Base, new function() {
    var Base = uki.view.Base[PROTOTYPE],
        /**
         * @class
         * @name uki.view.Container
         */
        proto = this;
        
    /** @exports proto as uki.view.Container# */
    
    /**#@+ @memberOf uki.view.Container# */
    
    proto._setup = function() {
        this._childViews = [];
        Base._setup.call(this);
    };
    
    proto.typeName = function() {
        return 'uki.view.Container';
    };
    
    function maxProp (c, prop) {
        var val = 0, i, l;
        for (i = c._childViews.length - 1; i >= 0; i--){
            val = MAX(val, c._childViews[i].rect()[prop]());
        };
        return val;
    }
    
    proto.contentsWidth = function() {
        return maxProp(this, 'maxX') - maxProp(this, 'minX');
    };
    
    proto.contentsHeight = function() {
        return maxProp(this, 'maxY') - maxProp(this, 'minY');
    };
    
    proto.contentsSize = function() {
        return new Size(this.contentsWidth(), this.contentsHeight());
    };
    
    /**
     * Sets or retrievs view child view.
     * @param anything uki.build can parse
     *
     * Note: if setting on view with child views, all child view will be removed
     */
    proto.childViews = function(val) {
        if (val === undefined) return this._childViews;
        uki.each(this._childViews, function(i, child) {
            this.removeChild(child);
        }, this);
        uki.each(uki.build(val), function(tmp, child) {
            this.appendChild(child);
        }, this);
        return this;
    };
    
    /**
     * Remove particular child
     */
    proto.removeChild = function(child) {
        child.parent(null);
        var index = child._viewIndex,
            i, l;
        for (i=index+1, l = this._childViews.length; i < l; i++) {
            this._childViews[i]._viewIndex--;
        };
        this._childViews = uki.grep(this._childViews, function(elem) { return elem != child; });
    };
    
    /**
     * Adds a child.
     */
    proto.appendChild = function(child) {
        child._viewIndex = this._childViews.length;
        this._childViews.push(child);
        child.parent(this);
    };
    
    /**
     * Should return a dom node for a child.
     * Child should append itself to this dom node
     */
    proto.domForChild = function(child) {
        return this._dom;
    };
    
    
    
    proto._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        this._layoutChildViews(rect);
    };

    proto._layoutChildViews = function() {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            if (childViews[i]._needsLayout && childViews[i].visible()) {
                childViews[i].layout(this._rect);
            }
        };
    };
    

    proto.rect = function(newRect) {
        if (newRect === undefined) return this._rect;

        newRect = Rect.create(newRect);
        this._parentRect = newRect;
        var oldRect = this._rect;
        if (!this._resizeSelf(newRect)) return this;
        this._needsLayout = true;
        
        if (oldRect.width != newRect.width || oldRect.height != newRect.height) this._resizeChildViews(oldRect);
        this.trigger('resize', {oldRect: oldRect, newRect: this._rect, source: this});
        return this;
    };
    
    proto._resizeSelf = function(newRect) {
        // if (newRect.eq(this._rect)) return false;
        this._rect = this._normalizeRect(newRect);
        return true;
    };
    
    /**
     * Called to notify all intersted parties: childViews and observers
     */
    proto._resizeChildViews = function(oldRect) {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            childViews[i].parentResized(oldRect, this._rect);
        };
    };
    
   /**#@-*/ 
});