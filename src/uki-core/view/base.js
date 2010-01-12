include('../view.js');
include('../geometry.js');
include('../utils.js');
include('../builder.js');
include('../dom.js');
include('../dom/nativeLayout.js');
include('observable.js');
include('cssable.js');

var ANCHOR_TOP    = 1,
    ANCHOR_RIGHT  = 2,
    ANCHOR_BOTTOM = 4,
    ANCHOR_LEFT   = 8,
    ANCHOR_WIDTH  = 16,
    ANCHOR_HEIGHT = 32;

uki.view.Base = uki.newClass(uki.view.Observable, uki.view.Cssable, new function() {
    
    /** @exports proto as uki.view.Base# */
    var proto = this,
        layoutId = 1;

    proto.defaultCss = 'position:absolute;z-index:100;-moz-user-focus:none;'
                     + 'font-family:Arial,Helvetica,sans-serif;';
    


    /**
     * Base class for all uki views.
     *
     * <p>View creates and layouts dom nodes. uki.view.Base defines basic API for other views.
     * It also defines common layout algorithms.</p>
     *
     * Layout
     *
     * <p>View layout is defined by rectangle and anchors.
     * Rectangle is passed to constructor, anchors are set through the #anchors attribute.</p>
     * 
     * <p>Rectangle defines initial position and size. Anchors specify how view will move and
     * resize when its parent is resized.</p>
     *
     * 2 phases of layout
     *
     * <p>Layout process has 2 phases. 
     * First views rectangles are recalculated. This may happen several times before dom 
     * is touched. This is done either explictly through #rect attribute or through
     * #parentResized callbacks. 
     * After rectangles are set #layout is called. This actually updates dom styles.</p>
     *
     * @example
     * uki({ view: 'Base', rect: '10 20 100 50', anchors: 'left top right' })
     * // Creates Base view with initial x = 10px, y = 20px, width = 100px, height = 50px.
     * // When parent resizes x, y and height will stay the same. Width will resize with parent.
     *
     *
     * @see uki.view.Base#anchors
     * @constructor
     *
     * @name uki.view.Base
     * @implements uki.view.Observable
     * @param {uki.geometry.Rect} rect initial position and size
     */
    proto.init = function(rect) {
        this._parentRect = this._rect = Rect.create(rect);
        this._setup();
        uki.initNativeLayout();
        this._createDom();
    };
    
    /**#@+ @memberOf uki.view.Base# */
    
    proto._setup = function() {
        uki.extend(this, {
           _anchors: 0,
           _parent: null,
           _visible: true,
           _needsLayout: true,
           _textSelectable: false,
           _styleH: 'left',
           _styleV: 'top',
           _firstLayout: true
        });
    };
    
    /**
     * Get views container dom node.
     * @returns {Element} dom
     */
    proto.dom = function() {
        return this._dom;
    };
    
    /* ------------------------------- Common settings --------------------------------*/
    /**
     * Full type name of a view. Used by uki.Selector
     * @return {String}
     */
    proto.typeName = function() {
        return 'uki.view.Base';
    };
    
    /**
     * Used for fast (on hash lookup) view searches: uki('#view_id');
     *
     * @param {string=} id New id value
     * @returns {string|uki.view.Base} current id or self
     */
    proto.id = function(id) {
        if (id === undefined) return this._dom.id;
        if (this._dom.id) uki.unregisterId(this);
        this._dom.id = id;
        uki.registerId(this);
        return this;
    };
    
    /**
     * Accessor for dom().className
     * @param {string=} className
     * @returns {string|uki.view.Base} className or self
     */
    uki.delegateProp(proto, 'className', '_dom');
    
    /**
     * Accessor for view visibility. 
     *
     * @param {boolean=} state 
     * @returns {boolean|uki.view.Base} current visibility state of self
     */
    proto.visible = function(state) {
        if (state === undefined) return this._dom.style.display != 'none';
        
        this._dom.style.display = state ? 'block' : 'none';
        return this;
    };
    
    proto.toggle = function() {
        this.visible(!this.visible());
    };
    
    /**
     * Accessor for background attribute. 
     * @name background
     * @function
     * @param {string|uki.background.Base=} background
     * @returns {uki.background.Base|uki.view.Base} current background or self
     */
    /**
     * Accessor for shadow background attribute. 
     * @name shadow
     * @function
     * @param {string|uki.background.Base=} background
     * @returns {uki.background.Base|uki.view.Base} current background or self
     */
    /**
     * Accessor for default background attribute. 
     * @name defaultBackground
     * @function
     * @returns {uki.background.Base} default background if not overriden through attribute
     */
    /**
     * Accessor for default shadow background attribute. 
     * @name defaultShadow
     * @function
     * @returns {uki.background.Base} default background if not overriden through attribute
     */
    uki.each(['background', 'shadow'], function(i, name) {
        var field = '_' + name,
            defaultAttr = 'default' + name.substr(0, 1).toUpperCase() + name.substr(1),
            defaultField = '_' + defaultAttr;

        proto[name] = function(val) {
            if (val === undefined && !this[field] && this[defaultAttr]) this[field] = this[defaultAttr]();
            if (val === undefined) return this[field];
            val = uki.background(val);
            
            if (val == this[field]) return this;
            if (this[field]) this[field].detach(this);
            val.attachTo(this);
            
            this[field] = val;
            return this;
        };
        
        proto[defaultAttr] = function() {
            return this[defaultField] && uki.theme.background(this[defaultField]);
        };
    });
    
    /* ----------------------------- Container api ------------------------------*/
    
    /**
     * Accessor attibute for parent view. When parent is set view appends its #dom
     * to parents #domForChild
     *
     * @param {?uki.view.Base=} parent
     * @returns {uki.view.Base} parent or self
     */
    proto.parent = function(parent) {
        if (parent === undefined) return this._parent;
        
        if (this._parent) this._dom.parentNode.removeChild(this._dom);
        this._parent = parent;
        if (this._parent) this._parent.domForChild(this).appendChild(this._dom);
        return this;
    };
    
    /**
     * Accessor for childViews. @see uki.view.Container for implementation
     * @returns {Array.<uki.view.Base>}
     */
    proto.childViews = function() {
        return [];
    };
    
    
    /* ----------------------------- Layout ------------------------------*/
    
    /**
     * Sets or retrieves view's position and size.
     *
     * @param {string|uki.geometry.Rect} newRect
     * @returns {uki.view.Base} self
     */
    proto.rect = function(newRect) {
        if (newRect === undefined) return this._rect;

        newRect = Rect.create(newRect);
        this._parentRect = newRect;
        // if (newRect.eq(this._rect)) return false;
        this._rect = this._normalizeRect(newRect);
        this._needsLayout = this._needsLayout || layoutId++;
        return this;
    };
    
    /**
     * Set or get sides which the view should be attached to.
     * When a view is attached to a side the distance between this side and views border
     * will remain constant on resize. Anchor can be any combination of
     * "top", "right", "bottom", "left", "width" and "height". 
     * If you set both "right" and "left" than "width" is assumed.
     *
     * Anchors are stored as a bitmask. Though its easier to set them using strings
     *
     * @function
     * @param {string|number} anchors
     * @returns {number|uki.view.Base} anchors or self
     */
    proto.anchors = uki.newProp('_anchors', function(anchors) {
        if (anchors.indexOf) {
            var tmp = 0;
            if (anchors.indexOf('right'  ) > -1) tmp |= ANCHOR_RIGHT; 
            if (anchors.indexOf('bottom' ) > -1) tmp |= ANCHOR_BOTTOM;
            if (anchors.indexOf('top'    ) > -1) tmp |= ANCHOR_TOP;   
            if (anchors.indexOf('left'   ) > -1) tmp |= ANCHOR_LEFT;  
            if (anchors.indexOf('width'  ) > -1 || (tmp & ANCHOR_LEFT && tmp & ANCHOR_RIGHT)) tmp |= ANCHOR_WIDTH;  
            if (anchors.indexOf('height' ) > -1 || (tmp & ANCHOR_BOTTOM && tmp & ANCHOR_TOP)) tmp |= ANCHOR_HEIGHT;
            anchors = tmp;
        }
        this._anchors = anchors;
        this._styleH = anchors & ANCHOR_LEFT ? 'left' : 'right';
        this._styleV = anchors & ANCHOR_TOP ? 'top' : 'bottom';
    });
    
    /**
     * Returns rectangle for child layout. Usualy equals to #rect. Though in some cases,
     * client rectangle my differ from #rect. Example uki.view.ScrollPane.
     *
     * @param {uki.view.Base} child 
     * @returns {uki.geometry.Rect}
     */
    proto.rectForChild = function(child) {
        return this.rect();
    };
    
    /**
     * Updates dom to match #rect property.
     *
     * Layout is designed to minimize dom writes. If view is anchored to the right then
     * style.right is used, style.left for left anchor, etc. If browser supports this
     * both style.right and style.left are used. Otherwise style.width will be updated
     * manualy on each resize. 
     *
     * @see uki.dom.initNativeLayout
     */
    proto.layout = function() {
        this._layoutDom(this._rect);
        this._needsLayout = false;
        this.trigger('layout', {rect: this._rect, source: this});
        this._firstLayout = false;
    };
    
    proto.minSize = uki.newProp('_minSize', function(s) {
        this._minSize = Size.create(s);
        this.rect(this._parentRect);
        if (this._minSize.width) this._dom.style.minWidth = this._minSize.width + 'px';
        if (this._minSize.height) this._dom.style.minHeight = this._minSize.height + 'px';
    });
    
    /**
     * Resizes view when parent changes size acording to anchors.
     * Called from parent view. Usualy after parent's #rect is called.
     *
     * @param {uki.geometry.Rect} oldSize
     * @param {uki.geometry.Rect} newSize
     */
    proto.parentResized = function(oldSize, newSize) {
        var newRect = this._parentRect.clone(),
            dX = (newSize.width - oldSize.width) /
                ((this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT ? 1 : 0) +   // flexible left
                (this._anchors & ANCHOR_WIDTH ? 1 : 0) +             
                (this._anchors & ANCHOR_RIGHT ^ ANCHOR_RIGHT ? 1 : 0)),   // flexible right
            dY = (newSize.height - oldSize.height) /
                ((this._anchors & ANCHOR_TOP ^ ANCHOR_TOP ? 1 : 0) +      // flexible top
                (this._anchors & ANCHOR_HEIGHT ? 1 : 0) + 
                (this._anchors & ANCHOR_BOTTOM ^ ANCHOR_BOTTOM ? 1 : 0)); // flexible right
                
        if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT) newRect.x += dX;
        if (this._anchors & ANCHOR_WIDTH) newRect.width += dX;

        if (this._anchors & ANCHOR_TOP ^ ANCHOR_TOP) newRect.y += dY;
        if (this._anchors & ANCHOR_HEIGHT) newRect.height += dY;
        this.rect(newRect);
    };
    
    /**
     * Resizes view to its contents. Contents size is determined by view.
     * View can be resized by width, height or both. This is specified throght
     * autosizeStr param.
     * View will grow shrink acording to its #anchors.
     *
     * @param {autosizeStr} autosize 
     * @returns {uki.view.Base} self
     */
    proto.resizeToContents = function(autosizeStr) {
        var autosize = decodeAutosize(autosizeStr);
        if (0 == autosize) return this;
        
        var oldRect = this.rect(),
            newRect = this._calcRectOnContentResize(autosize);
        // if (newRect.eq(oldRect)) return this;
        // this.rect(newRect);
        this._rect = this._parentRect = newRect;
        this._needsLayout = true;
        return this;
    };
    
    /**
     * Calculates view's contents size. Redefined in subclasses.
     *
     * @param {number} autosize Bitmask
     * @returns {uki.geometry.Rect}
     */
    proto.contentsSize = function(autosize) {
        return this.rect();
    };
    
    proto._normalizeRect = function(rect) {
        if (this._minSize) {
            rect = new Rect(rect.x, rect.y, MAX(this._minSize.width, rect.width), MAX(this._minSize.height, rect.height));
        }
        return rect;
    };
    
    
    
    function decodeAutosize (autosizeStr) {
        if (!autosizeStr) return 0;
        var autosize = 0;
        if (autosizeStr.indexOf('width' ) > -1) autosize = autosize | ANCHOR_WIDTH;
        if (autosizeStr.indexOf('height') > -1) autosize = autosize | ANCHOR_HEIGHT;
        return autosize;
    }
    

    proto._initBackgrounds = function() {
        if (this.background()) this.background().attachTo(this);
        if (this.shadow()) this.shadow().attachTo(this);
    };
    
    proto._calcRectOnContentResize = function(autosize) {
        var newSize = this.contentsSize( autosize ),
            oldSize = this.rect();

        if (newSize.eq(oldSize)) return oldSize; // nothing changed
        
        // calculate where to resize
        var newRect = this.rect().clone(),
            dX = newSize.width - oldSize.width,
            dY = newSize.height - oldSize.height;
    
        if (autosize & ANCHOR_WIDTH) {
            if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT && this._anchors & ANCHOR_RIGHT ^ ANCHOR_RIGHT) {
                newRect.x -= dX/2;
            } else if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT) {
                newRect.x -= dX;
            }
            newRect.width += dX;
        }
        
        if (autosize & ANCHOR_HEIGHT) {
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
    };
    
    /**
     * Called through a second layout pass when _dom is allready created
     */
    proto._layoutDom = function(rect) {
        var l = {}, s = uki.supportNativeLayout, relativeRect = this.parent().rectForChild(this);
        if (s && this._anchors & ANCHOR_LEFT && this._anchors & ANCHOR_RIGHT) {
            l.left = rect.x;
            l.right = relativeRect.width - rect.x - rect.width;
        } else {
            l.width = rect.width;
            l[this._styleH] = this._styleH == 'left' ? rect.x : relativeRect.width - rect.x - rect.width;
        }
        
        if (s && this._anchors & ANCHOR_TOP && this._anchors & ANCHOR_BOTTOM) {
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
    
    /**#@-*/
});