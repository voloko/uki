include('../dom.js');

(function() {
    var controller = uki.dom.drag = {
        draggable: null,
        pos: null,

        start: function(draggable, e) {
            this.draggable = draggable;
            this.pos = new Point(e.pageX, e.pageY);
            bind();
        }
    }
    var doc = document;
    

    function bind() {
        uki.dom.bind(doc, 'mousemove scroll', dragging);
        uki.dom.bind(doc, 'mouseup', drop);
        uki.dom.bind(doc.body, 'selectstart mousedown', preventSelectionHandler);
    }

    function unbind() {
        uki.dom.unbind(doc, 'mousemove scroll', dragging);
        uki.dom.unbind(doc, 'mouseup', drop);
        uki.dom.unbind(doc.body, 'selectstart mousedown', preventSelectionHandler);
    }

    function dragging(e) {
        if (controller.draggable) controller.draggable._drag(e, offset(e));
    }

    function drop(e) {
        if (controller.draggable) controller.draggable._drop(e, offset(e));
        controller.draggable = null;
        unbind();
    }

    function preventSelectionHandler(e) { 
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }
    
    function offset (e) {
        return controller.pos.clone().offset(-e.pageX, -e.pageY);
    }
})();

