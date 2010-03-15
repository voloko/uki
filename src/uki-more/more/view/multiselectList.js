include('../view.js');
include('../utils.js');

uki.view.declare('uki.more.view.MultiselectList', uki.view.List, function(Base) {
        
    this._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _selectedIndexes: [],
            _lastClickIndex: -1
        });
    };
    
    this.lastClickIndex = uki.newProp('_lastClickIndex');
    
    this.clearSelection = function(skipClickIndex) {
        for (var i=0; i < this._selectedIndexes.length; i++) {
            this._setSelected(this._selectedIndexes[i], false);
        };
        this._selectedIndexes = [];
        if (!skipClickIndex) this._lastClickIndex = -1;
    };
    
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
    
    this.selectedRows = function() {
        return uki.map(this.selectedIndexes(), function(index) {
            return this._data[index];
        }, this)
    };
    
    this.selectedIndex = function(position) {
        if (position === undefined) return this._selectedIndexes.length ? this._selectedIndexes[0] : -1;
        this.selectedIndexes([position]);
        this._scrollToPosition(position);
        return this;
    };
    
    function removeRange (array, from, to) {
        var p = uki.more.utils.binarySearch(array, from),
            initialP = p;
        while (array[p] <= to) p++;
        if (p > initialP) array.splice(initialP, p - initialP);
    }
    
    this._toggleSelection = function(p) {
        var indexes = [].concat(this._selectedIndexes);
        var addTo = uki.more.utils.binarySearch(indexes, p);
        if (indexes[addTo] == p) {
            indexes.splice(addTo, 1);
        } else {
            indexes.splice(addTo, 0, p);
        }
        this.selectedIndexes(indexes);
    };
    
    this._bindSelectionEvents = function() {
        this.bind('mousedown', this._mousedown);
        this.bind('mouseup', this._mouseup);
        this.bind(this.keyPressEvent(), this._keypress);
    };
    
    this._mouseup = function(e) {
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

        this._selectionInProcess = false;
        if (e.shiftKey && indexes.length > 0) {
            if (this.isSelected(p)) {
                indexes = [].concat(indexes);
                removeRange(indexes, Math.min(p+1, this._lastClickIndex), Math.max(p-1, this._lastClickIndex));
                this.selectedIndexes(indexes);
            } else {
                this.selectedIndexes(uki.more.utils.range(
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
        this._lastClickIndex = p;
    };
    
    this._keypress = function(e) {
        var indexes = this._selectedIndexes,
            nextIndex = -1;
        if (e.which == 38 || e.keyCode == 38) { // UP
            nextIndex = Math.max(0, this._lastClickIndex - 1);
        } else if (e.which == 40 || e.keyCode == 40) { // DOWN
            nextIndex = Math.min(this._data.length-1, this._lastClickIndex + 1);
        }
        if (nextIndex > -1 && nextIndex != this._lastClickIndex) {
            if (e.shiftKey) {
                if (this.isSelected(nextIndex)) {
                    this._toggleSelection(this._lastClickIndex);
                } else {
                    this._toggleSelection(nextIndex);
                }
            } else {
                this.selectedIndex(nextIndex);
            }
            this._lastClickIndex = nextIndex;
            e.preventDefault();
        }
    };
    
    this.isSelected = function(index) {
        var found = uki.more.utils.binarySearch(this._selectedIndexes, index);
        return this._selectedIndexes[found] == index;
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
            var currentSelection = uki.more.utils.binarySearch(indexes, pack.itemFrom);
            currentSelection = Math.max(currentSelection, 0);
            while(indexes[currentSelection] !== null && indexes[currentSelection] < pack.itemTo) {
                var position = indexes[currentSelection] - pack.itemFrom;
                this._render.setSelected(pack.dom.childNodes[position], this._data[position], true, this.hasFocus());
                currentSelection++;
            }
        }
    };
    
    this._setSelected = function(position, state) {
        var item = this._itemAt(position);
        if (item) this._render.setSelected(item, this._data[position], state, this.hasFocus());
    };
    
    this._focus = function() {
        if (this._selectedIndexes.length == 0 && this._data.length > 0) {
            this.selectedIndexes([0]);
        } else {
            this.selectedIndexes(this.selectedIndexes());
        }
    };
    
    this._blur = function() {
        this.selectedIndexes(this.selectedIndexes());
    };
});

uki.view.declare('uki.more.view.ScrollableMultiselectList', uki.view.ScrollPane, function(Base) {

    this._createDom = function() {
        Base._createDom.call(this);
        this._list = uki({ view: 'uki.more.view.MultiselectList', rect: this.rect().clone().normalize(), anchors: 'left top right bottom' })[0];
        this.appendChild(this._list);
    };
    
    uki.each('data rowHeight render packSize visibleRectExt throttle focusable selectedIndexes selectedIndex selectedRows contentDraggable draggable hasFocus'.split(' '), 
        function(i, name) {
            uki.delegateProp(this, name, '_list');
        }, this);
    
});


// export properties
uki.Collection.addAttrs(['lastClickIndex','selectedIndexes']);
uki.delegateProp(uki.view.Table.prototype, 'selectedIndexes', '_list');
uki.delegateProp(uki.view.Table.prototype, 'lastClickIndex', '_list');