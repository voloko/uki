include('../view.js');
include('../geometry.js');
include('../utils.js');
include('../builder.js');
include('../dom.js');
include('observable.js');

var ANCHOR_TOP      = 1,
    ANCHOR_RIGHT    = 2,
    ANCHOR_BOTTOM   = 4,
    ANCHOR_LEFT     = 8,
    ANCHOR_ALL      = 15,

    AUTOSIZE_WIDTH  = 1,
    AUTOSIZE_HEIGHT = 2;

uki.view.Base = uki.newClass(uki.view.Observable, new function() {

    var proto = this,
        layoutId = 1;

    proto.defaultCss = 'position:absolute;z-index:100;-moz-user-focus:none;'
                     + 'font-family:Arial,Helvetica,sans-serif;';
    
    proto.init = function() {
        this._anchors = 0;
        this._autosize = 0;
        this._autosizeToContents = 0;
        this._parent = null;
        this._rect = null;
        this._visible = true;
        this._needsLayout = false;
        this._selectable = false;
        this._styleH = 'left';
        this._styleV = 'top';
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
    proto.id = function(id) {
        if (id === undefined) return this._id;
        if (this._id) uki.unregisterId(this);
        this._id = id;
        uki.registerId(this);
        return this;
    };
    
    uki.each(['background', 'shadow'], function(i, name) {
        var field = '_' + name,
            defaultAttr = 'default' + name.substr(0, 1).toUpperCase() + name.substr(1),
            defaultField = '_' + defaultAttr;

        proto[name] = function(val) {
            if (val === undefined && !this[field] && this[defaultAttr]) this[field] = this[defaultAttr]();
            if (val === undefined) return this[field];
            val = uki.background(val);
            if (this._dom) {
                if (this[field]) this[field].detach(this);
                val.attachTo(this);
            }
            this[field] = val;
            return this;
        };
        
        proto[defaultAttr] = function() {
            return this[defaultField] && uki.theme.background(this[defaultField]);
        };
    })
    
    proto.selectable = function(state) {
        if (state === undefined) return this._selectable;
        
        this._selectable = state;
        if (this._dom) {
            this._dom.style.userSelect = state ? 'text' : 'none';
            this._dom.style.MozUserSelect = state ? 'text' : '-moz-none';
            this._dom.style.WebkitUserSelect = state ? 'text' : 'none';
            this._dom.style.cursor = state ? 'text' : 'default';
            this._dom.unselectable = state ? '' : 'on';
        }
        return this;
    };
    
    proto.className = function(name) {
        if (name === undefined) return this._className;
        
        this._className = name;
        if (this._dom) this._dom.className = name;
        return this;
    };
    
    /**
     * Sets or gets whenever the view is visible
     */
    proto.visible = function(state) {
        if (state === undefined) return this._visible;
        
        this._visible = state;
        if (this._dom) this._dom.style.display = state ? 'block' : 'none';
        return this;
    };
    
    proto.toggle = function() {
        this.visible(!this.visible());
    };
    
    /* ----------------------------- Container api ------------------------------*/
    
    /**
     * Sets or retrieves parent view
     */
    proto.parent = function(parent) {
        if (parent === undefined) return this._parent;
        
        if (this._dom) this._dom.parentNode.removeChild(this._dom);
        this._parent = parent;
        if (this._dom && parent) this._parent.domForChild(this).appendChild(this._dom);
        return this;
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
            this._createDom(this._rect);
            this._parent.domForChild(this).appendChild(this._dom);
            this._bindPendingEventsToDom();
        }
        this._layoutDom(this._rect);
        this._needsLayout = false;
        this.trigger('layout', {rect: this._rect, source: this});
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
        return this;
    };
    
    proto.rectForChild = function(child) {
        return this.rect();
    };
    
    /**
     * Utility method to set rect through coords
     */
    proto.coords = function(coords) {
        if (coords === undefined) return this.rect().toCoordsString();
        
        this.rect(Rect.fromCoordsString(coords));
        return this;
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
            if (this._anchors & ANCHOR_LEFT && this._anchors & ANCHOR_RIGHT) this._autosize = this._autosize | AUTOSIZE_WIDTH;
            if (this._anchors & ANCHOR_BOTTOM && this._anchors & ANCHOR_TOP) this._autosize = this._autosize | AUTOSIZE_HEIGHT;
            return this;
        }
    };
    
    function encodeAutosize (autosize) {
        if (autosize | AUTOSIZE_WIDTH && autosize | AUTOSIZE_HEIGHT) return 'width height';
        if (autosize | AUTOSIZE_WIDTH) return 'width';
        if (autosize | AUTOSIZE_HEIGHT) return 'height';
        return '';
    }
    
    function decodeAutosize (autosizeStr) {
        var autosize = 0;
        if (autosizeStr.indexOf('width' ) > -1) autosize = autosize | AUTOSIZE_WIDTH;
        if (autosizeStr.indexOf('height') > -1) autosize = autosize | AUTOSIZE_HEIGHT;
        return autosize;
    }
    
    /**
     * Set or get directions view should grow/shrink on resize
     * May be any combination of "width" and "height"
     *
     * @param String autosizeStr
     */
    proto.autosize = function(autosizeStr) {
        if (autosizeStr === undefined) return encodeAutosize(this._autosize);
        this._autosize = decodeAutosize(autosizeStr);
        return this;
    };
    
    /**
     * Set or get directions view should grow/shrink on contents resize
     * May be any combination of "width" and "height"
     *
     * @param String autosizeStr
     */
    proto.autosizeToContents = function(autosizeStr) {
        if (autosizeStr === undefined) return encodeAutosize(this._autosizeToContents);
        this._autosizeToContents = decodeAutosize(autosizeStr);
        return this;
    };
    
    proto.childResized = function( child ) {
        this.resizeToContents();
    };
    
    proto.resizeToContents = function() {
        if (0 == this._autosizeToContents) return;
        
        var oldRect = this.rect(),
            newRect = this._calcRectOnContentResize();
        if (newRect.eq(oldRect)) return;
        this.rect(newRect); // triggers _needsLayout
        
        this.parent() && this.parent().childResized( this );
    };
    
    proto.contentsSize = function() {
        return this.rect();
    };
    
    proto._calcRectOnContentResize = function() {
        var newSize = this.contentsSize( ),
            oldSize = this.rect();

        if (newSize.eq(oldSize)) return oldSize; // nothing changed
        
        // calculate where to resize
        var newRect = this.rect().clone(),
            dX = newSize.width - oldSize.width,
            dY = newSize.height - oldSize.height;
    
        if (this._autosizeToContents && AUTOSIZE_WIDTH) {
            if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT && this._anchors & ANCHOR_RIGHT ^ ANCHOR_RIGHT) {
                newRect.x -= dX/2;
            } else if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT) {
                newRect.x -= dX;
            }
            newRect.width += dX;
        }
        
        if (this._autosizeToContents && AUTOSIZE_HEIGHT) {
            if (this._anchors & ANCHOR_TOP ^ ANCHOR_TOP && this._anchors & ANCHOR_BOTTOM ^ ANCHOR_BOTTOM) {
                newRect.y -= dY/2;
            } else if (this._anchors & ANCHOR_TOP ^ ANCHOR_TOP) {
                newRect.y -= dY;
            }
            newRect.height += dY;
        }
        
        return newRect;
    };
    
    uki.each(['width', 'height', 'minX', 'maxX', 'minY', 'maxY', 'left', 'top'], function(index, attr) {
        proto[attr] = function() {
            var rect = this.rect();
            return rect[attr].apply(rect, arguments);
        };
    });
    
    /* ---------------------------------- Dom --------------------------------*/
    /**
     * Called through a second layout pass when _dom should be created
     */
    proto._createDom = function() {
        this._dom = uki.createElement('div', this.defaultCss);
        this._initCommonAttrs();
    };
    
    proto._initCommonAttrs = function() {
        this.visible(this.visible());
        this.selectable(this.selectable());
        this.className(this.className());
        if (this.background()) this.background().attachTo(this);
        if (this.shadow()) this.shadow().attachTo(this);
    };
    
    /**
     * Called through a second layout pass when _dom is allready created
     */
    proto._layoutDom = function(rect) {
        var l = {}, s = uki.supportNativeLayout, relativeRect = this.parent().rectForChild(this);
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
    
    proto._bindToDom = function(name) {
        if ('resize layout'.indexOf(name) > -1) return true;
        return uki.view.Observable._bindToDom.call(this, name);
    };
    
});