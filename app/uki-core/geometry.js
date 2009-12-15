include('uki.js');

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
        
        empty: function() {
            return this.width <= 0 || this.height <= 0;
        },
        
        constructor: Size
    };
    
    Size.fromString = function(string, relative) {
        var parts = string.split(/\s+/);
        return new Size( unitsToPx(parts[0], relative && relative.width), unitsToPx(parts[1], relative && relative.height) );
    };
    
    Size.create = function(a1, a2) {
        if (a1 === undefined) return null;
        if (/\S+\s+\S+/.test(a1 + '')) return Size.fromString(a1, a2);
        return new Size(a1, a2);
    };
    
    

    var Rect = geometry.Rect = function(a1, a2, a3, a4) {
        if (a3 !== undefined) {
            this.x      = a1;
            this.y      = a2;
            this.width  = a3;
            this.height = a4;
        } else if (a1 === undefined || a1.x === undefined) {
            this.x      = 0;
            this.y      = 0;
            this.width  = a1 || 0;
            this.height = a2 || 0;
        } else {
            this.x      = a1 ? a1.x      : 0;
            this.y      = a1 ? a1.y      : 0;
            this.width  = a2 ? a2.width  : 0;
            this.height = a2 ? a2.height : 0;
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
        
        normalize: function() {
            this.x = this.y = 0;
            return this;
        },
        
        empty: function() {
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
            return size.empty() ? new Rect() : new Rect(origin, size);
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
        if (maxX === undefined) {
            return new Rect(
                minX.x, 
                minX.y, 
                minY.x - minX.x, 
                minY.y - minX.y
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
        
        if (parts.length > 2) return new Rect( 
            unitsToPx(parts[0], relative && relative.width),
            unitsToPx(parts[1], relative && relative.height),
            unitsToPx(parts[2], relative && relative.width),
            unitsToPx(parts[3], relative && relative.height)
        );
        return new Rect( 
            unitsToPx(parts[0], relative && relative.width),
            unitsToPx(parts[1], relative && relative.height)
        ) ;
    };
    
    Rect.create = function(a1, a2, a3, a4) {
        if (a1 === undefined) return null;
        if (a1.x !== undefined) return a1;
        if (/\S+\s+\S+/.test(a1 + '')) return Rect.fromString(a1, a2);
        if (a3 === undefined) return new Rect(a1, a2);
        return new Rect(a1, a2, a3, a4);
    };
    
    
    var Inset = geometry.Inset = function(top, right, bottom, left) {
        this.top    = top   || 0;
        this.right  = right || 0;
        this.bottom = bottom === undefined ? this.top : bottom;
        this.left   = left === undefined ? this.right : left;
    };
    
    Inset.prototype = {
        toString: function() {
            return [this.top, this.right, this.bottom, this.left].join(' ');
        },
        
        clone: function() {
            return new Inset(this.top, this.right, this.bottom, this.left);
        },
        
        negative: function() {
            return this.top < 0 || this.left < 0 || this.right < 0 || this.bottom < 0;
        },
        
        empty: function() {
            return !this.top && !this.left && !this.right && !this.bottom;
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
    
    Inset.create = function(a1, a2, a3, a4) {
        if (a1 === undefined) return null;
        if (/\S+\s+\S+/.test(a1 + '')) return Inset.fromString(a1, a2);
        if (a3 === undefined) return new Inset(a1, a2);
        return new Inset(a1, a2, a3, a4);
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
