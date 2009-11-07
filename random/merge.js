uki = {};

uki.component = {};


(function() {
    var geometry = uki.geometry = {};
    
    var Point = geometry.Point = function(x, y) {
        this.x = x || 0.0;
        this.y = y || 0.0;
    };
    
    Point.prototype = {
        toString: function() {
            return '{' + this.x + ', ' + this.y + '}';
        },
        
        clone: function() {
            return new Point(this.x, this.y);
        },
        
        eq: function(point) {
            return this.x == point.x && this.y == point.y;
        },
        
        constructor: Point
    };
    
    Point.fromString = function(string) {
        var comma = string.indexOf(',');
        return new Point( parseFloat(string.substr(1, comma-1), 10), parseFloat(string.substr(comma+1), 10) );
    };
    
    
    var Size = geometry.Size = function(width, height) {
        this.width  = width ||  0.0;
        this.height = height || 0.0;
    };
    
    Size.prototype = {
        toString: function() {
            return '{' + this.width + ', ' + this.height + '}';
        },
        
        clone: function() {
            return new Size(this.width, this.height);
        },
        
        eq: function(rect) {
            return this.width == rect.width && this.height == rect.height;
        },
        
        isEmpty: function() {
            return this.width <= 0 || this.height <= 0;
        },
        
        constructor: Size
    };
    
    Size.fromString = function(string) {
        var comma = string.indexOf(',');
        return new Size( parseFloat(string.substr(1, comma-1), 10), parseFloat(string.substr(comma+1), 10) );
    };
    
    
    
    var Rect = geometry.Rect = function(origin, size) {
        this.origin = origin || new Point();
        this.size   = size || new Size();
    };
    
    Rect.prototype = {
        toString: function() {
            return '{' + this.origin + ', ' + this.size + '}';
        },
        
        clone: function() {
            return new Rect(this.origin.clone(), this.size.clone());
        },
        
        minX: function(val) {
            if (typeof val != 'undefined') this.origin.x = val;
            return this.origin.x;
        },
        
        maxX: function() {
            return this.origin.x + this.size.width;
        },
        
        midX: function() {
            return this.origin.x + this.size.width / 2.0;
        },
        
        minY: function(val) {
            if (typeof val != 'undefined') this.origin.y = val;
            return this.origin.y;
        },
        
        midY: function() {
            return this.origin.y + this.size.height / 2.0;
        },
        
        maxY: function() {
            return this.origin.y + this.size.height;
        },
        
        width: function(val) {
            if (typeof val != 'undefined') this.size.width = val;
            return this.size.width;
        },
        
        height: function(val) {
            if (typeof val != 'undefined') this.size.height = val;
            return this.size.height;
        },
        
        isEmpty: function() {
            return this.size.width <= 0.0 || this.size.height <= 0.0;
        },
        
        eq: function(rect) {
            return this.size.eq(rect.size) && this.origin.eq(rect.origin);
        },
        
        inset: function(dx, dy) {
            this.origin.x += dx;
            this.origin.y += dy;
            this.size.width -= dx*2.0;
            this.size.height -= dy*2.0;
        },
        
        intersection: function(rect) {
            var origin = new Point(
                    Math.max(this.origin.x, rect.origin.x),
                    Math.max(this.origin.y, rect.origin.y)
                ),
                size = new Size(
                    Math.min(this.maxX(), rect.maxX()) - origin.x,
                    Math.min(this.maxY(), rect.maxY()) - origin.y
                );
            return size.isEmpty() ? new Rect() : new Rect(origin, size);
        },
        
        union: function(rect) {
            return Rect.fromCoords(
                Math.min(this.origin.x, rect.origin.x),
                Math.min(this.origin.y, rect.origin.y),
                Math.max(this.origin.maxX(), rect.origin.maxX()),
                Math.max(this.origin.maxY(), rect.origin.maxY())
            );
        },
        
        containsPoint: function(point) {
            return 
                point.x >= this.minX() &&
                point.x <= this.maxX() &&
                point.y >= this.minY() &&
                point.y <= this.maxY();    
        },
        
        containsRect: function(rect) {
            return this.eq(this.union(rect));
        },
        
        constructor: Rect
    };
    
    Rect.prototype.left = Rect.prototype.minX;
    Rect.prototype.top  = Rect.prototype.minY;
    
    Rect.fromParts = function(x, y, width, height) {
        return new Rect(new Point(x, y), new Size(width, height));
    };
    
    Rect.fromCoords = function(minX, minY, maxX, maxY) {
        return new Rect(new Point(minX, minY), new Size(maxX - minX, maxY - minY));
    };
    
    Rect.fromString = function(string) {
        var comma = string.indexOf(',', string.indexOf(',') + 1);
        return new Rect( 
            Point.fromString( string.substr(1, comma - 1) ), 
            Size.fromString( string.substr(comma + 2, string.length - comma - 2) ) 
        ) ;
    };
    
})();



