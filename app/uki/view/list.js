include('base.js');
include('flyweight.js');
include('focusable.js');

uki.view.List = uki.newClass(uki.view.Base, uki.view.Focusable, new function() {
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
        this._data = null;
        this._packSize = 20;
        this._visibleRectExt = 300;
        this._selectedIndex = -1;
    };
    
    proto.background = function(bg) {
        if (bg === undefined) return this._background = this._background || uki.theme.background('list', this._rowHeight);
        return Base.background.call(this, bg);
    };
    
    uki.newProperties(proto, ['rowHeight', 'flyweightView', 'packSize', 'visibleRectExt']);
    
    proto.data = function(d) {
        if (d === undefined) return this._data;
        this._data = d;
        // if (this.rect()) {
        //     var rect = this.rect().clone();
        //     rect.height = d.length * this._rowHeight;
        //     this.rect(rect);
        // }
    };
    
    proto._domCreate = function() {
        this._dom = uki.createElement('div', this.defaultCss + 'overflow:hidden');
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
        });
        
        this.bind('click', function(e) {
            var o = uki.dom.offset(this._dom),
                y = e.domEvent.pageY - o.y,
                p = Math.floor(y / this._rowHeight);
            this.selectedIndex(p);
        });
        
        this._initFocusable();
    };
    
    proto.selectedIndex = function(position) {
        if (position === undefined) return this._selectedIndex;
        var nextIndex = Math.max(0, Math.min(this._data.length - 1, position));
        if (this._selectedIndex > -1) this._setSelected(this._selectedIndex, false);
        this._setSelected(this._selectedIndex = nextIndex, true);
    };
    
    proto._setSelected = function(position, state) {
        if (!this._dom) return;
        var item = this._itemAt(position),
            maxY, minY;
        if (!item) return;
        this._flyweightView.setSelected(item, this._data[position], state, this.hasFocus());
        if (!state) return;
        maxY = (position+1)*this._rowHeight;
        minY = position*this._rowHeight;
        if (maxY >= this._visibleRect.maxY()) {
            this._scrollableParent.scroll(0, maxY - this._visibleRect.maxY());
        } else if (minY < this._visibleRect.y) {
            this._scrollableParent.scroll(0, minY - this._visibleRect.y);
        }
    };
    
    proto._itemAt = function(position) {
        if (position < this._packs[1].itemTo && position >= this._packs[1].itemFrom) {
            return this._packs[1].dom.childNodes[position - this._packs[1].itemFrom];
        } else if (position < this._packs[0].itemTo && position >= this._packs[0].itemFrom) {
            return this._packs[0].dom.childNodes[position - this._packs[0].itemFrom];
        }
        return null;
    };
    
    proto._focus = function() {
        if (this._selectedIndex > -1) { this._setSelected(this._selectedIndex, true); }
        
        if (this._firstFocus) {
            var _this = this,
                userAgent = navigator.userAgent.toLowerCase(),
                useKeyPress = /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent );
            uki.dom.bind(this._focusableInput, useKeyPress ? 'keypress' : 'keydown', function(e) {
                if (e.which == 38 || e.keyCode == 38) { // UP
                    _this.selectedIndex(_this.selectedIndex() - 1);
                    uki.dom.preventDefault(e);
                } else if (e.which == 40 || e.keyCode == 40) { // DOWN
                    _this.selectedIndex(_this.selectedIndex() + 1);
                    uki.dom.preventDefault(e);
                }
            });
        }
        
    };
    
    proto._blur = function() {
        if (this._selectedIndex > -1) { this._setSelected(this._selectedIndex, true); }
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
    
    proto._addToPack = function (pack, position, data) {
        var row = this._createRow(data),
            nextChild = pack.dom.childNodes[position - pack.itemFrom];
        nextChild ? pack.dom.insertBefore(row, nextChild) : pack.dom.appendChild(row);
        pack.itemTo++;
    }
    
    proto._removeFromPack = function(pack, position) {
        pack.dom.removeChild(pack.dom.childNodes[position - pack.itemFrom]);
        pack.itemTo--;
    };
    
    proto._movePack = function(pack, offset) {
        pack.itemFrom += offset;
        pack.dom.style.top = pack.itemFrom * this._rowHeight + 'px'
    };
    
    // data api
    proto.addRow = function(position, data) {
        this._data.splice(position, 0, data);
        if (position < this._packs[0].itemFrom) {
            this._movePack(this._packs[0], 1);
            this._movePack(this._packs[1], 1);
        } else if (position < this._packs[1].itemTo && position >= this._packs[1].itemFrom) {
            this._addToPack(this._packs[1], position, data);
        } else if (position < this._packs[0].itemTo && position >= this._packs[0].itemFrom) {
            this._addToPack(this._packs[0], position, data);
            this._movePack(this._packs[1], 1);
            this._packs[1].itemTo++;
        }
    };
    
    proto.removeRow = function(position) {
        this._data.splice(position, 1);
        if (position < this._packs[0].itemFrom) {
            this._movePack(this._packs[0], -1);
            this._movePack(this._packs[1], -1);
        } else if (position < this._packs[1].itemTo && position >= this._packs[1].itemFrom) {
            this._removeFromPack(this._packs[1], position);
            this._domLayout(this.rect());
        } else if (position < this._packs[0].itemTo && position >= this._packs[0].itemFrom) {
            this._removeFromPack(this._packs[0], position);
            this._movePack(this._packs[1], -1);
            this._packs[1].itemTo--;
            this._domLayout(this.rect());
        }
    };
    
    proto._createRow = function(data) {
        return uki.createElement('div', ['width:100%;height:', this._rowHeight, 'px;overflow:hidden'].join(''), this._flyweightView.render(data));
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
        }
        
        if (this._focusableInput) this._focusableInput.style.top = this._visibleRect.y + 'px'; // move to reduce on focus jump
            
    };
    
    proto._bindToDom = function(name) {
        return uki.view.Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    }
    
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