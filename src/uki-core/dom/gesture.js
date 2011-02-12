var utils = require('../utils'),
    evt = require('./event');
 
var gesture = {
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
            evt.addListener( el, 'mousedown', dragGestureStart );
        }
    },
    teardown: function(el) {
        el.__draggesturebound--;
        if (!el.__draggesturebound) evt.removeListener( el, 'mousedown', dragGestureStart );
    }
};

// drag gestures
utils.extend(evt.special, {
    draggesturestart: addDraggestures,
    draggestureend: addDraggestures,
    draggesture: addDraggestures
});

function startGesture (el, e) {
    if (gesture.draggable) return;
    gesture.draggable = e.draggable || el;
    if (e.cursor) {
        gesture.cursor = uki.doc.body.style.cursor;
        uki.doc.body.style.cursor = e.cursor;
    }
    evt.addListener(doc, 'mousemove scroll', dragGesture);
    evt.addListener(doc, 'mouseup dragend', dragGestureEnd);
    evt.addListener(doc, 'selectstart mousedown', evt.preventDefaultHandler);
}

function stopGesture () {
    gesture.draggable = null;
    uki.doc.body.style.cursor = gesture.cursor;
    gesture.cursor = null;
    evt.removeListener(doc, 'mousemove scroll', dragGesture);
    evt.removeListener(doc, 'mouseup dragend', dragGestureEnd);
    evt.removeListener(doc, 'selectstart mousedown', evt.preventDefaultHandler);
}

function dragGestureStart (e) {
    e = new evt.Event(e, 'draggesturestart');
    evt.trigger(this, e);

    if (!e.isDefaultPrevented()) {
        gesture.position = { x: e.pageX, y: e.pageY };
        startGesture(this, e);
    }
}

function dragGesture (e) {
    e = new evt.Event(e, 'draggesture');
    e.dragOffset = {
        x: e.pageX - gesture.position.x,
        y: e.pageY - gesture.position.y
    };
    evt.trigger(gesture.draggable, e);

    if (e.isDefaultPrevented()) stopGesture(gesture.draggable);
}

function dragGestureEnd (e) {
    e = new evt.Event(e, 'draggestureend');
    e.dragOffset = {
        x: e.pageX - gesture.position.x,
        y: e.pageY - gesture.position.y
    };
    evt.trigger(gesture.draggable, e);

    stopGesture(gesture.draggable);
}


utils.extend(exports, gesture);