include('../uki.js');
include('utils.js');

(function() {
 
var guid = 1,
    expando = 'uki' + (+new Date),
    root = this,
    doc = root.document;
   
var self = uki.dom = {
    bound: {},
    handles: {},
    
    createElement: function(tagName, cssText) {
        var e = doc.createElement(tagName);            
        if (cssText) e.style.cssText = cssText;
        e[expando] = guid++;
        return e;
    },
    
    layout: function(style, properties) {
        if (properties.left != undefined) style.left = properties.left + 'px';
        if (properties.top != undefined) style.top = properties.top + 'px';
        if (properties.right != undefined) style.right = properties.right + 'px';
        if (properties.bottom != undefined) style.bottom = properties.bottom + 'px';
        if (properties.width != undefined) style.width = properties.width + 'px';
        if (properties.height != undefined) style.height = properties.height + 'px';
    },
    
    events: ("blur,focus,load,resize,scroll,unload,click,dblclick," +
    	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
    	"change,select,submit,keydown,keypress,keyup,error").split(","),

    bind: function(el, types, handler) {
        var id = el[expando] = el[expando] || guid++,
            handle = self.handles[id] = self.handles[id] || function() {
                self.handler.apply(arguments.callee.elem, arguments);
            },
            i, type;
            
        handle.elem = el;
        handler.huid = handler.huid || guid++;
        
        if (!self.bound[id]) self.bound[id] = {};
        
        types = types.split(' ');
        for (i=0; i < types.length; i++) {
            type = types[i];
            if (!self.bound[id][type]) {
                el.addEventListener ? el.addEventListener(type, handle, false) : el.attachEvent('on' + type, handle);
                self.bound[id][type] = [];
            }
            self.bound[id][type].push(handler);
        };
        el = null;
    },
    
    unbind: function(el, type, handler) {
        var id = el[expando],
            huid = handler.huid;
        if (!huid || !id || !self.bound[id] || !self.bound[id][type]) return;
        self.bound[id][type] = uki.grep(self.bound[id][type], function(h) { return h.huid !== huid; });
    },
    
    handler: function( e ) {
        e = self.fix( e || root.event );

        var type = e.type,
            id = this[expando],
            handlers = self.bound[id],
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
			event.metaKey = event.ctrlKey;

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
        uki.each(self.bound, function(id, types) {
            uki.each(types, function(type, handlers) {
                try {
                    self.handles[id].elem.detachEvent('on' + type, self.handles[id]);
                } catch (e) {};
            });
        });
    });
};

uki.each(['createElement'], function(i, name) {
    uki[name] = self[name];
});

})();