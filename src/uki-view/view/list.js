include('scrollPane.js');

uki.view.list = {};
/**
 * List View
 * Progressevly renders list data. Support selection and drag&drop.
 * Renders rows with plain html.
 * 
 * @author voloko
 * @name uki.view.List
 * @class
 * @extends uki.view.Base
 * @implements uki.view.Focusable
 */
uki.view.declare('uki.view.List', uki.view.Base, uki.view.Focusable, function(Base, Focusable) {
    
    this._throttle = 42; // do not try to render more often than every 42ms
    this._visibleRectExt = 300; // extend visible rect by 300 px overflow
    this._defaultBackground = 'theme(list)';
    
    this._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _rowHeight: 30,
            _render: new uki.view.list.Render(),
            _data: [],
            _lastClickIndex: -1,
            _selectedIndexes: []
        });
    };
    
    /**
     * @function
     * @name uki.view.List#defaultBackground
     */
    this.defaultBackground = function() {
        return uki.theme.background('list', this._rowHeight);
    };
    
    /**
    * @type uki.view.list.Render
    * @function
    * @name uki.view.List#render
    */
    /**
    * @function
    * @name uki.view.List#packSize
    */
    /**
    * @function
    * @name uki.view.List#visibleRectExt
    */
    /**
    * @function
    * @name uki.view.List#throttle
    */
    /**
    * @function
    * @name uki.view.List#lastClickIndex
    */
    /**
    * @function
    * @name uki.view.List#multiselect
    */
    uki.addProps(this, ['render', 'packSize', 'visibleRectExt', 'throttle', 'lastClickIndex', 'multiselect']);
    
    /**
    * @function
    * @name uki.view.List#rowHeight
    */
    this.rowHeight = uki.newProp('_rowHeight', function(val) {
        this._rowHeight = val;
        this.minSize(new Size(this.minSize().width, this._rowHeight * this._data.length));
        if (this._background) this._background.detach();
        this._background = null;
        if (this.background()) this.background().attachTo(this);
        this._relayoutParent();
    });
    
    /**
    * @example list.data(['row1', 'row2', ...])
    * @function
    * @name uki.view.List#data
    */
    this.data = function(d) {
        if (d === undefined) return this._data;
        this.clearSelection();
        this._data = d;
        this._packs[0].itemFrom = this._packs[0].itemTo = this._packs[1].itemFrom = this._packs[1].itemTo = 0;
        
        this.minSize(new Size(this.minSize().width, this._rowHeight * this._data.length));
        this.trigger('selection', {source: this})
        this._relayoutParent();
        return this;
    };
    
    /**
    * Forces list content update
    * @function
    * @name uki.view.List#relayout
    */
    this.relayout = function() {
        this._packs[0].itemFrom = this._packs[0].itemTo = this._packs[1].itemFrom = this._packs[1].itemTo = 0;
        this.layout();
    };
    
    this.contentsSize = function() {
        return new Size(this.rect().width, this._rowHeight * this._data.length);
    };
    
    /**
    * used in search. should be fast
    * @function
    * @param {Number} position
    * @param {String} data
    * @name uki.view.List#addRow
    */
    this.addRow = function(position, data) {
        this._data.splice(position, 0, data);
        var item = this._itemAt(position);
        var container = doc.createElement('div');
        
        container.innerHTML = this._rowTemplate.render({ 
            height: this._rowHeight, 
            text: this._render.render(this._data[position], this._rowRect(position), position)
        });
        if (item) {
            item.parentNode.insertBefore(container.firstChild, item);
        } else {
            this._dom.childNodes[0].appendChild(container.firstChild);
        }

        if (position <= this._packs[0].itemTo) {
            this._packs[0].itemTo++;
            this._packs[1].itemFrom++;
            this._packs[1].itemTo++;
            this._packs[1].dom.style.top = this._packs[1].itemFrom*this._rowHeight + 'px';
        } else {
            this._packs[1].itemTo++;
        }
        
        // offset selection
        var selectionPosition = uki.binarySearch(position, this.selectedIndexes());
        for (var i = selectionPosition; i < this._selectedIndexes.length; i++) {
            this._selectedIndexes[i]++;
        };
        
        // needed for scrollbar
        this.minSize(new Size(this.minSize().width, this._rowHeight * this._data.length));
        this._relayoutParent();

        return this;
    };
    
    /**
    * @function
    * @param {Number} position
    * @name uki.view.List#removeRow
    */
    this.removeRow = function(position) {
        this._data.splice(position, 1);
        this.data(this._data);
        return this;
    };
    
    /**
    * Forces one particular row to be redrawn
    * @function
    * @param {Number} position
    * @name uki.view.List#removeRow
    */
    this.redrawRow = function(position) {
        var item = this._itemAt(position);
        if (item) item.innerHTML = this._render.render(this._data[position], this._rowRect(position), position);
        return this;
    };
    
    /**
    * Read/write current selected index for selectable lists
    * @function
    * @param {Number} position
    * @name uki.view.List#selectedIndex
    */
    this.selectedIndex = function(position) {
        if (position === undefined) return this._selectedIndexes.length ? this._selectedIndexes[0] : -1;
        this.selectedIndexes([position]);
        this._scrollToPosition(position);
        return this;
    };
    
    /**
    * Read/write all selected indexes for multiselectable lists
    * @function
    * @param {Array.<Number>} position
    * @name uki.view.List#selectedIndex
    */
    this.selectedIndexes = function(indexes) {
        if (indexes === undefined) return this._selectedIndexes;
        this.clearSelection(true);
        this._selectedIndexes = indexes;
        for (var i=0; i < this._selectedIndexes.length; i++) {
            this._setSelected(this._selectedIndexes[i], true);
        };
        this.trigger('selection', {source: this});
        return this;
    };
    
    /**
    * Read contents of selected row
    * @function
    * @name uki.view.List#selectedRow
    */
    this.selectedRow = function() {
        return this._data[this.selectedIndex()];
    };    
    
    /**
    * Read contents of all selected rows
    * @function
    * @name uki.view.List#selectedRows
    */
    this.selectedRows = function() {
        return uki.map(this.selectedIndexes(), function(index) {
            return this._data[index];
        }, this)
    };
    
    /**
    * @function
    * @name uki.view.List#clearSelection
    */
    this.clearSelection = function(skipClickIndex) {
        for (var i=0; i < this._selectedIndexes.length; i++) {
            this._setSelected(this._selectedIndexes[i], false);
        };
        this._selectedIndexes = [];
        if (!skipClickIndex) this._lastClickIndex = -1;
    };
    
    /**
    * @function
    * @param {Number} index
    * @name uki.view.List#isSelected
    */
    this.isSelected = function(index) {
        var found = uki.binarySearch(index, this._selectedIndexes);
        return this._selectedIndexes[found] == index;
    };
    
    this.layout = function() {
        this._layoutDom(this._rect);
        this._needsLayout = false;
        // send visibleRect with layout
        this.trigger('layout', { rect: this._rect, source: this, visibleRect: this._visibleRect });
        this._firstLayout = false;
    };
    
    function range (from, to) {
        var result = new Array(to - from);
        for (var idx = 0; from <= to; from++, idx++) {
            result[idx] = from;
        };
        return result;
    }
    
    function removeRange (array, from, to) {
        var p = uki.binarySearch(from, array),
            initialP = p;
        while (array[p] <= to) p++;
        if (p > initialP) array.splice(initialP, p - initialP);
    }
    
    this._rowRect = function(p) {
        return new Rect(0, p*this._rowHeight, this.rect().width, this._rowHeight);
    };
    
    this._toggleSelection = function(p) {
        var indexes = [].concat(this._selectedIndexes);
        var addTo = uki.binarySearch(p, indexes);
        if (indexes[addTo] == p) {
            indexes.splice(addTo, 1);
        } else {
            indexes.splice(addTo, 0, p);
        }
        this.selectedIndexes(indexes);
    };
    
    var updatingScroll = false;
    this._scrollableParentScroll = function() {
        if (updatingScroll) return;
        if (this._throttle) {
            if (this._throttleStarted) return;
            this._throttleStarted = true;
            setTimeout(uki.proxy(function() {
                this._throttleStarted = false;
                this.layout();
            }, this), this._throttle);
        } else {
            this.layout();
        }
    };
    
    this._relayoutParent = function() {
        if (!this._scrollableParent) return;
        var c = this;
        while ( c && c != this._scrollableParent) {
            c._needsLayout = true;
            c = c.parent();
        }
        c.layout();
    };
    
    
    this.keyPressEvent = function() {
        var useKeyPress = root.opera || (/mozilla/i.test( ua ) && !(/(compatible|webkit)/i).test( ua ));
        return useKeyPress ? 'keypress' : 'keydown';
    };
    
    this._bindSelectionEvents = function() {
        this.bind('mousedown', this._mousedown);
        this.bind('mouseup', this._mouseup);
        this.bind(this.keyPressEvent(), this._keypress);
    };
    
    this._mouseup = function(e) {
        if (!this._multiselect) return;
        
        var o = uki.dom.offset(this._dom),
            y = e.pageY - o.y,
            p = y / this._rowHeight << 0;
            
        if (this._selectionInProcess && this._lastClickIndex == p && this.isSelected(p)) this.selectedIndexes([p]);
        this._selectionInProcess = false;
    };
    
    this._mousedown = function(e) {
        var o = uki.dom.offset(this._dom),
            y = e.pageY - o.y,
            p = y / this._rowHeight << 0,
            indexes = this._selectedIndexes;

        if (this._multiselect) {
            this._selectionInProcess = false;
            if (e.shiftKey && indexes.length > 0) {
                if (this.isSelected(p)) {
                    indexes = [].concat(indexes);
                    removeRange(indexes, Math.min(p+1, this._lastClickIndex), Math.max(p-1, this._lastClickIndex));
                    this.selectedIndexes(indexes);
                } else {
                    this.selectedIndexes(range(
                        Math.min(p, indexes[0]),
                        Math.max(p, indexes[indexes.length - 1])
                    ));
                }
            } else if (e.metaKey) {
                this._toggleSelection(p);
            } else {
                if (!this.isSelected(p)) {
                    this.selectedIndexes([p]);
                } else {
                    this._selectionInProcess = true;
                }
            }
        } else {
            this.selectedIndexes([p]);
        }
        this._lastClickIndex = p;
    };    
    
    this._keypress = function(e) {
        var indexes = this._selectedIndexes,
            nextIndex = -1;
        if (e.which == 38 || e.keyCode == 38) { // UP
            nextIndex = Math.max(0, this._lastClickIndex - 1);
            e.preventDefault();
        } else if (e.which == 40 || e.keyCode == 40) { // DOWN
            nextIndex = Math.min(this._data.length-1, this._lastClickIndex + 1);
            e.preventDefault();
        } else if (this._multiselect && (e.which == 97 || e.which == 65) && e.metaKey) {
            e.preventDefault();
            this.selectedIndexes(range(0, this._data.length -1));
        }
        if (nextIndex > -1 && nextIndex != this._lastClickIndex) {
            if (e.shiftKey && this._multiselect) {
                if (this.isSelected(nextIndex)) {
                    this._toggleSelection(this._lastClickIndex);
                } else {
                    this._toggleSelection(nextIndex);
                }
                this._scrollToPosition(nextIndex);
            } else {
                this.selectedIndex(nextIndex);
            }
            this._lastClickIndex = nextIndex;
        }
    };
    
    this._createDom = function() {
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
        
        this._initFocusable();
        this._bindSelectionEvents();
    };
    
    this._setSelected = function(position, state) {
        var item = this._itemAt(position);
        if (item) this._render.setSelected(item, this._data[position], state, this.hasFocus());
    };
    
    this._scrollToPosition = function(position) {
        if (!this._visibleRect) return;
        var maxY, minY;
        maxY = (position+1)*this._rowHeight;
        minY = position*this._rowHeight;
        updatingScroll = true;
        if (maxY >= this._visibleRect.maxY()) {
            this._scrollableParent.scroll(0, maxY - this._visibleRect.maxY());
        } else if (minY < this._visibleRect.y) {
            this._scrollableParent.scroll(0, minY - this._visibleRect.y);
        }
        updatingScroll = false;
        this.layout();
    };
    
    this._itemAt = function(position) {
        if (position < this._packs[1].itemTo && position >= this._packs[1].itemFrom) {
            return this._packs[1].dom.childNodes[position - this._packs[1].itemFrom];
        } else if (position < this._packs[0].itemTo && position >= this._packs[0].itemFrom) {
            return this._packs[0].dom.childNodes[position - this._packs[0].itemFrom];
        }
        return null;
    };
    
    this._rowTemplate = new uki.theme.Template('<div style="width:100%;height:${height}px;overflow:hidden;">${text}</div>')
    
    this._renderPack = function(pack, itemFrom, itemTo) {
        var html = [], position;
        for (i=itemFrom; i < itemTo; i++) {
            html[html.length] = this._rowTemplate.render({ 
                height: this._rowHeight, 
                text: this._render.render(this._data[i], this._rowRect(i), i)
            });
        };
        pack.dom.innerHTML = html.join('');
        pack.itemFrom = itemFrom;
        pack.itemTo   = itemTo;
        pack.dom.style.top = itemFrom*this._rowHeight + 'px';
        this._restorePackSelection(pack, itemFrom, itemTo);
    };
    
    //   xxxxx    |    xxxxx  |  xxxxxxxx  |     xxx
    //     yyyyy  |  yyyyy    |    yyyy    |   yyyyyyy
    this._restorePackSelection = function(pack) {
        var indexes = this._selectedIndexes;
        
        if (
            (indexes[0] <= pack.itemFrom && indexes[indexes.length - 1] >= pack.itemFrom) || // left index
            (indexes[0] <= pack.itemTo   && indexes[indexes.length - 1] >= pack.itemTo) || // right index
            (indexes[0] >= pack.itemFrom && indexes[indexes.length - 1] <= pack.itemTo) // within
        ) {
            var currentSelection = uki.binarySearch(pack.itemFrom, indexes);
            currentSelection = Math.max(currentSelection, 0);
            while(indexes[currentSelection] !== null && indexes[currentSelection] < pack.itemTo) {
                var position = indexes[currentSelection] - pack.itemFrom;
                this._render.setSelected(pack.dom.childNodes[position], this._data[position], true, this.hasFocus());
                currentSelection++;
            }
        }
    };
    
    this._swapPacks = function() {
        var tmp = this._packs[0];
        this._packs[0] = this._packs[1];
        this._packs[1] = tmp;
    };
    
    this._layoutDom = function(rect) {
        if (!this._scrollableParent) {
            this._scrollableParent = uki.view.scrollableParent(this);
            this._scrollableParent.bind('scroll', uki.proxy(this._scrollableParentScroll, this));
        }
        
        var totalHeight = this._rowHeight * this._data.length,
            scrollableParent = this._scrollableParent;

        this._visibleRect = uki.view.visibleRect(this, scrollableParent);
        if (this._focusTarget) this._focusTarget.style.top = this._visibleRect.y + 'px';
        var prefferedPackSize = CEIL((this._visibleRect.height + this._visibleRectExt*2) / this._rowHeight),
        
            minVisibleY  = MAX(0, this._visibleRect.y - this._visibleRectExt),
            maxVisibleY  = MIN(totalHeight, this._visibleRect.maxY() + this._visibleRectExt),
            minRenderedY = this._packs[0].itemFrom * this._rowHeight,
            maxRenderedY = this._packs[1].itemTo * this._rowHeight,
            
            itemFrom, itemTo, startAt, updated = true;

        Base._layoutDom.call(this, rect);
        if (
            maxVisibleY <= minRenderedY || minVisibleY >= maxRenderedY || // both packs below/above visible area
            (maxVisibleY > maxRenderedY && this._packs[1].itemFrom * this._rowHeight > this._visibleRect.y && this._packs[1].itemTo > this._packs[1].itemFrom) || // need to render below, and pack 2 is not enough to cover
            (minVisibleY < minRenderedY && this._packs[0].itemTo * this._rowHeight < this._visibleRect.maxY()) // need to render above, and pack 1 is not enough to cover the area
            // || prefferedPackSize is not enough to cover the area above/below, can this actually happen?
        ) { 
            // this happens a) on first render b) on scroll jumps c) on container resize
            // render both packs, move them to be at the center of visible area
            // startAt = minVisibleY + (maxVisibleY - minVisibleY - prefferedPackSize*this._rowHeight*2) / 2;
            startAt = minVisibleY - this._visibleRectExt / 2;
            itemFrom = MAX(0, Math.round(startAt / this._rowHeight));
            itemTo = MIN(this._data.length, itemFrom + prefferedPackSize);
            
            this._renderPack(this._packs[0], itemFrom, itemTo);
            this._renderPack(this._packs[1], itemTo, itemTo);
            // this._renderPack(this._packs[1], itemTo, MIN(this._data.length, itemTo + prefferedPackSize));
        } else if (maxVisibleY > maxRenderedY && this._packs[1].itemTo > this._packs[1].itemFrom) { // we need to render below current area
            // this happens on normal scroll down
            // re-render bottom, swap
            itemFrom = this._packs[1].itemTo;
            itemTo   = MIN(this._data.length, this._packs[1].itemTo + prefferedPackSize);
            
            this._renderPack(this._packs[0], itemFrom, itemTo);
            this._swapPacks();
        } else if (maxVisibleY > maxRenderedY) { // we need to render below current area
            itemFrom = this._packs[0].itemTo;
            itemTo   = MIN(this._data.length, this._packs[1].itemTo + prefferedPackSize);
            
            this._renderPack(this._packs[1], itemFrom, itemTo);
        } else if (minVisibleY < minRenderedY) { // we need to render above current area
            // this happens on normal scroll up
            // re-render top, swap
            itemFrom = MAX(this._packs[0].itemFrom - prefferedPackSize, 0);
            itemTo   = this._packs[0].itemFrom;
            
            this._renderPack(this._packs[1], itemFrom, itemTo);
            this._swapPacks();
        } else {
            updated = false;
        }
        if (updated && /MSIE 6|7/.test(ua)) this.dom().className += '';
    };
    
    this._bindToDom = function(name) {
        return Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    };
    
    this._focus = function(e) {
        Focusable._focus.call(this, e);
        if (this._selectedIndexes.length == 0 && this._data.length > 0) {
            this.selectedIndexes([0]);
        } else {
            this.selectedIndexes(this.selectedIndexes());
        }
    };
    
    this._blur = function(e) {
        Focusable._blur.call(this, e);
        this.selectedIndexes(this.selectedIndexes());
    };
    
});

/** @function
@name uki.Collection#data */
/** @function
@name uki.Collection#selectedIndex */
/** @function
@name uki.Collection#selectedIndexes */
/** @function
@name uki.Collection#selectedRow */
/** @function
@name uki.Collection#selectedRows */
uki.Collection.addAttrs(['data','selectedIndex', 'selectedIndexes', 'selectedRow', 'selectedRows']);

/**
 * Scrollable List View
 * Puts a list into a scroll pane
 * 
 * @author voloko
 * @name uki.view.ScrollableList
 * @class
 * @extends uki.view.ScrollPane
 */
uki.view.declare('uki.view.ScrollableList', uki.view.ScrollPane, function(Base) {

    this._createDom = function() {
        Base._createDom.call(this);
        this._list = uki({ view: 'List', rect: this.rect().clone().normalize(), anchors: 'left top right bottom' })[0];
        this.appendChild(this._list);
    };
    
    uki.each('data rowHeight render packSize visibleRectExt throttle focusable selectedIndex selectedIndexes selectedRow selectedRows multiselect draggable textSelectable'.split(' '), 
        function(i, name) {
            uki.delegateProp(this, name, '_list');
        }, this);
    
});

include('list/render.js');
