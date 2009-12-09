include('base.js');
include('flyweight.js');

uki.view.List = uki.newClass(uki.view.Base, new function() {
    var Base = uki.view.Base.prototype,
        Rect = uki.geometry.Rect,
        proto = this,
        visibleRectExt = 500,
        packSize = 20,
        doc = document;
        
    proto.typeName = function() {
        return 'uki.view.List';
    };
    
    proto.init = function() {
        Base.init.call(this);
        this._rowHeight = 30;
        this._flyweightView = new uki.view.Flyweight();
        this._scrollableParent = null;
        this._packs = [];
        this._data = null;
    };
    
    proto.background = function(bg) {
        if (bg === undefined) return this._background = this._background || uki.theme.background('list', this._rowHeight);
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
            tmpRect = c != from && c.visibleRect ? c.visibleRect() : c.rect().clone();
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
            _this.layout();
        })
    };
    
    proto._renderPack = function(itemFrom, itemTo) {
        var html = [];
        for (i=itemFrom; i <= itemTo; i++) {
            html[html.length] = [
                '<div style="position:absolute;left:0;top:', (i-itemFrom) * this._rowHeight, 
                'px;width:100%;height:', this._rowHeight, 'px;overflow:hidden">', 
                this._flyweightView.render(this._data[i]),
                '</div>'
            ].join('');
        };
        return html.join('');
    };
    
    proto.layout = function() {
        if (!this._dom) {
            this._domCreate(this._rect);
            this._parent.domForChild(this).appendChild(this._dom);
            this._bindPendingEventsToDom();
        }
        this._domLayout(this._rect);
        this._needsLayout = false;
        this.trigger('layout', { rect: this._rect, source: this, visibleRect: this._visibleRect });
    };
    
    proto.visibleRect = function() {
        return this._visibleRect;
    };
    
    proto._layoutPack = function(pack) {
        
    };
    
    proto._domLayout = function(rect) {
        this._visibleRect = getVisibleRect(this, this._scrollableParent);
        Base._domLayout.call(this, rect);
        
        var contentHeight = this._data.length * this._rowHeight,
            packHeight    = packSize * this._rowHeight,
            lastPack      = Math.floor(contentHeight / packSize),
            minHeight     = this._visibleRect.y - visibleRectExt,
            maxHeight     = this._visibleRect.maxY() + visibleRectExt,
            packFrom      = Math.max(0, Math.floor(minHeight / packHeight)),
            packTo        = Math.min(lastPack, Math.ceil(maxHeight / packHeight)),
            i, html;
        for (i=packFrom; i <= packTo; i++) {
            if (!this._packs[i]) {
                var itemFrom = i*packSize,
                    itemTo   = Math.min(this._data.length, itemFrom + packSize),
                    height   = (itemTo - itemFrom) * this._rowHeight;
                    
                html = this._renderPack(itemFrom, itemTo);
                this._packs[i] = uki.createElement('div', 'position:absolute;left:0;top:' + (i * packHeight) + 'px;width:100%;height:' + height + 'px;overflow:hidden', html);
                this._dom.appendChild(this._packs[i]);
            }
        };
    };
    
});