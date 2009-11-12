include('../core.js');
include('attr.js');

/* Ideas and code parts borrowed from Sizzle (http://sizzlejs.com/) */
(function() {
    var self,
        attr = uki.core.attr,
        chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
        regexps = {
    		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
    		TYPE: /^((?:[\w\u00c0-\uFFFF\*_\.-]|\\.)+)/
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
    			    value = value + '',
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
    		}
	    },
	    mappers = {
    		"+": function(expr, context){
    		    var set = flatten
    		        (
            		    uki.map(context, function(comp) { return attr(comp, 'children') || []; })
        		    );
    		    return self.map(expr, self.reduce(expr, set));
    		},
    		
    		">": function(expr, context){
    		},
    		
    		"": function(expr, context){
                var originalExpr = [].concat(expr),
                    found = self.reduce(expr, context),
                    result = [],
                    i;
                    
                if (expr.length == 0) {
                    result = result.concat(found);
                } else {
                    for (i=0; i < found.length; i++) {
                        result = result.concat( mappers['']([].concat(expr), attr(found[i], 'children')) );
                    };
                }
                
                for (i=0; i < context.length; i++) {
                    result = result.concat( mappers['']([].concat(originalExpr), attr(context[i], 'children')) );
                };
                return result;
    		},
    		
    		"~": function(expr, context){
    		}	        
	    };
	    
	function flatten (array) {
	   return uki.reduce( [], array, reduceFlatten )
	}
	    
	function reduceFlatten (x, e) {
	   return x.concat(e);
	}
	    
    self = uki.core.Selector = {
        find: function(selector, context) {
            context = context || uki.topLevel;
            
            var tokens = self.tokenize(selector),
                expr   = tokens[0],
                extra  = tokens[1],
                result = self.map([].concat(expr), context);

            if (extra) {
                result = result.concat(self.find(extra, context));
            }
            return result;
        },
        
        map: function(expr, context) {
            if (!expr || !expr.length) return context;
            
            var mapper = mappers[expr[0]] ? mappers[expr.shift()] : mappers[''];
            return mapper(expr, context);
        },
        
        reduce: function(expr, context) {
            if (!context || !context.length) return [];
            
            if (!expr || !expr.length) return context;
            
            var current = expr.shift(),
                match, found;
                
            while (current != '') {
                found = false;
                uki.each(regexps, function(name, regexp) {
                    if (match = current.match(regexp)) {
                        found = true;
                        context = uki.grep(context, function(comp) { return reducers[name](comp, match) });
                        current = current.replace(regexp, '');
                        return false;
                    }
                });
                if (!found) break;
            }
            return context;
        },
        
        tokenize: function(expr) {
        	var parts = [], m, extra;

        	// Reset the position of the chunker regexp (start from head)
        	chunker.lastIndex = 0;

        	while ( (m = chunker.exec(expr)) !== null ) {
        		parts.push( m[1] );

        		if ( m[2] ) {
        			extra = RegExp.rightContext;
        			break;
        		}
        	}
            
            return [parts, extra];
        }
    };
})();
