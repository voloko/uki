include('../dom.js');

(function() {
    var controller = uki.dom.drag = {
        draggable: null,
        pos: null,

        start: function(draggable, e) {
            this.draggable = draggable;
            this.pos = new uki.geometry.Point(e.pageX, e.pageY);
            bind();
        }
    }
    

    function bind() {
        uki.dom.bind(document, 'mousemove scroll', dragging);
        uki.dom.bind(document, 'mouseup', drop);
        uki.dom.bind(document.body, 'mousedown', preventSelectionHandler);
    }

    function unbind() {
        uki.dom.unbind(document, 'mousemove scroll', dragging);
        uki.dom.unbind(document, 'mouseup', drop);
        uki.dom.unbind(document.body, 'mousedown', preventSelectionHandler);
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

