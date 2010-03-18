include('uki.js');

/** 
 * Geometry 
 * 
 * @namespace
 */
uki.geometry = {};


/**
 * Point with x and y properties
 *
 * @author voloko
 * @name uki.geometry.Point
 * @constructor
 *
 * @param {Integer=} x defaults to 0
 * @param {Integer=} y defaults to 0
 */
var Point = uki.geometry.Point = function(x, y) {
    this.x = x*1.0 || 0.0;
    this.y = y*1.0 || 0.0;
};

Point.prototype = /** @lends uki.geometry.Point.prototype */ {
    
    /**
     * Converts to "100 50" string
     *
     * @this {uki.geometry.Point}
     * @return {string}
     */
    toString: function() {
        return this.x + ' ' + this.y;
    },
    
    /**
     * Creates a new Point with the same properties
     *
     * @this {uki.geometry.Point}
     * @return {uki.geometry.Point}
     */
    clone: function() {
        return new Point(this.x, this.y);
    },
    
    /**
     * Checks if this equals to another Point
     *
     * @param {uki.geometry.Point} point Point to compare with
     * @this {uki.geometry.Point}
     * @return {boolean}
     */
    eq: function(point) {
        return this.x == point.x && this.y == point.y;
    },
    
    /**
     * Moves point by x, y
     *
     * @this {uki.geometry.Point}
     * @return {uki.geometry.Point} self
     */
    offset: function(x, y) {
        if (typeof x == 'object') {
            y = x.y;
            x = x.x;
        }
        this.x += x;
        this.y += y;
        return this;
    },
    
    constructor: Point
};

/**
 * Creates point from "x y" string
 *
 * @memberOf uki.geometry.Point
 * @name fromString
 * @function
 *
 * @param {string} string String representation of point
 *
 * @returns {uki.geometry.Point} created point
 */
Point.fromString = function(string) {
    var parts = string.split(/\s+/);
    return new Point( parts[0], parts[1] );
};


/**
 * Size with width and height properties
 *
 * @param {number=} width defaults to 0
 * @param {number=} height defaults to 0
 * @name uki.geometry.Size
 * @constructor
 */
var Size = uki.geometry.Size = function(width, height) {
    this.width  = width*1.0 || 0.0;
    this.height = height*1.0 || 0.0;
};

Size.prototype = /** @lends uki.geometry.Size.prototype */ {
    /**
     * Converts size to "300 100" string
     *
     * @this {uki.geometry.Size}
     * @return {string} 
     */
    toString: function() {
        return this.width + ' ' + this.height;
    },
    
    /**
     * Creates a new Size with same properties
     *
     * @this {uki.geometry.Size}
     * @return {uki.geometry.Size} new Size
     */
    clone: function() {
        return new Size(this.width, this.height);
    },
    
    /**
     * Checks if this equals to another Size
     *
     * @param {uki.geometry.Size} size Size to compare with
     * @this {uki.geometry.Size}
     * @return {boolean}
     */
    eq: function(size) {
        return this.width == size.width && this.height == size.height;
    },
    
    /**
     * Checks if this size has non-positive width or height
     *
     * @this {uki.geometry.Size}
     * @return {boolean}
     */
    empty: function() {
        return this.width <= 0 || this.height <= 0;
    },
    
    constructor: Size
};

/**
 * Creates size from "width height" string
 *
 * @memberOf uki.geometry.Size
 * @name fromString
 * @function
 *
 * @param {string} string String representation of size
 *
 * @returns {uki.geometry.Size} created size
 */
Size.fromString = function(string) {
    var parts = string.split(/\s+/);
    return new Size( parts[0], parts[1] );
};

/**
 * Creates size from different representations
 * - if no params given returns null
 * - if uki.geometry.Size given returns it
 * - if "200 300" string converts it to size
 * - if two params given creates size from them
 *
 * @memberOf uki.geometry.Size
 * @name create
 * @function
 *
 * @param {...string|number|uki.geometry.Size} var_args Size representation
 *
 * @returns {uki.geometry.Size} created size
 */
