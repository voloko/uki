uki = {};


/* Reap off JQuery */
(function() {

var toString = Object.prototype.toString;
	
var utils = uki.utils = {
    
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
                if ( !name || !object[ name ] || !object.hasOwnProperty(name) ) continue;
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
        var ret = [],
            mapper = utils.isFunction(callback) ? callback : 
                     function(e) { return utils.isFunction(e[callback]) ? e[callback]() : e[callback] };

        for ( var i = 0, length = elems.length; i < length; i++ ) {
            var value = mapper.call( context || elems[ i ], elems[ i ], i );

            if ( value != null ) { ret[ ret.length ] = value; }
        }

        return ret;
    },
    
    reduce: function( initial, elems, callback, context ) {
        for ( var i = 0, length = elems.length; i < length; i++ ) {
            initial = callback.call( context || elems[ i ], initial, elems[ i ], i );
        }
        return initial;
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
    },
    
    newClass: function(/* base1, base2 */ methods) {
        var klass = function() {
            this.init.apply(this, arguments);
        };
        uki.each(arguments, function() {
            uki.extend(klass.prototype, this);
        })
        return klass;
    }
};

utils.extend(uki, utils);

})();



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





uki.attr = function(comp, attr, value) {
    if (arguments.length > 2) {
        if (uki.isFunction(comp[attr])) {
            comp[attr](value);
        } else {
            comp[attr] = value;
        }
    } else {
        if (uki.isFunction(comp[attr])) {
            return comp[attr]();
        } else {
            return comp[attr];
        }
    }
};









(function() {
 
var guid = 1,
    expando = 'uki' + new Date,
    root = this,
    doc = root.document,
    targets = {
        'resize': root,
        'scroll': root,
        'load'  : root,
        'unload': root
    };
   
var self = uki.dom = {
    bound: {},
    
    createElement: function(tagName, cssText) {
        var e = doc.createElement(tagName);
        if (cssText) e.style.cssText = cssText;
        e[expando] = guid++;
        return e;
    },
    
    events: ("blur,focus,load,resize,scroll,unload,click,dblclick," +
    	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
    	"change,select,submit,keydown,keypress,keyup,error").split(","),

    bind: function(el, type, handler) {
        var id = el[expando] = el[expando] || guid++,
            target = targets[type] || doc;
        
        if (!self.bound[type]) {
            target.addEventListener ? target.addEventListener(type, self.handler, false) : target.attachEvent('on' + type, self.handler);
            self.bound[type] = {};
        }
        if (!self.bound[type][id]) self.bound[type][id] = [];
        self.bound[type][id].push(handler);
    },
    
    unbind: function(el, type, handler) {
        if (!el[expando] || !self.bound[type]) return;
        var id = el[expando];
        self.bound[type][id] = uki.grep(self.bound[type][id], function(h) { return h !== handler; });
    },
    
    handler: function( e ) {
        event = self.fix( e || root.event );
        if (!e.target || !e.target[expando]) return;
        var type = e.type,
            handlers = self.bound[type],
            target = e.target,
            elHandlers,
            id, i, n = 100;
            
        while (n-- && target && target != doc) {
            id = target[expando];
            if (handlers[id] && handlers[id].length) {
                for (i=0, elHandlers = handlers[id]; i < elHandlers.length; i++) {
                    elHandlers[i].apply(target, arguments);
                };
            }
            target = target.parentNode;
        }
    },
    
    /**
     * Taken from jQuery
     */
    fix: function( event ) {
		// Fix target property, if necessary
		if ( !event.target )
			event.target = event.srcElement || doc;

		// check if target is a textnode (safari)
		if ( event.target.nodeType == 3 )
			event.target = event.target.parentNode;

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement )
			event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var de = doc.documentElement, body = doc.body;
			event.pageX = event.clientX + (de && de.scrollLeft || body && body.scrollLeft || 0) - (de.clientLeft || 0);
			event.pageY = event.clientY + (de && de.scrollTop  || body && body.scrollTop || 0)  - (de.clientTop || 0);
		}

		// Add which for key events
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) )
			event.which = event.charCode || event.keyCode;

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey )
			event.metaKey = event.ctrlKey;

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));        
    }
};

if (root.attachEvent) {
    root.attachEvent('onunload', function() {
       uki.each(self.bound, function(type) {
           (targets[type] || doc).detachEvent('on' + type, self.handler);
       });
    });
};

uki.each(['createElement', 'bind', 'unbind'], function(i, name) {
    uki[name] = self[name];
});

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

