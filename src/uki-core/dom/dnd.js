include('../dom.js');


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
        typeof doc.createElement('div').ondragstart == 'object' || // ie support
        doc.createEvent('DragEvent').dataTransfer.setDragImage // w3c support
    ) {
        dnd.nativeDnD = true;
    }
} catch (e) {}

var emptySpecial = { setup: function() {}, teardown: function() {} };

// drag gestures
uki.extend(uki.dom.special, {
    draggesturestart: {
        setup: function() {
			uki.dom.bind( this, 'mousedown', draggesturestart );
        },
        teardown: function() {
            this.draggable = false;
			uki.dom.unbind( this, 'mousedown', draggesturestart );
        }
    },
    draggestureend: emptySpecial,
    draggesture: emptySpecial
});

function startGesture (el) {
    dnd.draggable = el;
    bindGestures();
}

function stopGesture () {
    dnd.draggable = null;
    unbindGestures();
}

function draggesturestart (e) {
    e.type = 'draggesturestart';
    uki.dom.handler.apply(this, arguments);
    if (!e.isDefaultPrevented()) {
        startGesture(this);
        dnd.position = new Point(-e.pageX, -e.pageY);
    }
}

function draggesture (e) {
    e.type = 'draggesture';
    e.dragOffset = (new Point(e.pageX, e.pageY)).offset(dnd.position);
    uki.dom.handler.apply(dnd.draggable, arguments);
    if (e.isDefaultPrevented()) stopGesture(dnd.draggable);
}

function draggestureend (e) {
    e.type = 'draggestureend';
    e.dragOffset = (new Point(e.pageX, e.pageY)).offset(dnd.position);
    uki.dom.handler.apply(dnd.draggable, arguments);
    stopGesture(dnd.draggable);
}

function preventSelectionHandler(e) { 
    e.preventDefault();
}

function bindGestures() {
    uki.dom.bind(doc, 'mousemove scroll', draggesture);
    uki.dom.bind(doc, 'mouseup mouseleave', draggestureend);
    uki.dom.bind(doc.body, 'selectstart mousedown', preventSelectionHandler);
}

function unbindGestures() {
    uki.dom.unbind(doc, 'mousemove scroll', draggesture);
    uki.dom.unbind(doc, 'mouseup mouseleave', draggestureend);
    uki.dom.unbind(doc.body, 'selectstart mousedown', preventSelectionHandler);
}



// browser DnD implementation
uki.dom.DataTransfer = uki.newClass(new function() {
    this.init = function() {
        uki.extend(this, {
            dropEffect: 'none',
            effectAllowed: 'none',
            types: [],
            files: [],
            dragImage: '',
            imagePosition: new Point(),
            data: {}
        });
    };
    
    this.domEvent = uki.newProp('_domEvent');
    
    this.setData = function(format, data) {
        this.data[format] = data;
        if (uki.inArray(format, this.types) == -1) this.types.push(format);
    };
    
    this.clearData = function(format) {
        if (format) {
            delete this.data[format];
            this.types = uki.grep(this.types, function(x) { return x != format; });
        } else {
            this.data = {};
            this.types = [];
        }
    };
    
    this.getData = function(format) {
        return this.data[format];
    };
    
    this.setDragImage = function(element, x, y) {
        this.dragImage = element;
        this.imagePosition = new Point(x || 0, y || 0);
    };
});

})();