Size.create = function(a1, a2) {
    if (a1 === undefined) return null;
    if (a1.width !== undefined) return a1;
    if (/\S+\s+\S+/.test(a1 + '')) return Size.fromString(a1, a2);
    return new Size(a1, a2);
};


/**
 * Rectangle with x, y, width and height properties
 * May be used as uki.geometry.Point or uki.geometry.Size
 * - if 4 arguments given creates size with x,y,width,height set to the given arguments
 * - if 2 number arguments given creates size with x = y = 0 and width and height set
 *   set to the given arguments
 * - if a Point and a Size given creates rect with point as an origin and given size
 *
 * @param {...number|uki.geometry.Point|uki.geometry.Size} var_args
 * @name uki.geometry.Rect
 * @augments uki.geometry.Size
 * @augments uki.geometry.Point
 * @constructor
 */
var Rect = uki.geometry.Rect = function(a1, a2, a3, a4) {
    if (a3 !== undefined) {
        this.x      = a1*1.0 || 0.0;
        this.y      = a2*1.0 || 0.0;
        this.width  = a3*1.0 || 0.0;
        this.height = a4*1.0 || 0.0;
    } else if (a1 === undefined || a1.x === undefined) {
        this.x      = 0;
        this.y      = 0;
        this.width  = a1*1.0 || 0.0;
        this.height = a2*1.0 || 0.0;
    } else {
        this.x      = a1 ? a1.x*1.0      : 0;
        this.y      = a1 ? a1.y*1.0      : 0;
        this.width  = a2 ? a2.width*1.0  : 0;
        this.height = a2 ? a2.height*1.0 : 0;
    }
};

