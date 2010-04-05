include('event.js');


(function() {
/**
 * Drag and Drop support for uki
 * @namespace
 */
var dnd = uki.dom.dnd = {
    draggable: null,
    nativeDnD: false,
    position: null
};

// detect if native DnD is supported
try {
    if (
        // typeof doc.createElement('div').ondragstart == 'object' || // ie support
        typeof doc.createEvent('MouseEvent').dataTransfer == 'object' || // safari
        doc.createEvent('DragEvent').initDragEvent // w3c support
    ) {
        // Google Chrome has to many issues with native d&d. It is simpler to disable than to fix
        dnd.nativeDnD = !ua.match(/Chrome\/4/);
    }
} catch (e) {}

// bind single drag set of drag events for an element
// regardless of the number of listeners
var bindDraggestures = {
    setup: function() {
        if (this.__draggesturebound) {
            this.__draggesturebound++;
        } else {
            this.__draggesturebound = 1;
    		uki.dom.bind( this, 'mousedown', draggesturestart );
    		 // prevent interference with ie drag events
            if (!dnd.nativeDnD && typeof this.ondragstart == 'object') 
                this.ondragstart = function() { event.returnValue = false; };
        }
    },
    teardown: function() {
        this.__draggesturebound--;
        if (!this.__draggesturebound) uki.dom.unbind( this, 'mousedown', draggesturestart );
    }
};

// drag gestures
uki.extend(uki.dom.special, {
    draggesturestart: bindDraggestures,
    draggestureend: bindDraggestures,
    draggesture: bindDraggestures
});

var dragEndEvents = 'mouseup ' + (dnd.nativeDnD ? ' dragend' : '');
// if (window.attachEvent && !window.opera) dragEndEvents += ' mouseleave';

function startGesture (el) {
    if (dnd.draggable) return;
    dnd.draggable = el;
    uki.dom.bind(doc, 'mousemove scroll', draggesture);
    uki.dom.bind(doc, dragEndEvents, draggestureend);
    uki.dom.bind(doc, 'selectstart mousedown', uki.dom.preventDefaultHandler);
}

function stopGesture () {
    dnd.draggable = null;
    uki.dom.unbind(doc, 'mousemove scroll', draggesture);
    uki.dom.unbind(doc, dragEndEvents, draggestureend);
    uki.dom.unbind(doc, 'selectstart mousedown', uki.dom.preventDefaultHandler);
}

function draggesturestart (e) {
    e = new uki.dom.Event(e);
    e.type = 'draggesturestart';
    uki.dom.handler.apply(this, arguments);
    if (!e.isDefaultPrevented()) {
        startGesture(this);
        dnd.position = new Point(-e.pageX, -e.pageY);
    }
}

function draggesture (e) {
    e = new uki.dom.Event(e);
    e.type = 'draggesture';
    e.dragOffset = (new Point(e.pageX, e.pageY)).offset(dnd.position);
    uki.dom.handler.apply(dnd.draggable, arguments);
    if (e.isDefaultPrevented()) stopGesture(dnd.draggable);
}

function draggestureend (e) {
    e = new uki.dom.Event(e);
    e.type = 'draggestureend';
    e.dragOffset = (new Point(e.pageX, e.pageY)).offset(dnd.position);
    uki.dom.handler.apply(dnd.draggable, arguments);
    stopGesture(dnd.draggable);
}

})();
