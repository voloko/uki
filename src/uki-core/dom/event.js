importScripts('../dom.js');

uki.dom.special = {};

/**
 * Thin wrapper to support missing events (like dnd or mouseout)
 */
uki.dom.Event = function( domEvent, type ) {
    domEvent = domEvent || {};
    this.domEvent = domEvent.domEvent || domEvent;

    for ( var i = uki.dom.props.length, prop; i; ){
        prop = uki.dom.props[ --i ];
        this[ prop ] = domEvent[ prop ];
    }
    if ( type ) this.type = type;
};

uki.dom.Event.prototype = new function() {
    function returnTrue () {
        return true;
    }

    this.preventDefault = function() {
        this.domEvent.preventDefault();
        this.isDefaultPrevented = returnTrue;
    };

    this.stopPropagation = function() {
        this.domEvent.stopPropagation();
        this.isPropagationStopped = returnTrue;
    };

    this.isDefaultPrevented = this.isPropagationStopped = uki.FF;
};


uki.extend(uki.dom, /** @lends uki.dom */ {
    props: "type altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which dragOffset dataTransfer".split(" "),

    events: "blur focus load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error draggesturestart draggestureend draggesture dragstart dragend drag drop dragenter dragleave dragover".split(" "),

    specialListeners: {},

    addListener: function(el, types, listener) {
        types.split(' ').forEach(function(type) {
            if ( uki.dom.special[type] ) {
                var id = el[expando] = el[expando] || uki.guid++,
                    specialListeners = uki.dom.specialListeners;

                specialListeners[id] = specialListeners[id] || [];
                specialListeners[id][type] = specialListeners[id][type] || [];
                specialListeners[id][type].push(listener);

                uki.dom.special[type].setup(el);
            } else {
                el.addEventListener ? el.addEventListener(type, listener, false) : 
                    el.attachEvent('on' + type, listener);
            }
        });
    },

    removeListener: function(el, types, listener) {
        types.split(' ').forEach(function(type) {
            if ( uki.dom.special[type] ) {
                var id = el[expando],
                    specialListeners = uki.dom.specialListeners;

                if (!id || !specialListeners[id] || !specialListeners[id][type]) return;

                specialListeners[id][type] = uki.without(specialListeners[id][type], listener);
                uki.dom.special[type].teardown(el);
            } else {
                el.removeEventListener ? el.removeEventListener(type, listener, false) :
                    el.detachEvent('on' + type, listener);
            }
        });
    },

    trigger: function(el, event) {
        var specialListeners = uki.dom.specialListeners,
            id;

        while (el) {
            id = el[expando];
            if (specialListeners[id] && specialListeners[id][event.type]) {
                specialListeners[id][event.type].forEach(function(listener) {
                    listener.call(el, event);
                });
            }
            el = !event.isPropagationStopped() && el.parentNode;
        }
    },

    preventDefaultHandler: function(e) {
        e && e.preventDefault();
        return false;
    }
});

uki.dom.on = uki.dom.addListener;
uki.dom.emit = uki.dom.trigger;

uki.forEach({
    mouseover: 'mouseenter',
    mouseout: 'mouseleave'
}, function( specialName, origName ){
    function handler (e) {
        if (!this.contains( e.relatedTarget )) {
            uki.dom.trigger(this, e);
        }
    }

    uki.dom.special[ specialName ] = {
        setup: function( el, listener ) {
            uki.dom.addListener( el, origName, handler );
        },
        teardown: function( el, listener ){
            uki.dom.removeListener( el, origName, handler );
        }
    };
});
