var uki = require('../uki'),
    utils = require('../utils'),
    fun = require('../function'),
    dom = require('../dom'),
    expando = uki.expando;

// base class
function EventWrapper () {}

EventWrapper.prototype = {
    targetView: function() {
        return require('../view').closest(this.target);
    },

    simulateBubbles: false,

    preventDefault: function() {
        var e = this.baseEvent;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        this.isDefaultPrevented = uki.FT;
    },

    stopPropagation: function() {
        var e = this.baseEvent;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        this.isPropagationStopped = uki.FT;
    },

    isDefaultPrevented: uki.FF,
    isPropagationStopped: uki.FF
};


function normalize(e) {
	// Fix target property, if necessary
	if (!e.target) {
		e.target = e.srcElement || uki.doc;
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
		var doc = uki.doc,
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

/**
* Handle all listener calls. Should be called with dom element as this
*/
function domHandler(e) {
    e = e || window.event;
    var wrapped = evt.createEvent(e);
    evt.trigger.call(this, normalize(wrapped));
}

function createEvent(baseEvent, options) {
    e = new EventWrapper();
    e.baseEvent = baseEvent;
    // this is rather expensive, unfortunately it's impossible
    // to use prototype chain instead of simple inheritance, since
    // firefox uses read only properties on event, thus preventing
    // their modification even in descendants
    for (var i in baseEvent) e[i] = e[i] || baseEvent[i];
    utils.extend(e, options);
    return e;
}

var evt = module.exports = {

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
        var id = el[uki.expando] = el[uki.expando] || uki.guid++;

        utils.forEach(types.split(' '), function(type) {
            listeners[id] = listeners[id] || {};

            // if this is the first listener added to el for type
            // then create a handler
            if (!listeners[id][type]) {
                if (evt.special[type]) {
                    evt.special[type].setup(el);
                } else {
                    domHandlers[id] = domHandlers[id] || uki.bind(domHandler, el);
                    el.addEventListener ? el.addEventListener(type, domHandlers[id], false) :
                        el.attachEvent('on' + type, domHandlers[id]);
                }
            }

            listeners[id][type] = listeners[id][type] || [];
            listeners[id][type].push(listener);
        });
    },

    removeListener: function(el, types, listener) {
        if (!types) {
            types = Object.keys(listeners[id]).join(' ');
        }

        utils.forEach(types.split(' '), function(type) {
            var id = el[uki.expando];

            if (!id || !listeners[id] || !listeners[id][type]) return;

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
evt.emit = evt.trigger;

utils.forEach({
    mouseover: 'mouseenter',
    mouseout: 'mouseleave'
}, function(specialName, origName){
    function handler(e) {
        if (!dom.contains(e.relatedTarget)) {
            var wrapped = evt.createEvent(e, { type: specialName, simulateBubbling: true });
            evt.trigger.call(this, wrapped);
        }
    }

    evt.special[specialName] = {
        setup: function(el, listener) {
            evt.addListener(el, origName, handler);
        },
        teardown: function( el, listener ){
            evt.removeListener(el, origName, handler);
        }
    };
});

utils.extend(dom, evt);
