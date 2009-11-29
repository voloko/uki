include('../view.js');
include('../geometry.js');
include('../layout.js');
include('../utils.js');
include('../builder.js');
include('../dom.js');
include('../dom/observable.js');

(function() {

var ANCHOR_TOP      = 1,
    ANCHOR_RIGHT    = 2,
    ANCHOR_BOTTOM   = 4,
    ANCHOR_LEFT     = 8,

    AUTOSIZE_WIDTH  = 1,
    AUTOSIZE_HEIGHT = 2;
    
var layout = uki.layout,
    dom = uki.dom,
    utils = uki.utils;

uki.view.Base = uki.newClass(uki.dom.Observable, new function() {
    var proto = this;
    
    proto.defaultCss = 'position:absolute;top:0;left:0;z-index:100;font-family:Arial,Helvetica,sans-serif;overflow:hidden;';
    
    proto.init = function(rect) {
        this._anchors = 0;
        this._autosize = 0;
        this._parent = null;
        this._rect = null;
        this._children = [];
        this._visible = true;
        this._needsLayout = false;
        this._inited = false;
        
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
    
    /**
     * Tell Observable which events should be bound to view itself and not to it's underlying dom node
     */
    proto.knownEvents = function() {
        return ['resize', 'layout'];
    };
    
    
    /* ----------------------------- Container api ------------------------------*/
    /**
     * Sets or retrievs view child view.
     * @param anything uki.build can parse
     *
     * Note: if setting on view with child views, all child view will be removed
     */
    proto.children = function(val) {
        if (arguments.length == 0) return this._children;
        uki.each(this._children, function(i, child) {
            this.removeChild(child);
        }, this);
        uki.build(val, this);
    };
    
    /**
     * Sets or retrieves parent view
     */
    proto.parent = function(parent) {
        if (arguments.length == 0) return this._parent;
        
        if (this._inited) this._dom.parentNode.removeChild(this._dom);
        this._parent = parent;
    };
    
    /**
     * Remove particular child
     * Also removes from _dom if available
     */
    proto.removeChild = function(child) {
        this._children = uki.grep(this._children, function(elem) { return elem == child });
        child.parent(null);
    };
    
    /**
     * Adds a child
     */
    proto.addChild = function(child) {
        child.parent(this);
        this._children.push(child);
    };
    
    /**
     * Should return a dom node for a child.
     * Child should append itself to this dom node
     */
    proto.domForChild = function(child) {
        return this._dom;
    };
    
    
    /* -------------------------------- Dom -------------------------------------*/
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
        this._parent.domForChild(this).appendChild(this._dom);
        this._domLayout();
    };
    
    /**
     * Called through a second layout pass when _dom is allready created
     */
    proto._domLayout = function() {
        var rect = this._rect;
        dom.layout(this._dom.style, {
            left: rect.x, 
            top: rect.y, 
            width: rect.width, 
            height: rect.height
        });
    };
    
    
    /* ---------------------------- Layout 1-st pass ----------------------------*/
    /**
     * Sets or retrieves rect relative to parents view.
     * Rect defines the area this view should render in.
     */
    proto.rect = function(rect) {
        if (arguments.length == 0) return this._rect;
        
        if (typeof rect === 'string') rect = uki.geometry.Rect.fromString(
            rect, 
            (this._parent ? this._parent.rect() : undefined)
        );
        
        if (this._rect && rect.eq(this._rect)) return;
        
        if (this._rect) {
            this._resizeChildren(rect);
        } else {
            this._initWithRect(rect);
        }
        
        uki.layout.schedule(this);
        this._needsLayout = true;
    };
    
    /**
     * Sets or gets visible rect of this view.
     * Should also determine children visible rects
     */
    proto.visibleRect = function(rect) {
        if (arguments.length == 0) return this._visibleRect;
        
        this._visibleRect = rect;
        for (var i=0; i < this._children.length; i++) {
            this._children[i]
        };
    };
    
    /**
     * Sets or gets whenever the view is visible
     */
    proto.visible = function(state) {
        if (arguments.length == 0) return this._visible;
        
        this._visible = state;
    };
    
    /**
     * Utility method to set rect through coords
     */
    proto.coords = function(coords) {
        if (arguments.length == 0) return this.rect().toCoordsString();
        
        this.rect(uki.geometry.Rect.fromCoordsString(
            coords, 
            (this._parent ? this._parent.rect() : undefined)
        ));
    };
    
    /**
     * Called when rect is set for the first time
     */
    proto._initWithRect = function(rect) {
        this._rect = rect;
    };
    
    /**
     * Called to notify all intersted parties: children and observers
     */
    proto._resizeChildren = function(rect) {
        
        var oldRect = this._rect.clone();
        this._rect = rect;
        
        if (this._children.length) {
            for (var i=0; i < this._children.length; i++) {
                this._children[i].resizeWithOldSize(oldRect, rect);
            };
        }
        this.trigger('resize', {oldRect: oldRect, newRect: rect, source: this});
        
    };
    
    /* ---------------------------- Layout 2-nd pass ----------------------------*/
    /**
     * Called on second layot pass when view becomes visible/changes it's size
     */
    proto.layout = function() {
        if (!this._inited) {
            this._inited = true;
            this._domCreate();
            this._parent.domForChild(this).appendChild(this._dom);
        }
        this._domLayout();
        this.trigger('layout', {rect: this._rect, source: this});
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
        if (arguments.length == 0) {
            var result = [];
            if (this._anchors & ANCHOR_LEFT  ) result.push('left');
            if (this._anchors & ANCHOR_TOP   ) result.push('top');
            if (this._anchors & ANCHOR_RIGHT ) result.push('right');
            if (this._anchors & ANCHOR_BOTTOM) result.push('bottom');
            return result.join(' ');
        } else {
            this._anchors = 0;
            if (anchors.indexOf('top'    ) > -1) this._anchors = this._anchors | ANCHOR_TOP;
            if (anchors.indexOf('right'  ) > -1) this._anchors = this._anchors | ANCHOR_RIGHT;
            if (anchors.indexOf('bottom' ) > -1) this._anchors = this._anchors | ANCHOR_BOTTOM;
            if (anchors.indexOf('left'   ) > -1) this._anchors = this._anchors | ANCHOR_LEFT;
        }
    };
    
    /**
     * Set or get directions view should grow/shrink on resize
     * May be any combination of "width" and "height"
     *
     * @param String autosize
     */
    proto.autosize = function(autosize) {
        if (arguments.length == 0) {
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
    
});
})();