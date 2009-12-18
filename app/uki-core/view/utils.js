include('../view.js');

uki.view.utils = new function() {
    var proto = this;
    
    proto.visibleRect = function (from, upTo) {
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
    }
    
    proto.offset = function(c, upTo) {
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
    
    proto.scrollableParent = function(c) {
        do {
            if (uki.isFunction(c.scrollTop)) return c;
            c = c.parent();
        } while (c);
        return null;
    };
    
    /**
     * Finds the uppermost parent which needs layout
     */
    proto.dirtyParent = function(c) {
        var prevC;
        do {
            prevC = c;
            c = c.parent();
        } while(c && c._needsLayout);
        return prevC;
    };
    
    function visibleRect (c) {
        return c.visibleRect ? c.visibleRect() : c.rect().clone();
    }
}

uki.extend(uki.view, uki.view.utils);