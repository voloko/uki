## Gesture

Adds support for `draggesturestart`, `draggesturestop` and `draggesture` events.

    evt.on(handle, 'draggesturestart', function() {
        console.log('start dragging');
        
        // set body cursor while dragging
        e.cursor = 'row-resize';
    });
    
    evt.on(handle, 'draggesture', function(e) {
        console.log('moved to', e.dragOffset);
        console.log(gesture.draggable === handle);
    });
    
    evt.on(handle, 'draggesturestop', function(e) {
        console.log('stopped dragging');
    });