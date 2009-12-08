include('base.js');

uki.view.List = uki.newClass(uki.view.Base, new function() {
    var Base = uki.view.Base.prototype,
        Rect = uki.geometry.Rect,
        proto = this,
        visibleRectExt = 500,
        doc = document;
        
    proto.typeName = function() {
        return 'uki.view.List';
    };
    
    proto.init = function() {
        Base.init.call(this);
        this._rowHeight = 30;
        this._flyweightView = uki.view.flyweight.Dummy;
        this._scrollableParent = null;
        this._rows = [];
        this._data = null;
    };
    
    proto.background = function(bg) {
        if (bg === undefined) return this._background = this._background || new uki.background.Rows(this._rowHeight, '#EDF3FE');
        return Base.background.call(this, bg);
    };
    
    uki.newProperties(proto, ['rowHeight', 'flyweightView']);
    
    proto.data = function(d) {
        if (d === undefined) return this._data;
        this._data = d;
        if (this.rect()) {
            var rect = this.rect().clone();
            rect.height = d.length * this._rowHeight;
            this.rect(rect);
        }
    };
    
    function findScrollableParent (c) {
        do {
            if (uki.isFunction(c.scrollTop)) return c;
            c = c.parent();
        } while (c);
        return null;
    }
    
    function getVisibleRect (from, upTo) {
        var queue = [],
            rect, i, tmpRect, c = from;
        do {
            queue[queue.length] = c;
            c = c.parent();
        } while (c && c != upTo);
        if (upTo && upTo != from) queue[queue.length] = upTo;

        for (i = queue.length - 1; i >= 0; i--){
            c = queue[i];
            tmpRect = c.visibleRect ? c.visibleRect() : c.rect().clone();
            rect = rect ? rect.intersection(tmpRect) : tmpRect;
            rect.x -= c.rect().x;
            rect.y -= c.rect().y;
            
        };
        return rect;
    }
    
    proto._domCreate = function() {
        this._dom = uki.createElement('div', this.defaultCss);
        this._scrollableParent = findScrollableParent(this);
        
        this.selectable(this.selectable());
        this.className(this.className())
        this.background().attachTo(this);
        
        var _this = this;
        this._scrollableParent.bind('scroll', function() {
            _this._domLayout(_this._rect, _this._relativeRect);
        })
    };
    
    proto._domLayout = function(rect, relativeRect) {
        this._visibleRect = getVisibleRect(this, this._scrollableParent);
        this._relativeRect = relativeRect;
        Base._domLayout.call(this, rect, relativeRect);
        
        var contentHeight = this._data.length * this._rowHeight,
            minHeight = this._visibleRect.y - visibleRectExt,
            maxHeight = this._visibleRect.maxY() + visibleRectExt,
            itemFrom  = Math.max(0, Math.floor(minHeight / this._rowHeight)),
            itemTo    = Math.min(this._data.length, Math.ceil(maxHeight / this._rowHeight)),
            i;
            
        for (i=itemFrom; i <= itemTo; i++) {
            if (!this._rows[i]) {
                this._rows[i] = uki.createElement('div', 'position:absolute;left:0;top:' + (i * this._rowHeight) + 'px;width:100%;height:' + this._rowHeight + 'px;overflow:hidden');
                this._flyweightView.create(this._rows[i], this._data[i]);
                this._dom.appendChild(this._rows[i]);
            } else {
                this._flyweightView.layout(rect, this._rows[i], this._data[i]);
            }
        };
    };
    
});

uki.view.flyweight = {};

uki.view.flyweight.Dummy = {
    layout: function(rect, container, data) {
    },
    
    create: function(container, data) {
        container.appendChild(uki.createElement('div', 'padding: 2px', data));
    },
    
    remove: function(container, data) {
        
    }
};