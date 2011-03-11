var utils = require('./utils'),
    fun   = require('./function'),
    dom   = require('./dom'),
    env   = require('./env'),

    expando = env.expando;

function EventWrapper () {}

var EventMethods = {
    targetView: function() {
        return require('./view').closest(this.target);
    },

    simulateBubbles: false,

    preventDefault: function() {
        var e = this.baseEvent;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        this.isDefaultPrevented = fun.FT;
    },

    stopPropagation: function() {
        var e = this.baseEvent;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        this.isPropagationStopped = fun.FT;
    },

    isDefaultPrevented: fun.FF,
    isPropagationStopped: fun.FF
};

function DomEventWrapper() {}

utils.extend(DomEventWrapper.prototype, EventMethods);


function normalize(e) {
	// Fix target property, if necessary
	if (!e.target) {
		e.target = e.srcElement || env.doc;
	}

	// check if target is a textnode (safari)
	if (e.target.nodeType === 3) {
		e.target = e.target.parentNode;
	}

	// Add relatedTarget, if necessary
	if (!e.relatedTarget && e.fromElement) {
		e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement;
	}

	// Calculate pageX/Y if missing and clientX/Y available
	if (e.pageX == null && e.clientX != null) {
		var doc = env.doc,
		    body = doc.body;

		e.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
		e.pageY = e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
	}

	// Add which for key events
	if (e.which == null && (e.charCode != null || e.keyCode != null)) {
		e.which = e.charCode != null ? e.charCode : e.keyCode;
	}

	// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
	e.metaKey = e.metaKey || e.ctrlKey;

	// Add which for click: 1 === left; 2 === middle; 3 === right
	// Note: button is not normalized, so don't use it
	if (!e.which && e.button !== undefined) {
		e.which = (e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0 )));
	}

    return e;
};

/**
* Store all the handlers manually so we can override event behaviour
* {
*   node_expando_1: {
*     click: [...],
*     change: [...],
*     selection: [...]
*   }
*   node_expando_2: {
*     click: [...]
*   }
* }
*/
var listeners = {};

/**
* Need a connection between node on which addListener was called an it's listeners,
* so this is a hash of
* {
*   node_expando_1: bound domHandler
*   node_expando_2: bound domHandler
* }
*/
var domHandlers = {};

var eventProps = "altKey attrChange attrName bubbles button cancelable charCode clientX clientY clipboardData ctrlKey currentTarget data dataTransfer detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement type view wheelDelta which".split(" ");


/**
* Handle all listener calls. Should be called with dom element as this
*/
function domHandler(e) {
    e = e || env.root.event;
    var wrapped = wrapDomEvent(e);
    evt.trigger.call(this, normalize(wrapped));
}

function wrapDomEvent(baseEvent) {
    e = new DomEventWrapper();
    e.baseEvent = baseEvent;
    // This is expensive. I'd rather use much faster createEvent() here.
    // Unfortunately firefox uses read only properties on native events,
    // thus preventing modification even in descendants
    for (var i = eventProps.length, prop; i; i--) {
        prop = eventProps[i];
        e[prop] = baseEvent[prop];
    }
    return e;
}

function createEvent(baseEvent, options) {
    // Poor man Object.create() here.
    // It's generally cheaper to build a prototype chain for a
    // dynamicaly created event object than to copy all properties
    // from base event.
    EventWrapper.prototype = baseEvent;
    e = new EventWrapper();
    utils.extend(e.prototype, EventMethods);
    e.baseEvent = baseEvent;
    utils.extend(e, options);
    return e;
}

var evt = module.exports = {

    wrapDomEvent: wrapDomEvent,

    createEvent: createEvent,

    special: {},

    listeners: listeners,

    domHandlers: domHandlers,

    trigger: function(e) {
        var listenerForEl = evt.listeners[this[expando]] || {},
            listenersForType = listenerForEl[e.type];

        listenersForType && utils.forEach(listenersForType, function(l) {
            l.call(this, e);
        }, this);

        if (e.simulateBubbles && !e.isPropagationStopped() && this.parentNode) {
            evt.trigger(this.parentNode, e);
        }
    },

    addListener: function(el, types, listener) {
        var id = el[expando] = el[expando] || env.guid++;

        utils.forEach(types.split(' '), function(type) {
            listeners[id] = listeners[id] || {};

            // if this is the first listener added to el for type
            // then create a handler
            if (!listeners[id][type]) {
                if (evt.special[type]) {
                    evt.special[type].setup(el);
                } else {
                    domHandlers[id] = domHandlers[id] || fun.bind(domHandler, el);
                    el.addEventListener ? el.addEventListener(type, domHandlers[id], false) :
                        el.attachEvent('on' + type, domHandlers[id]);
                }
            }

            listeners[id][type] = listeners[id][type] || [];
            listeners[id][type].push(listener);
        });
    },

    removeListener: function(el, types, listener) {
        var id = el[expando];
        if (!id || !listeners[id]) return;
        
        types || (types = utils.keys(listeners[id]).join(' '));
        utils.forEach(types.split(' '), function(type) {
            if (!listeners[id][type]) return;

            listeners[id][type] = listener ? utils.without(listeners[id][type], listener) : [];

            // when removing the last listener also remove listener from the dom
            if (!listeners[id][type].length) {
                if (evt.special[type]) {
                    evt.special[type].teardown(el);
                } else {
                    el.removeEventListener ? el.removeEventListener(type, domHandlers[id], false) :
                        el.detachEvent('on' + type, domHandlers[id]);
                }
                delete listeners[id][type];
            }
        });
    },

    preventDefaultHandler: function(e) {
        e && e.preventDefault();
        return false;
    }
};

evt.on = evt.addListener;

utils.forEach({
    mouseover: 'mouseenter',
    mouseout: 'mouseleave'
}, function(specialName, origName){
    function handler(e) {
        var parent = e.relatedTarget;
        try {
            while (parent && parent !== this) {
                parent = parent.parentNode;
            }

            if (parent !== this) {
                var wrapped = createEvent(e, { type: specialName, simulateBubbling: true });
                evt.trigger.call(this, wrapped);
            }
        } catch(e) { }
    }

    evt.special[specialName] = {
        setup: function(el, listener) {
            evt.on(el, origName, handler);
        },
        teardown: function( el, listener ){
            evt.removeListener(el, origName, handler);
        }
    };
});
