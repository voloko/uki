include('../uki.js');

(function() {
    var geometry = uki.geometry = {};
    
    var Point = geometry.Point = function(x, y) {
        this.x = x || 0.0;
        this.y = y || 0.0;
    };
    
    Point.prototype = {
        toString: function() {
            return this.x + ' ' + this.y;
        },
        
        clone: function() {
            return new Point(this.x, this.y);
        },
        
        eq: function(point) {
            return this.x == point.x && this.y == point.y;
        },
        
        offset: function(x, y) {
            this.x += x;
            this.y += y;
            return this;
        },
        
        constructor: Point
    };
    
    Point.fromString = function(string, relative) {
        var parts = string.split(/\s+/);
        return new Point( unitsToPx(parts[0], relative && relative.width), unitsToPx(parts[1], relative && relative.height) );
    };
    
    
    
    var Size = geometry.Size = function(width, height) {
        this.width  = width ||  0.0;
        this.height = height || 0.0;
    };
    
    Size.prototype = {
        toString: function() {
            return this.width + ' ' + this.height;
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
    
    Size.fromString = function(string, relative) {
        var parts = string.split(/\s+/);
        return new Size( unitsToPx(parts[0], relative && relative.width), unitsToPx(parts[1], relative && relative.height) );
    };
    
    

    var Rect = geometry.Rect = function(origin, size) {
        if (arguments.length > 2) {
            this.x      = arguments[0];
            this.y      = arguments[1];
            this.width  = arguments[2];
            this.height = arguments[3];
        } else {
            this.x      = origin ? origin.x    : 0;
            this.y      = origin ? origin.y    : 0;
            this.width  = size   ? size.width  : 0;
            this.height = size   ? size.height : 0;
        }
    };
    
    Rect.prototype = {
        toString: function() {
            return [this.x, this.y, this.width, this.height].join(' ');
        },
        
        toCoordsString: function() {
            return [this.x, this.y, this.maxX(), this.maxY()].join(' ');
        },
        
        clone: function() {
            return new Rect(this.x, this.y, this.width, this.height);
        },
        
        minX: function(val) {
            if (typeof val != 'undefined') this.x = val;
            return this.x;
        },
        
        maxX: function() {
            return this.x + this.width;
        },
        
        midX: function() {
            return this.x + this.width / 2.0;
        },
        
        minY: function(val) {
            if (typeof val != 'undefined') this.y = val;
            return this.y;
        },
        
        midY: function() {
            return this.y + this.height / 2.0;
        },
        
        maxY: function() {
            return this.y + this.height;
        },
        
        isEmpty: function() {
            return this.width <= 0.0 || this.height <= 0.0;
        },
        
        eq: function(rect) {
            return rect && this.x == rect.x && this.y == rect.y && this.height == rect.height && this.width == rect.width;
        },
        
        inset: function(dx, dy) {
            this.x += dx;
            this.y += dy;
            this.width -= dx*2.0;
            this.height -= dy*2.0;
        },
        
        intersection: function(rect) {
            var origin = new Point(
                    Math.max(this.x, rect.x),
                    Math.max(this.y, rect.y)
                ),
                size = new Size(
                    Math.min(this.maxX(), rect.maxX()) - origin.x,
                    Math.min(this.maxY(), rect.maxY()) - origin.y
                );
            return size.isEmpty() ? new Rect() : new Rect(origin, size);
        },
        
        union: function(rect) {
            return Rect.fromCoords(
                Math.min(this.x, rect.x),
                Math.min(this.y, rect.y),
                Math.max(this.maxX(), rect.maxX()),
                Math.max(this.maxY(), rect.maxY())
            );
        },
        
        containsPoint: function(point) {
            return point.x >= this.minX() &&
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
    
    Rect.fromCoords = function(minX, minY, maxX, maxY) {
        if (arguments.length == 2) {
            return new Rect(
                arguments[0].x, 
                arguments[0].y, 
                arguments[1].x - arguments[0].x, 
                arguments[1].y - arguments[0].y
            );
        }
        return new Rect(minX, minY, maxX - minX, maxY - minY);
    };
    
    Rect.fromCoordsString = function(string, relative) {
        var parts = string.split(/\s+/);
        return Rect.fromCoords( 
            unitsToPx(parts[0], relative && relative.width),
            unitsToPx(parts[1], relative && relative.height),
            unitsToPx(parts[2], relative && relative.width),
            unitsToPx(parts[3], relative && relative.height)
        ) ;
    };
    
    Rect.fromString = function(string, relative) {
        var parts = string.split(/\s+/);
            
        return new Rect( 
            unitsToPx(parts[0], relative && relative.width),
            unitsToPx(parts[1], relative && relative.height),
            unitsToPx(parts[2], relative && relative.width),
            unitsToPx(parts[3], relative && relative.height)
        ) ;
    };
    
    
    var Inset = geometry.Inset = function(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = arguments.length <3 ? top : bottom;
        this.left = arguments.length <4 ? right : left;
    };
    
    Inset.prototype = {
        toString: function() {
            return [this.top, this.right, this.bottom, this.left].join(' ');
        },
        
        clone: function() {
            return new Inset(this.top, this.right, this.bottom, this.left);
        }
    };
    
    Inset.fromString = function(string, relative) {
        var parts = string.split(/\s+/);
        if (parts.length < 3) parts[2] = parts[0];
        if (parts.length < 4) parts[3] = parts[1];
        
        return new Inset(
            unitsToPx(parts[0], relative),
            unitsToPx(parts[1], relative),
            unitsToPx(parts[2], relative),
            unitsToPx(parts[3], relative)
        );
    };
    
    
    function unitsToPx (units, relative) {
        var m = (units + '').match(/([-0-9\.]+)(\S*)/),
            v = parseFloat(m[1], 10),
            u = (m[2] || '').toLowerCase();
            
        if (u) {
            // if (u == 'px') v = v;
            if (u == '%' && relative) v *= relative / 100;
        }
        if (v < 0 && relative) v = relative + v;
        return v;
    }
    
})();