(function() {
    var root = this;
    
    var self = uki.Attachment = uki.newClass({
        init: function( dom, view ) {
            this._dom = dom;
            this._view = view;
            dom.appendChild(view.dom());
            self.register(this);
            this.resize();
            uki.layout.perform();
        },
        
        resize: function() {
            this._view.rect(new uki.geometry.Rect(0, 0, this._dom.offsetWidth, this._dom.offsetHeight))
        },
        
        view: function() {
            return this._view;
        }
    });
    
    self.instances = [];
    
    self.register = function(a) {
        if (self.instances.length == 0) {
            uki.dom.bind(root, 'resize', function() {
                uki.each(self.instances, function() { this.resize() });
                uki.layout.perform();
            })
        }
        self.instances.push(a);
    }
    
    self.children = function() {
        return uki.map(self.instances, 'view');
    };
    
    uki.top = function() {
        return [self];
    };
})();



(function() {
    uki.Collection = function( elems ) {
        this.length = 0;
    	Array.prototype.push.apply( this, elems );
    };

    var self = uki.Collection.prototype = {};
    
    self.each = function( callback ) {
        return uki.each( this, callback );
    };
    
    self.attr = function( name, value ) {
        if (arguments.length > 1) {
            this.each(function() {
                uki.attr( this, name, value );
            });
            return this;
        } else {
            return uki.attr( this[0], name );
        }
    };
    
    self.find = function( selector ) {
        return uki.find( selector, this );
    };
    
    self.attachTo = function( node ) {
        this.each(function() {
            new uki.Attachment( node, this );
        });
        return this;
    };
    
    uki.each(['bind', 'unbind', 'trigger'], function(i, name) {
        self[name] = function() {
            for (var i=0; i < this.length; i++) {
                this[i][name].apply(this[i], arguments);
            };
            return this;
        };
    });
})();


(function() {
var root = this,
    attr = uki.attr;

uki.build = function(ml, parent) {
    if (!uki.isArray(ml)) ml = [ml];
    return new uki.Collection(createMulti(ml, parent));
};

function createMulti (ml, parent) {
    return uki.map(ml, function(mlRow) { return createSingle(mlRow, parent) });
}

function createSingle (mlRow, parent) {
    if (uki.isFunction(mlRow.typeName)) {
        if (parent) parent.addChild(mlRow);
        return mlRow;
    }
    
    var c = mlRow.view || mlRow.type,
        result;
    mlRow.type = mlRow.view = undefined;
    if (uki.isFunction(c)) {
        result = c();
    } else if (typeof c === 'string') {
        var parts = c.split('.'),
            obj   = root;
        if (parts.length == 1 && !root[parts[0]]) {
            parts = ['uki', 'component', parts[0]]; // try with default prefix
        }
        for (var i=0; i < parts.length; i++) {
            obj = obj[parts[i]];
        };
        result = new obj();
    } else {
        result = c;
    }
    
    return copyAttrs(result, mlRow, parent);
}

function copyAttrs(comp, mlRow, parent) {
    var orderedAttrs = uki.isFunction(comp.builderAttrs) ? comp.builderAttrs() : [];
    if (parent) parent.addChild(comp);
    uki.each(orderedAttrs, function(i, name) {
        if (mlRow[name]) attr(comp, name, mlRow[name]);
        mlRow[name] = undefined;
    });
    uki.each(mlRow, function(name, value) {
        attr(comp, name, value);
    });
    return comp;
}

    
})();





