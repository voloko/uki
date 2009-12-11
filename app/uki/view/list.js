include('base.js');
include('flyweight.js');

uki.view.List = uki.newClass(uki.view.Base, new function() {
    var Base = uki.view.Base.prototype,
        Rect = uki.geometry.Rect,
        proto = this,
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
        this._items = [];
        this._data = null;
        this._packSize = 20;
        this._visibleRectExt = 300;
    };
    
    proto.background = function(bg) {
        if (bg === undefined) return this._background = this._background || uki.theme.background('list', this._rowHeight);
        return Base.background.call(this, bg);
    };
    
    uki.newProperties(proto, ['rowHeight', 'flyweightView', 'packSize', 'visibleRectExt']);
    
    proto.data = function(d) {
        if (d === undefined) return this._data;
        this._data = d;
        if (this.rect()) {
            var rect = this.rect().clone();
            rect.height = d.length * this._rowHeight;
            this.rect(rect);
        }
    };
    
    proto._domCreate = function() {
        this._dom = uki.createElement('div', this.defaultCss);
        this._scrollableParent = findScrollableParent(this);
        
        this.selectable(this.selectable());
        this.className(this.className())
        this.background().attachTo(this);
        
        var packDom = uki.createElement('div', 'border-bottom:1px solid red;position:absolute;left:0;top:0px;width:100%;overflow:hidden');
        this._packs = [
            {
                dom: packDom,
                itemTo: 0,
                itemFrom: 0
            },
            {
                dom: packDom.cloneNode(false),
                itemTo: 0,
                itemFrom: 0
            }
        ];
        this._dom.appendChild(this._packs[0].dom);
        this._dom.appendChild(this._packs[1].dom);
        
        var _this = this;
        this._scrollableParent.bind('scroll', function() {
            _this.layout();
        })
    };
    
    proto._renderPack = function(pack, itemFrom, itemTo) {
        var html = [];
        for (i=itemFrom; i < itemTo; i++) {
            html[html.length] = [
                '<div style="width:100%;height:', this._rowHeight, 'px;overflow:hidden">', 
                this._flyweightView.render(this._data[i]),
                '</div>'
            ].join('');
        };
        pack.dom.innerHTML = html.join('');
        pack.itemFrom = itemFrom;
        pack.itemTo   = itemTo;
        pack.dom.style.top = itemFrom*this._rowHeight + 'px';
    };
    
    
    // data api
    proto.addRow = function(position, data) {
    };
    
    proto.removeRow = function(position) {
    };
    
    proto.createRow = function(data) {
        return uki.createElement('div', 'width:100%;height:', this._rowHeight, 'px;overflow:hidden', this._flyweightView.render(data));
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
    
    proto._swapPacks = function() {
        var tmp = this._packs[0];
        this._packs[0] = this._packs[1];
        this._packs[1] = tmp;
    }
    
    proto._domLayout = function(rect) {
        this._visibleRect = getVisibleRect(this, this._scrollableParent);
        Base._domLayout.call(this, rect);
        
        var totalHeight = this._rowHeight * this._data.length,
            prefferedPackSize = Math.ceil((this._visibleRect.height + this._visibleRectExt*2) / this._rowHeight),

            minVisibleY  = Math.max(0, this._visibleRect.y - this._visibleRectExt),
            maxVisibleY  = Math.min(totalHeight, this._visibleRect.maxY() + this._visibleRectExt),
            minRenderedY = this._packs[0].itemFrom * this._rowHeight,
            maxRenderedY = this._packs[1].itemTo * this._rowHeight,
            
            itemFrom, itemTo, startAt;
        
        if (
            maxVisibleY <= minRenderedY || minVisibleY >= maxRenderedY || // both packs below/above visible area
            (maxVisibleY > maxRenderedY && this._packs[1].itemFrom * this._rowHeight > this._visibleRect.y) || // need to render below, and pack 2 is not enough to cover
            (minVisibleY < minRenderedY && this._packs[0].itemTo * this._rowHeight < this._visibleRect.maxY()) // need to render above, and pack 1 is not enough to cover the area
            // || prefferedPackSize is not enougth to cover the area above/below, can this actualy happen?
        ) { 
            // this happens a) on first render b) on scroll jumps c) on container resize
            // render both packs, move them to be at the center of visible area
            startAt = minVisibleY + (maxVisibleY - minVisibleY - prefferedPackSize*this._rowHeight*2) / 2;
            itemFrom = Math.max(0, Math.round(startAt / this._rowHeight));
            itemTo = Math.min(this._data.length, itemFrom + prefferedPackSize)
            
            this._renderPack(this._packs[0], itemFrom, itemTo);
            this._renderPack(this._packs[1], itemTo, Math.min(this._data.length, itemTo + prefferedPackSize));
        } else if (maxVisibleY > maxRenderedY) { // we need to render below current area
            // this happens on normal scroll down
            // rerender bottom, swap
            itemFrom = this._packs[1].itemTo;
            itemTo   = Math.min(this._data.length, this._packs[1].itemTo + prefferedPackSize);
            
            this._renderPack(this._packs[0], itemFrom, itemTo);
            this._swapPacks();
        } else if (minVisibleY < minRenderedY) { // we need to render above current area
            // this happens on normal scroll up
            // rerender top, swap
            itemFrom = Math.max(this._packs[0].itemFrom - prefferedPackSize, 0);
            itemTo   = this._packs[0].itemFrom;
            
            this._renderPack(this._packs[1], itemFrom, itemTo);
            this._swapPacks();
        } else {
            return;
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
});