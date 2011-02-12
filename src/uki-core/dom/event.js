var uki = require('../uki'),
    utils = require('../utils'),
    evt = exports;

/**
 * Thin wrapper to support missing events (like dnd or mouseout)
 */
var Event = require('../function').newClass({
    init: function( domEvent, type ) {
        domEvent = domEvent || {};
        this.domEvent = domEvent.domEvent || domEvent;

        for ( var i = evt.props.length, prop; i; ){
            prop = evt.props[ --i ];
            this[ prop ] = domEvent[ prop ];
        }
        if ( type ) this.type = type;
    },

    preventDefault: function() {
        this.domEvent.preventDefault();
        this.isDefaultPrevented = uki.FT;
    },

    stopPropagation: function() {
        this.domEvent.stopPropagation();
        this.isPropagationStopped = uki.FT;
    },

    isDefaultPrevented: uki.FF,
    isPropagationStopped: uki.FF
});


utils.extend(evt, {
    Event: Event,
    
    special: {},
    
    props: "type altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which dragOffset dataTransfer".split(" "),

    events: "blur focus load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error draggesturestart draggestureend draggesture dragstart dragend drag drop dragenter dragleave dragover".split(" "),

    specialListeners: {},

    addListener: function(el, types, listener) {
        types.split(' ').forEach(function(type) {
            if ( evt.special[type] ) {
                var id = el[uki.expando] = el[uki.expando] || uki.guid++,
                    specialListeners = evt.specialListeners;

                specialListeners[id] = specialListeners[id] || [];
                specialListeners[id][type] = specialListeners[id][type] || [];
                specialListeners[id][type].push(listener);

                evt.special[type].setup(el);
            } else {
                el.addEventListener ? el.addEventListener(type, listener, false) : 
                    el.attachEvent('on' + type, listener);
            }
        });
    },

    removeListener: function(el, types, listener) {
        types.split(' ').forEach(function(type) {
            if ( evt.special[type] ) {
                var id = el[uki.expando],
                    specialListeners = evt.specialListeners;

                if (!id || !specialListeners[id] || !specialListeners[id][type]) return;

                specialListeners[id][type] = utils.without(specialListeners[id][type], listener);
                evt.special[type].teardown(el);
            } else {
                el.removeEventListener ? el.removeEventListener(type, listener, false) :
                    el.detachEvent('on' + type, listener);
            }
        });
    },

    trigger: function(el, event) {
        var specialListeners = evt.specialListeners,
            id;

        while (el) {
            id = el[uki.expando];
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

evt.on = evt.addListener;
evt.emit = evt.trigger;

utils.forEach({
    mouseover: 'mouseenter',
    mouseout: 'mouseleave'
}, function( specialName, origName ){
    function handler (e) {
        if (!this.contains( e.relatedTarget )) {
            evt.trigger(this, e);
        }
    }

    evt.special[ specialName ] = {
        setup: function( el, listener ) {
            evt.addListener( el, origName, handler );
        },
        teardown: function( el, listener ){
            evt.removeListener( el, origName, handler );
        }
    };
});
