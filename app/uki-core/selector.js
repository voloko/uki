include('uki.js');
include('collection.js');

/* Ideas and code parts borrowed from Sizzle (http://sizzlejs.com/) */
(function() {
    var self,
        marked = '__selector_marked',
        attr = uki.attr,
        chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
        regexps = [ // enforce order
    		{ name: 'ID', regexp: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/ },
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
    		
    		ID: function(comp, match) {
    		    return reducers.ATTR(comp, ['', 'id', '=', '', match[1]]);
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
    		    return flatten(uki.map(context, 'childViews'));
    		},
    		
    		"": function(context) {
    		    return recChildren(flatten(uki.map(context, 'childViews')));
    		},
    		
    		"~": function(context){
    		}	        
	    };
	
	function recChildren (comps) {
	    return flatten(uki.map(comps, function(comp) {
	        return [comp].concat( recChildren(attr(comp, 'childViews')) );
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
                    
                    /*jsl:ignore*/
                    if (match = exprItem.match(row.regexp)) {
                    /*jsl:end*/
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
