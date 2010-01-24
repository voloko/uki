include('../view.js');

/**
 * @namespace
 */
uki.view.utils = new function() {
    this.visibleRect = function (from, upTo) {
        var queue = [],
            rect, i, tmpRect, c = from;
            
        do {
            queue[queue.length] = c;
            c = c.parent();
        } while (c && c != upTo);
        
        if (upTo && upTo != from) queue[queue.length] = upTo;

        for (i = queue.length - 1; i >= 0; i--){
            c = queue[i];
            tmpRect = visibleRect(c);
            rect = rect ? rect.intersection(tmpRect) : tmpRect;
            rect.x -= c.rect().x;
            rect.y -= c.rect().y;
            
        };
        return rect;
    };
    
    this.top = function(c) {
        while (c.parent()) c = c.parent();
        return c;
    };
    
    this.offset = function(c, upTo) {
        var offset = new Point(),
            rect;
        
        while (c && c != upTo) {
            rect = c.rect();
            offset.x += rect.x;
            offset.y += rect.y;
            if (c.scrollTop) {
                offset.x -= c.scrollLeft();
                offset.y -= c.scrollTop();
            }
            c = c.parent();
        }
        return offset;
    };
    
    this.scrollableParent = function(c) {
        do {
            if (uki.isFunction(c.scrollTop)) return c;
            c = c.parent();
        } while (c);
        return null;
    };
    
    /** @inner */
    function visibleRect (c) {
        return c.visibleRect ? c.visibleRect() : c.rect().clone();
    }
    /**#@-*/ 
};

uki.extend(uki.view, uki.view.utils);