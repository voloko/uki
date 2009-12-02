include('../dom.js');

if ( document.documentElement["getBoundingClientRect"] ) {
	uki.dom.offset = function( elem ) {
		if ( !elem ) return { top: 0, left: 0 };
		if ( elem === elem.ownerDocument.body ) return jQuery.offset.bodyOffset( elem );
		var box  = elem.getBoundingClientRect(), 
		    doc = elem.ownerDocument, 
		    body = doc.body, 
		    docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0, 
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			top  = box.top  + (self.pageYOffset || uki.dom.offset.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
			left = box.left + (self.pageXOffset || uki.dom.offset.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;
		return { y: top, x: left };
	};
} else {
	uki.dom.offset = function( elem ) {
		if ( !elem ) return { top: 0, left: 0 };
		if ( elem === elem.ownerDocument.body ) return uki.dom.offset.bodyOffset( elem );
		uki.dom.offset.initialized || uki.dom.offset.initialize();

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
				
				if ( uki.dom.offset.doesNotAddBorder && !(uki.dom.offset.doesAddBorderForTableAndCells && (/^t(able|d|h)$/i).test(elem.tagName)) ) {
					top  += parseInt( computedStyle.borderTopWidth,  10) || 0;
					left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
				}
				prevOffsetParent = offsetParent; 
				offsetParent = elem.offsetParent;
			}
			if ( uki.dom.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
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
			top  += Math.max(docElem.scrollTop, body.scrollTop);
			left += Math.max(docElem.scrollLeft, body.scrollLeft);
		}

		return { y: top, x: left };
	};
}

uki.extend(uki.dom.offset, {
	initialize: function() {
		if ( this.initialized ) return;
		var body = document.body, 
		    container = document.createElement('div'), 
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
		
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		this.boxModel = div.offsetWidth === 2;
		document.body.removeChild( div ).style.display = 'none';

		body.removeChild(container);
		this.initialized = true;
	},

	bodyOffset: function(body) {
		uki.dom.initialized || uki.dom.initialize();
		var top = body.offsetTop, left = body.offsetLeft;
		if ( uki.dom.doesNotIncludeMarginInBodyOffset ) {
			top  += parseInt( uki.dom.elem.currentStyle(body).marginTop, 10 ) || 0;
			left += parseInt( uki.dom.elem.currentStyle(body).marginLeft, 10 ) || 0;
		}
		return { y: top, x: left };
	}
});