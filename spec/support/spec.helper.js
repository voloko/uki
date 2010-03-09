var triggerEvent,
    mouseButtonsEvent;
if (document.createEventObject) {
    triggerEvent = function(el, type, params) {
        var event = uki.extend(
            document.createEventObject(), 
            params
        );
        
        return el.fireEvent('on' + type, event);
    };
} else {
    triggerEvent = function(el, type, params) {
        var event = document.createEvent('MouseEvents');   
        event.initMouseEvent(
            type,
            true,
            true,
            document.defaultView,
            params.detail    || 0,
            params.screenX   || 0,
            params.screenY   || 0,
            params.clientX   || 0,
            params.clientY   || 0,
            params.ctrlKey   || false,
            params.altKey    || false,
            params.shiftKey  || false,
            params.metaKey   || false,
            params.button    || 0,
            null
        );
        uki.extend(event);
        
        el.dispatchEvent(event);
    };
}

