include('../view.js');
include('../geometry.js');
include('../utils.js');
include('../builder.js');
include('../dom.js');
include('observable.js');

uki.view.Base = uki.newClass(uki.view.Observable, new function() {
    var ANCHOR_TOP      = 1,
        ANCHOR_RIGHT    = 2,
        ANCHOR_BOTTOM   = 4,
        ANCHOR_LEFT     = 8,
        ANCHOR_ALL      = 15,

        AUTOSIZE_WIDTH  = 1,
        AUTOSIZE_HEIGHT = 2;

    var Rect = uki.geometry.Rect,
        layoutId = 1;

    var proto = this;
    
    proto.defaultCss = 'position:absolute;z-index:100;'
                     + 'font-family:Arial,Helvetica,sans-serif;overflow:hidden;';
    
    proto.init = function() {
        this._anchors = 0;
        this._autosize = 0;
        this._resizeToContents = 0;
        this._parent = null;
        this._rect = null;
        this._visible = true;
        this._needsLayout = false;
        this._selectable = false;
        this._styleH = 'left';
        this._styleV = 'top';
    };
    
    proto.resizeToContents = uki.newProperty('_resizeToContents');
    
    proto.childResized = function( child, oldRect, newRect ) {
        // do nothing
        // console.log(['resized', oldRect, newRect]);
    };
    
    proto.triggerResized = function() {
        if (!this._dom) return; // not ready yet
        if (this._resizeToContents = 0) return; // nowhere to resize
        
        var newSize = this.contentsSize(),
            oldRect = this.rect();
        if (newSize.eq(oldRect)) return; // nothing changed
        
        // calculate where to resize
        var newRect = new Rect(oldRect.x, oldRect.y, newSize.width, newSize.height),
            dX = (newSize.width - oldRect.width) /
                ((this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT ? 1 : 0) +    // flexible left
                (this._anchors & ANCHOR_RIGHT ^ ANCHOR_RIGHT ? 1 : 0)),   // flexible right
            dY = (newSize.height - oldSize.height) /
                ((this._anchors & ANCHOR_TOP ^ ANCHOR_TOP ? 1 : 0) +      // flexible top
                (this._anchors & ANCHOR_BOTTOM ^ ANCHOR_BOTTOM ? 1 : 0)); // flexible right
    
        if (this._resizeToContents && AUTOSIZE_WIDTH) {
            if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT) newRect.x -= dX;
            if (this._anchors & ANCHOR_RIGHT ^ ANCHOR_RIGHT) newRect.width += dX;
        }
    
        if (this._resizeToContents && AUTOSIZE_HEIGHT) {
            if (this._anchors & ANCHOR_TOP ^ ANCHOR_TOP) newRect.y -= dY;
            if (this._anchors & ANCHOR_BOTTOM ^ ANCHOR_BOTTOM) newRect.height += dY;
        }
        
        this.rect(newRect); // resize self
        this.parent().childResized(this, this.rect(), newRect); // notify parent
    };
    
    proto.contentsSize = function() {
        return this.rect();
    };
    
    proto.id = function(id) {
        if (id === undefined) return this._id;
        if (this._id) uki.unregisterId(this);
        this._id = id;
        uki.registerId(this);
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
        bg = uki.background(bg);
        if (this._dom) {
            if (this._background) this._background.detach(this);
            bg.attachTo(this);
        }
        this._background = bg;
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
    
    proto.className = function(name) {
        if (name === undefined) return this._className;
        
        this._className = name;
        if (this._dom) this._dom.className = name;
    };
    
    
    
    /* ----------------------------- Container api ------------------------------*/
    
    /**
     * Sets or retrieves parent view
     */
    proto.parent = function(parent) {
        if (parent === undefined) return this._parent;
        
        if (this._dom) this._dom.parentNode.removeChild(this._dom);
        this._parent = parent;
    };
    
    /* ------------------------- Layot 2-nd pass + Dom --------------------------*/
    /**
     * Get views container dom node.
     */
    proto.dom = function() {
        return this._dom;
    };
    
    proto.childViews = function() {
        return [];
    };
    
    /**
     * Called on second layot pass when view becomes visible/changes it's size
     */
    proto.layout = function() {
        if (!this._dom) {
            this._domCreate(this._rect);
            this._parent.domForChild(this).appendChild(this._dom);
            this._bindPendingEventsToDom();
        }
        this._domLayout(this._rect);
        this._needsLayout = false;
        this.trigger('layout', {rect: this._rect, source: this});
    };
    
    /**
     * Called through a second layout pass when _dom should be created
     */
    proto._domCreate = function() {
        this._dom = uki.createElement('div', this.defaultCss);
        this.selectable(this.selectable());
        this.className(this.className())
        if (this._background) this._background.attachTo(this);
    };
    
    /**
     * Called through a second layout pass when _dom is allready created
     */
    proto._domLayout = function(rect) {
        var l = {}, s = uki.supportNativeLayout, relativeRect = this.parent().clientRect();
        if (s && this._anchors & ANCHOR_LEFT && this._anchors & ANCHOR_RIGHT && this._autosize & AUTOSIZE_WIDTH) {
            l.left = rect.x;
            l.right = relativeRect.width - rect.x - rect.width;
        } else {
            l.width = rect.width;
            l[this._styleH] = this._styleH == 'left' ? rect.x : relativeRect.width - rect.x - rect.width;
        }
        
        if (s && this._anchors & ANCHOR_TOP && this._anchors & ANCHOR_BOTTOM && this._autosize & AUTOSIZE_HEIGHT) {
            l.top = rect.y;
            l.bottom = relativeRect.height - rect.y - rect.height;
        } else {
            l.height = rect.height;
            l[this._styleV] = this._styleV == 'top'  ? rect.y : relativeRect.height - rect.y - rect.height;
        }
        this._lastLayout = uki.dom.layout(this._dom.style, l, this._lastLayout);
        return true;
    };
    
    /* ---------------------------- Layout 1-st pass ----------------------------*/
    /**
     * Sets or retrieves rect relative to parents view.
     * Rect defines the area this view should render in.
     */
    proto.rect = function(newRect) {
        if (newRect === undefined) return this._rect;
        
        newRect = Rect.create(newRect);
        if (this._rect && newRect.eq(this._rect)) return false;
        this._rect = newRect;
        this._needsLayout = this._needsLayout || layoutId++;
    };
    
    proto.clientRect = function(rect) {
        return this.rect(rect);
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
        
        this.rect(Rect.fromCoordsString(coords));
    };
    
    /* -------------------------------- Autolayout ------------------------------*/
    /**
     * Resizes view when parent changes size acording to anchors and autosize
     */
    proto.parentResized = function(oldSize, newSize) {
        var newRect = this._rect.clone(),
            dX = (newSize.width - oldSize.width) /
                ((this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT ? 1 : 0) +   // flexible left
                (this._autosize & AUTOSIZE_WIDTH ? 1 : 0) +             
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
        if ('resize layout'.indexOf(name) > -1) return true;
        return uki.view.Observable._bindToDom.call(this, name);
    }
    
});