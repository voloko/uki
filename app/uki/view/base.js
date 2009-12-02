include('../view.js');
include('../geometry.js');
include('../utils.js');
include('../builder.js');
include('../dom.js');
include('observable.js');

(function() {

var ANCHOR_TOP      = 1,
    ANCHOR_RIGHT    = 2,
    ANCHOR_BOTTOM   = 4,
    ANCHOR_LEFT     = 8,

    AUTOSIZE_WIDTH  = 1,
    AUTOSIZE_HEIGHT = 2;
    
var dom = uki.dom,
    utils = uki.utils,
    Rect = uki.geometry.Rect;

uki.view.Base = uki.newClass(uki.view.Observable, new function() {
    var proto = this;
    
    proto.defaultCss = 'position:absolute;z-index:100;'
                     + 'font-family:Arial,Helvetica,sans-serif;overflow:hidden;';
    
    proto.init = function(rect) {
        this._anchors = 0;
        this._autosize = 0;
        this._parent = null;
        this._rect = null;
        this._childViews = [];
        this._visible = true;
        this._needsLayout = false;
        this._selectable = false;
        this._styleH = 'left';
        this._styleV = 'top';
        
        if (rect) this.rect(rect);
    };
    
    /* ----------------------------- Description --------------------------------*/
    /**
     * Full type name of a view. 
     * Used in selection api and to check wherever certain object is a view
     */
    proto.typeName = function() {
        return 'uki.view.Base';
    };
    
    /* ------------------------------- Settings --------------------------------*/
    proto.background = function(bg) {
        if (bg === undefined) return this._background;
        
        if (this._background) this._background.detach(this);
        this._background = bg;
        this._background.attachTo(this);
    };
    
    proto.selectable = function(state) {
        if (state === undefined) {
            return this._selectable;
        } else {
            this._selectable = state;
            if (this._dom) {
                this._dom.style.userSelect = state ? 'text' : 'none';
                this._dom.style.MozUserSelect = state ? 'text' : '-moz-none';
                this._dom.style.WebkitUserSelect = state ? 'text' : 'none';
                this._dom.style.cursor = state ? 'text' : 'default';
                this._dom.unselectable = state ? '' : 'on';
            }
        }
    };
    
    
    
    /* ----------------------------- Container api ------------------------------*/
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
     * Sets or retrieves parent view
     */
    proto.parent = function(parent) {
        if (parent === undefined) return this._parent;
        
        if (this._dom) this._dom.parentNode.removeChild(this._dom);
        this._parent = parent;
    };
    
    /**
     * Remove particular child
     * Also removes from _dom if available
     */
    proto.removeChild = function(child) {
        this._childViews = uki.grep(this._childViews, function(elem) { return elem == child });
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
    
    
    /* ------------------------- Layot 2-nd pass + Dom --------------------------*/
    /**
     * Get views container dom node.
     */
    proto.dom = function() {
        return this._dom;
    };
    
    /**
     * Called through a second layout pass when _dom should be created
     */
    proto._domCreate = function() {
        this._dom = uki.createElement('div', this.defaultCss);
    };
    
    /**
     * Called through a second layout pass when _dom is allready created
     */
    proto._domLayout = function(rect) {
        var l = {
            width: rect.width, 
            height: rect.height
        };
        l[this._styleH] = this._styleRect.x;
        l[this._styleV] = this._styleRect.y;
        dom.layout(this._dom.style, l);
    };
    
    /**
     * Called on second layot pass when view becomes visible/changes it's size
     */
    proto.layout = function() {
        if (!this._dom) {
            this._domCreate();
            this._parent.domForChild(this).appendChild(this._dom);
            this._bindPendingEventsToDom();
        }
        this._domLayout(this._rect);
        this._needsLayout = false;
        this._layoutChildViews();
        this.trigger('layout', {rect: this._rect, source: this});
    };
    
    proto._layoutChildViews = function() {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            if (childViews[i]._needsLayout && childViews[i].visible()) {
                childViews[i].layout();
            }
        };
    };
    
    
    /* ---------------------------- Layout 1-st pass ----------------------------*/
    /**
     * Sets or retrieves rect relative to parents view.
     * Rect defines the area this view should render in.
     */
    proto.rect = function(rect) {
        if (rect === undefined) return this._rect;
        rect = Rect.create(rect);
        
        var oldRect = this._rect;
        if (!this._updateRect(rect)) return;
        this._needsLayout = true;
        
        if (oldRect) {
            this._resizeChildViews(oldRect);
            this.trigger('resize', {oldRect: oldRect, newRect: this._rect, source: this});
        }
    };
    
    /**
     * Called when rect is set for the first time
     */
    proto._updateRect = function(rect) {
        if (this._styleRect && this._rect && rect.eq(this._rect)) return false;
        this._rect = rect;
        if (this._parent) {
            var styleRect = new Rect(
                this._styleH == 'left' ? rect.x : this.parent().rect().width - rect.x - rect.width,
                this._styleV == 'top'  ? rect.y : this.parent().rect().height - rect.y - rect.height,
                rect.width, rect.height
            );
            if (styleRect.eq(this._styleRect)) return false;
            this._styleRect = styleRect;
        }
        return true;
    };
    
    /**
     * Called to notify all intersted parties: childViews and observers
     */
    proto._resizeChildViews = function(oldRect) {
        for (var i=0, childViews = this.childViews(); i < childViews.length; i++) {
            childViews[i].resizeWithOldSize(oldRect, this._rect);
        };
    };
    
    /**
     * Sets or gets whenever the view is visible
     */
    proto.visible = function(state) {
        if (state === undefined) return this._visible;
        
        this._visible = state;
    };
    
    /**
     * Utility method to set rect through coords
     */
    proto.coords = function(coords) {
        if (coords === undefined) return this.rect().toCoordsString();
        
        this.rect(uki.geometry.Rect.fromCoordsString(
            coords, 
            (this._parent ? this._parent.rect() : undefined)
        ));
    };
    
    /* -------------------------------- Autolayout ------------------------------*/
    /**
     * Resizes view when parent changes size acording to anchors and autosize
     */
    proto.resizeWithOldSize = function(oldSize, newSize) {
        var newRect = this._rect.clone(),
            dX = (newSize.width - oldSize.width) /
                ((this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT ? 1 : 0) +   // flexible left
                (this._autosize & AUTOSIZE_WIDTH? 1 : 0) +             
                (this._anchors & ANCHOR_RIGHT ^ ANCHOR_RIGHT ? 1 : 0)),   // flexible right
            dY = (newSize.height - oldSize.height) /
                ((this._anchors & ANCHOR_TOP ^ ANCHOR_TOP ? 1 : 0) +      // flexible top
                (this._autosize & AUTOSIZE_HEIGHT ? 1 : 0) + 
                (this._anchors & ANCHOR_BOTTOM ^ ANCHOR_BOTTOM ? 1 : 0)); // flexible right

        if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT) newRect.x += dX;
        if (this._autosize & AUTOSIZE_WIDTH) newRect.width += dX;

        if (this._anchors & ANCHOR_TOP ^ ANCHOR_TOP) newRect.y += dY;
        if (this._autosize & AUTOSIZE_HEIGHT) newRect.height += dY;
        
        this.rect(newRect);
    };
    
    /**
     * Set or get sides which the view should be attached to.
     * When a view is attached to a side the distance between this side a view border
     * will remain constant on resize. Anchor can be any combination of
     * "top", "right" , "bottom" and "left". 
     *
     * If you set both "right" and "left" also remember to set autosize("width")
     * 
     * @param String anchors
     * @example ""
     */
    proto.anchors = function(anchors) {
        if (anchors === undefined) {
            var result = [];
            if (this._anchors & ANCHOR_LEFT  ) result.push('left');
            if (this._anchors & ANCHOR_TOP   ) result.push('top');
            if (this._anchors & ANCHOR_RIGHT ) result.push('right');
            if (this._anchors & ANCHOR_BOTTOM) result.push('bottom');
            return result.join(' ');
        } else {
            this._anchors = 0;
            this._styleH = 'left';
            this._styleV = 'top';
            if (anchors.indexOf('right'  ) > -1) {this._anchors = this._anchors | ANCHOR_RIGHT;  this._styleH = 'right';  }
            if (anchors.indexOf('bottom' ) > -1) {this._anchors = this._anchors | ANCHOR_BOTTOM; this._styleV = 'bottom'; }
            if (anchors.indexOf('top'    ) > -1) {this._anchors = this._anchors | ANCHOR_TOP;    this._styleV = 'top';    }
            if (anchors.indexOf('left'   ) > -1) {this._anchors = this._anchors | ANCHOR_LEFT;   this._styleH = 'left';   }
        }
    };
    
    /**
     * Set or get directions view should grow/shrink on resize
     * May be any combination of "width" and "height"
     *
     * @param String autosize
     */
    proto.autosize = function(autosize) {
        if (autosize === undefined) {
            if (this._autosize | AUTOSIZE_WIDTH && this._autosize | AUTOSIZE_HEIGHT) return 'width height';
            if (this._autosize | AUTOSIZE_WIDTH) return 'width';
            if (this._autosize | AUTOSIZE_HEIGHT) return 'height';
            return '';
        } else {
            this._autosize = 0;
            if (autosize.indexOf('width' ) > -1) this._autosize = this._autosize | AUTOSIZE_WIDTH;
            if (autosize.indexOf('height') > -1) this._autosize = this._autosize | AUTOSIZE_HEIGHT;
        }
    };
    
    uki.each(['width', 'height', 'minX', 'maxX', 'minY', 'maxY', 'left', 'top'], function(index, attr) {
        proto[attr] = function() {
            var rect = this.rect();
            return rect[attr].apply(rect, arguments);
        };
    });
    
    /* ---------------------------------- Events --------------------------------*/
    proto._bindToDom = function(name) {
        if (' resize layout'.indexOf(name) > -1) return;
        uki.view.Observable._bindToDom.call(this, name);
    }
    
});
})();