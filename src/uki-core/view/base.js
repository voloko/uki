include('../view.js');
include('../geometry.js');
include('../utils.js');
include('../builder.js');
include('../dom.js');
include('../dom/nativeLayout.js');
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
    
    proto.init = function(rect) {
        this._parentRect = this._rect = Rect.create(rect);
        this._setup();
        uki.initNativeLayout();
        this._createDom();
    };
    
    proto._setup = function() {
        uki.extend(this, {
           _anchors: 0,
           _autosize: 0,
           _parent: null,
           _visible: true,
           _needsLayout: true,
           _selectable: false,
           _styleH: 'left',
           _styleV: 'top',
           _firstLayout: true
        });
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
            
            if (val == this[field]) return;
            if (this[field]) this[field].detach(this);
            val.attachTo(this);
            
            this[field] = val;
            return this;
        };
        
        proto[defaultAttr] = function() {
            return this[defaultField] && uki.theme.background(this[defaultField]);
        };
    });
    
    proto._initBackgrounds = function() {
        if (this.background()) this.background().attachTo(this);
        if (this.shadow()) this.shadow().attachTo(this);
    };
    
    
    proto.selectable = function(state) {
        if (state === undefined) return this._selectable;
        
        this._selectable = state;
        this._dom.unselectable = state ? '' : 'on';
        var style = this._dom.style;
        style.userSelect = state ? 'text' : 'none';
        style.MozUserSelect = state ? 'text' : '-moz-none';
        style.WebkitUserSelect = state ? 'text' : 'none';
        style.cursor = state ? 'text' : 'default';
        return this;
    };
    
    proto.className = function(name) {
        if (name === undefined) return this._dom.className;
        
        this._dom.className = name;
        return this;
    };
    
    /**
     * Sets or gets whenever the view is visible
     */
    proto.visible = function(state) {
        if (state === undefined) return this._dom.style.display != 'none';
        
        this._dom.style.display = state ? 'block' : 'none';
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
        
        if (this._parent) this._dom.parentNode.removeChild(this._dom);
        this._parent = parent;
        if (this._parent) this._parent.domForChild(this).appendChild(this._dom);
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
        this._layoutDom(this._rect);
        this._needsLayout = false;
        this.trigger('layout', {rect: this._rect, source: this});
        this._firstLayout = false;
    };
    
    /* ---------------------------- Layout 1-st pass ----------------------------*/
    /**
     * Sets or retrieves rect relative to parents view.
     * Rect defines the area this view should render in.
     */
    proto.rect = function(newRect) {
        if (newRect === undefined) return this._rect;

        newRect = Rect.create(newRect);
        this._parentRect = newRect;
        if (newRect.eq(this._rect)) return false;
        this._rect = this._normalizeRect(newRect);
        this._needsLayout = this._needsLayout || layoutId++;
        return this;
    };
    
    proto.minSize = uki.newProp('_minSize', function(s) {
        this._minSize = Size.create(s);
        this.rect(this._normalizeRect(this._rect));
        if (this._minSize.width) this._dom.style.minWidth = this._minSize.width + 'px';
        if (this._minSize.height) this._dom.style.minHeight = this._minSize.height + 'px';
    });
    
    proto._normalizeRect = function(rect) {
        if (this._minSize) {
            rect = new Rect(rect.x, rect.y, MAX(this._minSize.width, rect.width), MAX(this._minSize.height, rect.height));
        }
        return rect;
    };
    
    proto.rectForChild = function(child) {
        return this.rect();
    };
    
    /* -------------------------------- Autolayout ------------------------------*/
    /**
     * Resizes view when parent changes size acording to anchors and autosize
     */
    proto.parentResized = function(oldSize, newSize) {
        var newRect = this._parentRect.clone(),
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
            var result = [], anchors = this._anchors;
            if (anchors & ANCHOR_LEFT  ) result.push('left');
            if (anchors & ANCHOR_TOP   ) result.push('top');
            if (anchors & ANCHOR_RIGHT ) result.push('right');
            if (anchors & ANCHOR_BOTTOM) result.push('bottom');
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
        if (!autosizeStr) return 0;
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
    
    proto.resizeToContents = function(autosize) {
        autosize = decodeAutosize(autosize);
        if (0 == autosize) return;
        
        var oldRect = this.rect(),
            newRect = this._calcRectOnContentResize(autosize);
        if (newRect.eq(oldRect)) return this;
        this._rect = this._parentRect = newRect;
        this._needsLayout = true;
        return this;
    };
    
    
    proto.contentsSize = function(autosize) {
        return this.rect();
    };
    
    proto._calcRectOnContentResize = function(autosize) {
        var newSize = this.contentsSize( autosize ),
            oldSize = this.rect();

        if (newSize.eq(oldSize)) return oldSize; // nothing changed
        
        // calculate where to resize
        var newRect = this.rect().clone(),
            dX = newSize.width - oldSize.width,
            dY = newSize.height - oldSize.height;
    
        if (autosize & AUTOSIZE_WIDTH) {
            if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT && this._anchors & ANCHOR_RIGHT ^ ANCHOR_RIGHT) {
                newRect.x -= dX/2;
            } else if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT) {
                newRect.x -= dX;
            }
            newRect.width += dX;
        }
        
        if (autosize & AUTOSIZE_HEIGHT) {
            if (this._anchors & ANCHOR_TOP ^ ANCHOR_TOP && this._anchors & ANCHOR_BOTTOM ^ ANCHOR_BOTTOM) {
                newRect.y -= dY/2;
            } else if (this._anchors & ANCHOR_TOP ^ ANCHOR_TOP) {
                newRect.y -= dY;
            }
            newRect.height += dY;
        }
        
        return newRect;
    };
    
    proto._calcRectOnContentResize = function(autosize) {
        var newSize = this.contentsSize( autosize ),
            newRect = this.rect().clone();
        
        if (autosize & AUTOSIZE_WIDTH) newRect.width = newSize.width;
        if (autosize & AUTOSIZE_HEIGHT) newRect.height = newSize.height;
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
        if (this._firstLayout) this._initBackgrounds();
        return true;
    };
    
    proto._bindToDom = function(name) {
        if ('resize layout'.indexOf(name) > -1) return true;
        return uki.view.Observable._bindToDom.call(this, name);
    };
    
});