uki.view.list = {};

uki.view.List = uki.newClass(uki.view.Base, uki.view.Focusable, new function() {
    var Base = uki.view.Base[PROTOTYPE],
        proto = this;
        
    proto.typeName = function() {
        return 'uki.view.List';
    };
    
    proto._throttle = 5; // do not try to render more often than every 5ms
    proto._visibleRectExt = 300;
    proto._packSize = 20;
    proto._defaultBackground = 'list';
    
    proto._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _rowHeight: 30,
            _render: new uki.view.list.Render(),
            _data: [],
            _selectedIndex: -1
        });
    };
    
    proto.defaultBackground = function() {
        return uki.theme.background('list', this._rowHeight);
    };
    
    uki.addProps(proto, ['rowHeight', 'render', 'packSize', 'visibleRectExt', 'throttle']);
    
    proto.rowHeight = uki.newProp('_rowHeight', function(val) {
        this._rowHeight = val;
        if (this._background) this._background.detach();
        this._background = null;
        if (this.background()) this.background().attachTo(this);
    });
    
    proto.data = function(d) {
        if (d === undefined) return this._data;
        this.selectedIndex(-1);
        this._data = d;
        this._updateRectOnDataChnage();
        return this;
    };
    
    // data api
    proto.addRow = function(position, data) {
        this.selectedIndex(-1);
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
        this._updateRectOnDataChnage();
    };
    
    proto.removeRow = function(position) {
        this.selectedIndex(-1);
        this._data.splice(position, 1);
        if (position < this._packs[0].itemFrom) {
            this._movePack(this._packs[0], -1);
            this._movePack(this._packs[1], -1);
        } else if (position < this._packs[1].itemTo && position >= this._packs[1].itemFrom) {
            this._removeFromPack(this._packs[1], position);
            this._layoutDom(this.rect());
        } else if (position < this._packs[0].itemTo && position >= this._packs[0].itemFrom) {
            this._removeFromPack(this._packs[0], position);
            this._movePack(this._packs[1], -1);
            this._packs[1].itemTo--;
            this._layoutDom(this.rect());
        }
        this._updateRectOnDataChnage();
    };    
    
    proto.selectedIndex = function(position) {
        if (position === undefined) return this._selectedIndex;
        var nextIndex = MAX(0, MIN((this._data || []).length - 1, position));
        if (this._selectedIndex > -1) this._setSelected(this._selectedIndex, false);
        if (nextIndex == position) this._setSelected(this._selectedIndex = nextIndex, true);
        return this;
    };
    
    proto.layout = function() {
        this._layoutDom(this._rect);
        this._needsLayout = false;
        // send visibleRect with layout
        this.trigger('layout', { rect: this._rect, source: this, visibleRect: this._visibleRect });
        this._firstLayout = false;
    };
    
    
    proto._updateRectOnDataChnage = function() {
        if (this.rect()) {
            var newRect = this.rect().clone(),
                oldRect = this.rect(),
                h = this._data.length * this._rowHeight;
                
            if (!this._minSize || h > this._minSize.height) {
                newRect.height = h;
                this.rect(newRect);
            }
        }
    };
    
    proto._createDom = function() {
        this._dom = uki.createElement('div', this.defaultCss + 'overflow:hidden');
        
        var packDom = uki.createElement('div', 'position:absolute;left:0;top:0px;width:100%;overflow:hidden');
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
        
        this.bind('mousedown', function(e) {
            var o = uki.dom.offset(this._dom),
                y = e.domEvent.pageY - o.y,
                p = FLOOR(y / this._rowHeight);
            this.selectedIndex(p);
        });
    };
    
    proto._setSelected = function(position, state) {
        var item = this._itemAt(position);
        if (!item) return;
        if (state) this._scrollToPosition(position);
        this._render.setSelected(item, this._data[position], state, this.hasFocus());
    };
    
    proto._scrollToPosition = function(position) {
        var maxY, minY;
        maxY = (position+1)*this._rowHeight;
        minY = position*this._rowHeight;
        if (maxY >= this._visibleRect.maxY()) {
            this._scrollableParent.scroll(0, maxY - this._visibleRect.maxY());
        } else if (minY < this._visibleRect.y) {
            this._scrollableParent.scroll(0, minY - this._visibleRect.y);
        }
        this.layout();
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
        this._selectedIndex = this._selectedIndex > -1 ? this._selectedIndex : 0;
        this._setSelected(this._selectedIndex, true);
        if (this._firstFocus) {
            var _this = this,
                userAgent = navigator.userAgent.toLowerCase(),
                useKeyPress = /mozilla/.test( userAgent ) && !(/(compatible|webkit)/).test( userAgent );
            uki.dom.bind(this._focusableInput, useKeyPress ? 'keypress' : 'keydown', function(e) {
                if (e.which == 38 || e.keyCode == 38) { // UP
                    _this.selectedIndex(MAX(0, _this.selectedIndex() - 1));
                    uki.dom.preventDefault(e);
                } else if (e.which == 40 || e.keyCode == 40) { // DOWN
                    _this.selectedIndex(MIN(_this._data.length-1, _this.selectedIndex() + 1));
                    uki.dom.preventDefault(e);
                }
            });
        }
        
    };
    
    proto._blur = function() {
        if (this._selectedIndex > -1) { this._setSelected(this._selectedIndex, true); }
    };
    
    proto._rowCss = function() {
        return ['width:100%;height:', this._rowHeight, 'px;overflow:hidden'].join('');
    };
    
    proto._renderPack = function(pack, itemFrom, itemTo) {
        var html = [], position,
            rect = new Rect(0, itemFrom*this._rowHeight, this.rect().width, this._rowHeight);
        for (i=itemFrom; i < itemTo; i++) {
            html[html.length] = [
                '<div style="', this._rowCss(), '">', 
                this._render.render(this._data[i], rect, i),
                '</div>'
            ].join('');
            rect.y += this._rowHeight;
        };
        pack.dom.innerHTML = html.join('');
        pack.itemFrom = itemFrom;
        pack.itemTo   = itemTo;
        pack.dom.style.top = itemFrom*this._rowHeight + 'px';
        if (this._selectedIndex > pack.itemFrom && this._selectedIndex < pack.itemTo) {
            position = this._selectedIndex - pack.itemFrom;
            this._render.setSelected(this._itemAt(position), this._data[position], true, this.hasFocus());
        }
    };
    
    proto._addToPack = function (pack, position, data) {
        var row = this._createRow(data),
            nextChild = pack.dom.childNodes[position - pack.itemFrom];
        nextChild ? pack.dom.insertBefore(row, nextChild) : pack.dom.appendChild(row);
        pack.itemTo++;
    };
    
    proto._removeFromPack = function(pack, position) {
        pack.dom.removeChild(pack.dom.childNodes[position - pack.itemFrom]);
        pack.itemTo--;
    };
    
    proto._movePack = function(pack, offset) {
        pack.itemFrom += offset;
        pack.dom.style.top = pack.itemFrom * this._rowHeight + 'px';
    };
    
    proto._createRow = function(data) {
        return uki.createElement('div', this._rowCss(), this._render.render(data));
    };
    
    proto._swapPacks = function() {
        var tmp = this._packs[0];
        this._packs[0] = this._packs[1];
        this._packs[1] = tmp;
    };
    
    proto._normalizeRect = function(rect) {
        rect = Base._normalizeRect.call(this, rect);
        if (rect.height != this._rowHeight * this._data.length) {
            rect = new Rect(rect.x, rect.y, rect.width, this._rowHeight * this._data.length);
        }
        return rect;
    };
    
    proto._layoutDom = function(rect) {
        if (this._firstLayout) {
            var _this = this;
            this._scrollableParent = uki.view.scrollableParent(this);

            this._scrollableParent.bind('scroll', function() {
                if (_this._throttle) {
                    if (_this._throttleStarted) return;
                    _this._throttleStarted = true;
                    setTimeout(function() {
                        _this._throttleStarted = false;
                        _this.layout();
                    }, _this._throttle);
                } else {
                    _this.layout();
                }
            });
            
            this._initFocusable();
        }
        
        
        
        var totalHeight = this._rowHeight * this._data.length,
            scrollableParent = this._scrollableParent;

        this._visibleRect = uki.view.visibleRect(this, scrollableParent);
        
        // if (this._visibleRect.maxY() > totalHeight && scrollableParent.scrollTop()) {
        //     var offset = MIN(this._visibleRect.maxY() - totalHeight, scrollableParent.scrollTop());
        //     
        //     scrollableParent.scrollTop(scrollableParent.scrollTop() - offset);
        //     this._visibleRect = uki.view.visibleRect(this, scrollableParent);
        // }
            
        var prefferedPackSize = CEIL((this._visibleRect.height + this._visibleRectExt*2) / this._rowHeight),
        
            minVisibleY  = MAX(0, this._visibleRect.y - this._visibleRectExt),
            maxVisibleY  = MIN(totalHeight, this._visibleRect.maxY() + this._visibleRectExt),
            minRenderedY = this._packs[0].itemFrom * this._rowHeight,
            maxRenderedY = this._packs[1].itemTo * this._rowHeight,
            
            itemFrom, itemTo, startAt;

        Base._layoutDom.call(this, rect);
        
        if (
            maxVisibleY <= minRenderedY || minVisibleY >= maxRenderedY || // both packs below/above visible area
            (maxVisibleY > maxRenderedY && this._packs[1].itemFrom * this._rowHeight > this._visibleRect.y) || // need to render below, and pack 2 is not enough to cover
            (minVisibleY < minRenderedY && this._packs[0].itemTo * this._rowHeight < this._visibleRect.maxY()) // need to render above, and pack 1 is not enough to cover the area
            // || prefferedPackSize is not enougth to cover the area above/below, can this actualy happen?
        ) { 
            // this happens a) on first render b) on scroll jumps c) on container resize
            // render both packs, move them to be at the center of visible area
            startAt = minVisibleY + (maxVisibleY - minVisibleY - prefferedPackSize*this._rowHeight*2) / 2;
            itemFrom = MAX(0, Math.round(startAt / this._rowHeight));
            itemTo = MIN(this._data.length, itemFrom + prefferedPackSize);
            
            this._renderPack(this._packs[0], itemFrom, itemTo);
            this._renderPack(this._packs[1], itemTo, MIN(this._data.length, itemTo + prefferedPackSize));
        } else if (maxVisibleY > maxRenderedY) { // we need to render below current area
            // this happens on normal scroll down
            // rerender bottom, swap
            itemFrom = this._packs[1].itemTo;
            itemTo   = MIN(this._data.length, this._packs[1].itemTo + prefferedPackSize);
            
            this._renderPack(this._packs[0], itemFrom, itemTo);
            this._swapPacks();
        } else if (minVisibleY < minRenderedY) { // we need to render above current area
            // this happens on normal scroll up
            // rerender top, swap
            itemFrom = MAX(this._packs[0].itemFrom - prefferedPackSize, 0);
            itemTo   = this._packs[0].itemFrom;
            
            this._renderPack(this._packs[1], itemFrom, itemTo);
            this._swapPacks();
        }
        
        if (this._focusableInput) this._focusableInput.style.top = this._visibleRect.y + 'px'; // move to reduce on focus jump
            
    };
    
    proto._bindToDom = function(name) {
        return uki.view.Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    };
});

uki.fn.data = function( value ) { return this.attr( 'data', value ); };


include('list/render.js');