// 
// 
// 
// (function() {
//     
//     
//     
//     uki.dom.DataTransfer = uki.newClass(new function() {
//         this.init = function(domEvent) {
//             
//             this.domEvent = domEvent;
//             
//             uki.extend(this, {
//                 dropEffect: 'none',
//                 effectAllowed: 'none',
//                 types: [],
//                 files: [],
//                 dragImage: '',
//                 imagePosition: new Point(),
//                 data: {}
//             });
//             
//         };
//         
//         this.setData = function(format, data) {
//             this.data[format] = data;
//             if (uki.inArray(format, this.types) == -1) this.types.push(format);
//         };
//         
//         this.clearData = function(format) {
//             if (format) {
//                 delete this.data[format];
//                 this.types = uki.grep(this.types, function(x) { return x != format; });
//             } else {
//                 this.data = {};
//                 this.types = [];
//             }
//         };
//         
//         this.getData = function(format) {
//             return this.data[format];
//         };
//         
//         this.setDragImage = function(element, x, y) {
//             if (this.domEvent.dataTransfer) {
//                 this.domEvent.dataTransfer.setDragImage(element, x, y);
//             } else {
//                 this.dragImage = element;
//                 this.imagePosition = new Point(x || 0, y || 0);
//             }
//         };
//     });
//     
//     
//     var controller = 
//     /**
//      * @namespace
//      */
//     uki.dom.drag = {
//         draggable: null,
//         nativeDnD: false
//     };
//     
//     
//     function dragstartHandler (e) {
//         e = new uki.dom.Event(e);
//         e.type = 'dragstart';
//         uki.dom.handler.apply(this, arguments);
//         
//         if (!e.isDefaultPrevented()) {
//             controller.draggable = this;
//             bind();
//         }
//     }
//     
//     function drag(e) {
//         if (controller.draggable) {
//             e = new uki.dom.Event(e);
//             e.type = 'drag';
//             uki.dom.handler.apply(this, arguments);
//             if (e.dataDransfer.dragImage) {
//                 
//             }
//         } else {
//             unbind();
//         }
//     }
//     
//     function drop(e) {
//         unbind();
//         if (controller.draggable) {
//             e = new uki.dom.Event(e);
//             e.type = 'dragend';
//             uki.dom.handler.apply(this, arguments);
//         }
//         controller.draggable = null;
//     }
//     
//     function preventSelectionHandler(e) { 
//         e.preventDefault();
//     }
// 
//     function bind() {
//         uki.dom.bind(doc, 'mousemove scroll', drag);
//         uki.dom.bind(doc, 'mouseup', drop);
//         uki.dom.bind(doc.body, 'selectstart mousedown', preventSelectionHandler);
//     }
// 
//     function unbind() {
//         uki.dom.unbind(doc, 'mousemove scroll', drag);
//         uki.dom.unbind(doc, 'mouseup', drop);
//         uki.dom.unbind(doc.body, 'selectstart mousedown', preventSelectionHandler);
//     }
//     
//     var emptySpecial = { setup: function() {}, teardown: function() {} };
// 
//     
//     if (!uki.dom.drag.nativeDnD) {
//         uki.extend(uki.dom.special, {
//             dragstart: {
//                 setup: function() {
//                     this.draggable = true;
//                     // this.style.WebkitUserDrag = 'element';
//                  uki.dom.bind( this, 'mousedown', dragstartHandler );
//                 },
//                 teardown: function() {
//                     this.draggable = false;
//                  uki.dom.unbind( this, 'mousedown', dragstartHandler );
//                 }
//             },
//             dragend: emptySpecial,
//             drag: emptySpecial,
//         
//             dragenter: {
//                 setup: function() {
//             
//                 },
//                 teardown: function() {
//             
//                 }
//             },
//             dragleave: {
//                 setup: function() {
//             
//                 },
//                 teardown: function() {
//             
//                 }
//             },
//             drop: {
//             
//             }
//         });
//     }
//     
// 
//     uki.extend(uki.dom.drag, {
//         pos: null,
// 
//         /**
//          * Imitate drag for a draggable
//          * @function
//          */
//         start: function(draggable, e) {
//             this.draggable = draggable;
//             this.pos = new Point(e.pageX, e.pageY);
//             bindEmul();
//         },
// 
//         /**
//          * Watch element for dragging.
//          * On drag start dragging
//          *
//          * @function
//          */
//         watch: function(element, draggable) {
//             uki.dom.bind(element, 'dragstart', function(e) { e.returnValue = false; });
// 
//             uki.dom.bind(element, 'mousedown', function(e) {
//                 if (!draggable._acceptDrag || draggable._acceptDrag(e)) {
//                     uki.dom.drag.start(draggable, e);
//                 }
//             });
//         }
//     });
//     
//     function draggingEmul(e) {
//         if (controller.draggable && controller.draggable._drag) controller.draggable._drag(e, offsetEmul(e));
//     }
// 
//     function dropEmul(e) {
//         unbindEmul();
//         if (controller.draggable && controller.draggable._drop) controller.draggable._drop(e, offsetEmul(e));
//         controller.draggable = null;
//     }
// 
//     function offsetEmul (e) {
//         return controller.pos.clone().offset(-e.pageX, -e.pageY);
//     }    
// })();

