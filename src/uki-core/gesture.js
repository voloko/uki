var utils = require('./utils'),
    uki = require('./uki'),
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
            evt.addListener(el, 'mousedown', dragGestureStart);
        }
    },
    teardown: function(el) {
        el.__draggesturebound--;
        if (!el.__draggesturebound) evt.removeListener(el, 'mousedown', dragGestureStart);
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
    evt.on(uki.doc, 'mousemove scroll', dragGesture);
    evt.on(uki.doc, 'mouseup dragend', dragGestureEnd);
    evt.on(uki.doc, 'selectstart mousedown', evt.preventDefaultHandler);
}

function stopGesture () {
    gesture.draggable = null;
    uki.doc.body.style.cursor = gesture.cursor;
    gesture.cursor = null;
    evt.removeListener(uki.doc, 'mousemove scroll', dragGesture);
    evt.removeListener(uki.doc, 'mouseup dragend', dragGestureEnd);
    evt.removeListener(uki.doc, 'selectstart mousedown', evt.preventDefaultHandler);
}

function dragGestureStart (e) {
    e = evt.createEvent(e, {type:'draggesturestart'});
    evt.trigger.call(this, e);
    if (!e.isDefaultPrevented()) {
        gesture.position = { x: e.pageX, y: e.pageY };
        startGesture(this, e);
    }
}

function dragGesture (e) {
    e = evt.createEvent(e, {type:'draggesture'});
    e.dragOffset = {
        x: e.pageX - gesture.position.x,
        y: e.pageY - gesture.position.y
    };
    evt.trigger.call(gesture.draggable, e);

    if (e.isDefaultPrevented()) stopGesture(gesture.draggable);
}

function dragGestureEnd (e) {
    e = evt.createEvent(e, {type:'draggestureend'});
    e.dragOffset = {
        x: e.pageX - gesture.position.x,
        y: e.pageY - gesture.position.y
    };
    evt.trigger.call(gesture.draggable, e);

    stopGesture(gesture.draggable);
}

module.exports = gesture;