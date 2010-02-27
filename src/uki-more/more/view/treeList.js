include('../view.js');

// really basic tree list implementation
uki.more.view.treeList = {};

uki.more.view.TreeList = uki.newClass(uki.view.List, new function() {
    var Base = uki.view.List.prototype,
        proto = this;

    proto.typeName = function() { return 'uki.more.view.TreeList'; };
    
    proto._setup = function() {
        Base._setup.call(this);
        this._render = new uki.more.view.treeList.Render();
    };
    
    proto.listData = Base.data;

    proto.data = uki.newProp('_treeData', function(v) {
        this._treeData = v;
        this.listData(this._treeNodeToListData(v));
    });

    proto._treeNodeToListData = function(node, indent) {
        indent = indent || 0;
        return uki.map(node, function(row) {
            row.__indent = indent;
            return row;
        });
    };

    proto.toggle = function(index) {
        this._data[index].__opened ? this.close(index) : this.open(index);
    };
    
    function recursiveLength (item) {
        var children = item.children,
            length = children.length;
            
        for (var i=0; i < children.length; i++) {
            if (children[i].__opened) length += recursiveLength(children[i]);
        };
        return length;
    }

    proto.open = function(index, _skipUpdate) {
        var selectedIndex = this._selectedIndex,
            item = this._data[index],
            children = item.children;
            
        if (!children || !children.length || (item.__opened && !_skipUpdate)) return 0;
        var length = children.length;

        item.__opened = true;
        this._data.splice.apply(this._data, [index+1, 0].concat( this._treeNodeToListData(children, item.__indent + 1) ));
        
        for (var i=children.length - 1; i >= 0 ; i--) {
            if (this._data[index+1+i].__opened) {
                length += this.open(index+1+i, true);
            }
        };
        if (!_skipUpdate) {
            this.listData(this._data);
            this.selectedIndex(selectedIndex <= index ? selectedIndex : selectedIndex + length);
        }
        return length;
    };

    proto.close = function(index) {
        var selectedIndex = this._selectedIndex,
            item = this._data[index],
            children = item.children;
            
        if (!children || !children.length || !item.__opened) return;
        var length = recursiveLength(item);

        item.__opened = false;
        this._data.splice(index+1, length);
        this.listData(this._data);
        this.selectedIndex(
                            selectedIndex <= index ? selectedIndex : 
                            selectedIndex >= index + length ? index - length :
                            index
                          );
    };

    proto._mousedown = function(e) {
        if (e.domEvent.target.className.indexOf('toggle-tree') > -1) {
            var o = uki.dom.offset(this._dom),
                y = e.domEvent.pageY - o.y,
                p = y / this._rowHeight << 0;
            this.toggle(p);
        } else {
            Base._mousedown.call(this, e);
        }
    };

    proto._keypress = function(e) {
        Base._keypress.call(this, e);
        e = e.domEvent;
        if (e.which == 39 || e.keyCode == 39) { // RIGHT
            this.open(this._selectedIndex);
        } else if (e.which == 37 || e.keyCode == 37) { // LEFT
            this.close(this._selectedIndex);
        }
    };

});

include('treeList/render.js');