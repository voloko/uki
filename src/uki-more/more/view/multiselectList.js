include('../view.js');
include('../utils.js');

uki.more.view.MultiselectList = uki.newClass(uki.view.List, new function() {
    var Base = uki.view.List.prototype,
        proto = this;
        
    proto.typeName = 'uki.more.view.MultiselectList';
        
    proto._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _selectedIndexes: [],
            _lastClickIndex: -1
        });
    };
    
    proto.lastClickIndex = uki.newProp('_lastClickIndex');
    
    proto.clearSelection = function(skipClickIndex) {
        for (var i=0; i < this._selectedIndexes.length; i++) {
            this._setSelected(this._selectedIndexes[i], false);
        };
        this._selectedIndexes = [];
        if (!skipClickIndex) this._lastClickIndex = -1;
    };
    
    proto.selectedIndexes = function(indexes) {
        if (indexes === undefined) return this._selectedIndexes;
        this.clearSelection(true);
        this._selectedIndexes = indexes;
        for (var i=0; i < this._selectedIndexes.length; i++) {
            this._setSelected(this._selectedIndexes[i], true);
        };
        this.trigger('selection', {source: this});
        return this;
    };
    
    proto.selectedIndex = function(position) {
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
    
    proto._toggleSelection = function(p) {
        var indexes = [].concat(this._selectedIndexes);
        var addTo = uki.more.utils.binarySearch(indexes, p);
        if (indexes[addTo] == p) {
            indexes.splice(addTo, 1);
        } else {
            indexes.splice(addTo, 0, p);
        }
        this.selectedIndexes(indexes);
    };
    
    proto._bindSelectionEvents = function() {
        this.bind('mousedown', this._mousedown);
        
        var ua = navigator.userAgent,
            useKeyPress = /mozilla/i.test( ua ) && !(/(compatible|webkit)/i).test( ua );
            
        this.bind(useKeyPress ? 'keypress' : 'keydown', this._keypress);
    };
    
    proto._mousedown = function(e) {
        var o = uki.dom.offset(this._dom),
            y = e.domEvent.pageY - o.y,
            p = y / this._rowHeight << 0,
            indexes = this._selectedIndexes;
        if (e.domEvent.shiftKey && indexes.length > 0) {
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
        } else if (e.domEvent.metaKey) {
            this._toggleSelection(p);
        } else {
            this.selectedIndexes([p]);
        }
        this._lastClickIndex = p;
    };
    
    proto._keypress = function(e) {
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
    
    proto.isSelected = function(index) {
        var found = uki.more.utils.binarySearch(this._selectedIndexes, index);
        return this._selectedIndexes[found] == index;
    };
    
    //   xxxxx    |    xxxxx  |  xxxxxxxx  |     xxx
    //     yyyyy  |  yyyyy    |    yyyy    |   yyyyyyy
    proto._restorePackSelection = function(pack) {
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
    
    proto._setSelected = function(position, state) {
        var item = this._itemAt(position);
        if (item) this._render.setSelected(item, this._data[position], state, this.hasFocus());
    };
    
    proto._focus = function() {
        if (this._selectedIndexes.length == 0 && this._data.length > 0) {
            this.selectedIndexes([0]);
        } else {
            this.selectedIndexes(this.selectedIndexes());
        }
    };
    
    proto._blur = function() {
        this.selectedIndexes(this.selectedIndexes());
    };
});

// export properties
uki.Collection.addAttrs('lastClickIndex,selectedIndexes');
uki.delegateProp(uki.view.Table.prototype, 'selectedIndexes', '_list');
uki.delegateProp(uki.view.Table.prototype, 'lastClickIndex', '_list');