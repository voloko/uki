importScripts('../dom.js');
importScripts('event.js');


(function() {
/**
 * Drag gesture events
 * @namespace
 */
var gesture = uki.dom.gesture = {
    draggable: null,
    position: null,
    cursor: null
};

var handlers = {};

// add single drag set of drag events for an element
// regardless of the number of listeners
var addDraggestures = {
    setup: function(el) {
        if (el.__draggesturebound) {
            el.__draggesturebound++;
        } else {
            el.__draggesturebound = 1;
            uki.dom.addListener( el, 'mousedown', dragGestureStart );
        }
    },
    teardown: function(el) {
        el.__draggesturebound--;
        if (!el.__draggesturebound) uki.dom.removeListener( el, 'mousedown', dragGestureStart );
    }
};

// drag gestures
uki.extend(uki.dom.special, {
    draggesturestart: addDraggestures,
    draggestureend: addDraggestures,
    draggesture: addDraggestures
});

function startGesture (el, e) {
    if (gesture.draggable) return;
    gesture.draggable = e.draggable || el;
    if (e.cursor) {
        gesture.cursor = doc.body.style.cursor;
        doc.body.style.cursor = e.cursor;
    }
    uki.dom.addListener(doc, 'mousemove scroll', dragGesture);
    uki.dom.addListener(doc, 'mouseup dragend', dragGestureEnd);
    uki.dom.addListener(doc, 'selectstart mousedown', uki.dom.preventDefaultHandler);
}

function stopGesture () {
    gesture.draggable = null;
    doc.body.style.cursor = gesture.cursor;
    gesture.cursor = null;
    uki.dom.removeListener(doc, 'mousemove scroll', dragGesture);
    uki.dom.removeListener(doc, 'mouseup dragend', dragGestureEnd);
    uki.dom.removeListener(doc, 'selectstart mousedown', uki.dom.preventDefaultHandler);
}

function dragGestureStart (e) {
    e = new uki.dom.Event(e, 'draggesturestart');
    uki.dom.trigger(this, e);

    if (!e.isDefaultPrevented()) {
        gesture.position = { x: e.pageX, y: e.pageY };
        startGesture(this, e);
    }
}

function dragGesture (e) {
    e = new uki.dom.Event(e, 'draggesture');
    e.dragOffset = {
        x: e.pageX - gesture.position.x,
        y: e.pageY - gesture.position.y
    };
    uki.dom.trigger(gesture.draggable, e);

    if (e.isDefaultPrevented()) stopGesture(gesture.draggable);
}

function dragGestureEnd (e) {
    e = new uki.dom.Event(e, 'draggestureend');
    e.dragOffset = {
        x: e.pageX - gesture.position.x,
        y: e.pageY - gesture.position.y
    };
    uki.dom.trigger(gesture.draggable, e);

    stopGesture(gesture.draggable);
}

})();
