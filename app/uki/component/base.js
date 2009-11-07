include('../component.js');
include('../geometry.js');
include('../layout.js');
include('../core/utils.js');

(function() {

ANCHOR_TOP      = 1;
ANCHOR_RIGHT    = 2;
ANCHOR_BOTTOM   = 4;
ANCHOR_LEFT     = 8;

AUTOSIZE_WIDTH  = 1;
AUTOSIZE_HEIGHT = 2;
    
var layout = uki.layout,
    utils = uki.core.utils,
    self = uki.component.Base = function() {
        this.init.apply(this, arguments);
    };

self.prototype = new function() {
    var proto = this;
    
    proto.defaultCss = 'position:absolute;overflow:hidden;top:0;left:0;z-index:100;';
    
    proto.init = function(rect) {
        this._anchors = 0;
        this._autosize = 0;
        this._parent = null;
        this._rect = null;
        this._children = [];
        
        if (rect) this.rect(rect);
    };
    
    proto.addChild = function(child) {
        child.parent(this);
        this._children.push(child);
    };
    
    proto.parent = function(parent) {
        if (arguments.length == 0) return this._parent;
        
        if (this._parent && this._dom) this._parent.removeChild(this._dom);
        this._parent = parent;
        if (this._dom) parent._dom.appendChild(this._dom);
    };
    
    proto.initWithRect = function(rect) {
        this._rect = rect;
        this._domCreate();
        if (this._parent) this._parent._dom.appendChild(this._dom);
    };
    
    proto.rect = function(rect) {
        if (arguments.length == 0) return this._rect;

        if (typeof rect === 'string') rect = uki.geometry.Rect.fromString(
            rect, 
            (this._parent ? this._parent.rect().size : undefined)
        );

        if (!this._rect) return this.initWithRect(rect);

        if (rect.eq(this._rect)) return;
        
        this._domResize(rect);
        var oldSize = this._rect.size.clone();
        this._rect = rect;
        for (var i=0; i < this._children.length; i++) {
            this._children[i].resizeWithOldSize(oldSize);
        };
    };
    
    proto.coords = function(coords) {
        if (arguments.length == 0) this.rect().toCoordsString();
        
        this.rect(uki.geometry.Rect.fromCoordsString(
            coords, 
            (this._parent ? this._parent.rect().size : undefined)
        ));
    };
    
    proto.dom = function() {
        return this._dom;
    };
    
    proto.domStyle = function() {
        return this._domStyle;
    };
    
    proto._domResize = function(rect) {
        var props = {};

        layout.schedule(this._domStyle, {
            left: rect.origin.x, 
            top: rect.origin.y, 
            width: rect.size.width, 
            height: rect.size.height
        });
        // this._domStyle.left   = rect.origin.x + 'px';
        // this._domStyle.top    = rect.origin.y + 'px';
        // this._domStyle.width  = rect.size.width + 'px';
        // this._domStyle.height = rect.size.height + 'px';
    };
    
    proto._domCreate = function() {
        this._dom = document.createElement('div');
        this._domStyle = this._dom.style;
        this._domStyle.cssText = this.defaultCss;
        this._domResize(this._rect);
    };
    
    proto.resizeWithOldSize = function(oldSize) {
        if (!this._anchors && !this._autosize) return;

        var rect = this._parent.rect(),
            newRect = this._rect.clone(),
            dX = (rect.size.width - oldSize.width) /
                ((this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT ? 1 : 0) +   // flexible left
                (this._autosize & AUTOSIZE_WIDTH? 1 : 0) +             
                (this._anchors & ANCHOR_RIGHT ^ ANCHOR_RIGHT ? 1 : 0)),   // flexible right
            dY = (rect.size.height - oldSize.height) /
                ((this._anchors & ANCHOR_TOP ^ ANCHOR_TOP ? 1 : 0) +      // flexible top
                (this._autosize & AUTOSIZE_HEIGHT ? 1 : 0) + 
                (this._anchors & ANCHOR_BOTTOM ^ ANCHOR_BOTTOM ? 1 : 0)); // flexible right
                
        if (this._anchors & ANCHOR_LEFT ^ ANCHOR_LEFT) newRect.origin.x += dX;
        if (this._autosize & AUTOSIZE_WIDTH) newRect.size.width += dX;

        if (this._anchors & ANCHOR_TOP ^ ANCHOR_TOP) newRect.origin.y += dY;
        if (this._autosize & AUTOSIZE_HEIGHT) newRect.size.height += dY;

        this.rect(newRect);
    };
    
    proto.anchors = function(anchors) {
        if (arguments.length == 0) {
            var result = [];
            if (this._anchors | ANCHOR_LEFT  ) result.push('left');
            if (this._anchors | ANCHOR_TOP   ) result.push('top');
            if (this._anchors | ANCHOR_RIGHT ) result.push('right');
            if (this._anchors | ANCHOR_BOTTOM) result.push('bottom');
            return result.join(' ');
        } else {
            this._anchors = 0;
            if (anchors.indexOf('top'    ) > -1) this._anchors = this._anchors | ANCHOR_TOP;
            if (anchors.indexOf('right'  ) > -1) this._anchors = this._anchors | ANCHOR_RIGHT;
            if (anchors.indexOf('bottom' ) > -1) this._anchors = this._anchors | ANCHOR_BOTTOM;
            if (anchors.indexOf('left'   ) > -1) this._anchors = this._anchors | ANCHOR_LEFT;
        }
    };
    
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
    
};
})();