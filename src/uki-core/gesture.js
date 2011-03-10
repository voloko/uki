var utils = require('./utils'),
    env = require('./env'),
    evt = require('./event');

var gesture = {
    draggable: null,
    position: null,
    cursor: null
};

var handlers = {},
    mark = '__draggesturebound';

// add single drag set of drag events for an element
// regardless of the number of listeners
var addDraggestures = {
    setup: function(el) {
        if (el[mark]) {
            el[mark]++;
        } else {
            el[mark] = 1;
            evt.on(el, 'mousedown', dragGestureStart);
        }
    },
    teardown: function(el) {
        el[mark]--;
        if (!el[mark]) {
            evt.removeListener(el, 'mousedown', dragGestureStart);
        }
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
        gesture.cursor = env.doc.body.style.cursor;
        env.doc.body.style.cursor = e.cursor;
    }
    evt.on(env.doc, 'mousemove scroll', dragGesture);
    evt.on(env.doc, 'mouseup dragend', dragGestureEnd);
    evt.on(env.doc, 'selectstart mousedown', evt.preventDefaultHandler);
}

function stopGesture () {
    gesture.draggable = null;
    env.doc.body.style.cursor = gesture.cursor;
    gesture.cursor = null;
    evt.removeListener(env.doc, 'mousemove scroll', dragGesture);
    evt.removeListener(env.doc, 'mouseup dragend', dragGestureEnd);
    evt.removeListener(env.doc, 'selectstart mousedown', evt.preventDefaultHandler);
}

function dragGestureStart (e) {
    e = evt.createEvent(e, {type: 'draggesturestart'});
    evt.trigger.call(this, e);
    if (!e.isDefaultPrevented()) {
        gesture.position = { x: e.pageX, y: e.pageY };
        startGesture(this, e);
    }
}

function dragGesture (e) {
    e = evt.createEvent(e, {type: 'draggesture'});
    e.dragOffset = {
        x: e.pageX - gesture.position.x,
        y: e.pageY - gesture.position.y
    };
    evt.trigger.call(gesture.draggable, e);

    if (e.isDefaultPrevented()) stopGesture(gesture.draggable);
}

function dragGestureEnd (e) {
    e = evt.createEvent(e, {type: 'draggestureend'});
    e.dragOffset = {
        x: e.pageX - gesture.position.x,
        y: e.pageY - gesture.position.y
    };
    evt.trigger.call(gesture.draggable, e);

    stopGesture(gesture.draggable);
}

module.exports = gesture;