/* Ideas and code parts borrowed from Sizzle (http://sizzlejs.com/) */
(function() {
    var self,
        marked = '__selector_marked',
        attr = uki.attr,
        chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
        regexps = [ // enforce order
    		{ name: 'ID',   regexp: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/ },
    		{ name: 'ATTR', regexp: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/ },
    		{ name: 'TYPE', regexp: /^((?:[\w\u00c0-\uFFFF\*_\.-]|\\.)+)/ },
    		{ name: 'POS',  regexp: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/ }
	    ],
	    posRegexp = regexps.POS,
	    posFilters = {
    		first: function(i){
    			return i === 0;
    		},
    		last: function(i, match, array){
    			return i === array.length - 1;
    		},
    		even: function(i){
    			return i % 2 === 0;
    		},
    		odd: function(i){
    			return i % 2 === 1;
    		},
    		lt: function(i, match){
    			return i < match[2] - 0;
    		},
    		gt: function(i, match){
    			return i > match[2] - 0;
    		},
    		nth: function(i, match){
    			return match[2] - 0 == i;
    		},
    		eq: function(i, match){
    			return match[2] - 0 == i;
    		}
    	},
	    reducers = {
    		TYPE: function(comp, match) {
    		    var expected = match[1];
    		    if (expected == '*') return true;
    		    var typeName = attr(comp, 'typeName');
    		    return typeName && typeName.length >= expected.length && 
    		           ('.' + typeName).indexOf('.' + expected) == (typeName.length - expected.length);
    		},
    		
    		ATTR: function(comp, match) {
    			var result = attr(comp, match[1]),
    			    value = result + '',
    				type = match[2],
    				check = match[4];
    				
                return result == null ? type === "!=" :
                       type === "="   ? value === check :
                       type === "*="  ? value.indexOf(check) >= 0 :
                       type === "~="  ? (" " + value + " ").indexOf(check) >= 0 :
                       !check         ? value && result !== false :
                       type === "!="  ? value != check :
                       type === "^="  ? value.indexOf(check) === 0 :
                       type === "$="  ? value.substr(value.length - check.length) === check :
                       false;
    		},
    		
    		POS: function(comp, match, i, array) {
    			var filter = posFilters[match[1]];
				return filter ? filter( i, match, array ) : false;
    		}
	    },
	    mappers = {
    		"+": function(context){
    		},
    		
    		">": function(context){
    		    return flatten(uki.map(context, 'children'));
    		},
    		
    		"": function(context) {
    		    return recChildren(flatten(uki.map(context, 'children')));
    		},
    		
    		"~": function(context){
    		}	        
	    };
	
	function recChildren (comps) {
	    return flatten(uki.map(comps, function(comp) {
	        return [comp].concat( recChildren(attr(comp, 'children')) );
	    }));
	}
	    
	function flatten (array) {
	   return uki.reduce( [], array, reduceFlatten );
	}
	    
	function reduceFlatten (x, e) {
	   return x.concat(e);
	}
	
	function removeDuplicates (array) {
	    var result = [],
	        i;
	        
	    for (i = 0; i < array.length; i++) { 
	        if (!array[i][marked]) { result[result.length] = array[i]; }
	        array[i][marked] = true;
	    };
	    for (i = 0; i < result.length; i++) { result[i][marked] = undefined; };
	    return result;
	}
	    
    self = uki.Selector = {
        find: function(selector, context, skipFiltering) {
            context = context || uki.top();
            if (context.length === undefined) context = [context];
            
            var tokens = self.tokenize(selector),
                expr   = tokens[0],
                extra  = tokens[1],
                result = context,
                mapper;
                
            while (expr.length > 0) {
                mapper = mappers[expr[0]] ? mappers[expr.shift()] : mappers[''];
                result = mapper(result);
                if (expr.length == 0) break;
                result = self.reduce(expr.shift(), result);
            }

            if (extra) {
                result = result.concat(self.find(extra, context, true));
            }
            
            return skipFiltering ? result : new uki.Collection(removeDuplicates(result));
        },
        
        reduce: function(exprItem, context) {
            if (!context || !context.length) return [];
            
            var match, found;
                
            while (exprItem != '') {
                found = false;
                uki.each(regexps, function(index, row) {
                    if (match = exprItem.match(row.regexp)) {
                        found = true;
                        context = uki.grep(context, function(comp, index) { 
                            return reducers[row.name](comp, match, index, context); 
                        });
                        exprItem = exprItem.replace(row.regexp, '');
                        return false;
                    }
                });
                if (!found) break;
            }
            return context;
        },
        
        tokenize: function(expr) {
        	var parts = [], match, extra;

        	chunker.lastIndex = 0;

        	while ( (match = chunker.exec(expr)) !== null ) {
        		parts.push( match[1] );

        		if ( match[2] ) {
        			extra = RegExp.rightContext;
        			break;
        		}
        	}
            
            return [parts, extra];
        }
    };
    
    uki.find = self.find;
})();





uki.component = {};







/**
 * Легковесная поддержка событий без баблинга
 */
uki.dom.Observable = {
    dom: function() {
        return null; // should implement
    },
    
    bind: function(name, callback) {
        var _this = this;
        uki.each(name.split(' '), function(i, name) {
            if (uki.inArray( name, uki.dom.events ) == -1) {
                this._observersFor(name).push(callback);
            } else {
                uki.dom.bind( this.dom(), name, function() { callback.apply(_this, arguments) } );
            }
        }, this);
    },
    
    unbind: function(name, callback) {
        uki.each(name.split(' '), function(i, name) {
            if (uki.inArray( name, uki.dom.events ) == -1) {
                this._observers[name] = uki.grep(this._observersFor(name), function(c) {
                    return c !== callback;
                });
            } else {
                uki.dom.unbind( this.dom(), name, callback );
            }
        }, this);
    },
    
    trigger: function(name/*, data1, data2*/) {
        var attrs = Array.prototype.slice.call(arguments, 1);
        uki.each(this._observersFor(name, true), function(i, callback) {
            callback.apply(this, attrs);
        }, this);
    },
    
    _observersFor: function(name, skipCreate) {
        if (skipCreate && (!this._observers || !this._observers[name])) return [];
        if (!this._observers) this._observers = {};
        if (!this._observers[name]) this._observers[name] = [];
        return this._observers[name];
    }
};