uki.layout = new function() {
    
    this.queue = [];
    
    this.schedule = function(style, properties) {
        this.queue[this.queue.length] = [style, properties];
    };
    
    this.perform = function() {
        var queue = this.queue,
            style, properties;
        for (var i=0; i < queue.length; i++) {
            style = queue[i][0];
            properties = queue[i][1];
            if (properties.left) style.left = properties.left + 'px';
            if (properties.top) style.top = properties.top + 'px';
            if (properties.width) style.width = properties.width + 'px';
            if (properties.height) style.height = properties.height + 'px';
        };
        this.queue = [];
    }
};


uki.core = {};

/* Reap off JQuery */
(function() {

var toString = Object.prototype.toString;
	
var utils = uki.core.utils = {
    
	isFunction: function( obj ) {
		return toString.call(obj) === "[object Function]";
	},

    isArray: function( obj ) {
        return toString.call(obj) === "[object Array]";
    },
    
    trim: function( text ) {
        return (text || "").replace( /^\s+|\s+$/g, "" );
    },
    
    escapeHTML: function( html ) {
        var trans = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        return html.replace(/[&<>\"\']/g, function(c) { return trans[c] });
    },
    
    each: function( object, callback, context ) {
        var name, i = 0, length = object.length;

        if ( length === undefined ) {
            for ( name in object ) {
                if ( callback.call( context || object[ name ], name, object[ name ] ) === false ) { break; }
            }
        } else {
            for ( var value = object[0]; i < length && callback.call( context || value, i, value ) !== false; value = object[++i] ){}

            return object;
        }
    },
    
    inArray: function( elem, array ) {
        for ( var i = 0, length = array.length; i < length; i++ ) {
            if ( array[ i ] === elem ) { return i; }
        }

        return -1;
    },

    unique: function( array ) {
        var ret = [], done = {};

        try {

            for ( var i = 0, length = array.length; i < length; i++ ) {
                var id = array[ i ];

                if ( !done[ id ] ) {
                    done[ id ] = true;
                    ret.push( array[ i ] );
                }
            }

        } catch( e ) {
            ret = array;
        }

        return ret;
    },

    grep: function( elems, callback ) {
        var ret = [];

        for ( var i = 0, length = elems.length; i < length; i++ ) {
            if ( callback( elems[ i ], i ) ) { ret.push( elems[ i ] ); }
        }

        return ret;
    },
    
    map: function( elems, callback, context ) {
        var ret = [];

        for ( var i = 0, length = elems.length; i < length; i++ ) {
            var value = callback.call( context || elems[ i ], elems[ i ], i );

            if ( value != null ) { ret[ ret.length ] = value; }
        }

        return ret.concat.apply( [], ret );
    },

    extend: function() {
        var target = arguments[0] || {}, i = 1, length = arguments.length, options;

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                
                for ( var name in options ) {
                    var copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }

                }
            }
        }

        // Return the modified object
        return target;      
    }
};

utils.extend(uki, utils);

})();


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
    this.defaultCss = 'position:absolute;overflow:hidden;top:0;left:0;z-index:100;';
    
    this.init = function(rect) {
        this._anchors = 0;
        this._autosize = 0;
        this._parent = null;
        this._rect = rect || null;
        this._children = [];
        
        if (rect) this.initWithRect(rect);
    };
    
    this.addChild = function(child) {
        child.parent(this);
        this._children.push(child);
    };
    
    this.parent = function(parent) {
        if (arguments.length == 0) return this._parent;
        
        if (this._parent) this._parent.removeChild(this._dom);
        this._parent = parent;
        parent._dom.appendChild(this._dom);
    };
    
    this.initWithRect = function(rect) {
        this._rect = rect;
        this._domCreate();
    };
    
    this.rect = function(rect) {
        if (arguments.length == 0) return this._rect;
        
        if (rect.eq(this._rect)) return;
        
        this._domResize(rect);
        var oldSize = this._rect.size.clone();
        this._rect = rect;
        for (var i=0; i < this._children.length; i++) {
            this._children[i].resizeWithOldSize(oldSize);
        };
    };
    
    this.dom = function() {
        return this._dom;
    };
    
    this.domStyle = function() {
        return this._domStyle;
    };
    
    this._domResize = function(rect) {
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
    
    this._domCreate = function() {
        this._dom = document.createElement('div');
        this._domStyle = this._dom.style;
        this._domStyle.cssText = this.defaultCss;
        this._domResize(this._rect);
    };
    
    this.resizeWithOldSize = function(oldSize) {
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
    
    this.anchors = function(anchors) {
        if (arguments.length == 0) {
            var result = [];
            if (this._anchors | ANCHOR_LEFT  ) result.push('left');
            if (this._anchors | ANCHOR_TOP   ) result.push('top');
            if (this._anchors | ANCHOR_RIGHT ) result.push('right');
            if (this._anchors | ANCHOR_BOTTOM) result.push('bottom');
            return result.join(' ');
        } else {
            anchors = anchors.split(' ');
            this._anchors = 0;
            if (utils.inArray('top',    anchors) > -1) this._anchors = this._anchors | ANCHOR_TOP;
            if (utils.inArray('right',  anchors) > -1) this._anchors = this._anchors | ANCHOR_RIGHT;
            if (utils.inArray('bottom', anchors) > -1) this._anchors = this._anchors | ANCHOR_BOTTOM;
            if (utils.inArray('left',   anchors) > -1) this._anchors = this._anchors | ANCHOR_LEFT;
        }
    };
    
    this.autosize = function(autosize) {
        if (arguments.length == 0) {
            if (this._autosize | AUTOSIZE_WIDTH && this._autosize | AUTOSIZE_HEIGHT) return 'width height';
            if (this._autosize | AUTOSIZE_WIDTH) return 'width';
            if (this._autosize | AUTOSIZE_HEIGHT) return 'height';
            return '';
        } else {
            this._autosize = 0;
            autosize = autosize.split(' ');
            if (utils.inArray('width',  autosize) > -1) this._autosize = this._autosize | AUTOSIZE_WIDTH;
            if (utils.inArray('height', autosize) > -1) this._autosize = this._autosize | AUTOSIZE_HEIGHT;
        }
    };
};
})();


