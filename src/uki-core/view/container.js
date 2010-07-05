include('base.js');

/**
 * @class
 * @augments uki.view.Base
 * @name uki.view.Container
 */
uki.view.declare('uki.view.Container', uki.view.Base, function(Base) {
    /**#@+ @memberOf uki.view.Container# */
    
    this._inset = new Inset();
    
    /** @private */
    this._setup = function() {
        this._childViews = [];
        Base._setup.call(this);
    };
    
    /** @ignore */
    function maxProp (c, prop) {
        var val = 0, i, l;
        for (i = c._childViews.length - 1; i >= 0; i--){
            if (!c._childViews[i].visible()) continue;
            val = MAX(val, c._childViews[i].rect()[prop]());
        };
        return val;
    }
    
    this.contentsWidth = function() {
        return maxProp(this, 'maxX') + this.inset().right;
    };
    
    this.contentsHeight = function() {
        return maxProp(this, 'maxY') + this.inset().bottom;
    };
    
    this.contentsSize = function() {
        return new Size(this.contentsWidth(), this.contentsHeight());
    };
    
    /**
     * Sets or retrieves view child view.
     * @param anything uki.build can parse
     *
     * Note: if setting on view with child views, all child view will be removed
     */
    this.childViews = function(val) {
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
    this.removeChild = function(child) {
        child.parent(null);
        this.domForChild(child).removeChild(child.dom());
        var index = child._viewIndex,
            i, l;
        for (i=index+1, l = this._childViews.length; i < l; i++) {
            this._childViews[i]._viewIndex--;
        };
        this._childViews = uki.grep(this._childViews, function(elem) { return elem != child; });
        this._contentChanged();
    };
    
    /**
     * Adds a child.
     */
    this.appendChild = function(child) {
        child._viewIndex = this._childViews.length;
        this._childViews.push(child);
        child.parent(this);
        this.domForChild(child).appendChild(child.dom());
        this._contentChanged();
    };
    
    /**
     * Insert child before target beforeChild
     * @param {uki.view.Base} child Child to insert
     * @param {uki.view.Base} beforeChild Existent child before which we should insert
     */
    this.insertBefore = function(child, beforeChild) {
        var i, l;
        child._viewIndex = beforeChild._viewIndex;
        for (i=beforeChild._viewIndex, l = this._childViews.length; i < l; i++) {
            this._childViews[i]._viewIndex++;
        };
        this._childViews.splice(beforeChild._viewIndex-1, 0, child);
        child.parent(this);
        this.domForChild(child).insertBefore(child.dom(), beforeChild.dom());
        this._contentChanged();
    };
    
    /**
     * Should return a dom node for a child.
     * Child should append itself to this dom node
     */
    this.domForChild = function(child) {
        return this._dom;
    };
    
    this.inset = uki.newProp('_inset', function(v) {
        this._inset = Inset.create(v);
    });
    
    /** @private */
    this._contentChanged = function() {
        // called on every insertBefore, appendChild, removeChild
    };
    
    this._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        this._layoutChildViews(rect);
    };

    /** @private */
    this._layoutChildViews = function() {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            childViews[i].layoutIfNeeded();
        };
    };
    
    /**
     * @fires event:resize
     */
    this.rect = function(newRect) {
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
    
    /** @private */
    this._resizeSelf = function(newRect) {
        // if (newRect.eq(this._rect)) return false;
        this._rect = this._normalizeRect(newRect);
        return true;
    };
    
    /**
     * Called to notify all interested parties: childViews and observers
     * @private
     */
    this._resizeChildViews = function(oldRect) {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            childViews[i].parentResized(oldRect, this._rect);
        };
    };
    
   /**#@-*/ 
});