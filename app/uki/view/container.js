include('base.js');

uki.view.Container = uki.newClass(uki.view.Base, new function() {
    var Base = uki.view.Base.prototype,
        proto = this,
        Rect = uki.geometry.Rect;
        
        
    proto.init = function() {
        this._childViews = [];
        Base.init.call(this);
    };
    
    proto.typeName = function() {
        return 'uki.view.Container';
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
    };
    
    /**
     * Remove particular child
     * Also removes from _dom if available
     */
    proto.removeChild = function(child) {
        this._childViews = uki.grep(this._childViews, function(elem) { return elem == child; });
        child.parent(null);
    };
    
    /**
     * Adds a child
     */
    proto.appendChild = function(child) {
        child.parent(this);
        this._childViews.push(child);
    };
    
    /**
     * Should return a dom node for a child.
     * Child should append itself to this dom node
     */
    proto.domForChild = function(child) {
        return this._dom;
    };
    
    
    
    proto._domLayout = function(rect, relativeRect) {
        Base._domLayout.call(this, rect, relativeRect);
        this._layoutChildViews(rect, relativeRect);
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
        
        var oldRect = this._rect;
        if (!this._resizeSelf(newRect)) return;
        this._needsLayout = true;
        
        if (oldRect) {
            if (oldRect.width != newRect.width || oldRect.height != newRect.height) this._resizeChildViews(oldRect);
            this.trigger('resize', {oldRect: oldRect, newRect: this._rect, source: this});
        }
    };

    proto._resizeSelf = function(newRect) {
        if (this._rect && newRect.eq(this._rect)) return false;
        this._rect = newRect;
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
    
    
    
});