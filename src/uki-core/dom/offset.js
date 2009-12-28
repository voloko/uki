include('../dom.js');

(function() {
    var self;
    
    if ( doc.documentElement["getBoundingClientRect"] ) {
    	self = uki.dom.offset = function( elem ) {
    		if ( !elem || elem == root ) return new Point();
    		if ( elem === elem.ownerDocument.body ) return self.bodyOffset( elem );
    		self.boxModel === undefined && self.initializeBoxModel();
    		var box  = elem.getBoundingClientRect(), 
    		    doc = elem.ownerDocument, 
    		    body = doc.body, 
    		    docElem = doc.documentElement,
    			clientTop = docElem.clientTop || body.clientTop || 0, 
    			clientLeft = docElem.clientLeft || body.clientLeft || 0,
    			top  = box.top  + (self.pageYOffset || self.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
    			left = box.left + (self.pageXOffset || self.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;

    		return new Point(left, top);
    	};
    } else {
    	self = uki.dom.offset = function( elem ) {
    		if ( !elem || elem == root ) return new Point();
    		if ( elem === elem.ownerDocument.body ) return self.bodyOffset( elem );
    		self.initialized || self.initialize();

    		var offsetParent = elem.offsetParent, 
    		    prevOffsetParent = elem,
    			doc = elem.ownerDocument, 
    			computedStyle, 
    			docElem = doc.documentElement,
    			body = doc.body, 
    			defaultView = doc.defaultView,
    			prevComputedStyle = defaultView.getComputedStyle(elem, null),
    			top = elem.offsetTop, 
    			left = elem.offsetLeft;

    		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
    			computedStyle = defaultView.getComputedStyle(elem, null);
    			top -= elem.scrollTop; 
    			left -= elem.scrollLeft;
			
    			if ( elem === offsetParent ) {
    				top += elem.offsetTop; 
    				left += elem.offsetLeft;
				
    				if ( self.doesNotAddBorder && !(self.doesAddBorderForTableAndCells && (/^t(able|d|h)$/i).test(elem.tagName)) ) {
    					top  += parseInt( computedStyle.borderTopWidth,  10) || 0;
    					left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
    				}
    				prevOffsetParent = offsetParent; 
    				offsetParent = elem.offsetParent;
    			}
    			if ( self.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
    				top  += parseInt( computedStyle.borderTopWidth,  10) || 0;
    				left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
    			}
    			prevComputedStyle = computedStyle;
    		}

    		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
    			top  += body.offsetTop;
    			left += body.offsetLeft;
    		}

    		if ( prevComputedStyle.position === "fixed" ) {
    			top  += MAX(docElem.scrollTop, body.scrollTop);
    			left += MAX(docElem.scrollLeft, body.scrollLeft);
    		}

    		return new Point(left, top);
    	};
    }

    uki.extend(self, {
    	initialize: function() {
    		if ( this.initialized ) return;
    		var body = doc.body, 
    		    container = doc.createElement('div'), 
    		    innerDiv, checkDiv, table, td, rules, prop, 
    		    bodyMarginTop = body.style.marginTop,
    			html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';

    		rules = { position: 'absolute', top: 0, left: 0, margin: 0, border: 0, width: '1px', height: '1px', visibility: 'hidden' };
    		for ( prop in rules ) container.style[prop] = rules[prop];

    		container.innerHTML = html;
    		body.insertBefore(container, body.firstChild);
    		innerDiv = container.firstChild; 
    		checkDiv = innerDiv.firstChild; 
    		td = innerDiv.nextSibling.firstChild.firstChild;

    		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
    		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

    		innerDiv.style.overflow = 'hidden'; 
    		innerDiv.style.position = 'relative';
    		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

    		body.style.marginTop = '1px';
    		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop === 0);
    		body.style.marginTop = bodyMarginTop;
		
    		body.removeChild(container);
    		this.boxModel === undefined && this.initializeBoxModel();
    		this.initialized = true;
    	},
    	
    	initializeBoxModel: function() {
    	    if (this.boxModel !== undefined) return;
    		var div = doc.createElement("div");
    		div.style.width = div.style.paddingLeft = "1px";

    		doc.body.appendChild( div );
    		this.boxModel = div.offsetWidth === 2;
    		doc.body.removeChild( div ).style.display = 'none';
    	},

    	bodyOffset: function(body) {
    		self.initialized || self.initialize();
    		var top = body.offsetTop, left = body.offsetLeft;
    		if ( uki.dom.doesNotIncludeMarginInBodyOffset ) {
    			top  += parseInt( uki.dom.elem.currentStyle(body).marginTop, 10 ) || 0;
    			left += parseInt( uki.dom.elem.currentStyle(body).marginLeft, 10 ) || 0;
    		}
    		return new Point(left, top);
    	}
    });    
})();
