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
            this.origin = new Point(arguments[0], arguments[1]);
            this.size   = new Size(arguments[2], arguments[3]);
        } else {
            this.origin = origin || new Point();
            this.size   = size   || new Size();
        }
    };
    
    Rect.prototype = {
        toString: function() {
            return this.origin + ' ' + this.size;
        },
        
        toCoordsString: function() {
            return this.origin + ' ' + (new Point(this.maxX(), this.maxY()));
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
            if (arguments.length > 0) this.size.width = val;
            return this.size.width;
        },
        
        height: function(val) {
            if (arguments.length > 0) this.size.height = val;
            return this.size.height;
        },
        
        isEmpty: function() {
            return this.size.width <= 0.0 || this.size.height <= 0.0;
        },
        
        eq: function(rect) {
            return rect && this.size.eq(rect.size) && this.origin.eq(rect.origin);
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
    
    Rect.fromCoords = function(minX, minY, maxX, maxY) {
        if (arguments.length == 2) {
            return new Rect(
                new Point(arguments[0].x, arguments[0].y), 
                new Size(arguments[1].x - arguments[0].x, arguments[1].y - arguments[0].y)
            );
        }
        return new Rect(new Point(minX, minY), new Size(maxX - minX, maxY - minY));
    };
    
    Rect.fromCoordsString = function(string, relative) {
        var rawParts = string.split(/\s+/),
            parts = [[rawParts[0], rawParts[1]].join(' '), [rawParts[2], rawParts[3]].join(' ')];
        return Rect.fromCoords( 
            Point.fromString( parts[0], relative ), 
            Point.fromString( parts[1], relative ) 
        ) ;
    };
    
    Rect.fromString = function(string, relative) {
        var rawParts = string.split(/\s+/),
            parts = [[rawParts[0], rawParts[1]].join(' '), [rawParts[2], rawParts[3]].join(' ')];
            
        return new Rect( 
            Point.fromString( parts[0], relative ), 
            Size.fromString( parts[1], relative ) 
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
