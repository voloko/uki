include('../uki.js');
include('utils.js');

(function() {
 
var guid = 1,
    expando = 'uki' + (+new Date),
    root = this,
    doc = root.document;
   
uki.dom = {
    bound: {},
    handles: {},
    
    createElement: function(tagName, cssText, innerHTML) {
        var e = doc.createElement(tagName);            
        if (cssText) e.style.cssText = cssText;
        if (innerHTML) e.innerHTML = innerHTML;
        e[expando] = guid++;
        return e;
    },
    
    probe: function(div, callback) {
        doc.body.appendChild(div);
        callback(div);
        doc.body.removeChild(div);
    },
    
    layout: function(style, layout, prevLayout) {
        prevLayout = prevLayout || {};
        if (prevLayout.left   != layout.left)   style.left   = layout.left + 'px';
        if (prevLayout.top    != layout.top)    style.top    = layout.top + 'px';
        if (prevLayout.right  != layout.right)  style.right  = layout.right + 'px';
        if (prevLayout.bottom != layout.bottom) style.bottom = layout.bottom + 'px';
        if (prevLayout.width  != layout.width)  style.width  = layout.width + 'px';
        if (prevLayout.height != layout.height) style.height = layout.height + 'px';
        return layout;
    },
    
    events: ("blur,focus,load,resize,scroll,unload,click,dblclick," +
    	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
    	"change,select,submit,keydown,keypress,keyup,error").split(","),

    bind: function(el, types, handler) {
		if ( el.setInterval && el != window )
			el = window;
			
        handler.huid = handler.huid || guid++;
        
        var id = el[expando] = el[expando] || guid++,
            handle = uki.dom.handles[id] = uki.dom.handles[id] || function() {
                uki.dom.handler.apply(arguments.callee.elem, arguments);
            },
            i, type;
            
        handle.elem = el;
        
        if (!uki.dom.bound[id]) uki.dom.bound[id] = {};
        
        types = types.split(' ');
        for (i=0; i < types.length; i++) {
            type = types[i];
            if (!uki.dom.bound[id][type]) {
                el.addEventListener ? el.addEventListener(type, handle, false) : el.attachEvent('on' + type, handle);
                uki.dom.bound[id][type] = [];
            }
            uki.dom.bound[id][type].push(handler);
        };
        handler = handle = el = null;
    },
    
    unbind: function(el, type, handler) {
        var id = el[expando],
            huid = handler.huid;
        if (!huid || !id || !uki.dom.bound[id] || !uki.dom.bound[id][type]) return;
        uki.dom.bound[id][type] = uki.grep(uki.dom.bound[id][type], function(h) { return h.huid !== huid; });
    },
    
    handler: function( e ) {
        e = uki.dom.fix( e || root.event );

        var type = e.type,
            id = this[expando],
            handlers = uki.dom.bound[id],
            i;
            
        if (!id || !handlers || !handlers[type]) return;
        
        for (i=0, handlers = handlers[type]; i < handlers.length; i++) {
            handlers[i].call(this, e);
        };
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
			try { event.metaKey = event.ctrlKey } catch(e){};

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));    
			
		return event;    
    },
    
    computedStyle: function(el) {
        if (doc && doc.defaultView && doc.defaultView.getComputedStyle) {
            return doc.defaultView.getComputedStyle( el, null );
        } else if (el.currentStyle) {
            return el.currentStyle;
        }
    },
    
    _preventSelectionHandler: function(e) { 
		e.preventDefault ? e.preventDefault() : e.returnValue = true;
    }
    
};

if (root.attachEvent) {
    root.attachEvent('onunload', function() {
        uki.each(uki.dom.bound, function(id, types) {
            uki.each(types, function(type, handlers) {
                try {
                    uki.dom.handles[id].elem.detachEvent('on' + type, uki.dom.handles[id]);
                } catch (e) {};
            });
        });
    });
};

uki.each(['createElement'], function(i, name) {
    uki[name] = uki.dom[name];
});

})();