(function() {

var ANCHOR_TOP      = 1,
    ANCHOR_RIGHT    = 2,
    ANCHOR_BOTTOM   = 4,
    ANCHOR_LEFT     = 8,

    AUTOSIZE_WIDTH  = 1,
    AUTOSIZE_HEIGHT = 2;
    
var layout = uki.layout,
    utils = uki.utils;

uki.component.Base = uki.newClass(uki.dom.Observable, new function() {
    var proto = this;
    
    proto.defaultCss = 'position:absolute;overflow:hidden;top:0;left:0;z-index:100;';
    
    proto.init = function(rect) {
        this._anchors = 0;
        this._autosize = 0;
        this._parent = null;
        this._rect = null;
        this._children = [];
        this._domCreate();
        
        if (rect) this.rect(rect);
    };
    
    proto.builderAttrs = function() {
        return ['rect', 'coords', 'children'];
    };
    
    proto.typeName = function() {
        return 'uki.component.Base';
    };
    
    proto.children = function(val) {
        if (arguments.length == 0) return this._children;
        uki.each(this._children, function(i, child) {
            this.removeChild(child);
        }, this);
        uki.build(val, this);
    };
    
    proto.removeChild = function(child) {
        this._dom.removeChild(child._dom);
        this._children = uki.grep(this._children, function(elem) { return elem == child });
    };
    
    proto.addChild = function(child) {
        child.parent(this);
        this._dom.appendChild(child.dom());
        this._children.push(child);
    };
    
    proto.parent = function(parent) {
        if (arguments.length == 0) return this._parent;
        
        if (this._parent) this._parent.removeChild(this);
        this._parent = parent;
    };
    
    proto.rect = function(rect) {
        if (arguments.length == 0) return this._rect;

        if (typeof rect === 'string') rect = uki.geometry.Rect.fromString(
            rect, 
            (this._parent ? this._parent.rect().size : undefined)
        );

        if (rect.eq(this._rect)) return;
        
        this._domResize(rect);
        if (this._rect) {
            var oldSize = this._rect.size.clone();
            this._rect = rect;
            for (var i=0; i < this._children.length; i++) {
                this._children[i].resizeWithOldSize(oldSize);
            };
        } else {
            this._rect = rect;
        }
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
        this._dom = uki.createElement('div', this.defaultCss);
        this._domStyle = this._dom.style;
    };
    
    proto.resizeWithOldSize = function(oldSize) {
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
            if (this._anchors & ANCHOR_LEFT  ) result.push('left');
            if (this._anchors & ANCHOR_TOP   ) result.push('top');
            if (this._anchors & ANCHOR_RIGHT ) result.push('right');
            if (this._anchors & ANCHOR_BOTTOM) result.push('bottom');
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
    
});
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
   } 
});
    
})();


(function() {

var Base = uki.component.Base.prototype,
    self = uki.component.Input = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
   _domCreate: function() {
       this._dom = document.createElement('input');
       this._domStyle = this._dom.style;
       this._domStyle.cssText = Base.defaultCss + "-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box";
   } 
});
    
})();


(function() {

var Base = uki.component.Base.prototype,
    self = uki.component.Button = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
   _domCreate: function() {
       this._dom = document.createElement('button');
       this._domStyle = this._dom.style;
       this._domStyle.cssText = Base.defaultCss + "-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box";
   },
   
   typeName: function() {
       return 'uki.component.Button';
   },
   
   text: function() {
       if (arguments.length == 0) return this._dom.innerHTML;
       this._dom.innerHTML = arguments[0];
   }
});
    
})();


(function() {

var Base = uki.component.Base.prototype,
    self = uki.component.Label = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
    typeName: function() {
        return 'uki.component.Label';
    },
    
    _domCreate: function() {
        this._selectable = true;
        this._dom = uki.createElement('div');
        this._domStyle = this._dom.style;
        this._domStyle.cssText = Base.defaultCss + 
            "font-family:Helvetica-Neue,Helvetica,Arial,sans-serif;text-shadow:0 1px 0px rgba(255,255,255,0.8);font-size:12px;line-height:15px;";
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
            return this.dom().style.textAlign;
        } else {
            this.dom().style.textAlign = align;
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