Rect.prototype = /** @lends uki.geometry.Rect.prototype */ {
    /**
     * Converts Rect to "x y width height" string
     *
     * @this {uki.geometry.Rect}
     * @returns {string}
     */
    toString: function() {
        return [this.x, this.y, this.width, this.height].join(' ');
    },
    
    /**
     * Converts Rect to "x y maxX maxY" string
     *
     * @this {uki.geometry.Rect}
     * @returns {string}
     */
    toCoordsString: function() {
        return [this.x, this.y, this.maxX(), this.maxY()].join(' ');
    },
    
    /**
     * Creates a new Rect with same properties
     *
     * @this {uki.geometry.Size}
     * @return {uki.geometry.Size} new Size
     */
    clone: function() {
        return new Rect(this.x, this.y, this.width, this.height);
    },
    
    /**
     * Equals to .x
     *
     * @this {uki.geometry.Rect}
     * @returns {number}
     */
    minX: function() {
        return this.x;
    },
    
    /**
     * Equals to x + width
     *
     * @this {uki.geometry.Rect}
     * @returns {number}
     */
    maxX: function() {
        return this.x + this.width;
    },
    
    /**
     * Point between minX and maxX
     *
     * @this {uki.geometry.Rect}
     * @returns {number}
     */
    midX: function() {
        return this.x + this.width / 2.0;
    },
    
    /**
     * Equals to .y
     *
     * @this {uki.geometry.Rect}
     * @returns {number}
     */
    minY: function() {
        return this.y;
    },
    
    /**
     * Point between minY and maxY
     *
     * @this {uki.geometry.Rect}
     * @returns {number}
     */
    midY: function() {
        return this.y + this.height / 2.0;
    },
    
    /**
     * Equals to y + height
     *
     * @this {uki.geometry.Rect}
     * @returns {number}
     */
    maxY: function() {
        return this.y + this.height;
    },
    
    /**
     * Moves origin to 0,0 point
     *
     * @this {uki.geometry.Rect}
     * @returns {uki.geometry.Point} self
     */
    normalize: function() {
        this.x = this.y = 0;
        return this;
    },
    
    /**
     * Checks if this rect has non-positive width or height
     *
     * @this {uki.geometry.Rect}
     * @function
     * @return {boolean}
     */
    empty: Size.prototype.empty,
    
    /**
     * Checks if this equals to another Rect
     *
     * @param {uki.geometry.Rect} rect Rect to compare with
     * @this {uki.geometry.Rect}
     * @return {boolean}
     */
    eq: function(rect) {
        return rect && this.x == rect.x && this.y == rect.y && this.height == rect.height && this.width == rect.width;
    },
    
    /**
     * Insets size with dx and dy
     *
     * @param {number} dx
     * @param {number} dy
     * @this {uki.geometry.Rect}
     * @returns {uki.geometry.Rect} sefl
     */
    inset: function(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.width -= dx*2.0;
        this.height -= dy*2.0;
        return this;
    },
    
    /**
     * Moves origin point by x, y
     *
     * @this {uki.geometry.Rect}
     * @function
     * @return {uki.geometry.Rect} self
     */
    offset: Point.prototype.offset,
    
    /**
     * Intersects this with given rect
     *
     * @this {uki.geometry.Rect}
     * @param {uki.geometry.Rect} rect Rect to intersect with
     * @returns {uki.geometry.Rect} intersection
     */
    intersection: function(rect) {
        var origin = new Point(
                MAX(this.x, rect.x),
                MAX(this.y, rect.y)
            ),
            size = new Size(
                MIN(this.maxX(), rect.maxX()) - origin.x,
                MIN(this.maxY(), rect.maxY()) - origin.y
            );
        return size.empty() ? new Rect() : new Rect(origin, size);
    },
    
    /**
     * Union rect of this and given rect
     *
     * @this {uki.geometry.Rect}
     * @param {uki.geometry.Rect} rect
     * @returns {uki.geometry.Rect} union
     */
    union: function(rect) {
        return Rect.fromCoords(
            MIN(this.x, rect.x),
            MIN(this.y, rect.y),
            MAX(this.maxX(), rect.maxX()),
            MAX(this.maxY(), rect.maxY())
        );
    },
    
    /**
     * Checks if point is within this
     *
     * @this {uki.geometry.Rect}
     * @param {uki.geometry.Point} point
     * @returns {boolean}
     */
    containsPoint: function(point) {
        return point.x >= this.minX() &&
               point.x <= this.maxX() &&
               point.y >= this.minY() &&
               point.y <= this.maxY();    
    },
    
    /**
     * Checks if this contains given rect
     *
     * @this {uki.geometry.Rect}
     * @param {uki.geometry.Rect} rect
     * @returns {boolean}
     */
    containsRect: function(rect) {
        return this.eq(this.union(rect));
    },
    
    constructor: Rect
};

Rect.prototype.left = Rect.prototype.minX;
Rect.prototype.top  = Rect.prototype.minY;

/**
 * Creates Rect from minX, minY, maxX, maxY
 *
 * @memberOf uki.geometry.Rect
 * @name fromCoords
 * @function
 *
 * @param {number} minX
 * @param {number} maxX
 * @param {number} minY
 * @param {number} maxY
 * @returns {uki.geometry.Rect}
 */
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

/**
 * Creates Rect from "minX minY maxX maxY" string
 *
 * @memberOf uki.geometry.Rect
 * @name fromCoordsString
 * @function
 *
 * @param {string} string
 * @returns {uki.geometry.Rect}
 */
Rect.fromCoordsString = function(string) {
    var parts = string.split(/\s+/);
    return Rect.fromCoords( 
        parts[0],
        parts[1],
        parts[2],
        parts[3]
    ) ;
};

/**
 * Creates Rect from "x y width height" or "width height" string
 *
 * @memberOf uki.geometry.Rect
 * @name fromString
 * @function
 *
 * @param {string} string
 * @returns {uki.geometry.Rect}
 */
Rect.fromString = function(string) {
    var parts = string.split(/\s+/);
    
    if (parts.length > 2) return new Rect( 
        parts[0],
        parts[1],
        parts[2],
        parts[3]
    );
    return new Rect( 
        parts[0],
        parts[1]
    ) ;
};

