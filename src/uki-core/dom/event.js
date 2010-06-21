uki.dom.special = {};

uki.dom.Event = function( domEvent ) {
    domEvent = domEvent || {};
    this.domEvent = domEvent.domEvent || domEvent;

	for ( var i = uki.dom.props.length, prop; i; ){
		prop = uki.dom.props[ --i ];
		this[ prop ] = domEvent[ prop ];
	}
	
    // this.dataTransfer = new uki.dom.DataTransfer(domEvent);
};

uki.dom.Event.prototype = new function() {
    function returnTrue () {
        return true;
    }
    
    this.preventDefault = function() {
        var domEvent = this.domEvent;
        domEvent.preventDefault && domEvent.preventDefault();
        domEvent.returnValue = false;
        
        this.isDefaultPrevented = returnTrue;
    }
    
    this.stopPropagation = function() {
		var domEvent = this.domEvent;
		domEvent.stopPropagation && domEvent.stopPropagation();
		domEvent.cancelBubble = true;
		
		this.isPropagationStopped = returnTrue;
    }
    
    this.isDefaultPrevented = this.isPropagationStopped = uki.F;
}

uki.extend(uki.dom, /** @lends uki.dom */ {
    bound: {},
    handlers: {},
    
    props: "type altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which dragOffset dataTransfer".split(" "),
    
    events: "blur focus load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error draggesturestart draggestureend draggesture dragstart dragend drag drop dragenter dragleave dragover".split(" "),

    bind: function(el, types, listener) {
		if ( el.setInterval && el != window )
			el = window;
			
        listener.huid = listener.huid || uki.guid++;
        
        var id = el[expando] = el[expando] || uki.guid++,
            handler = uki.dom.handlers[id] = uki.dom.handlers[id] || function() {
                uki.dom.handler.apply(arguments.callee.elem, arguments);
            },
            i, type;
            
        handler.elem = el;
        
        if (!uki.dom.bound[id]) uki.dom.bound[id] = {};
        
        types = types.split(' ');
        for (i=0; i < types.length; i++) {
            type = types[i];
            if (!uki.dom.bound[id][type]) {
                uki.dom.bound[id][type] = [];
                if ( !uki.dom.special[type] || uki.dom.special[type].setup.call(el) === false ) {
                    el.addEventListener ? el.addEventListener(type, handler, false) : el.attachEvent('on' + type, handler);
                }
            }
            uki.dom.bound[id][type].push(listener);
        };
        listener = handler = el = null;
    },
    
    unbind: function(el, types, listener) {
        var id = el[expando],
            huid = listener && listener.huid,
            i, type;
        if (types) {
            types = types.split(' ');
        } else {
            types = [];
            uki.each(uki.dom.bound[id] || [], function(k, v) { types.push(k); });
        }
        for (i=0; i < types.length; i++) {
            type = types[i];
            if (!id || !uki.dom.bound[id] || !uki.dom.bound[id][type]) continue;
            uki.dom.bound[id][type] = listener ? uki.grep(uki.dom.bound[id][type], function(h) { return h.huid !== huid; }) : [];
            
            if (uki.dom.bound[id][type].length == 0) {
                var handler = uki.dom.handlers[id];
                if ( !uki.dom.special[type] || uki.dom.special[type].teardown.call(el) === false ) {
                    el.removeEventListener ? el.removeEventListener(type, handler, false) : el.detachEvent('on' + type, handler);
                }
                uki.dom.bound[id][type] = null;
            }
        }
    },
    
    /** @ignore */
    handler: function( e ) {
        
        e = e || root.event;
        
        var type = e.type,
            id = this[expando],
            handlers = uki.dom.bound[id],
            i;
            
        if (!e.domEvent) {
            e = new uki.dom.Event(e);
            e = uki.dom.fix( e );
        }
        
        if (!id || !handlers || !handlers[type]) return;
        
        uki.after.start();
        for (i=0, handlers = handlers[type]; i < handlers.length; i++) {
            handlers[i].call(this, e);
        };
        uki.after.stop();
    },
    
    /**
     * Taken from jQuery
     * @ignore
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
			try { event.metaKey = event.ctrlKey; } catch(e){};

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));    
			
		return event;    
    },
    
    preventDefaultHandler: function(e) {
        e && e.preventDefault();
        return false;
    }
});

uki.each({ 
	mouseover: 'mouseenter', 
	mouseout: 'mouseleave'
}, function( orig, fix ){
    var handler = function(e) {
	    if (!uki.dom.contains(this, e.relatedTarget)) {
	        e.type = fix;
	        uki.dom.handler.apply(this, arguments);
        }
	};
	
	uki.dom.special[ fix ] = {
		setup: function() {
			uki.dom.bind( this, orig, handler );
		},
		teardown: function(){
		    uki.dom.unbind( this, orig, handler );
		}
	};			   
});


if (root.attachEvent) {
    root.attachEvent('onunload', function() {
        uki.each(uki.dom.bound, function(id, types) {
            uki.each(types, function(type, handlers) {
                try {
                    uki.dom.handlers[id].elem.detachEvent('on' + type, uki.dom.handlers[id]);
                } catch (e) {};
            });
        });
    });
};