include('../uki.js');
include('utils.js');

(function() {
 
var guid = 1,
    expando = 'uki' + (+new Date),
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
        handler.huid = handler.huid || guid++;
        
        if (!self.bound[type]) {
            target.addEventListener ? target.addEventListener(type, self.handler, false) : target.attachEvent('on' + type, self.handler);
            self.bound[type] = {};
        }
        if (!self.bound[type][id]) self.bound[type][id] = [];
        self.bound[type][id].push(handler);
    },
    
    unbind: function(el, type, handler) {
        if (!el[expando] || !self.bound[type]) return;
        var id = el[expando],
            huid = handler.huid;
        if (!huid) return;
        self.bound[type][id] = uki.grep(self.bound[type][id], function(h) { return h.huid !== huid; });
    },
    
    handler: function( e ) {
        e = self.fix( e || root.event );
        // if (e.target == doc) e.target = targets[e.type];
        // if (!e.target || !e.target[expando]) return;
        
        var type = e.type,
            handlers = self.bound[type],
            target = e.target,
            elHandlers,
            id, i, n = 100;
        do {
            id = target[expando];
            if (handlers[id] && handlers[id].length) {
                for (i=0, elHandlers = handlers[id]; i < elHandlers.length; i++) {
                    elHandlers[i].apply(target, arguments);
                };
            }
            if (target.nodeType == doc) {
                target == root;
            } else if (target.nodeType == 1 && !target.parentNode) {
                target = doc;
            } else {
                target = target.parentNode;
            }
        } while (n-- && target);
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
    
    _preventSelectionHandler: function(e) { 
		e.preventDefault ? e.preventDefault() : e.returnValue = true;
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