/**
 * Creates rect from different representations
 * - if no params given returns null
 * - if uki.geometry.Rect given returns it
 * - if "200 300" or "0 10 200 300" string converts it to rect
 * - if two or four params given creates rect from them
 *
 * @memberOf uki.geometry.Rect
 * @name creates
 * @function
 *
 * @param {...string|number|uki.geometry.Rect} var_args Rect representation
 *
 * @returns {uki.geometry.Rect} created size
 */
Rect.create = function(a1, a2, a3, a4) {
    if (a1 === undefined) return null;
    if (a1.x !== undefined) return a1;
    if (/\S+\s+\S+/.test(a1 + '')) return Rect.fromString(a1, a2);
    if (a3 === undefined) return new Rect(a1, a2);
    return new Rect(a1, a2, a3, a4);
};


/**
 * Inset with top, right, bottom and left properties
 * - if no params given top = right = bottom = left = 0
 * - if two params given top = bottom and right = left
 *
 * @param {number=} top
 * @param {number=} right
 * @param {number=} bottom
 * @param {number=} left
 *
 * @name uki.geometry.Inset
 * @constructor
 */
var Inset = uki.geometry.Inset = function(top, right, bottom, left) {
    this.top    = top*1.0   || 0;
    this.right  = right*1.0 || 0;
    this.bottom = bottom === undefined ? this.top*1.0 : bottom*1.0;
    this.left   = left === undefined ? this.right*1.0 : left*1.0;
};

Inset.prototype = /** @lends uki.geometry.Inset.prototype */ {
    
    /**
     * Converts Inset to "top right bottom left" string
     *
     * @returns {string}
     */
    toString: function() {
        return [this.top, this.right, this.bottom, this.left].join(' ');
    },
    
    /**
     * Creates a new Inset with same properties
     *
     * @this {uki.geometry.Inset}
     * @return {uki.geometry.Inset} new Inset
     */
    clone: function() {
        return new Inset(this.top, this.right, this.bottom, this.left);
    },
    
    /**
     * left + right
     *
     * @this {uki.geometry.Inset}
     * @return {number}
     */
    width: function() {
        return this.left + this.right;
    },
    
    /**
     * top + bottom
     *
     * @this {uki.geometry.Inset}
     * @return {number}
     */
    height: function() {
        return this.top + this.bottom;
    },
    
    /**
     * True if any property < 0
     *
     * @this {uki.geometry.Inset}
     * @return {boolean}
     */
    negative: function() {
        return this.top < 0 || this.left < 0 || this.right < 0 || this.bottom < 0;
    },
    
    /**
     * True if all properties = 0
     *
     * @this {uki.geometry.Inset}
     * @return {boolean}
     */
    empty: function() {
        return !this.top && !this.left && !this.right && !this.bottom;
    }
};

/**
 * Creates Rect from "top right bottom left" or "top right" string
 *
 * @memberOf uki.geometry.Inset
 * @name fromString
 * @function
 *
 * @param {string} string
 * @returns {uki.geometry.Inset}
 */
Inset.fromString = function(string) {
    var parts = string.split(/\s+/);
    if (parts.length < 3) parts[2] = parts[0];
    if (parts.length < 4) parts[3] = parts[1];
    
    return new Inset(
        parts[0],
        parts[1],
        parts[2],
        parts[3]
    );
};

/**
 * Creates rect from different representations
 * - if no params given returns null
 * - if uki.geometry.Inset given returns it
 * - if "200 300" or "0 10 200 300" string converts it to inset
 * - if two or four params given creates inset from them
 *
 * @memberOf uki.geometry.Inset
 * @name create
 * @function
 *
 * @param {...string|number|uki.geometry.Inset} var_args Rect representation
 *
 * @returns {uki.geometry.Inset} created inset
 */
Inset.create = function(a1, a2, a3, a4) {
    if (a1 === undefined) return null;
    if (a1.top !== undefined) return a1;
    if (/\S+\s+\S+/.test(a1 + '')) return Inset.fromString(a1, a2);
    if (a3 === undefined) return new Inset(a1, a2);
    return new Inset(a1, a2, a3, a4);
};