(function() {

var base = uki.component.Base.prototype,
    self = uki.component.Textarea = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, base, {
   _domCreate: function() {
       this._dom = this._dom = document.createElement('textarea');
       this._domStyle = this._dom.style;
       this._domStyle.cssText = base.defaultCss;
       this._domResize(this.rect);
   } 
});
    
})();


(function() {

var base = uki.component.Base.prototype,
    self = uki.component.Input = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, base, {
   _domCreate: function() {
       this._dom = this._dom = document.createElement('input');
       this._domStyle = this._dom.style;
       this._domStyle.cssText = base.defaultCss + "-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box";
       this._domResize(this._rect);
   } 
});
    
})();


(function() {

var base = uki.component.Base.prototype,
    self = uki.component.Label = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, base, {
    _domCreate: function() {
        this._selectable = true;
        this._dom = this._dom = document.createElement('div');
        this._domStyle = this._dom.style;
        this._domStyle.cssText = base.defaultCss + 
            "font-family:Helvetica-Neue,Helvetica,Arial,sans-serif;text-shadow:0 1px 0px rgba(255,255,255,0.8);font-size:12px;line-height:15px;";
        this._domResize(this._rect);
    },
    
    text: function(text) {
        return arguments.length == 0 ? this.html() : this.html(uki.escapeHTML(text));
    },
    
    html: function(html) {
        if (arguments.length == 0) {
            return this._dom.innerHTML;
        } else {
            this._dom.innerHTML = html;
        }
    },
    
    align: function(align) {
        if (arguments.length == 0) {
            return this.domStyle().textAlign;
        } else {
            this.domStyle().textAlign = align;
        }
    },
    
    selectable: function(state) {
        if (arguments.length == 0) {
            return this._selectable;
        } else {
            this._domStyle.MozUserSelect = state ? '' : 'none';
            this._domStyle.WebkitUserSelect = state ? '' : 'none';
            this._domStyle.userSelect = state ? '' : 'none';
            this._domStyle.cursor = state ? 'text' : 'default';
        }
    }
});
    
})();