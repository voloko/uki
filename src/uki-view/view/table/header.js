include('../label.js');

uki.view.table.Header = uki.newClass(uki.view.Label, new function() {
    var Base = uki.view.Label[PROTOTYPE],
        proto = this;
        
    proto._setup = function() {
        Base._setup.call(this);
        this._multiline = true;
    };
    
    proto.columns = uki.newProp('_columns', function(v) {
        this._columns = v;
        this.html(this._createColumns());
        this._createResizers();
    });
    
    proto._createColumns = function() {
        var html = [];
        for(var i = 0, offset = 0, columns = this._columns, l = columns.length; i < l; i++) {
            html[html.length] = columns[i].renderHeader(this.rect().height);
        }
        return html.join('')
    };
    
    proto._createResizers = function() {
        for (var i=0, column, resizer, offset = 0; i < this._columns.length; i++) {
            column = this._columns[i];
            if (column.resizable()) {
                resizer = uki.theme.dom('resizer', {height: this.rect().height});
                resizer.style.right = -2 + PX;
                // resizer.style.background = 'red';
                this._label.childNodes[i].appendChild(resizer);
                this._bindResizerDrag(resizer, i);
            }
        };
    };
    
    proto._bindResizerDrag = function(resizer, columnIndex) {
        var _this = this;
        uki.dom.drag.watch(resizer, {
            _drag: function(e) {
                var headerOffset = uki.dom.offset(_this.dom()),
                    offsetWithinHeader = e.pageX - headerOffset.x,
                    columnOffset = 0, i, column = _this._columns[columnIndex];
                for (i=0; i < columnIndex; i++) {
                    columnOffset += _this._columns[i].width();
                };
                column.width(offsetWithinHeader - columnOffset);
            }
        });
    };
    
});