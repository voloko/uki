include('../label.js');

/**
 * @class
 * @extends uki.view.Label
 */
uki.view.declare('uki.view.table.Header', uki.view.Label, function(Base) {
    this._defaultBackground = 'theme(table-header)';
    
    this._setup = function() {
        Base._setup.call(this);
        this._multiline = true;
        this._resizers = [];
    };
    
    this.columns = uki.newProp('_columns', function(v) {
        this._columns = v;
        this.html(this._createColumns());
        this._createResizers();
    });
    
    this._createDom = function() {
        Base._createDom.call(this);
        this.bind('click', this._click);
    };
    
    this._click = function(e) {
        if (this._dragging) return;
        
        var target = e.target;
        if (target == this.dom() || target == this._label) return;
        while (target.parentNode != this._label) target = target.parentNode;
        var i = uki.inArray(target, this._label.childNodes);
        if (i > -1) {
            this.trigger('columnClick', { source: this, columnIndex: i, column: this._columns[i] });
        }
    };
    
    this.redrawColumn = function(col) {
        if (this._resizers[col]) uki.dom.unbind(this._resizers[col]);
        var container = doc.createElement('div');
        container.innerHTML = this._columns[col].renderHeader(this.rect().height);
        this._label.replaceChild(container.firstChild, this._label.childNodes[col]);
        if (this._columns[col].resizable()) this._createResizers(col);
    };
    
    this._createColumns = function() {
        var html = [];
        for(var i = 0, offset = 0, columns = this._columns, l = columns.length; i < l; i++) {
            html[html.length] = columns[i].renderHeader(this.rect().height);
        }
        return html.join('');
    };
    
    this._createResizer = function(i) {
        var column = this._columns[i];
        if (column.resizable()) {
            var resizer = column.appendResizer(this._label.childNodes[i], this.rect().height);
            this._bindResizerDrag(resizer, i);
            this._resizers[i] = resizer;
        }
    };
    
    this._createResizers = function() {
        uki.each(this._columns, this._createResizer, this);
    };
    
    this._bindResizerDrag = function(resizer, columnIndex) {
        var _this = this;
        
        uki.dom.bind(resizer, 'draggesture', function(e) {
            _this._dragging = true;
            var headerOffset = uki.dom.offset(_this.dom()),
                offsetWithinHeader = e.pageX - headerOffset.x,
                columnOffset = 0, i, column = _this._columns[columnIndex];
            for (i=0; i < columnIndex; i++) {
                columnOffset += _this._columns[i].width();
            };
            column.width(offsetWithinHeader - columnOffset);
        });
        
        uki.dom.bind(resizer, 'draggestureend', function() {
            setTimeout(function() {
                _this._dragging = false;
            }, 1);
        });
    };
});